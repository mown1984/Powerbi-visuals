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

/// <reference path="../_references.ts"/>

module powerbi.visuals {

    // TODO: use templating for the base visual datapoint class (allViewModels: T[][])
    //      export interface PlayChartData<T> {
    // TODO: consider organizing better with logical grouping, like playData.state = {isPlaying,currentFrameIndex,etc}, and .elements = {playContainer,playButton,slider,callout,etc}
    export interface PlayChartData {
        host?: IVisualHostServices;
        frameKeys: any[];
        allViewModels?: PlayableChartData[];
        currentViewModel?: PlayableChartData;
        currentFrameIndex?: number;
        lastRenderedTraceFrameIndex?: number;
        currentViewport?: IViewport;
        lastRenderedViewport?: IViewport;
        frameCount?: number;
        isPlaying?: boolean;

        element?: JQuery;
        playAxisContainer?: JQuery; //contains the playButton and slider
        playButton?: JQuery;
        playButtonCircle?: JQuery;
        slider?: JQuery;
        callout?: JQuery;
        
        // do not call converter() when we call persistProperties and a new update() happens
        // NOTE: calling persistProperties will still cause a render() call to come from cartesianChart
        // TODO: make persist properties only optionally trigger a new onDataChagned, as most charts don't want this (only slicer needs it)
        ridiculousFlagForPersistProperties?: boolean;
    }

    // TODO: consider a template for the datapoint type <T> instead of any[]
    export interface PlayableChartData {
        dataPoints: any[];
    }

    export interface PlayableConverterOptions {
        viewport: IViewport;
    }

    //interface PlayDataState {
    //}

    //interface PlayDataElements {
    //}
    
    interface PlayObjectProperties {
        currentFrameIndex?: number;
    }

    export module PlayChart {
        var FrameStepDuration = 1000;
        export var FrameAnimationDuration = 950;
        var SliderMarginLeft = 50; //margin + playButton width
        var SliderMarginRight = 35;
        export var ClassName = 'playChart';

        export function init(options: CartesianVisualInitOptions, playData: PlayChartData) {
            playData.element = options.element;
            playData.currentViewport = {
                height: options.viewport.height,
                width: options.viewport.width
            };
            playData.host = options.host;
        }

        export function convertMatrixToCategorical(matrix: DataViewMatrix, frame: number): DataViewCategorical {
            var node = matrix.rows.root.children[frame];

            var categorical: DataViewCategorical = {
                categories: [],
                values: powerbi.data.DataViewTransform.createValueColumns()
            };

            let category: DataViewCategoryColumn = {
                source: matrix.rows.levels.length > 1 ? matrix.rows.levels[1].sources[0] : undefined,
                values: [],
                objects: undefined,
                identity: []
            };

            if (matrix.columns.levels.length > 1) {
                categorical.values.source = matrix.columns.levels[0].sources[0];
                let leafOfGroup = matrix.columns.root;
                while (leafOfGroup.children && leafOfGroup.children[0].children) {
                    leafOfGroup = leafOfGroup.children[0];
                }

                let nodeQueue = [];
                let columnNode = matrix.columns.root;
                let leafOffset = 0;
                while (columnNode) {
                    if (columnNode.children && columnNode.children[0].children) {
                        for (var j = 0, jlen = columnNode.children.length; j < jlen; j++) {
                            nodeQueue.push(columnNode.children[j]);
                        }
                    } else if (columnNode.children) {
                        let columnLength = columnNode.children.length;
                        for (let j = 0; j < columnLength; j++) {
                            let source = <any>_.create(matrix.valueSources[j], { groupName: columnNode.value });
                            let dataViewColumn: DataViewValueColumn = {
                                identity: columnNode.identity,
                                values: [columnNode.value],
                                source: source,
                                //value: columnNode.value,
                            };
                            categorical.values.push(dataViewColumn);
                        }

                        for (let i = 0, len = node.children.length; i < len; i++) {
                            let innerNode = node.children[i];
                            category.identity.push(innerNode.identity);
                            category.values.push(innerNode.value);

                            for (let j = 0; j < columnLength; j++) {
                                categorical.values[j+leafOffset].values.push(innerNode.values[j+leafOffset].value);
                            }
                        }

                        leafOffset += columnLength;
                    }

                    if (nodeQueue.length > 0) {
                        columnNode = nodeQueue[0];
                        nodeQueue = nodeQueue.splice(1);
                    } else
                        columnNode = undefined;
                }
            } else {
                let columnLength = matrix.columns.root.children.length;
                for (let j = 0; j < columnLength; j++) {
                    let dataViewColumn: DataViewValueColumn = {
                        identity: undefined,
                        values: [],
                        source: matrix.valueSources[j]
                    };
                    categorical.values.push(dataViewColumn);
                }

                for (let i = 0, len = node.children.length; i < len; i++) {
                    let innerNode = node.children[i];
                    category.identity.push(innerNode.identity);
                    category.values.push(innerNode.value);

                    // v1, no series.
                    for (let j = 0; j < columnLength; j++) {
                        categorical.values[j].values.push(innerNode.values[j].value);
                    }
                }
            }
            categorical.categories.push(category);

            return categorical;
        }

        function getObjectProperties(dataViewMetadata: DataViewMetadata, dataLabelsSettings?: PointDataLabelsSettings): PlayObjectProperties {
            let objectProperties: PlayObjectProperties = {};

            if (dataViewMetadata && dataViewMetadata.objects) {
                var objects = dataViewMetadata.objects;
                objectProperties.currentFrameIndex = DataViewObjects.getValue(objects, scatterChartProps.currentFrameIndex.index, null);
            }
            return objectProperties;
        }

        export function converter(
            dataView: DataView,
            visualConverter: (dataView: DataView, options: any) => any,
            visualConverterOptions: any): PlayChartData {
            
            let dataViewMetadata: DataViewMetadata = dataView.metadata;
            
            let dataLabelsSettings = dataLabelUtils.getDefaultPointLabelSettings();
            let objectProperties = getObjectProperties(dataViewMetadata, dataLabelsSettings);

            let allViewModels = [];
            let frameKeys = [];
            let currentViewModel = undefined;
            let rowChildrenLength = dataView.matrix.rows.root.children.length;
            if (!dataView.categorical && dataView.matrix && rowChildrenLength > 0) {
                let keySourceColumn = dataView.matrix.rows.levels[0].sources[0];
                let keyFormatter = valueFormatter.create({
                    format: valueFormatter.getFormatString(keySourceColumn, scatterChartProps.general.formatString),
                    value: dataView.matrix.rows.root.children[0],
                    value2: dataView.matrix.rows.root.children[rowChildrenLength-1],
                });
                for (let i = 0, len = rowChildrenLength; i < len; i++) {
                    var key = dataView.matrix.rows.root.children[i];
                    frameKeys.push(keyFormatter.format(key.value));
                    let dataViewCategorical = PlayChart.convertMatrixToCategorical(dataView.matrix, i);

                    // call child converter
                    currentViewModel = visualConverter({ metadata: dataView.metadata, categorical: dataViewCategorical }, visualConverterOptions);
                    allViewModels.push(currentViewModel);
                }
            }
            else {
                // call child converter
                let dataViewCategorical = PlayChart.convertMatrixToCategorical(dataView.matrix, 0);
                currentViewModel = visualConverter({ metadata: dataView.metadata, categorical: dataViewCategorical }, visualConverterOptions);
                allViewModels.push(currentViewModel);
            }

            // use the saved frame index, or default to the last frame
            if (objectProperties.currentFrameIndex == null) {
                objectProperties.currentFrameIndex = frameKeys.length - 1; //default
                // current currentViewModel is already the last frame
            }
            else if (objectProperties.currentFrameIndex < frameKeys.length) {
                currentViewModel = allViewModels[objectProperties.currentFrameIndex];
            }

            // TODO: make sure this gets applied appropriately
            //if (interactivityService) {
                //interactivityService.applySelectionStateToData(currentViewModel);
            //}

            return {
                isPlaying: false,
                allViewModels: allViewModels,
                currentViewModel: currentViewModel,
                frameKeys: frameKeys,
                currentFrameIndex: objectProperties.currentFrameIndex,
                lastRenderedViewport: { width: 0, height: 0 }
            };
        }

        export function getDefaultPlayData(): PlayChartData {
            let defaultData: PlayChartData = {
                frameKeys: [],
            };
            return defaultData;
        }
        
        export function setData(playData: PlayChartData, dataView: DataView, visualConverter: (dataView: DataView, options: any) => any, visualConverterOptions: PlayableConverterOptions): PlayChartData {

            if (playData && visualConverterOptions.viewport) {
                playData.currentViewport = {
                    height: visualConverterOptions.viewport.height,
                    width: visualConverterOptions.viewport.width
                };
            }

            if (dataView) {
                if (playData && playData.ridiculousFlagForPersistProperties && dataView.metadata) {
                    let objectProps = getObjectProperties(dataView.metadata);
                    // only copy frameIndex since it is the only property using persistProperties
                    playData.currentFrameIndex = objectProps.currentFrameIndex;
                    // turn off the flag that was set by our persistProperties call
                    playData.ridiculousFlagForPersistProperties = false;
                    return playData;
                }
                else if (dataView.matrix || dataView.categorical) {
                    let data = PlayChart.converter(dataView, visualConverter, visualConverterOptions);
                    if (data && playData) {
                        //if (interactivityService && data.allViewModels) {
                            //interactivityService.applySelectionStateToData(data.allViewModels);
                        //}
                        
                        // TODO: we shouldn't have to do this, fix
                        // copy state properties over
                        data.element = playData.element;
                        data.host = playData.host;
                        data.callout = playData.callout;
                        data.playAxisContainer = playData.playAxisContainer;
                        data.playButton = playData.playButton;
                        data.slider = playData.slider;
                        data.playButtonCircle = playData.playButtonCircle;
                        data.ridiculousFlagForPersistProperties = playData.ridiculousFlagForPersistProperties;

                        return data;
                    }
                }
            }

            return getDefaultPlayData();
        }

        // TODO: specific to ScatterChartDataPoint right now (.x and .y), update to handle .value and .categoryValue also (CartesianDataPoint)
        export function getMinMaxForAllFrames(playData: PlayChartData): { xRange: NumberRange, yRange: NumberRange } {
            let minY = 0,
                maxY = 10,
                minX = 0,
                maxX = 10;

            if (playData.allViewModels && playData.allViewModels.length > 0) {
                minY = minX = Number.MAX_VALUE;
                maxY = maxX = Number.MIN_VALUE;
                for (let i = 0, len = playData.allViewModels.length; i < len; i++) {
                    let dps = playData.allViewModels[i].dataPoints;
                    minY = Math.min(d3.min<ScatterChartDataPoint, number>(dps, d => d.y), minY);
                    maxY = Math.max(d3.max<ScatterChartDataPoint, number>(dps, d => d.y), maxY);
                    minX = Math.min(d3.min<ScatterChartDataPoint, number>(dps, d => d.x), minX);
                    maxX = Math.max(d3.max<ScatterChartDataPoint, number>(dps, d => d.x), maxX);
                }
            }

            return {
                xRange: { min: minX, max: maxX },
                yRange: { min: minY, max: maxY }
            };
        }

        export function clearPlayDOM(playData: PlayChartData): void {
            if (!playData)
                return;
            if (playData.playAxisContainer)
                playData.playAxisContainer.remove();
            if (playData.callout)
                playData.callout.remove();
        }

        function createSliderDOM(playData: PlayChartData, behaviorOptions: PlayBehaviorOptions, interactivityService: IInteractivityService): void {
            // a container to position the button and the slider together
            playData.playAxisContainer = $('<div></div>')
                .css('position', 'absolute')
                .css('left', '15px')
                .css('bottom', '35px')
                .appendTo(playData.element);

            playData.playButtonCircle = $('<div class="button-container"></div>')
                .appendTo(playData.playAxisContainer);
            playData.playButton = $('<div class="play"></div>')
                .appendTo(playData.playButtonCircle);

            // the noUiSlider
            playData.slider = $('<div class="sliders"></div>')
                .appendTo(playData.playAxisContainer);
        }

        function createSliderControl(playData: PlayChartData, slider: any, sliderWidth: number): void {
            // re-create the slider
            if ((<any>slider[0]).noUiSlider)
                (<any>slider[0]).noUiSlider.destroy();
            
            var numFrames = playData.frameKeys.length;
            if (numFrames > 0) {
                var filterPipLabels = createPipsFilterFn(playData, sliderWidth);
                var lastIndex = numFrames - 1;
                noUiSlider.create(
                    slider[0],
                    {
                        step: 1,
                        start: [playData.currentFrameIndex],
                        range: {
                            min: [0],
                            max: [lastIndex],
                        },
                        pips: {
                            mode: 'steps',
                            density: 12,
                            format: {
                                to: (index) => playData.frameKeys[index],
                                from: (value) => playData.frameKeys.indexOf(value),
                            },
                            filter: filterPipLabels,
                        },
                    });

                (<any>slider[0]).noUiSlider.on('slide', () => {
                    playData.isPlaying = false; //stop the play sequence
                    var indexToShow = Math.round((<any>slider[0]).noUiSlider.get());
                    if (indexToShow >= 0 && indexToShow !== playData.currentFrameIndex && indexToShow < playData.allViewModels.length) {
                        playData.currentFrameIndex = indexToShow;
                        var data = playData.allViewModels[indexToShow];
                        playData.currentViewModel = data;
                        persistFrameIndex(playData, indexToShow); //this will cause a render call
                    }
                });
            }
            else {
                noUiSlider.create(
                    slider[0],
                    {
                        step: 1,
                        start: [0],
                        range: {
                            min: [0],
                            max: [0],
                        },
                    });
            }
        }

        function createPipsFilterFn(playData: PlayChartData, sliderWidth: number): any {
            let textProperties: TextProperties = {
                fontFamily: 'wf_segoe-ui_normal',
                fontSize: jsCommon.PixelConverter.toString(14),
            };
            let maxLabelWidth = 0;
            let anyWillWordBreak = false;
            for (var key of playData.frameKeys) {
                maxLabelWidth = Math.max(maxLabelWidth, jsCommon.WordBreaker.getMaxWordWidth(key + "", TextMeasurementService.measureSvgTextWidth, textProperties));
                anyWillWordBreak = anyWillWordBreak || jsCommon.WordBreaker.hasBreakers(key);
            }

            var pipSize = 1; //0=hide, 1=large, 2=small
            var skipMod = 1;
            var maxAllowedLabelWidth = playData.frameCount > 1 ? sliderWidth / (playData.frameCount - 1) : sliderWidth;
            var widthRatio = maxLabelWidth / maxAllowedLabelWidth;

            if (widthRatio > 1.25) {
                skipMod = Math.ceil(widthRatio);
                pipSize = 2;
            }
            else if (widthRatio > 1.0 || anyWillWordBreak) {
                // wordbreak line wrapping is automatic, and we don't reserve enough space to show two lines of text with the larger font
                pipSize = 2;
            }

            var filterPipLabels = (index: any, type: any) => {
                // noUiSlider will word break / wrap to new lines, so max width is the max word length
                if (index % skipMod === 0) {
                    return pipSize;
                }
                return 0; //hide
            };

            return filterPipLabels;
        }

        export function render(playData: PlayChartData, behaviorOptions: PlayBehaviorOptions, interactivityService: IInteractivityService, suppressAnimations: boolean): CartesianVisualRenderResult {
            if (!playData) {    
                return { dataPoints: [], behaviorOptions: null, labelDataPoints: null };
            }

            let hasSelection = false;
            if (interactivityService) {
                interactivityService.applySelectionStateToData(playData.currentViewModel.dataPoints);
                hasSelection = interactivityService.hasSelection();
            }
            
            if (!playData.playAxisContainer && interactivityService) {
                createSliderDOM(playData, behaviorOptions, interactivityService);
            }
            if (playData.playAxisContainer) {
                // always update the event handler with the latest state (capture the three params)
                playData.playButtonCircle.off('click');
                playData.playButtonCircle.on('click', () => {
                    PlayChart.play(playData, behaviorOptions, interactivityService);
                });
            }

            // callout / currentFrameIndex label - keep separate from other Play DOM creation as we need this even without interactivity.
            if (!playData.callout) {
                playData.callout = $('<span class="callout"></span>').appendTo(playData.element);
            }

            let frameKeys = playData.frameKeys;
            let currentFrameIndex = playData.currentFrameIndex;
            let height = playData.currentViewport.height;
            let width = playData.currentViewport.width;

            let slider = playData.slider;
            let sliderWidth = (width - SliderMarginLeft - SliderMarginRight);
            if (slider)
                slider.css('width', sliderWidth + 'px');

            // TODO: make this smarter
            let resized = playData.currentViewport.width !== playData.lastRenderedViewport.width
                || playData.currentViewport.height !== playData.lastRenderedViewport.height;
            let changed = !playData.playAxisContainer
                || frameKeys.length !== playData.frameCount
                || resized;

            // default to last frame if frameKeys have changed and it's not the first time we are rendering
            if (playData.frameCount && (frameKeys.length !== playData.frameCount || currentFrameIndex >= frameKeys.length))
                currentFrameIndex = frameKeys.length - 1;

            if (changed && slider) {
                playData.frameCount = frameKeys.length;
                createSliderControl(playData, slider, sliderWidth);
            }

            // update callout to current frame index
            let calloutDimension = Math.min(height, width * 1.3); //compensate for tall and narrow-width viewport
            let fontSize = Math.max(12, Math.round(calloutDimension / 7)) + 'px';
            if (currentFrameIndex < frameKeys.length && currentFrameIndex >= 0) {
                playData.callout
                    .text(frameKeys[currentFrameIndex])
                    .css('font-size', fontSize);
            }
            else {
                playData.callout.text('');
            }
                
            if (slider) {
                // ensure slider position
                (<any>slider[0]).noUiSlider.set([currentFrameIndex]);
            }

            playData.lastRenderedViewport = {
                height: playData.currentViewport.height,
                width: playData.currentViewport.width
            };

            let allDataPoints = playData.allViewModels.map((vm) => vm.dataPoints);
            let flatAllDataPoints = _.flatten<SelectableDataPoint>(allDataPoints);
            if (interactivityService) {
                if (hasSelection && behaviorOptions) {
                    let uniqueDataPoints = _.uniq(flatAllDataPoints, (d: SelectableDataPoint) => d.identity.getKey());
                    behaviorOptions.renderTraceLine(behaviorOptions, _.filter(uniqueDataPoints, 'selected'), !suppressAnimations);
                }
            }
            
            // pass all data points to keep track of current selected bubble even if it drops out for a few frames
            return { dataPoints: flatAllDataPoints, behaviorOptions: behaviorOptions, labelDataPoints: null };
        }

        // Scatter specific traceline
        export function renderScatterTraceLine(options: PlayBehaviorOptions, selectedPoints: SelectableDataPoint[], shouldAnimate: boolean): void {
            var seriesPoints: ScatterChartDataPoint[][] = [];

            if (selectedPoints && selectedPoints.length > 0) {
                let currentFrameIndex = options.data.currentFrameIndex;
                let lastRenderedTraceFrameIndex = options.data.lastRenderedTraceFrameIndex;

                // filter to the selected identity, only up to and including the current frame. Add frames during play.
                let hasBubbleAtCurrentFrame = [];
                for (var selectedIndex = 0, selectedLen = selectedPoints.length; selectedIndex < selectedLen; selectedIndex++) {
                    seriesPoints[selectedIndex] = [];
                    hasBubbleAtCurrentFrame[selectedIndex] = false;
                    for (let frameIndex = 0, frameLen = options.data.allViewModels.length; frameIndex < frameLen && frameIndex <= currentFrameIndex; frameIndex++) {
                        let values = options.data.allViewModels[frameIndex].dataPoints.filter((value, index) => {
                            return value.identity.getKey() === selectedPoints[selectedIndex].identity.getKey();
                        });
                        if (values && values.length > 0) {
                            let value = values[0];
                            value['frameIndex'] = frameIndex;
                            seriesPoints[selectedIndex].push(value);
                            if (frameIndex === currentFrameIndex)
                                hasBubbleAtCurrentFrame[selectedIndex] = true;
                        }
                    }
                }
                if (seriesPoints.length > 0) {
                    let xScale = options.xScale;
                    let yScale = options.yScale;

                    let line = d3.svg.line()
                        .x((d: ScatterChartDataPoint) => {
                            return xScale(d.x);
                        })
                        .y((d: ScatterChartDataPoint) => {
                            return yScale(d.y);
                        })
                        .defined((d: ScatterChartDataPoint) => {
                            return d.x !== null && d.y !== null;
                        });

                    // Render Lines
                    let traceLines = options.svg.selectAll('.traceLine').data(selectedPoints, (sp: ScatterChartDataPoint) => sp.identity.getKey());
                    traceLines.enter()
                        .append('path')
                        .classed('traceLine', true);
                    // prepare array of new/previous lengths
                    // NOTE: can't use lambda because we need the "this" context to be the DOM Element associated with the .each()
                    let previousLengths = [], newLengths = [];
                    traceLines.each(function (d, i) {
                        let existingPath = (<SVGPathElement>this);
                        let previousLength = existingPath.hasAttribute('d') ? existingPath.getTotalLength() : 0;
                        previousLengths.push(previousLength);
                        // create offline SVG for new path measurement
                        let tempSvgPath = $('<svg><path></path></svg>');
                        let tempPath = $('path', tempSvgPath);
                        tempPath.attr('d', line(seriesPoints[i]));
                        let newLength = (<SVGPathElement>tempPath.get()[0]).getTotalLength();
                        newLengths.push(newLength);
                    });
                    // animate using stroke-dash* trick
                    if (lastRenderedTraceFrameIndex == null || currentFrameIndex >= lastRenderedTraceFrameIndex) {
                        // growing line
                        traceLines
                            .style('stroke', (d: ScatterChartDataPoint) => ScatterChart.getStrokeFill(d, true))
                            .attr({
                                'd': (d, i: number) => {
                                    return line(seriesPoints[i]);
                                },
                                'stroke-dasharray': (d, i) => newLengths[i] + " " + newLengths[i],
                                'stroke-dashoffset': (d, i) => newLengths[i] - previousLengths[i],
                            });
                        if (shouldAnimate) {
                            traceLines
                                .transition()
                                .duration(FrameAnimationDuration)
                                .attr('stroke-dashoffset', 0);
                        }
                        else {
                            traceLines.attr('stroke-dashoffset', 0);
                        }
                    }
                    else {
                        // shrinking line
                        if (shouldAnimate) {
                            traceLines
                                .transition()
                                .duration(FrameAnimationDuration)
                                .attr('stroke-dashoffset', (d, i) => previousLengths[i] - newLengths[i])
                                .transition()
                                .duration(1) // animate the shrink first, then update with new line properties
                                .delay(FrameAnimationDuration)
                                .style('stroke', (d: ScatterChartDataPoint) => ScatterChart.getStrokeFill(d, true))
                                .attr({
                                    'd': (d, i) => {
                                        return line(seriesPoints[i]);
                                    },
                                    'stroke-dasharray': (d, i) => newLengths[i] + " " + newLengths[i],
                                    'stroke-dashoffset': 0,
                                });
                        }
                        else {
                            traceLines
                                .style('stroke', (d: ScatterChartDataPoint) => ScatterChart.getStrokeFill(d, true))
                                .attr({
                                    'd': (d, i) => {
                                        return line(seriesPoints[i]);
                                    },
                                    'stroke-dasharray': (d, i) => newLengths[i] + " " + newLengths[i],
                                    'stroke-dashoffset': 0,
                                });
                        }
                    }
                    traceLines.exit()
                        .remove();

                    // Render circles
                    // slice to length-1 because we draw lines to the current bubble but we don't need to draw the current frame's bubble
                    let circlePoints: ScatterChartDataPoint[] = [];
                    for (var selectedIndex = 0; selectedIndex < seriesPoints.length; selectedIndex++) {
                        let points = seriesPoints[selectedIndex];
                        let newPoints = hasBubbleAtCurrentFrame[selectedIndex] ? points.slice(0, points.length - 1) : points;
                        circlePoints = circlePoints.concat(newPoints);
                    }
                    let circles = options.svg.selectAll('.traceBubble').data(circlePoints, (d: ScatterChartDataPoint) => d.identity.getKey() + d.x + d.y + d.size);
                    circles.enter()
                        .append('circle')
                        .style('opacity', 0) //fade new bubbles into visibility
                        .classed('traceBubble', true);
                    circles
                        .attr('cx', (d: ScatterChartDataPoint) => xScale(d.x))
                        .attr('cy', (d: ScatterChartDataPoint) => yScale(d.y))
                        .attr('r', (d: ScatterChartDataPoint) => ScatterChart.getBubbleRadius(d.radius, (<ScatterChartData>options.data.currentViewModel).sizeRange, options.data.currentViewport))
                        .style({
                            'stroke-opacity': (d: ScatterChartDataPoint) => ScatterChart.getBubbleOpacity(d, true),
                            'stroke-width': '1px',
                            'stroke': (d: ScatterChartDataPoint) => ScatterChart.getStrokeFill(d, true),
                            'fill': (d: ScatterChartDataPoint) => d.fill,
                            'fill-opacity': (d: ScatterChartDataPoint) => d.size != null ? 0.3 + (d['frameIndex'] / currentFrameIndex) * 0.7 : 0,
                        })
                        .transition()
                        .duration(FrameAnimationDuration)
                        .style('opacity',1);
                    circles.exit()
                        .transition()
                        .duration(FrameAnimationDuration)
                        .style('opacity', 0) //fade exiting bubbles out
                        .remove();

                    TooltipManager.addTooltip(circles, (tooltipEvent: TooltipEvent) => tooltipEvent.data.tooltipInfo);

                    // sort the z-order, smallest size on top
                    circles.sort((d1: ScatterChartDataPoint, d2: ScatterChartDataPoint) => { return d2.size - d1.size; });

                    options.data.lastRenderedTraceFrameIndex = options.data.currentFrameIndex;
                }
                else {
                    options.svg.selectAll('.traceLine').remove();
                    options.svg.selectAll('.traceBubble').remove();
                    options.data.lastRenderedTraceFrameIndex = null;
                }
            }
            else {
                options.svg.selectAll('.traceLine').remove();
                options.svg.selectAll('.traceBubble').remove();
                options.data.lastRenderedTraceFrameIndex = null;
            }
        }

        export function play(playData: PlayChartData, behaviorOptions: PlayBehaviorOptions, interactivityService: IInteractivityService): void {
            if (playData.isPlaying) {
                // Toggle the flag and allow the animation logic to kill it
                playData.isPlaying = false;
            }
            else if ((<any>playData.slider[0]).noUiSlider != null) {
                playData.isPlaying = true;
                playData.playButton.removeClass('play').addClass('pause');

                let indexToShow = Math.round((<any>playData.slider[0]).noUiSlider.get());
                if (indexToShow >= playData.allViewModels.length - 1) {
                    playData.currentFrameIndex = -1;
                } else {
                    playData.currentFrameIndex = indexToShow - 1;
                }

                playNextFrame(playData, behaviorOptions, interactivityService);
            }
        }

        function persistFrameIndex(playData: PlayChartData, frameIndex: number): void {
            playData.ridiculousFlagForPersistProperties = true;

            let properties: { [name: string]: data.SQExpr } = {};
            properties['index'] = data.SQExprBuilder.integer(frameIndex);

            playData.host.persistProperties([{
                selector: null,
                properties: properties,
                objectName: 'currentFrameIndex'
            }]);
        }

        function playNextFrame(playData: PlayChartData, behaviorOptions: PlayBehaviorOptions, interactivityService: IInteractivityService, startFrame?: number, endFrame?: number): void {
            if (!playData.isPlaying) {
                playComplete(playData, behaviorOptions, interactivityService);
                return;
            }

            let nextFrame = playData.currentFrameIndex + 1;
            if (startFrame != null && endFrame != null) {
                nextFrame = Math.abs(endFrame - startFrame + 1);
                startFrame = nextFrame;
            }

            if (nextFrame < playData.allViewModels.length && nextFrame > -1) {
                playData.currentFrameIndex = nextFrame;
                playData.currentViewModel = playData.allViewModels[nextFrame];
                persistFrameIndex(playData, nextFrame); //this will cause a render call
                (<any>playData.slider[0]).noUiSlider.set([nextFrame]);

                if (nextFrame < playData.allViewModels.length) {
                    let timePerFrame = FrameStepDuration;
                    window.setTimeout(() => {
                        // Update the rangeSlider to show the correct offset
                        (<any>playData.slider[0]).noUiSlider.set([nextFrame]);
                        // Play next frame
                        playNextFrame(playData, behaviorOptions, interactivityService, startFrame, endFrame);
                    }, timePerFrame);
                }
            } else {
                playComplete(playData, behaviorOptions, interactivityService);
            }
        }

        function playComplete(playData: PlayChartData, behaviorOptions: PlayBehaviorOptions, interactivityService: IInteractivityService): void {
            playData.playButton.removeClass('pause').addClass('play');
            playData.isPlaying = false;
        }
    }
}
