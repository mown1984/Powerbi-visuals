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
///<reference path="../../Typedefs/jquery/jquery.d.ts"/>
///<reference path="../../Typedefs/d3/d3.d.ts"/>
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
///<reference path="../../VisualsCommon/obj/VisualsCommon.d.ts"/>
///<reference path="../../VisualsData/obj/VisualsData.d.ts"/>
///<reference path="../../Visuals/obj/Visuals.d.ts"/> 
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var SampleDataViews = (function () {
                function SampleDataViews() {
                }
                SampleDataViews.prototype.getName = function () {
                    return this.name;
                };
                SampleDataViews.prototype.getDisplayName = function () {
                    return this.displayName;
                };
                SampleDataViews.prototype.hasPlugin = function (pluginName) {
                    return this.visuals.indexOf(pluginName) >= 0;
                };
                SampleDataViews.prototype.getRandomValue = function (min, max) {
                    var value = Math.random() * (max - min) + min;
                    return Math.ceil(value * 100) / 100;
                };
                SampleDataViews.prototype.randomElement = function (arr) {
                    return arr[Math.floor(Math.random() * arr.length)];
                };
                return SampleDataViews;
            })();
            sampleDataViews.SampleDataViews = SampleDataViews;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../_references.ts"/>
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var ValueType = powerbi.ValueType;
            var PrimitiveType = powerbi.PrimitiveType;
            var FileStorageData = (function (_super) {
                __extends(FileStorageData, _super);
                function FileStorageData() {
                    _super.apply(this, arguments);
                    this.name = "FileStorageData";
                    this.displayName = "File storage data";
                    this.visuals = ['treemap',
                    ];
                    this.sampleData = [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34];
                    this.sampleMin = 30000;
                    this.sampleMax = 1000000;
                }
                FileStorageData.prototype.getDataViews = function () {
                    var treeMapMetadata = {
                        columns: [
                            { displayName: 'EventCount', queryName: 'select1', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                            { displayName: 'MedalCount', queryName: 'select2', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) }
                        ]
                    };
                    var columns = [
                        { displayName: 'Program Files', queryName: 'select1', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                        { displayName: 'Documents and Settings', queryName: 'select2', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                        { displayName: 'Windows', queryName: 'select3', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                        { displayName: 'Recovery', queryName: 'select4', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                        { displayName: 'Users', queryName: 'select5', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                        { displayName: 'ProgramData', queryName: 'select6', isMeasure: true, properties: { "Y": true }, type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double) },
                    ];
                    var values = [];
                    for (var i = 0; i < columns.length; i++) {
                        values.push({
                            source: columns[i],
                            values: [this.sampleData[i]]
                        });
                    }
                    return [{
                            metadata: treeMapMetadata,
                            categorical: {
                                values: DataViewTransform.createValueColumns(values)
                            }
                        }];
                };
                FileStorageData.prototype.randomize = function () {
                    var _this = this;
                    this.sampleData = this.sampleData.map(function () { return _this.getRandomValue(_this.sampleMin, _this.sampleMax); });
                };
                return FileStorageData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.FileStorageData = FileStorageData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var ImageData = (function (_super) {
                __extends(ImageData, _super);
                function ImageData() {
                    _super.apply(this, arguments);
                    this.name = "ImageData";
                    this.displayName = "Image data";
                    this.visuals = ['image',
                    ];
                    this.sampleImages = [
                        'data:image/png;base64,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',
                        'data:image/png;base64,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',
                    ];
                    this.sampleIndex = 0;
                    this.sampleData = this.sampleImages[this.sampleIndex];
                }
                ImageData.prototype.getDataViews = function () {
                    return [{
                            metadata: {
                                columns: [],
                                objects: { general: { imageUrl: this.sampleData } }
                            }
                        }];
                };
                ImageData.prototype.randomize = function () {
                    this.sampleIndex++;
                    if (this.sampleIndex >= this.sampleImages.length) {
                        this.sampleIndex = 0;
                    }
                    this.sampleData = this.sampleImages[this.sampleIndex];
                };
                return ImageData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.ImageData = ImageData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var RichtextData = (function (_super) {
                __extends(RichtextData, _super);
                function RichtextData() {
                    _super.apply(this, arguments);
                    this.name = "RichtextData";
                    this.displayName = "Richtext data";
                    this.visuals = ['textbox',
                    ];
                    this.sampleData = ["Example Text",
                        "company's data",
                        "Power BI",
                        "visualization",
                        "spot trends",
                        "charts",
                        "simple drag-and-drop gestures",
                        "personalized dashboards"
                    ];
                    this.sampleSingleData = this.sampleData[0];
                    this.sampleTextStyle = {
                        fontFamily: "Heading",
                        fontSize: "24px",
                        textDecoration: "underline",
                        fontWeight: "300",
                        fontStyle: "italic",
                        float: "left"
                    };
                }
                RichtextData.prototype.getDataViews = function () {
                    // 1 paragraphs, with formatting
                    var paragraphs = [
                        {
                            horizontalTextAlignment: "center",
                            textRuns: [{
                                    value: this.sampleSingleData,
                                    textStyle: this.sampleTextStyle
                                }]
                        }];
                    return this.buildParagraphsDataView(paragraphs);
                };
                RichtextData.prototype.buildParagraphsDataView = function (paragraphs) {
                    return [{ metadata: { columns: [], objects: { general: { paragraphs: paragraphs } } } }];
                };
                RichtextData.prototype.randomize = function () {
                    this.sampleSingleData = this.randomElement(this.sampleData);
                    this.sampleTextStyle.fontSize = this.getRandomValue(12, 40) + "px";
                    this.sampleTextStyle.fontWeight = this.getRandomValue(300, 700).toString();
                };
                return RichtextData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.RichtextData = RichtextData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var SalesByCountryData = (function (_super) {
                __extends(SalesByCountryData, _super);
                function SalesByCountryData() {
                    _super.apply(this, arguments);
                    this.name = "SalesByCountryData";
                    this.displayName = "Sales By Country";
                    this.visuals = ['default'];
                    this.sampleData = [
                        [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34],
                        [123455.43, 40566.43, 200457.78, 5000.49, 320000.57, 450000.34]
                    ];
                    this.sampleMin = 30000;
                    this.sampleMax = 1000000;
                    this.sampleSingleData = 55943.67;
                }
                SalesByCountryData.prototype.getDataViews = function () {
                    var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "country" });
                    var categoryValues = ["Australia", "Canada", "France", "Germany", "United Kingdom", "United States"];
                    var categoryIdentities = categoryValues.map(function (value) {
                        var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                        return powerbi.data.createDataViewScopeIdentity(expr);
                    });
                    // Metadata, describes the data columns, and provides the visual with hints
                    // so it can decide how to best represent the data
                    var dataViewMetadata = {
                        columns: [
                            {
                                displayName: 'Country',
                                queryName: 'Country',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Sales Amount (2014)',
                                isMeasure: true,
                                format: "$0,000.00",
                                queryName: 'sales1',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                            },
                            {
                                displayName: 'Sales Amount (2015)',
                                isMeasure: true,
                                format: "$0,000.00",
                                queryName: 'sales2',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true })
                            }
                        ]
                    };
                    var columns = [
                        {
                            source: dataViewMetadata.columns[1],
                            // Sales Amount for 2014
                            values: this.sampleData[0],
                        },
                        {
                            source: dataViewMetadata.columns[2],
                            // Sales Amount for 2015
                            values: this.sampleData[1],
                        }
                    ];
                    var dataValues = DataViewTransform.createValueColumns(columns);
                    var tableDataValues = categoryValues.map(function (countryName, idx) {
                        return [countryName, columns[0].values[idx], columns[1].values[idx]];
                    });
                    return [{
                            metadata: dataViewMetadata,
                            categorical: {
                                categories: [{
                                        source: dataViewMetadata.columns[0],
                                        values: categoryValues,
                                        identity: categoryIdentities,
                                    }],
                                values: dataValues
                            },
                            table: {
                                rows: tableDataValues,
                                columns: dataViewMetadata.columns,
                            },
                            single: { value: this.sampleSingleData }
                        }];
                };
                SalesByCountryData.prototype.randomize = function () {
                    var _this = this;
                    this.sampleData = this.sampleData.map(function (item) {
                        return item.map(function () { return _this.getRandomValue(_this.sampleMin, _this.sampleMax); });
                    });
                    this.sampleSingleData = this.getRandomValue(this.sampleMin, this.sampleMax);
                };
                return SalesByCountryData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SalesByCountryData = SalesByCountryData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var SalesByDayOfWeekData = (function (_super) {
                __extends(SalesByDayOfWeekData, _super);
                function SalesByDayOfWeekData() {
                    _super.apply(this, arguments);
                    this.name = "SalesByDayOfWeekData";
                    this.displayName = "Sales by day of week";
                    this.visuals = ['comboChart',
                        'dataDotClusteredColumnComboChart',
                        'dataDotStackedColumnComboChart',
                        'lineStackedColumnComboChart',
                        'lineClusteredColumnComboChart',
                        'asterPlot'
                    ];
                    this.sampleData1 = [
                        [742731.43, 162066.43, 283085.78, 300263.49, 376074.57, 814724.34],
                        [123455.43, 40566.43, 200457.78, 5000.49, 320000.57, 450000.34]
                    ];
                    this.sampleMin1 = 30000;
                    this.sampleMax1 = 1000000;
                    this.sampleData2 = [
                        [31, 17, 24, 30, 37, 40, 12],
                        [30, 35, 20, 25, 32, 35, 15]
                    ];
                    this.sampleMin2 = 10;
                    this.sampleMax2 = 45;
                }
                SalesByDayOfWeekData.prototype.getDataViews = function () {
                    //first dataView - Sales by day of week
                    var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "day of week" });
                    var categoryValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    var categoryIdentities = categoryValues.map(function (value) {
                        var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                        return powerbi.data.createDataViewScopeIdentity(expr);
                    });
                    // Metadata, describes the data columns, and provides the visual with hints
                    // so it can decide how to best represent the data
                    var dataViewMetadata = {
                        columns: [
                            {
                                displayName: 'Day',
                                queryName: 'Day',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Previous week sales',
                                isMeasure: true,
                                format: "$0,000.00",
                                queryName: 'sales1',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                            },
                            {
                                displayName: 'This week sales',
                                isMeasure: true,
                                format: "$0,000.00",
                                queryName: 'sales2',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true })
                            }
                        ]
                    };
                    var columns = [
                        {
                            source: dataViewMetadata.columns[1],
                            // Sales Amount for 2014
                            values: this.sampleData1[0],
                        },
                        {
                            source: dataViewMetadata.columns[2],
                            // Sales Amount for 2015
                            values: this.sampleData1[1],
                        }
                    ];
                    var dataValues = DataViewTransform.createValueColumns(columns);
                    var tableDataValues = categoryValues.map(function (dayName, idx) {
                        return [dayName, columns[0].values[idx], columns[1].values[idx]];
                    });
                    //first dataView - Sales by day of week END
                    //second dataView - Temperature by day of week
                    var fieldExprTemp = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table2", column: "day of week" });
                    var categoryValuesTemp = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    var categoryIdentitiesTemp = categoryValuesTemp.map(function (value) {
                        var exprTemp = powerbi.data.SQExprBuilder.equal(fieldExprTemp, powerbi.data.SQExprBuilder.text(value));
                        return powerbi.data.createDataViewScopeIdentity(exprTemp);
                    });
                    // Metadata, describes the data columns, and provides the visual with hints
                    // so it can decide how to best represent the data
                    var dataViewMetadataTemp = {
                        columns: [
                            {
                                displayName: 'Day',
                                queryName: 'Day',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Previous week temperature',
                                isMeasure: true,
                                queryName: 'temp1',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                            },
                            {
                                displayName: 'This week temperature',
                                isMeasure: true,
                                queryName: 'temp2',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true })
                            }
                        ]
                    };
                    var columnsTemp = [
                        {
                            source: dataViewMetadataTemp.columns[1],
                            // temperature prev week
                            values: this.sampleData2[0],
                        },
                        {
                            source: dataViewMetadataTemp.columns[2],
                            // temperature this week
                            values: this.sampleData2[1],
                        }
                    ];
                    var dataValuesTemp = DataViewTransform.createValueColumns(columnsTemp);
                    var tableDataValuesTemp = categoryValuesTemp.map(function (dayName, idx) {
                        return [dayName, columnsTemp[0].values[idx], columnsTemp[1].values[idx]];
                    });
                    //first dataView - Sales by day of week END
                    return [{
                            metadata: dataViewMetadata,
                            categorical: {
                                categories: [{
                                        source: dataViewMetadata.columns[0],
                                        values: categoryValues,
                                        identity: categoryIdentities,
                                    }],
                                values: dataValues
                            },
                            table: {
                                rows: tableDataValues,
                                columns: dataViewMetadata.columns,
                            }
                        },
                        {
                            metadata: dataViewMetadataTemp,
                            categorical: {
                                categories: [{
                                        source: dataViewMetadataTemp.columns[0],
                                        values: categoryValuesTemp,
                                        identity: categoryIdentitiesTemp,
                                    }],
                                values: dataValuesTemp
                            },
                            table: {
                                rows: tableDataValuesTemp,
                                columns: dataViewMetadataTemp.columns,
                            }
                        }];
                };
                SalesByDayOfWeekData.prototype.randomize = function () {
                    var _this = this;
                    this.sampleData1 = this.sampleData1.map(function (item) {
                        return item.map(function () { return _this.getRandomValue(_this.sampleMin1, _this.sampleMax1); });
                    });
                    this.sampleData2 = this.sampleData2.map(function (item) {
                        return item.map(function () { return _this.getRandomValue(_this.sampleMin2, _this.sampleMax2); });
                    });
                };
                return SalesByDayOfWeekData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SalesByDayOfWeekData = SalesByDayOfWeekData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var SimpleFunnelData = (function (_super) {
                __extends(SimpleFunnelData, _super);
                function SimpleFunnelData() {
                    _super.apply(this, arguments);
                    this.name = "SimpleFunnelData";
                    this.displayName = "Simple funnel data";
                    this.visuals = ['funnel'];
                    this.sampleData = [814724.34, 742731.43, 376074.57, 200263.49, 140063.49, 96066.43];
                    this.sampleMin = 3000;
                    this.sampleMax = 1000000;
                }
                SimpleFunnelData.prototype.getDataViews = function () {
                    var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "funnel", column: "country" });
                    var categoryValues = ["Australia", "Canada", "France", "Germany", "United Kingdom", "United States"];
                    var categoryIdentities = categoryValues.map(function (value) {
                        var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                        return powerbi.data.createDataViewScopeIdentity(expr);
                    });
                    // Metadata, describes the data columns, and provides the visual with hints
                    // so it can decide how to best represent the data
                    var dataViewMetadata = {
                        columns: [
                            {
                                displayName: 'Country',
                                queryName: 'Country',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Sales Amount (2014)',
                                isMeasure: true,
                                format: "$0,000.00",
                                queryName: 'sales1',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                                objects: { dataPoint: { fill: { solid: { color: 'purple' } } } },
                            }
                        ]
                    };
                    var columns = [
                        {
                            source: dataViewMetadata.columns[1],
                            // Sales Amount for 2014
                            values: this.sampleData,
                        },
                    ];
                    var dataValues = DataViewTransform.createValueColumns(columns);
                    return [{
                            metadata: dataViewMetadata,
                            categorical: {
                                categories: [{
                                        source: dataViewMetadata.columns[0],
                                        values: categoryValues,
                                        identity: categoryIdentities,
                                    }],
                                values: dataValues
                            }
                        }];
                };
                SimpleFunnelData.prototype.randomize = function () {
                    var _this = this;
                    this.sampleData = this.sampleData.map(function () { return _this.getRandomValue(_this.sampleMin, _this.sampleMax); });
                    this.sampleData.sort(function (a, b) { return b - a; });
                };
                return SimpleFunnelData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SimpleFunnelData = SimpleFunnelData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var SimpleGaugeData = (function (_super) {
                __extends(SimpleGaugeData, _super);
                function SimpleGaugeData() {
                    _super.apply(this, arguments);
                    this.name = "SimpleGaugeData";
                    this.displayName = "Simple gauge data";
                    this.visuals = ['gauge', 'owlGauge'
                    ];
                    this.sampleData = [50, 250, 300, 500];
                    this.sampleMin = 50;
                    this.sampleMax = 1500;
                }
                SimpleGaugeData.prototype.getDataViews = function () {
                    var gaugeDataViewMetadata = {
                        columns: [
                            {
                                displayName: 'col2',
                                roles: { 'MinValue': true },
                                isMeasure: true,
                                objects: { general: { formatString: '$0' } },
                            }, {
                                displayName: 'col1',
                                roles: { 'Y': true },
                                isMeasure: true,
                                objects: { general: { formatString: '$0' } },
                            }, {
                                displayName: 'col4',
                                roles: { 'TargetValue': true },
                                isMeasure: true,
                                objects: { general: { formatString: '$0' } },
                            }, {
                                displayName: 'col3',
                                roles: { 'MaxValue': true },
                                isMeasure: true,
                                objects: { general: { formatString: '$0' } },
                            }],
                        groups: [],
                        measures: [0],
                    };
                    return [{
                            metadata: gaugeDataViewMetadata,
                            single: { value: this.sampleData[1] },
                            categorical: {
                                values: DataViewTransform.createValueColumns([
                                    {
                                        source: gaugeDataViewMetadata.columns[0],
                                        values: [this.sampleData[0]],
                                    }, {
                                        source: gaugeDataViewMetadata.columns[1],
                                        values: [this.sampleData[1]],
                                    }, {
                                        source: gaugeDataViewMetadata.columns[2],
                                        values: [this.sampleData[2]],
                                    }, {
                                        source: gaugeDataViewMetadata.columns[3],
                                        values: [this.sampleData[3]],
                                    }])
                            }
                        }];
                };
                SimpleGaugeData.prototype.randomize = function () {
                    var _this = this;
                    this.sampleData = this.sampleData.map(function () { return _this.getRandomValue(_this.sampleMin, _this.sampleMax); });
                    this.sampleData.sort(function (a, b) { return a - b; });
                };
                return SimpleGaugeData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SimpleGaugeData = SimpleGaugeData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var ValueType = powerbi.ValueType;
            var PrimitiveType = powerbi.PrimitiveType;
            var SimpleMatrixData = (function (_super) {
                __extends(SimpleMatrixData, _super);
                function SimpleMatrixData() {
                    _super.apply(this, arguments);
                    this.name = "SimpleMatrixData";
                    this.displayName = "Simple matrix data";
                    this.visuals = ['matrix',
                    ];
                }
                SimpleMatrixData.prototype.getDataViews = function () {
                    var dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
                    var dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);
                    var measureSource1 = { displayName: 'measure1', type: dataTypeNumber, isMeasure: true, index: 3, objects: { general: { formatString: '#.0' } } };
                    var measureSource2 = { displayName: 'measure2', type: dataTypeNumber, isMeasure: true, index: 4, objects: { general: { formatString: '#.00' } } };
                    var measureSource3 = { displayName: 'measure3', type: dataTypeNumber, isMeasure: true, index: 5, objects: { general: { formatString: '#' } } };
                    var rowGroupSource1 = { displayName: 'RowGroup1', queryName: 'RowGroup1', type: dataTypeString, index: 0 };
                    var rowGroupSource2 = { displayName: 'RowGroup2', queryName: 'RowGroup2', type: dataTypeString, index: 1 };
                    var rowGroupSource3 = { displayName: 'RowGroup3', queryName: 'RowGroup3', type: dataTypeString, index: 2 };
                    var matrixThreeMeasuresThreeRowGroups = {
                        rows: {
                            root: {
                                children: [
                                    {
                                        level: 0,
                                        value: 'North America',
                                        children: [
                                            {
                                                level: 1,
                                                value: 'Canada',
                                                children: [
                                                    {
                                                        level: 2,
                                                        value: 'Ontario',
                                                        values: {
                                                            0: { value: 1000 },
                                                            1: { value: 1001, valueSourceIndex: 1 },
                                                            2: { value: 1002, valueSourceIndex: 2 }
                                                        }
                                                    },
                                                    {
                                                        level: 2,
                                                        value: 'Quebec',
                                                        values: {
                                                            0: { value: 1010 },
                                                            1: { value: 1011, valueSourceIndex: 1 },
                                                            2: { value: 1012, valueSourceIndex: 2 }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                level: 1,
                                                value: 'USA',
                                                children: [
                                                    {
                                                        level: 2,
                                                        value: 'Washington',
                                                        values: {
                                                            0: { value: 1100 },
                                                            1: { value: 1101, valueSourceIndex: 1 },
                                                            2: { value: 1102, valueSourceIndex: 2 }
                                                        }
                                                    },
                                                    {
                                                        level: 2,
                                                        value: 'Oregon',
                                                        values: {
                                                            0: { value: 1110 },
                                                            1: { value: 1111, valueSourceIndex: 1 },
                                                            2: { value: 1112, valueSourceIndex: 2 }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        level: 0,
                                        value: 'South America',
                                        children: [
                                            {
                                                level: 1,
                                                value: 'Brazil',
                                                children: [
                                                    {
                                                        level: 2,
                                                        value: 'Amazonas',
                                                        values: {
                                                            0: { value: 2000 },
                                                            1: { value: 2001, valueSourceIndex: 1 },
                                                            2: { value: 2002, valueSourceIndex: 2 }
                                                        }
                                                    },
                                                    {
                                                        level: 2,
                                                        value: 'Mato Grosso',
                                                        values: {
                                                            0: { value: 2010 },
                                                            1: { value: 2011, valueSourceIndex: 1 },
                                                            2: { value: 2012, valueSourceIndex: 2 }
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                level: 1,
                                                value: 'Chile',
                                                children: [
                                                    {
                                                        level: 2,
                                                        value: 'Arica',
                                                        values: {
                                                            0: { value: 2100 },
                                                            1: { value: 2101, valueSourceIndex: 1 },
                                                            2: { value: 2102, valueSourceIndex: 2 }
                                                        }
                                                    },
                                                    {
                                                        level: 2,
                                                        value: 'Parinacota',
                                                        values: {
                                                            0: { value: 2110 },
                                                            1: { value: 2111, valueSourceIndex: 1 },
                                                            2: { value: 2112, valueSourceIndex: 2 }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                ]
                            },
                            levels: [
                                { sources: [rowGroupSource1] },
                                { sources: [rowGroupSource2] },
                                { sources: [rowGroupSource3] }
                            ]
                        },
                        columns: {
                            root: {
                                children: [
                                    { level: 0 },
                                    { level: 0, levelSourceIndex: 1 },
                                    { level: 0, levelSourceIndex: 2 }
                                ]
                            },
                            levels: [{
                                    sources: [
                                        measureSource1,
                                        measureSource2,
                                        measureSource3
                                    ]
                                }]
                        },
                        valueSources: [
                            measureSource1,
                            measureSource2,
                            measureSource3
                        ]
                    };
                    return [{
                            metadata: { columns: [rowGroupSource1, rowGroupSource2, rowGroupSource3], segment: {} },
                            matrix: matrixThreeMeasuresThreeRowGroups
                        }];
                };
                SimpleMatrixData.prototype.randomize = function () {
                };
                return SimpleMatrixData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SimpleMatrixData = SimpleMatrixData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var ValueType = powerbi.ValueType;
            var PrimitiveType = powerbi.PrimitiveType;
            var SimpleTableData = (function (_super) {
                __extends(SimpleTableData, _super);
                function SimpleTableData() {
                    _super.apply(this, arguments);
                    this.name = "SimpleTableData";
                    this.displayName = "Simple table data";
                    this.visuals = ['table',
                    ];
                }
                SimpleTableData.prototype.getDataViews = function () {
                    var dataTypeNumber = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Double);
                    var dataTypeString = ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text);
                    var groupSource1 = { displayName: 'group1', type: dataTypeString, index: 0 };
                    var groupSource2 = { displayName: 'group2', type: dataTypeString, index: 1 };
                    var groupSource3 = { displayName: 'group3', type: dataTypeString, index: 2 };
                    var measureSource1 = { displayName: 'measure1', type: dataTypeNumber, isMeasure: true, index: 3, objects: { general: { formatString: '#.0' } } };
                    var measureSource2 = { displayName: 'measure2', type: dataTypeNumber, isMeasure: true, index: 4, objects: { general: { formatString: '#.00' } } };
                    var measureSource3 = { displayName: 'measure3', type: dataTypeNumber, isMeasure: true, index: 5, objects: { general: { formatString: '#' } } };
                    return [{
                            metadata: { columns: [groupSource1, measureSource1, groupSource2, measureSource2, groupSource3, measureSource3] },
                            table: {
                                columns: [groupSource1, measureSource1, groupSource2, measureSource2, groupSource3, measureSource3],
                                rows: [
                                    ['A', 100, 'aa', 101, 'aa1', 102],
                                    ['A', 103, 'aa', 104, 'aa2', 105],
                                    ['A', 106, 'ab', 107, 'ab1', 108],
                                    ['B', 109, 'ba', 110, 'ba1', 111],
                                    ['B', 112, 'bb', 113, 'bb1', 114],
                                    ['B', 115, 'bb', 116, 'bb2', 117],
                                    ['C', 118, 'cc', 119, 'cc1', 120],
                                ]
                            }
                        }];
                };
                SimpleTableData.prototype.randomize = function () {
                };
                return SimpleTableData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.SimpleTableData = SimpleTableData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleDataViews;
        (function (sampleDataViews) {
            var DataViewTransform = powerbi.data.DataViewTransform;
            var TeamScoreData = (function (_super) {
                __extends(TeamScoreData, _super);
                function TeamScoreData() {
                    _super.apply(this, arguments);
                    this.name = "TeamScoreData";
                    this.displayName = "Team score data";
                    this.visuals = ['cheerMeter',
                    ];
                }
                TeamScoreData.prototype.getDataViews = function () {
                    var fieldExpr = powerbi.data.SQExprBuilder.fieldDef({ schema: 's', entity: "table1", column: "teams" });
                    var categoryValues = ["Seahawks", "49ers"];
                    var categoryIdentities = categoryValues.map(function (value) {
                        var expr = powerbi.data.SQExprBuilder.equal(fieldExpr, powerbi.data.SQExprBuilder.text(value));
                        return powerbi.data.createDataViewScopeIdentity(expr);
                    });
                    var dataViewMetadata = {
                        columns: [
                            {
                                displayName: 'Team',
                                queryName: 'Team',
                                type: powerbi.ValueType.fromDescriptor({ text: true })
                            },
                            {
                                displayName: 'Volume',
                                isMeasure: true,
                                queryName: 'volume1',
                                type: powerbi.ValueType.fromDescriptor({ numeric: true }),
                            },
                        ]
                    };
                    var columns = [
                        {
                            source: dataViewMetadata.columns[1],
                            values: [90, 30],
                        },
                    ];
                    var dataValues = DataViewTransform.createValueColumns(columns);
                    return [{
                            metadata: dataViewMetadata,
                            categorical: {
                                categories: [{
                                        source: dataViewMetadata.columns[0],
                                        values: categoryValues,
                                        identity: categoryIdentities,
                                        objects: [
                                            {
                                                dataPoint: {
                                                    fill: {
                                                        solid: {
                                                            color: 'rgb(165, 172, 175)'
                                                        }
                                                    }
                                                }
                                            },
                                            {
                                                dataPoint: {
                                                    fill: {
                                                        solid: {
                                                            color: 'rgb(175, 30, 44)'
                                                        }
                                                    }
                                                }
                                            },
                                        ]
                                    }],
                                values: dataValues,
                            },
                        }];
                };
                TeamScoreData.prototype.randomize = function () {
                };
                return TeamScoreData;
            })(sampleDataViews.SampleDataViews);
            sampleDataViews.TeamScoreData = TeamScoreData;
        })(sampleDataViews = visuals.sampleDataViews || (visuals.sampleDataViews = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
/// <reference path="_references.ts"/>
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var sampleData;
        (function (sampleData) {
            var sampleDataViews = powerbi.visuals.sampleDataViews;
            var SampleData = (function () {
                function SampleData() {
                }
                /**
                 * Returns sample data view for a visualization element specified.
                 */
                SampleData.getSamplesByPluginName = function (pluginName) {
                    var samples = this.data.filter(function (item) { return item.hasPlugin(pluginName); });
                    if (samples.length > 0) {
                        return samples;
                    }
                    return this.data.filter(function (item) { return item.hasPlugin("default"); });
                };
                /**
                 * Returns sampleDataView Instance for a visualization element specified.
                 */
                SampleData.getDataViewsBySampleName = function (sampleName) {
                    return this.data.filter(function (item) { return (item.getName() === sampleName); })[0];
                };
                SampleData.data = [
                    new sampleDataViews.FileStorageData(),
                    new sampleDataViews.ImageData(),
                    new sampleDataViews.RichtextData(),
                    new sampleDataViews.SalesByCountryData(),
                    new sampleDataViews.SalesByDayOfWeekData(),
                    new sampleDataViews.SimpleFunnelData(),
                    new sampleDataViews.SimpleGaugeData(),
                    new sampleDataViews.SimpleMatrixData(),
                    new sampleDataViews.SimpleTableData(),
                    new sampleDataViews.TeamScoreData()
                ];
                return SampleData;
            })();
            sampleData.SampleData = SampleData;
        })(sampleData = visuals.sampleData || (visuals.sampleData = {}));
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
/// <reference path="_references.ts"/>
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals) {
        var SampleData = powerbi.visuals.sampleData.SampleData;
        var HostControls = (function () {
            function HostControls(parent) {
                var _this = this;
                this.animation_duration = 250;
                this.suppressAnimations = true;
                this.minWidth = 200;
                this.maxWidth = 1000;
                this.minHeight = 100;
                this.maxHeight = 600;
                parent.find('#randomize').on('click', function () { return _this.randomize(); });
                this.dataViewsSelect = parent.find('#dataViewsSelect').first();
                this.suppressAnimationsElement = parent.find('input[name=suppressAnimations]').first();
                this.suppressAnimationsElement.on('change', function () { return _this.onChangeSuppressAnimations(); });
                this.animationDurationElement = parent.find('input[name=animation_duration]').first();
                this.animationDurationElement.on('change', function () { return _this.onChangeDuration(); });
            }
            HostControls.prototype.setElement = function (container) {
                var _this = this;
                this.container = container;
                this.container.resizable({
                    minWidth: this.minWidth,
                    maxWidth: this.maxWidth,
                    minHeight: this.minHeight,
                    maxHeight: this.maxHeight,
                    resize: function (event, ui) { return _this.onResize(ui.size); }
                });
                this.onResize({
                    height: this.container.height(),
                    width: this.container.width()
                });
            };
            HostControls.prototype.setVisual = function (visualElement) {
                this.visualElement = visualElement;
            };
            HostControls.prototype.onResize = function (size) {
                this.viewport = {
                    height: size.height - 20,
                    width: size.width - 20,
                };
                if (this.visualElement) {
                    if (this.visualElement.update) {
                        this.visualElement.update({
                            dataViews: this.sampleDataViews.getDataViews(),
                            suppressAnimations: true,
                            viewport: this.viewport
                        });
                    }
                    else if (this.visualElement.onResizing) {
                        this.visualElement.onResizing(this.viewport);
                    }
                }
            };
            HostControls.prototype.getViewport = function () {
                return this.viewport;
            };
            HostControls.prototype.randomize = function () {
                this.sampleDataViews.randomize();
                this.update();
            };
            HostControls.prototype.onChangeDuration = function () {
                this.animation_duration = parseInt(this.animationDurationElement.val(), 10);
                this.update();
            };
            HostControls.prototype.onChangeSuppressAnimations = function () {
                this.suppressAnimations = !this.suppressAnimationsElement.is(':checked');
                this.update();
            };
            HostControls.prototype.update = function () {
                if (this.visualElement.update) {
                    this.visualElement.update({
                        dataViews: this.sampleDataViews.getDataViews(),
                        suppressAnimations: this.suppressAnimations,
                        viewport: this.viewport
                    });
                }
                else {
                    this.visualElement.onDataChanged({
                        dataViews: this.sampleDataViews.getDataViews(),
                        suppressAnimations: this.suppressAnimations
                    });
                    this.visualElement.onResizing(this.viewport);
                }
            };
            HostControls.prototype.onPluginChange = function (pluginName) {
                var _this = this;
                this.dataViewsSelect.empty();
                var dataViews = SampleData.getSamplesByPluginName(pluginName);
                var defaultDataView;
                dataViews.forEach(function (item, i) {
                    var option = $('<option>');
                    option.val(item.getName());
                    option.text(item.getDisplayName());
                    if (i === 0) {
                        option.attr('selected', 'selected');
                        defaultDataView = item.getName();
                    }
                    _this.dataViewsSelect.append(option);
                });
                this.dataViewsSelect.change(function () { return _this.onChangeDataViewSelection(_this.dataViewsSelect.val()); });
                if (defaultDataView) {
                    this.onChangeDataViewSelection(defaultDataView);
                }
            };
            HostControls.prototype.onChangeDataViewSelection = function (sampleName) {
                this.sampleDataViews = SampleData.getDataViewsBySampleName(sampleName);
                this.update();
            };
            return HostControls;
        })();
        visuals.HostControls = HostControls;
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
/// <reference path="_references.ts"/>
var powerbi;
(function (powerbi) {
    var visuals;
    (function (visuals_1) {
        var defaultVisualHostServices = powerbi.visuals.defaultVisualHostServices;
        var HostControls = powerbi.visuals.HostControls;
        /**
         * Demonstrates Power BI visualization elements and the way to embed them in standalone web page.
         */
        var Playground = (function () {
            function Playground() {
            }
            /** Performs sample app initialization.*/
            Playground.initialize = function () {
                var _this = this;
                this.interactionsEnabledCheckbox = $("input[name='is_interactions']");
                this.container = $('#container');
                this.hostControls = new HostControls($('#options'));
                this.hostControls.setElement(this.container);
                this.populateVisualTypeSelect();
                powerbi.visuals.DefaultVisualHostServices.initialize();
                // Wrapper function to simplify visualization element creation when using jQuery
                $.fn.visual = function (plugin, dataView) {
                    // Step 1: Create new DOM element to represent Power BI visual
                    var element = $('<div/>');
                    element.addClass('visual');
                    element['visible'] = function () { return true; };
                    this.append(element);
                    Playground.createVisualElement(element, plugin, dataView);
                    return this;
                };
                this.interactionsEnabledCheckbox.on('change', function () {
                    _this.visualHostElement.empty();
                    _this.initVisual();
                    _this.hostControls.update();
                });
                var visualByDefault = jsCommon.Utility.getURLParamValue('visual');
                if (visualByDefault) {
                    $('.topBar, #options').css({ "display": "none" });
                    Playground.onVisualTypeSelection(visualByDefault.toString());
                }
                else {
                    this.onVisualTypeSelection($('#visualTypes').val());
                }
            };
            Playground.createVisualElement = function (element, plugin, dataView) {
                // Step 2: Instantiate Power BI visual
                this.currentVisual = plugin.create();
                this.visualHostElement = element;
                this.hostControls.setVisual(this.currentVisual);
                this.initVisual();
            };
            Playground.initVisual = function () {
                this.currentVisual.init({
                    element: this.visualHostElement,
                    host: defaultVisualHostServices,
                    style: this.visualStyle,
                    viewport: this.hostControls.getViewport(),
                    settings: { slicingEnabled: true },
                    interactivity: { isInteractiveLegend: false, selection: this.interactionsEnabledCheckbox.is(':checked') },
                });
            };
            Playground.populateVisualTypeSelect = function () {
                var _this = this;
                var typeSelect = $('#visualTypes');
                //typeSelect.append('<option value="">(none)</option>');
                var visuals = this.pluginService.getVisuals();
                visuals.sort(function (a, b) {
                    if (a.name < b.name)
                        return -1;
                    if (a.name > b.name)
                        return 1;
                    return 0;
                });
                for (var i = 0, len = visuals.length; i < len; i++) {
                    var visual = visuals[i];
                    if (visual.name === 'basicShape')
                        continue;
                    typeSelect.append('<option value="' + visual.name + '">' + visual.name + '</option>');
                }
                typeSelect.change(function () { return _this.onVisualTypeSelection(typeSelect.val()); });
            };
            Playground.onVisualTypeSelection = function (pluginName) {
                if (pluginName.length === 0) {
                    return;
                }
                this.createVisualPlugin(pluginName);
                this.hostControls.onPluginChange(pluginName);
            };
            Playground.createVisualPlugin = function (pluginName) {
                this.container.children().not(".ui-resizable-handle").remove();
                var plugin = this.pluginService.getPlugin(pluginName);
                if (!plugin) {
                    this.container.append('<div class="wrongVisualWarning">Wrong visual name <span>\'' + pluginName + '\'</span> in parameters</div>');
                    return;
                }
                this.container.visual(plugin);
            };
            /** Represents sample data view used by visualization elements. */
            Playground.pluginService = new powerbi.visuals.visualPluginFactory.PlaygroundVisualPluginService();
            Playground.visualStyle = {
                titleText: {
                    color: { value: 'rgba(51,51,51,1)' }
                },
                subTitleText: {
                    color: { value: 'rgba(145,145,145,1)' }
                },
                colorPalette: {
                    dataColors: new powerbi.visuals.DataColorPalette(),
                },
                labelText: {
                    color: {
                        value: 'rgba(51,51,51,1)',
                    },
                    fontSize: '11px'
                },
                isHighContrast: false,
            };
            return Playground;
        })();
        visuals_1.Playground = Playground;
    })(visuals = powerbi.visuals || (powerbi.visuals = {}));
})(powerbi || (powerbi = {}));
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
/// <reference path="typedefs/typedefs.ts"/>
/// <reference path="typedefs/typedefs.obj.ts"/>
/// <reference path="sampleDataViews/sampleDataViews.ts"/>
/// <reference path="sampleDataViews/FileStorageData.ts"/>
/// <reference path="sampleDataViews/ImageData.ts"/>
/// <reference path="sampleDataViews/RichtextData.ts"/>
/// <reference path="sampleDataViews/SalesByCountryData.ts"/>
/// <reference path="sampleDataViews/SalesByDayOfWeekData.ts"/>
/// <reference path="sampleDataViews/SimpleFunnelData.ts"/>
/// <reference path="sampleDataViews/SimpleGaugeData.ts"/>
/// <reference path="sampleDataViews/SimpleMatrixData.ts"/>
/// <reference path="sampleDataViews/SimpleTableData.ts"/>
/// <reference path="sampleDataViews/TeamScoreData.ts"/>
/// <reference path="sampleData.ts"/>
/// <reference path="hostControls.ts"/>
/// <reference path="app.ts"/> 

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVkZWZzL3R5cGVkZWZzLnRzIiwidHlwZWRlZnMvdHlwZWRlZnMub2JqLnRzIiwic2FtcGxlRGF0YVZpZXdzL3NhbXBsZURhdGFWaWV3cy50cyIsInNhbXBsZURhdGFWaWV3cy9GaWxlU3RvcmFnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvSW1hZ2VEYXRhLnRzIiwic2FtcGxlRGF0YVZpZXdzL1JpY2h0ZXh0RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TYWxlc0J5Q291bnRyeURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2FsZXNCeURheU9mV2Vla0RhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlRnVubmVsRGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVHYXVnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlTWF0cml4RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVUYWJsZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvVGVhbVNjb3JlRGF0YS50cyIsInNhbXBsZURhdGEudHMiLCJob3N0Q29udHJvbHMudHMiLCJhcHAudHMiLCJfcmVmZXJlbmNlcy50cyJdLCJuYW1lcyI6WyJwb3dlcmJpIiwicG93ZXJiaS52aXN1YWxzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXROYW1lIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuZ2V0RGlzcGxheU5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5oYXNQbHVnaW4iLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXRSYW5kb21WYWx1ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzLnJhbmRvbUVsZW1lbnQiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkZpbGVTdG9yYWdlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuRmlsZVN0b3JhZ2VEYXRhLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5JbWFnZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkltYWdlRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLmdldERhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5SaWNodGV4dERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5idWlsZFBhcmFncmFwaHNEYXRhVmlldyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeUNvdW50cnlEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5Q291bnRyeURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlEYXlPZldlZWtEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeURheU9mV2Vla0RhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVGdW5uZWxEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlR2F1Z2VEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVHYXVnZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVNYXRyaXhEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlVGFibGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVUYWJsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5UZWFtU2NvcmVEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEuU2FtcGxlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhLlNhbXBsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldFNhbXBsZXNCeVBsdWdpbk5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldERhdGFWaWV3c0J5U2FtcGxlTmFtZSIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRFbGVtZW50IiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRWaXN1YWwiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLm9uUmVzaXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5nZXRWaWV3cG9ydCIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZUR1cmF0aW9uIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucyIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMudXBkYXRlIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vblBsdWdpbkNoYW5nZSIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMub25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbiIsInBvd2VyYmkudmlzdWFscy5QbGF5Z3JvdW5kIiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5pbml0aWFsaXplIiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQuY3JlYXRlVmlzdWFsRWxlbWVudCIsInBvd2VyYmkudmlzdWFscy5QbGF5Z3JvdW5kLmluaXRWaXN1YWwiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5wb3B1bGF0ZVZpc3VhbFR5cGVTZWxlY3QiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5vblZpc3VhbFR5cGVTZWxlY3Rpb24iLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5jcmVhdGVWaXN1YWxQbHVnaW4iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCx3REFBd0Q7QUFDeEQsZ0RBQWdEO0FDM0JoRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsaUVBQWlFO0FBQ2pFLDZEQUE2RDtBQUM3RCxxREFBcUQ7QUM1QnJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxBQUVBLHlDQUZ5QztBQUV6QyxJQUFPLE9BQU8sQ0F5Q2I7QUF6Q0QsV0FBTyxPQUFPO0lBQUNBLElBQUFBLE9BQU9BLENBeUNyQkE7SUF6Q2NBLFdBQUFBLE9BQU9BO1FBQUNDLElBQUFBLGVBQWVBLENBeUNyQ0E7UUF6Q3NCQSxXQUFBQSxlQUFlQSxFQUFDQSxDQUFDQTtZQVFwQ0M7Z0JBQUFDO2dCQXlCQUMsQ0FBQ0E7Z0JBcEJVRCxpQ0FBT0EsR0FBZEE7b0JBQ0lFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLElBQUlBLENBQUNBO2dCQUNyQkEsQ0FBQ0E7Z0JBRU1GLHdDQUFjQSxHQUFyQkE7b0JBQ0lHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBO2dCQUM1QkEsQ0FBQ0E7Z0JBRU1ILG1DQUFTQSxHQUFoQkEsVUFBaUJBLFVBQWtCQTtvQkFDL0JJLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLENBQUNBLE9BQU9BLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNqREEsQ0FBQ0E7Z0JBRU1KLHdDQUFjQSxHQUFyQkEsVUFBc0JBLEdBQVdBLEVBQUVBLEdBQVdBO29CQUMxQ0ssSUFBSUEsS0FBS0EsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsQ0FBQ0E7b0JBQzlDQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxHQUFHQSxDQUFDQSxHQUFHQSxHQUFHQSxDQUFDQTtnQkFDeENBLENBQUNBO2dCQUVNTCx1Q0FBYUEsR0FBcEJBLFVBQXFCQSxHQUFVQTtvQkFDM0JNLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLEdBQUdBLEdBQUdBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO2dCQUN2REEsQ0FBQ0E7Z0JBQ0xOLHNCQUFDQTtZQUFEQSxDQXpCQUQsQUF5QkNDLElBQUFEO1lBekJZQSwrQkFBZUEsa0JBeUIzQkEsQ0FBQUE7UUFRTEEsQ0FBQ0EsRUF6Q3NCRCxDQXdDbEJDLGNBeENpQ0QsR0FBZkEsdUJBQWVBLEtBQWZBLHVCQUFlQSxRQXlDckNBO0lBQURBLENBQUNBLEVBekNjRCxPQUFPQSxHQUFQQSxlQUFPQSxLQUFQQSxlQUFPQSxRQXlDckJBO0FBQURBLENBQUNBLEVBekNNLE9BQU8sS0FBUCxPQUFPLFFBeUNiO0FDckVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF3QkU7Ozs7Ozs7QUFFRixBQUVBLHlDQUZ5QztBQUV6QyxJQUFPLE9BQU8sQ0EwRGI7QUExREQsV0FBTyxPQUFPO0lBQUNBLElBQUFBLE9BQU9BLENBMERyQkE7SUExRGNBLFdBQUFBLE9BQU9BO1FBQUNDLElBQUFBLGVBQWVBLENBMERyQ0E7UUExRHNCQSxXQUFBQSxlQUFlQSxFQUFDQSxDQUFDQTtZQUNwQ0MsSUFBT0EsaUJBQWlCQSxHQUFHQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLENBQUNBO1lBQzFEQSxJQUFPQSxTQUFTQSxHQUFHQSxPQUFPQSxDQUFDQSxTQUFTQSxDQUFDQTtZQUNyQ0EsSUFBT0EsYUFBYUEsR0FBR0EsT0FBT0EsQ0FBQ0EsYUFBYUEsQ0FBQ0E7WUFFN0NBO2dCQUFxQ1EsbUNBQWVBO2dCQUFwREE7b0JBQXFDQyw4QkFBZUE7b0JBRXpDQSxTQUFJQSxHQUFXQSxpQkFBaUJBLENBQUNBO29CQUNqQ0EsZ0JBQVdBLEdBQVdBLG1CQUFtQkEsQ0FBQ0E7b0JBRTFDQSxZQUFPQSxHQUFhQSxDQUFDQSxTQUFTQTtxQkFDcENBLENBQUNBO29CQUVNQSxlQUFVQSxHQUFHQSxDQUFDQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtvQkFFaEZBLGNBQVNBLEdBQVdBLEtBQUtBLENBQUNBO29CQUMxQkEsY0FBU0EsR0FBV0EsT0FBT0EsQ0FBQ0E7Z0JBeUN4Q0EsQ0FBQ0E7Z0JBdkNVRCxzQ0FBWUEsR0FBbkJBO29CQUNJRSxJQUFJQSxlQUFlQSxHQUE2QkE7d0JBQzVDQSxPQUFPQSxFQUFFQTs0QkFDTEEsRUFBRUEsV0FBV0EsRUFBRUEsWUFBWUEsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTs0QkFDbktBLEVBQUVBLFdBQVdBLEVBQUVBLFlBQVlBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7eUJBQ3RLQTtxQkFDSkEsQ0FBQ0E7b0JBRUZBLElBQUlBLE9BQU9BLEdBQUdBO3dCQUNWQSxFQUFFQSxXQUFXQSxFQUFFQSxlQUFlQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSw0QkFBNEJBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBO3dCQUN0S0EsRUFBRUEsV0FBV0EsRUFBRUEsd0JBQXdCQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSw0QkFBNEJBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBO3dCQUMvS0EsRUFBRUEsV0FBV0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDaEtBLEVBQUVBLFdBQVdBLEVBQUVBLFVBQVVBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7d0JBQ2pLQSxFQUFFQSxXQUFXQSxFQUFFQSxPQUFPQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSw0QkFBNEJBLENBQUNBLGFB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Q0FDTkE7Z0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO2dEQUNSQSxLQUFLQSxFQUFFQSxRQUFRQTtnREFDZkEsUUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsU0FBU0E7d0RBQ2hCQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLENBQUNBLEVBQUVBOzREQUN2Q0EsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTt5REFDMUNBO3FEQUNKQTtvREFDREE7d0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO3dEQUNSQSxLQUFLQSxFQUFFQSxRQUFRQTt3REFDZkEsTUFBTUEsRUFBRUE7NERBQ0pBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBOzREQUNsQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTs0REFDdkNBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsRUFBRUE7eURBQzFDQTtxREFDSkE7aURBQ0pBOzZDQUNKQTs0Q0FDREE7Z0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO2dEQUNSQSxLQUFLQSxFQUFFQSxLQUFLQTtnREFDWkEsUUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsWUFBWUE7d0RBQ25CQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFF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QVNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBRWhGQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBRXJHQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3pLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsTUFBTUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQzFLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBRXZLQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDSkEsUUFBUUEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0EsRUFBRUE7NEJBQ2pIQSxLQUFLQSxFQUFFQTtnQ0FDSEEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0E7Z0NBQ25HQSxJQUFJQSxFQUFFQTtvQ0FDRkEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7aUNBQ3BDQTs2QkFDSkE7eUJBQ0pBLENBQUNBLENBQUNBO2dCQUNQQSxDQUFDQTtnQkFFTUYsbUNBQVNBLEdBQWhCQTtnQkFDQUcsQ0FBQ0E7Z0JBRUxILHNCQUFDQTtZQUFEQSxDQXhDQXpDLEFBd0NDeUMsRUF4Q29DekMsK0JBQWVBLEVBd0NuREE7WUF4Q1lBLCtCQUFlQSxrQkF3QzNCQSxDQUFBQTtRQUNMQSxDQUFDQSxFQTdDc0JELGVBQWVBLEdBQWZBLHVCQUFlQSxLQUFmQSx1QkFBZUEsUUE2Q3JDQTtJQUFEQSxDQUFDQSxFQTdDY0QsT0FBT0EsR0FBUEEsZUFBT0EsS0FBUEEsZUFBT0EsUUE2Q3JCQTtBQUFEQSxDQUFDQSxFQTdDTSxPQUFPLEtBQVAsT0FBTyxRQTZDYjtBQ3pFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBd0JFO0FBRUYsQUFFQSx5Q0FGeUM7QUFFekMsSUFBTyxPQUFPLENBaUZiO0FBakZELFdBQU8sT0FBTztJQUFDQSxJQUFBQSxPQUFPQSxDQWlGckJBO0lBakZjQSxXQUFBQSxPQUFPQTtRQUFDQyxJQUFBQSxlQUFlQSxDQWlGckNBO1FBakZzQkEsV0FBQUEsZUFBZUEsRUFBQ0EsQ0FBQ0E7WUFDcENDLElBQU9BLGlCQUFpQkEsR0FBR0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsaUJBQWlCQSxDQUFDQTtZQUUxREE7Z0JBQW1DNkMsaUNBQWVBO2dCQUFsREE7b0JBQW1DQyw4QkFBZUE7b0JBRXZDQSxTQUFJQSxHQUFXQSxlQUFlQSxDQUFDQTtvQkFDL0JBLGdCQUFXQSxHQUFXQSxpQkFBaUJBLENBQUNBO29CQUV4Q0EsWUFBT0EsR0FBYUEsQ0FBQ0EsWUFBWUE7cUJBQ3ZDQSxDQUFDQTtnQkF1RU5BLENBQUNBO2dCQXJFVUQsb0NBQVlBLEdBQW5CQTtvQkFDSUUsSUFBSUEsU0FBU0EsR0FBR0EsT0FBT0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsRUFBRUEsTUFBTUEsRUFBRUEsR0FBR0EsRUFBRUEsTUFBTUEsRUFBRUEsUUFBUUEsRUFBRUEsTUFBTUEsRUFBRUEsT0FBT0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBRXhHQSxJQUFJQSxjQUFjQSxHQUFHQSxDQUFDQSxVQUFVQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtvQkFDM0NBLElBQUlBLGtCQUFrQkEsR0FBR0EsY0FBY0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsVUFBVUEsS0FBS0E7d0JBQ3ZELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQy9GLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMxRCxDQUFDLENBQUNBLENBQUNBO29CQUVIQSxJQUFJQSxnQkFBZ0JBLEdBQTZCQTt3QkFDN0NBLE9BQU9BLEVBQUVBOzRCQUNMQTtnQ0FDSUEsV0FBV0EsRUFBRUEsTUFBTUE7Z0NBQ25CQSxTQUFTQSxFQUFFQSxNQUFNQTtnQ0FDakJBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLENBQUNBLEVBQUVBLElBQUlBLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBOzZCQUN6REE7NEJBQ0RBO2dDQUNJQSxXQUFXQSxFQUFFQSxRQUFRQTtnQ0FDckJBLFNBQVNBLEVBQUVBLElBQUlBO2dDQUNmQSxTQUFTQSxFQUFFQSxTQUFTQTtnQ0FDcEJBLElBQUlBLEVBQUVBLE9BQU9BLENBQUNBLFNBQVNBLENBQUNBLGNBQWNBLENBQUNBLEVBQUVBLE9BQU9BLEVBQUVBLElBQUlBLEVBQUVBLENBQUNBOzZCQUM1REE7eUJBQ0pBO3FCQUNKQSxDQUFDQTtvQkFDRkEsSUFBSUEsT0FBT0EsR0FBR0E7d0JBQ1ZBOzRCQUNJQSxNQUFNQSxFQUFFQSxnQkFBZ0JBLENBQUNBLE9BQU9BLENBQUNBLENBQUNBLENBQUNBOzRCQUNuQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7eUJBQ25CQTtxQkFDSkEsQ0FBQ0E7b0JBRUZBLElBQUlBLFVBQVVBLEdBQXlCQSxpQkFBaUJBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7b0JBRXJGQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDSkEsUUFBUUEsRUFBRUEsZ0JBQWdCQTs0QkFDMUJBLFdBQVdBLEVBQUVBO2dDQUNUQSxVQUFVQSxFQUFFQSxDQUFDQTt3Q0FDVEEsTUFBTUEsRUFBRUEsZ0JBQWdCQSxDQUFDQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQTt3Q0FDbkNBLE1BQU1BLEVBQUVBLGNBQWNBO3dDQUN0QkEsUUFBUUEsRUFBRUEsa0JBQWtCQTt3Q0FDNUJBLE9BQU9BLEVBQUVBOzRDQUNMQTtnREFDSUEsU0FBU0EsRUFBRUE7b0RBQ1BBLElBQUlBLEVBQUVBO3dEQUNGQSxLQUFLQSxFQUFFQTs0REFDSEEsS0FBS0EsRUFBRUEsb0JBQW9CQTt5REFDOUJBO3FEQUNKQTtpREFDSkE7NkNBQ0pBOzRDQUNEQTtnREFDSUEsU0FBU0EsRUFBRUE7b0RBQ1BBLElBQUlBLEVBQUVBO3dEQUNGQSxLQUFLQSxFQUFFQTs0REFDSEEsS0FBS0EsRUFBRUEsa0JBQWtCQTt5REFDNUJBO3FEQUNKQTtpREFDSkE7NkNBQ0pBO3lDQUNKQTtxQ0FDSkEsQ0FBQ0E7Z0NBQ0ZBLE1BQU1BLEVBQUVBLFVBQVVBOzZCQUNyQkE7eUJBQ0pBLENBQUNBLENBQUNBO2dCQUNQQSxDQUFDQTtnQkFFTUYsaUNBQVNBLEdBQWhCQTtnQkFDQUcsQ0FBQ0E7Z0JBRUxILG9CQUFDQTtZQUFEQSxDQTdFQTdDLEFBNkVDNkMsRUE3RWtDN0MsK0JBQWVBLEVBNkVqREE7WUE3RVlBLDZCQUFhQSxnQkE2RXpCQSxDQUFBQTtRQUNMQSxDQUFDQSxFQWpGc0JELGVBQWVBLEdBQWZBLHVCQUFlQSxLQUFmQSx1QkFBZUEsUUFpRnJDQTtJQUFEQSxDQUFDQSxFQWpGY0QsT0FBT0EsR0FBUEEsZUFBT0EsS0FBUEEsZUFBT0EsUUFpRnJCQTtBQUFEQSxDQUFDQSxFQWpGTSxPQUFPLEtBQVAsT0FBTyxRQWlGYjtBQzdHRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsQUFFQSxzQ0FGc0M7QUFFdEMsSUFBTyxPQUFPLENBd0NiO0FBeENELFdBQU8sT0FBTztJQUFDQSxJQUFBQSxPQUFPQSxDQXdDckJBO0lBeENjQSxXQUFBQSxPQUFPQTtRQUFDQyxJQUFBQSxVQUFVQSxDQXdDaENBO1FBeENzQkEsV0FBQUEsVUFBVUEsRUFBQ0EsQ0FBQ0E7WUFFL0JrRCxJQUFPQSxlQUFlQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxlQUFlQSxDQUFDQTtZQUV6REE7Z0JBQUFDO2dCQW1DQUMsQ0FBQ0E7Z0JBcEJHRDs7bUJBRUdBO2dCQUNXQSxpQ0FBc0JBLEdBQXBDQSxVQUFxQ0EsVUFBa0JBO29CQUVuREUsSUFBSUEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQ0EsSUFBSUEsSUFBS0EsT0FBQUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsRUFBMUJBLENBQTBCQSxDQUFDQSxDQUFDQTtvQkFFckVBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLE1BQU1BLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO3dCQUNyQkEsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0E7b0JBQ25CQSxDQUFDQTtvQkFFREEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQ0EsSUFBSUEsSUFBS0EsT0FBQUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsRUFBekJBLENBQXlCQSxDQUFDQSxDQUFDQTtnQkFDakVBLENBQUNBO2dCQUVERjs7bUJBRUdBO2dCQUNXQSxtQ0FBd0JBLEdBQXRDQSxVQUF1Q0EsVUFBa0JBO29CQUNyREcsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBQ0EsSUFBSUEsSUFBS0EsT0FBQUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsT0FBT0EsRUFBRUEsS0FBS0EsVUFBVUEsQ0FBQ0EsRUFBL0JBLENBQStCQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUVBLENBQUNBO2dCQWhDY0gsZUFBSUEsR0FBR0E7b0JBQ2xCQSxJQUFJQSxlQUFlQSxDQUFDQSxlQUFlQSxFQUFFQTtvQkFDckNBLElBQUlBLGVBQWVBLENBQUNBLFNBQVNBLEVBQUVBO29CQUMvQkEsSUFBSUEsZUFBZUEsQ0FBQ0EsWUFBWUEsRUFBRUE7b0JBQ2xDQSxJQUFJQSxlQUFlQSxDQUFDQSxrQkFBa0JBLEVBQUVBO29CQUN4Q0EsSUFBSUEsZUFBZUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQTtvQkFDMUNBLElBQUlBLGVBQWVBLENBQUNBLGdCQUFnQkEsRUFBRUE7b0JBQ3RDQSxJQUFJQSxlQUFlQSxDQUFDQSxlQUFlQSxFQUFFQTtvQkFDckNBLElBQUlBLGVBQWVBLENBQUNBLGdCQUFnQkEsRUFBRUE7b0JBQ3RDQSxJQUFJQSxlQUFlQSxDQUFDQSxlQUFlQSxFQUFFQTtvQkFDckNBLElBQUlBLGVBQWVBLENBQUNBLGFBQWFBLEVBQUVBO2lCQUN0Q0EsQ0FBQ0E7Z0JBc0JOQSxpQkFBQ0E7WUFBREEsQ0FuQ0FELEFBbUNDQyxJQUFBRDtZQW5DWUEscUJBQVVBLGFBbUN0QkEsQ0FBQUE7UUFDTEEsQ0FBQ0EsRUF4Q3NCbEQsVUFBVUEsR0FBVkEsa0JBQVVBLEtBQVZBLGtCQUFVQSxRQXdDaENBO0lBQURBLENBQUNBLEVBeENjRCxPQUFPQSxHQUFQQSxlQUFPQSxLQUFQQSxlQUFPQSxRQXdDckJBO0FBQURBLENBQUNBLEVBeENNLE9BQU8sS0FBUCxPQUFPLFFBd0NiO0FDcEVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF3QkU7QUFFRixBQUVBLHNDQUZzQztBQU10QyxJQUFPLE9BQU8sQ0FrSmI7QUFsSkQsV0FBTyxPQUFPO0lBQUNBLElBQUFBLE9BQU9BLENBa0pyQkE7SUFsSmNBLFdBQUFBLE9BQU9BLEVBQUNBLENBQUNBO1FBRXBCQyxJQUFPQSxVQUFVQSxHQUFHQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxVQUFVQSxDQUFDQSxVQUFVQSxDQUFDQTtRQUUxREE7WUFxQkl1RCxzQkFBWUEsTUFBY0E7Z0JBckI5QkMsaUJBNklDQTtnQkF0SVdBLHVCQUFrQkEsR0FBV0EsR0FBR0EsQ0FBQ0E7Z0JBQ2pDQSx1QkFBa0JBLEdBQVlBLElBQUlBLENBQUNBO2dCQVFuQ0EsYUFBUUEsR0FBV0EsR0FBR0EsQ0FBQ0E7Z0JBQ3ZCQSxhQUFRQSxHQUFXQSxJQUFJQSxDQUFDQTtnQkFDeEJBLGNBQVNBLEdBQVdBLEdBQUdBLENBQUNBO2dCQUN4QkEsY0FBU0EsR0FBV0EsR0FBR0EsQ0FBQ0E7Z0JBRzVCQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxFQUFFQSxDQUFDQSxPQUFPQSxFQUFFQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxTQUFTQSxFQUFFQSxFQUFoQkEsQ0FBZ0JBLENBQUNBLENBQUNBO2dCQUU5REEsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFFL0RBLElBQUlBLENBQUNBLHlCQUF5QkEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsZ0NBQWdDQSxDQUFDQSxDQUFDQSxLQUFLQSxFQUFFQSxDQUFDQTtnQkFDdkZBLElBQUlBLENBQUNBLHlCQUF5QkEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsUUFBUUEsRUFBRUEsY0FBTUEsT0FBQUEsS0FBSUEsQ0FBQ0EsMEJBQTBCQSxFQUFFQSxFQUFqQ0EsQ0FBaUNBLENBQUNBLENBQUNBO2dCQUVyRkEsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxHQUFHQSxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxnQ0FBZ0NBLENBQUNBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO2dCQUN0RkEsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUFFQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSxnQkFBZ0JBLEVBQUVBLEVBQXZCQSxDQUF1QkEsQ0FBQ0EsQ0FBQ0E7WUFDOUVBLENBQUNBO1lBRU1ELGlDQUFVQSxHQUFqQkEsVUFBa0JBLFNBQWlCQTtnQkFBbkNFLGlCQWdCQ0E7Z0JBZkdBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLFNBQVNBLENBQUNBO2dCQUUzQkEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0E7b0JBQ3JCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTtvQkFDdkJBLFFBQVFBLEVBQUVBLElBQUlBLENBQUNBLFFBQVFBO29CQUN2QkEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0E7b0JBQ3pCQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxTQUFTQTtvQkFFekJBLE1BQU1BLEVBQUVBLFVBQUNBLEtBQUtBLEVBQUVBLEVBQUVBLElBQUtBLE9BQUFBLEtBQUlBLENBQUNBLFFBQVFBLENBQUNBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEVBQXRCQSxDQUFzQkE7aUJBQ2hEQSxDQUFDQSxDQUFDQTtnQkFFSEEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7b0JBQ1ZBLE1BQU1BLEVBQUVBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLEVBQUVBO29CQUMvQkEsS0FBS0EsRUFBRUEsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsS0FBS0EsRUFBRUE7aUJBQ2hDQSxDQUFDQSxDQUFDQTtZQUNQQSxDQUFDQTtZQUVNRixnQ0FBU0EsR0FBaEJBLFVBQWlCQSxhQUFzQkE7Z0JBQ25DRyxJQUFJQSxDQUFDQSxhQUFhQSxHQUFHQSxhQUFhQSxDQUFDQTtZQUN2Q0EsQ0FBQ0E7WUFFT0gsK0JBQVFBLEdBQWhCQSxVQUFpQkEsSUFBZUE7Z0JBQzVCSSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQTtvQkFDWkEsTUFBTUEsRUFBRUEsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsRUFBRUE7b0JBQ3hCQSxLQUFLQSxFQUFFQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxFQUFFQTtpQkFDekJBLENBQUNBO2dCQUVGQSxFQUFFQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDckJBLEVBQUVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO3dCQUM1QkEsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7NEJBQ3RCQSxTQUFTQSxFQUFFQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxZQUFZQSxFQUFFQTs0QkFDOUNBLGtCQUFrQkEsRUFBRUEsSUFBSUE7NEJBQ3hCQSxRQUFRQSxFQUFFQSxJQUFJQSxDQUFDQSxRQUFRQTt5QkFDMUJBLENBQUNBLENBQUNBO29CQUNQQSxDQUFDQTtvQkFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQUEsQ0FBQ0E7d0JBQ3RDQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQTtvQkFDakRBLENBQUNBO2dCQUNMQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVNSixrQ0FBV0EsR0FBbEJBO2dCQUNJSyxNQUFNQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTtZQUN6QkEsQ0FBQ0E7WUFFT0wsZ0NBQVNBLEdBQWpCQTtnQkFDSU0sSUFBSUEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsU0FBU0EsRUFBRUEsQ0FBQ0E7Z0JBQ2pDQSxJQUFJQSxDQUFDQSxNQUFNQSxFQUFFQSxDQUFDQTtZQUNsQkEsQ0FBQ0E7WUFFT04sdUNBQWdCQSxHQUF4QkE7Z0JBQ0lPLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxHQUFHQSxFQUFFQSxFQUFFQSxFQUFFQSxDQUFDQSxDQUFDQTtnQkFDNUVBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQ2xCQSxDQUFDQTtZQUVPUCxpREFBMEJBLEdBQWxDQTtnQkFDSVEsSUFBSUEsQ0FBQ0Esa0JBQWtCQSxHQUFHQSxDQUFDQSxJQUFJQSxDQUFDQSx5QkFBeUJBLENBQUNBLEVBQUVBLENBQUNBLFVBQVVBLENBQUNBLENBQUNBO2dCQUN6RUEsSUFBSUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFDbEJBLENBQUNBO1lBRU1SLDZCQUFNQSxHQUFiQTtnQkFDSVMsRUFBRUEsQ0FBQ0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzVCQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQTt3QkFDdEJBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLFlBQVlBLEVBQUVBO3dCQUM5Q0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxrQkFBa0JBO3dCQUMzQ0EsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsUUFBUUE7cUJBQzFCQSxDQUFDQSxDQUFDQTtnQkFDUEEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNKQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxhQUFhQSxDQUFDQTt3QkFDN0JBLFNBQVNBLEVBQUVBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLFlBQVlBLEVBQUVBO3dCQUM5Q0Esa0JBQWtCQSxFQUFFQSxJQUFJQSxDQUFDQSxrQkFBa0JBO3FCQUM5Q0EsQ0FBQ0EsQ0FBQ0E7b0JBRUhBLElBQUlBLENBQUNBLGFBQWFBLENBQUNBLFVBQVVBLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO2dCQUNqREEsQ0FBQ0E7WUFDTEEsQ0FBQ0E7WUFFTVQscUNBQWNBLEdBQXJCQSxVQUFzQkEsVUFBa0JBO2dCQUF4Q1UsaUJBd0JDQTtnQkF2QkdBLElBQUlBLENBQUNBLGVBQWVBLENBQUNBLEtBQUtBLEVBQUVBLENBQUNBO2dCQUU3QkEsSUFBSUEsU0FBU0EsR0FBR0EsVUFBVUEsQ0FBQ0Esc0JBQXNCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDOURBLElBQUlBLGVBQWVBLENBQUNBO2dCQUVwQkEsU0FBU0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsVUFBQ0EsSUFBSUEsRUFBRUEsQ0FBQ0E7b0JBQ3RCQSxJQUFJQSxNQUFNQSxHQUFXQSxDQUFDQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtvQkFFbkNBLE1BQU1BLENBQUNBLEdBQUdBLENBQUNBLElBQUlBLENBQUNBLE9BQU9BLEVBQUVBLENBQUNBLENBQUNBO29CQUMzQkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBRW5DQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTt3QkFDVkEsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsVUFBVUEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7d0JBQ3BDQSxlQUFlQSxHQUFHQSxJQUFJQSxDQUFDQSxPQUFPQSxFQUFFQSxDQUFDQTtvQkFDckNBLENBQUNBO29CQUNEQSxLQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSxDQUFDQSxNQUFNQSxDQUFDQSxDQUFDQTtnQkFDeENBLENBQUNBLENBQUNBLENBQUNBO2dCQUVIQSxJQUFJQSxDQUFDQSxlQUFlQSxDQUFDQSxNQUFNQSxDQUFDQSxjQUFNQSxPQUFBQSxLQUFJQSxDQUFDQSx5QkFBeUJBLENBQUNBLEtBQUlBLENBQUNBLGVBQWVBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLEVBQTFEQSxDQUEwREEsQ0FBQ0EsQ0FBQ0E7Z0JBRTlGQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbEJBLElBQUlBLENBQUNBLHlCQUF5QkEsQ0FBQ0EsZUFBZUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxDQUFDQTtZQUNMQSxDQUFDQTtZQUVPVixnREFBeUJBLEdBQWpDQSxVQUFrQ0EsVUFBa0JBO2dCQUNoRFcsSUFBSUEsQ0FBQ0EsZUFBZUEsR0FBR0EsVUFBVUEsQ0FBQ0Esd0JBQXdCQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDdkVBLElBQUlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO1lBQ2xCQSxDQUFDQTtZQUVMWCxtQkFBQ0E7UUFBREEsQ0E3SUF2RCxBQTZJQ3VELElBQUF2RDtRQTdJWUEsb0JBQVlBLGVBNkl4QkEsQ0FBQUE7SUFDTEEsQ0FBQ0EsRUFsSmNELE9BQU9BLEdBQVBBLGVBQU9BLEtBQVBBLGVBQU9BLFFBa0pyQkE7QUFBREEsQ0FBQ0EsRUFsSk0sT0FBTyxLQUFQLE9BQU8sUUFrSmI7QUNsTEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILEFBRUEsc0NBRnNDO0FBT3RDLElBQU8sT0FBTyxDQXlJYjtBQXpJRCxXQUFPLE9BQU87SUFBQ0EsSUFBQUEsT0FBT0EsQ0F5SXJCQTtJQXpJY0EsV0FBQUEsU0FBT0EsRUFBQ0EsQ0FBQ0E7UUFFcEJDLElBQU9BLHlCQUF5QkEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EseUJBQXlCQSxDQUFDQTtRQUU3RUEsSUFBT0EsWUFBWUEsR0FBR0EsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsWUFBWUEsQ0FBQ0E7UUFFbkRBLEFBR0FBOztXQURHQTs7WUFDSG1FO1lBK0hBQyxDQUFDQTtZQWpHR0QseUNBQXlDQTtZQUMzQkEscUJBQVVBLEdBQXhCQTtnQkFBQUUsaUJBa0NDQTtnQkFqQ0dBLElBQUlBLENBQUNBLDJCQUEyQkEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsK0JBQStCQSxDQUFDQSxDQUFDQTtnQkFDdEVBLElBQUlBLENBQUNBLFNBQVNBLEdBQUdBLENBQUNBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsSUFBSUEsWUFBWUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BEQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxVQUFVQSxDQUFDQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtnQkFFN0NBLElBQUlBLENBQUNBLHdCQUF3QkEsRUFBRUEsQ0FBQ0E7Z0JBQ2hDQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSx5QkFBeUJBLENBQUNBLFVBQVVBLEVBQUVBLENBQUNBO2dCQUN2REEsQUFDQUEsZ0ZBRGdGQTtnQkFDaEZBLENBQUNBLENBQUNBLEVBQUVBLENBQUNBLE1BQU1BLEdBQUdBLFVBQVVBLE1BQXFCQSxFQUFFQSxRQUFxQkE7b0JBRWhFLEFBQ0EsOERBRDhEO3dCQUMxRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMxQixPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUMzQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsY0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVyQixVQUFVLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztvQkFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDaEIsQ0FBQyxDQUFDQTtnQkFFRkEsSUFBSUEsQ0FBQ0EsMkJBQTJCQSxDQUFDQSxFQUFFQSxDQUFDQSxRQUFRQSxFQUFFQTtvQkFDMUNBLEtBQUlBLENBQUNBLGlCQUFpQkEsQ0FBQ0EsS0FBS0EsRUFBRUEsQ0FBQ0E7b0JBQy9CQSxLQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtvQkFDbEJBLEtBQUlBLENBQUNBLFlBQVlBLENBQUNBLE1BQU1BLEVBQUVBLENBQUNBO2dCQUMvQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBRUhBLElBQUlBLGVBQWVBLEdBQUdBLFFBQVFBLENBQUNBLE9BQU9BLENBQUNBLGdCQUFnQkEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2xFQSxFQUFFQSxDQUFDQSxDQUFDQSxlQUFlQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDbEJBLENBQUNBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsU0FBU0EsRUFBRUEsTUFBTUEsRUFBRUEsQ0FBQ0EsQ0FBQ0E7b0JBQ2xEQSxVQUFVQSxDQUFDQSxxQkFBcUJBLENBQUNBLGVBQWVBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLENBQUNBO2dCQUNqRUEsQ0FBQ0E7Z0JBQUNBLElBQUlBLENBQUNBLENBQUNBO29CQUNKQSxJQUFJQSxDQUFDQSxxQkFBcUJBLENBQUNBLENBQUNBLENBQUNBLGNBQWNBLENBQUNBLENBQUNBLEdBQUdBLEVBQUVBLENBQUNBLENBQUNBO2dCQUN4REEsQ0FBQ0E7WUFDTEEsQ0FBQ0E7WUFFY0YsOEJBQW1CQSxHQUFsQ0EsVUFBbUNBLE9BQWVBLEVBQUVBLE1BQXFCQSxFQUFFQSxRQUFxQkE7Z0JBRTVGRyxBQUNBQSxzQ0FEc0NBO2dCQUN0Q0EsSUFBSUEsQ0FBQ0EsYUFBYUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBQ3JDQSxJQUFJQSxDQUFDQSxpQkFBaUJBLEdBQUdBLE9BQU9BLENBQUNBO2dCQUNqQ0EsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ2hEQSxJQUFJQSxDQUFDQSxVQUFVQSxFQUFFQSxDQUFDQTtZQUN0QkEsQ0FBQ0E7WUFFY0gscUJBQVVBLEdBQXpCQTtnQkFDSUksSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQ3BCQSxPQUFPQSxFQUFFQSxJQUFJQSxDQUFDQSxpQkFBaUJBO29CQUMvQkEsSUFBSUEsRUFBRUEseUJBQXlCQTtvQkFDL0JBLEtBQUtBLEVBQUVBLElBQUlBLENBQUNBLFdBQVdBO29CQUN2QkEsUUFBUUEsRUFBRUEsSUFBSUEsQ0FBQ0EsWUFBWUEsQ0FBQ0EsV0FBV0EsRUFBRUE7b0JBQ3pDQSxRQUFRQSxFQUFFQSxFQUFFQSxjQUFjQSxFQUFFQSxJQUFJQSxFQUFFQTtvQkFDbENBLGFBQWFBLEVBQUVBLEVBQUVBLG1CQUFtQkEsRUFBRUEsS0FBS0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsMkJBQTJCQSxDQUFDQSxFQUFFQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQTtpQkFDNUdBLENBQUNBLENBQUNBO1lBQ1BBLENBQUNBO1lBRWNKLG1DQUF3QkEsR0FBdkNBO2dCQUFBSyxpQkFtQkNBO2dCQWpCR0EsSUFBSUEsVUFBVUEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsY0FBY0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ25DQSxBQUVBQSx3REFGd0RBO29CQUVwREEsT0FBT0EsR0FBR0EsSUFBSUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsVUFBVUEsRUFBRUEsQ0FBQ0E7Z0JBQzlDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxFQUFFQSxDQUFDQTtvQkFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDL0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQzlCLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDQSxDQUFDQTtnQkFFSEEsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsRUFBRUEsR0FBR0EsR0FBR0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0EsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ2pEQSxJQUFJQSxNQUFNQSxHQUFHQSxPQUFPQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDeEJBLEVBQUVBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLElBQUlBLEtBQUtBLFlBQVlBLENBQUNBO3dCQUFDQSxRQUFRQSxDQUFDQTtvQkFDM0NBLFVBQVVBLENBQUNBLE1BQU1BLENBQUNBLGlCQUFpQkEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsSUFBSUEsR0FBR0EsTUFBTUEsQ0FBQ0EsSUFBSUEsR0FBR0EsV0FBV0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzFGQSxDQUFDQTtnQkFFREEsVUFBVUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsY0FBTUEsT0FBQUEsS0FBSUEsQ0FBQ0EscUJBQXFCQSxDQUFDQSxVQUFVQSxDQUFDQSxHQUFHQSxFQUFFQSxDQUFDQSxFQUE1Q0EsQ0FBNENBLENBQUNBLENBQUNBO1lBQzFFQSxDQUFDQTtZQUVjTCxnQ0FBcUJBLEdBQXBDQSxVQUFxQ0EsVUFBa0JBO2dCQUNuRE0sRUFBRUEsQ0FBQ0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsTUFBTUEsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQzFCQSxNQUFNQSxDQUFDQTtnQkFDWEEsQ0FBQ0E7Z0JBRURBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7Z0JBQ3BDQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtZQUNqREEsQ0FBQ0E7WUFFY04sNkJBQWtCQSxHQUFqQ0EsVUFBa0NBLFVBQWtCQTtnQkFDaERPLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLEdBQUdBLENBQUNBLHNCQUFzQkEsQ0FBQ0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7Z0JBRS9EQSxJQUFJQSxNQUFNQSxHQUFHQSxJQUFJQSxDQUFDQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtnQkFDdERBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBLENBQUNBO29CQUNWQSxJQUFJQSxDQUFDQSxTQUFTQSxDQUFDQSxNQUFNQSxDQUFDQSw0REFBNERBLEdBQUdBLFVBQVVBLEdBQUdBLCtCQUErQkEsQ0FBQ0EsQ0FBQ0E7b0JBQUNBLE1BQU1BLENBQUNBO2dCQUMvSUEsQ0FBQ0E7Z0JBQ0RBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLE1BQU1BLENBQUNBLE1BQU1BLENBQUNBLENBQUNBO1lBQ2xDQSxDQUFDQTtZQTNIRFAsa0VBQWtFQTtZQUNuREEsd0JBQWFBLEdBQXlCQSxJQUFJQSxPQUFPQSxDQUFDQSxPQUFPQSxDQUFDQSxtQkFBbUJBLENBQUNBLDZCQUE2QkEsRUFBRUEsQ0FBQ0E7WUFROUdBLHNCQUFXQSxHQUFpQkE7Z0JBQ3ZDQSxTQUFTQSxFQUFFQTtvQkFDUEEsS0FBS0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsa0JBQWtCQSxFQUFFQTtpQkFDdkNBO2dCQUNEQSxZQUFZQSxFQUFFQTtvQkFDVkEsS0FBS0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEscUJBQXFCQSxFQUFFQTtpQkFDMUNBO2dCQUNEQSxZQUFZQSxFQUFFQTtvQkFDVkEsVUFBVUEsRUFBRUEsSUFBSUEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQTtpQkFDckRBO2dCQUNEQSxTQUFTQSxFQUFFQTtvQkFDUEEsS0FBS0EsRUFBRUE7d0JBQ0hBLEtBQUtBLEVBQUVBLGtCQUFrQkE7cUJBQzVCQTtvQkFDREEsUUFBUUEsRUFBRUEsTUFBTUE7aUJBQ25CQTtnQkFDREEsY0FBY0EsRUFBRUEsS0FBS0E7YUFDeEJBLENBQUNBO1lBbUdOQSxpQkFBQ0E7UUFBREEsQ0EvSEFuRSxBQStIQ21FLElBQUFuRTtRQS9IWUEsb0JBQVVBLGFBK0h0QkEsQ0FBQUE7SUFDTEEsQ0FBQ0EsRUF6SWNELE9BQU9BLEdBQVBBLGVBQU9BLEtBQVBBLGVBQU9BLFFBeUlyQkE7QUFBREEsQ0FBQ0EsRUF6SU0sT0FBTyxLQUFQLE9BQU8sUUF5SWI7QUMxS0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILDRDQUE0QztBQUM1QyxnREFBZ0Q7QUFFaEQsMERBQTBEO0FBQzFELDBEQUEwRDtBQUMxRCxvREFBb0Q7QUFDcEQsdURBQXVEO0FBQ3ZELDZEQUE2RDtBQUM3RCwrREFBK0Q7QUFDL0QsMkRBQTJEO0FBQzNELDBEQUEwRDtBQUMxRCwyREFBMkQ7QUFDM0QsMERBQTBEO0FBQzFELHdEQUF3RDtBQUV4RCxxQ0FBcUM7QUFDckMsdUNBQXVDO0FBQ3ZDLDhCQUE4QiIsImZpbGUiOiJzcmMvQ2xpZW50cy9Qb3dlckJJVmlzdWFsc1BsYXlncm91bmQvb2JqL1Bvd2VyQklWaXN1YWxzUGxheWdyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcbiAqXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcbiAqICBNSVQgTGljZW5zZVxuICpcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcbiAqICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAgIFxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxuICogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogICBcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcbiAqICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXG4gKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiAgVEhFIFNPRlRXQVJFLlxuICovXG5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1R5cGVkZWZzL2pxdWVyeS9qcXVlcnkuZC50c1wiLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1R5cGVkZWZzL2QzL2QzLmQudHNcIi8+XG4iLCIvKlxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4gKlxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4gKiAgTUlUIExpY2Vuc2VcbiAqXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogICBcbiAqICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqICAgXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiAqICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaXN1YWxzQ29tbW9uL29iai9WaXN1YWxzQ29tbW9uLmQudHNcIi8+XG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaXN1YWxzRGF0YS9vYmovVmlzdWFsc0RhdGEuZC50c1wiLz5cbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1Zpc3VhbHMvb2JqL1Zpc3VhbHMuZC50c1wiLz4iLCIvKlxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4gKlxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4gKiAgTUlUIExpY2Vuc2VcbiAqXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogICBcbiAqICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqICAgXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiAqICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XG5cbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNhbXBsZURhdGFWaWV3cyB7XG4gICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgZGlzcGxheU5hbWU6IHN0cmluZzsgXG4gICAgICAgIHZpc3VhbHM6IHN0cmluZ1tdO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzIHtcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZztcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXTtcblxuICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBnZXREaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheU5hbWU7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgaGFzUGx1Z2luKHBsdWdpbk5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzdWFscy5pbmRleE9mKHBsdWdpbk5hbWUpID49IDA7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwodmFsdWUgKiAxMDApIC8gMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJhbmRvbUVsZW1lbnQoYXJyOiBhbnlbXSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIGV4dGVuZHMgSVNhbXBsZURhdGFWaWV3cyB7XG4gICAgICAgIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdO1xuICAgICAgICByYW5kb21pemUoKTogdm9pZDtcbiAgICAgICAgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyO1xuICAgICAgICByYW5kb21FbGVtZW50KGFycjogYW55W10pOiBhbnk7XG4gICAgfVxufVxuIiwiLypcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4qXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4qICBNSVQgTGljZW5zZVxuKlxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiogICBcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4qICAgXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuKiAgVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxuXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xuICAgIGltcG9ydCBWYWx1ZVR5cGUgPSBwb3dlcmJpLlZhbHVlVHlwZTtcbiAgICBpbXBvcnQgUHJpbWl0aXZlVHlwZSA9IHBvd2VyYmkuUHJpbWl0aXZlVHlwZTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgRmlsZVN0b3JhZ2VEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xuXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkZpbGVTdG9yYWdlRGF0YVwiO1xuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiRmlsZSBzdG9yYWdlIGRhdGFcIjtcblxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ3RyZWVtYXAnLFxuICAgICAgICBdO1xuICAgICAgICBcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gWzc0MjczMS40MywgMTYyMDY2LjQzLCAyODMwODUuNzgsIDMwMDI2My40OSwgMzc2MDc0LjU3LCA4MTQ3MjQuMzRdO1xuXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluOiBudW1iZXIgPSAzMDAwMDtcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXg6IG51bWJlciA9IDEwMDAwMDA7XG5cbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcbiAgICAgICAgICAgIHZhciB0cmVlTWFwTWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdFdmVudENvdW50JywgcXVlcnlOYW1lOiAnc2VsZWN0MScsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ01lZGFsQ291bnQnLCBxdWVyeU5hbWU6ICdzZWxlY3QyJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBbXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1Byb2dyYW0gRmlsZXMnLCBxdWVyeU5hbWU6ICdzZWxlY3QxJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdEb2N1bWVudHMgYW5kIFNldHRpbmdzJywgcXVlcnlOYW1lOiAnc2VsZWN0MicsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcbiAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnV2luZG93cycsIHF1ZXJ5TmFtZTogJ3NlbGVjdDMnLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH0sXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1JlY292ZXJ5JywgcXVlcnlOYW1lOiAnc2VsZWN0NCcsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcbiAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnVXNlcnMnLCBxdWVyeU5hbWU6ICdzZWxlY3Q1JywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdQcm9ncmFtRGF0YScsIHF1ZXJ5TmFtZTogJ3NlbGVjdDYnLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBjb2x1bW5zW2ldLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbaV1dXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0cmVlTWFwTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnModmFsdWVzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcblxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCkpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCIvKlxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcbipcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcbiogIE1JVCBMaWNlbnNlXG4qXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuKiAgIFxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiogICBcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4qICBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XG5cbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xuXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkltYWdlRGF0YVwiO1xuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiSW1hZ2UgZGF0YVwiO1xuXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnaW1hZ2UnLFxuICAgICAgICBdO1xuXG4gICAgICAgIHByaXZhdGUgc2FtcGxlSW1hZ2VzID0gW1xuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTmdBQUFEWUNBWUFBQUgrSngxN0FBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUJ4VFNVUkJWSGhlN1owSmRCUmx0b0JkWnRUUnAwOW5uT2U4TS9QZVREcktKZ2lDT203Z2lnS2lJSUlzZ3R1d0N3S21rNUE5RUNFaEpFZ3dLSXVBZ0NCclJDRHNHQVZOQWdaWmpDakJFQklJU1NjUlFuQlVGS2pKWDk3U3F2SldkM1YxN2JuZk9kODU2ZnhiM2I2NTZlcXE2dXFMUW1GUlVYVlArRkUvdXM4dXVySjU3TkFMWVJHUGNHSTdwcWVYUWhkdHZMdW5kcEI4VWlXRFhpd3NvdHR2dGxpdFFTL21pZWg5RnB0SWplNWZER3ZEdE05aVlyRDJRSXNKQ0kvUnhaU1E5OU4xTWFYSGd0aGlBdktmbWJvc3RyUWdsMlBLK3dvSS9YVlpESnAvMDFkQTZLOUx6cUJaTWxiK016TmdaUDNmOE1Lam54SDMwMzB4ZjcranhZVCtRZjJCUEpZNVF0SlBsOFhreWhjUk5HUXhKWVhGc0RaTTV5Mm1HbE1YdXlYaGxUSnNJalVHdlJoR2o1bno4N0hKNWVxeUdNYlN6MnI2bTdhWW5CMUhHMXJCai9yUldKTVhyOXhYMDEwZUZSTzZhR054WWQwMUQyWms3c1VteG9SaDZzRW1VU3RNb1I1c0VyWENGT3JCSmxFclRLRWViQksxQmp2ZUhvdHRLYzcvK2NVSXdQb0VXa3hBZUl4MnhzRDY2YmFZL0RGRC9EdW1mREV4NHNkQ2U4aUxZYnZlRFBIalgvb0xQNGdWZHhBUXR3dXl4YUNaZnl4Ry9QaVgvc0lQWWpIYXh2ZjZUVC9kRm1PNzNlem53cS8zODQ4WjhuNjZMWWI5amlIK25mTVhFMGhaODZiazk3b3RoaUh2cDh0aWFqVjlNZXozU2pwcnNhREFKbEVyVEtFZWJCSzF3aFRhR2I3NjhCUFl4Smd3UkY5bUYxVmVmL3VyaVVkTldTd1VkcFkyM1B0Z1ptYWhmRVB2VGtzOUFsM3N3WWFTQzVmdnEvbys3Sm41eXhmZUZQM2NlZmtHcTlXVU4wQjVIUGU3OU8yKzhBR3pGOFcwU1J4N0J0c1F2VFU4c0ZEZXZZY2lCYVlWT3dTR3RTdlpPbUgwVC81OEtPUFZEL2hKblJhWVdoMGJtQng1dStyQWdnRWJMOWVXZ1UzZnZGalMxdkQ5dDlEeUsrSjJURFdCWVNpMWljY3hOUVVXcUoyQjlSSHJ5TUNHTFVoRys0Z1ZCd2JEZmtIb2c2SFVKdnhlVUhOZzdKMG5obnlja3JZTVRBMGRKdzFDNXhHMGJjWXc1U2lkL0dJNktqQ21IS3dQa3dLVG9kUW0vRjdRc0JwallQTUkyaVl3SnZzM3JnYnNHS3RjV3dXbXAwMGlNS3c5VkcwUm1NZmJnd3VQNnF1TGQwNk8vZmtna1IwQ013VFhCaVptMVJjbi8vN1k2MW5UMmlTT3E4RTJSazlORFN3WXNqNzJoUTlmdXZHZFZnbWo2ckVORDZSdEExUExXeC9YWHYzUW5JUE4rczFkc2tZYzJOMXBLV1hReFIzc0xLKy9idUh1bXI3dzBMbkViYXhJYXg0NzdOL2liREdoMmQ1a2JTaTV2TXozN1YrZWYzdjFBbmtBU3NKUSt6Q2xzV2JtRmZxZXZTOGo0d3RzZzlVSzA1blBDbzY3Tkc1RGVmakVqZnNuZUx4UGFUNnJvaVFzWXl4ekM2cHZHTFRrOEYyUFRNL2U0NG5xby9sakRzRUlTeHNIdHFnWnd2TEdnUzFxaHJDOGNXQ0xtaUVzYnh6WW9tWUl5eHNIdHFnWnd2TEdnUzFxaHJBOEQ5YU9pWjNvRTN0N1NzelpvdEtUL3gvVXBIckxMdzVnN2FGb3lLUnE1UmNIc1BaUXBjRDBGbUxpd2RyOStlYjJaWERRN1Zma2ZZS2VsSjFvVUFMcnJ5VEV4SU8xKzFPM3dJNmY5TUh3d0dEak1TRW1IcXpkbjdvRkZpellISEloSmg2czNaK0dCU1kvTmk5SDNLWWt4TVNEdFdPTWVTZVZiek1zTUhtNy9HU0Z2QjBUWXVMQjJqRk1EMHplQjJ1WEN6SHhZTzBZamd0TStIQ0M4QUVGSm9icGdZay9Ec0NRdDJOQ1REd3dqRWRveHpBOU1ESHlDL1NWaEpoNFlDaVAwSTVoZUdEc2d4dXJQdDBDajZSZzR6RWhKaDRZeWlPMFl4Z2VXQ0N3T2VSQ1REd3dqRWRveDdBOE1BWTJqMWlJaVFlRzhBanRHS2I4S1FwdFNwY2VzVDlWOFJ4eUlTWWVHTUlqdEdPWS9zOURVQTdXUnhCaTRvSHVQRUk3aG1XQnlmK2hZSDBFSVNZZTZNNGp0R05ZRmhoVEROWXVDREh4UUhjZW9SMkRBbXRVMThEa2w5QmlmUVFoSmg3b3ppTzBZMWdTMlB3ZE9kRDZLMWcvUVlpSkI3cnpDTzBZaGdlbUJ2YXVHNXRMRUdMaWdTRThRanVHTFFMRDVoRUxNZkhBRUI2aEhVUDN3QVRsZS9GS1lHUGxRa3c4TUl4SGFNY3dMREFseFhzaWFvV1llR0RiZUlSMkROTUQweUxFeEFQYnhpTzBZemd1TUt3OVZDa3d2WVdZZUxEMlVDdzl5ZjIzTFFMRExxalVvc2ZiNi94ZGs4ZW04NU5paTVvaHY3aVJZSXVhSVN4dkhOaWlaZ2pMR3dlMnFCbkM4c2FCTFdxR3NMdzVaTzJzdnZQZUtaTS9ENDhjWVBnRjBMQ2tkYnp4U1ZYcmp1a1Q1cmRManE3RE5sQ3JNTDI5MkZCU2Q4M2lvdW83YjB1Sks4YzJXbzB3bFROWTk4WEpqdU5XNTAxUmMzMGpESEVtN0dMT3BMeks2NWZzcWVuWEpuRmNyV3NDczRMbG56WDhlZno2OGc3djd2VTl6KzQ1Y3Z1cmNZYzlrVStlRTU3UVd5ZEUxMEJYd2loS1NpNWMvdjZCNmhzbWJDenZNV0RlOHUxM3AwNHFhUmJ6d3I4OTNwNUJYK1hyK0E5b1dFWGplL2xMbHUrdmJSNjFycUxmb0tWZmozMGllODU3TGVOSGZoc1cwUVY5b3ZXU0VpYURWY09DVDMzM2pGNVQ5c285YVNsN1c4WU5id2lQR21qSkI5UXdtMHpDdHBhZWJwYTZyWEx3aXd2WEZqYnVNelpnVDRZVGRIekNsdTMxM1JQOTNvN29EaFBpYXNJam45Yjk0eXQyMC9FSnMrcnp0RlpKQ1hPWWxEQ0hTUWx6bUpRd2g2bVVNSFpIMXFJaTd2ZDJFalpOQ2lYc1o3QytkdEs3ZXQxWWZrTXBZVCtEOWJXYjdTZDRLeWhoQU5iWGpsTENBS3l2M3ZiTUdzM0ZycHp1VjJ5Y1dFc1N4ajdZeVM1QnhXNVBlN0N5MU84ZEprUFZ5b1JoVjdQSndjYUpOU3hoN043QmVxRG1Gb2JCU0FrVGFSU0JQaFlUakpRd2tVWVN1U3dEWFROWUtXRWkvWUgxbHhzSWJFeXc2cEV3dFFoWFlndTZMbUZNZjJEOWc1VVNKdElmV0g5TWYyRDlnNVVTSnRJZldIKzViSTlRaVVBZjBGS3JVc0pnR1JUNUhHcHhmY0w4Z2ZYWElpVk1wRCt3L2t5Mjl4Y0liSnhXS1dFaTlZWWRDZEh5b1VGL1VzSkVHbzBlaDZ3b1lTTE5BbHRiclpRd2tmN0ErbU95NzAxU0F6WldqWlF3a2Y3QStnZlNIK3lvUGpZbWtKUXdrZjdBK3F2Ukgxai9RRkxDUlBvRDY2OUdmMkQ5QTBrSkUra1BySDhnQTcyZVlXTUNTUWtUNlErc3Z6K05la05OQ1JPcEZuYkxJSFpHbXQyTGxyMHhackxIYkVkQ0xkajZhcVNFaVRRTGJHMjFVc0pFR28wZVo1MHBZVUhJVHArd2YzMXE3NkxHa0g4UmVLaFN3aHdtSmN4aEtpVU02MnRIS1dFQTF0ZU9Vc0lBcksvZHZIVkN4QWxLR0lEMXRaTzlaODFhem04b0pjeGhVTUljQmlYTVlWRENISVluNGlsS21KTllrRmQyUmZZbkovNitjbjl0ajhqM2RxVGVPeVgxeS9EeEEzL0VnbldEamsrWUdqaU91emlKNHk3SjQ3amY3U2c5M1d6MWdick9mZWUrczZyamxMUkROeWVNUlo4WXU5b2tFcWFWZ3RJek4ydzZWSGRIdHhrenQ0Ukg5VFhsSytjRFNRblRpWGxGTmQxak41YkgzRG94OGxETCtCSGZlYnhQR25Kbk9VcVlpVFQrYTc1MDgxZW53dWJ0cm42NDYrdXZ2M1hmMUl6U214UEdmQnNlMWYrWGUvb0draEptWTFidS9lYm1TVnVPOVpxYWQyalpIWk9TS3ozZUo4NTFmbTFHQVRRVGRtVnYyZmYvMkhTby9vNjA3Y2ZHdzY4SU84QnVxSldkNzdzeGRldnhoeE0zN0ozMDZJd1oyMXJGalRndC9wY0lYUWtybUxxNTZxclhkbFMrL0Zqalh1aHRreEtPaEhsN0JOd1RoYUdFa1JTVzFGMHpzNkQ2bHBTTisxN3RNdU9Ob3JiSlhwOG5zdjlQV0VJQ0NWTVNvY0srSHFQMzhvby9SRFJXelFkZjEzZVlsKzk3dGxONjJqNjk3Mk1QeXhIQnNyTzgvcnJzajA1MEdyYjZ5TERXQ1NNTE9rK2JjZENvOTE1aVlYa0NnMVhON0tMS0t4ZnNQWFh0K3M5UFBSQ1I4K0hFN3RsenRyWkpIRmNUNW4wY2ZVS05GamFORU5oNnFONHplZXZ4dm0yVHgreTVMU1greEUzUkE3LzNSRDZsK28ydDBjSm1OaTN5eXNxdW1MNnQrb2IxaDA1Mm1sdFE5ZkxReGJrTDJpU05jOFMzUlVBSTd1ZnRncHF1YVZzclgrNlNOY3NYSGozQXNhZGZJQnpucytSQS9YVXpQenIrZjFHNUZXM3VlK09MaDVOeWk2WjFtQmhmM1N6Mlg2NDZOd2JoT3BlM2Q5VTgzVFZyNXFibU1VUE9oWG03MitJVWlKRkMyTTRGQzhyTlF0ak9CUXZLelVMWXpnVUx5czFDMk00RkM4ck5RdGpPQlF2S3pVTFl6Z1VMeXMxQzJNNEZDOHJOUXRqT0JRdkt6VUxZemdVTHlzMUMyTTRGQzhyTlF0aS9RZjVsYTFaYlhNeGRCcHNtQlF2S3pVTFlFckIrb2RveTl2bHpyUk5HLzZUVm0rTmYrcW5UbEltSFhsaXdjQkpzNXM5Z2k3bFpDRnNDMXM5T3Rvd2RkZ28ybFJMR3dQclp6UTRUdlpXTzJWZzk1WU9XZ2ZXem80N2FXTDNrZzVhQjliT2p1MHBQTjZPRU5ZTDFzNk54YXpjUG80UTFndld6bzRuck5nMmhoRFdDOVROQzdFdEt4ZDZmK2p3NlRwQVNCbUQ5akRBUThydS95YlVzWWV4R2xVcjNUR1RmUG91TjBVdklrUVNzbnhFR3dqWUpTMW56Sm15U2VveEtIT1JJQXRiUENBTmhXY0xZVFplRHVlR3lFbHEvL2NHZmtDTUpXRDhqRElTcENXTjN5RFlDVnAzWWVscUZIRW5BK2hsaElFeE5tRjVmdEkyQnJhZFZ5SkVFcko4UkJzSTFDZFB6aTdjaFJ4S3dma1lZQ05ja2pJR3RxVVhJa1FTc254RUd3allKQy9UVmlHcjJJckZ4V29RY1NjRDZLY21lVkxYSXh3YkNOZ2xqNzdtd01XSUQ3YlRvdGZNQk9aS0E5Vk9TRWliU0gycm5DQ1RrU0FMV1QwbEttRWlsb3g4TVNwZ05FNmJISElHRUhFbkEraWxKQ1JQcGJ3NjlkdTBoUnhLd2ZrcFN3a1J1S2M2SEViK0Y3WlJnWTRJVmNpUmhhVUV1NTAveGVFcVlTSDlnL2JVSU9aSUFTeWdpSGs4SkUra1ByTDhXSVVjU1lBbEZ4T01wWVNEcm93U2JHeHVqUmNpUkJGaEdFZkY0U2xpamdiNmdGQnVqVmNpUkJGaEdFZkg0SnArdzR5ZDkwQXZuc2N3UjZEaXRRbzRrd0ZLS2lNYzNtWVN4Sno3WWI1UFY4eWk5SU9SSUFpeW5pSGg4azBpWVZpaGhVbTJmTUlFdGplL1BzRFcxQ0RtU0FNc29JaDVQQ1ZNSk8wV0RyUnVza0NNSnNJUWk0dkdVc0NEUUkybVFJd2t3dlNMaThaU3dJQW4xdkJqa1NBSk1yWWg0ZkpOSUdOc3JWRHJqekg3UHJrRU1CbXdldFVLT0pNQzBpb2pITjRtRXFUblNJYmpGendGZ0FiWVdObGFOa0NNSk1LMGk0dkdVTU1SQVJ6NFkyRGcxUW80a3dKU0tpTWRUd2hRTVZHbllHRFZDamlUQWxJcUl4MVBDL09nUGYxZGgrUk55SkFHbVZFUThuaExtUjdZYnI0VFcxekhJa1FTWVVoSHhlRXFZSDQyWUUzSWtBYVpVUkR5ZUV1WkhTcGhVMnllTUhmeFZnaElXb2tZa3pCOWJOQjRRaGh4SmdDa1ZFWStuaENuWU5yNFhqTWJSZW9nS2NpUUJwbFJFUEo0U3BtQWdzREZxaEJ4SmdDa1ZFWStuaE1rTVZGa0MyRmcxUW80a3dKU0tpTWMzaVlTSllkZHdzTmNmMXArOStSWDB0NE1oUit0ckloTnlKQUdtVlVROHZza2xUQSt3OWRVS09aSUEweW9pSGs4SkN4SlduZGo2YW9VY1NZQ3BGUkdQcDRRRkFaMXhkbERDNkpvT25STW1sbDJEeUJJWTZDSlJ0WVN5a3lFWGNpUUJsbEZFUE42VkNWTXkyTDFCbG5DMm00L05wVlhJa1FSWVRoSHgrQ2FWTUgreXhHZzl4eFdNa0NNSjhId3BJaDVQQ1ROWnlKRUVlTDRVRVkrbmhKa3M1RWdDUEYrS2lNZFR3a3dXY2lRQjYyZEhLV0VBMXMrT2pzL0pIVTRKYXdUclowY3BZUURXejQ1dU8zeXFQU1dzRWF5ZkhYWFV4dW9sSDdRTXJKL2RiQms3NUxSak5sWlArYUJsWVAzc1pIaGszN093cVpRd3hzQjU4MmFGUno3TmhVZjF0WlV0NDRhZTZUMW56dnJaYXl1dmhFMmxoRGtPTENnM0MyRTdGeXdvTnd0aE94Y3NLRGNMWVRzWExDZzNDMkU3Rnl3b053dGhPeGNzS0RjTFlUc1hMQ2czQzJFN0Z5d29Od3RoTzVld2lDNW9ZRzRWd25ZdXp5MG91M2JIMXczM3pOdnRlK0hKMlcvbnRwOFk0d3Z6UG80RzZ3WWhiSGRSWE14ZDl2YWU2bHZpTmxWMEdiMTg2NnoyRTJMTFc4V09PQjBXMFExOUVwd2toT2h1a2pqdWtoVXJ1RXRMVGpUOE9lL1FxWFlUY3ZkRVBaUXhiZGZkYVZNNFQrUlQ2Qk5qVnlHa3Brdk93ZE4vaXM0OSttRHZoVi8xalYyN2UwYW45UFREemNZUFBvczlXWFlRTnB1UVUxbkpYZm5Ka1pOL2YvUGpxdWRiSjQ0N0ZlYnRmZ0Y3QXMwV05vOElSRkVSOS91bEI2cHZpTXF0YUxOaWIrM1FCek16OXJaSkdsZlRMT2JGSDdBbjFpaGhjNGhRMkZwNnVsbkdCeWVHM3BlUnR2M21oRkcxNGRFRGY4U2ViRDJFSlFrOVdkRzRseHE1N3RoTjcrMnJlMnJoTHQ5emoyVE4yTmtxYmxTOUhudXBzQVJoQm9VbGRkZXNPL2hONjZ3UHE1NStkUHFNamUyU1krcGJ4QXo3SGt1TWtqQVZZUVZyaXlxdmZDMnY3TnJCcTB2Kzl2N24zOXlUOFA2dTVJZW12Yll2UEtxdjRnNE9EQ1hzeHNlMXRWZS92ck95ODRMZFZmMWVXTFIrMTAzakIzM1grQy8xQWpRVGhMbHdISGR4WG1YRDlZcy9yV21mdExtaTM4aGxHOU9HdkxOK2U1L1o3Kzd2UEgzbTRkYUpZMCtHUncwNDIvWDFtVHRnQ0VFMFBUYVVYTGo4alozbDF5VnRydnFmc2F1UC9pOTdPZTY3NE10L3JEeFFlOXM3bjlVTzhPWjhsTlo3OXNLMUQyZG03YjhsMlZzYkh2bjBlZXlsV2NtNzB5WWZnYVVJd2wyd2czTUZwV2R1MkhTNC9zYlYrMnZhejgzM2RVblBPekV3Y2wxWnhEOG54Mzk0VjJyeW5qc25UVHpXTEdid1dZKzM5M2tqRHQ1MVRFOHZoYzBoQ1B1VFY4WmRzYml3N3ByTWJSVi8zWEtvb2VXYUE2ZWVuTCtyZW5CODdxY0pvNVp2ZnEzL3ZDVkxIc2pNM0gxendzc253N3hQV0g2MG13cU1zQlVyT083U0Q3OCswMmJxUjVYL0dwRnpKS05EeXZqUEd5MjVmVkp5WmF1RWw3N3pSUFgveVJQNTFEbTduQ29LSkJVWVlRaHJLeXV2WkNmQzV4VFcvUzFqeC9GbVk5Y2ViVDlqWi9YRGkvYlVqWG9sWjhkYlBXYk8vZWpPeVVsSFdzUU9PM05UOUF0bmI0eCs1bHk0TjdqM04wNlFDb3pRQkh1bCtiUzhQbnpOL3BPZEZoVlY5NXo1U2RVTHc1YXV6M3prdFJsRnJlSkhuOFArMkpxaVZHREVSVVdOcnpaNVphZXVYYjIvOGRYbWd4TWRCcjE3dU1lOVU1TGVtcE5mRlRsODZjWmx2ZDU4ZStkOVU2ZVd0RXVPK3FaNXpJcy9lQ0w3T0dMM3pBNVNnYmtNZG42R1hYRGFad1YzS2J0Q3FyaSsvbys3eStzOTdPNHRxdy9VZFo1WFVEMXcrSkxjR1oyblRjOXZPeUdxcW5YaUsxeXptTUZjZUZRLzlBK0VERTBxTUFleTYvanBQODB0ck8wUXYrbG85MUU1cFFQN0x5a1owVFo1OU00Qjg1ZXYrdWVrNU5LVzhTTlBOaC8vNG5jZWI1K2YzSEFadnBPbEFyT1lGY1hGbDJYbVYvd2hZblBWVmRtN2ZIOXBmS1Y1WUZhQmI4VFV2TXFZZnkxZXM2RFA3RVhyN3ArYWZxRGRoUEcxeldPR25xWGRNMmRKQldZeGJaTWpEb2RGOXZyUjQrMUJCd1pjS0JXWXhYZ2lldHYyODF0azZGS0JXUXdWbUx1bEFyTVlLakIzU3dWbU1WUmc3cFlLekdLb3dOd3RGWmpGVUlHNVd5b3dpNkVDYzdkVVlCWkRCZVp1cWNBc2hnck0zVktCV1F3Vm1Mc05wc0J1UzM0bTh2SHBzZG1QdnhZejA4NG1yRms3UEdkL2JRK3JYSFdndHVlbUwwODljS0N5b1VWR1h1WDFVemRYWGNVK1BnVlBveFFxTUhjYlRJRmg0OG5BZXJ4UG5MdDF3cmhqTTdaLzFoK2V5bCtoQW5PM1ZHRG1HaDdkLzhlVm4xZmREMDhwRlpqYnBRS3p3cTRYUmk5ZitSTC9wRktCdVZzcU1HdjBlSHVjTHl2anJxQUNjN2xVWU5hWi9lRm4zYWpBWEM0Vm1IWEd2cjlwRkJXWXk2VUNzODdFZFp1R1VJRzUzS1phWUc5dVg4YUZ5cGgzVXRHNTFVb0YxbWovTjd5S1l2MmRKaFdZZHFqQS9NZ0taUHJteFZ6aDEvdmg2UW9kTnBmVENvOEtURHROdXNEYXh2ZmloaTFJNWxaOXVvVTdmdElIVDRsNUhLd3M1YmNCMnpZN1NRV21IZGNYV01kSmc3aklaUm5jbHVKOHJ1SDdieUZzZThHMkRkdDJ1MGdGcGgzWEZoamJ0WE1TclBqWlB3TXNGcXVsQXRNT0Zaak5zR09SVVlGcGh3ck1odGp0ZlJrVm1IYW93QUxBRG42d2d5QXBhOTdrai81aHJ6RHM5L04zNU9oMm9NUnU3OG5zVUdBOXMwWnpTd3R5ZFpYTmlhMGxTQVhtUjYwRnhnNmpZL01GNDJPWkkwSStvR0tuUS9sMktERDJoNm8zZ2Y3NHFjRDhhR1dCQ1laeS9veHRQemFuRlZLQmFZY0tUSWFlQmNiVWl0N2JFWXBVWU5xaEFwT2g5eDgyZTIrbUJTb3dxVlJnU0tPVjJxWEE3TElkb1VnRnBoMHFNQmwyS1RBMkRwdlBDcW5BdEVNRkprUHZBbVBYRzJyQlRpZWNneWt3Mkh4TllHc0xVb0VoalZacWh3SmoxMEJxZ1oxM3crYXpTaW93N1ZDQnlkQ3J3Tmk1TUMyd2s5WFlmRlpLQmFZZEtqQVplaFNZMXJYWnlXazdmbnlGQ2t3N1ZHQXl0QllZS3d5MmE2Y1Y5bDRObTljT1VvRnBod3BNaHRvQ0V6Nm9xY2Ruek5oMWp0Z2FkcEVLVER0VVlCYWk1d0VWSTZVQzB3NFZtRTFneFdiWGUzVlFnV21IQ3N5R3NDT0o3Q2drRnBjVlVvRnBod3JNeHJEM2QzWW9OQ293N1ZDQk9RQ3IzNnRSZ1dtSENzd2hXSG1PakFwTU8xUmdNdlI4dFdDSDhyY1U1OFBNK21CRmtWR0JhWWNLVElhUnUyTmFyMDBVWThXbFZGUmcycUVDazJIRyt4MTJZamtVMkljNHNYbU5rZ3BNTzFSZ01zdzZvTUEramhJSzJKeEdTUVdtSFNvd0dXWWVzZE42eFQzRHpNdXJxTUMwUXdVbXc4d0NZN0wxdEdEbVo4YW93TFJEQlNiRDdBSnp3blpTZ1dtSENrd0dGZGh2cFFMVERoV1lETE1MVE9zOU82akFRb2NLTEFTZFVHQmF0NUhCeG1KekdpRVZtSGFvd0dTWVZXQmFiMGdxWU9aSFc2akF0RU1GSnNQb0F0UGphZzZ6ZDJPcHdMUkRCU2FEWFlyRXhySlhDR2FvMS82eEU4cHNQajF1TFNCZzlqMFRxY0MwUXdYbU1OZ3JJQmF2a1ZLQmFZY0t6RUZZZFVzQktqRHRVSUU1QUxiYmF1WDlFcW5BdEVNRlpuUFlaOHF3K015VUNrdzdyaTB3ZGlDQTdWS3hRbVBYN1drOW9Xc0ZkcmtYaHlBVm1IWmNXMkRCeW9xUlhhSE96ayt4dytCNkh2VlRBMXZQcmpjZ3BRTFREaFdZQnRtcmkvRHFLQlFrVXcyc2tGaGZOdFpPcjFMK3BBTFREaFVZR1ZBcU1PMVFnWkVCcFFMVERoVVlHZEJnQ2l4MjVYUk9xOWphZ2oyelJuTkxDM0oxbGMySnJTV1lsSlBOZlg2c0pDU2ZueHVMenExV0tyQW1ZREFGaG8wbnRVc0YxZ1NrQXJQTzhlK3RIMGtGNW5LcHdLd3pjOXV1SjZuQVhDNFZtRlYydlpCZlVmOUhLakNYU3dWbWpZTVhMVXJpbjFRcU1IZExCV2F1SG0rdjh5a2Jkb3lBcDVRS3pPMVNnWmxqeTlqQnB5TlhyUnRUWE14ZEJrL256MUNCdWR0Z0NtempsNmVidjdYYk4zSnVRWFhFdkU5cnhwRUs3cXFOV0xhdjd0bFI3eDk5Y014N1plMFdGRlQ5SXltUCt4MDhqVktvd054dE1BVkdHQUFWbUx1bEFyTVlLakIzU3dWbU1WUmc3cFlLekdLb3dOd3RGWmpGVUlHNVd5b3dpNkVDYzdkVVlCWkRCZVp1cWNBc0p1eVZ4ODVqaVNIZElSV1l4Y3pOOTNYcE1YUDJtazVUcGhUZE5UbWx1bDF5MU5ubU1VTi84a1QydVlBbGpIU1dWR0EyZ3VPNGkxY1VjNWV0K2JMMjZya0YxVGVrYnk4UEg3ZnVTTnRuRnBmY3ViREk5MmpHQjRkakJ5MVltZFA5OVRtZlBEUnQrb0c3VWlkVk5JOGQ4Z09XV05JZVVvRzVoTDFscDY3Tis2cWh4YnQ3YSsvUC9zVFhlOXBISjRZUG1MZHEvNzFUTStwYUo0dzc0NG5xOXlQMkIwQWFLeFZZRTZEeGxmR1N2TEt5SytibVYvd3hhY094djhWdFBocFdlTFNoMWJhdlQzZDlkNi92K2NUY1BhbmRzMmZ0NkpBU1c5azZmc3pwbHJFanZ3K1A3RWZ2RFhXUUNveFFwS3lNdTJKVGNmMk44d3RyT3FadFAvNzBneGxUbGp5ZVBXZnpQZW1UUzI5TmlhbHFrelN1cm1YYzhJYWJvZ2MxN3FaMm8vZU1pRlJnaENiWSswWDJ5c2plTTA3NXVQYnF6UHlLdithWDF0K1JzLyticm91S2F2cGs1QjBhUFdiVnRxbTlaeTE2LzZITWFVVzNKa1ZWdEJnL3RQRlZzUXY2aCtoV3FjQUlVMmw4bjNqOU8zdDk3Ykkrcm5wZzh2WmozZUkybHZkNU1DTjF6cENsNjJaM25qN2o0RzBURW1wYXhvLzg5c2JvNTg1NnZFODZmamVWQ295d0RTczQ3dExaUmR6dnN6YVVYSjZVVjNaRjcrVVZmK2k4YU45VjQ5ZVhYM2Z3K0EvTmNqNnZleVIrN2E2NFI3Tm1GdDZjK1BMSlpqR0RPVS9VMDF5WXR4djZ4MjBIcWNBSVY1Qlg3UHV2aFh2cVdpWnRydWcwY1ZORno5bUZQdS9JWlp2ZmZ6ejdyVjBkMHlkLzFUcHhURTJMMkNFTjRkRURURDJhU2dWR05EazJsSlJjWGxUVzBHTFpaelhkNXUrcUhwQzk4OFN3Wjk5ZU5lZStqTFE5TGVLR24vRjRlNThQOC9ab0xKRFFYeG52VGtzOUFzc1NCQ0hBZGxkekRwNyswNnlQZmVHeGE0KzJ6L3p3MkFQTFA2dDdidUttQXluOTMzcDNaY2NwcWZ2YkpvNnJhaFgzMHFtYm9nZDk1NG5zZ3haWSs1UVlIMHhKRUlRVzJOSFVmVlVYcmlvOGVpcHN6WUc2aDJkOVV2WENoRTNsRTcxcmpzeWNVMWpkSDdvUnBuUFJSZjhCTCtMK25tcmt6b2NBQUFBQVNVVk9SSzVDWUlJPScsXG4gICAgICAgICAgICAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFWQUFBQUROQ0FJQUFBQmhCYituQUFBcHdVbEVRVlI0QWV5YjNXNkNRQkNGK3l5VlJhQlZ2SmNmVUtIdi93WTdQRWs3VEloT3RpUTBZdGExSi9rdTJodXYvRExuN0l4djl2Z2VNRVZrUzBQMWx0cVV6aDkwMlEzOWZ2aktSdzdNOUxmNnQ4K0hia2VYVHpwbjFDWlViMjFsYkJuWllpTWZDOENyRXFid3hZYjlyQXcxV3pwbFArcUs1MXJ5T1E3Sy8zN1A1cDh5YWhLcVl2NVltQThnL0ZQWlRsVk1iU3FlSzN1WDQvcmY1OVR0T0NhMHFhME1uQWNRM25ONkY4L1p5VzZNN3IySzduZWcwcjdNZkRHZjZoZ0RIMEI0RDlGZHFhNXIrWHFvcUM4OW4wN1M4MlAwZkFEaEg2MTZ6Tlg2bkkyZU8vVjdQWmIzZkNzOXY0RDVBTUt2UlJuSmF4eDdyaU8zSDl5ZTN5VG8rUURDM3puU0RkWHN1WTd1dVQvYjUzdCtKejAvUTg4SEVQN1AwWjBrdXFzRm04L0J2anpxeThDWHREK2FiNUQyQVlUL3pmTWlZdFdubXhueGZOMlc3cUhudHlrMU4yYzhNQjlBZU5hZ010UW03SG0zOUdBbUZQLzFDeDk2L3I4RndoZXlZSnVpZStjczBnTkg5L3c5NmEwZXovd2o1SDl0SUh5eHVUbDNUeDYwU0EraTUwdmFweXBHMm45RklMeDhwNi9uN3VLNTM0cnVYMzR4WDM2dU16M3ZoVzQrZ1BEVGE1eDZkUWNUNGZkOEFPRmx3YVorcWVxMGRIQ2Q5czVXVDlJK3ZwUlBEWVIzenQwSGRRWUx6MmVZNi9rMXRucFBDSVJYNSs1cXdRYlZWK3Y1cFlIMm5vSHdvdnAxd2Niei9KdTk4LzV5NHJyaStCK1RrL3lRYzNKQzdJQnRpSk5BNG9RQ3V6WmdVOENBNmIzWTlFN29aeW1tczJBTW1BNHVnQTBjd1BSZU1NVVlGakNGbFhhbGtWWmFGYTFHblh6a1o0WmhORHNJSVZHOGozUFBIdW5wNmIwM3czeHYrZDc3bnN5ZTQrYXYyWXJlZFBaOXY3cDBUdmpZZnZYMFVmK0dVbVYwbjRvUC9tbHIyYUM4NlY4azFDMUVxOTdsRHVNNnlUai9CWWdFUE0rY3hVNVZQZFR0N3paMFR4b1NQcm92WnIrWGlzVWVpSC9KUk1LdFJLNWZDWHk5WGhuY0dYVkFUNG50ck9OOHNub3dmRExPbDFKb3dHdXV1NkhjM2VDNk42MEh6aXU3Tk1la3gyeDNVNnI2SUpWOFlQb3ZrVWpXaEtLM3JsZXZtRXYvOG1aUFplMWxuQzhQNFpOU0VNQnJ4THQybnBUeEtSUUNZaDI5M3FzcUdSZmF0eVB1Y3FiVThJTnMvcVZTOUt3NXNNdmU1bTg1Z1VIRythS0FUeWJ6bjFrazREV2M2MWozeHdSN1h0NHM3Ym9ySTNyNDFpeU8zcnhtanVwazhrRWlqbGVmU3NSTlB5ZTh0N2Q1KzZtZWZxWkdudGlOZUtHaXc3K2Rnem81dWhmWld0Ui8xTmp4SFdmL2RvNCtiV2hrSEZ2ejE4Vm9CUlRHaDlGbzhWY2h2SDdpak9oUVc0dlhSWDllOERiejV0UElpL3NQVS9yM0dxY2RmdmxBUzNrYXdCdDJxZ0wxV2hMcFlLYTZ0RVE5Y3pTdU9ESkJub3JIVXhHVkFMN204SjdxbGZNOWN5ZEZmeTU3RnNEelpQUG8wOVBSbzFnWjB0blp0eTNrSHkyMUljZitYaVB2MHRtUnF6L0VLKzZyWjQ4NytyYWxrZjZzbWNaWStaM1kzVnNvQW9ZS2JQbGNHZkpoNFREUHBNemlXN1dnNXRBZTdnYmkzN3pLMGFldFJTREQ0dDFUUHdsK3QxWDB4d25DZTBJeGFSMGN2VnY3TjZ6d3IxLytpeXp6cjBPVzh0bzdiNUt0K1d0V2NiNFVDWGhkdWZzZnpNcmR6WkVRcnl6WDJEaU5reE00VjA4ZDlpNmN6a09KcjI1cjlRYTJDRXVyWGptWE0rREJSdVZIclhqMEV6NXZNaFJJaGtQSlVEQVo4S21uRDRQOFRPUmdRcjFMWjZXaVVaaUM4UEh2RVdWb0d0SmdPeG11U2RZRXd5Y094SjBWenY3dG1SMUNnYmNWN1pzVXlMWXJJM3N5S2JPazNaeFlsRnVFczhNYVBITW5tbW9aRkJucmdRSGhLL1JINkIvNThZTDkvWDlvZlR3bDQva1V4Y285MTB1azdFZDd1OGFhdDI4UzUwdVJnQWZxRU84YzNrSWVLUHR6NDVLKzZzZG9PRytWZDlFTVpWaVh5czVON1czL2JtdFovN0dIdUdQdWdDZHFJR1NBM2djRHNYcy9xK2RQcVdlTzhUZDI1eWJLSlZHbGtPMnp0MzZNQlFBYjBkczNrdjVxOTdUaERNNTY4TjVSUUlBODdyQXJvM3JSaUE2eUZ6ZjBMcHV0WGpyalhUS1RUR0doQUQrOHUzcjZpSGZCVkdnT0dFcGxXTmZnanMwQUh0ZkQwYnVOQWZPVm5mOWJjM2d2VjhwWDNOTkhWblpyZ2FaelRSck12ZFdySkFBUDJtdSsvNDUyUnY1VkZrMTNUeDF1SzM3VEVPZGo4Q1hzSDRrRXZINm5hdllDd3ZXNGpkNHVNOXFyZkFEZVZ2eFc0TXN2ZUxpVFFYL2dxM1ZnQnM4V0E4NWZmSHYvNXMrdytkaEFYdWd6ZkhSamVlb1BwL1ZXRVRCZzhOV0xaeGhUN3pzd1ZPSFNCQ0p6WVFqYTdhMGJjZFdwYU1TM2RvbEdMaUI0UThIdG0zQUJRcnUvMUgvRndGbndFWGtRekg3VnJORzBHOFNRekRmVzhNbDh2Z1M4TGtyUEhmQ3h1emRwekMvZ2VYdzlDNmFDZG1pQ3F0bGo0YTRNSFVDTFo4NkVoTXVKcWErYU1ZcG9XYlNUNUU5VWU0Z3NnSkRXbVJIb1JoUWdHdk1odVlmOWFDajBWSERuRnIxbkFiK1ljS1hyRkhBRUxMNUwvVUp3NStaVVBNWmxjb3V5emVlTE1oNDk4bVdjWDBjQnJ6MjRMeG5nNGE2dzBtVHYvRnRXNlN5aEVmUCtUU3ZwRTcxVlZ0R3VzV2lrdkkvbEVicERIK2d0UElDbk1YdkFzekRHcnozV2FFVGtraVBnTjY1SVJTTDgxY1pucWI3UEYyTDJpVitzUEE3aENIeXpBVWFnc2x2TExLZXovR2t0R2VmWE9jRC8rZVVFUEV3MXpCd1VIZDY3eGVBWVJvSnpmSHRsYUJkbGRHOTBSUFRHVCtDQkZ2WFNXZDZtNWNMcDJMMWI2ZENBeG90bkVPL0NhVmhYL0FMNE1OZUVRWHJPekRWcENBUWhnOFNkOW5pbERaTUx3U1kreGN0dzl2dUFLQ05TZGdVNklGNVJycDQ3NFJvL1VJUUpXUXFCQm80R0ZJUHl5VWNhdG5GUDFDdm5XYk5yM0FDaDdPakdZakoxQ2xRbzlRNG9yOG9QbTdFZWpIek8rWHpNdnU3SWJRbjdGeW9TOEJoMkhGZXlXVGl4MXF3ZVVJR1RoNEZUaHZjZzZ3WmpSeVNNc29oY3U4VGJ5RThYNlVDT0VNRFR5R3Nhdll0bjJJcmV3S2l5QnFndnphUUhkMjBqMUNjaVFFMkVqK3hqZWJIN3Q5WHpKMFVIMTlqKzBJZDBpRnk5aUZLQVBreDQzS1FNQ0tvdGFiOTZhQVFzTS9jQmZjRVUrUE9CYld1NUxuMWdENU9IOWlHRDZKbzRpRENlcVZtQWI5MHk1ZU51K25DbW90TTdhQms2aytwai9XZ3UxOFRCMEJZNTc4dzN4dmx2eXpqL3VZc0VQUEFBNnZEVlBOQmFjRzRxMkVENGFyejY0STVON01uQjB5WVRocWxrdXc0V0VuVkFpNjFWQTgrOHlWaEZHbW5CZnVKTEl3Q0dMNUpFRkxFeEVFTEZ3UDlYelJ3dEpzVitrdm1ETU9jMUZUdG9FQVloTDhDYUJaSmh6akQxYUFFS0V5enk2cUZkMjBKN3ZrWkJrR2lJSzVXKzFZc2V5eXd3eThDT1pPL0NKdy94VWRMdm93OHVCc05TdHNTdDlzeVpTSjlIZ0Q5N0ROSk9DUGs1aERwbGxBNnJ5cjJHei9qVFdvTGhrM0grY3hFSmVBSnk0QUVHOExldDk5aUFXM2JqOE5DSDluNmpKKzNDSncvcXJDNmszUml3U3FNV3d4c0FUMXFlYnlXREFRd3MxTDJKeDdGdU9iWEE0V1A3OUE0OHRoZHFIY1ZVdlhLZW9iOCtUT0QrVU9wRE55NDU0Zk9FVHh6VUt3Z2NlMlZrTHdiSHp5ZUk4RzhzNVZNOGRyUUFhb0lWNG1VUXVXZ3V2V3RzUDN5TnRJenJUMUVUV2d5UGhzRURXMWJucDI3ZnNGR3Y4SnZ6cFVqQU44RnhCZkR1eVVPQW56WGd5ZGdCZUxBaEhsd2o0SFVzUFNiVUZQRG9GTS84S2RUM2gvYnR4QVV3VFJBU0MwQUJ1S2NNSTdHdkY5TDRZbVNMSWwrSWR3Qk1QUzhvRGUzK2lpeGo5TTROU0FmczlrUEE5d1R3WEFYVXZkN1ZSMW1vNTQ0VEFxQldSTUJ2Q05wNVc5SGhYOTRsc3hpVHFnUmxUTjk4MXUxRDd6K0huOWFTSWdFUHdJaGdzVnFlVC8vM1JKZWU0bFBpYzJDZk0rQnR4UTJwaDZGWURkaWJ6a0lkTG1hVzlhZ1hUa0c1YVJJK2RZZ0VBYlBEN1dWNTZ3alhvUnNnQXRoVGlGNFRnT2VrQUFBZmQ5aGc4Z3g0ZGswWUNKalZ5K2NvRnFyOUpqU2dZZ2M3SDlpMmhyZ21iNWpYNHZ5MHpmK1Ric2RPdnNFdlJaSjJPT284d1R6SHRxSzNyUEVEWnc1YUtEWExHZkJFMURVSGQ4UHRWODBhWXpvTERqL09OcFlXejl3Z0ZCMFJiNHVBSWx2TVk3ZXZuTWVla3hFUWUyQVlQNm5Xc0FlSmlrQkRaNEoycUVHaWRFZVBJb3N4cTVlWG9JL1FrdWpLZ203UjFiSjZJUDloblAvTTRKY2lBUTlUaFV0UDhieDF3cGw2WHZia0pqd3VJdDZjQVErdlJxNExDNjlsNEF3Q0RZNUJwZ1NJV1J6ZFcyVklFVld4VDdXamhpMDlFSVJRaVlLaElJN2dLbEFmSU45ZzRSbWZ1NTB1eU9uYXdncndLK1p4Z2ZDWE9WUVd2Zmc0WDRvRVBPMmtxZWpEOWpJUVVodHl5Ry9oVWNQd0VVN25ESGppQWdwZGVjMW9wc1UydUFENEVWaGFhdU9mcXJUV3RCM3RFTGwrR2Y4RitnMExMOGcvMW9hSlpwMzZiL0hhUFgwRVdpOThmTDlGNW85QmNERVlFTUx2UlozTWdjMnZLNjYrQkR6WnBrS1Uxbm9YejhUcVlyM2hvakhDbWVtdTZ0SzVnQUd5Q2p2UFE1OHo0SmxMR2RXYnVBQXpDMzlteUFzd0RoMG9hS1VTVHIwb1N2U042Z0RFbXVZYWxFR2REQmZJVzZvREdRb05vaDMrUWVBTkhVaXN6cjRnUjg5M3RUdEEwUkh4QXVVRHJGOExZZGgxbzUrT0t5SVNTWGpkYk1qaDJndUpjK3M0WCtmdHl4MDd2MW5BSjVNVXVwRm56anZneGFNTWJTNnlXZFRoa0t4aU54NTQ0eSt1TlJXbXdBYm0zRk15UVZqRm5BRXYwbDNCYjdkd09leVdkNDBmQUZaeHM1bUx1aGNxOXNVdWRQUWFIYUQzSEQyTEFSN2p3NUN6blQ2d2RYVkZwLzlrcnA5Z2hFQ0FtNk9NNmNNZWVBUk9qcmRFNzJUdjJUbW5yNkxGUTZIMGdFd0I2UW1VRHZsL052YWhGSmlSbTZCMW84d0cvRU11Y2pkWWtuTkFCNnB4aVgyNE90OFhTMStpbzdnMDVNczQvemNBZUdBbXpKMXZ6UkpsVUdjeVo0VUF2Q0RoZWFBeDhtSVRidVRhWmJ6M2FObFZIbkd3Q21IRzRSRFUxZWdmUGc2Y29QQUdDdDBJK0doVXYzbUdrYWx5WVJEQjlpRUV5Unk4U1F1V2x1bzZhdWxJY1RPVVZtbEh5Z0N3Z1VDUVQ4L1EzdTJRNTZ5RVlqNlFiMXBGUzFETnl0T2x2bFV1UEJFRzU3NUI5YnZUZEoyeHZnQUFoNCtrdDhkU1VVTi9PRUl5ODR5ZzJYeUVha0xhR1JPbEZsZWNPRGppUGxSL05sODRRYmxMSWVQOFY3dDZWd0tlWngxYW1LZGNNNjBGQWp3Q2JySG4vdldsSk1ESVpvRUhZSUFaSkxtRng1dXhBQWkyMXV4eU4yeTVJVnFtaEo1R2NLN0YvMmlCNkkycjdzbER0VzVzT3lkOEVMVzYyRXpLNlVtQWt6L1huQUpNTkhXdm9CSGNvaGRnR2RCSEdIelQ2aURXeHJXVGN1TmVVU1pBRVQ0cWhsUjhSZnRhN3h0M2czSWFDQVVLQnpuR1EvbTRxd0hHK0Izd0NBUTd6TXYvQWdPNnA0M0FsY0JaZUlsUDRCUlp2VC9LT1A5VkJUd2VMNVVrbmsrbkJMZHZ4TFVHU0RpWldDMUlac3dSZFNaa21JbHNBWlZBRWZ0WWNnYTg1dDVqZ2ZHSzJReUhKYVRRdFhZbXJ6NExvR1FGVU9rVCt3UUNMRnUvenh3c01TWVFNaEJnOUtUb25ZbWczK21UaVVsSWUyZS85REtnMzVndW13UDIrQllUWmJuQkRoM0h2SHpMWWtEbUZXZDd2Q0tuN2dwdlg4YjVoWlQwMFZXSWlLSHlDbmdCREdyQ0NHVTVXQVlmRlg4YjI0c0Zwam9WajVjUUd0dElKVHoyQ2hNWEtidHFEdmdUQit4dGpZQ1hVcGQrUWx0azlXU2MvNHcvOS9aNzdUUktmWldFVUtrV2dNOWRzSWZVazFONUJ0R2RlUkE5R2FQTXhwajl2bS90VWxGSktxV09ucmNQOHVWUGErVW92M3YwQzY1TnRGOXFyb2ZvVHozUVlKOW53T01oWS9OeFJJbHlDVm5oOHlDVFRLMDZiQk8wYzFYSmVEYUU0Q0JJQU5SNTVCdC9Xc3Y2TkI0cDJnSFR0ZjU4cTVFOVFhWCt1aHRDQUQ3L1FvUVBUeGJZdW9Zc0YwUTM1RGJIUmRUcy81YmFNdEptb2toR2loVFRPQis3SkRHZnhXOUFhYWRSR3RCdWZLdG5Ud29GZU8wQU5sZ3g4dGljRWcvWG5hNHorVDk3ZDVqYUlCREVVZnd3S1VtUTFuZ0FJVzFJUXU5L2c5Nmt1dzd5ajZOSThaTXpmZkJPMFByRHpUcTYvbG1VSXVSYjVicXN5M3VFeS9uNElYa2Q2K2hoLzIzMzVDTHdSUHNJOEtJK1A2bFplcmUwVi9BRWVPN3FaVHREeDdlNnIwc0RuZ0NmdzdtVzd2Y1BvKzZXN29BbndJZDNQaXpkVDVXNjdjYk5mb0Vyd0JQZzQyclhBN1pudXlJYzhBVDR5SGYxNnZ5c3BidjdPd0NlQUI5LzExMUxkMzlTc3dWNEFueVNHVmpOekt3L1NBYzhBVDV1TnU0dTU4dklBVStBaisvY0w5MFY0Q2w0Z1BkTGR6L3VEbmdLSGVDMUcyZmo3cmJ4UGpyM0Q5SUJUN0VEdk1iZHpmbUdyVGpBRStERE9QZmo3Z3J3RkRYQXk3a3QzZjNNVEdjQm51SUhlTDJVUG82N3J6c0hQTVVNOEhxRFRjN255QUZQc1FOOGRXNUw5K2JsVFZVRmVJb2U0TWMzVmYzTVRHY0JQa1VFZUwyVWZsNzhGR3owQUUrQTE4YTdmVTlxTWdNYjN6bmdDZkJ5N3BidXNYNmxBNTRBdjMzY1BkSFNIZkFFZUIzTTVCK3c1YUlPZUFKOGJ3ZTI2TFdXYkwvU0FVK0F0NE9aOUhWMy96MnBTL1FBVDRBL2FOejlVK1B1Nlp3RG5nQ3Y0NU1iYzI3SW9RNzRKQUhlTzlldWU1b0FUNEQzYjZxS2VxSU5PY0FUNEhzMzdxNHhXSkFEUGsrQTExMzlhL2w3VWdUNEZGY0Q0UFhkdUVZenNHeThBOTd2eWo1TGJjQVphY0MvRGM2MWRQZG5zRUVkOEJQaGo3WmNIL1VxdVRYbHRtREx2d2hSVi85cjErUHJKeUo1a0E3NGJwcHBiMzhlRlhtOUlWeFA1WXFwTjRwK0dKKyt2N056RytZL2EvOUVjODZQc244SjNnczMzaEorYStyZDRIbzA1TFgrVU5MNTJ6c0hEL0x2My9iTzdsZXU2eXJnL1dNU0VvSWEyU0V0TDloSktMVnc0cW9QZkNDK0d5cjFBUWtoRVNBVkQwZ1VhRXJWQnhCS0laRVFhcUdpUWtBRnJSQlNXaHBVbGJRZ3BlR0RKa0FoOXZWSDZ0Wko3S1RKdGFFTi9KeU5UL2Y5emZXZTVUTm43cHc5WFVkYjFzeDRuelBuenRtL3ZUN1cybXNmMmpsK2VPZmU3eng5MzUwN3grL2drd096MHMvOXhQRlhQdm1KL3psNzZuK3ZIVi8veXZuZEp6NmR3RzhNY2hFT3ZVV01Bem1TSEo0TDU0Vnd0d1IrMXB6VERrTjRRZjMwaVRlZGZ0dWJlYzJIQjNNUG9QN2E3aTZRNjREL0JINkRCcmtoYnhBK2YrQ1Q4MHFrMzdGVE9EL3habENuWFFPK1NQajF0c3RQLzZOQlQrQWpyVmFIR2dlYUVqMVJsaTY4OTVmMkZlT1M1MUFxWGIxQitBRURuNDBIR256b2NQWHlYL3d4bW5PbHZkOHh5SE8xQXZ3THYvdWI5VVY0dXc3WnpwWFhCWHdDcitNYmx5NHlDS3JnV2ZHckk4WnZlMTJNMzFKQlhobmt0RTZBVCtCMXZIWjVkL2VKeDgrOTQ4UnBpZlJOQU0vc0kwMGVPWFQrZ2Z2TC8xNzZ5Q05wdzA4RHZPZlJNNmZPL3VoYkVlTVJYYjFMNEJONENmeXZuai8vNEx0RStNRURML0dPN0pudTRnbDhld1NjZis3TUQ5N1ZJTHg3NEJONEszZVh6cjN6N1pzRlhqNzU4WmRLNEhtOWFKRGpXci93YXc5Yy9QQUhMLy9yRjE3YmZYV1JlY2hNNFB0cTBvZjMrdDRQQSsyNSs5LzI0cU1mdVB6VTMwTzROYnR6T3hzQXZuM3pDWHpjNDJyZzYvRDRQWXFjM1hUbUI0NWUrZExUR2dHdmZ1YXh6b0ZQNEIxZ0c2eDA1UG1WWi81WlQ1eTVZQWJBaHk2ZXdEdGZmUS93WjA0V2c3enRXci84TDAvV1B6cGl2MmZnRS9qSHpmbENRNnJYcHlENU53VTh6cmtFZm1TUXZPU3JBL2szZ1QvOWJCREZiMXg4c2Y3ZEwvN0I3eVR3L2JSRGU0RC8zTjhDYXJzOS8vNWZ0bGEvSWVCOThRUStFaDZ2ODlXQmZBVHdMLzNwaC9ZTW1uLzRiQUxmUlN1QjlBRHdia1RtNnJNUytNMEN2OGgyYWNPeXN5cVY5Y2pOZGI3Nk9PQ2YrNWtmcHI5T1RPQzdTSGRIZFI4QlBGSTlnZDh3OENKYytlclhJdVFGOHYwVFlFWURUd3NENzVuaWEzLzlNVHgvdVBkMUJWd0RtQWFkQW85dGlmY0xoMGlkRThMYjNTYy9SMjdpNnFrbVhJZDhwM0padm9MZ2M1VHovYnh4S3dIZnYwclBFeWtQcS95a3c2KzY4dlB5dDVDbk9Jd0h2b3RQcHBEd29GNFMzZXFWWjRqeC9mRGVJUERQLzlhdkR0K2xReTVBM1A0TjRKVjNBV2tSWU9wVFNNYTZvVlR0Sy8vMWIyM1VTK2Qyc21ma1lkTnRNZURFM1E2REpoNk9ra2dYbGhIZ0c2Zjg5N1AvY1FEQXgxTkY0bm0xVEpTQUY4a2w1V2RmSldyQUE5STFWLzhwM2xBSWQ1YWJKZmtzZ01mSXY5R1VIblNCZllHSG5IaWkxY0JNZlFxeitOSlQ2bUhCRkxQWXdUUzJEb3ZsT1BDYzRndTFnUjhDYkUydis0cE91NWMvL2lmZEFjK2tmNk01WnN6am5EVUNlQXVBcVlBL3VXQ1F1ODBBK0RQZmYwVGFlL0JBMUgvMVYzN1d3SnRHaTkrR3VJNm5aeUcwQTBxRWFBd2RraHR0NFBsZXBva0k4STFBK2lUQTE2RjR2SGNFNS9zQ0hpSGhYeks4Zktnd0h3ZGUwbVZLNElYV1FRS1BmaDdNdlZta25aQWVaand3RDMxNGpkdC8zNTVuZnVqdVJlQVIwYlhrWFBwTCtXR2I0VmEyTnBOTFEydlFVR01LR0s3TUN5bVE1VzRaUUVIZ2gzbUt6NGVaZ3RPNUxLMWVxVnBRaDNOcDc1TUFqenl2KzcveU4zL0ZoeDBCcjNuVEQ2dnlEdkNiNjNrRkpJcUJINjdBNDJPaXFWMDh2TzBWZUJ4c2lzTUhOWGxRYjBmN2xMMUxQdThpOElLdDhUdktCQWdhQWp4ajYvL3RCVnROdFYvNkJXOGpJNXR1NnQ4VTZRSnZNdURCdSs2TXFGZUgrVHZ0a05LYWN4dG5TWnhFUm9zZWJ2dVVMb0ZISUVzT1I3cHg4RW5rNG1MK2hZY2ZFdkN4aEdvL1B4NThtenBwQkkwaEpZYmp4bmxUdjNBM2k1ZVdOMjVpNEVtZUJYVWwwb3YySG9DM2l4ZnhLdzJyYmF4Skwyc0RyOW0vWCtCdGswTjRSR2dyNjE3ZEdvMmVlMmJOTHo0bDRDV0U0U1RpZnVPVWdXUmV0RFdDUmpkd0RVNDNPcVV4SUFTOHhwbFVkMW5wSTlxSVJYS1hQdnI3bk5nZDhQeUdjV1ZRQXl3NHB6ZHNpdTZCUjNXWCtNWHdYa2RtanVZVXhyMkE1d0dvdzFMU09LVVExWDcyMENnQjJ4RHY3YmsvTmtNSmVDbi9SWFUvTE01WGJEZTZEQjZCajZPdU8rQTFTRHcxeCtmb3BxTzNvZjkzQ1R3aUhSY2RicmtDb1J6cGdOMlUwamJ5UjZYdTR0eCtWTURyZVdEVkw2V1hVM2diRWJQdGh3ZmtEUXMvcUZ0R2dML3cwSU5EZ0UxY0hSandVdW5Qdi90ZC9RQnZLZTJwT1I3Yzhla0dYaXBoQjhDUERwdjVndGJuUnk2bms0SUFWd0plemhnNnRCR2ljNjJ1Tjd5dmpXZXNLMFJVUkkzVXRoa3Y0Q1hTTndpOHZQUzlBQTkramNjZHQrVGJRa1g2L0hZQ3oxbEkvcUJPRHZ5Tm5vRXJsTi9Sd0tPaHRZTm40Q3A1cmhoK2V6eVZPYUk5Q0ZZYnFmYTY3NjFOc0RNUjNuR25uWk50c051UjZtWFpqRVQ5WElHUCswM2NSanRyMUdmYmdNZG9SOTllZWxsSDZWZTdNZGd6OEJhMmxwbUNrODdTMHpSYzVOTDN3OU1zTS83UVZ4K3FBMnhBcm56MVRRRHZodlZPSDkwL2M4SE1nWi9rTnFSbWJqUHdnaHdwcld5WnNFSnUvL3k0VUwrQWw3aVd2UzIyNmFZWXZoNmh6QVRORWJybVpNQVgxS3RBT3BDcnlNUkdnWGY2amZ6Mk13ZGV1bGpjK05JQVc2cXV0OVgrdnIzMDQvTHdlRHZpSXVnRmJlQ0ZINjhYVFRpQkxUMGZ2RzBDMkVab205a3JBUDk3NzcrVzdrN3ppalJ6T0FQZ2FheVpjVWI5aklHWExqWlJ4Y2VObGR4SzRDMnV3ZHNqUS9PdXhiamRjblRUOUxFKzRGOTg1QVAyeHMwZWVLejZwWmI4VGdLZndFZHMvblphTGpBYmVNdGtxMjFJOWVwY0R3VVpBanJGYzBSOEJMZ2QycnNvWFY3M3pvQ25xZEJWRjhDM3N4dmphYm4yOHlmdzB6dnQ3S1Z2eEZydGlhM1hNRFM4ZmNQL3ltQmJYVzRVMUlzM3pwd244QjA2N1hqMENYd0llTnh2SzRibG9GckFLNkZGSXBmcFBKZzhBK1E2cFRHWEMzaFpCSUdWcWhzQVBvRnZESU1WRTZJVGVGKzJ2YnFtbmJIdjN4cVFBay9GczBCaHN1bnQ0d3B5NnJZclhpeDZaWjN1N3BVdENmeG1FbStDaXhUZG9vc3lFM2hiNE9QOWRwajkrcTBGdkF3dEVjZ25iVm05aUxlbWdPYXM3M1QzMEFxMi9vRW45cTdxOUxNRlhnTWp2dXFoc1dqQ0hSSjRyNDFkZGZHTUltU0hJZ3VZZWEwRXUwYVZ1M3BTNEluRzZ1RXdqTDY4cC96TE8rNHo1OXNKdkF2WHd2L01nZWZwcjc1NHhncENBaCtzZFlQUUhyYzg5bXVQZlZ6QU41eHc0SXIwYnN0cVRmK2d6aFhpNjJGZStkUW5MT2hzcFc4aDhLVFE5NVY0bzJtOVBPalJ5Mk9IRXhQNDFscGFMYllaVVFBRFVYLzJ4NDRaK0dVcjJKYkthcm5meXV2Mk14dFdxaUxTRWV4T1FRbHJ4WkRURi9DazFqS3AwVk4vOHV5QnQvWVhxRkZuaTY5aEdDYndqVFZ6VHJPTnI3ZS8rS0dIWGVLcWFXNFZFeUNpd3RWU3ZTNzV2c2o1b3VOOU1iY2NKTm9yeGxsU0RzOENiRzdBaS9PeWdheG1ONVdwbmpudzRMMVlWcEN6MnBKQS9hMG5KdkR4OGppTklwYmxUclNEbGFyV0JxZGtxMkZOdmNDbW1sQy9qamVPc2hDTFpXSEFBMGpFREVSVm5XY0MvUGlEbStUdjZnVjR6ZXp0SXBiWS9Kb2RuSUtWd01kVjlOQ2g2TDNyMGtldHRTSzBnM2Fhb3JXVjEvMXE4UW5IMGl1WUxmcWFSKy9BeXpQZkFmQmpDNG8zb3ZjSmZGVE94eGJoV3ZNUEErK2tWL25lNHVQZzNFL2RHdytrdzd6bGZLQTRIQm5wUFFMUHZSWGxwU1BnSmVjRGU4NEVOUDhFUGg1YVI1bVBDUFpTTmlzTXZHSXcxc1Rpb1Jmb0hSRmdnMHhFZlFSMWVrb1puam53M0RPM2hKZFJsYTM2QWQ1cUlQWTVKQzlGblc3eTdjMEYrTzRhYmprc2MyYVdvdWRydlQyb0g4aG1razZETFp5M1VXK0xlcnpXckI2VHdPY3R3SUN1cGZyMk5vQy9haEFkbSsrMm4yVW5ENXcxVWdsNXk0ZjhsMUVmM1JMNEdXd1gzVWgzenpacjRMTWw4Q000TitxSmFBS2Z3RzhoOEkxMDk3NWJBcC9BSi9ET21VblZ2WC9nc3lYd1lkVzlmOVFUK0d3SnZEbXZWNnJ1ZE0xNUFwOHRnWTg2M3RORVQrQzNxU1h3MXQ1VGRVL2d0N29sOEZXNis3MTNKdW9KL0ZhMkJKNldnZlFFZm50YkFuK3lCaDdVay9NRWZwdGJTdmk3YnRrNWRudEpkMC9VRS9nRWZrc0YrM2ZmZFBMb3phZnV2Z1h4anEyZUpub0NuKzBOVzRuNlMzLzI0U3YvK2N5d2xvNDF6RmVlL2ZmMklHT2ROaXZWV01zNVZKSmxqWnBXZEdhYkYvRFpFdmpuZi9zOTExc3dmNzNoQmRXd3ZlOHB6QUoxNmNneUhkRFpLMVd6SmZBSmZGMmdpbVhxTEZaWHlSb2tNSjlRcklLeUZoUzBXZWxianR5RW9mN1N4LzdJeUM0REhuUlZlVUxBRDVOQ3U3N3lWamV2MkdmSzA0cDlLbEx5WDNTWUN2Z0w3MzN3MWIvN05Ndkw2MUlUYUdwOFFoa2lGUnJNTmd2Z1lSak9KVzhiQnpOQzJWc21ycnJEK1ZVUFBGYjY5OXgyNGRjZmFGOS8zeEU4NlBCdDRGVmhWc0ovNnh2VElwd3ZmWUpNbmVOcTdMZ3k3OW45RlM1WGZZNlhrUWtmVENnSi9KZ0c2dVBLVGlMektWblQ1cnlnZnVvcTZyZWVlc3QzN0x6MWRwV2pLd05pa0FNWEhucnd5alAvdEc5aEtVa3E5UFpCcEpjaU13azhvanYrK01yUE9GclVVOTl5TlRKZGt0UkhBaitEYXBNK21Da29Zblg5b1ByTjF6aC80NUE4Qjl1TlBYMkl2Uk9OV3h4ZVNLVGdNSVYvamVudFI5M1Q0bnFaZHpIUDhXUzZjSjJQQkg1YWMxMmJRNVdERDluZ0hZMmQ2VUNWNUxIaDk5VUYrQzl4WGxSM1lteWdUbHc5c0FHemdMZnEyTjdrckxSMDJ0WEFvOWdqOEpuKzZwK1JBcFd5akVyUFViUzc2bnRSMDFUMWZhUEFKL0RlTWNJcU9wd3ZQWkhwd05nWDVvL2NmT3F1cTZwN1FSM082d3habFpmV014UHdiY0dWdnZFMjhBQmNPSTlyNC9HZ3Bod0V3QSt1RFM5OUtTQVpCMzR0R0Nmd2lQSDJubER0aHVtdUt6QUZYSGpQenpjNEYvRGFIQ29LdkhjcHorWWRJQkhqSTdobENoaXhnVFFPLzNQM24xZzlMTWVra01CUERyejNjcGQ4SHFFamlIbTJWWTc4R2FoNWNlQTlPaFA0NmVKMjJuWWljb284S1ZQRjRSa0dDZnlFd050MFg1RjJ2TzVGZFQvN0k5OEw1RGU2STdmNlI0Qm5PQ2J3a3plRjZHL0lRUUQ1OEQ4dDhCb1MyU2JiZVVZYnY4Uk9MSUYwclBSYlR0M3o3VGplVDczdWpaUExuZFFMbkhBSmZJOHUvWWg0MSs3UmN3YytnY2NuSjhNYnpUeTBzdVhJNjQ3M3Q5ejJ1dGQ5ajRtT1M4WU1KL0JiQnp5RU8zbHhPdUJKeEVqZzF3STg4cnp0cURQcVI0WUFtNkpyMnJCTnU3aDJERHorYWx4ZnVLTVVmT0o3Y1NXVWlHRDhVa0RGaWJWczVDMGVNb0tGTXdJK2tJQmMveHI4UGhNQ0x6OHV3Ynh2QVpnUDFXMk53Q1BTRytLOTRyeFMzUXZxeDRZYmJjN1EzcWZkQ2x2a0FQZ1NlSThmOUY5OWswWWdoUE5JVWlvOWw2TGV6bStkUTQ1QS9jZnl1dEZUdVV5bzkrc0RuaERkOXJFdHZBRUtpNWlRRm55VjlOTUpnYmMrYit2ZDZlNTF6c3p0MHQ2RDJ6QkRlSGZBMDIzMDF5M0dyb0k3eWRPdEdNTWJhYmJKbS9xOG5QTUpmSnR3STNOc0wrVHdkYyt0eUZSV2wvQXZIOUo1ZXVCSm1LbEgyNUFTTzZTN2N4T0JRUHB5clo3bjF4SHd5Q3NMOXJIQWk0M2d3UVN4a1lpOVhPN0JvRDMyeU9UQWM5a3RBSDVmU1k3VVJFY0dLeUFuc0FYaHNBWnhkY3lMS1dBdHdNcy9qejUvYlFYYnJZUFhmZlJmcTZXUkhRRXYyZ3NBRE92Nm11aTBZTW00NTc4YXdOTm5VVyt2ODF0NXdWc2x0NXEzdFRjdk5BYitvQUd2NllrLzUvSVhQbC9MWjRZQmI3SERrUUhqZ0NmSzB5L2tUSHdRRGtxVkdQODJ0T1lDZVdrR0UvTjVUY0RYdWJTOExxcDdqYnBFK21pdGpHT3pUcnMyOEcxTkh0UWIrUEZmbkNMZ0ZiaUtnQ1FMbjdjSEtkdkxmY2EvV25OcitXT1hPaWxZREIra3Q3azZhM2RXRzdsTGhsdFh4KzExZDlIVks4N2JZQjVkRy9CN0pNK1prMmdhcTNEZTl0c3h3YzhmZUFTZGh0Y0lpMW9NeHkvRlRTcWJmYTBpSGNuTVhDYmxJa0s3ZmlWUTU1TkdiUUtGYklvSE4yNFB0dUdIL0lQRmZuOXJIREZlR2VRRDVHM0Mxdys4SEhKZWxPby9adFhjQ1ZsaWN3WGUzZUthYmR5UHpaZkdUdkczVDlVQ0tGNEsrZzVrWGtYV3hvcFNrSjV3cVJ3WHZQU1JSelppa0JkaFhpUTV1anJhT0NrcWJjSVBBbmh4enAxeGZ5ODgvRkNidE8wSHZzbWJMenRldkFkdGNyc1BmQVBUQSsvYUlmR2lHako1NmxuajViLzg2UGxmK09uaXRBTnNGTyt2ZjhYVEFaOU12amFXTDFvTDVDSmN1dnBSSUM5aXZIQnUxQThhZUhIT0xRNEJ0aGMrK0w0RVhrdEVKNnlLQStRMUVpTmM1UndIS2VGTFpidFZBcGJjL1BXODlEanQ0bnlpb2pOYWFJdTZPdVlBd2h4ZlFIRUo2K0MvMWtMNDRGUXZrQ1BKdjhtNUNkOEE4T0s4TEVvdk9UTjFHcXptMFFRZVFUZFZWUnhadWJ5TjE0U3pHWDlRd01jVmV3TWZ5NlVYOHhqenF3OHdZYStGRzJHOGVTR0RYRjYzV3lDb2JaQnZESGpSWHRlTms0a3U0SmsxMXdvOGMvUE1nUStZM0NPVlhuY0lBOC9iOVMyR0xlVnVoc2lpdFBRWThPNHY0TnVCbTlYTDEzSUZNUitXV3piSVMveXNFUjVYbXdmd3JpZjF4cEliZDczNWJPcnlRUGJTZHhDV0cxc3pLeTREeHg5VEE5K09MTVlqaVA3cndxbTFxTnlUeXhpdUdWSWNSUGllNE5sVlhSMm5lcTJvQy9YNUFWODJabEs2dTZXNlc5eVBzdlZ4K0dsRksyS3pIK0NWZTlNMktBUzhJM2tDdnAyT1pSbXora2h6QU5qaDhSMmxzaloxOVRrQ3Y1anVma09CZExsUEp3WGVqM2JHd0U5ZkpJK3Y2d1I0ejNvaU9RSTh1a0FjZUNYaHVjTklJZitvM0lHTEJ2a0ErU0RKRzRUUEYvamlqWXR6cmtic2ZVMUp5OHl5VXQ3bUNYd0MzMDRyRGpvYXdzRGJzek5KNU96Y1R4NzNFQUtISVR6ZVRvRHBDM2l0VkkzU2JzZnA5SDQ3WmxuSFMvb0JmblgzdUcrdjI0MHJnSGttd0xjVFlPcHJ2dnJaVHhWRnZXMlFkd2w4ZkJGYnNGTEZtZ3g0Z2lVekJ4NHYzZXFpdGZNcTJnMlk3ZVN6ZzNQOXdJdHdyUzNkQS94blB0a212Ry9nVjJ3eTQ1SE1rK3Z6M2tpc0I2Y2RnbTVDNENHa2QrRFZDTmY3OTR3RFAwTEFIS05WYTBzWDh0WDNBditZRVVyZ3JYdFBLZVR0R2tDZm56L3dNRG5kWWpYckM3emRJdUFkaHNEc0grZTA0M1drMGhPY0QrRnhPOVZkZHRrMWx4UDRSbG40MVZQdWxNL2pHYVNYVEx2VlY2UXJMUjg4T3JUaGxTUG9ibEpoUm9UbGVOYkN1eExqUTVaYkJYbGxrR3Z2MC9wbTREK0JEd241MWQzMTJPbzhVVitxRStENWZQVmt1K21uajgxNTZibnRScTZPZnFzQThCNXA1TWtwbFZVTHlDWEpnMlVkM0NHQlgrcGpBMW9leGdqYTVSR1E5ZDdYYWptWHBoeGZNY3JKcDdOdDdUaDhiRGxnQWY0d0pMZDFTVjVmaytURG9oU0Z4OGVVYVdNUHBRUSs1R1lEOGxYV0dETkJ5RFRnTFZOQUY4QjdFSS9mT05ubGJzWTVBckg1bVM4bUVkZmN4c1NaZHA0ZC9CUUs4SXNHdVR3N0wvMzVINTQ2V2dpM29nNjBWZlhrVnNOYzE2NEs3SEdZd0k5Y2gxQkVOSFBCVXNHdVdJdDBoUGtEMzZDVXQ0enNwZlduNlRPNldwWW80bFoxazZOYnVYOHVwUytOMU5YbFZpTVRpcGgvN3AxdjM3bnZ6aUxoNitEWjVTOCtwUTNJelhuVmltWU96RXYzTEtiblNQOThBaS9taFQwcE9zVWExM2JmV2lGajJqc0RYb0xMbFNkckRaL1hmREtNZUFFdlMxN3JUMVVQc3l4YzQ2N3F6bE1CcitYdXVrL3REeDlVYmRyejQrNFRqMS80alY4czRmRXYvOXlQSThtaFYzSzQ3VmVyRFhLa1BjWFV3WHZnbkxkOHlFVVd0ellQUTVYQVd6TWZmMkRHbS9adWdCOWZXTnJBRzRuNE1UM3c4U05PdXcyQndLRnE2STBXdkk1VUJsc0JDWHpjOTBhTzdiaXhZbHo3QTk0cTd1cEo3N0dTYjlZQ0FHa0R3TGVORHJVVGIrSzVvTUEvLzc1M0IzOHJ5L1lKZ0xlakxvRWY3OGJEeTRKeUhxd2l5QnhoYTc5bjRJTjFsK05Hc2hhY04xRDMxZHB0dGYydHBQTzN2QlVuL3A5dzJsVzMzTDEzN0J5bkhkNzVQdHJWNVN2eXlla28reG9GaFRDbWVLMnhONDRyWDNwYU0wZ0N2Mm9ySmNTSTIwblZSM1huUS9oYzM4WWdBbjRqRGZhMGsyU0J2T3dBaVNKd1E1ZkNXSUJBQ1h6ZWNqVTRYMTJxdDc5MzJNUlMrMkhXRzJPSThCcHkyalhJQjkrN2hjVHVrNStuM25rdDBqR3RTWXdKT00vdGs4TnB4eHpCNllLZlQrQ2MvOVUxRS9nTzJneUJ6elp3WGhGK09MdzY2eEMrT29KdDgwSW9nVS9nczBtWTE3cDZVZFRia0Nmd0NYd0MzeHZoZ3B5bWhTc0pmQUtmd1BmVDJnWjVnYnhCZUFLZndDZndIVXB5V2tWNGcrMEVQb0ZQNEx0cUlueUluRlc2ZWdLZndDZnd2ZXZxdGFKdVhiMU5lQUtmd0Nmd25VQXVTZDRnUElGUDRCUDRUb05ubFVIZVpqdUJUK0FUK040SVY1YWJkZlVFUG9GUDRQc212QUc1ZnB3RVBvRlA0RHZNWTYzVFlOcmg4UVErZ1UvZ2UrVzhJcnlCZHdMZldVdmdFL2hXbHB0UVQrQVQrQVMrUjJ1OFY0TThnVS9nRS9nNDVKVnJ2UkVlNzZrbDhBbDhBdjlkNGx3RytWWVFuc0FuOEFtOGcyZGRoTWNUK0FRK2dSK2Z5cW9GNVAwU25zQW44QW04RFBKR2VQeFlFcDdBSi9DZEFnL2tkcm1sb3I1TndDZndDYnl6M09acmtDZndDZnovQVNJdUtYZ3ZGd0dKQUFBQUFFbEZUa1N1UW1DQycsXG4gICAgICAgIF07XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVJbmRleDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVJbWFnZXNbdGhpcy5zYW1wbGVJbmRleF07XG4gICAgXG5cbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgaW1hZ2VVcmw6IHRoaXMuc2FtcGxlRGF0YSB9IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnNhbXBsZUluZGV4Kys7IFxuICAgICAgICAgICAgaWYgKHRoaXMuc2FtcGxlSW5kZXggPj0gdGhpcy5zYW1wbGVJbWFnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVJbmRleCA9IDA7IFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlSW1hZ2VzW3RoaXMuc2FtcGxlSW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn0iLCIvKlxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcbipcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcbiogIE1JVCBMaWNlbnNlXG4qXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuKiAgIFxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiogICBcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4qICBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XG5cbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcblxuICAgIGV4cG9ydCBjbGFzcyBSaWNodGV4dERhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XG5cbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiUmljaHRleHREYXRhXCI7XG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJSaWNodGV4dCBkYXRhXCI7XG5cbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWyd0ZXh0Ym94JyxcbiAgICAgICAgXTtcblxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGE6IHN0cmluZ1tdID0gW1wiRXhhbXBsZSBUZXh0XCIsXG4gICAgICAgICAgICBcImNvbXBhbnkncyBkYXRhXCIsXG4gICAgICAgICAgICBcIlBvd2VyIEJJXCIsXG4gICAgICAgICAgICBcInZpc3VhbGl6YXRpb25cIixcbiAgICAgICAgICAgIFwic3BvdCB0cmVuZHNcIixcbiAgICAgICAgICAgIFwiY2hhcnRzXCIsXG4gICAgICAgICAgICBcInNpbXBsZSBkcmFnLWFuZC1kcm9wIGdlc3R1cmVzXCIsXG4gICAgICAgICAgICBcInBlcnNvbmFsaXplZCBkYXNoYm9hcmRzXCIgICAgICAgICAgICAgICAgXG4gICAgICAgIF07XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVTaW5nbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhWzBdO1xuXG4gICAgICAgIHByaXZhdGUgc2FtcGxlVGV4dFN0eWxlID0ge1xuICAgICAgICAgICAgZm9udEZhbWlseTogXCJIZWFkaW5nXCIsXG4gICAgICAgICAgICBmb250U2l6ZTogXCIyNHB4XCIsXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIixcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IFwiMzAwXCIsXG4gICAgICAgICAgICBmb250U3R5bGU6IFwiaXRhbGljXCIsXG4gICAgICAgICAgICBmbG9hdDogXCJsZWZ0XCJcbiAgICAgICAgfTtcblxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xuICAgICAgICAgICAgLy8gMSBwYXJhZ3JhcGhzLCB3aXRoIGZvcm1hdHRpbmdcbiAgICAgICAgICAgIHZhciBwYXJhZ3JhcGhzOiBQYXJhZ3JhcGhDb250ZXh0W10gPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsVGV4dEFsaWdubWVudDogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICAgICAgdGV4dFJ1bnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zYW1wbGVTaW5nbGVEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlOiB0aGlzLnNhbXBsZVRleHRTdHlsZVxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5idWlsZFBhcmFncmFwaHNEYXRhVmlldyhwYXJhZ3JhcGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIGJ1aWxkUGFyYWdyYXBoc0RhdGFWaWV3KHBhcmFncmFwaHM6IHBvd2VyYmkudmlzdWFscy5QYXJhZ3JhcGhDb250ZXh0W10pOiBwb3dlcmJpLkRhdGFWaWV3W10ge1xuICAgICAgICAgICAgcmV0dXJuIFt7IG1ldGFkYXRhOiB7IGNvbHVtbnM6IFtdLCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgcGFyYWdyYXBoczogcGFyYWdyYXBocyB9IH0gfSB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG5cbiAgICAgICAgICAgIHRoaXMuc2FtcGxlU2luZ2xlRGF0YSA9IHRoaXMucmFuZG9tRWxlbWVudCh0aGlzLnNhbXBsZURhdGEpO1xuICAgICAgICAgICAgdGhpcy5zYW1wbGVUZXh0U3R5bGUuZm9udFNpemUgPSB0aGlzLmdldFJhbmRvbVZhbHVlKDEyLCA0MCkgKyBcInB4XCI7XG4gICAgICAgICAgICB0aGlzLnNhbXBsZVRleHRTdHlsZS5mb250V2VpZ2h0ID0gdGhpcy5nZXRSYW5kb21WYWx1ZSgzMDAsIDcwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59IiwiLypcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4qXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4qICBNSVQgTGljZW5zZVxuKlxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiogICBcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4qICAgXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuKiAgVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxuXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xuXG4gICAgZXhwb3J0IGNsYXNzIFNhbGVzQnlDb3VudHJ5RGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcblxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTYWxlc0J5Q291bnRyeURhdGFcIjtcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNhbGVzIEJ5IENvdW50cnlcIjtcblxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2RlZmF1bHQnXTtcblxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGEgPSBbXG4gICAgICAgICAgICBbNzQyNzMxLjQzLCAxNjIwNjYuNDMsIDI4MzA4NS43OCwgMzAwMjYzLjQ5LCAzNzYwNzQuNTcsIDgxNDcyNC4zNF0sXG4gICAgICAgICAgICBbMTIzNDU1LjQzLCA0MDU2Ni40MywgMjAwNDU3Ljc4LCA1MDAwLjQ5LCAzMjAwMDAuNTcsIDQ1MDAwMC4zNF1cbiAgICAgICAgXTtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluOiBudW1iZXIgPSAzMDAwMDtcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXg6IG51bWJlciA9IDEwMDAwMDA7XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVTaW5nbGVEYXRhOiBudW1iZXIgPSA1NTk0My42NztcblxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xuXG4gICAgICAgICAgICB2YXIgZmllbGRFeHByID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZmllbGREZWYoeyBzY2hlbWE6ICdzJywgZW50aXR5OiBcInRhYmxlMVwiLCBjb2x1bW46IFwiY291bnRyeVwiIH0pO1xuXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlWYWx1ZXMgPSBbXCJBdXN0cmFsaWFcIiwgXCJDYW5hZGFcIiwgXCJGcmFuY2VcIiwgXCJHZXJtYW55XCIsIFwiVW5pdGVkIEtpbmdkb21cIiwgXCJVbml0ZWQgU3RhdGVzXCJdO1xuICAgICAgICAgICAgdmFyIGNhdGVnb3J5SWRlbnRpdGllcyA9IGNhdGVnb3J5VmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3dlcmJpLmRhdGEuY3JlYXRlRGF0YVZpZXdTY29wZUlkZW50aXR5KGV4cHIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTWV0YWRhdGEsIGRlc2NyaWJlcyB0aGUgZGF0YSBjb2x1bW5zLCBhbmQgcHJvdmlkZXMgdGhlIHZpc3VhbCB3aXRoIGhpbnRzXG4gICAgICAgICAgICAvLyBzbyBpdCBjYW4gZGVjaWRlIGhvdyB0byBiZXN0IHJlcHJlc2VudCB0aGUgZGF0YVxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdDb3VudHJ5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgdGV4dDogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NhbGVzIEFtb3VudCAoMjAxNCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIiQwLDAwMC4wMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAnc2FsZXMxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZGF0YVBvaW50OiB7IGZpbGw6IHsgc29saWQ6IHsgY29sb3I6ICdwdXJwbGUnIH0gfSB9IH0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU2FsZXMgQW1vdW50ICgyMDE1KScsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGFbMF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzJdLFxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTVcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGFbMV0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZXM6IERhdGFWaWV3VmFsdWVDb2x1bW5zID0gRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKGNvbHVtbnMpO1xuICAgICAgICAgICAgdmFyIHRhYmxlRGF0YVZhbHVlcyA9IGNhdGVnb3J5VmFsdWVzLm1hcChmdW5jdGlvbiAoY291bnRyeU5hbWUsIGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbY291bnRyeU5hbWUsIGNvbHVtbnNbMF0udmFsdWVzW2lkeF0sIGNvbHVtbnNbMV0udmFsdWVzW2lkeF1dO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICByb3dzOiB0YWJsZURhdGFWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1ucyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNpbmdsZTogeyB2YWx1ZTogdGhpcy5zYW1wbGVTaW5nbGVEYXRhIH1cbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG5cbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbiwgdGhpcy5zYW1wbGVNYXgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNhbXBsZVNpbmdsZURhdGEgPSB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuKlxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuKiAgTUlUIExpY2Vuc2VcbipcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qICAgXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuKiAgIFxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiogIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgU2FsZXNCeURheU9mV2Vla0RhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XG5cbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2FsZXNCeURheU9mV2Vla0RhdGFcIjtcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNhbGVzIGJ5IGRheSBvZiB3ZWVrXCI7XG5cbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWydjb21ib0NoYXJ0JyxcbiAgICAgICAgICAgICdkYXRhRG90Q2x1c3RlcmVkQ29sdW1uQ29tYm9DaGFydCcsXG4gICAgICAgICAgICAnZGF0YURvdFN0YWNrZWRDb2x1bW5Db21ib0NoYXJ0JyxcbiAgICAgICAgICAgICdsaW5lU3RhY2tlZENvbHVtbkNvbWJvQ2hhcnQnLFxuICAgICAgICAgICAgJ2xpbmVDbHVzdGVyZWRDb2x1bW5Db21ib0NoYXJ0JyxcbiAgICAgICAgICAgICdhc3RlclBsb3QnXG4gICAgICAgIF07XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGExID0gW1xuICAgICAgICAgICAgWzc0MjczMS40MywgMTYyMDY2LjQzLCAyODMwODUuNzgsIDMwMDI2My40OSwgMzc2MDc0LjU3LCA4MTQ3MjQuMzRdLFxuICAgICAgICAgICAgWzEyMzQ1NS40MywgNDA1NjYuNDMsIDIwMDQ1Ny43OCwgNTAwMC40OSwgMzIwMDAwLjU3LCA0NTAwMDAuMzRdXG4gICAgICAgIF07XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNaW4xOiBudW1iZXIgPSAzMDAwMDtcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXgxOiBudW1iZXIgPSAxMDAwMDAwO1xuXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YTIgPSBbXG4gICAgICAgICAgICBbMzEsIDE3LCAyNCwgMzAsIDM3LCA0MCwgMTJdLFxuICAgICAgICAgICAgWzMwLCAzNSwgMjAsIDI1LCAzMiwgMzUsIDE1XVxuICAgICAgICBdO1xuXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluMjogbnVtYmVyID0gMTA7XG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWF4MjogbnVtYmVyID0gNDU7XG5cbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcbiAgICAgICAgICAgIC8vZmlyc3QgZGF0YVZpZXcgLSBTYWxlcyBieSBkYXkgb2Ygd2Vla1xuICAgICAgICAgICAgdmFyIGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJ0YWJsZTFcIiwgY29sdW1uOiBcImRheSBvZiB3ZWVrXCIgfSk7XG5cbiAgICAgICAgICAgIHZhciBjYXRlZ29yeVZhbHVlcyA9IFtcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIsIFwiU3VuZGF5XCJdO1xuICAgICAgICAgICAgdmFyIGNhdGVnb3J5SWRlbnRpdGllcyA9IGNhdGVnb3J5VmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3dlcmJpLmRhdGEuY3JlYXRlRGF0YVZpZXdTY29wZUlkZW50aXR5KGV4cHIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTWV0YWRhdGEsIGRlc2NyaWJlcyB0aGUgZGF0YSBjb2x1bW5zLCBhbmQgcHJvdmlkZXMgdGhlIHZpc3VhbCB3aXRoIGhpbnRzXG4gICAgICAgICAgICAvLyBzbyBpdCBjYW4gZGVjaWRlIGhvdyB0byBiZXN0IHJlcHJlc2VudCB0aGUgZGF0YVxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ0RheScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmV2aW91cyB3ZWVrIHNhbGVzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCIkMCwwMDAuMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGRhdGFQb2ludDogeyBmaWxsOiB7IHNvbGlkOiB7IGNvbG9yOiAncHVycGxlJyB9IH0gfSB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RoaXMgd2VlayBzYWxlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGExWzBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1syXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE1XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhMVsxXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XG4gICAgICAgICAgICB2YXIgdGFibGVEYXRhVmFsdWVzID0gY2F0ZWdvcnlWYWx1ZXMubWFwKGZ1bmN0aW9uIChkYXlOYW1lLCBpZHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2RheU5hbWUsIGNvbHVtbnNbMF0udmFsdWVzW2lkeF0sIGNvbHVtbnNbMV0udmFsdWVzW2lkeF1dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2ZpcnN0IGRhdGFWaWV3IC0gU2FsZXMgYnkgZGF5IG9mIHdlZWsgRU5EXG5cbiAgICAgICAgICAgIC8vc2Vjb25kIGRhdGFWaWV3IC0gVGVtcGVyYXR1cmUgYnkgZGF5IG9mIHdlZWtcbiAgICAgICAgICAgIHZhciBmaWVsZEV4cHJUZW1wID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZmllbGREZWYoeyBzY2hlbWE6ICdzJywgZW50aXR5OiBcInRhYmxlMlwiLCBjb2x1bW46IFwiZGF5IG9mIHdlZWtcIiB9KTtcblxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5VmFsdWVzVGVtcCA9IFtcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIsIFwiU3VuZGF5XCJdO1xuICAgICAgICAgICAgdmFyIGNhdGVnb3J5SWRlbnRpdGllc1RlbXAgPSBjYXRlZ29yeVZhbHVlc1RlbXAubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBleHByVGVtcCA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwclRlbXAsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG93ZXJiaS5kYXRhLmNyZWF0ZURhdGFWaWV3U2NvcGVJZGVudGl0eShleHByVGVtcCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBNZXRhZGF0YSwgZGVzY3JpYmVzIHRoZSBkYXRhIGNvbHVtbnMsIGFuZCBwcm92aWRlcyB0aGUgdmlzdWFsIHdpdGggaGludHNcbiAgICAgICAgICAgIC8vIHNvIGl0IGNhbiBkZWNpZGUgaG93IHRvIGJlc3QgcmVwcmVzZW50IHRoZSBkYXRhXG4gICAgICAgICAgICB2YXIgZGF0YVZpZXdNZXRhZGF0YVRlbXA6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ0RheScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmV2aW91cyB3ZWVrIHRlbXBlcmF0dXJlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3RlbXAxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vb2JqZWN0czogeyBkYXRhUG9pbnQ6IHsgZmlsbDogeyBzb2xpZDogeyBjb2xvcjogJ3B1cnBsZScgfSB9IH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUaGlzIHdlZWsgdGVtcGVyYXR1cmUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAndGVtcDInLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgY29sdW1uc1RlbXAgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLmNvbHVtbnNbMV0sXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBlcmF0dXJlIHByZXYgd2Vla1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuc2FtcGxlRGF0YTJbMF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YVRlbXAuY29sdW1uc1syXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcGVyYXR1cmUgdGhpcyB3ZWVrXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhMlsxXSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlc1RlbXA6IERhdGFWaWV3VmFsdWVDb2x1bW5zID0gRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKGNvbHVtbnNUZW1wKTtcbiAgICAgICAgICAgIHZhciB0YWJsZURhdGFWYWx1ZXNUZW1wID0gY2F0ZWdvcnlWYWx1ZXNUZW1wLm1hcChmdW5jdGlvbiAoZGF5TmFtZSwgaWR4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtkYXlOYW1lLCBjb2x1bW5zVGVtcFswXS52YWx1ZXNbaWR4XSwgY29sdW1uc1RlbXBbMV0udmFsdWVzW2lkeF1dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvL2ZpcnN0IGRhdGFWaWV3IC0gU2FsZXMgYnkgZGF5IG9mIHdlZWsgRU5EXG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZGF0YVZpZXdNZXRhZGF0YSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbDoge1xuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGNhdGVnb3J5VmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllcyxcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogZGF0YVZhbHVlc1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgcm93czogdGFibGVEYXRhVmFsdWVzLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnMsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZGF0YVZpZXdNZXRhZGF0YVRlbXAsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YVRlbXAuY29sdW1uc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXNUZW1wLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllc1RlbXAsXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGRhdGFWYWx1ZXNUZW1wXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgICAgICByb3dzOiB0YWJsZURhdGFWYWx1ZXNUZW1wLFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBkYXRhVmlld01ldGFkYXRhVGVtcC5jb2x1bW5zLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcblxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhMSA9IHRoaXMuc2FtcGxlRGF0YTEubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4xLCB0aGlzLnNhbXBsZU1heDEpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEyID0gdGhpcy5zYW1wbGVEYXRhMi5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbjIsIHRoaXMuc2FtcGxlTWF4MikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuKlxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuKiAgTUlUIExpY2Vuc2VcbipcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qICAgXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuKiAgIFxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiogIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcblxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVGdW5uZWxEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xuXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlNpbXBsZUZ1bm5lbERhdGFcIjtcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbXBsZSBmdW5uZWwgZGF0YVwiO1xuXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnZnVubmVsJ107XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gWzgxNDcyNC4zNCwgNzQyNzMxLjQzLCAzNzYwNzQuNTcsIDIwMDI2My40OSwgMTQwMDYzLjQ5LCA5NjA2Ni40M107XG4gICAgICAgIFxuICAgICAgICBwcml2YXRlIHNhbXBsZU1pbjogbnVtYmVyID0gMzAwMDtcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXg6IG51bWJlciA9IDEwMDAwMDA7XG5cbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcblxuICAgICAgICAgICAgbGV0IGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJmdW5uZWxcIiwgY29sdW1uOiBcImNvdW50cnlcIiB9KTtcblxuICAgICAgICAgICAgbGV0IGNhdGVnb3J5VmFsdWVzID0gW1wiQXVzdHJhbGlhXCIsIFwiQ2FuYWRhXCIsIFwiRnJhbmNlXCIsIFwiR2VybWFueVwiLCBcIlVuaXRlZCBLaW5nZG9tXCIsIFwiVW5pdGVkIFN0YXRlc1wiXTtcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHIsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG93ZXJiaS5kYXRhLmNyZWF0ZURhdGFWaWV3U2NvcGVJZGVudGl0eShleHByKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE1ldGFkYXRhLCBkZXNjcmliZXMgdGhlIGRhdGEgY29sdW1ucywgYW5kIHByb3ZpZGVzIHRoZSB2aXN1YWwgd2l0aCBoaW50c1xuICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRlY2lkZSBob3cgdG8gYmVzdCByZXByZXNlbnQgdGhlIGRhdGFcbiAgICAgICAgICAgIGxldCBkYXRhVmlld01ldGFkYXRhOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0NvdW50cnknLFxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAnQ291bnRyeScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTYWxlcyBBbW91bnQgKDIwMTQpJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCIkMCwwMDAuMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMScsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGRhdGFQb2ludDogeyBmaWxsOiB7IHNvbGlkOiB7IGNvbG9yOiAncHVycGxlJyB9IH0gfSB9LFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1sxXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBsZXQgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzLFxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEgPSB0aGlzLnNhbXBsZURhdGEubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4sIHRoaXMuc2FtcGxlTWF4KSk7XG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYiAtIGE7IH0pO1xuICAgICAgICB9ICAgICAgICBcbiAgICB9XG59IiwiLypcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4qXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4qICBNSVQgTGljZW5zZVxuKlxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiogICBcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4qICAgXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuKiAgVEhFIFNPRlRXQVJFLlxuKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxuXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVHYXVnZURhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XG5cbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2ltcGxlR2F1Z2VEYXRhXCI7XG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJTaW1wbGUgZ2F1Z2UgZGF0YVwiO1xuXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnZ2F1Z2UnLCAnb3dsR2F1Z2UnXG4gICAgICAgIF07XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhOiBudW1iZXJbXSA9IFs1MCwgMjUwLCAzMDAsIDUwMF07XG5cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNaW46IG51bWJlciA9IDUwO1xuICAgICAgICBwcml2YXRlIHNhbXBsZU1heDogbnVtYmVyID0gMTUwMDtcblxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xuICAgICAgICAgICAgbGV0IGdhdWdlRGF0YVZpZXdNZXRhZGF0YTogcG93ZXJiaS5EYXRhVmlld01ldGFkYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdjb2wyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdNaW5WYWx1ZSc6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICckMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2NvbDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXM6IHsgJ1knOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnJDAnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdjb2w0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdUYXJnZXRWYWx1ZSc6IHRydWUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICckMCcgfSB9LFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2NvbDMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXM6IHsgJ01heFZhbHVlJzogdHJ1ZSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyQwJyB9IH0sXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIGdyb3VwczogW10sXG4gICAgICAgICAgICAgICAgbWVhc3VyZXM6IFswXSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgc2luZ2xlOiB7IHZhbHVlOiB0aGlzLnNhbXBsZURhdGFbMV0gfSxcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbDoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IERhdGFWaWV3VHJhbnNmb3JtLmNyZWF0ZVZhbHVlQ29sdW1ucyhbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbMF1dLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZ2F1Z2VEYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbdGhpcy5zYW1wbGVEYXRhWzFdXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGdhdWdlRGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogW3RoaXMuc2FtcGxlRGF0YVsyXV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1szXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbM11dLFxuICAgICAgICAgICAgICAgICAgICAgICAgfV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xuXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEgPSB0aGlzLnNhbXBsZURhdGEubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4sIHRoaXMuc2FtcGxlTWF4KSk7XG5cbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhIC0gYjsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuKlxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuKiAgTUlUIExpY2Vuc2VcbipcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qICAgXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuKiAgIFxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiogIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xuICAgIGltcG9ydCBWYWx1ZVR5cGUgPSBwb3dlcmJpLlZhbHVlVHlwZTtcbiAgICBpbXBvcnQgUHJpbWl0aXZlVHlwZSA9IHBvd2VyYmkuUHJpbWl0aXZlVHlwZTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgU2ltcGxlTWF0cml4RGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcblxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTaW1wbGVNYXRyaXhEYXRhXCI7XG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJTaW1wbGUgbWF0cml4IGRhdGFcIjtcblxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ21hdHJpeCcsXG4gICAgICAgIF07XG5cbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcbiAgICAgICAgICAgIHZhciBkYXRhVHlwZU51bWJlciA9IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKTtcbiAgICAgICAgICAgIHZhciBkYXRhVHlwZVN0cmluZyA9IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuVGV4dCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMScsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiAzLCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIy4wJyB9IH0gfTtcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMjogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMicsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiA0LCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIy4wMCcgfSB9IH07XG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTM6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTMnLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogNSwgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMnIH0gfSB9O1xuXG4gICAgICAgICAgICB2YXIgcm93R3JvdXBTb3VyY2UxOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ1Jvd0dyb3VwMScsIHF1ZXJ5TmFtZTogJ1Jvd0dyb3VwMScsIHR5cGU6IGRhdGFUeXBlU3RyaW5nLCBpbmRleDogMCB9O1xuICAgICAgICAgICAgdmFyIHJvd0dyb3VwU291cmNlMjogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdSb3dHcm91cDInLCBxdWVyeU5hbWU6ICdSb3dHcm91cDInLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDEgfTtcbiAgICAgICAgICAgIHZhciByb3dHcm91cFNvdXJjZTM6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnUm93R3JvdXAzJywgcXVlcnlOYW1lOiAnUm93R3JvdXAzJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAyIH07XG5cbiAgICAgICAgICAgIHZhciBtYXRyaXhUaHJlZU1lYXN1cmVzVGhyZWVSb3dHcm91cHM6IERhdGFWaWV3TWF0cml4ID0ge1xuICAgICAgICAgICAgICAgIHJvd3M6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ05vcnRoIEFtZXJpY2EnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ2FuYWRhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnT250YXJpbycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAxMDAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMTAwMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDEwMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnUXVlYmVjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDEwMTAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAxMDExLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMTAxMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVVNBJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnV2FzaGluZ3RvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAxMTAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMTEwMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDExMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnT3JlZ29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDExMTAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAxMTExLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMTExMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU291dGggQW1lcmljYScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdCcmF6aWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBbWF6b25hcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAyMDAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMjAwMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDIwMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnTWF0byBHcm9zc28nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMjAxMCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDIwMTEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyOiB7IHZhbHVlOiAyMDEyLCB2YWx1ZVNvdXJjZUluZGV4OiAyIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDaGlsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FyaWNhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDIxMDAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAyMTAxLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMjEwMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdQYXJpbmFjb3RhJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDIxMTAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAyMTExLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMjExMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGxldmVsczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbcm93R3JvdXBTb3VyY2UxXSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbcm93R3JvdXBTb3VyY2UyXSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbcm93R3JvdXBTb3VyY2UzXSB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgcm9vdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxldmVsOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeyBsZXZlbDogMCwgbGV2ZWxTb3VyY2VJbmRleDogMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGV2ZWw6IDAsIGxldmVsU291cmNlSW5kZXg6IDIgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsZXZlbHM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTNcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHZhbHVlU291cmNlczogW1xuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlMSxcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTIsXG4gICAgICAgICAgICAgICAgICAgIG1lYXN1cmVTb3VyY2UzXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHsgY29sdW1uczogW3Jvd0dyb3VwU291cmNlMSwgcm93R3JvdXBTb3VyY2UyLCByb3dHcm91cFNvdXJjZTNdLCBzZWdtZW50OiB7fSB9LFxuICAgICAgICAgICAgICAgIG1hdHJpeDogbWF0cml4VGhyZWVNZWFzdXJlc1RocmVlUm93R3JvdXBzXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuKlxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuKiAgTUlUIExpY2Vuc2VcbipcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qICAgXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuKiAgIFxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiogIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xuICAgIGltcG9ydCBWYWx1ZVR5cGUgPSBwb3dlcmJpLlZhbHVlVHlwZTtcbiAgICBpbXBvcnQgUHJpbWl0aXZlVHlwZSA9IHBvd2VyYmkuUHJpbWl0aXZlVHlwZTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgU2ltcGxlVGFibGVEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xuXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlNpbXBsZVRhYmxlRGF0YVwiO1xuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU2ltcGxlIHRhYmxlIGRhdGFcIjtcblxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ3RhYmxlJyxcbiAgICAgICAgXTtcblxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xuICAgICAgICAgICAgdmFyIGRhdGFUeXBlTnVtYmVyID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpO1xuICAgICAgICAgICAgdmFyIGRhdGFUeXBlU3RyaW5nID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5UZXh0KTsgICAgICAgICAgICBcblxuICAgICAgICAgICAgdmFyIGdyb3VwU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdncm91cDEnLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDAgfTtcbiAgICAgICAgICAgIHZhciBncm91cFNvdXJjZTI6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnZ3JvdXAyJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAxIH07XG4gICAgICAgICAgICB2YXIgZ3JvdXBTb3VyY2UzOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ2dyb3VwMycsIHR5cGU6IGRhdGFUeXBlU3RyaW5nLCBpbmRleDogMiB9O1xuXG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTE6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTEnLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogMywgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMuMCcgfSB9IH07XG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTI6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTInLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogNCwgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMuMDAnIH0gfSB9O1xuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UzOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUzJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDUsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjJyB9IH0gfTtcblxuICAgICAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHsgY29sdW1uczogW2dyb3VwU291cmNlMSwgbWVhc3VyZVNvdXJjZTEsIGdyb3VwU291cmNlMiwgbWVhc3VyZVNvdXJjZTIsIGdyb3VwU291cmNlMywgbWVhc3VyZVNvdXJjZTNdIH0sXG4gICAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogW2dyb3VwU291cmNlMSwgbWVhc3VyZVNvdXJjZTEsIGdyb3VwU291cmNlMiwgbWVhc3VyZVNvdXJjZTIsIGdyb3VwU291cmNlMywgbWVhc3VyZVNvdXJjZTNdLFxuICAgICAgICAgICAgICAgICAgICByb3dzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0EnLCAxMDAsICdhYScsIDEwMSwgJ2FhMScsIDEwMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0EnLCAxMDMsICdhYScsIDEwNCwgJ2FhMicsIDEwNV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0EnLCAxMDYsICdhYicsIDEwNywgJ2FiMScsIDEwOF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0InLCAxMDksICdiYScsIDExMCwgJ2JhMScsIDExMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0InLCAxMTIsICdiYicsIDExMywgJ2JiMScsIDExNF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0InLCAxMTUsICdiYicsIDExNiwgJ2JiMicsIDExN10sXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0MnLCAxMTgsICdjYycsIDExOSwgJ2NjMScsIDEyMF0sXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuKlxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuKiAgTUlUIExpY2Vuc2VcbipcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qICAgXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuKiAgIFxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiogIFRIRSBTT0ZUV0FSRS5cbiovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcbiAgICBcbiAgICBleHBvcnQgY2xhc3MgVGVhbVNjb3JlRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcblxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJUZWFtU2NvcmVEYXRhXCI7XG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJUZWFtIHNjb3JlIGRhdGFcIjtcblxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2NoZWVyTWV0ZXInLFxuICAgICAgICBdO1xuXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XG4gICAgICAgICAgICB2YXIgZmllbGRFeHByID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZmllbGREZWYoeyBzY2hlbWE6ICdzJywgZW50aXR5OiBcInRhYmxlMVwiLCBjb2x1bW46IFwidGVhbXNcIiB9KTtcblxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5VmFsdWVzID0gW1wiU2VhaGF3a3NcIiwgXCI0OWVyc1wiXTtcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHIsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG93ZXJiaS5kYXRhLmNyZWF0ZURhdGFWaWV3U2NvcGVJZGVudGl0eShleHByKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB2YXIgZGF0YVZpZXdNZXRhZGF0YTogcG93ZXJiaS5EYXRhVmlld01ldGFkYXRhID0ge1xuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUZWFtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ1RlYW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyB0ZXh0OiB0cnVlIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVm9sdW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3ZvbHVtZTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFs5MCwgMzBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XG5cbiAgICAgICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVBvaW50OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29saWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2IoMTY1LCAxNzIsIDE3NSknXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbGlkOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiKDE3NSwgMzAsIDQ0KSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufSIsIi8qXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcbiAqXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcbiAqICBNSVQgTGljZW5zZVxuICpcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcbiAqICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKiAgIFxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxuICogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICogICBcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcbiAqICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXG4gKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gKiAgVEhFIFNPRlRXQVJFLlxuICovXG5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfcmVmZXJlbmNlcy50c1wiLz5cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhIHtcblxuICAgIGltcG9ydCBzYW1wbGVEYXRhVmlld3MgPSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzO1xuICAgIFxuICAgIGV4cG9ydCBjbGFzcyBTYW1wbGVEYXRhIHtcblxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkYXRhID0gW1xuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEoKSxcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhKCksXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YSgpLFxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5TYWxlc0J5Q291bnRyeURhdGEoKSxcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2FsZXNCeURheU9mV2Vla0RhdGEoKSxcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2ltcGxlRnVubmVsRGF0YSgpLFxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5TaW1wbGVHYXVnZURhdGEoKSxcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2ltcGxlTWF0cml4RGF0YSgpLFxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5TaW1wbGVUYWJsZURhdGEoKSxcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuVGVhbVNjb3JlRGF0YSgpXG4gICAgICAgIF07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJldHVybnMgc2FtcGxlIGRhdGEgdmlldyBmb3IgYSB2aXN1YWxpemF0aW9uIGVsZW1lbnQgc3BlY2lmaWVkLlxuICAgICAgICAgKi9cbiAgICAgICAgcHVibGljIHN0YXRpYyBnZXRTYW1wbGVzQnlQbHVnaW5OYW1lKHBsdWdpbk5hbWU6IHN0cmluZykge1xuXG4gICAgICAgICAgICBsZXQgc2FtcGxlcyA9IHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaGFzUGx1Z2luKHBsdWdpbk5hbWUpKTtcblxuICAgICAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzYW1wbGVzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5oYXNQbHVnaW4oXCJkZWZhdWx0XCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXR1cm5zIHNhbXBsZURhdGFWaWV3IEluc3RhbmNlIGZvciBhIHZpc3VhbGl6YXRpb24gZWxlbWVudCBzcGVjaWZpZWQuXG4gICAgICAgICAqL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGdldERhdGFWaWV3c0J5U2FtcGxlTmFtZShzYW1wbGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmlsdGVyKChpdGVtKSA9PiAoaXRlbS5nZXROYW1lKCkgPT09IHNhbXBsZU5hbWUpKVswXTtcbiAgICAgICAgfSBcbiAgICB9ICAgICBcbn0iLCIvKlxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcbipcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcbiogIE1JVCBMaWNlbnNlXG4qXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuKiAgIFxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiogICBcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4qICBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX3JlZmVyZW5jZXMudHNcIi8+XG5cbmludGVyZmFjZSBKUXVlcnkge1xuICAgIHJlc2l6YWJsZShvcHRpb25zOiBhbnkpOiBKUXVlcnk7XG59XG5cbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMge1xuICAgIFxuICAgIGltcG9ydCBTYW1wbGVEYXRhID0gcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEuU2FtcGxlRGF0YTtcblxuICAgIGV4cG9ydCBjbGFzcyBIb3N0Q29udHJvbHMge1xuXG4gICAgICAgIHByaXZhdGUgdmlzdWFsRWxlbWVudDogSVZpc3VhbDtcbiAgICAgICAgcHJpdmF0ZSBkYXRhVmlld3NTZWxlY3Q6IEpRdWVyeTtcblxuICAgICAgICAvKiogUmVwcmVzZW50cyBzYW1wbGUgZGF0YSB2aWV3cyB1c2VkIGJ5IHZpc3VhbGl6YXRpb24gZWxlbWVudHMuKi9cbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhVmlld3M7XG4gICAgICAgIHByaXZhdGUgYW5pbWF0aW9uX2R1cmF0aW9uOiBudW1iZXIgPSAyNTA7XG4gICAgICAgIHByaXZhdGUgc3VwcHJlc3NBbmltYXRpb25zOiBib29sZWFuID0gdHJ1ZTtcblxuICAgICAgICBwcml2YXRlIHN1cHByZXNzQW5pbWF0aW9uc0VsZW1lbnQ6IEpRdWVyeTtcbiAgICAgICAgcHJpdmF0ZSBhbmltYXRpb25EdXJhdGlvbkVsZW1lbnQ6IEpRdWVyeTtcbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgdmlld3BvcnQ6IElWaWV3cG9ydDtcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeTtcblxuICAgICAgICBwcml2YXRlIG1pbldpZHRoOiBudW1iZXIgPSAyMDA7XG4gICAgICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlciA9IDEwMDA7XG4gICAgICAgIHByaXZhdGUgbWluSGVpZ2h0OiBudW1iZXIgPSAxMDA7XG4gICAgICAgIHByaXZhdGUgbWF4SGVpZ2h0OiBudW1iZXIgPSA2MDA7XG5cbiAgICAgICAgY29uc3RydWN0b3IocGFyZW50OiBKUXVlcnkpIHtcbiAgICAgICAgICAgIHBhcmVudC5maW5kKCcjcmFuZG9taXplJykub24oJ2NsaWNrJywgKCkgPT4gdGhpcy5yYW5kb21pemUoKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXdzU2VsZWN0ID0gcGFyZW50LmZpbmQoJyNkYXRhVmlld3NTZWxlY3QnKS5maXJzdCgpO1xuXG4gICAgICAgICAgICB0aGlzLnN1cHByZXNzQW5pbWF0aW9uc0VsZW1lbnQgPSBwYXJlbnQuZmluZCgnaW5wdXRbbmFtZT1zdXBwcmVzc0FuaW1hdGlvbnNdJykuZmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMuc3VwcHJlc3NBbmltYXRpb25zRWxlbWVudC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucygpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbkVsZW1lbnQgPSBwYXJlbnQuZmluZCgnaW5wdXRbbmFtZT1hbmltYXRpb25fZHVyYXRpb25dJykuZmlyc3QoKTtcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uQ2hhbmdlRHVyYXRpb24oKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc2V0RWxlbWVudChjb250YWluZXI6IEpRdWVyeSk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XG5cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlc2l6YWJsZSh7XG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IHRoaXMubWluV2lkdGgsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB0aGlzLm1pbkhlaWdodCxcbiAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6IHRoaXMubWF4SGVpZ2h0LFxuXG4gICAgICAgICAgICAgICAgcmVzaXplOiAoZXZlbnQsIHVpKSA9PiB0aGlzLm9uUmVzaXplKHVpLnNpemUpXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmNvbnRhaW5lci5oZWlnaHQoKSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5jb250YWluZXIud2lkdGgoKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyBzZXRWaXN1YWwodmlzdWFsRWxlbWVudDogSVZpc3VhbCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50ID0gdmlzdWFsRWxlbWVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgb25SZXNpemUoc2l6ZTogSVZpZXdwb3J0KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0ID0ge1xuICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHQgLSAyMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCAtIDIwLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudmlzdWFsRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZpc3VhbEVsZW1lbnQudXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudC51cGRhdGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVZpZXdzOiB0aGlzLnNhbXBsZURhdGFWaWV3cy5nZXREYXRhVmlld3MoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1cHByZXNzQW5pbWF0aW9uczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdwb3J0OiB0aGlzLnZpZXdwb3J0XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52aXN1YWxFbGVtZW50Lm9uUmVzaXppbmcpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQub25SZXNpemluZyh0aGlzLnZpZXdwb3J0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgZ2V0Vmlld3BvcnQoKTogSVZpZXdwb3J0IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpZXdwb3J0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSByYW5kb21pemUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGFWaWV3cy5yYW5kb21pemUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIG9uQ2hhbmdlRHVyYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbl9kdXJhdGlvbiA9IHBhcnNlSW50KHRoaXMuYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50LnZhbCgpLCAxMCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBvbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucygpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc3VwcHJlc3NBbmltYXRpb25zID0gIXRoaXMuc3VwcHJlc3NBbmltYXRpb25zRWxlbWVudC5pcygnOmNoZWNrZWQnKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnZpc3VhbEVsZW1lbnQudXBkYXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50LnVwZGF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFWaWV3czogdGhpcy5zYW1wbGVEYXRhVmlld3MuZ2V0RGF0YVZpZXdzKCksXG4gICAgICAgICAgICAgICAgICAgIHN1cHByZXNzQW5pbWF0aW9uczogdGhpcy5zdXBwcmVzc0FuaW1hdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdwb3J0OiB0aGlzLnZpZXdwb3J0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudC5vbkRhdGFDaGFuZ2VkKHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVZpZXdzOiB0aGlzLnNhbXBsZURhdGFWaWV3cy5nZXREYXRhVmlld3MoKSxcbiAgICAgICAgICAgICAgICAgICAgc3VwcHJlc3NBbmltYXRpb25zOiB0aGlzLnN1cHByZXNzQW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50Lm9uUmVzaXppbmcodGhpcy52aWV3cG9ydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgb25QbHVnaW5DaGFuZ2UocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmRhdGFWaWV3c1NlbGVjdC5lbXB0eSgpO1xuXG4gICAgICAgICAgICBsZXQgZGF0YVZpZXdzID0gU2FtcGxlRGF0YS5nZXRTYW1wbGVzQnlQbHVnaW5OYW1lKHBsdWdpbk5hbWUpO1xuICAgICAgICAgICAgbGV0IGRlZmF1bHREYXRhVmlldztcblxuICAgICAgICAgICAgZGF0YVZpZXdzLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uOiBKUXVlcnkgPSAkKCc8b3B0aW9uPicpO1xuXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbChpdGVtLmdldE5hbWUoKSk7XG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoaXRlbS5nZXREaXNwbGF5TmFtZSgpKTtcblxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0RGF0YVZpZXcgPSBpdGVtLmdldE5hbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QuYXBwZW5kKG9wdGlvbik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QuY2hhbmdlKCgpID0+IHRoaXMub25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbih0aGlzLmRhdGFWaWV3c1NlbGVjdC52YWwoKSkpO1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdERhdGFWaWV3KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZURhdGFWaWV3U2VsZWN0aW9uKGRlZmF1bHREYXRhVmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbihzYW1wbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YVZpZXdzID0gU2FtcGxlRGF0YS5nZXREYXRhVmlld3NCeVNhbXBsZU5hbWUoc2FtcGxlTmFtZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCIvKlxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXG4gKlxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXG4gKiAgTUlUIExpY2Vuc2VcbiAqXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICogICBcbiAqICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqICAgXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcbiAqICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX3JlZmVyZW5jZXMudHNcIi8+XG5cbmludGVyZmFjZSBKUXVlcnkge1xuICAgIC8qKiBEZW1vbnN0cmF0ZXMgaG93IFBvd2VyIEJJIHZpc3VhbCBjcmVhdGlvbiBjb3VsZCBiZSBpbXBsZW1lbnRlZCBhcyBqUXVlcnkgcGx1Z2luICovXG4gICAgdmlzdWFsKHBsdWdpbjogT2JqZWN0LCBkYXRhVmlldz86IE9iamVjdCk6IEpRdWVyeTtcbn1cblxubW9kdWxlIHBvd2VyYmkudmlzdWFscyB7XG4gICAgXG4gICAgaW1wb3J0IGRlZmF1bHRWaXN1YWxIb3N0U2VydmljZXMgPSBwb3dlcmJpLnZpc3VhbHMuZGVmYXVsdFZpc3VhbEhvc3RTZXJ2aWNlcztcblxuICAgIGltcG9ydCBIb3N0Q29udHJvbHMgPSBwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzO1xuXG4gICAgLyoqXG4gICAgICogRGVtb25zdHJhdGVzIFBvd2VyIEJJIHZpc3VhbGl6YXRpb24gZWxlbWVudHMgYW5kIHRoZSB3YXkgdG8gZW1iZWQgdGhlbSBpbiBzdGFuZGFsb25lIHdlYiBwYWdlLlxuICAgICAqL1xuICAgIGV4cG9ydCBjbGFzcyBQbGF5Z3JvdW5kIHtcblxuICAgICAgICAvKiogUmVwcmVzZW50cyBzYW1wbGUgZGF0YSB2aWV3IHVzZWQgYnkgdmlzdWFsaXphdGlvbiBlbGVtZW50cy4gKi9cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcGx1Z2luU2VydmljZTogSVZpc3VhbFBsdWdpblNlcnZpY2UgPSBuZXcgcG93ZXJiaS52aXN1YWxzLnZpc3VhbFBsdWdpbkZhY3RvcnkuUGxheWdyb3VuZFZpc3VhbFBsdWdpblNlcnZpY2UoKTtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY3VycmVudFZpc3VhbDogSVZpc3VhbDtcblxuICAgICAgICBwcml2YXRlIHN0YXRpYyBob3N0Q29udHJvbHM6IEhvc3RDb250cm9scztcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY29udGFpbmVyOiBKUXVlcnk7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZpc3VhbEhvc3RFbGVtZW50OiBKUXVlcnk7XG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludGVyYWN0aW9uc0VuYWJsZWRDaGVja2JveDogSlF1ZXJ5O1xuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZpc3VhbFN0eWxlOiBJVmlzdWFsU3R5bGUgPSB7XG4gICAgICAgICAgICB0aXRsZVRleHQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogeyB2YWx1ZTogJ3JnYmEoNTEsNTEsNTEsMSknIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdWJUaXRsZVRleHQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogeyB2YWx1ZTogJ3JnYmEoMTQ1LDE0NSwxNDUsMSknIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvclBhbGV0dGU6IHtcbiAgICAgICAgICAgICAgICBkYXRhQ29sb3JzOiBuZXcgcG93ZXJiaS52aXN1YWxzLkRhdGFDb2xvclBhbGV0dGUoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbFRleHQ6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3JnYmEoNTEsNTEsNTEsMSknLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMXB4J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlzSGlnaENvbnRyYXN0OiBmYWxzZSxcbiAgICAgICAgfTtcblxuICAgICAgICAvKiogUGVyZm9ybXMgc2FtcGxlIGFwcCBpbml0aWFsaXphdGlvbi4qL1xuICAgICAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmludGVyYWN0aW9uc0VuYWJsZWRDaGVja2JveCA9ICQoXCJpbnB1dFtuYW1lPSdpc19pbnRlcmFjdGlvbnMnXVwiKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gJCgnI2NvbnRhaW5lcicpO1xuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMgPSBuZXcgSG9zdENvbnRyb2xzKCQoJyNvcHRpb25zJykpO1xuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMuc2V0RWxlbWVudCh0aGlzLmNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVWaXN1YWxUeXBlU2VsZWN0KCk7XG4gICAgICAgICAgICBwb3dlcmJpLnZpc3VhbHMuRGVmYXVsdFZpc3VhbEhvc3RTZXJ2aWNlcy5pbml0aWFsaXplKCk7XG4gICAgICAgICAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIHNpbXBsaWZ5IHZpc3VhbGl6YXRpb24gZWxlbWVudCBjcmVhdGlvbiB3aGVuIHVzaW5nIGpRdWVyeVxuICAgICAgICAgICAgJC5mbi52aXN1YWwgPSBmdW5jdGlvbiAocGx1Z2luOiBJVmlzdWFsUGx1Z2luLCBkYXRhVmlldz86IERhdGFWaWV3W10pIHtcblxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMTogQ3JlYXRlIG5ldyBET00gZWxlbWVudCB0byByZXByZXNlbnQgUG93ZXIgQkkgdmlzdWFsXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKCc8ZGl2Lz4nKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZENsYXNzKCd2aXN1YWwnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50Wyd2aXNpYmxlJ10gPSAoKSA9PiB7IHJldHVybiB0cnVlOyB9O1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAgICAgUGxheWdyb3VuZC5jcmVhdGVWaXN1YWxFbGVtZW50KGVsZW1lbnQsIHBsdWdpbiwgZGF0YVZpZXcpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGlvbnNFbmFibGVkQ2hlY2tib3gub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEhvc3RFbGVtZW50LmVtcHR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0VmlzdWFsKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMudXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHZpc3VhbEJ5RGVmYXVsdCA9IGpzQ29tbW9uLlV0aWxpdHkuZ2V0VVJMUGFyYW1WYWx1ZSgndmlzdWFsJyk7XG4gICAgICAgICAgICBpZiAodmlzdWFsQnlEZWZhdWx0KSB7XG4gICAgICAgICAgICAgICAgJCgnLnRvcEJhciwgI29wdGlvbnMnKS5jc3MoeyBcImRpc3BsYXlcIjogXCJub25lXCIgfSk7XG4gICAgICAgICAgICAgICAgUGxheWdyb3VuZC5vblZpc3VhbFR5cGVTZWxlY3Rpb24odmlzdWFsQnlEZWZhdWx0LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uVmlzdWFsVHlwZVNlbGVjdGlvbigkKCcjdmlzdWFsVHlwZXMnKS52YWwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVWaXN1YWxFbGVtZW50KGVsZW1lbnQ6IEpRdWVyeSwgcGx1Z2luOiBJVmlzdWFsUGx1Z2luLCBkYXRhVmlldz86IERhdGFWaWV3W10pIHtcblxuICAgICAgICAgICAgLy8gU3RlcCAyOiBJbnN0YW50aWF0ZSBQb3dlciBCSSB2aXN1YWxcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZpc3VhbCA9IHBsdWdpbi5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudmlzdWFsSG9zdEVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMuc2V0VmlzdWFsKHRoaXMuY3VycmVudFZpc3VhbCk7XG4gICAgICAgICAgICB0aGlzLmluaXRWaXN1YWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGluaXRWaXN1YWwoKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWaXN1YWwuaW5pdCh7XG4gICAgICAgICAgICAgICAgZWxlbWVudDogdGhpcy52aXN1YWxIb3N0RWxlbWVudCxcbiAgICAgICAgICAgICAgICBob3N0OiBkZWZhdWx0VmlzdWFsSG9zdFNlcnZpY2VzLFxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLnZpc3VhbFN0eWxlLFxuICAgICAgICAgICAgICAgIHZpZXdwb3J0OiB0aGlzLmhvc3RDb250cm9scy5nZXRWaWV3cG9ydCgpLFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7IHNsaWNpbmdFbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eTogeyBpc0ludGVyYWN0aXZlTGVnZW5kOiBmYWxzZSwgc2VsZWN0aW9uOiB0aGlzLmludGVyYWN0aW9uc0VuYWJsZWRDaGVja2JveC5pcygnOmNoZWNrZWQnKSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIHN0YXRpYyBwb3B1bGF0ZVZpc3VhbFR5cGVTZWxlY3QoKTogdm9pZCB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IHR5cGVTZWxlY3QgPSAkKCcjdmlzdWFsVHlwZXMnKTtcbiAgICAgICAgICAgIC8vdHlwZVNlbGVjdC5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCJcIj4obm9uZSk8L29wdGlvbj4nKTtcblxuICAgICAgICAgICAgbGV0IHZpc3VhbHMgPSB0aGlzLnBsdWdpblNlcnZpY2UuZ2V0VmlzdWFscygpO1xuICAgICAgICAgICAgdmlzdWFscy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2aXN1YWxzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHZpc3VhbHNbaV07XG4gICAgICAgICAgICAgICAgaWYgKHZpc3VhbC5uYW1lID09PSAnYmFzaWNTaGFwZScpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHR5cGVTZWxlY3QuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiJyArIHZpc3VhbC5uYW1lICsgJ1wiPicgKyB2aXN1YWwubmFtZSArICc8L29wdGlvbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHlwZVNlbGVjdC5jaGFuZ2UoKCkgPT4gdGhpcy5vblZpc3VhbFR5cGVTZWxlY3Rpb24odHlwZVNlbGVjdC52YWwoKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgb25WaXN1YWxUeXBlU2VsZWN0aW9uKHBsdWdpbk5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHBsdWdpbk5hbWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpc3VhbFBsdWdpbihwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIHRoaXMuaG9zdENvbnRyb2xzLm9uUGx1Z2luQ2hhbmdlKHBsdWdpbk5hbWUpO1xuICAgICAgICB9ICAgICAgICBcblxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjcmVhdGVWaXN1YWxQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbigpLm5vdChcIi51aS1yZXNpemFibGUtaGFuZGxlXCIpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICBsZXQgcGx1Z2luID0gdGhpcy5wbHVnaW5TZXJ2aWNlLmdldFBsdWdpbihwbHVnaW5OYW1lKTtcbiAgICAgICAgICAgIGlmICghcGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwid3JvbmdWaXN1YWxXYXJuaW5nXCI+V3JvbmcgdmlzdWFsIG5hbWUgPHNwYW4+XFwnJyArIHBsdWdpbk5hbWUgKyAnXFwnPC9zcGFuPiBpbiBwYXJhbWV0ZXJzPC9kaXY+Jyk7IHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnZpc3VhbChwbHVnaW4pO1xuICAgICAgICB9ICAgICAgIFxuICAgICAgICBcbiAgICB9ICAgXG59IiwiLypcbiAqICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xuICpcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxuICogIE1JVCBMaWNlbnNlXG4gKlxuICogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxuICogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqICAgXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXG4gKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKiAgIFxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxuICogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcbiAqICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcbiAqICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqICBUSEUgU09GVFdBUkUuXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGVkZWZzL3R5cGVkZWZzLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGVkZWZzL3R5cGVkZWZzLm9iai50c1wiLz5cblxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9zYW1wbGVEYXRhVmlld3MudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL0ZpbGVTdG9yYWdlRGF0YS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvSW1hZ2VEYXRhLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9SaWNodGV4dERhdGEudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NhbGVzQnlDb3VudHJ5RGF0YS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2FsZXNCeURheU9mV2Vla0RhdGEudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZUZ1bm5lbERhdGEudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZUdhdWdlRGF0YS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlTWF0cml4RGF0YS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlVGFibGVEYXRhLnRzXCIvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9UZWFtU2NvcmVEYXRhLnRzXCIvPlxuXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YS50c1wiLz5cbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJob3N0Q29udHJvbHMudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiYXBwLnRzXCIvPiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==