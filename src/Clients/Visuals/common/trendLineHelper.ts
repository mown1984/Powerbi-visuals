/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.visuals {
    import DataRoleHelper = powerbi.data.DataRoleHelper;

    export interface TrendLine {
        points: IPoint[];
        show: boolean;
        lineColor: Fill;
        transparency: number;
        style: string;
        combineSeries: boolean;
        y2Axis: boolean;
    }

    export module TrendLineHelper {
        const trendLinePropertyNames = {
            show: 'show',
            lineColor: 'lineColor',
            transparency: 'transparency',
            style: 'style',
            combineSeries: 'combineSeries'
        };
        const trendObjectName = 'trend';

        export const defaults = {
            color: <Fill>{ solid: { color: '#000' } },
            lineStyle: lineStyle.solid,
            transparency: 0,
            combineSeries: true,
        };
        const TrendLineClassSelector: jsCommon.CssConstants.ClassAndSelector = jsCommon.CssConstants.createClassAndSelector('trend-line');

        export function enumerateObjectInstances(enumeration: ObjectEnumerationBuilder, trendLines: TrendLine[]): void {
            debug.assertValue(enumeration, 'enumeration');

            if (_.isEmpty(trendLines)) {
                enumeration.pushInstance({
                    selector: null,
                    properties: {
                        show: false,
                    },
                    objectName: trendObjectName,
                });

                return;
            }

            let trendLine = trendLines[0];
            enumeration.pushInstance({
                selector: null,
                properties: {
                    show: trendLine.show,
                    lineColor: trendLine.lineColor,
                    transparency: trendLine.transparency,
                    style: trendLine.style,
                    combineSeries: trendLine.combineSeries,
                },
                objectName: trendObjectName,
            });
        }

        export function isDataViewForRegression(dataView: DataView): boolean {
            return DataRoleHelper.hasRoleInDataView(dataView, 'regression.X');
        }

        export function readDataViews(dataViews: DataView[]): TrendLine[] {
            let trendLineDataViews = _.filter(dataViews, (dataView) => isDataViewForRegression(dataView));
            debug.assert(trendLineDataViews.length <= 2, 'expected at most 2 trend line dataviews');

            let allTrendLines: TrendLine[] = [];
            let y2 = false;
            for (let trendLineDataView of trendLineDataViews) {
                let trendLines = TrendLineHelper.readDataView(trendLineDataView, y2);
                if (!_.isEmpty(trendLines))
                    allTrendLines.push(...trendLines);

                y2 = true;
            }

            return allTrendLines;
        }

        export function readDataView(dataView: DataView, y2: boolean): TrendLine[] {
            if (!dataView || !dataView.categorical)
                return;

            let categorical = dataView.categorical;
            if (_.isEmpty(categorical.categories) || _.isEmpty(categorical.values))
                return;

            let categories = categorical.categories[0].values;
            let groups = categorical.values.grouped();
            if (!categories || !groups)
                return;

            let trendProperties = DataViewObjects.getObject(dataView.metadata.objects, trendObjectName, {});
            let show = DataViewObject.getValue<boolean>(trendProperties, trendLinePropertyNames.show, false);
            let lineColor = DataViewObject.getValue<Fill>(trendProperties, trendLinePropertyNames.lineColor, defaults.color);
            let transparency = DataViewObject.getValue<number>(trendProperties, trendLinePropertyNames.transparency, defaults.transparency);
            let style = DataViewObject.getValue<string>(trendProperties, trendLinePropertyNames.style, defaults.lineStyle);
            let combineSeries = DataViewObject.getValue<boolean>(trendProperties, trendLinePropertyNames.combineSeries, defaults.combineSeries);

            // Trend lines generated by Insights will be putting line color here, we should convert the Insights code to create
            // "trend" objects like above and write the upgrade code to handle pinned tiles with trend lines before removing any feature switch.
            let legacyColor = DataViewObjects.getValue<Fill>(categorical.values[0].source.objects, lineChartProps.dataPoint.fill);
            if (legacyColor)
                lineColor = legacyColor;

            let trendLines: TrendLine[] = [];
            for (let group of groups) {
                let points: IPoint[] = [];
                for (let i = 0; i < categories.length; i++) {
                    let x = AxisHelper.normalizeNonFiniteNumber(categories[i]);

                    // There is a assumption here that the group only has 1 set of values in it. Once we add more things like confidence bands,
                    // this assumption will not be true. This assumption comes from the way dataViewRegresion generates the dataView
                    let y = AxisHelper.normalizeNonFiniteNumber(group.values[0].values[i]);

                    if (x != null && y != null) {
                        points.push({
                            x: x,
                            y: y,
                        });
                    }
                }

                trendLines.push({
                    points: points,
                    show: show,
                    lineColor: lineColor,
                    transparency: transparency,
                    style: style,
                    combineSeries: combineSeries,
                    y2Axis: y2,
                });
            }
            return trendLines;
        }

        export function render(trendLines: TrendLine[], graphicsContext: D3.Selection, axes: CartesianAxisProperties, viewport: IViewport): void {
            let lines = graphicsContext.selectAll(TrendLineClassSelector.selector).data(trendLines || []);
            lines.enter().append('path').classed(TrendLineClassSelector.class, true);

            lines
                .attr('d', (d: TrendLine) => {
                    let xScale = axes.x.scale;
                    let yScale = (d.y2Axis && axes.y2) ? axes.y2.scale : axes.y1.scale;

                    let pathGen = d3.svg.line()
                        .x((point: IPoint) => xScale(point.x))
                        .y((point: IPoint) => yScale(point.y));

                    return pathGen(_.filter(d.points, (point) => point.x != null && point.y != null));
                });

            lines.each(function (d: TrendLine) {
                let line = d3.select(this);
                let style: any = {};

                style.stroke = d.lineColor.solid.color;

                if (d.transparency != null) {
                    style['stroke-opacity'] = (100 - d.transparency) / 100;
                }

                if (d.style === lineStyle.dashed) {
                    style['stroke-dasharray'] = "5, 5";
                }
                else if (d.style === lineStyle.dotted) {
                    style['stroke-dasharray'] = "1, 5";
                    style['stroke-linecap'] = "round";
                }
                else if (d.style === lineStyle.solid) {
                    style['stroke-dasharray'] = null;
                    style['stroke-linecap'] = null;
                }

                line.style(style);
            });

            lines.exit().remove();
        }
    }
}
