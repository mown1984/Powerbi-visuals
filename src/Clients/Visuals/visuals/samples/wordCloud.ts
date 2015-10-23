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
    import ValueFormatter = powerbi.visuals.valueFormatter;

    export enum WordCloudScaleType {
        logn,
        sqrt,
        value
    };

    interface WordCloudText {
        text: string;
        count: number;
    }

    export interface WordCloudData extends IPoint {
        text: string;
        xOff: number;
        yOff: number;
        rotate?: number;
        size: number;
        padding: number;
        width: number;
        height: number;
        sprite?: number[];
        x0: number;
        y0: number;
        x1: number;
        y1: number;
        colour: string;
    }
    
    export interface WordCloudDataView {
        data: WordCloudData[];
        leftBorder: IPoint;
        rightBorder: IPoint;
    }

    export interface WordCloudConstructorOptions {
        svg?: D3.Selection;
        animator?: IGenericAnimator;
        margin?: IMargin;
    }

    export interface WordCloudSettings {
        minFontSize: number;
        maxFontSize: number;
        minAngle?: number;
        maxAngle?: number;
        quantityAngles?: number;
        valueFormatter?: IValueFormatter;
        isRotateText: boolean;
    }

    export class WordCloud implements IVisual {
        private static ClassName: string = "wordCloud";

        private static Properties: any = {
            general: {
                formatString: <DataViewObjectPropertyIdentifier>{
                    objectName: "general",
                    propertyName: "formatString"
                },
                minFontSize: <DataViewObjectPropertyIdentifier> {
                    objectName: "general",
                    propertyName: "minFontSize"
                },
                maxFontSize: <DataViewObjectPropertyIdentifier> {
                    objectName: "general",
                    propertyName: "maxFontSize"
                }
            },
            rotateText: {
                show: <DataViewObjectPropertyIdentifier> {
                    objectName: "rotateText",
                    propertyName: "show"
                },
                minAngle: <DataViewObjectPropertyIdentifier> {
                    objectName: "rotateText",
                    propertyName: "minAngle"
                },
                maxAngle: <DataViewObjectPropertyIdentifier> {
                    objectName: "rotateText",
                    propertyName: "maxAngle"
                },
                quantityAngles: <DataViewObjectPropertyIdentifier> {
                    objectName: "rotateText",
                    propertyName: "quantityAngles"
                }
            }
        };

        private static Words: ClassAndSelector = {
            "class": "words",
            selector: ".words"
        };

        private static Word: ClassAndSelector = {
            "class": "word",
            selector: ".word"
        };

        private static Size: string = "px";

        private static Radians: number = Math.PI / 180;

        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: "Category",
                kind: VisualDataRoleKind.Grouping,
                displayName: data.createDisplayNameGetter("Role_DisplayName_Value")
            }],
            dataViewMappings: [{
                conditions: [{
                    "Category": {
                        min: 1,
                        max: 1
                    }
                }],
                categorical: {
                    categories: {
                        for: { in: "Category" }
                    }
                }
            }],
            objects: {
                general: {
                    displayName: data.createDisplayNameGetter("Visual_General"),
                    properties: {
                        formatString: {
                            type: {
                                formatting: {
                                    formatString: true
                                }
                            }
                        },
                        minFontSize: {
                            displayName: "Min Font",
                            type: { numeric: true }
                        },
                        maxFontSize: {
                            displayName: "Max Font",
                            type: { numeric: true }
                        }
                    }
                },
                rotateText: {
                    displayName: "Rotate Text",
                    properties: {
                        show: {
                            displayName: data.createDisplayNameGetter("Visual_Show"),
                            type: { bool: true }
                        },
                        minAngle: {
                            displayName: "Min Angle",
                            type: { numeric: true }
                        },
                        maxAngle: {
                            displayName: "Max Angle",
                            type: { numeric: true }
                        },
                        quantityAngles: {
                            displayName: data.createDisplayNameGetter("Aggregate_CountNonNull"),
                            type: { numeric: true }
                        }
                    }
                }
            }
        };

        private static DefaultSettings: WordCloudSettings = {
            minFontSize: 20,
            maxFontSize: 100,
            minAngle: -60,
            maxAngle: 90,
            quantityAngles: 0,
            isRotateText: true
        };

        private settings: WordCloudSettings;

        private durationAnimations: number = 500;
        private suppressAnimations: boolean = false;

        private margin: IMargin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10
        };

        private viewport: IViewport;

        private canvasViewport: IViewport = {
            width: 128,
            height: 2048
        };

        private root: D3.Selection;
        private svg: D3.Selection;
        private main: D3.Selection;
        private words: D3.Selection;

        private canvas: HTMLCanvasElement;

        private fontFamily: string;

        constructor(constructorOptions?: WordCloudConstructorOptions) {
            if (constructorOptions) {
                this.svg = constructorOptions.svg || this.svg;
                this.margin = constructorOptions.margin || this.margin;

                if (constructorOptions.animator) {
                    this.durationAnimations = constructorOptions.animator.getDuration();
                }
            }
        }

        public init(visualsInitOptions: VisualInitOptions): void {
            if (this.svg) {
                this.root = this.svg;
            } else {
                this.root = d3.select(visualsInitOptions.element.get(0))
                    .append("svg");
            }

            this.root.classed(WordCloud.ClassName, true);

            this.fontFamily = this.root.style("font-family");

            this.main = this.root.append("g");

            this.words = this.main
                .append("g")
                .classed(WordCloud.Words["class"], true);

            this.canvas = document.createElement("canvas");
        }

        public converter(dataView: DataView): WordCloudDataView {
            if (!dataView ||
                !dataView.categorical ||
                !dataView.categorical.categories ||
                !dataView.categorical.categories[0] ||
                !dataView.categorical.categories[0].values) {
                return null;
            }

            let values: string[] = dataView.categorical.categories[0].values,
                settings: WordCloudSettings = this.parseSettings(dataView, values[0]);

            if (settings) {
                this.settings = settings;
            } else {
                return null;
            }

            return this.computeTextPositions(this.getWords(this.getReducedText(values)));
        }

        private parseSettings(dataView: DataView, value: string): WordCloudSettings {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns ||
                !dataView.metadata.columns[0]) {
                return null;
            }

            let objects: DataViewObjects = this.getObjectsFromDataView(dataView),
                valueFormatter: IValueFormatter,
                minFonSize: number,
                maxFontSize: number,
                minAngle: number,
                maxAngle: number,
                quantityAngles: number,
                isRotateText: boolean = false;

            minFonSize = this.getNumberFromObjects(
                objects,
                WordCloud.Properties.general.minFontSize,
                WordCloud.DefaultSettings.minFontSize);

            maxFontSize = this.getNumberFromObjects(
                objects,
                WordCloud.Properties.general.maxFontSize,
                WordCloud.DefaultSettings.maxFontSize);

            if (minFonSize > maxFontSize) {
                let buf: number = minFonSize;

                minFonSize = maxFontSize;
                maxFontSize = buf;
            }

            minAngle = this.getNumberFromObjects(
                objects, 
                WordCloud.Properties.rotateText.minAngle, 
                WordCloud.DefaultSettings.minAngle);

            maxAngle = this.getNumberFromObjects(
                objects,
                WordCloud.Properties.rotateText.maxAngle,
                WordCloud.DefaultSettings.maxAngle);

            isRotateText = DataViewObjects.getValue<boolean>(
                objects,
                WordCloud.Properties.rotateText.show,
                WordCloud.DefaultSettings.isRotateText);

            quantityAngles = this.getNumberFromObjects(
                objects,
                WordCloud.Properties.rotateText.quantityAngles,
                WordCloud.DefaultSettings.quantityAngles);

            if (minAngle > maxAngle) {
                let buf: number = minAngle;

                minAngle = maxAngle;
                maxAngle = buf;
            }

            quantityAngles = quantityAngles > 0
                ? quantityAngles
                : 0;

            valueFormatter = ValueFormatter.create({
                format: ValueFormatter.getFormatString(
                    dataView.categorical.categories[0].source,
                    WordCloud.Properties.general.formatString),
                value: value
            });

            return {
                minFontSize: minFonSize,
                maxFontSize: maxFontSize,
                minAngle: minAngle,
                maxAngle: maxAngle,
                quantityAngles: quantityAngles,
                valueFormatter: valueFormatter,
                isRotateText: isRotateText
            };
        }

        private getNumberFromObjects(objects: DataViewObjects, properties: any, defaultValue: number): number {
            if (!objects) {
                return defaultValue;
            }

            let value: number = Number(DataViewObjects.getValue<number>(objects, properties, defaultValue));

            if (isNaN(value)) {
                return defaultValue;
            }

            return value;
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

        private computeTextPositions(words: WordCloudData[]): WordCloudDataView {
            let context: CanvasRenderingContext2D = this.getCanvasContext(),
                wordsForDraw: WordCloudData[] = [],
                surface: number[] = [],
                borders: IPoint[] = null;

            for (let i: number; i < (this.viewport.width >> 5) * this.viewport.height; i++) {
                surface[i] = 0;
            }

            words.map((word: WordCloudData, index: number) => {
                word.x = (this.viewport.width * (Math.random() + 0.5)) >> 1;
                word.y = (this.viewport.height * (Math.random() + 0.5)) >> 1;

                this.generateSprites(context, word, words, index);

                if (this.findPosition(surface, word, borders)) {
                    wordsForDraw.push(word);

                    borders = this.updateBorders(word, borders);

                    word.x -= this.viewport.width >> 1;
                    word.y -= this.viewport.height >> 1;
                }
            });

            return {
                data: wordsForDraw,
                leftBorder: borders[0],
                rightBorder: borders[1]
            };
        }

        private updateBorders(word: WordCloudData, borders: IPoint[]): IPoint[] {
            if (borders && borders.length === 2) {
                let leftBorder: IPoint = borders[0],
                    rightBorder: IPoint = borders[1];
                
                if (word.x + word.x0 < leftBorder.x) {
                    leftBorder.x = word.x + word.x0;
                }

                if (word.y + word.y0 < leftBorder.y) {
                    leftBorder.y = word.y + word.y0;
                }

                if (word.x + word.x1 > rightBorder.x) {
                    rightBorder.x = word.x + word.x1;
                }

                if (word.y + word.y1 > rightBorder.y) {
                    rightBorder.y = word.y + word.y1;
                }
            } else {
                borders = [
                    {
                        x: word.x + word.x0,
                        y: word.y + word.y0
                    }, {
                        x: word.x + word.x1,
                        y: word.y + word.y1
                    }
                ];
            }

            return borders;
        }

        private generateSprites(
            context: CanvasRenderingContext2D,
            currentWord: WordCloudData,
            words: WordCloudData[],
            index: number): void {
            if (currentWord.sprite) {
                return;
            }

            context.clearRect(0, 0, this.canvasViewport.width << 5, this.canvasViewport.height);

            let x: number = 0,
                y: number = 0,
                maxHeight: number = 0,
                quantityOfWords: number = words.length,
                pixels: number[],
                sprite: number[] = [];

            for (let i: number = index; i < quantityOfWords; i++) {
                let currentWordData: WordCloudData = words[i],
                    widthOfWord: number = 0,
                    heightOfWord: number = 0;

                context.save();
                context.font = "normal normal " + (currentWordData.size + 1) + WordCloud.Size + " " + this.fontFamily;

                widthOfWord = context.measureText(currentWordData.text + "m").width;
                heightOfWord = currentWordData.size << 1;

                if (currentWordData.rotate) {
                    let sr: number = Math.sin(currentWordData.rotate * WordCloud.Radians),
                        cr: number = Math.cos(currentWordData.rotate * WordCloud.Radians),
                        widthCr: number = widthOfWord * cr,
                        widthSr: number = widthOfWord * sr,
                        heightCr: number = heightOfWord * cr,
                        heightSr: number = heightOfWord * sr;

                    widthOfWord = (Math.max(Math.abs(widthCr + heightSr), Math.abs(widthCr - heightSr)) + 31) >> 5 << 5;
                    heightOfWord = Math.floor(Math.max(Math.abs(widthSr + heightCr), Math.abs(widthSr - heightCr)));
                } else {
                    widthOfWord = (widthOfWord + 31) >> 5 << 5;
                }

                if (heightOfWord > maxHeight) {
                    maxHeight = heightOfWord;
                }

                if (x + widthOfWord >= (this.canvasViewport.width << 5)) {
                    x = 0;
                    y += maxHeight;
                    maxHeight = 0;
                }

                context.translate((x + (widthOfWord >> 1)), (y + (heightOfWord >> 1)));
                
                if (currentWordData.rotate) {
                    context.rotate(currentWordData.rotate * WordCloud.Radians);
                }

                context.fillText(currentWordData.text, 0, 0);

                if (currentWordData.padding) {
                    context.lineWidth = 2 * currentWordData.padding;
                    context.strokeText(currentWordData.text, 0, 0);
                }

                context.restore();

                currentWordData.width = widthOfWord;
                currentWordData.height = heightOfWord;
                currentWordData.xOff = x;
                currentWordData.yOff = y;
                currentWordData.x1 = widthOfWord >> 1;
                currentWordData.y1 = heightOfWord >> 1;
                currentWordData.x0 = -currentWordData.x1;
                currentWordData.y0 = -currentWordData.y1;

                x += widthOfWord;
            }

            pixels = context.getImageData(0, 0, this.canvasViewport.width << 5, this.canvasViewport.height).data;

            sprite = [];

            for (let i = quantityOfWords - 1; i >=0; i--) {
                let currentWordData: WordCloudData = words[i],
                    width: number = currentWordData.width,
                    width32: number = width >> 5,
                    height: number = currentWordData.y1 - currentWordData.y0,
                    x: number = 0,
                    y: number = 0,
                    seen: number = 0,
                    seenRow: number = 0;

                for (let j = 0; j < height * width32; j++) {
                    sprite[j] = 0;
                }

                if (currentWordData.xOff !== null) {
                    x = currentWordData.xOff;
                } else {
                    return;
                }

                y = currentWordData.yOff;

                seen = 0;
                seenRow = -1;

                for (let j = 0; j < height; j++) {
                    for (let k = 0; k < width; k++) {
                        let l: number = width32 * j + (k >> 5),
                            index: number = ((y + j) * (this.canvasViewport.width << 5) + (x + k)) << 2,
                            m: number = pixels[index]
                                ? 1 << (31 - (k % 32))
                                : 0;

                        sprite[l] |= m;
                        seen |= m;
                    }

                    if (seen) {
                        seenRow = j;
                    } else {
                        currentWordData.y0++;
                        height--;
                        j--;
                        y++;
                    }
                }

                currentWordData.y1 = currentWordData.y0 + seenRow;
                currentWordData.sprite = sprite.slice(0, (currentWordData.y1 - currentWordData.y0) * width32);
            }
        }

        private findPosition(surface: number[], word: WordCloudData, borders: IPoint[]): boolean {
            let startPoint: IPoint= {x: word.x, y: word.y},
                delta = Math.sqrt(this.viewport.width * this.viewport.width + this.viewport.height * this.viewport.height),
                point: IPoint,
                dt: number = Math.random() < 0.5 ? 1 : -1,
                shift: number = -dt,
                dx: number,
                dy: number;

            while (true) {
                shift += dt;

                point = this.archimedeanSpiral(shift);

                dx = Math.floor(point.x);
                dy = Math.floor(point.y);

                if (Math.min(Math.abs(dx), Math.abs(dy)) >= delta) {
                    break;
                }

                word.x = startPoint.x + dx;
                word.y = startPoint.y + dy;

                if (word.x + word.x0 < 0 ||
                    word.y + word.y0 < 0 ||
                    word.x + word.x1 > this.viewport.width ||
                    word.y + word.y1 >  this.viewport.height) {
                    continue;
                }

                if (!borders || !this.checkIntersect(word, surface)) {
                    if (!borders || this.checkIntersectOfRectangles(word, borders[0], borders[1])) {
                        let sprite: number[] = word.sprite,
                            width: number = word.width >> 5,
                            shiftWidth: number = this.viewport.width >> 5,
                            lx: number = word.x - (width << 4),
                            sx: number = lx & 127,
                            msx: number = 32 - sx,
                            height: number = word.y1 - word.y0,
                            x: number = (word.y + word.y0) * shiftWidth + (lx >> 5);

                        for (let i: number = 0; i < height; i++) {
                            let lastSprite: number = 0;

                            for (let j: number = 0; j <= width; j++) {
                                let leftMask: number = lastSprite << msx,
                                    rightMask: number;

                                if (j < width) {
                                    lastSprite = sprite[i * width + j];
                                }

                                rightMask = j < width
                                    ? lastSprite >>> sx
                                    : 0;

                                surface[x + j] |= leftMask | rightMask;
                            }

                            x += shiftWidth;
                        }

                        word.sprite = null;

                        return true;
                    }
                }
            }

            return false;
        }

        private archimedeanSpiral(value: number): IPoint {
            let ratio: number = this.viewport.width / this.viewport.height;

            value = value * 0.1;

            return {
                x: ratio * value * Math.cos(value),
                y: value * Math.sin(value)
            };
        }

        private checkIntersect(word: WordCloudData, surface: number[]): boolean {
            let shiftWidth: number = this.viewport.width >> 5,
                sprite: number[] = word.sprite,
                widthOfWord = word.width >> 5,
                lx: number = word.x - (widthOfWord << 4),
                sx: number = lx & 127,
                msx: number = 32 - sx,
                heightOfWord = word.y1 - word.y0,
                x: number = (word.y + word.y0) * shiftWidth + (lx >> 5);

            for (let i = 0 ; i < heightOfWord; i++) {
                let lastSprite: number = 0;

                for (let j = 0; j <= widthOfWord; j++) {
                    let mask: number = 0,
                        leftMask: number,
                        intersectMask: number = 0;

                    leftMask = lastSprite << msx;

                    if (j < widthOfWord) {
                        lastSprite = sprite[i * widthOfWord + j];
                    }

                    mask = j < widthOfWord
                        ? lastSprite >>> sx
                        : 0;

                    intersectMask = (leftMask | mask) & surface[x + j];

                    if (intersectMask) {
                        return true;
                    }
                }

                x += shiftWidth;
            }

            return false;
        }

        private checkIntersectOfRectangles(word: WordCloudData, leftBorder: IPoint, rightBorder: IPoint): boolean {
            return (word.x + word.x1) > leftBorder.x &&
                (word.x + word.x0) < rightBorder.x &&
                (word.y + word.y1) > leftBorder.y &&
                (word.y + word.y0) < rightBorder.y;
        }

        private getCanvasContext(): CanvasRenderingContext2D {
            if (!this.canvasViewport) {
                return null;
            }

            this.canvas.width = 1;
            this.canvas.height = 1;

            let context: CanvasRenderingContext2D = this.canvas.getContext("2d");

            this.canvas.width = this.canvasViewport.width << 5;
            this.canvas.height = this.canvasViewport.height;

            context = this.canvas.getContext("2d");
            context.fillStyle = context.strokeStyle = "red";
            context.textAlign = "center";

            return context;
        }

        private getReducedText(values: string[]): WordCloudText[] {
            let brokenStrings: string[] = [];

            values.forEach((item: string) => {
                if (typeof item === "string") {
                    brokenStrings = brokenStrings.concat(item.split(" "));
                } else {
                    brokenStrings.push(item);
                }
            });

            return brokenStrings.reduce((previousValue: WordCloudText[], currentValue: string) => {
                if (!previousValue.some((value: WordCloudText) => {
                    if (value.text === currentValue) {
                        value.count++;

                        return true;
                    }

                    return false;
                })) {
                    previousValue.push({
                        text: currentValue,
                        count: 1
                    });
                }

                return previousValue;
            }, []);
        }

        private getWords(values: WordCloudText[]): WordCloudData[] {
            let sortedValues: WordCloudText[],
                minValue: number = 0,
                maxValue: number = 0,
                valueFormatter: IValueFormatter = this.settings.valueFormatter;

            sortedValues = values.sort((a: WordCloudText, b: WordCloudText) => {
                return b.count - a.count;
            });

            minValue = sortedValues[sortedValues.length - 1].count;
            maxValue = sortedValues[0].count;

            return values.map((value: WordCloudText) => {
                return <WordCloudData> {
                    text: valueFormatter.format(value.text),
                    size: this.getFontSize(value.count, minValue, maxValue),
                    x: 0,
                    y: 0,
                    rotate: this.getAngle(),
                    padding: 1,
                    width: 0,
                    height: 0,
                    xOff: 0,
                    yOff: 0,
                    x0: 0,
                    y0: 0,
                    x1: 0,
                    y1: 0,
                    colour: this.getRandomColor()
                };
            });
        }

        private getRandomColor(): string {
            let red: number = Math.floor(Math.random() * 255),
                green: number = Math.floor(Math.random() * 255),
                blue: number = Math.floor(Math.random() * 255);

            return `rgb(${red},${green},${blue})`;
        }

        private getFontSize(
            value: number,
            minValue: number,
            maxValue: number,
            scaleType: WordCloudScaleType = WordCloudScaleType.value) {
            let weight: number,
                fontSize: number;

            switch (scaleType) {
                case WordCloudScaleType.logn: {
                    weight = Math.log(value);
                }
                case WordCloudScaleType.sqrt: {
                    weight = Math.sqrt(value);
                }
                case WordCloudScaleType.value: {
                    weight = value;
                }
            }

            fontSize = weight > minValue
                ? (this.settings.maxFontSize * (weight - minValue)) / (maxValue - minValue)
                : 0;

            fontSize = (fontSize * 100) / (this.settings.maxFontSize - 0);

            fontSize = (fontSize * (this.settings.maxFontSize - this.settings.minFontSize)) / 100 + this.settings.minFontSize;

            return fontSize;
        }

        private getAngle(): number {
            if (!this.settings ||
                !this.settings.isRotateText) {
                return 0;
            }

            let minAngle: number = this.settings.minAngle || 0,
                maxAngle: number = this.settings.maxAngle || 0,
                quantityAngles: number = this.settings.quantityAngles,
                angle: number;

            angle = Math.abs(((maxAngle - minAngle) / quantityAngles) * Math.floor(Math.random() * quantityAngles));

            return quantityAngles !== 0 
                ? minAngle + angle
                : 0;
        }

        public update(visualUpdateOptions: VisualUpdateOptions): void {
            if (!visualUpdateOptions ||
                !visualUpdateOptions.viewport ||
                !visualUpdateOptions.dataViews ||
                !visualUpdateOptions.dataViews[0]) {
                return;
            }

            let dataView: DataView = visualUpdateOptions.dataViews[0],
                wordCloudDataView: WordCloudDataView = null;

            this.suppressAnimations = Boolean(visualUpdateOptions.suppressAnimations);

            this.setSize(visualUpdateOptions.viewport);

            wordCloudDataView = this.converter(dataView);

            this.render(wordCloudDataView);
        }

        private setSize(viewport: IViewport): void {
            let height: number,
                width: number;

            height =
                viewport.height -
                this.margin.top -
                this.margin.bottom;

            width =
                viewport.width -
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
        }

        private render(wordCloudDataView: WordCloudDataView): void {
            if (!wordCloudDataView) {
                return;
            }

            this.renderWords(wordCloudDataView);

            if (this.suppressAnimations) {
                this.scaleMainView(wordCloudDataView);
            }
        }

        private renderWords(wordCloudDataView: WordCloudDataView): void {
            if (!wordCloudDataView ||
                !wordCloudDataView.data) {
                return;
            }

            let self: WordCloud = this,
                wordsSelection: D3.UpdateSelection,
                wordElements: D3.Selection = this.main
                    .select(WordCloud.Words.selector)
                    .selectAll(WordCloud.Word.selector);

            wordsSelection = wordElements.data(wordCloudDataView.data);

            wordsSelection
                .enter()
                .append("svg:text");

            (<D3.UpdateSelection> this.animation(wordsSelection, (data: any, index: number) => {
                if (index === wordCloudDataView.data.length - 1) {
                    self.scaleMainView(wordCloudDataView);
                }
            }))
                .attr("transform", (item: WordCloudData) => {
                    return `${SVGUtil.translate(item.x, item.y)}rotate(${item.rotate})`;
                })
                .style("fill", (item: WordCloudData) => item.colour)
                .style("font-size", (item: WordCloudData) => `${item.size}${WordCloud.Size}`);

            wordsSelection
                .text((item: WordCloudData) => item.text)
                .classed(WordCloud.Word["class"], true);

            wordsSelection
                .exit()
                .remove();
        }

        private scaleMainView(wordCloudDataView: WordCloudDataView): void {
            if (!wordCloudDataView ||
                !wordCloudDataView.leftBorder ||
                !wordCloudDataView.rightBorder) {
                return;
            }

            let scale: number = 1,
                width: number = this.viewport.width,
                height: number = this.viewport.height,
                mainSVGRect: SVGRect = this.main.node()["getBBox"](),
                width2: number = Math.abs(mainSVGRect.x) + this.margin.left + (width - mainSVGRect.width) / 2,
                height2: number =  Math.abs(mainSVGRect.y) + this.margin.top / 2 + (height - mainSVGRect.height) / 2,
                leftBorder: IPoint = wordCloudDataView.leftBorder,
                rightBorder: IPoint = wordCloudDataView.rightBorder,
                scaleByX: number,
                scaleByY: number;

            scaleByX = width / Math.abs(leftBorder.x - rightBorder.x);
            scaleByY = height / Math.abs(leftBorder.y - rightBorder.y);

            scale = Math.min(scaleByX, scaleByY);

            (<D3.Selection> this.animation(this.main))
                .attr("transform", `${SVGUtil.translate(width2, height2)}scale(${scale})`);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            let instances: VisualObjectInstance[] = [];

            if (!this.settings) {
                return instances;
            }

            switch (options.objectName) {
                case "general": {
                    let general: VisualObjectInstance = {
                        objectName: "general",
                        displayName: "general",
                        selector: null,
                        properties: {
                            minFontSize: this.settings.minFontSize,
                            maxFontSize: this.settings.maxFontSize
                        }
                    };

                    instances.push(general);
                    break;
                }
                case "rotateText": {
                    let rotateText: VisualObjectInstance = {
                        objectName: "rotateText",
                        displayName: "rotateText",
                        selector: null,
                        properties: {
                            show: this.settings.isRotateText,
                            minAngle: this.settings.minAngle,
                            maxAngle: this.settings.maxAngle,
                            quantityAngles: this.settings.quantityAngles
                        }
                    };

                    instances.push(rotateText);
                    break;
                }
            }

            return instances;
        }

        private animation(element: D3.Selection, callback?: (data: any, index: number) => void): D3.Transition.Transition | D3.Selection {
            if (this.suppressAnimations) {
                return element;
            }

            return element
                .transition()
                .duration(this.durationAnimations)
                .each("end", callback);
        }

        public destroy(): void {
            this.root = null;
            this.canvas = null;
        }
    }
}