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

module powerbitests {
    var colors = [
        { value: "#000000" },
        { value: "#000001" },
        { value: "#000002" },
        { value: "#000003" }
    ];

    describe("DataColorPalette", () => {
        var dataColors = new powerbi.visuals.DataColorPalette();

        it("Check get color no duplicates until wrap-around", () => {
            // Note (param 0): Since conditional formatting is currently not supported, the datavalue param is ignored. For now the
            //                 test will pass in various objects just to make sure we don"t crash. Once conditional formatting is
            //                 supported we should pass in objects that will excercise that the conditional formatting code.
            // Note (param 1): We need to support any object as the index key, since some charts will use number or string index keys

            var scale = dataColors.getNewColorScale();
            var color0 = scale.getColor("test datavalue");
            expect(color0).toExist();

            var color1 = scale.getColor("series index N");
            expect(color1).toExist();
            helpers.assertColorsMatch(color0.value, color1.value, true);

            var color2 = scale.getColor({ seriesProperty: "X" });
            expect(color2).toExist();
            helpers.assertColorsMatch(color1.value, color2.value, true);

            var color3 = scale.getColor(-1);
            expect(color3).toExist();
            helpers.assertColorsMatch(color2.value, color3.value, true);

            // Wrap around occurs after 40 (base color count) * 12 (cycles) colors currently. We should have no duplicates
            // until that point.
            var previousColor = color3;
            for (var i = 4; i < 480; ++i) {
                var nextColor = scale.getColor(i);
                expect(nextColor).toExist();
                helpers.assertColorsMatch(nextColor.value, previousColor.value, true);
                previousColor = nextColor;
            }

            // Wrap around should occur now, verify we are back to the start
            helpers.assertColorsMatch(scale.getColor("abc series").value, color0.value);
        });

        // The Sentiment/KPI color API is just temporary until conditional formatting is avaiable, but while the API is active it needs to be tested.
        // We can remove this test once the Sentiment API is superseded by conditional formatting.
        it("Check get Sentiment color", () => {
            var sentimentColors = dataColors.getSentimentColors();

            // For now our visuals assume that there are 3 colors
            expect(sentimentColors.length).toBe(3);

            // Check for duplicates
            helpers.assertColorsMatch(sentimentColors[0].value, sentimentColors[1].value, true);
            helpers.assertColorsMatch(sentimentColors[1].value, sentimentColors[2].value, true);
            helpers.assertColorsMatch(sentimentColors[0].value, sentimentColors[2].value, true);
        });

        it("Check parameter colors", () => {
            var localDataColors = new powerbi.visuals.DataColorPalette([{ value: "#112233" }]);
            var firstColor = localDataColors.getNewColorScale().getColor(0);
            helpers.assertColorsMatch(firstColor.value, "#112233");
        });

        describe("getColorScaleByKey", () => {
            var color1 = dataColors.getColorScaleByKey("scale1").getColor("a");
            var color2 = dataColors.getColorScaleByKey("scale1").getColor("b");
            var color3 = dataColors.getColorScaleByKey("scale2").getColor("a");
            var color4 = dataColors.getColorScaleByKey("scale1").getColor("a");

            it("should return the same color for the same scale and key", () => {
                helpers.assertColorsMatch(color1.value, color4.value);
            });

            it("should return the same color for the first key in each scale", () => {
                helpers.assertColorsMatch(color1.value, color3.value);
            });

            it("should return different colors for different values in the same scale", () => {
                helpers.assertColorsMatch(color1.value, color2.value, true);
            });
        });

        it("getColorByIndex", () => {
            var localDataColors = new powerbi.visuals.DataColorPalette(colors);

            for (var i = 0; i < colors.length; i++) {
                helpers.assertColorsMatch(localDataColors.getColorByIndex(i).value, colors[i].value);
            }
        });
    });

    describe("D3ColorScale", () => {
        var scale: powerbi.visuals.D3ColorScale;

        beforeEach(() => {
            scale = powerbi.visuals.D3ColorScale.createFromColors(colors);
        });

        it("should cover all colors and wrap around", () => {
            for (var i = 0; i < colors.length; i++) {
                helpers.assertColorsMatch(scale.getColor(i).value, colors[i].value);
            }

            helpers.assertColorsMatch(scale.getColor(colors.length).value, colors[0].value);
        });

        it("Check get color same index key returns same color", () => {
            var indexKey0 = 4;
            var indexKey1 = "pie slice 7";

            var color0_firstGet = scale.getColor(indexKey0);
            expect(color0_firstGet).toExist();

            var color1_firstGet = scale.getColor(indexKey1);
            expect(color1_firstGet).toExist();

            var color0_secondGet = scale.getColor(indexKey0);
            expect(color0_secondGet).toExist();
            helpers.assertColorsMatch(color0_secondGet.value, color0_firstGet.value);

            var color1_secondGet = scale.getColor(indexKey1);
            expect(color1_secondGet).toExist();
            helpers.assertColorsMatch(color1_firstGet.value, color1_secondGet.value);
        });

        it("clearAndRotate should clear any allocated colors and return the next color", () => {
            var color1 = scale.getColor(0);
            var color2 = scale.getColor(1);

            scale.clearAndRotateScale();

            var color3 = scale.getColor(0);

            helpers.assertColorsMatch(color1.value, colors[0].value);
            helpers.assertColorsMatch(color2.value, colors[1].value);
            helpers.assertColorsMatch(color3.value, colors[2].value);
        });

        it("clone should create a copy preserving allocated colors", () => {
            var color1 = scale.getColor(0);
            var color2 = scale.getColor(1);

            var scale2 = scale.clone();

            var color3 = scale2.getColor(0);
            var color4 = scale2.getColor(2);

            helpers.assertColorsMatch(color1.value, colors[0].value);
            helpers.assertColorsMatch(color2.value, colors[1].value);
            helpers.assertColorsMatch(color3.value, colors[0].value);
            helpers.assertColorsMatch(color4.value, colors[2].value);
        });
    });
}