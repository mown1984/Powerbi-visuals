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

/// <reference path="../../../_references.ts"/>

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import ValueFormatter = powerbi.visuals.valueFormatter;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import getAnimationDuration = AnimatorCommon.GetAnimationDuration;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import PixelConverter = jsCommon.PixelConverter;

    type D3Element =
        D3.UpdateSelection |
        D3.Selection |
        D3.Selectors |
        D3.Transition.Transition;

    export interface HistogramConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
    }

    export interface HistogramAxisSettings {
        axisColor?: string;
        displayUnits?: number;
        precision?: number;
        title?: boolean;
        show?: boolean;
        style?: string;
    }

    export interface HistogramXAxisSettings extends HistogramAxisSettings {
    }

    export interface HistogramYAxisSettings extends HistogramAxisSettings {
        start?: number;
        end?: number;
        position?: string;
    }

    export interface HistogramLabelSettings {
        show?: boolean;
        color?: string;
        displayUnits?: number;
        precision?: number;
        fontSize?: number;
    }

    export interface HistogramSettings {
        displayName?: string;
        fillColor?: string;
        frequency: boolean;
        bins?: number;
        precision: number;
        maxX?: number;

        xAxisSettings: HistogramXAxisSettings;
        yAxisSettings: HistogramYAxisSettings;
        labelSettings: HistogramLabelSettings;
    }

    export interface HistogramData extends D3.Layout.Bin, TooltipEnabledDataPoint {
        range: number[];
        selectionIds: SelectionId[];
    }

    export interface HistogramDataView {
        data: HistogramData[];
        xScale?: D3.Scale.LinearScale;
        yScale?: D3.Scale.LinearScale;
        settings: HistogramSettings;
        formatter: IValueFormatter;
        xLabelFormatter?: IValueFormatter;
        yLabelFormatter?: IValueFormatter;
    }

    interface HistogramValue {
        value: number;
        selectionId: SelectionId;
        frequency: number;
    }

    interface Legend {
        text: string;
        transform?: string;
        dx?: string;
        dy?: string;
    }

    interface Brackets {
        left: string;
        right: string;
    }

    interface HistogramProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    interface HistogramProperties {
        [objectName: string]: HistogramProperty;
    }

    export class HistogramChartWarning implements IVisualWarning {
        public static ErrorInvalidDataValues: string = "Some data values are invalid or too big";

        private message: string;
        constructor(message: string) {
            this.message = message;
        }

        public get code(): string {
            return "BulletChartWarning";
        }

        public getMessages(resourceProvider: jsCommon.IStringResourceProvider): IVisualErrorMessage {
            return {
                message: this.message,
                title: resourceProvider.get(""),
                detail: resourceProvider.get("")
            };
        }
    }

    export class Histogram implements IVisual {
        private static ClassName: string = "histogram";
        private static FrequencyText: string = "Frequency";
        private static DensityText: string = "Density";

        private static Properties: HistogramProperties = {
            general: {
                bins: {
                    objectName: "general",
                    propertyName: "bins"
                },
                frequency: {
                    objectName: "general",
                    propertyName: "frequency"
                },
                formatString: {
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            dataPoint: {
                fill: {
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            },
            labels: {
                show: {
                    objectName: "labels",
                    propertyName: "show"
                },
                color: {
                    objectName: "labels",
                    propertyName: "color"
                },
                displayUnits: {
                    objectName: "labels",
                    propertyName: "displayUnits"
                },
                precision: {
                    objectName: "labels",
                    propertyName: "precision"
                },
                fontSize: {
                    objectName: "labels",
                    propertyName: "fontSize"
                }
            },
            xAxis: {
                show: {
                    objectName: "xAxis",
                    propertyName: "show"
                },
                axisColor: {
                    objectName: "xAxis",
                    propertyName: "axisColor"
                },
                title: {
                    objectName: "xAxis",
                    propertyName: "title"
                },
                displayUnits: {
                    objectName: "xAxis",
                    propertyName: "displayUnits"
                },
                precision: {
                    objectName: "xAxis",
                    propertyName: "precision"
                },
                style: {
                    objectName: "xAxis",
                    propertyName: "style"
                }
            },
            yAxis: {
                show: {
                    objectName: "yAxis",
                    propertyName: "show"
                },
                axisColor: {
                    objectName: "yAxis",
                    propertyName: "axisColor"
                },
                title: {
                    objectName: "yAxis",
                    propertyName: "title"
                },
                displayUnits: {
                    objectName: "yAxis",
                    propertyName: "displayUnits"
                },
                precision: {
                    objectName: "yAxis",
                    propertyName: "precision"
                },
                style: {
                    objectName: "yAxis",
                    propertyName: "style"
                },
                start: {
                    objectName: "yAxis",
                    propertyName: "start"
                },
                end: {
                    objectName: "yAxis",
                    propertyName: "end"
                },
                position: {
                    objectName: "yAxis",
                    propertyName: "position"
                }
            }
        };

        private static DefaultHistogramSettings: HistogramSettings = {
            frequency: true,
            displayName: "Histogram",
            bins: null,
            fillColor: "#5f9ea0",
            precision: 2,
            xAxisSettings: {
                show: true,
                axisColor: "#5f9ea0",
                title: true,
                displayUnits: 0,
                precision: 2,
                style: axisStyle.showTitleOnly,
            },
            yAxisSettings: {
                show: true,
                axisColor: "#5f9ea0",
                title: true,
                displayUnits: 0,
                precision: 2,
                style: axisStyle.showTitleOnly,
                start: 0,
                position: yAxisPosition.left,
            },
            labelSettings: {
                show: false,
                color: "#5f9ea0",
                displayUnits: 0,
                precision: 2,
                fontSize: 9
            },
        };

        private static Axes: ClassAndSelector = createClassAndSelector('axes');
        private static Axis: ClassAndSelector = createClassAndSelector('axis');
        private static Labels: ClassAndSelector = createClassAndSelector('labels');
        private static Columns: ClassAndSelector = createClassAndSelector('columns');
        private static Column: ClassAndSelector = createClassAndSelector('column');
        private static Legends: ClassAndSelector = createClassAndSelector('legends');
        private static Legend: ClassAndSelector = createClassAndSelector('legend');

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Values",
                kind: VisualDataRoleKind.Grouping,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Values")
            }, {
                    name: "Frequency",
                    kind: VisualDataRoleKind.Measure,
                    displayName: "Frequency"
                }],
            dataViewMappings: [{
                conditions: [{ "Values": { min: 1, max: 1 }, "Frequency": { min: 0, max: 1 } }],
                categorical: {
                    categories: {
                        bind: { to: "Values" },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: { for: { in: "Frequency" } }
                }
            }],
            sorting: {
                implicit: {
                    clauses: [{ role: "Values", direction: 1 /*SortDirection.Ascending*/ }] //Constant SortDirection.Ascending currently is not supported on the msit
                }
            },
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: { type: { formatting: { formatString: true } } },
                        bins: {
                            displayName: "Bins",
                            type: { numeric: true }
                        },
                        frequency: {
                            displayName: "Frequency",
                            type: { bool: true }
                        }
                    },
                },
                dataPoint: {
                    displayName: data.createDisplayNameGetter("Visual_DataPoint"),
                    properties: {
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                xAxis: {
                    displayName: 'X-Axis',
                    properties: {
                        show: {
                            displayName: "Show",
                            type: { bool: true },
                        },
                        axis: {
                            displayName: 'Axis',
                            type: { bool: true }
                        },
                        axisColor: {
                            displayName: "Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        title: {
                            displayName: "Title",
                            type: { bool: true }
                        },
                        displayUnits: {
                            displayName: "Display Units",
                            type: { formatting: { labelDisplayUnits: true } }
                        },
                        precision: {
                            displayName: "Decimal Places",
                            type: { numeric: true },
                        },
                        style: {
                            displayName: "Style",
                            type: { enumeration: axisStyle.type }
                        },
                    }
                },
                yAxis: {
                    displayName: 'Y-Axis',
                    properties: {
                        show: {
                            displayName: "Show",
                            type: { bool: true },
                        },
                        axis: {
                            displayName: 'yAxis',
                            type: { bool: true }
                        },
                        axisColor: {
                            displayName: "Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        title: {
                            displayName: "Title",
                            type: { bool: true }
                        },
                        displayUnits: {
                            displayName: "Display Units",
                            type: { formatting: { labelDisplayUnits: true } }
                        },
                        precision: {
                            displayName: "Decimal Places",
                            type: { numeric: true },
                        },
                        style: {
                            displayName: "Style",
                            type: { enumeration: axisStyle.type }
                        },
                        start: {
                            displayName: "Start",
                            type: { numeric: true },
                            placeHolderText: "Start",
                            suppressFormatPainterCopy: true,
                        },
                        end: {
                            displayName: "End",
                            type: { numeric: true },
                            placeHolderText: "End",
                            suppressFormatPainterCopy: true,
                        },
                        position: {
                            displayName: "Position",
                            type: { enumeration: yAxisPosition.type },
                        },
                    }
                },
                labels: {
                    displayName: "Data Labels",
                    properties: {
                        show: {
                            displayName: "Show",
                            type: { bool: true }
                        },
                        color: {
                            displayName: "Color",
                            type: { fill: { solid: { color: true } } }
                        },
                        displayUnits: {
                            displayName: "Display Units",
                            type: { formatting: { labelDisplayUnits: true } },
                            suppressFormatPainterCopy: true
                        },
                        precision: {
                            displayName: "Decimal Places",
                            type: { numeric: true },
                            suppressFormatPainterCopy: true
                        },
                        fontSize: {
                            displayName: "Text Size",
                            type: { formatting: { fontSize: true } }
                        },
                    },
                },
            }
        };

        private ColumnPadding: number = 1;
        private MinColumnHeight: number = 1;
        private MinOpacity: number = 0.3;
        private MaxOpacity: number = 1;
        private static MinNumberOfBins: number = 0;
        private static MaxNumberOfBins: number = 100;
        private static MinPrecision: number = 0;
        private static MaxPrecision: number = 17; // max number of decimals in float
        private TooltipDisplayName: string = "Range";
        private SeparatorNumbers: string = ", ";
        private LegendSize: number = 50;
        private YLegendSize: number = 50;
        private XLegendSize: number = 50;
        private AxisSize: number = 30;
        private DataLabelMargin: number = 0;
        private widthOfColumn: number = 0;
        private yTitleMargin: number = 0;
        private outerPadding: number = 5;
        private xAxisProperties: IAxisProperties;
        private yAxisProperties: IAxisProperties;

        private ExcludeBrackets: Brackets = {
            left: "(",
            right: ")"
        };

        private IncludeBrackets: Brackets = {
            left: "[",
            right: "]"
        };

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        private durationAnimations: number = 200;
        private oldInnerPaddingRatio: number = CartesianChart.InnerPaddingRatio;
        private oldMinOrdinalRectThickness: number = CartesianChart.MinOrdinalRectThickness;

        private viewport: IViewport;
        private hostService: IVisualHostServices;
        private selectionManager: SelectionManager;
        private colors: IDataColorPalette;

        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private axes: D3.Selection;
        private axisX: D3.Selection;
        private axisY: D3.Selection;
        private legend: D3.Selection;
        private columns: D3.Selection;
        private labels: D3.Selection;

        private histogramDataView: HistogramDataView;

        private animator: IGenericAnimator;

        private get columnsSelection(): D3.Selection {
            return this.main.select(Histogram.Columns.selector)
                .selectAll(Histogram.Column.selector);
        }

        private textProperties: TextProperties = {
            fontFamily: 'wf_segoe-ui_normal',
            fontSize: PixelConverter.toString(9),
        };

        constructor(histogramConstructorOptions?: HistogramConstructorOptions) {

            if (histogramConstructorOptions) {
                if (histogramConstructorOptions.svg) {
                    this.svg = histogramConstructorOptions.svg;
                }

                if (histogramConstructorOptions.animator) {
                    this.animator = histogramConstructorOptions.animator;
                }

                this.margin = histogramConstructorOptions.margin || this.margin;
            }
        }

        public init(visualsOptions: VisualInitOptions): void {
            this.hostService = visualsOptions.host;

            if (this.svg) {
                this.root = this.svg;
            } else {
                this.root = d3.select(visualsOptions.element.get(0))
                    .append("svg");
            }

            var style: IVisualStyle = visualsOptions.style;

            this.colors = style && style.colorPalette
                ? style.colorPalette.dataColors
                : new DataColorPalette();

            this.root.classed(Histogram.ClassName, true);

            this.main = this.root.append("g");

            this.axes = this.main
                .append("g")
                .classed(Histogram.Axes.class, true);

            this.axisX = this.axes
                .append("g")
                .classed(Histogram.Axis.class, true);

            this.axisY = this.axes
                .append("g")
                .classed(Histogram.Axis.class, true);

            this.legend = this.main
                .append("g")
                .classed(Histogram.Legends.class, true);

            this.columns = this.main
                .append("g")
                .classed(Histogram.Columns.class, true);

            this.labels = this.main
                .append("g")
                .classed(Histogram.Labels.class, true);
            this.selectionManager = new SelectionManager({ hostServices: visualsOptions.host });
        }

        public converter(dataView: DataView): HistogramDataView {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].values ||
                !(dataView.categorical.categories[0].values.length > 0)) {
                return null;
            }

            var settings: HistogramSettings,
                histogramLayout: D3.Layout.HistogramLayout,
                values: HistogramValue[],
                numericalValues: number[] = [],
                data: D3.Layout.Bin[],
                xScale: D3.Scale.LinearScale,
                yScale: D3.Scale.LinearScale,
                valueFormatter: IValueFormatter,
                frequencies: number[] = [],
                identities: DataViewScopeIdentity[] = [],
                shiftByValues: number = 0,
                sumFrequency: number = 0,
                xLabelFormatter: IValueFormatter,
                yLabelFormatter: IValueFormatter;

            if (dataView.categorical.values &&
                dataView.categorical.values[0] &&
                dataView.categorical.values[0].values) {
                frequencies = dataView.categorical.values[0].values;
            }

            if (dataView.categorical.categories[0].identity
                && dataView.categorical.categories[0].identity.length > 0) {
                identities = dataView.categorical.categories[0].identity;
            }

            settings = this.parseSettings(dataView);

            if (!settings) {
                return null;
            }

            values = Histogram.getValuesByFrequencies(
                dataView.categorical.categories[0].values,
                frequencies,
                identities);
            values.forEach((value: HistogramValue) => {
                numericalValues.push(value.value);
                sumFrequency += value.frequency;
            });

            histogramLayout = d3.layout.histogram();

            if (settings.bins && settings.bins > Histogram.MinNumberOfBins) {
                histogramLayout = histogramLayout.bins(settings.bins);
            }

            data = histogramLayout.frequency(settings.frequency)(numericalValues);

            data.forEach((bin: D3.Layout.Bin, index: number) => {
                var filteredValues: HistogramValue[],
                    frequency: number;

                filteredValues = values.filter((value: HistogramValue) => {
                    return Histogram.isValueContainedInRange(value, bin, index);
                });

                frequency = filteredValues.reduce((previousValue: number, currentValue: HistogramValue): number => {
                    return previousValue + currentValue.frequency;
                }, 0);

                bin.y = settings.frequency
                    ? frequency
                    : frequency / sumFrequency;

                shiftByValues += bin.length;
            });

            var yAxisSettings: HistogramYAxisSettings = settings.yAxisSettings;

            var maxYvalue = (yAxisSettings.end !== null) && (yAxisSettings.end > yAxisSettings.start) ?
                yAxisSettings.end : d3.max(data, (item: D3.Layout.Bin) => item.y);

            var minYValue = (yAxisSettings.start < maxYvalue) ? yAxisSettings.start : 0;
            settings.yAxisSettings.end = maxYvalue;
            settings.yAxisSettings.start = minYValue;
            settings.maxX = d3.max(data, (item: D3.Layout.Bin) => d3.max(item));

            xScale = d3.scale.linear()
                .domain([
                    d3.min(data, (item: D3.Layout.Bin) => d3.min(item)),
                    d3.max(data, (item: D3.Layout.Bin) => d3.max(item))
                ])
                .range([0, this.viewport.width - this.YLegendSize - this.AxisSize]);

            yScale = d3.scale.linear()
                .domain([
                    minYValue,
                    maxYvalue
                ])
                .range([this.viewport.height - this.LegendSize, this.outerPadding]);

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(
                    dataView.categorical.categories[0].source, Histogram.Properties["general"]["formatString"]),
                value: values[0].value,
                value2: values[values.length - 1].value,
                precision: settings.precision
            });

            xLabelFormatter = ValueFormatter.create({
                value: settings.xAxisSettings.displayUnits === 0 ? values[values.length - 1].value : settings.xAxisSettings.displayUnits,
                precision: settings.xAxisSettings.precision
            });

            yLabelFormatter = ValueFormatter.create({
                value: settings.yAxisSettings.displayUnits,
                precision: settings.yAxisSettings.precision
            });

            return {
                xScale: xScale,
                yScale: yScale,
                settings: settings,
                data: this.getData(values, numericalValues, data, settings, yLabelFormatter, xLabelFormatter),
                formatter: valueFormatter,
                xLabelFormatter: xLabelFormatter,
                yLabelFormatter: yLabelFormatter
            };
        }

        private static getValuesByFrequencies(sourceValues: number[], frequencies: number[], identities: DataViewScopeIdentity[]): HistogramValue[] {
            var values: HistogramValue[] = [];

            sourceValues.forEach((item: number, index: number) => {
                var frequency: number = 1,
                    value: number = Number(item);

                value = isNaN(value) ? 0 : value;

                if (frequencies
                    && frequencies[index]
                    && !isNaN(frequencies[index])
                    && frequencies[index] > 1) {
                    frequency = frequencies[index];
                }

                values.push({
                    value: value,
                    frequency: frequency,
                    selectionId: SelectionId.createWithId(identities[index])
                });
            });

            return values;
        }

        private getData(
            values: HistogramValue[],
            numericalValues: number[],
            data: D3.Layout.Bin[],
            settings: HistogramSettings,
            yValueFormatter: IValueFormatter,
            xValueFormatter: IValueFormatter): HistogramData[] {
            var minValue: number = d3.min(numericalValues),
                maxValue: number = d3.max(numericalValues);
            var fontSizeInPx = PixelConverter.fromPoint(settings.labelSettings.fontSize);

            return data.map((bin: any, index: number): HistogramData => {
                bin.range = Histogram.getRange(minValue, maxValue, bin.dx, index);
                bin.tooltipInfo = this.getTooltipData(bin.y, bin.range, settings, index === 0, yValueFormatter, xValueFormatter);
                bin.selectionIds = Histogram.getSelectionIds(values, bin, index);
                bin.labelFontSize = fontSizeInPx;
                return bin;
            });
        }

        private static getRange(minValue: number, maxValue: number, step: number, index: number): number[] {
            var leftBorder: number = minValue + index * step,
                rightBorder: number = leftBorder + step;

            return [leftBorder, rightBorder];
        }

        private getTooltipData(
            value: number,
            range: number[],
            settings: HistogramSettings,
            includeLeftBorder: boolean,
            yValueFormatter: IValueFormatter,
            xValueFormatter: IValueFormatter): TooltipDataItem[] {

            return [{
                displayName: Histogram.getLegendText(settings),
                value: yValueFormatter.format(value)
            }, {
                    displayName: this.TooltipDisplayName,
                    value: this.rangeToString(range, includeLeftBorder, xValueFormatter)
                }];
        }

        private static getSelectionIds(values: HistogramValue[], bin: HistogramData, index: number): SelectionId[] {
            var selectionIds: SelectionId[] = [];

            values.forEach((value: HistogramValue) => {
                if (Histogram.isValueContainedInRange(value, bin, index)) {
                    selectionIds.push(value.selectionId);
                }
            });

            return selectionIds;
        }

        private static isValueContainedInRange(value: HistogramValue, bin: D3.Layout.Bin, index: number): boolean {
            return ((index === 0 && value.value >= bin.x) || (value.value > bin.x)) && value.value <= bin.x + bin.dx;
        }

        private parseSettings(dataView: DataView): HistogramSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.columns[0]) {
                return null;
            }

            var histogramSettings: HistogramSettings = <HistogramSettings>{},
                objects: DataViewObjects,
                colorHelper: ColorHelper;

            colorHelper = new ColorHelper(
                this.colors,
                Histogram.Properties["dataPoint"]["fill"],
                Histogram.DefaultHistogramSettings.fillColor);

            histogramSettings.displayName =
            dataView.metadata.columns[0].displayName || Histogram.DefaultHistogramSettings.displayName;

            objects = Histogram.getObjectsFromDataView(dataView);

            var xAxisSettings: HistogramXAxisSettings = {
                axisColor: Histogram.getXAxisColor(objects).solid.color,
                title: Histogram.getXTitle(objects),
                precision: Histogram.getXPrecision(objects),
                style: Histogram.getXStyle(objects),
                displayUnits: Histogram.getXDisplayUnit(objects),
                show: Histogram.getXAxisShow(objects),
            };

            var yAxisSettings: HistogramYAxisSettings = {
                axisColor: Histogram.getYAxisColor(objects).solid.color,
                title: Histogram.getYTitle(objects),
                precision: Histogram.getYPrecision(objects),
                style: Histogram.getYStyle(objects),
                displayUnits: Histogram.getYDisplayUnit(objects),
                show: Histogram.getYAxisShow(objects),

                start: Histogram.getYStart(objects),
                end: Histogram.getYEnd(objects),
                position: Histogram.getYPosition(objects),
            };

            var labelSettings: HistogramLabelSettings = {
                show: Histogram.getLabelShow(objects),
                color: Histogram.getLabelColor(objects).solid.color,
                displayUnits: Histogram.getLabelDisplayUnits(objects),
                precision: Histogram.getLabelPrecision(objects),
                fontSize: Histogram.getLabelFontSize(objects),
            };

            histogramSettings.fillColor = colorHelper.getColorForMeasure(objects, "");
            histogramSettings.bins = Histogram.getBins(objects);
            histogramSettings.frequency = Histogram.getFrequency(objects);
            histogramSettings.precision = Histogram.getPrecision(objects);
            histogramSettings.displayName = Histogram.getLegend(histogramSettings.displayName, xAxisSettings.style, xAxisSettings.displayUnits);

            histogramSettings.xAxisSettings = xAxisSettings;
            histogramSettings.yAxisSettings = yAxisSettings;
            histogramSettings.labelSettings = labelSettings;

            return histogramSettings;
        }

        private static getLegend(title: string, style: string, displayUnit: number): string {
            var retValue: string;
            var formatter: IValueFormatter = ValueFormatter.create({
                value: displayUnit
            });

            switch (style) {
                case axisStyle.showTitleOnly:
                    retValue = title;
                    break;
                case axisStyle.showUnitOnly:
                    retValue = displayUnit === 0 || displayUnit === 1 ? title : formatter.displayUnit.title;
                    break;
                case axisStyle.showBoth:
                    retValue = displayUnit === 0 || displayUnit === 1 ? title : title + " (" + formatter.displayUnit.title + ")";
                    break;
            }
            return retValue;
        }

        private static getLabelFontSize(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["labels"]["fontSize"],
                Histogram.DefaultHistogramSettings.labelSettings.fontSize
            );
        }

        private static getLabelShow(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["labels"]["show"],
                Histogram.DefaultHistogramSettings.labelSettings.show
            );
        }

        private static getLabelColor(objects: DataViewObjects): Fill {
            return DataViewObjects.getValue<Fill>(
                objects,
                Histogram.Properties["labels"]["color"],
                {
                    solid: {
                        color: Histogram.DefaultHistogramSettings.labelSettings.color
                    }
                }
            );
        }

        private static getLabelDisplayUnits(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["labels"]["displayUnits"],
                Histogram.DefaultHistogramSettings.labelSettings.displayUnits
            );
        }

        private static getLabelPrecision(objects: DataViewObjects): number {
            var precision: number = DataViewObjects.getValue(
                objects,
                Histogram.Properties["labels"]["precision"],
                Histogram.DefaultHistogramSettings.labelSettings.precision);

            if (precision <= Histogram.MinPrecision) {
                return Histogram.MinPrecision;
            } else if (precision >= Histogram.MaxPrecision) {
                return Histogram.MaxPrecision;
            }

            return precision;
        }

        private static getXStyle(objects: DataViewObjects): string {
            return DataViewObjects.getValue<string>(
                objects,
                Histogram.Properties["xAxis"]["style"],
                Histogram.DefaultHistogramSettings.xAxisSettings.style
            );
        }

        private static getXDisplayUnit(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["xAxis"]["displayUnits"],
                Histogram.DefaultHistogramSettings.xAxisSettings.displayUnits
            );
        }

        private static getXPrecision(objects: DataViewObjects): number {
            var precision: number = DataViewObjects.getValue(
                objects,
                Histogram.Properties["xAxis"]["precision"],
                Histogram.DefaultHistogramSettings.xAxisSettings.precision);

            if (precision <= Histogram.MinPrecision) {
                return Histogram.MinPrecision;
            } else if (precision >= Histogram.MaxPrecision) {
                return Histogram.MaxPrecision;
            }

            return precision;
        }

        private static getXAxisShow(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["xAxis"]["show"],
                Histogram.DefaultHistogramSettings.xAxisSettings.show
            );
        }

        private static getXAxisColor(objects: DataViewObjects): Fill {
            return DataViewObjects.getValue<Fill>(
                objects,
                Histogram.Properties["xAxis"]["axisColor"],
                {
                    solid: {
                        color: Histogram.DefaultHistogramSettings.xAxisSettings.axisColor
                    }
                }
            );
        }

        private static getXTitle(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["xAxis"]["title"],
                Histogram.DefaultHistogramSettings.xAxisSettings.title);
        }

        private static getYStyle(objects: DataViewObjects): string {
            return DataViewObjects.getValue<string>(
                objects,
                Histogram.Properties["yAxis"]["style"],
                Histogram.DefaultHistogramSettings.yAxisSettings.style
            );
        }

        private static getYPosition(objects: DataViewObjects): string {
            return DataViewObjects.getValue<string>(
                objects,
                Histogram.Properties["yAxis"]["position"],
                Histogram.DefaultHistogramSettings.yAxisSettings.position
            );
        }

        private static getYAxisShow(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["yAxis"]["show"],
                Histogram.DefaultHistogramSettings.yAxisSettings.show
            );
        }

        private static getYAxisColor(objects: DataViewObjects): Fill {
            return DataViewObjects.getValue<Fill>(
                objects,
                Histogram.Properties["yAxis"]["axisColor"],
                {
                    solid: {
                        color: Histogram.DefaultHistogramSettings.yAxisSettings.axisColor
                    }
                }
            );
        }

        private static getYStart(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["yAxis"]["start"],
                Histogram.DefaultHistogramSettings.yAxisSettings.start
            );
        }

        private static getYEnd(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["yAxis"]["end"],
                Histogram.DefaultHistogramSettings.yAxisSettings.end
            );
        }

        private static getYDisplayUnit(objects: DataViewObjects): number {
            return DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["yAxis"]["displayUnits"],
                Histogram.DefaultHistogramSettings.yAxisSettings.displayUnits
            );
        }

        private static getYPrecision(objects: DataViewObjects): number {
            var precision: number = DataViewObjects.getValue(
                objects,
                Histogram.Properties["yAxis"]["precision"],
                Histogram.DefaultHistogramSettings.yAxisSettings.precision
            );

            if (precision <= Histogram.MinPrecision) {
                return Histogram.MinPrecision;
            } else if (precision >= Histogram.MaxPrecision) {
                return Histogram.MaxPrecision;
            }

            return precision;
        }

        private static getYTitle(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["yAxis"]["title"],
                Histogram.DefaultHistogramSettings.yAxisSettings.title);
        }

        private static getBins(objects: DataViewObjects): number {
            var binsNumber: number = Number(DataViewObjects.getValue<number>(
                objects,
                Histogram.Properties["general"]["bins"],
                Histogram.DefaultHistogramSettings.bins)
            );

            if (!binsNumber || isNaN(binsNumber) || (binsNumber <= Histogram.MinNumberOfBins)) {
                return Histogram.DefaultHistogramSettings.bins;
            }

            if (binsNumber > Histogram.MaxNumberOfBins) {
                return Histogram.MaxNumberOfBins;
            }

            return binsNumber;
        }

        private static getFrequency(objects: DataViewObjects): boolean {
            return DataViewObjects.getValue<boolean>(
                objects,
                Histogram.Properties["general"]["frequency"],
                Histogram.DefaultHistogramSettings.frequency
            );
        }

        private static getPrecision(objects: DataViewObjects): number {
            var precision: number = DataViewObjects.getValue(
                objects,
                Histogram.Properties["labels"]["precision"],
                Histogram.DefaultHistogramSettings.precision
            );

            if (precision <= Histogram.MinPrecision) {
                return Histogram.MinPrecision;
            }

            if (precision >= Histogram.MaxPrecision) {
                return Histogram.MaxPrecision;
            }

            return precision;
        }

        public validateData(data: HistogramDataView): boolean {
            if (data && data.data.some(x=> x.range.some(x => isNaN(x) || x === Infinity || x === -Infinity))) {
                this.hostService.setWarnings([new HistogramChartWarning(HistogramChartWarning.ErrorInvalidDataValues)]);
                return false;
            }
            return true;
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]) {
                return;
            }
            CartesianChart.InnerPaddingRatio = 1;

            var dataView: DataView = visualUpdateOptions.dataViews[0];

            this.durationAnimations = getAnimationDuration(
                this.animator,
                visualUpdateOptions.suppressAnimations);

            this.setSize(visualUpdateOptions.viewport);

            this.histogramDataView = this.converter(dataView);
            if (!this.validateData(this.histogramDataView)) {
                this.histogramDataView.data = [];
            }

            if (!this.histogramDataView) {
                return;
            }

            this.YLegendSize = this.histogramDataView.settings.yAxisSettings.title ? 50 : 25;
            this.XLegendSize = this.histogramDataView.settings.xAxisSettings.title ? 50 : 25;

            this.fixXTicSize();

            this.xAxisProperties = this.calculateXAxes(dataView.categorical.categories[0].source, this.textProperties, false);

            var ySource = dataView.categorical.values &&
                dataView.categorical.values[0] &&
                dataView.categorical.values[0].values ? dataView.categorical.values[0].source : dataView.categorical.categories[0].source;

            this.yAxisProperties = this.calculateYAxes(ySource, this.textProperties, false);

            this.render();

            CartesianChart.InnerPaddingRatio = this.oldInnerPaddingRatio;
            CartesianChart.MinOrdinalRectThickness = this.oldMinOrdinalRectThickness;
        }

        private fixXTicSize(): void {
            if (!this.histogramDataView || !this.histogramDataView.settings) {
                return;
            }

            var ticLabel = this.histogramDataView.xLabelFormatter.format(this.histogramDataView.settings.maxX);

            var textProperties: powerbi.TextProperties = {
                text: ticLabel,
                fontFamily: this.textProperties.fontFamily,
                fontSize: this.textProperties.fontSize
            };
            var widthOfLabel: number = powerbi.TextMeasurementService.measureSvgTextWidth(textProperties);

            CartesianChart.MinOrdinalRectThickness = widthOfLabel + 3;
        }

        private setSize(viewport: IViewport): void {
            var height: number,
                width: number;

            height = viewport.height -
                    this.margin.top -
                    this.margin.bottom;

            width = viewport.width -
                    this.margin.left -
                    this.margin.right;

            this.viewport = {
                height: height,
                width: width
            };

            this.updateElements(viewport.height, viewport.width);
        }

        private updateElements(height: number, width: number): void {

            this.root.attr({
                "height": height,
                "width": width
            });

            this.main.attr("transform", SVGUtil.translate(this.margin.left, this.margin.top));
            this.legend.attr("transform", SVGUtil.translate(this.margin.left, this.margin.top));

            this.axisX.attr(
                "transform",
                SVGUtil.translate(0, this.viewport.height - this.XLegendSize)
            );
        }

        public shouldShowYOnRight(): boolean {
            return this.histogramDataView.settings.yAxisSettings.position === yAxisPosition.right;
        }

        private columsAndAxesTransform(labelWidth: number): void {
            var constMargin = 20;
            var shiftToRight: number = this.shouldShowYOnRight() ? 10 :
                this.histogramDataView.settings.yAxisSettings.title ? this.margin.left + labelWidth + constMargin : this.margin.left + labelWidth;

            this.DataLabelMargin = shiftToRight;

            this.columns.attr("transform", SVGUtil.translate(shiftToRight, 0));
            this.axes.attr("transform", SVGUtil.translate(shiftToRight, 0));

            this.axisY.attr('transform', SVGUtil.translate(
                this.shouldShowYOnRight() ? this.viewport.width - this.AxisSize - this.YLegendSize + 0.01 : 0, 0));

            this.axisX.attr(
                "transform",
                SVGUtil.translate(0, this.viewport.height - this.XLegendSize));

        }

        private render(): void {
            if (!this.histogramDataView || !this.histogramDataView.settings) {
                return;
            }

            this.renderAxes();
            var columnsSelection: D3.UpdateSelection = this.renderColumns();

            this.adjustTransformToAxisLabels();

            this.renderLegend();

            if (this.histogramDataView.settings.labelSettings.show) {
                this.renderLabels();
            } else {
                this.main.selectAll('.labels').selectAll('*').remove();
            }

            this.bindSelectionHandler(columnsSelection);
        }

        private adjustTransformToAxisLabels(): void {
            var maxWidthOfLabael = 0;
            this.main.selectAll('g.axis').filter((d, index) => index === 1).selectAll('g.tick text')
                .each(function (d, i) {
                    var p = powerbi.TextMeasurementService.getSvgMeasurementProperties(this);
                    var textProperties: powerbi.TextProperties = {
                        text: p.text,
                        fontFamily: p.fontFamily,
                        fontSize: p.fontSize
                    };
                    var widthOfLabel = powerbi.TextMeasurementService.measureSvgTextWidth(textProperties);
                    if (widthOfLabel > maxWidthOfLabael)
                        maxWidthOfLabael = widthOfLabel;
                });
            var constMargin = 70;
            this.yTitleMargin = this.shouldShowYOnRight() ? this.viewport.width - this.AxisSize - constMargin + this.YLegendSize + maxWidthOfLabael : 0;
            this.columsAndAxesTransform(maxWidthOfLabael);
        }

        private renderColumns(): D3.UpdateSelection {
            var data: HistogramData[] = this.histogramDataView.data,
                yScale: D3.Scale.LinearScale = this.histogramDataView.yScale,
                countOfValues: number = data.length,
                widthOfColumn: number,
                updateColumnsSelection: D3.UpdateSelection;

            widthOfColumn = countOfValues && ((this.viewport.width - this.AxisSize - this.YLegendSize) / countOfValues - this.ColumnPadding);

            if (widthOfColumn < 0) {
                widthOfColumn = 0;
            }

            this.widthOfColumn = widthOfColumn;
            updateColumnsSelection = this.columnsSelection.data(data);

            updateColumnsSelection
                .enter()
                .append("svg:rect");

            updateColumnsSelection
                .attr("x", this.ColumnPadding / 2)
                .attr("width", widthOfColumn)
                .attr("height", (item: HistogramData) => this.getColumnHeight(item, yScale))
                .style("fill", this.histogramDataView.settings.fillColor)
                .attr("class", Histogram.Column.class)
                .attr("transform", (item: HistogramData, index: number) => SVGUtil.translate(
                    widthOfColumn * index + this.ColumnPadding * index,
                    yScale(item.y) - this.ColumnPadding / 2.5));

            if (countOfValues) {
                //if data is empty, it throws for some reason
                updateColumnsSelection.classed(Histogram.Column.class);
            }

            updateColumnsSelection.exit().remove();

            Histogram.renderTooltip(updateColumnsSelection);

            return updateColumnsSelection;
        }

        private static renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<HistogramData>tooltipEvent.data).tooltipInfo;
            });
        }

        private getColumnHeight(column: D3.Layout.Bin, y: D3.Scale.LinearScale): number {
            var height: number = this.viewport.height - this.XLegendSize - y(column.y);

            return height > 0 ? height : this.MinColumnHeight;
        }

        private renderAxes(): void {
            var xAxis: D3.Svg.Axis,
                yAxis: D3.Svg.Axis;

            xAxis = this.xAxisProperties.axis
                .tickFormat((item: number) => this.histogramDataView.xLabelFormatter.format(item))
                .orient('bottom');

            yAxis = this.yAxisProperties.axis
                .orient(this.histogramDataView.settings.yAxisSettings.position.toLowerCase())
                .tickFormat((item: number) => this.histogramDataView.yLabelFormatter.format(item));

            var xShow: boolean = this.histogramDataView.settings.xAxisSettings.show;
            var yShow: boolean = this.histogramDataView.settings.yAxisSettings.show;

            if (xShow) {
                this.axisX
                    .transition()
                    .duration(1)
                    .call(xAxis);
            } else {
                this.axisX.selectAll('*').remove();
            }

            if (yShow) {
                this.axisY
                    .call(yAxis);
            } else {
                this.axisY.selectAll('*').remove();
            }

            this.main.selectAll('g.axis').filter((d, index) => index === 0).selectAll('g.tick text').style({
                'fill': this.histogramDataView.settings.xAxisSettings.axisColor,
            });

            this.main.selectAll('g.axis').filter((d, index) => index === 1).selectAll('g.tick text').style({
                'fill': this.histogramDataView.settings.yAxisSettings.axisColor,
            });
        }

        private getLabaelLayout(): ILabelLayout {
            var labelSettings: HistogramLabelSettings = this.histogramDataView.settings.labelSettings;

            var fontSizeInPx: string = PixelConverter.fromPoint(labelSettings.fontSize);
            var dataLabelFormatter = ValueFormatter.create({
                value: labelSettings.displayUnits,
                precision: labelSettings.precision
            });

            return {
                labelText: (b: D3.Layout.Bin) => {
                    return dataLabelFormatter.format(b.y).toString();
                },
                labelLayout: {
                    x: (b: D3.Layout.Bin) => this.DataLabelMargin + this.histogramDataView.xScale(b.x) + this.widthOfColumn / 2,
                    y: (b: D3.Layout.Bin) => this.histogramDataView.yScale(b.y) - 5
                },
                filter: (b: D3.Layout.Bin) => {
                    return (b != null);
                },
                style: {
                    'fill': labelSettings.color,
                    'font-size': fontSizeInPx,
                },
            };
        }

        private renderLabels(): void {
            var layout = this.getLabaelLayout();
            var dataPointsArray = this.histogramDataView.data;
            dataLabelUtils.drawDefaultLabelsForDataPointChart(dataPointsArray, this.main, layout, this.viewport);
        }

        private static rangesToArray(data: HistogramData[]): number[] {
            return data.reduce((previousValue: number[], currentValue: HistogramData, index: number) => {
                var range: number[];

                range = (index === 0)
                    ? currentValue.range
                    : currentValue.range.slice(1);

                return previousValue.concat(range);
            }, []);
        }

        private rangeToString(range: number[], includeLeftBorder: boolean, valueFormatter: IValueFormatter): string {
            var leftBracket: string,
                rightBracket: string = this.IncludeBrackets.right,
                leftBorder: string = valueFormatter.format(range[0]),
                rightBorder: string = valueFormatter.format(range[1]);

            leftBracket = includeLeftBorder
                ? this.IncludeBrackets.left
                : this.ExcludeBrackets.left;

            return `${leftBracket}${leftBorder}${this.SeparatorNumbers}${rightBorder}${rightBracket}`;
        }

        private renderLegend(): void {
            var legendElements: D3.Selection,
                legendSelection: D3.UpdateSelection,
                datalegends: Legend[] = this.getDataLegends(this.histogramDataView.settings);

            legendElements = this.main
                .select(Histogram.Legends.selector)
                .selectAll(Histogram.Legend.selector);

            legendSelection = legendElements.data(datalegends);

            legendSelection
                .enter()
                .append("svg:text");

            legendSelection
                .attr("x", 0)
                .attr("y", 0)
                .attr("dx", (item: Legend) => item.dx)
                .attr("dy", (item: Legend) => item.dy)
                .attr("transform", (item: Legend) => item.transform)
                .attr("class", Histogram.Legend.class)
                .text((item: Legend) => item.text)
                .classed(Histogram.Legend.class, true);

            legendSelection
                .exit()
                .remove();

            this.legend.select('text').style({
                'display': this.histogramDataView.settings.xAxisSettings.title === true ? 'block' : 'none',
            });

            this.legend.selectAll('text').filter((d, index) => index === 1).style({
                'display': this.histogramDataView.settings.yAxisSettings.title === true ? 'block' : 'none',
            });
        }

        private getDataLegends(settings: HistogramSettings): Legend[] {
            var bottomLegendText: string = Histogram.getLegendText(settings);
            bottomLegendText = Histogram.getLegend(bottomLegendText, settings.yAxisSettings.style, settings.yAxisSettings.displayUnits);

            return [{
                transform: SVGUtil.translate(
                    this.viewport.width / 2,
                    this.viewport.height),
                text: settings.displayName,
                dx: "1em",
                dy: "-1em"
            }, {
                    transform: SVGUtil.translateAndRotate(
                        this.shouldShowYOnRight() ? this.yTitleMargin : 0,
                        this.viewport.height / 2,
                        0,
                        0,
                        270),
                    text: bottomLegendText,
                    dx: "3em"
                }];
        }

        private static getLegendText(settings: HistogramSettings): string {
            return settings.frequency
                ? Histogram.FrequencyText
                : Histogram.DensityText;
        }

        private bindSelectionHandler(columnsSelection: D3.UpdateSelection): void {
            this.setSelection(columnsSelection);

            columnsSelection.on("click", (data: HistogramData) => {
                this.selectionManager.clear();

                data.selectionIds.forEach((selectionId: SelectionId) => {
                    this.selectionManager.select(selectionId, true).then((selectionIds: SelectionId[]) => {
                        if (selectionIds.length > 0) {
                            this.setSelection(columnsSelection, data);
                        } else {
                            this.setSelection(columnsSelection);
                        }
                    });
                });

                d3.event.stopPropagation();
            });

            this.root.on("click", () => {
                this.selectionManager.clear();
                this.setSelection(columnsSelection);
            });
        }

        private setSelection(columnsSelection: D3.UpdateSelection, data?: HistogramData): void {
            columnsSelection.transition()
                .duration(this.durationAnimations)
                .style("fill-opacity", this.MaxOpacity);

            if (!data) {
                return;
            }

            columnsSelection
                .filter((columnSelection: HistogramData) => {
                    return columnSelection !== data;
                })
                .transition()
                .duration(this.durationAnimations)
                .style("fill-opacity", this.MinOpacity);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            var instances: VisualObjectInstance[] = [],
                settings: HistogramSettings;

            if (!this.histogramDataView ||
                !this.histogramDataView.settings) {
                return instances;
            }

            settings = this.histogramDataView.settings;

            switch (options.objectName) {
                case "general": {
                    var general: VisualObjectInstance = {
                        objectName: "general",
                        displayName: "general",
                        selector: null,
                        properties: {
                            bins: settings.bins,
                            frequency: settings.frequency
                        }
                    };

                    instances.push(general);
                    break;
                }
                case "dataPoint": {
                    var dataPoint: VisualObjectInstance = {
                        objectName: "dataPoint",
                        displayName: "dataPoint",
                        selector: null,
                        properties: {
                            fill: settings.fillColor
                        }
                    };

                    instances.push(dataPoint);
                    break;
                }
                case "labels": {
                    var labelsSettings: HistogramLabelSettings = settings.labelSettings;
                    var labels: VisualObjectInstance = {
                        objectName: "labels",
                        displayName: "labels",
                        selector: null,
                        properties: {
                            show: labelsSettings.show,
                            color: labelsSettings.color,
                            displayUnits: labelsSettings.displayUnits,
                            precision: labelsSettings.precision,
                            fontSize: labelsSettings.fontSize
                        }
                    };
                    instances.push(labels);
                    break;
                }
                case "xAxis": {
                    var xAxisSettings: HistogramXAxisSettings = settings.xAxisSettings;
                    var xAxis: VisualObjectInstance = {
                        objectName: "xAxis",
                        displayName: "X-Axis",
                        selector: null,
                        properties: {
                            show: xAxisSettings.show,
                            title: xAxisSettings.title,
                            style: xAxisSettings.style,
                            axisColor: xAxisSettings.axisColor,
                            displayUnits: xAxisSettings.displayUnits,
                            precision: xAxisSettings.precision,
                        }
                    };
                    instances.push(xAxis);
                    break;
                }
                case "yAxis": {
                    var yAxisSettings: HistogramYAxisSettings = settings.yAxisSettings;
                    var yAxis: VisualObjectInstance = {
                        objectName: "yAxis",
                        displayName: "Y-Axis",
                        selector: null,
                        properties: {
                            show: yAxisSettings.show,
                            position: yAxisSettings.position,
                            start: yAxisSettings.start,
                            end: yAxisSettings.end,
                            title: yAxisSettings.title,
                            style: yAxisSettings.style,
                            axisColor: yAxisSettings.axisColor,
                            displayUnits: yAxisSettings.displayUnits,
                            precision: yAxisSettings.precision,
                        }
                    };
                    instances.push(yAxis);
                    break;
                }
            }
            return instances;
        }

        private static getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return dataView.metadata.objects;
        }

        public destroy(): void {
            this.root = null;
        }

        private calculateXAxes(
            source: DataViewMetadataColumn,
            textProperties: TextProperties,
            scrollbarVisible: boolean): IAxisProperties {

            var visualOptions: CalculateScaleAndDomainOptions = {
                viewport: this.viewport,
                margin: this.margin,
                forcedXDomain: Histogram.rangesToArray(this.histogramDataView.data),
                forceMerge: true,
                showCategoryAxisLabel: false,
                showValueAxisLabel: false,
                categoryAxisScaleType: axisScale.linear,
                valueAxisScaleType: null,
                trimOrdinalDataOnOverflow: false
            };

            var width = this.viewport.width;
            var axes = this.calculateXAxesProperties(visualOptions, source);

            axes.willLabelsFit = AxisHelper.LabelLayoutStrategy.willLabelsFit(
                axes,
                width,
                TextMeasurementService.measureSvgTextWidth,
                textProperties);

            // If labels do not fit and we are not scrolling, try word breaking
            axes.willLabelsWordBreak = (!axes.willLabelsFit && !scrollbarVisible) && AxisHelper.LabelLayoutStrategy.willLabelsWordBreak(
                axes, this.margin, width, TextMeasurementService.measureSvgTextWidth,
                TextMeasurementService.estimateSvgTextHeight, TextMeasurementService.getTailoredTextOrDefault,
                textProperties);

            return axes;
        }

        private calculateXAxesProperties(options: CalculateScaleAndDomainOptions, metaDataColumn: DataViewMetadataColumn): IAxisProperties {
            var xAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.width - this.YLegendSize - this.AxisSize,
                dataDomain: options.forcedXDomain,
                metaDataColumn: metaDataColumn,
                formatString: valueFormatter.getFormatString(metaDataColumn, Histogram.Properties["general"]["formatString"]),
                outerPadding: 0,
                isScalar: false,
                isVertical: false,
                useTickIntervalForDisplayUnits: true,
                isCategoryAxis: true,
                getValueFn: (index, type) => index,
                scaleType: options.categoryAxisScaleType
            });

            xAxisProperties.axisLabel = this.histogramDataView.settings.displayName;
            return xAxisProperties;
        }

        private calculateYAxes(
            source: DataViewMetadataColumn,
            textProperties: TextProperties,
            scrollbarVisible: boolean): IAxisProperties {

            var visualOptions: CalculateScaleAndDomainOptions = {
                viewport: this.viewport,
                margin: this.margin,
                forceMerge: true,
                showCategoryAxisLabel: true,
                showValueAxisLabel: false,
                categoryAxisScaleType: axisScale.linear,
                valueAxisScaleType: null,
                trimOrdinalDataOnOverflow: false
            };
            var yAxisSettings: HistogramYAxisSettings = this.histogramDataView.settings.yAxisSettings;
            visualOptions.forcedYDomain = AxisHelper.applyCustomizedDomain([yAxisSettings.start, yAxisSettings.end], visualOptions.forcedYDomain);

            var axes = this.calculateYAxesProperties(visualOptions, source);
            return axes;
        }

        private calculateYAxesProperties(options: CalculateScaleAndDomainOptions, metaDataColumn: DataViewMetadataColumn): IAxisProperties {
            var yAxisSettings: HistogramYAxisSettings = this.histogramDataView.settings.yAxisSettings;
            var yAxisProperties = AxisHelper.createAxis({
                pixelSpan: this.viewport.height - this.XLegendSize + 5,
                dataDomain: AxisHelper.combineDomain(options.forcedYDomain, [yAxisSettings.start, yAxisSettings.end]),
                metaDataColumn: metaDataColumn,
                formatString: valueFormatter.getFormatString(metaDataColumn, Histogram.Properties["general"]["formatString"]),
                outerPadding: this.outerPadding,
                isScalar: true,
                isVertical: true,
                useTickIntervalForDisplayUnits: true,
                isCategoryAxis: false,
                getValueFn: (index, type) => index,
                scaleType: options.categoryAxisScaleType
            });

            return yAxisProperties;
        }

    }
}
