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

module powerbitests {
    import KpiUtil = powerbi.visuals.KpiUtil;

    describe("kpiUnitTests", () => {

        describe('get class', () => {
            it("undefined for unknown kpi graphic status name", () => {
                var css = KpiUtil.getClassForKpi('Bad KPI Name', '1', KpiUtil.KpiImageSize.Big);
                expect(css).toBeUndefined();
            });

            it("Traffic light single bad", () => {
                verifyGetClassForKpi('Traffic Light - Single', '-1', 'circle kpi-red');
            });

            it("Traffic light single warning", () => {
                verifyGetClassForKpi('Traffic Light - Single', '0', 'circle kpi-yellow');
            });

            it("Traffic light single good", () => {
                verifyGetClassForKpi('Traffic Light - Single', '1', 'circle kpi-green');
            });

            it("Three Flags Colored bad", () => {
                verifyGetClassForKpi('Three Flags Colored', '-1', 'flag kpi-red');
            });

            it("Three Flags Colored warning", () => {
                verifyGetClassForKpi('Three Flags Colored', '0', 'flag kpi-yellow');
            });

            it("Three Flags Colored good", () => {
                verifyGetClassForKpi('Three Flags Colored', '1', 'flag kpi-green');
            });

            it("Road Signs bad", () => {
                verifyGetClassForKpi('Road Signs', '-1', 'circle-x kpi-red');
            });

            it("Road Signs warning", () => {
                verifyGetClassForKpi('Road Signs', '0', 'circle-exclamation kpi-yellow');
            });

            it("Road Signs good", () => {
                verifyGetClassForKpi('Road Signs', '1', 'circle-checkmark kpi-green');
            });

            it("Traffic light bad", () => {
                verifyGetClassForKpi('Traffic Light', '-1', 'traffic-light kpi-red');
            });

            it("Traffic light warning", () => {
                verifyGetClassForKpi('Traffic Light', '0', 'traffic-light kpi-yellow');
            });

            it("Traffic light good", () => {
                verifyGetClassForKpi('Traffic Light', '1', 'traffic-light kpi-green');
            });

            it("Three Symbols UnCircled Colored bad", () => {
                verifyGetClassForKpi('Three Symbols UnCircled Colored', '-1', 'x kpi-red');
            });

            it("Three Symbols UnCircled Colored warning", () => {
                verifyGetClassForKpi('Three Symbols UnCircled Colored', '0', 'exclamation kpi-yellow');
            });

            it("Three Symbols UnCircled Colored good", () => {
                verifyGetClassForKpi('Three Symbols UnCircled Colored', '1', 'checkmark kpi-green');
            });

            it("Shapes bad", () => {
                verifyGetClassForKpi('Shapes', '-1', 'rhombus kpi-red');
            });

            it("Shapes warning", () => {
                verifyGetClassForKpi('Shapes', '0', 'triangle kpi-yellow');
            });

            it("Shapes good", () => {
                verifyGetClassForKpi('Shapes', '1', 'circle kpi-green');
            });

            it("Three Stars Colored bad", () => {
                verifyGetClassForKpi('Three Stars Colored', '-1', 'star-stacked star-empty');
            });

            it("Three Stars Colored warning", () => {
                verifyGetClassForKpi('Three Stars Colored', '0', 'star-stacked star-half-full');
            });

            it("Three Stars Colored good", () => {
                verifyGetClassForKpi('Three Stars Colored', '1', 'star-stacked star-full');
            });

            it("Five Bars Colored 0", () => {
                verifyGetClassForKpi('Five Bars Colored', '-2', 'bars-stacked bars-zero');
            });

            it("Five Bars Colored 1", () => {
                verifyGetClassForKpi('Five Bars Colored', '-1', 'bars-stacked bars-one');
            });

            it("Five Bars Colored 2", () => {
                verifyGetClassForKpi('Five Bars Colored', '0', 'bars-stacked bars-two');
            });

            it("Five Bars Colored 3", () => {
                verifyGetClassForKpi('Five Bars Colored', '1', 'bars-stacked bars-three');
            });

            it("Five Bars Colored 4", () => {
                verifyGetClassForKpi('Five Bars Colored', '2', 'bars-stacked bars-four');
            });

            it("Five Boxes Colored 0", () => {
                verifyGetClassForKpi('Five Boxes Colored', '-2', 'boxes-stacked boxes-zero');
            });

            it("Five Boxes Colored 1", () => {
                verifyGetClassForKpi('Five Boxes Colored', '-1', 'boxes-stacked boxes-one');
            });

            it("Five Boxes Colored 2", () => {
                verifyGetClassForKpi('Five Boxes Colored', '0', 'boxes-stacked boxes-two');
            });

            it("Five Boxes Colored 3", () => {
                verifyGetClassForKpi('Five Boxes Colored', '1', 'boxes-stacked boxes-three');
            });

            it("Five Boxes Colored 4", () => {
                verifyGetClassForKpi('Five Boxes Colored', '2', 'boxes-stacked boxes-four');
            });

            it("Gauge - Ascending 0", () => {
                verifyGetClassForKpi('Gauge - Ascending', '-2', 'circle-empty');
            });

            it("Gauge - Ascending 1", () => {
                verifyGetClassForKpi('Gauge - Ascending', '-1', 'circle-one-quarter');
            });

            it("Gauge - Ascending 2", () => {
                verifyGetClassForKpi('Gauge - Ascending', '0', 'circle-half');
            });

            it("Gauge - Ascending 3", () => {
                verifyGetClassForKpi('Gauge - Ascending', '1', 'circle-three-quarters');
            });

            it("Gauge - Ascending 4", () => {
                verifyGetClassForKpi('Gauge - Ascending', '2', 'circle-full');
            });
        });

        describe('get metadata', () => {
            it("undefined for unknown kpi graphic status name", () => {
                let column = {
                    kpiStatusGraphic: 'Bad KPI Name',
                    displayName: 'test',
                };
                let metadata = KpiUtil.getKpiImageMetadata(column, '1', KpiUtil.KpiImageSize.Big);
                expect(metadata).toBeUndefined();
            });

            it("three values - 0", () => {
                verifyGetMetadata('Shapes', '-1', 'rhombus kpi-red');
            });

            it("three values small - 1", () => {
                verifyGetMetadata('Shapes', '0', 'triangle kpi-yellow');
            });

            it("five values - 1", () => {
                verifyGetMetadata('Gauge - Ascending', '-1', 'circle-one-quarter');
            });

            it("five values - 3", () => {
                verifyGetMetadata('Gauge - Ascending', '1', 'circle-three-quarters');
            });
        });

        function verifyClassCss(actual: string, expected: string, size: KpiUtil.KpiImageSize): void {
            expect(actual).toContain(expected);
            expect(actual).toContain('ms-kpi-glyph');

            if (size === KpiUtil.KpiImageSize.Big)
                expect(actual).toContain('big-kpi');
        }

        function verifyGetClassForKpi(kpiName: string, value: string, expectedCss: string): void {
            for (let size of [KpiUtil.KpiImageSize.Small, KpiUtil.KpiImageSize.Big]) {
                let css = KpiUtil.getClassForKpi(kpiName, value, size);
                verifyClassCss(css, expectedCss, size);
            }
        }

        function verifyGetMetadata(kpiName: string, value: string, expectedIcon?: string): void {
            for (let size of [KpiUtil.KpiImageSize.Small, KpiUtil.KpiImageSize.Big]) {
                let column = {
                    kpiStatusGraphic: kpiName,
                    displayName: 'test',
                };
                let metadata = KpiUtil.getKpiImageMetadata(column, value, size);

                expect(metadata.caption).toBe(expectedIcon);
                expect(metadata.statusGraphic).toBe(kpiName);
                verifyClassCss(metadata.class, expectedIcon, size);
            }
        }
    });
}