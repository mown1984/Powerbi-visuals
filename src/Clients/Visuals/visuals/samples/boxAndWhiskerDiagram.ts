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

/// <reference path="../../_references.ts"/>

module powerbi.visuals.samples {
    import SelectionManager = utility.SelectionManager;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;

    export module boxAndWhiskerDiagramSorting {
        export enum Sorting {
            Ascending,
            Descending
        };

        export var type: IEnumType = createEnumType([
            { value: Sorting[0], displayName: "Ascending" },
            { value: Sorting[1], displayName: "Descending" }
        ]);
    }

    export module boxAndWhiskerDiagramOrientation {
        export enum Orientation {
            Vertical,
            Horizontal
        };

        export var type: IEnumType = createEnumType([
            { value: Orientation[0], displayName: "Vertical" },
            { value: Orientation[1], displayName: "Horizontal" }
        ]);
    }

    export enum BoxAndWhiskerDiagramLineType {
        Top,
        Bottom,
        Middle,
        Center
    };

    export interface BoxAndWhiskerDiagramSettings {
        sorting: boxAndWhiskerDiagramSorting.Sorting;
        orientation: boxAndWhiskerDiagramOrientation.Orientation;
        sizeOfBox: number;
    }

    export interface BoxAndWhiskerDiagramPoint {
        x: number;
        y: number;
    }

    export interface BoxAndWhiskerDiagramBox extends BoxAndWhiskerDiagramPoint {
        height: number;
        width: number;
        quartiles: number[];
    }

    export interface BoxAndWhiskerDiagramColour {
        colour: string;
    }

    export interface BoxAndWhiskerDiagramLine extends BoxAndWhiskerDiagramPoint {
        x1: number;
        y1: number;
        type: BoxAndWhiskerDiagramLineType;
    }

    export interface BoxAndWhiskerDiagramWhisker extends BoxAndWhiskerDiagramColour {
        lines: BoxAndWhiskerDiagramLine[];
        minValue: number;
        maxValue: number;
    }

    export interface BoxAndWhiskerDiagramOutlier extends BoxAndWhiskerDiagramPoint {
        value: number;
        size: number;
    }

    export interface BoxAndWhisker
        extends BoxAndWhiskerDiagramPoint,
        BoxAndWhiskerDiagramColour {
        name: string;
        box: BoxAndWhiskerDiagramBox;
        whisker: BoxAndWhiskerDiagramWhisker;
        outliers: BoxAndWhiskerDiagramOutlier[];
        selectionId: SelectionId;
    }

    export interface BoxAndWhiskerDataView {
        data: BoxAndWhisker[];
        settings: BoxAndWhiskerDiagramSettings;
        scale: D3.Scale.LinearScale; // TODO: remove it.
        minValue: number; // TODO: remove it.
        maxValue: number; // TODO: remove it.
    }

    export interface BoxAndWhiskerDiagramConstructorOptions {
        svg?: D3.Selection;
        margin?: IMargin;
        nodeMargin?: IMargin;
    }

    interface BoxAndWhiskerDiagramProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    interface BoxAndWhiskerDiagramProperties {
        [objectName: string]: BoxAndWhiskerDiagramProperty;
    }

    export class BoxAndWhiskerDiagram implements IVisual {
        private static ClassName: string = "boxAndWhiskerDiagram";

        private static Properties: BoxAndWhiskerDiagramProperties = {
            general: {
                formatString: {
                    objectName: "general",
                    propertyName: "formatString"
                },
                sorting: {
                    objectName: "general",
                    propertyName: "sorting"
                },
                orientation: {
                    objectName: "general",
                    propertyName: "orientation"
                }
            },
            box: {
                size: {
                    objectName: "box",
                    propertyName: "size"
                }
            },
            dataPoint: {
                fill: {
                    objectName: "dataPoint",
                    propertyName: "fill"
                }
            }
        };

        private static NodesSelector: ClassAndSelector = createClassAndSelector("nodes");
        private static NodeSelector: ClassAndSelector = createClassAndSelector("node");

        private static BoxSelector: ClassAndSelector = createClassAndSelector("box");

        private static WhiskersSelector: ClassAndSelector = createClassAndSelector("whiskers");
        private static WhiskerSelector: ClassAndSelector = createClassAndSelector("whisker");
        private static WhiskerCenterSelector: ClassAndSelector = createClassAndSelector("whisker-center");

        private static OutliersSelector: ClassAndSelector = createClassAndSelector("outliers");
        private static OutlierSelector: ClassAndSelector = createClassAndSelector("outlier");

        private static AxesSelector: ClassAndSelector = createClassAndSelector("axes");

        private static DefaultColour: string = "steelblue";

        private static DefaultSettings: BoxAndWhiskerDiagramSettings = {
            sorting: boxAndWhiskerDiagramSorting.Sorting.Ascending,
            orientation: boxAndWhiskerDiagramOrientation.Orientation.Vertical,
            sizeOfBox: 35
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Category",
                kind: VisualDataRoleKind.Grouping,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Category")
            }, {
                    name: "Values",
                    kind: VisualDataRoleKind.Measure,
                    displayName: data.createDisplayNameGetter("Role_DisplayName_Values")
                }],
            dataViewMappings: [{
                conditions: [{
                    "Category": { min: 0, max: 1 }, "Values": { min: 0 }
                }],
                categorical: {
                    categories: {
                        for: { in: "Category" }
                    },
                    values: {
                        for: { in: "Values" }
                    }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: {
                            type: { formatting: { formatString: true } }
                        },
                        sorting: {
                            displayName: "Sorting",
                            type: { enumeration: boxAndWhiskerDiagramSorting.type }
                        },
                        orientation: {
                            displayName: "Orientation",
                            type: { enumeration: boxAndWhiskerDiagramOrientation.type }
                        }
                    }
                },
                box: {
                    displayName: "Box",
                    properties: {
                        size: {
                            displayName: "Size",
                            type: { numeric: true }
                        }
                    }
                },
                dataPoint: {
                    displayName: data.createDisplayNameGetter("Visual_DataPoint"),
                    description: data.createDisplayNameGetter("Visual_DataPointDescription"),
                    properties: {
                        //TODO: Add default colour.
                        fill: {
                            displayName: data.createDisplayNameGetter("Visual_Fill"),
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                }
            }
        };

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        private nodeMargin: IMargin = {
            top: 5,
            right: 15,
            bottom: 15,
            left: 5
        };

        private svg: D3.Selection;
        private root: D3.Selection;
        private main: D3.Selection;
        private nodes: D3.Selection;
        private axes: D3.Selection;
        private overlappingDiv: D3.Selection;

        private viewport: IViewport;

        private selectionManager: SelectionManager;

        private colours: IDataColorPalette;

        private dataView: BoxAndWhiskerDataView;

        constructor(constructorOptions?: BoxAndWhiskerDiagramConstructorOptions) {
            if (constructorOptions) {
                this.svg = constructorOptions.svg;
                this.margin = constructorOptions.margin || this.margin;
                this.nodeMargin = constructorOptions.nodeMargin || this.nodeMargin;
            }
        }

        public init(visualsInitOptions: VisualInitOptions): void {
            if (this.svg) {
                this.root = this.svg;
            } else {
                this.overlappingDiv = d3.select(visualsInitOptions.element.get(0)).append("div");
                this.overlappingDiv.style('overflow-x', 'overlay')
                this.root = this.overlappingDiv.append("svg");
            }

            var style: IVisualStyle = visualsInitOptions.style;

            this.colours = style && style.colorPalette
                ? style.colorPalette.dataColors
                : new DataColorPalette();

            this.selectionManager = new SelectionManager({ hostServices: visualsInitOptions.host });

            this.root.classed(BoxAndWhiskerDiagram.ClassName, true);

            this.main = this.root.append("g");

            this.nodes = this.main
                .append("g")
                .classed(BoxAndWhiskerDiagram.NodesSelector["class"], true);

            this.axes = this.main
                .append("g")
                .classed(BoxAndWhiskerDiagram.AxesSelector["class"], true);
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions || !visualUpdateOptions.dataViews) {
                return;
            }

            var dataView: DataView = visualUpdateOptions.dataViews[0];

            this.updateViewport(visualUpdateOptions.viewport);

            this.dataView = this.converter(dataView);

            this.render();
        }

        private updateViewport(viewport: IViewport): void {
            var height: number,
                width: number,
                marginByHeight: number = this.margin.top + this.margin.bottom,
                marginByWidth: number = this.margin.left + this.margin.right;

            height = viewport.height > marginByHeight
                ? viewport.height - marginByHeight
                : 0;

            width = viewport.width > marginByWidth
                ? viewport.width - marginByWidth
                : 0;

            this.viewport = {
                height: height,
                width: width
            };

            this.updateElements(viewport.height, viewport.width);
        }

        private updateElements(height: number, width: number): void {
            this.root.attr({
                "height": height > 0 ? height : 0,
                "width": width > 0 ? width : 0
            });
            this.overlappingDiv.style(
                "width", (width > 0 ? width : 0) + 'px'
            );
            this.main.attr("transform", SVGUtil.translate(this.margin.left, this.margin.top));
        }
        private totalWidthOfBoxes = 0;
        public converter(dataView: DataView): BoxAndWhiskerDataView {
            this.totalWidthOfBoxes = 0;
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.values) {

                return {
                    data: [],
                    minValue: -Number.MAX_VALUE,
                    maxValue: Number.MAX_VALUE,
                    settings: BoxAndWhiskerDiagram.DefaultSettings,
                    scale: null
                };
            }

            var categories: any[] = dataView.categorical.categories[0].values,
                valueColumns: DataViewValueColumns = dataView.categorical.values,
                identities: DataViewScopeIdentity[] = [],
                boxAndWhiskers: BoxAndWhisker[],
                settings: BoxAndWhiskerDiagramSettings = this.parseSettings(dataView),
                objects: DataViewObjects[] = dataView.categorical.categories[0].objects || [],
                minValue: number = Number.MAX_VALUE,
                maxValue: number = -Number.MAX_VALUE,
                scale: D3.Scale.LinearScale;

            if (dataView.categorical.categories[0].identity && dataView.categorical.categories[0].identity.length > 0) {
                identities = dataView.categorical.categories[0].identity;
            }

            boxAndWhiskers = categories.map((category: any, index: number): BoxAndWhisker => {
                var localMinValue: number = Number.MAX_VALUE,
                    localMaxValue: number = -Number.MAX_VALUE,
                    values: any[],
                    box: BoxAndWhiskerDiagramBox,
                    whisker: BoxAndWhiskerDiagramWhisker,
                    selectionId: SelectionId,
                    scale: D3.Scale.LinearScale,
                    x: number,
                    y: number,
                    outliers: BoxAndWhiskerDiagramOutlier[] = [];

                values = valueColumns.map((valueColumn: DataViewCategoricalColumn): number => {
                    var value: number = valueColumn.values[index] || 0;

                    if (value < localMinValue) {
                        localMinValue = value;
                    }

                    if (value > localMaxValue) {
                        localMaxValue = value;
                    }

                    return value;
                }).sort((firstValue: number, secondValue: number): number => {
                    if (settings.sorting === boxAndWhiskerDiagramSorting.Sorting.Ascending) {
                        return firstValue - secondValue;
                    } else {
                        return secondValue - firstValue;
                    }
                });

                box = {
                    x: 0,
                    y: 0,
                    width: settings.sizeOfBox,
                    height: 0,
                    quartiles: this.getQuartiles(values)
                };
                this.totalWidthOfBoxes += settings.sizeOfBox;
                if (localMinValue < minValue) {
                    minValue = localMinValue;
                }

                if (localMaxValue > maxValue) {
                    maxValue = localMaxValue;
                }

                localMinValue = Number.MAX_VALUE;
                localMaxValue = -Number.MAX_VALUE;

                values.forEach((value: number) => {
                    if (this.isQutlier(value, box.quartiles[0], box.quartiles[2])) {
                        outliers.push({
                            value: value,
                            x: 0,
                            y: 0,
                            size: 0
                        });
                    } else {
                        if (value < localMinValue) {
                            localMinValue = value;
                        }

                        if (value > localMaxValue) {
                            localMaxValue = value;
                        }
                    }
                });

                whisker = {
                    lines: [],
                    minValue: localMinValue,
                    maxValue: localMaxValue,
                    colour: "black"
                };

                if (identities[index]) {
                    selectionId = SelectionId.createWithId(identities[index]);
                } else {
                    selectionId = SelectionId.createNull();
                }

                return {
                    x: 0,
                    y: 0,
                    name: category,
                    box: box,
                    whisker: whisker,
                    outliers: outliers,
                    selectionId: selectionId,
                    colour: this.getColour(
                        BoxAndWhiskerDiagram.Properties["dataPoint"]["fill"],
                        BoxAndWhiskerDiagram.DefaultColour,
                        objects[index])
                };
            });

            scale = d3.scale.linear()
                .domain([minValue, maxValue])
                .range([
                    0,
                    settings.orientation === boxAndWhiskerDiagramOrientation.Orientation.Vertical
                        ? this.viewport.height
                        : this.viewport.width
                ]);

            this.findPositionForEachBox(boxAndWhiskers, settings, scale);


            this.root.attr({
                "width": this.totalWidthOfBoxes + 200
            });



            return {
                data: boxAndWhiskers,
                settings: settings,
                minValue: minValue,
                maxValue: maxValue,
                scale: scale
            };
        }

        private parseSettings(dataView: DataView): BoxAndWhiskerDiagramSettings {
            var objects: DataViewObjects = this.getObjectsFromDataView(dataView),
                sorting: string,
                orientation: string,
                sizeOfBox: number;

            sorting = DataViewObjects.getValue<string>(
                objects,
                BoxAndWhiskerDiagram.Properties["general"]["sorting"],
                boxAndWhiskerDiagramSorting.Sorting[BoxAndWhiskerDiagram.DefaultSettings.sorting]);

            orientation = DataViewObjects.getValue<string>(
                objects,
                BoxAndWhiskerDiagram.Properties["general"]["orientation"],
                boxAndWhiskerDiagramOrientation.Orientation[BoxAndWhiskerDiagram.DefaultSettings.orientation]);

            sizeOfBox = DataViewObjects.getValue<number>(
                objects,
                BoxAndWhiskerDiagram.Properties["box"]["size"],
                BoxAndWhiskerDiagram.DefaultSettings.sizeOfBox);

            return {
                sorting: boxAndWhiskerDiagramSorting.Sorting[sorting],
                orientation: boxAndWhiskerDiagramOrientation.Orientation[orientation],
                sizeOfBox: sizeOfBox
            };
        }

        private getObjectsFromDataView(dataView: DataView): DataViewObjects {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.objects) {
                return null;
            }

            return dataView.metadata.objects;
        }

        private getQuartiles(values: number[]): number[] {
            return [
                d3.quantile(values, 0.25), // The first quartile.
                d3.quantile(values, 0.5), // The second quartile (median).
                d3.quantile(values, 0.75) // The third quartile.
            ];
        }

        private getColour(properties: DataViewObjectPropertyIdentifier, defaultColor: string, objects: DataViewObjects): string {
            var colorHelper: ColorHelper;

            colorHelper = new ColorHelper(this.colours, properties, defaultColor);

            return colorHelper.getColorForMeasure(objects, "");
        }

        private isQutlier(value: number, quartile25: number, quartile75: number): boolean {
            var leftBorder: number,
                rightBorder: number,
                range: number = quartile75 - quartile25,
                k: number = 1.5;

            leftBorder = quartile25 - k * range;
            rightBorder = quartile75 + k * range;

            return !(value >= leftBorder && value <= rightBorder);
        }

        private findPositionForEachBox(
            boxAndWhiskers: BoxAndWhisker[],
            settings: BoxAndWhiskerDiagramSettings,
            scale: D3.Scale.LinearScale
        ): void {
            var shiftByAxis: number = 0;

            boxAndWhiskers.forEach((boxAndWhisker: BoxAndWhisker): void => {
                if (settings.orientation === boxAndWhiskerDiagramOrientation.Orientation.Vertical) {
                    shiftByAxis += this.nodeMargin.left;

                    boxAndWhisker.x = shiftByAxis;

                    shiftByAxis += this.nodeMargin.right;
                } else {
                    shiftByAxis += this.nodeMargin.top;

                    boxAndWhisker.x = shiftByAxis;//y

                    shiftByAxis += this.nodeMargin.bottom;
                }

                shiftByAxis += boxAndWhisker.box.width;

                boxAndWhisker.box.height =
                    scale(boxAndWhisker.box.quartiles[2]) - scale(boxAndWhisker.box.quartiles[0]);

                boxAndWhisker.box.x = 0;
                boxAndWhisker.box.y = scale.range()[1] - scale(boxAndWhisker.box.quartiles[0]) - boxAndWhisker.box.height;

                this.findPositionForEachOutlier(boxAndWhisker, scale);
                this.fintPositionForEachWhisker(boxAndWhisker, scale);
            });
        }

        private findPositionForEachOutlier(boxAndWhisker: BoxAndWhisker, scale: D3.Scale.LinearScale): void {
            var x: number = boxAndWhisker.box.width / 2;

            boxAndWhisker.outliers.forEach((outlier: BoxAndWhiskerDiagramOutlier) => {
                outlier.x = x;
                outlier.size = x / 2;
                outlier.y = scale.range()[1] - scale(outlier.value);
            });
        }

        private fintPositionForEachWhisker(boxAndWhisker: BoxAndWhisker, scale: D3.Scale.LinearScale): void {
            var middleLine: BoxAndWhiskerDiagramLine,
                topCenterLine: BoxAndWhiskerDiagramLine,
                bottomCenterLine: BoxAndWhiskerDiagramLine,
                topLine: BoxAndWhiskerDiagramLine,
                bottomLine: BoxAndWhiskerDiagramLine,
                y: number,
                yTop: number,
                yBottom: number,
                x: number,
                range: number[] = scale.range();

            x = boxAndWhisker.box.width / 2;

            y = range[1] - scale(boxAndWhisker.box.quartiles[1]);
            yTop = range[1] - scale(boxAndWhisker.whisker.maxValue);
            yBottom = range[1] - scale(boxAndWhisker.whisker.minValue);

            middleLine = {
                x: 0,
                y: y,
                x1: boxAndWhisker.box.width,
                y1: y,
                type: BoxAndWhiskerDiagramLineType.Middle
            };

            topCenterLine = {
                x: x,
                y: boxAndWhisker.box.y,
                x1: x,
                y1: yTop,
                type: BoxAndWhiskerDiagramLineType.Center
            };

            bottomCenterLine = {
                x: x,
                y: boxAndWhisker.box.y + boxAndWhisker.box.height,
                x1: x,
                y1: yBottom,
                type: BoxAndWhiskerDiagramLineType.Center
            };

            topLine = {
                x: 0,
                y: yTop,
                x1: boxAndWhisker.box.width,
                y1: yTop,
                type: BoxAndWhiskerDiagramLineType.Top
            };

            bottomLine = {
                x: 0,
                y: yBottom,
                x1: boxAndWhisker.box.width,
                y1: yBottom,
                type: BoxAndWhiskerDiagramLineType.Bottom
            };

            boxAndWhisker.whisker.lines = [
                middleLine,
                topCenterLine,
                bottomCenterLine,
                topLine,
                bottomLine
            ];
        }

        private render(): void {
            if (!this.dataView) {
                return;
            }

            this.updateOrientation();
            this.renderBoxAndWhisker();
            this.renderAxes();
        }

        private updateOrientation(): void {
            var settings: BoxAndWhiskerDiagramSettings = this.dataView.settings;

            if (settings.orientation === boxAndWhiskerDiagramOrientation.Orientation.Horizontal) {
                this.nodes.attr("transform", SVGUtil.translateAndRotate(this.viewport.width, 0, 0, 0, 90));
            } else {
                this.nodes.attr("transform", null);
            }
        }

        private renderBoxAndWhisker(): void {
            var data: BoxAndWhisker[] = this.dataView.data,
                nodeSelection: D3.UpdateSelection,
                nodeEnterSelection: D3.Selection,
                nodeElements: D3.Selection;

            nodeElements = this.main
                .select(BoxAndWhiskerDiagram.NodesSelector.selector)
                .selectAll(BoxAndWhiskerDiagram.NodeSelector.selector);

            nodeSelection = nodeElements.data(data);

            nodeEnterSelection = nodeSelection
                .enter()
                .append("g");

            nodeSelection
                .attr("transform", (boxAndWhisker: BoxAndWhisker) => {
                    return SVGUtil.translate(boxAndWhisker.x, boxAndWhisker.y);
                })
                .classed(BoxAndWhiskerDiagram.NodeSelector.class, true);

            this.renderBoxes(nodeSelection, nodeEnterSelection);
            this.renderWhiskers(nodeSelection, nodeEnterSelection);
            this.renderOutlier(nodeSelection, nodeEnterSelection);

            nodeSelection
                .exit()
                .remove();
        }

        private renderBoxes(nodeSelection: D3.UpdateSelection, nodeEnterSelection: D3.Selection): void {
            nodeEnterSelection
                .append("rect")
                .classed(BoxAndWhiskerDiagram.BoxSelector.class, true);

            nodeSelection
                .select(BoxAndWhiskerDiagram.BoxSelector.selector)
                .attr({
                    x: (boxAndWhisker: BoxAndWhisker) => boxAndWhisker.box.x,
                    y: (boxAndWhisker: BoxAndWhisker) => boxAndWhisker.box.y,
                    width: (boxAndWhisker: BoxAndWhisker) => boxAndWhisker.box.width,
                    height: (boxAndWhisker: BoxAndWhisker) => boxAndWhisker.box.height
                })
                .style({
                    fill: (boxAndWhisker: BoxAndWhisker) => boxAndWhisker.colour,
                    stroke: (boxAndWhisker: BoxAndWhisker) => d3.rgb(boxAndWhisker.colour).darker(1.5)
                });
        }

        private renderWhiskers(nodeSelection: D3.UpdateSelection, nodeEnterSelection: D3.Selection): void {
            var whiskersSelection: D3.UpdateSelection,
                whiskerElements: D3.Selection;

            nodeEnterSelection
                .append("g")
                .classed(BoxAndWhiskerDiagram.WhiskersSelector.class, true);

            whiskerElements = nodeSelection
                .select(BoxAndWhiskerDiagram.WhiskersSelector.selector)
                .selectAll(BoxAndWhiskerDiagram.WhiskerSelector.selector);

            whiskersSelection = whiskerElements.data((data: BoxAndWhisker): BoxAndWhiskerDiagramLine[] => {
                return data.whisker.lines;
            });

            whiskersSelection
                .enter()
                .append("line");

            whiskersSelection
                .attr({
                    "x1": (line: BoxAndWhiskerDiagramLine) => line.x,
                    "y1": (line: BoxAndWhiskerDiagramLine) => line.y,
                    "x2": (line: BoxAndWhiskerDiagramLine) => line.x1,
                    "y2": (line: BoxAndWhiskerDiagramLine) => line.y1
                })
                .style("stroke", "black")
                .classed(BoxAndWhiskerDiagram.WhiskerSelector.class, true)
                .classed(BoxAndWhiskerDiagram.WhiskerCenterSelector.class, (line: BoxAndWhiskerDiagramLine) => {
                    return line.type === BoxAndWhiskerDiagramLineType.Center;
                });

            whiskersSelection
                .exit()
                .remove();
        }

        private renderOutlier(nodeSelection: D3.UpdateSelection, nodeEnterSelection: D3.Selection): void {
            var outliersSelection: D3.UpdateSelection,
                outlierElements: D3.Selection;

            nodeEnterSelection
                .append("g")
                .classed(BoxAndWhiskerDiagram.OutliersSelector.class, true);

            outlierElements = nodeSelection
                .select(BoxAndWhiskerDiagram.OutliersSelector.selector)
                .selectAll(BoxAndWhiskerDiagram.OutlierSelector.selector);

            outliersSelection = outlierElements.data((data: BoxAndWhisker): BoxAndWhiskerDiagramOutlier[] => {
                return data.outliers;
            });

            outliersSelection
                .enter()
                .append("circle");

            outliersSelection
                .attr({
                    cx: (outlier: BoxAndWhiskerDiagramOutlier): number => outlier.x,
                    cy: (outlier: BoxAndWhiskerDiagramOutlier): number => outlier.y,
                    r: (outlier: BoxAndWhiskerDiagramOutlier): number => outlier.size
                })
                .style("fill", "green")
                .classed(BoxAndWhiskerDiagram.OutlierSelector.class, true);

            outliersSelection
                .exit()
                .remove();
        }

        private renderAxes(): void {

        }

        private getMedianPosition(scale: D3.Scale.LinearScale, boxAndWhisker: BoxAndWhisker): number {
            return scale(boxAndWhisker.box.quartiles[1]);
        }

        // private renderTooltip(selection: D3.UpdateSelection): void {
        //     TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
        //         return (<SankeyDiagramTooltipData> tooltipEvent.data).tooltipData;
        //     });
        // }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            var enumeration: ObjectEnumerationBuilder = new ObjectEnumerationBuilder();

            if (!this.dataView) {
                return [];
            }

            switch (options.objectName) {
                case "general": {
                    this.enumerateGeneral(enumeration);
                    break;
                }
                case "dataPoint": {
                    this.enumerateDataPoint(enumeration);
                    break;
                }
                case "box": {
                    this.enumerateBox(enumeration);
                    break;
                }
            }

            return enumeration.complete();
        }

        private enumerateGeneral(enumeration: ObjectEnumerationBuilder): void {
            var settings: BoxAndWhiskerDiagramSettings = this.dataView.settings;

            enumeration.pushInstance({
                objectName: "general",
                selector: null,
                properties: {
                    sorting: boxAndWhiskerDiagramSorting.Sorting[settings.sorting],
                    orientation: boxAndWhiskerDiagramOrientation.Orientation[settings.orientation]
                }
            });
        }

        private enumerateDataPoint(enumeration: ObjectEnumerationBuilder): void {
            var data: BoxAndWhisker[] = this.dataView.data;

            if (!data || !(data.length > 0)) {
                return;
            }

            data.forEach((item: BoxAndWhisker) => {
                enumeration.pushInstance({
                    objectName: "dataPoint",
                    displayName: item.name,
                    selector: item.selectionId.getSelector(),
                    properties: {
                        fill: { solid: { color: item.colour } }
                    }
                });
            });
        }

        private enumerateBox(enumeration: ObjectEnumerationBuilder): void {
            var settings: BoxAndWhiskerDiagramSettings = this.dataView.settings;

            enumeration.pushInstance({
                objectName: "box",
                selector: null,
                properties: {
                    size: settings.sizeOfBox
                }
            });
        }
    }
}