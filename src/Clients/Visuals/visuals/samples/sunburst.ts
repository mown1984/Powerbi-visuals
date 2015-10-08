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
    export interface SunburstNode {
        children?: SunburstNode[];
        value?: any;
        color?: string;
        name?: string;
        parent?: SunburstNode;
        selector: SelectionId;
    }

    export interface SunburstViewModel {
        root: SunburstNode;
    }

    export var sunburstRoleNames = {
        nodes: 'Nodes',
        values: 'Values',
    };

    export class Sunburst implements IVisual {
        
        public static capabilities: VisualCapabilities = {
        };
        private static minOpacity = 0.2;
        private disableMouseOut: boolean = false;
        private svg: D3.Selection;
        private g: D3.Selection;
        private viewport: IViewport;
        private colors: IDataColorPalette;
        private selectionManager: SelectionManager;

        public init(options: VisualInitOptions): void {
            this.colors = options.style.colorPalette.dataColors;
            this.selectionManager = new SelectionManager({ hostServices: options.host });
            this.svg = d3.select(options.element.get(0)).append('svg');
            this.svg.attr('class', 'mainDrawArea');
            this.g = this.svg.append('g');
            this.g.attr('class', "container");
            this.g
                .on("mouseleave", (d) => { this.mouseleave(d, this); });
            this.svg.append("text")
                .attr('class', "sunBurstPercentage")
                .attr("opacity", "0");                
            this.svg.append("text")
                .attr('class', "sunBurstPercentageFixed")
                .attr("opacity", "0")
                .style("font-weight", "bold");

            this.svg.on('click', (d) => {
                this.svg.selectAll("path").style("opacity", 1);
                this.disableMouseOut = false;
                this.svg.select(".sunBurstPercentageFixed").style("opacity", 0);
                this.selectionManager.clear();
            });
            let svg_obj = this.svg;
            svg_obj.on("mousemove", function () {
                let point = d3.mouse(this)
                    , p = { x: point[0], y: point[1] };
                let shift = 20;
                let percentageText = svg_obj.select(".sunBurstPercentage");
                percentageText.attr("y", p.y + shift);
                percentageText.attr("x", p.x + shift);
            });

        }

        private static setAllUnhide(selection): void {
            selection.attr("setUnHide", "true");
        }
      
        public update(options: VisualUpdateOptions): void {

            let data = Sunburst.converter(options.dataViews[0], this.colors);
            this.viewport = options.viewport;           

            this.updateInternal(data);         
        }

        private updateInternal(dataRootNode: SunburstNode): void {

            this.svg.attr({
                'height': this.viewport.height,
                'width': this.viewport.width
            });
            this.g.attr("transform", "translate(" + this.viewport.width / 2 + "," + this.viewport.height / 2 + ")");
            let radius = Math.min(this.viewport.width, this.viewport.height) / 2;

            let partition = d3.layout.partition()
                .sort(null)
                .size([2 * Math.PI, radius * radius])
                .value((d) => { return 1; });

            let path = this.g.datum(dataRootNode).selectAll("path")
                .data(partition.nodes);
            path.enter().append("path");
            path.attr("display", (d) => { return d.depth ? null : "none"; })
                .attr("d", this.arc)
                .style("stroke", "#fff")
                .style("fill", (d) => { return d.color; })
                .style("fill-rule", "evenodd")
                .each(this.stash)
                .on("mouseover", (d) => { this.mouseover(d, this, false); })
                .on("mouseleave", (d) => { this.mouseleave(d, this); })
                .on("click", (d) => {

                    this.selectionManager.select(d.selector);
                    d3.selectAll("path").call(Sunburst.setAllUnhide).attr('setUnHide', null);
                    this.svg.select(".container").on("mouseleave", null);
                    this.mouseover(d, this, true);
                    this.disableMouseOut = true;

                    let percentageFixedText = this.svg.select(".sunBurstPercentageFixed");
                    percentageFixedText.text(d ? d.value + "%" : "");
                    percentageFixedText.style('fill', d.color);
                    this.onResize();
                    event.stopPropagation();
                });

            this.onResize();
        }

        private arc = d3.svg.arc()
            .startAngle(function (d) { return d.x; })
            .endAngle(function (d) { return d.x + d.dx; })
            .innerRadius(function (d) { return Math.sqrt(d.y); })
            .outerRadius(function (d) { return Math.sqrt(d.y + d.dy); });
        // Stash the old values for transition.
        private stash(d) {
            d.x0 = d.x;
            d.dx0 = d.dx;
        }
      
        // Get all parents of the node
        private static getTreePath(node) {
            let path = [];
            let current = node;
            while (current.parent) {
                path.unshift(current);
                current = current.parent;
            }
            return path;
        }

        private onResize(): void {
            let width = this.viewport.width;
            let height = this.viewport.height;
            let percentageText = this.svg.select(".sunBurstPercentage");
            let percentageFixedText = this.svg.select(".sunBurstPercentageFixed");
            let dXtextFixed = percentageText.text.length > 0 ? 10 : 0;
            percentageText.style("opacity", 1);
            percentageFixedText.style("opacity", 1);
            percentageFixedText.attr("y", (height / 2 + dXtextFixed));
            percentageFixedText.attr("x", ((width / 2) - (percentageFixedText.node().clientWidth / 2)));
        }

        private mouseover(d, svgObj, setUnhide): void {
            let percentageText = svgObj.svg.select(".sunBurstPercentage");
            percentageText.text(d ? d.value + "%" : "");

            svgObj.onResize();
            let parentsArray = d ? Sunburst.getTreePath(d) : [];
            // Set opacity for all the segments.
            svgObj.svg.selectAll("path").each(function () {
                if (d3.select(this).attr('setUnHide') !== 'true') {
                    d3.select(this).style("opacity", Sunburst.minOpacity);
                }
            });
            // Highlight only ancestors of the current segment.
            svgObj.svg.selectAll("path")
                .filter(function (node) {
                    return (parentsArray.indexOf(node) >= 0);
                }).each(function () {
                    d3.select(this).style("opacity", 1);
                    if (setUnhide === true) {
                        d3.select(this).attr('setUnHide', 'true');
                    }
                });
        }

        private mouseleave(d, svgObj): void {

            if (!svgObj.disableMouseOut) {
                svgObj.svg.selectAll("path")
                    .style("opacity", 1);
                let percentageText = this.svg.select(".sunBurstPercentage");
                percentageText.style("opacity", 0);
            }
            else {
                svgObj.mouseover(null, svgObj);
            }
        }

        private static covertTreeNodeToSunBurstNode(originParentNode: DataViewTreeNode, sunburstParentNode: SunburstNode, colors: IDataColorPalette): SunburstNode {
            let key = (originParentNode.children ? originParentNode : sunburstParentNode).name;
            let newSunNode: SunburstNode = {
                name: originParentNode.name,
                value: originParentNode.value,
                selector: SelectionId.createWithId(originParentNode.identity),
                color: colors.getColorScaleByKey(':)').getColor(key).value
            };
            if (originParentNode.children && originParentNode.children.length > 0) {
                newSunNode.children = [];
                for (let i = 0; i < originParentNode.children.length; i++) {
                    newSunNode.children.push(
                        Sunburst.covertTreeNodeToSunBurstNode(originParentNode.children[i], newSunNode, colors)
                        );
                }
            }
            if (sunburstParentNode) {
                newSunNode.parent = sunburstParentNode;
            }

            return newSunNode;
        }

        public static converter(dataView: DataView, colors: IDataColorPalette): SunburstNode{

            let root: SunburstNode = Sunburst.covertTreeNodeToSunBurstNode(dataView.tree.root, null, colors);

            return root;
        }

    }
}