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

/// <reference path="../../_references.ts" />

module powerbi.visuals.samples {
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import ValueFormatter = powerbi.visuals.valueFormatter;

    export interface SankeyDiagramConstructorOptions {
        svg?: D3.Selection;
        margin?: IMargin;
        curvatureOfLinks?: number;
    }

    export interface SankeyDiagramLabel {
        name: string;
        formattedName: string;
        width: number;
        colour: string;
    }

    export interface SankeyDiagramTooltipData {
        tooltipData: TooltipDataItem[];
    }

    export interface SankeyDiagramScale {
        x: number;
        y: number;
    }

    export interface SankeyDiagramSettings {
        scale?: SankeyDiagramScale;
        isVisibleLabels?: boolean;
        colourOfLabels: string;
    }

    export interface SankeyDiagramNode extends SankeyDiagramTooltipData {
        label: SankeyDiagramLabel;
        weigth: number;
        links: SankeyDiagramLink[];
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        colour: string;
    }

    export interface SankeyDiagramLink extends SankeyDiagramTooltipData {
        source: SankeyDiagramNode;
        destination: SankeyDiagramNode;
        weigth: number;
        height?: number;
        dySource?: number;
        dyDestination?: number;
    }

    export interface SankeyDiagramDataView {
        nodes: SankeyDiagramNode[];
        links: SankeyDiagramLink[];
        settings: SankeyDiagramSettings;
    }

    export interface SankeyDiagramRoleNames {
        rows: string;
        columns: string;
        values: string;
    }

    interface SankeyDiagramDataPoint {
        source: any;
        destination: any;
        weigth: number;
    }

    interface SankeyDiagramProperty {
        [propertyName: string]: DataViewObjectPropertyIdentifier;
    }

    interface SankeyDiagramProperties {
        [objectName: string]: SankeyDiagramProperty;
    }

    export class SankeyDiagram implements IVisual {
        private static ClassName: string = "sankeyDiagram";

        private static Properties: SankeyDiagramProperties = {
            general: {
                formatString: {
                    objectName: "general",
                    propertyName: "formatString"
                }
            },
            labels: {
                show: {
                    objectName: "labels",
                    propertyName: "show"
                },
                fill: {
                    objectName: "labels",
                    propertyName: "fill"
                }
            }
        };

        private static Nodes: ClassAndSelector = {
            "class": "nodes",
            selector: ".nodes"
        };

        private static Node: ClassAndSelector = {
            "class": "node",
            selector: ".node"
        };

        private static NodeRect: ClassAndSelector = {
            "class": "nodeRect",
            selector: ".nodeRect"
        };

        private static NodeLabel: ClassAndSelector = {
            "class": "nodeLabel",
            selector: ".nodeLabel"
        };

        private static Links: ClassAndSelector = {
            "class": "links",
            selector: ".links"
        };

        private static Link: ClassAndSelector = {
            "class": "link",
            selector: ".link"
        };

        private static DefaultColour: string = "rgb(62, 187, 162)";

        private static DefaultSettings: SankeyDiagramSettings = {
            isVisibleLabels: true,
            scale: { x: 1, y: 1 },
            colourOfLabels: "black"
        };

        private static MinWidthOfLabel: number = 35;

        public static RoleNames: SankeyDiagramRoleNames = {
            rows: "Source",
            columns: "Destination",
            values: "Weight"
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: SankeyDiagram.RoleNames.rows,
                kind: VisualDataRoleKind.Grouping,
                displayName: SankeyDiagram.RoleNames.rows
            }, {
                name: SankeyDiagram.RoleNames.columns,
                kind: VisualDataRoleKind.Grouping,
                displayName: SankeyDiagram.RoleNames.columns
            }, {
                name: SankeyDiagram.RoleNames.values,
                kind: VisualDataRoleKind.Measure,
                displayName: SankeyDiagram.RoleNames.values
            }],
            dataViewMappings: [{
                conditions: [
                    { "Source": { min: 0, max: 1 }, "Destination": { min: 0, max: 1 }, "Weight": { min: 0, max: 0 } },
                    { "Source": { min: 0, max: 1 }, "Destination": { min: 0, max: 1 }, "Weight": { min: 1, max: 1 } }
                ],
                categorical: {
                    categories: { 
                        for: { in: SankeyDiagram.RoleNames.rows },
                        dataReductionAlgorithm: { top: {} }
                    },
                    values: {
                        select: [
                            { bind: { to: SankeyDiagram.RoleNames.columns } },
                            { bind: { to: SankeyDiagram.RoleNames.values } }
                        ]
                    }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: { type: { formatting: { formatString: true } } }
                    }
                },
                labels: {
                    displayName: data.createDisplayNameGetter('Visual_DataPointsLabels'),
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        fill: {
                            displayName: data.createDisplayNameGetter('Visual_Fill'),
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

        private NodePadding: number = 5;
        private LabelPadding: number = 4;

        private nodeWidth: number = 21.5;
        private curvatureOfLinks: number = 0.5;

        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private nodes: D3.Selection;
        private links: D3.Selection;

        private colours: IDataColorPalette;

        private viewport: IViewport;

        private textProperties: TextProperties;

        private dataView: SankeyDiagramDataView;

        constructor(constructorOptions?: SankeyDiagramConstructorOptions) {
            if (constructorOptions) {
                this.svg = constructorOptions.svg || undefined;
                this.margin = constructorOptions.margin || this.margin;
                this.curvatureOfLinks = constructorOptions.curvatureOfLinks || this.curvatureOfLinks;
            }
        }

        public init(visualsInitOptions: VisualInitOptions): void {
            if (this.svg) {
                this.root = this.svg;
            } else {
                this.root = d3.select(visualsInitOptions.element.get(0))
                    .append("svg");
            }

            this.textProperties = {
                fontFamily: this.root.style("font-family"),
                fontSize: this.root.style("font-size")
            };

            let style: IVisualStyle = visualsInitOptions.style;

            this.colours = style && style.colorPalette
                ? style.colorPalette.dataColors
                : new DataColorPalette();

            this.root.classed(SankeyDiagram.ClassName, true);

            this.main = this.root.append("g");

            this.links = this.main
                .append("g")
                .classed(SankeyDiagram.Links["class"], true);

            this.nodes = this.main
                .append("g")
                .classed(SankeyDiagram.Nodes["class"], true);
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.dataViews) {
                return;
            }

            let dataView: DataView = visualUpdateOptions.dataViews[0],
                sankeyDiagramDataView: SankeyDiagramDataView;

            this.updateViewport(visualUpdateOptions.viewport);

            sankeyDiagramDataView = this.converter(dataView);

            this.findNodePosition(sankeyDiagramDataView);

            this.dataView = sankeyDiagramDataView;

            this.render(sankeyDiagramDataView);
        }

        private updateViewport(viewport: IViewport): void {
            let height: number,
                width: number;

            height = viewport.height - this.margin.top - this.margin.bottom;
            width = viewport.width - this.margin.left - this.margin.right;

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
        }

        public converter(dataView: DataView): SankeyDiagramDataView {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[1] ||
                !dataView.categorical.categories[0].values ||
                !dataView.categorical.categories[1].values) {
                return {
                    nodes: [],
                    links: [],
                    settings: {
                        scale: { x: 1, y: 1 },
                        colourOfLabels: SankeyDiagram.DefaultSettings.colourOfLabels
                    }
                };
            }

            let nodes: SankeyDiagramNode[] = [],
                links: SankeyDiagramLink[] = [],
                dataPoints: SankeyDiagramDataPoint[] = [],
                categories: any[] = dataView.categorical.categories[0].values,
                secondCategories: any[] = dataView.categorical.categories[1].values,
                valuesColumns: DataViewValueColumns = dataView.categorical.values,
                values: number[] = [],
                allCategories: any[],
                valueFormatter: IValueFormatter,
                objects: DataViewObjects,
                labelColour: string,
                settings: SankeyDiagramSettings,
                shiftOfColour: number;

            objects = this.getObjectsFromDataView(dataView);

            labelColour = this.getColour(
                SankeyDiagram.Properties["labels"]["fill"],
                SankeyDiagram.DefaultSettings.colourOfLabels,
                objects);

            if (valuesColumns &&
                    valuesColumns[0] &&
                    valuesColumns[0].values &&
                    valuesColumns[0].values.length > 0) {
                values = valuesColumns[0].values;
            }

            dataPoints = categories.map((item: any, index: number) => {
                let weigth: number = values[index] || 1;

                return {
                    source: item,
                    destination: secondCategories[index],
                    weigth: weigth
                };
            });

            allCategories = categories.concat(secondCategories);

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(
                    dataView.categorical.categories[0].source,
                    SankeyDiagram.Properties["general"]["formatString"]),
                value: allCategories[0],
                value2: allCategories[allCategories.length - 1]
            });

            allCategories.forEach((item: any, index: number) => {
                if (!nodes.some((node: SankeyDiagramNode) => {
                    return item === node.label.name;
                })) {
                    let formattedValue: string = valueFormatter.format(item),
                        label: SankeyDiagramLabel;

                    label = {
                        name: item,
                        formattedName: valueFormatter.format(item),
                        width: TextMeasurementService.measureSvgTextWidth({
                            text: formattedValue,
                            fontFamily: this.textProperties.fontFamily,
                            fontSize: this.textProperties.fontSize
                        }),
                        colour: labelColour
                    };

                    nodes.push({
                        label: label,
                        links: [],
                        weigth: 0,
                        width: this.nodeWidth,
                        height: 0,
                        colour: SankeyDiagram.DefaultColour,
                        tooltipData: []
                    });
                }
            });

            shiftOfColour = this.colours.getAllColors().length / nodes.length;

            nodes.forEach((node: SankeyDiagramNode, index: number) => {
                node.colour = this.colours.getColorByIndex(Math.floor(index * shiftOfColour)).value;
            });

            dataPoints.forEach((dataPoint: SankeyDiagramDataPoint) => {
                let sourceNode: SankeyDiagramNode,
                    destinationNode: SankeyDiagramNode,
                    link: SankeyDiagramLink;

                if (dataPoint.source === dataPoint.destination) {
                    return;
                }

                nodes.forEach((node: SankeyDiagramNode) => {
                    if (node.label.name === dataPoint.source) {
                        sourceNode = node;
                    }

                    if (node.label.name === dataPoint.destination) {
                        destinationNode = node;
                    }
                });

                link = {
                    source: sourceNode,
                    destination: destinationNode,
                    weigth: dataPoint.weigth,
                    height: dataPoint.weigth,
                    tooltipData: this.getTooltipDataForLink(
                        sourceNode.label.formattedName,
                        destinationNode.label.formattedName,
                        dataPoint.weigth)
                };

                links.push(link);

                sourceNode.links.push(link);
                destinationNode.links.push(link);

                this.updateValueOfNode(sourceNode);
                this.updateValueOfNode(destinationNode);

                sourceNode.tooltipData = 
                    this.getTooltipForNode(sourceNode.label.formattedName, sourceNode.weigth);

                destinationNode.tooltipData =
                    this.getTooltipForNode(destinationNode.label.formattedName, destinationNode.weigth);
            });

            settings = this.parseSettings(objects);

            settings.colourOfLabels = labelColour;

            return {
                nodes: nodes,
                links: links,
                settings: settings
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

        private getColour(properties: DataViewObjectPropertyIdentifier, defaultColor: string, objects: DataViewObjects): string {
            let colorHelper: ColorHelper;

            colorHelper = new ColorHelper(this.colours, properties, defaultColor);

            return colorHelper.getColorForMeasure(objects, "");
        }

        private getTooltipDataForLink(sourceNodeName: string, destinationNodeName: string, linkWeight: number): TooltipDataItem[] {
            return [{
                displayName: SankeyDiagram.RoleNames.rows,
                value: sourceNodeName
            }, {
                displayName: SankeyDiagram.RoleNames.columns,
                value: destinationNodeName
            }, {
                displayName: SankeyDiagram.RoleNames.values,
                value: linkWeight.toString()
            }];
        }

        private updateValueOfNode(node: SankeyDiagramNode): void {
            node.weigth = node.links.reduce((previousValue: number, currentValue: SankeyDiagramLink) => {
                return previousValue + currentValue.weigth;
            }, 0);
        }

        private getTooltipForNode(nodeName: string, nodeWeight: number): TooltipDataItem[] {
            return [{
                displayName: "Name",
                value: nodeName
            }, {
                displayName: SankeyDiagram.RoleNames.values,
                value: nodeWeight.toString()
            }];
        }

        private parseSettings(objects: DataViewObjects): SankeyDiagramSettings {
            let isVisibleLabels: boolean = false;

            isVisibleLabels = DataViewObjects.getValue(objects, SankeyDiagram.Properties["labels"]["show"], SankeyDiagram.DefaultSettings.isVisibleLabels);

            return {
                isVisibleLabels: isVisibleLabels,
                scale: {
                    x: SankeyDiagram.DefaultSettings.scale.x,
                    y: SankeyDiagram.DefaultSettings.scale.y
                },
                colourOfLabels: SankeyDiagram.DefaultSettings.colourOfLabels
            };
        }

        private findNodePosition(sankeyDiagramDataView: SankeyDiagramDataView): void {
            this.findNodePositionByX(sankeyDiagramDataView);
            this.findNodePositionByY(sankeyDiagramDataView);
        }

        private findNodePositionByX(sankeyDiagramDataView: SankeyDiagramDataView): void {
            let nodes: SankeyDiagramNode[] = sankeyDiagramDataView.nodes,
                nextNodes: SankeyDiagramNode[] = [],
                previousNodes: SankeyDiagramNode[] = [],
                x: number = 0,
                isRecursiveDependencies: boolean = false;

            while (nodes.length > 0) {
                nextNodes = [];

                nodes.forEach((node: SankeyDiagramNode) => {
                    node.x = x;

                    node.links.forEach((link: SankeyDiagramLink) => {
                        if (node === link.source && node !== link.destination) {
                            if (nextNodes.every((item: SankeyDiagramNode) => {
                                return item !== link.destination;
                            })) {
                                nextNodes.push(link.destination);
                            }
                        }
                    });
                });

                isRecursiveDependencies = nextNodes.length === previousNodes.length && 
                    previousNodes.every((previousNode: SankeyDiagramNode) => {
                        return nextNodes.some((nextNode: SankeyDiagramNode) => {
                            return nextNode === previousNode;
                        });
                    });

                if (isRecursiveDependencies) {
                    previousNodes.forEach((element: SankeyDiagramNode) => {
                        element.x = x;

                        x++;
                    });

                    nodes = [];
                } else {
                    nodes = nextNodes;

                    previousNodes = nodes;

                    x++;
                }
            }

            sankeyDiagramDataView.settings.scale.x = this.getScaleByAxisX(x - 1);

            this.scaleByAxisX(sankeyDiagramDataView.nodes, sankeyDiagramDataView.settings.scale.x);
        }

        private scaleByAxisX(nodes: SankeyDiagramNode[], scale: number): void {
            nodes.forEach((node: SankeyDiagramNode) => {
                node.x *= scale;
            });
        }

        private getScaleByAxisX(numberOfColumns: number = 1): number {
            return (this.viewport.width - this.nodeWidth) / numberOfColumns;
        }

        private findNodePositionByY(sankeyDiagramDataView: SankeyDiagramDataView): void {
            let nodes: SankeyDiagramNode[] = sankeyDiagramDataView.nodes,
                links: SankeyDiagramLink[] = sankeyDiagramDataView.links,
                currentX: number = 0,
                index: number = 0,
                maxIndex: number = 0,
                sumValueOfNodes: number = 0,
                maxValueOfNodes: number = 0;
 
            nodes = nodes.sort((firstNode: SankeyDiagramNode, secondNode: SankeyDiagramNode) => {
                return firstNode.x - secondNode.x;
            });

            nodes.forEach((node: SankeyDiagramNode) => {
                if (currentX !== node.x) {
                    index = 0;
                    currentX = node.x;
                    sumValueOfNodes = 0;
                }

                sumValueOfNodes += node.weigth;

                if (sumValueOfNodes > maxValueOfNodes) {
                    maxValueOfNodes = sumValueOfNodes;
                }

                if (index > maxIndex) {
                    maxIndex = index;
                }

                index++;
            });

            sankeyDiagramDataView.settings.scale.y = this.getScaleByAxisY(maxIndex + 1, maxValueOfNodes);

            this.scaleByAxisY(nodes, links, sankeyDiagramDataView.settings.scale.y);
        }

        private getScaleByAxisY(numberOfRows: number, sumValueOfNodes: number): number {
            return (this.viewport.height - numberOfRows * this.NodePadding) / sumValueOfNodes;
        }

        private scaleByAxisY(
            nodes: SankeyDiagramNode[],
            links: SankeyDiagramLink[],
            scale: number): void {

            let shiftByAxisY: number = 0,
                currentX: number = 0,
                index: number = 0;

            nodes.forEach((node: SankeyDiagramNode) => {
                if (currentX !== node.x) {
                    currentX = node.x;
                    shiftByAxisY = 0;
                    index = 0;
                }

                node.height = node.weigth * scale;
                node.y = shiftByAxisY + this.NodePadding * index;

                shiftByAxisY += node.height;

                index++;
            });

            nodes.forEach((node: SankeyDiagramNode) => {
                node.links = node.links.sort((firstLink: SankeyDiagramLink, secondLink: SankeyDiagramLink) => {
                    if (firstLink.source === node) {
                        return firstLink.destination.y - secondLink.destination.y;
                    }

                    return firstLink.source.y - secondLink.source.y;
                });

                let shiftByAxisYForLink: number = 0;

                node.links.forEach((link: SankeyDiagramLink) => {
                    link.height = link.weigth * scale;

                    if (link.source === node) {
                        link.dySource = shiftByAxisYForLink;
                    } else if (link.destination === node) {
                        link.dyDestination = shiftByAxisYForLink;
                    }

                    shiftByAxisYForLink += link.height;
                });
            });
        }

        private render(sankeyDiagramDataView: SankeyDiagramDataView): void {
            this.renderLinks(sankeyDiagramDataView);
            this.renderNodes(sankeyDiagramDataView);
        }

        private renderNodes(sankeyDiagramDataView: SankeyDiagramDataView): void {
            let nodesEnterSelection: D3.Selection,
                nodesSelection: D3.UpdateSelection,
                nodeElements: D3.Selection;

            nodeElements = this.main
                .select(SankeyDiagram.Nodes.selector)
                .selectAll(SankeyDiagram.Node.selector);

            nodesSelection = nodeElements.data(sankeyDiagramDataView.nodes);

            nodesEnterSelection = nodesSelection
                .enter()
                .append("g");

            nodesSelection
                .attr("transform", (node: SankeyDiagramNode) => {
                    return SVGUtil.translate(node.x, node.y);
                })
                .classed(SankeyDiagram.Node["class"], true);

            nodesEnterSelection
                .append("rect")
                .classed(SankeyDiagram.NodeRect["class"], true);

            nodesEnterSelection
                .append("text")
                .classed(SankeyDiagram.NodeLabel["class"], true);

            nodesSelection
                .select(SankeyDiagram.NodeRect.selector)
                .style({
                    "fill": (node: SankeyDiagramNode) => node.colour,
                    "stroke": (node: SankeyDiagramNode) => d3.rgb(node.colour).darker(1.5)
                })
                .attr({
                    x: 0,
                    y: 0,
                    height: (node: SankeyDiagramNode) => node.height,
                    width: (node: SankeyDiagramNode) => node.width
                });

            nodesSelection
                .select(SankeyDiagram.NodeLabel.selector)
                .attr({
                    x: (node: SankeyDiagramNode) => this.getLabelPositionByAxisX(node),
                    y: (node: SankeyDiagramNode) => node.height / 2,
                    dy: "0.35em"
                })
                .style("fill", (node: SankeyDiagramNode) => node.label.colour)
                .style("display", (node: SankeyDiagramNode) => {
                    let isNotVisibleLabel: boolean = false, 
                        labelPositionByAxisX: number = this.getCurrentPositionOfLabelByAxisX(node);

                    isNotVisibleLabel = labelPositionByAxisX >= this.viewport.width || labelPositionByAxisX <= 0;

                    if (isNotVisibleLabel || !sankeyDiagramDataView.settings.isVisibleLabels
                        || sankeyDiagramDataView.settings.scale.x / 2 <  SankeyDiagram.MinWidthOfLabel) {
                        return "none";
                    }

                    return null;
                })
                .style("text-anchor", (node: SankeyDiagramNode) => {
                    if (this.isLabelLargerWidth(node)) {
                        return "end";
                    }

                    return null;
                })
                .text((node: SankeyDiagramNode) => {
                    let maxWidth: number = sankeyDiagramDataView.settings.scale.x / 2 - node.width - this.NodePadding;

                    if (this.getCurrentPositionOfLabelByAxisX(node) > maxWidth) {
                        return TextMeasurementService.getTailoredTextOrDefault({
                            text: node.label.formattedName,
                            fontFamily: this.textProperties.fontFamily,
                            fontSize: this.textProperties.fontSize
                        }, maxWidth);
                    }

                    return node.label.formattedName;
                });

            nodesSelection
                .exit()
                .remove();

            this.renderTooltip(nodesSelection);
        }

        private getLabelPositionByAxisX(node: SankeyDiagramNode): number {
            if (this.isLabelLargerWidth(node)) {
                return -(this.LabelPadding);
            }

            return node.width + this.LabelPadding;
        }

        private isLabelLargerWidth(node: SankeyDiagramNode): boolean {
            let shiftByAxisX: number = node.x + node.width + this.LabelPadding;

            return shiftByAxisX + node.label.width > this.viewport.width;
        }

        private getCurrentPositionOfLabelByAxisX(node: SankeyDiagramNode): number {
            let labelPositionByAxisX: number = this.getLabelPositionByAxisX(node);

            labelPositionByAxisX = labelPositionByAxisX > 0
                ? labelPositionByAxisX + node.x + node.label.width + node.width
                : node.x + labelPositionByAxisX - node.label.width - node.width;

            return labelPositionByAxisX;
        }

        private renderLinks(sankeyDiagramDataView: SankeyDiagramDataView): void {
            let linksSelection: D3.UpdateSelection,
                linksElements: D3.Selection;

            linksElements = this.main
                .select(SankeyDiagram.Links.selector)
                .selectAll(SankeyDiagram.Link.selector);

            linksSelection = linksElements.data(sankeyDiagramDataView.links);

            linksSelection
                .enter()
                .append("path")
                .classed(SankeyDiagram.Link["class"], true);

            linksSelection
                .attr("d", (link: SankeyDiagramLink) => {
                    return this.getSvgPath(link);
                })
                .style("stroke-width", (link: SankeyDiagramLink) => link.height);

            linksSelection
                .exit()
                .remove();

            this.renderTooltip(linksSelection);
        }

        private getSvgPath(link: SankeyDiagramLink): string {
            let x0: number,
                x1: number,
                xi: D3.Transition.BaseInterpolate,
                x2: number,
                x3: number,
                y0: number,
                y1: number;

            if (link.destination.x < link.source.x) {
                x0 = link.source.x;
                x1 = link.destination.x + link.destination.width;
            } else {
                x0 = link.source.x + link.source.width;
                x1 = link.destination.x;
            }

            xi = d3.interpolateNumber(x0, x1);
            x2 = xi(this.curvatureOfLinks);
            x3 = xi(1 - this.curvatureOfLinks);
            y0 = link.source.y + link.dySource + link.height / 2;
            y1 = link.destination.y + link.dyDestination + link.height / 2;

            return `M ${x0} ${y0} C ${x2} ${y0}, ${x3} ${y1}, ${x1} ${y1}`;
        }

        private renderTooltip(selection: D3.UpdateSelection): void {
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => {
                return (<SankeyDiagramTooltipData> tooltipEvent.data).tooltipData;
            });
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder(),
                settings: SankeyDiagramSettings;

            if (!this.dataView || !this.dataView.settings) {
                return [];
            }

            settings = this.dataView.settings;

            switch (options.objectName) {
                case "labels": {
                    let labels: VisualObjectInstance = {
                        objectName: "labels",
                        displayName: "labels",
                        selector: null,
                        properties: {
                            show: settings.isVisibleLabels,
                            fill: settings.colourOfLabels
                        }
                    };

                    enumeration.pushInstance(labels);
                    break;
                }
            }

            return enumeration.complete();
        }
    }
}