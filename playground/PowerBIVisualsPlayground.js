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
                        'lineClusteredColumnComboChart'
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
                    this.visuals = ['gauge',
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
                this.suppressAnimations = false;
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
                    height: size.height - 5,
                    width: size.width - 15,
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
                this.onChange();
            };
            HostControls.prototype.onChangeDuration = function () {
                this.animation_duration = parseInt(this.animationDurationElement.val(), 10);
                this.onChange();
            };
            HostControls.prototype.onChangeSuppressAnimations = function () {
                this.suppressAnimations = this.suppressAnimationsElement.val();
                this.onChange();
            };
            HostControls.prototype.onChange = function () {
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
                this.onChange();
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
                var visualByDefault = jsCommon.Utility.getURLParamValue('visual');
                if (visualByDefault) {
                    $('.topBar, #options').css({ "display": "none" });
                    Playground.onVisualTypeSelection(visualByDefault.toString());
                }
                this.onVisualTypeSelection($('#visualTypes').val());
            };
            Playground.createVisualElement = function (element, plugin, dataView) {
                // Step 2: Instantiate Power BI visual
                this.visualElement = plugin.create();
                this.visualElement.init({
                    element: element,
                    host: defaultVisualHostServices,
                    style: this.visualStyle,
                    viewport: this.hostControls.getViewport(),
                    settings: { slicingEnabled: true },
                    interactivity: { isInteractiveLegend: false, selection: false },
                    animation: { transitionImmediate: true }
                });
                this.hostControls.setVisual(this.visualElement);
            };
            ;
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
            Playground.pluginService = powerbi.visuals.visualPluginFactory.create();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVkZWZzL3R5cGVkZWZzLnRzIiwidHlwZWRlZnMvdHlwZWRlZnMub2JqLnRzIiwic2FtcGxlRGF0YVZpZXdzL3NhbXBsZURhdGFWaWV3cy50cyIsInNhbXBsZURhdGFWaWV3cy9GaWxlU3RvcmFnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvSW1hZ2VEYXRhLnRzIiwic2FtcGxlRGF0YVZpZXdzL1JpY2h0ZXh0RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TYWxlc0J5Q291bnRyeURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2FsZXNCeURheU9mV2Vla0RhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlRnVubmVsRGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVHYXVnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlTWF0cml4RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVUYWJsZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvVGVhbVNjb3JlRGF0YS50cyIsInNhbXBsZURhdGEudHMiLCJIb3N0Q29udHJvbHMudHMiLCJfcmVmZXJlbmNlcy50cyIsImFwcC50cyJdLCJuYW1lcyI6WyJwb3dlcmJpIiwicG93ZXJiaS52aXN1YWxzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXROYW1lIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuZ2V0RGlzcGxheU5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5oYXNQbHVnaW4iLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXRSYW5kb21WYWx1ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzLnJhbmRvbUVsZW1lbnQiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkZpbGVTdG9yYWdlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuRmlsZVN0b3JhZ2VEYXRhLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5JbWFnZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkltYWdlRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLmdldERhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5SaWNodGV4dERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5idWlsZFBhcmFncmFwaHNEYXRhVmlldyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeUNvdW50cnlEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5Q291bnRyeURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlEYXlPZldlZWtEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeURheU9mV2Vla0RhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVGdW5uZWxEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlR2F1Z2VEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVHYXVnZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVNYXRyaXhEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlVGFibGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVUYWJsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5UZWFtU2NvcmVEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEuU2FtcGxlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhLlNhbXBsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldFNhbXBsZXNCeVBsdWdpbk5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldERhdGFWaWV3c0J5U2FtcGxlTmFtZSIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRFbGVtZW50IiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRWaXN1YWwiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLm9uUmVzaXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5nZXRWaWV3cG9ydCIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZUR1cmF0aW9uIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucyIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMub25DaGFuZ2UiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLm9uUGx1Z2luQ2hhbmdlIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZURhdGFWaWV3U2VsZWN0aW9uIiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5QbGF5Z3JvdW5kLmluaXRpYWxpemUiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5jcmVhdGVWaXN1YWxFbGVtZW50IiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQucG9wdWxhdGVWaXN1YWxUeXBlU2VsZWN0IiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQub25WaXN1YWxUeXBlU2VsZWN0aW9uIiwicG93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RUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDdEtBLEVBQUVBLFdBQVdBLEVBQUVBLHdCQUF3QkEsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDL0tBLEVBQUVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7d0JBQ2hLQSxFQUFFQSxXQUFXQSxFQUFFQSxVQUFVQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSw0QkFBNEJBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBO3dCQUNqS0EsRUFBRUEsV0FBV0EsRUFBRUEsT0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDOUpBLEVB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UUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsU0FBU0E7d0RBQ2hCQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLENBQUNBLEVBQUVBOzREQUN2Q0EsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTt5REFDMUNBO3FEQUNKQTtvREFDREE7d0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO3dEQUNSQSxLQUFLQSxFQUFFQSxRQUFRQTt3REFDZkEsTUFBTUEsRUFBRUE7NERBQ0pBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBOzREQUNsQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTs0REFDdkNBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsRUFBRUE7eURBQzFDQTtxREFDSkE7aURBQ0pBOzZDQUNKQTs0Q0FDREE7Z0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO2dEQUNSQSxLQUFLQSxFQUFFQSxLQUFLQTtnREFDWkEsUUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsWUFBWUE7d0RBQ25CQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLENBQUNBLEVBQUVBOzREQUN2Q0EsQ0FB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QUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBRXJHQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3pLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsTUFBTUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQzFLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBRXZLQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDSkEsUUFBUUEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0EsRUFBRUE7NEJBQ2pIQSxLQUFLQSxFQUFFQTtnQ0FDSEEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0E7Z0NBQ25HQSxJQUFJQSxFQUFFQTtvQ0FDRkEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0Es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QUNBLE9BQU9BLENBQUNBLG1CQUFtQkEsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7WUFNbkZBLHNCQUFXQSxHQUFpQkE7Z0JBQ3ZDQSxTQUFTQSxFQUFFQTtvQkFDUEEsS0FBS0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsa0JBQWtCQSxFQUFFQTtpQkFDdkNBO2dCQUNEQSxZQUFZQSxFQUFFQTtvQkFDVkEsS0FBS0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEscUJBQXFCQSxFQUFFQTtpQkFDMUNBO2dCQUNEQSxZQUFZQSxFQUFFQTtvQkFDVkEsVUFBVUEsRUFBRUEsSUFBSUEsT0FBT0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsZ0JBQWdCQSxFQUFFQTtpQkFDckRBO2dCQUNEQSxTQUFTQSxFQUFFQTtvQkFDUEEsS0FBS0EsRUFBRUE7d0JBQ0hBLEtBQUtBLEVBQUVBLGtCQUFrQkE7cUJBQzVCQTtvQkFDREEsUUFBUUEsRUFBRUEsTUFBTUE7aUJBQ25CQTtnQkFDREEsY0FBY0EsRUFBRUEsS0FBS0E7YUFDeEJBLENBQUNBO1lBdUZOQSxpQkFBQ0E7UUFBREEsQ0FqSEFuRSxBQWlIQ21FLElBQUFuRTtRQWpIWUEsb0JBQVVBLGFBaUh0QkEsQ0FBQUE7SUFDTEEsQ0FBQ0EsRUEzSGNELE9BQU9BLEdBQVBBLGVBQU9BLEtBQVBBLGVBQU9BLFFBMkhyQkE7QUFBREEsQ0FBQ0EsRUEzSE0sT0FBTyxLQUFQLE9BQU8sUUEySGIiLCJmaWxlIjoic3JjL0NsaWVudHMvUG93ZXJCSVZpc3VhbHNQbGF5Z3JvdW5kL29iai9Qb3dlckJJVmlzdWFsc1BsYXlncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVHlwZWRlZnMvanF1ZXJ5L2pxdWVyeS5kLnRzXCIvPlxyXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9UeXBlZGVmcy9kMy9kMy5kLnRzXCIvPlxyXG4iLCIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlzdWFsc0NvbW1vbi9vYmovVmlzdWFsc0NvbW1vbi5kLnRzXCIvPlxyXG4vLy88cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9WaXN1YWxzRGF0YS9vYmovVmlzdWFsc0RhdGEuZC50c1wiLz5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlzdWFscy9vYmovVmlzdWFscy5kLnRzXCIvPiIsIi8qXHJcbiAqICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4gKiAgTUlUIExpY2Vuc2VcclxuICpcclxuICogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiAqICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqICAgXHJcbiAqICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuICogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKiAgIFxyXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiAqICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiAqICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiAqICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4gKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBJU2FtcGxlRGF0YVZpZXdzIHtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgZGlzcGxheU5hbWU6IHN0cmluZzsgXHJcbiAgICAgICAgdmlzdWFsczogc3RyaW5nW107XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldERpc3BsYXlOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlOYW1lO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGhhc1BsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlzdWFscy5pbmRleE9mKHBsdWdpbk5hbWUpID49IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHZhbHVlICogMTAwKSAvIDEwMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21FbGVtZW50KGFycjogYW55W10pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFycltNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMgZXh0ZW5kcyBJU2FtcGxlRGF0YVZpZXdzIHtcclxuICAgICAgICBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXTtcclxuICAgICAgICByYW5kb21pemUoKTogdm9pZDtcclxuICAgICAgICBnZXRSYW5kb21WYWx1ZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXI7XHJcbiAgICAgICAgcmFuZG9tRWxlbWVudChhcnI6IGFueVtdKTogYW55O1xyXG4gICAgfVxyXG59XHJcbiIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgRGF0YVZpZXdUcmFuc2Zvcm0gPSBwb3dlcmJpLmRhdGEuRGF0YVZpZXdUcmFuc2Zvcm07XHJcbiAgICBpbXBvcnQgVmFsdWVUeXBlID0gcG93ZXJiaS5WYWx1ZVR5cGU7XHJcbiAgICBpbXBvcnQgUHJpbWl0aXZlVHlwZSA9IHBvd2VyYmkuUHJpbWl0aXZlVHlwZTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIEZpbGVTdG9yYWdlRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiRmlsZVN0b3JhZ2VEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIkZpbGUgc3RvcmFnZSBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsndHJlZW1hcCcsXHJcbiAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGEgPSBbNzQyNzMxLjQzLCAxNjIwNjYuNDMsIDI4MzA4NS43OCwgMzAwMjYzLjQ5LCAzNzYwNzQuNTcsIDgxNDcyNC4zNF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluOiBudW1iZXIgPSAzMDAwMDtcclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1heDogbnVtYmVyID0gMTAwMDAwMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgdmFyIHRyZWVNYXBNZXRhZGF0YTogcG93ZXJiaS5EYXRhVmlld01ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdFdmVudENvdW50JywgcXVlcnlOYW1lOiAnc2VsZWN0MScsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnTWVkYWxDb3VudCcsIHF1ZXJ5TmFtZTogJ3NlbGVjdDInLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zID0gW1xyXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1Byb2dyYW0gRmlsZXMnLCBxdWVyeU5hbWU6ICdzZWxlY3QxJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ0RvY3VtZW50cyBhbmQgU2V0dGluZ3MnLCBxdWVyeU5hbWU6ICdzZWxlY3QyJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1dpbmRvd3MnLCBxdWVyeU5hbWU6ICdzZWxlY3QzJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1JlY292ZXJ5JywgcXVlcnlOYW1lOiAnc2VsZWN0NCcsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdVc2VycycsIHF1ZXJ5TmFtZTogJ3NlbGVjdDUnLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH0sXHJcbiAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnUHJvZ3JhbURhdGEnLCBxdWVyeU5hbWU6ICdzZWxlY3Q2JywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBjb2x1bW5zW2ldLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogW3RoaXMuc2FtcGxlRGF0YVtpXV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB0cmVlTWFwTWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKHZhbHVlcylcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBJbWFnZURhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkltYWdlRGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJJbWFnZSBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnaW1hZ2UnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlSW1hZ2VzID0gW1xyXG4gICAgICAgICAgICAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFOZ0FBQURZQ0FZQUFBSCtKeDE3QUFBQUFYTlNSMElBcnM0YzZRQUFBQVJuUVUxQkFBQ3hqd3Y4WVFVQUFBQUpjRWhaY3dBQUN4TUFBQXNUQVFDYW5CZ0FBQnhUU1VSQlZIaGU3WjBKZEJSbHRvQmRadFRScDA5bm5PZThNL1BlVERyS0pnaUNPbTdnaWdLaUlJSXNndHV3Q3dLbWs1QTlFQ0VoSkVnd0tJdUFnQ0JyUkNEc0dBVk5BZ1paakNqQkVCSUlTU2NSUW5CVUZLakpYOTdTcXZKV2QzVjE3Ym5mT2Q4NTZmeGIzYjY1NmVxcTZ1cUxRbUZSVVhWUCtGRS91czh1dXJKNTdOQUxZUkdQY0dJN3BxZVhRaGR0dkx1bmRwQjhVaVdEWGl3c290dHZ0bGl0UVMvbWllaDlGcHRJamU1ZkRHdkR0TTlpWXJEMlFJc0pDSS9SeFpTUTk5TjFNYVhIZ3RoaUF2S2ZtYm9zdHJRZ2wyUEsrd29JL1hWWkRKcC8wMWRBNks5THpxQlpNbGIrTXpOZ1pQM2Y4TUtqbnhIMzAzMHhmNytqeFlUK1FmMkJQSlk1UXRKUGw4WGt5aGNSTkdReEpZWEZzRFpNNXkybUdsTVh1eVhobFRKc0lqVUd2UmhHajVuejg3SEo1ZXF5R01iU3oycjZtN2FZbkIxSEcxckJqL3JSV0pNWHI5eFgwMTBlRlJPNmFHTnhZZDAxRDJaazdzVW14b1JoNnNFbVVTdE1vUjVzRXJYQ0ZPckJKbEVyVEtFZWJCSzFCanZlSG90dEtjNy8rY1VJd1BvRVdreEFlSXgyeHNENjZiYVkvREZEL0R1bWZERXg0c2RDZThpTFlidmVEUEhqWC9vTFA0Z1ZkeEFRdHd1eXhhQ1pmeXhHL1BpWC9zSVBZakhheHZmNlRUL2RGbU83M2V6bndxLzM4NDhaOG42NkxZYjlqaUgrbmZNWEUwaFo4NmJrOTdvdGhpSHZwOHRpYWpWOU1lejNTanByc2FEQUpsRXJUS0VlYkJLMXdoVGFHYjc2OEJQWXhKZ3dSRjltRjFWZWYvdXJpVWROV1N3VWRwWTIzUHRnWm1haGZFUHZUa3M5QWwzc3dZYVNDNWZ2cS9vKzdKbjV5eGZlRlAzY2Vma0dxOVdVTjBCNUhQZTc5TzIrOEFHekY4VzBTUng3QnRzUXZUVThzRkRldlljaUJhWVZPd1NHdFN2Wk9tSDBULzU4S09QVkQvaEpuUmFZV2gwYm1CeDV1K3JBZ2dFYkw5ZVdnVTNmdkZqUzF2RDl0OUR5SytKMlREV0JZU2kxaWNjeE5RVVdxSjJCOVJIcnlNQ0dMVWhHKzRnVkJ3YkRma0hvZzZIVUp2eGVVSE5nN0owbmhueWNrcllNVEEwZEp3MUM1eEcwYmNZdzVTaWQvR0k2S2pDbUhLd1Brd0tUb2RRbS9GN1FzQnBqWVBNSTJpWXdKdnMzcmdic0dLdGNXd1dtcDAwaU1LdzlWRzBSbU1mYmd3dVA2cXVMZDA2Ty9ma2drUjBDTXdUWEJpWm0xUmNuLy83WTYxblQyaVNPcThFMlJrOU5EU3dZc2o3MmhROWZ1dkdkVmdtajZyRU5ENlJ0QTFQTFd4L1hYdjNRbklQTitzMWRza1ljMk4xcEtXWFF4UjNzTEsrL2J1SHVtcjd3MExuRWJheElheDQ3N04vaWJER2gyZDVrYlNpNXZNejM3VitlZjN2MUFua0FTc0pRK3pDbHNXYm1GZnFldlM4ajR3dHNnOVVLMDVuUENvNjdORzVEZWZqRWpmc25lTHhQYVQ2cm9pUXNZeXh6QzZwdkdMVGs4RjJQVE0vZTQ0bnFvL2xqRHNFSVN4c0h0cWdad3ZMR2dTMXFockM4Y1dDTG1pRXNieHpZb21ZSXl4c0h0cWdad3ZMR2dTMXFockE4RDlhT2laM29FM3Q3U3N6Wm90S1QveC9VcEhyTEx3NWc3YUZveUtScTVSY0hzUFpRcGNEMEZtTGl3ZHI5K2ViMlpYRFE3VmZrZllLZWxKMW9VQUxycnlURXhJTzErMU8zd0k2ZjlNSHd3R0RqTVNFbUhxemRuN29GRml6WUhISWhKaDZzM1orR0JTWS9OaTlIM0tZa3hNU0R0V09NZVNlVmJ6TXNNSG03L0dTRnZCMFRZdUxCMmpGTUQwemVCMnVYQ3pIeFlPMFlqZ3RNK0hDQzhBRUZKb2JwZ1lrL0RzQ1F0Mk5DVER3d2pFZG94ekE5TURIeUMvU1ZoSmg0WUNpUDBJNWhlR0RzZ3h1clB0MENqNlJnNHpFaEpoNFl5aU8wWXhnZVdDQ3dPZVJDVER3d2pFZG94N0E4TUFZMmoxaUlpUWVHOEFqdEdLYjhLUXB0U3BjZXNUOVY4Unh5SVNZZUdNSWp0R09ZL3M5RFVBN1dSeEJpNG9IdVBFSTdobVdCeWYraFlIMEVJU1llNk00anRHTllGaGhURE5ZdUNESHhRSGNlb1IyREFtdFUxOERrbDlCaWZRUWhKaDdvemlPMFkxZ1MyUHdkT2RENksxZy9RWWlKQjdyekNPMFloZ2VtQnZhdUc1dExFR0xpZ1NFOFFqdUdMUUxENWhFTE1mSEFFQjZoSFVQM3dBVGxlL0ZLWUdQbFFrdzhNSXhIYU1jd0xEQWx4WHNpYW9XWWVHRGJlSVIyRE5NRDB5TEV4QVBieGlPMFl6Z3VNS3c5VkNrd3ZZV1llTEQyVUN3OXlmMjNMUUxETHFqVW9zZmI2L3hkazhlbTg1TmlpNW9odjdpUllJdWFJU3h2SE5paVpnakxHd2UycUJuQzhzYUJMV3FHc0x3NVpPMnN2dlBlS1pNL0Q0OGNZUGdGMExDa2RienhTVlhyanVrVDVyZExqcTdETmxDck1MMjkyRkJTZDgzaW91bzdiMHVKSzhjMldvMHdsVE5ZOThYSmp1Tlc1MDFSYzMwakRIRW03R0xPcEx6SzY1ZnNxZW5YSm5GY3JXc0NzNExsbnpYOGVmejY4Zzd2N3ZVOXorNDVjdnVyY1ljOWtVK2VFNTdRV3lkRTEwQlh3aWhLU2k1Yy92NkI2aHNtYkN6dk1XRGU4dTEzcDA0cWFSYnp3cjg5M3A1QlgrWHIrQTlvV0VYamUvbExsdSt2YlI2MXJxTGZvS1ZmajMwaWU4NTdMZU5IZmhzVzBRVjlvdldTRWlhRFZjT0NUMzMzakY1VDlzbzlhU2w3VzhZTmJ3aVBHbWpKQjlRd20wekN0cGFlYnBhNnJYTHdpd3ZYRmpidU16WmdUNFlUZEh6Q2x1MzEzUlA5M283b0RoUGlhc0lqbjliOTR5dDIwL0VKcytyenRGWkpDWE9ZbERDSFNRbHptSlF3aDZtVU1IWkgxcUlpN3ZkMkVqWk5DaVhzWjdDK2R0SzdldDFZZmtNcFlUK0Q5YldiN1NkNEt5aGhBTmJYamxMQ0FLeXYzdmJNR3MzRnJwenVWMnljV0VzU3hqN1l5UzVCeFc1UGU3Q3kxTzhkSmtQVnlvUmhWN1BKd2NhSk5TeGg3TjdCZXFEbUZvYkJTQWtUYVJTQlBoWVRqSlF3a1VZU3VTd0RYVE5ZS1dFaS9ZSDFseHNJYkV5dzZwRXd0UWhYWWd1NkxtRk1mMkQ5ZzVVU0p0SWZXSDlNZjJEOWc1VVNKdElmV0grNWJJOVFpVUFmMEZLclVzSmdHUlQ1SEdweGZjTDhnZlhYSWlWTXBEK3cva3kyOXhjSWJKeFdLV0VpOVlZZENkSHlvVUYvVXNKRUdvMGVoNndvWVNMTkFsdGJyWlF3a2Y3QSttT3k3MDFTQXpaV2paUXdrZjdBK2dmU0greW9Qallta0pRd2tmN0ErcXZSSDFqL1FGTENSUG9ENjY5R2YyRDlBMGtKRStrUHJIOGdBNzJlWVdNQ1NRa1Q2UStzdnorTmVrTk5DUk9wRm5iTElIWkdtdDJMbHIweFpyTEhiRWRDTGRqNmFxU0VpVFFMYkcyMVVzSkVHbzBlWjUwcFlVSElUcCt3ZjMxcTc2TEdrSDhSZUtoU3dod21KY3hoS2lVTTYydEhLV0VBMXRlT1VzSUFySy9kdkhWQ3hBbEtHSUQxdFpPOVo4MWF6bThvSmN4aFVNSWNCaVhNWVZEQ0hJWW40aWxLbUpOWWtGZDJSZlluSi82K2NuOXRqOGozZHFUZU95WDF5L0R4QTMvRWduV0RqaytZR2ppT3V6aUo0eTdKNDdqZjdTZzkzV3oxZ2JyT2ZlZStzNnJqbExSRE55ZU1SWjhZdTlva0VxYVZndEl6TjJ3NlZIZEh0eGt6dDRSSDlUWGxLK2NEU1FuVGlYbEZOZDFqTjViSDNEb3g4bERMK0JIZmVieFBHbkpuT1VxWWlUVCthNzUwODFlbnd1YnRybjY0Nit1dnYzWGYxSXpTbXhQR2ZCc2UxZitYZS9vR2toSm1ZMWJ1L2VibVNWdU85WnFhZDJqWkhaT1NLejNlSjg1MWZtMUdBVFFUZG1WdjJmZi8ySFNvL282MDdjZkd3NjhJTzhCdXFKV2Q3N3N4ZGV2eGh4TTM3SjMwNkl3WjIxckZqVGd0L3BjSVhRa3JtTHE1NnFyWGRsUysvRmpqWHVodGt4S09oSGw3Qk53VGhhR0VrUlNXMUYwenM2RDZscFNOKzE3dE11T05vcmJKWHA4bnN2OVBXRUlDQ1ZNU29jSytIcVAzOG9vL1JEUld6UWRmMTNlWWwrOTd0bE42Mmo2OTcyTVB5eEhCc3JPOC9ycnNqMDUwR3JiNnlMRFdDU01MT2srYmNkQ285MTVpWVhrQ2cxWE43S0xLS3hmc1BYWHQrczlQUFJDUjgrSEU3dGx6dHJaSkhGY1Q1bjBjZlVLTkZqYU5FTmg2cU40emVldnh2bTJUeCt5NUxTWCt4RTNSQTcvM1JENmwrbzJ0MGNKbU5pM3l5c3F1bUw2dCtvYjFoMDUybWx0UTlmTFF4YmtMMmlTTmM4UzNSVUFJN3VmdGdwcXVhVnNyWCs2U05jc1hIajNBc2FkZklCem5zK1JBL1hVelB6citmMUc1RlczdWUrT0xoNU55aTZaMW1CaGYzU3oyWDY0Nk53YmhPcGUzZDlVODNUVnI1cWJtTVVQT2hYbTcyK0lVaUpGQzJNNEZDOHJOUXRqT0JRdkt6VUxZemdVTHlzMUMyTTRGQzhyTlF0ak9CUXZLelVMWXpnVUx5czFDMk00RkM4ck5RdGpPQlF2S3pVTFl6Z1VMeXMxQzJNNEZDOHJOUXRpL1FmNWxhMVpiWE14ZEJwc21CUXZLelVMWUVyQitvZG95OXZsenJSTkcvNlRWbStOZitxblRsSW1IWGxpd2NCSnM1czlnaTdsWkNGc0MxczlPdG93ZGRnbzJsUkxHd1ByWnpRNFR2WldPMlZnOTVZT1dnZld6bzQ3YVdMM2tnNWFCOWJPanUwcFBONk9FTllMMXM2TnhhemNQbzRRMWd2V3pvNG5yTmcyaGhEV0M5VE5DN0V0S3hkNmYranc2VHBBU0JtRDlqREFROHJ1L3liVXNZZXhHbFVyM1RHVGZQb3VOMFV2SWtRU3NueEVHd2pZSlMxbnpKbXlTZW94S0hPUklBdGJQQ0FOaFdjTFlUWmVEdWVHeUVscS8vY0dma0NNSldEOGpESVNwQ1dOM3lEWUNWcDNZZWxxRkhFbkEraGxoSUV4Tm1GNWZ0STJCcmFkVnlKRUVySjhSQnNJMUNkUHppN2NoUnhLd2ZrWVlDTmNraklHdHFVWElrUVNzbnhFR3dqWUpDL1RWaUdyMklyRnhXb1FjU2NENktjbWVWTFhJeHdiQ05nbGo3N213TVdJRDdiVG90Zk1CT1pLQTlWT1NFaWJTSDJybkNDVGtTQUxXVDBsS21FaWxveDhNU3BnTkU2YkhISUdFSEVuQStpbEpDUlBwYnc2OWR1MGhSeEt3ZmtwU3drUnVLYzZIRWIrRjdaUmdZNElWY2lSaGFVRXU1MC94ZUVxWVNIOWcvYlVJT1pJQVN5Z2lIazhKRStrUHJMOFdJVWNTWUFsRnhPTXBZU0Ryb3dTYkd4dWpSY2lSQkZoR0VmRjRTbGlqZ2I2Z0ZCdWpWY2lSQkZoR0VmSDRKcCt3NHlkOTBBdm5zY3dSNkRpdFFvNGt3RktLaU1jM21ZU3hKejdZYjVQVjh5aTlJT1JJQWl5bmlIaDhrMGlZVmloaFVtMmZNSUV0amUvUHNEVzFDRG1TQU1zb0loNVBDVk1KTzBXRHJSdXNrQ01Kc0lRaTR2R1VzQ0RRSTJtUUl3a3d2U0xpOFpTd0lBbjF2QmprU0FKTXJZaDRmSk5JR05zclZEcmp6SDdQcmtFTUJtd2V0VUtPSk1DMGlvakhONG1FcVRuU0liakZ6d0ZnQWJZV05sYU5rQ01KTUswaTR2R1VNTVJBUno0WTJEZzFRbzRrd0pTS2lNZFR3aFFNVkduWUdEVkNqaVRBbElxSXgxUEMvT2dQZjFkaCtSTnlKQUdtVkVROG5oTG1SN1licjRUVzF6SElrUVNZVWhIeGVFcVlINDJZRTNJa0FhWlVSRHllRXVaSFNwaFUyeWVNSGZ4VmdoSVdva1lrekI5Yk5CNFFoaHhKZ0NrVkVZK25oQ25ZTnI0WGpNYlJlb2dLY2lRQnBsUkVQSjRTcG1BZ3NERnFoQnhKZ0NrVkVZK25oTWtNVkZrQzJGZzFRbzRrd0pTS2lNYzNpWVNKWWRkd3NOY2YxcCs5K1JYMHQ0TWhSK3RySWhOeUpBR21WVVE4dnNrbFRBK3c5ZFVLT1pJQTB5b2lIazhKQ3hKV25kajZhb1VjU1lDcEZSR1BwNFFGQVoxeGRsREM2Sm9PblJNbWxsMkR5QklZNkNKUnRZU3lreUVYY2lRQmxsRkVQTjZWQ1ZNeTJMMUJsbkMybTQvTnBWWElrUVJZVGhIeCtDYVZNSCt5eEdnOXh4V01rQ01KOEh3cEloNVBDVE5aeUpFRWVMNFVFWStuaEprczVFZ0NQRitLaU1kVHdrd1djaVFCNjJkSEtXRUExcytPanMvSkhVNEphd1RyWjBjcFlRRFd6NDV1TzN5cVBTV3NFYXlmSFhYVXh1b2xIN1FNckovZGJCazc1TFJqTmxaUCthQmxZUDNzWkhoazM3T3dxWlF3eHNCNTgyYUZSejdOaFVmMXRaVXQ0NGFlNlQxbnp2clpheXV2aEUybGhEa09MQ2czQzJFN0Z5d29Od3RoT3hjc0tEY0xZVHNYTENnM0MyRTdGeXdvTnd0aE94Y3NLRGNMWVRzWExDZzNDMkU3Rnl3b053dGhPNWV3aUM1b1lHNFZ3bll1enkwb3UzYkgxdzMzek52dGUrSEoyVy9udHA4WTR3dnpQbzRHNndZaGJIZFJYTXhkOXZhZTZsdmlObFYwR2IxODY2ejJFMkxMVzhXT09CMFcwUTE5RXB3a2hPaHVramp1a2hVcnVFdExUalQ4T2UvUXFYWVRjdmRFUFpReGJkZmRhVk00VCtSVDZCTmpWeUdrcGt2T3dkTi9pczQ5K21EdmhWLzFqVjI3ZTBhbjlQVER6Y1lQUG9zOVdYWVFOcHVRVTFuSlhmbkprWk4vZi9QanF1ZGJKNDQ3RmVidGZnRjdBczBXTm84SVJGRVI5L3VsQjZwdmlNcXRhTE5pYiszUUJ6TXo5clpKR2xmVExPYkZIN0FuMWloaGM0aFEyRnA2dWxuR0J5ZUczcGVSdHYzbWhGRzE0ZEVEZjhTZWJEMkVKUWs5V2RHNGx4cTU3dGhONysycmUycmhMdDl6ajJUTjJOa3FibFM5SG51cHNBUmhCb1VsZGRlc08vaE42NndQcTU1K2RQcU1qZTJTWStwYnhBejdIa3VNa2pBVllRVnJpeXF2ZkMydjdOckJxMHYrOXY3bjM5eVQ4UDZ1NUllbXZiWXZQS3F2NGc0T0RDWHN4c2UxdFZlL3ZyT3k4NExkVmYxZVdMUisxMDNqQjMzWCtDLzFBalFUaExsd0hIZHhYbVhEOVlzL3JXbWZ0TG1pMzhobEc5T0d2TE4rZTUvWjcrN3ZQSDNtNGRhSlkwK0dSdzA0Mi9YMW1UdGdDRUUwUFRhVVhMajhqWjNsMXlWdHJ2cWZzYXVQL2k5N09lNjc0TXQvckR4UWU5czduOVVPOE9aOGxOWjc5c0sxRDJkbTdiOGwyVnNiSHZuMGVleWxXY203MHlZZmdhVUl3bDJ3ZzNNRnBXZHUySFM0L3NiVisydmF6ODMzZFVuUE96RXdjbDFaeEQ4bngzOTRWMnJ5bmpzblRUeldMR2J3V1krMzkza2pEdDUxVEU4dmhjMGhDUHVUVjhaZHNiaXc3cHJNYlJWLzNYS29vZVdhQTZlZW5MK3JlbkI4N3FjSm81WnZmcTMvdkNWTEhzak0zSDF6d3Nzbnc3eFBXSDYwbXdxTXNCVXJPTzdTRDc4KzAyYnFSNVgvR3BGekpLTkR5dmpQR3kyNWZWSnlaYXVFbDc3elJQWC95UlA1MURtN25Db0tKQlVZWVFockt5dXZaQ2ZDNXhUVy9TMWp4L0ZtWTljZWJUOWpaL1hEaS9iVWpYb2xaOGRiUFdiTy9lak95VWxIV3NRT08zTlQ5QXRuYjR4KzVseTRON2ozTjA2UUNvelFCSHVsK2JTOFBuek4vcE9kRmhWVjk1ejVTZFVMdzVhdXozemt0UmxGcmVKSG44UCsySnFpVkdERVJVV05yelo1WmFldVhiMi84ZFhtZ3hNZEJyMTd1TWU5VTVMZW1wTmZGVGw4NmNabHZkNThlK2Q5VTZlV3RFdU8rcVo1eklzL2VDTDdPR0wzekE1U2dia01kbjZHWFhEYVp3VjNLYnRDcXJpKy9vKzd5K3M5N080dHF3L1VkWjVYVUQxdytKTGNHWjJuVGM5dk95R3FxblhpSzF5em1NRmNlRlEvOUErRURFMHFNQWV5Ni9qcFA4MHRyTzBRditsbzkxRTVwUVA3THlrWjBUWjU5TTRCODVldit1ZWs1TktXOFNOUE5oLy80bmNlYjUrZjNIQVp2cE9sQXJPWUZjWEZsMlhtVi93aFluUFZWZG03Zkg5cGZLVjVZRmFCYjhUVXZNcVlmeTFlczZEUDdFWHI3cCthZnFEZGhQRzF6V09HbnFYZE0yZEpCV1l4YlpNakRvZEY5dnJSNCsxQkJ3WmNLQldZeFhnaWV0djI4MXRrNkZLQldRd1ZtTHVsQXJNWUtqQjNTd1ZtTVZSZzdwWUt6R0tvd053dEZaakZVSUc1V3lvd2k2RUNjN2RVWUJaREJlWnVxY0FzaGdyTTNWS0JXUXdWbUxzTnBzQnVTMzRtOHZIcHNkbVB2eFl6MDg0bXJGazdQR2QvYlErclhIV2d0dWVtTDA4OWNLQ3lvVVZHWHVYMVV6ZFhYY1UrUGdWUG94UXFNSGNiVElGaDQ4bkFlcnhQbkx0MXdyaGpNN1ovMWgrZXlsK2hBbk8zVkdEbUdoN2QvOGVWbjFmZEQwOHBGWmpicFFLendxNFhSaTlmK1JML3BGS0J1VnNxTUd2MGVIdWNMeXZqcnFBQ2M3bFVZTmFaL2VGbjNhakFYQzRWbUhYR3ZyOXBGQldZeTZVQ3M4N0VkWnVHVUlHNTNLWmFZRzl1WDhhRnlwaDNVdEc1MVVvRjFtai9ON3lLWXYyZEpoV1lkcWpBL01nS1pQcm14VnpoMS92aDZRb2ROcGZUQ284S1REdE51c0RheHZmaWhpMUk1bFo5dW9VN2Z0SUhUNGw1SEt3czViY0Iyelk3U1FXbUhkY1hXTWRKZzdqSVpSbmNsdUo4cnVIN2J5RnNlOEcyRGR0MnUwZ0ZwaDNYRmhqYnRYTVNyUGpaUHdNc0ZxdWxBdE1PRlpqTnNHT1JVWUZwaHdyTWh0anRmUmtWbUhhb3dBTEFEbjZ3Z3lBcGE5N2tqLzVocnpEczkvTjM1T2gyb01SdTc4bnNVR0E5czBaelN3dHlkWlhOaWEwbFNBWG1SNjBGeGc2alkvTUY0Mk9aSTBJK29HS25RL2wyS0REMmg2bzNnZjc0cWNEOGFHV0JDWVp5L294dFB6YW5GVktCYVljS1RJYWVCY2JVaXQ3YkVZcFVZTnFoQXBPaDl4ODJlMittQlNvd3FWUmdTS09WMnFYQTdMSWRvVWdGcGgwcU1CbDJLVEEyRHB2UENxbkF0RU1GSmtQdkFtUFhHMnJCVGllY2d5a3cySHhOWUdzTFVvRWhqVlpxaHdKajEwQnFnWjEzdythelNpb3c3VkNCeWRDcndOaTVNQzJ3azlYWWZGWktCYVlkS2pBWmVoU1kxclhaeVdrN2ZueUZDa3c3VkdBeXRCWVlLd3kyYTZjVjlsNE5tOWNPVW9GcGh3cE1odG9DRXo2b3FjZG56TmgxanRnYWRwRUtURHRVWUJhaTV3RVZJNlVDMHc0Vm1FMWd4V2JYZTNWUWdXbUhDc3lHc0NPSjdDZ2tGcGNWVW9GcGh3ck14ckQzZDNZb05Db3c3VkNCT1FDcjM2dFJnV21IQ3N3aFdIbU9qQXBNTzFSZ012Ujh0V0NIOHJjVTU4UE0rbUJGa1ZHQmFZY0tUSWFSdTJOYXIwMFVZOFdsVkZSZzJxRUNrMkhHK3gxMllqa1UySWM0c1htTmtncE1PMVJnTXN3Nm9NQStqaElLMkp4R1NRV21IU293R1dZZXNkTjZ4VDNEek11cnFNQzBRd1Vtdzh3Q1k3TDF0R0RtWjhhb3dMUkRCU2JEN0FKenduWlNnV21IQ2t3R0ZkaHZwUUxURGhXWURMTUxUT3M5TzZqQVFvY0tMQVNkVUdCYXQ1SEJ4bUp6R2lFVm1IYW93R1NZVldCYWIwZ3FZT1pIVzZqQXRFTUZKc1BvQXRQamFnNnpkMk9wd0xSREJTYURYWXJFeHJKWENHYW8xLzZ4RThwc1BqMXVMU0JnOWowVHFjQzBRd1htTU5ncklCYXZrVktCYVljS3pFRllkVXNCS2pEdFVJRTVBTGJiYXVYOUVxbkF0RU1GWm5QWVo4cXcrTXlVQ2t3N3JpMHdkaUNBN1ZLeFFtUFg3V2s5b1dzRmRya1hoeUFWbUhaY1cyREJ5b3FSWGFIT3prK3h3K0I2SHZWVEExdlByamNncFFMVERoV1lCdG1yaS9EcUtCUWtVdzJza0ZoZk50Wk9yMUwrcEFMVERoVVlHVkFxTU8xUWdaRUJwUUxURGhVWUdkQmdDaXgyNVhST3E5amFnajJ6Um5OTEMzSjFsYzJKclNXWWxKUE5mWDZzSkNTZm54dUx6cTFXS3JBbVlEQUZobzBudFVzRjFnU2tBclBPOGUrdEgwa0Y1bktwd0t3emM5dXVKNm5BWEM0Vm1GVjJ2WkJmVWY5SEtqQ1hTd1ZtallNWExVcmluMVFxTUhkTEJXYXVIbSt2OHlrYmRveUFwNVFLek8xU2dabGp5OWpCcHlOWHJSdFRYTXhkQmsvbnoxQ0J1ZHRnQ216amw2ZWJ2N1hiTjNKdVFYWEV2RTlyeHBFSzdxcU5XTGF2N3RsUjd4OTljTXg3WmUwV0ZGVDlJeW1QK3gwOGpWS293Tnh0TUFWR0dBQVZtTHVsQXJNWUtqQjNTd1ZtTVZSZzdwWUt6R0tvd053dEZaakZVSUc1V3lvd2k2RUNjN2RVWUJaREJlWnVxY0FzSnV5Vng4NWppU0hkSVJXWXhjek45M1hwTVhQMm1rNVRwaFRkTlRtbHVsMXkxTm5tTVVOLzhrVDJ1WUFsakhTV1ZHQTJndU80aTFjVWM1ZXQrYkwyNnJrRjFUZWtieThQSDdmdVNOdG5GcGZjdWJESTkyakdCNGRqQnkxWW1kUDk5VG1mUERSdCtvRzdVaWRWTkk4ZDhnT1dXTkllVW9HNWhMMWxwNjdOKzZxaHhidDdhKy9QL3NUWGU5cEhKNFlQbUxkcS83MVRNK3BhSjR3NzQ0bnE5eVAyQjBBYUt4VllFNkR4bGZHU3ZMS3lLK2JtVi93eGFjT3h2OFZ0UGhwV2VMU2gxYmF2VDNkOWQ2L3YrY1RjUGFuZHMyZnQ2SkFTVzlrNmZzenBsckVqdncrUDdFZnZEWFdRQ294UXBLeU11MkpUY2YyTjh3dHJPcVp0UC83MGd4bFRsanllUFdmelBlbVRTMjlOaWFscWt6U3VybVhjOElhYm9nYzE3cVoyby9lTWlGUmdoQ2JZKzBYMnlzamVNMDc1dVBicXpQeUt2K2FYMXQrUnMvK2Jyb3VLYXZwazVCMGFQV2JWdHFtOVp5MTYvNkhNYVVXM0prVlZ0QmcvdFBGVnNRdjZoK2hXcWNBSVUybDhuM2o5TzN0OTdiSStybnBnOHZaajNlSTJsdmQ1TUNOMXpwQ2w2Mlozbmo3ajRHMFRFbXBheG8vODlzYm81ODU2dkU4NmZqZVZDb3l3RFNzNDd0TFpSZHp2c3phVVhKNlVWM1pGNytVVmYraThhTjlWNDllWFgzZncrQS9OY2o2dmV5Uis3YTY0UjdObUZ0NmMrUExKWmpHRE9VL1UwMXlZdHh2NngyMEhxY0FJVjVCWDdQdXZoWHZxV2ladHJ1ZzBjVk5GejltRlB1L0laWnZmZnp6N3JWMGQweWQvMVRweFRFMkwyQ0VONGRFRFREMmFTZ1ZHTkRrMmxKUmNYbFRXMEdMWlp6WGQ1dStxSHBDOTg4U3daOTllTmVlK2pMUTlMZUtHbi9GNGU1OFA4L1pvTEpEUVh4bnZUa3M5QXNzU0JDSEFkbGR6RHA3KzA2eVBmZUd4YTQrMnovencyQVBMUDZ0N2J1S21BeW45MzNwM1pjY3BxZnZiSm82cmFoWDMwcW1ib2dkOTU0bnNneFpZKzVRWUgweEpFSVFXMk5IVWZWVVhyaW84ZWlwc3pZRzZoMmQ5VXZYQ2hFM2xFNzFyanN5Y1UxamRIN29ScG5QUlJmOEJMK0wrbm1ya3pvY0FBQUFBU1VWT1JLNUNZSUk9JyxcclxuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBVkFBQUFETkNBSUFBQUJoQmIrbkFBQXB3VWxFUVZSNEFleWIzVzZDUUJDRit5eVZSYUJWdkpjZlVLSHYvd1k3UEVrN1RJaE90aVEwWXRhMUova3UyaHV2L0RMbjdJeHY5dmdlTUVWa1MwUDFsdHFVemg5MDJRMzlmdmpLUnc3TTlMZjZ0OCtIYmtlWFR6cG4xQ1pVYjIxbGJCblpZaU1mQzhDckVxYnd4WWI5ckF3MVd6cGxQK3FLNTFyeU9RN0svMzdQNXA4eWFoS3FZdjVZbUE4Zy9GUFpUbFZNYlNxZUszdVg0L3JmNTlUdE9DYTBxYTBNbkFjUTNuTjZGOC9aeVc2TTdyMks3bmVnMHI3TWZER2Y2aGdESDBCNEQ5RmRxYTVyK1hxb3FDODluMDdTODJQMGZBRGhINjE2ek5YNm5JMmVPL1Y3UFpiM2ZDczl2NEQ1QU1LdlJSbkpheHg3cmlPM0g5eWUzeVRvK1FEQzN6blNEZFhzdVk3dXVUL2I1M3QrSnowL1E4OEhFUDdQMFowa3Vxc0ZtOC9Cdmp6cXk4Q1h0RCthYjVEMkFZVC96Zk1pWXRXbm14bnhmTjJXN3FIbnR5azFOMmM4TUI5QWVOYWdNdFFtN0htMzlHQW1GUC8xQ3g5Ni9yOEZ3aGV5WUp1aWUrY3MwZ05IOS93OTZhMGV6L3dqNUg5dElIeXh1VGwzVHg2MFNBK2k1MHZhcHlwRzJuOUZJTHg4cDYvbjd1SzUzNHJ1WDM0eFgzNnVNejN2aFc0K2dQRFRhNXg2ZFFjVDRmZDhBT0Zsd2FaK3FlcTBkSENkOXM1V1Q5SSt2cFJQRFlSM3p0MEhkUVlMejJlWTYvazF0bnBQQ0lSWDUrNXF3UWJWVit2NXBZSDJub0h3b3ZwMXdjYnovSnU5OC81eTRycmkrQitUay95UWMzSkM3SUJ0aUpOQTRvUUN1elpnVThDQTZiM1k5RTdvWnltbXMyQU1tQTR1Z0EwY3dQUmVNTVVZRmpDRmxYYWxrVlphRmExR25YemtaNFpoTkRzSUlWRzhqM1BQSHVucDZiMDN3M3h2K2Q3N25zeWU0K2F2MllyZWRQWjl2N3AwVHZqWWZ2WDBVZitHVW1WMG40b1AvbWxyMmFDODZWOGsxQzFFcTk3bER1TTZ5VGovQllnRVBNK2N4VTVWUGRUdDd6WjBUeG9TUHJvdlpyK1hpc1VlaUgvSlJNS3RSSzVmQ1h5OVhobmNHWFZBVDRudHJPTjhzbm93ZkRMT2wxSm93R3V1dTZIYzNlQzZONjBIeml1N05NZWt4MngzVTZyNklKVjhZUG92a1VqV2hLSzNybGV2bUV2LzhtWlBaZTFsbkM4UDRaTlNFTUJyeEx0Mm5wVHhLUlFDWWgyOTNxc3FHUmZhdHlQdWNxYlU4SU5zL3FWUzlLdzVzTXZlNW04NWdVSEcrYUtBVHliem4xa2s0RFdjNjFqM3h3UjdYdDRzN2JvckkzcjQxaXlPM3J4bWp1cGs4a0VpamxlZlNzUk5QeWU4dDdkNSs2bWVmcVpHbnRpTmVLR2l3NytkZ3pvNXVoZlpXdFIvMU5qeEhXZi9kbzQrYldoa0hGdnoxOFZvQlJUR2g5Rm84VmNodkg3aWpPaFFXNHZYUlg5ZThEYno1dFBJaS9zUFUvcjNHcWNkZnZsQVMza2F3QnQycWdMMVdoTHBZS2E2dEVROWN6U3VPREpCbm9ySFV4R1ZBTDdtOEo3cWxmTTljeWRGZnk1N0ZzRHpaUFBvMDlQUm8xZ1owdG5adHkza0h5MjFJY2YrWGlQdjB0bVJxei9FSys2clo0ODcrcmFsa2Y2c21jWlkrWjNZM1Zzb0FvWUtiUGxjR2ZKaDRURFBwTXppVzdXZzV0QWU3Z2JpMzd6SzBhZXRSU0RENHQxVFB3bCt0MVgweHduQ2UwSXhhUjBjdlZ2N042endyMS8raXl6enIwT1c4dG83YjVLdCtXdFdjYjRVQ1hoZHVmc2Z6TXJkelpFUXJ5elgyRGlOa3hNNFYwOGQ5aTZjemtPSnIyNXI5UWEyQ0V1clhqbVhNK0RCUnVWSHJYajBFejV2TWhSSWhrUEpVREFaOEttbkQ0UDhUT1JnUXIxTFo2V2lVWmlDOFBIdkVXVm9HdEpnT3htdVNkWUV3eWNPeEowVnp2N3RtUjFDZ2JjVjdac1V5TFlySTNzeUtiT2szWnhZbEZ1RXM4TWFQSE1ubW1vWkZCbnJnUUhoSy9SSDZCLzU4WUw5L1g5b2ZUd2w0L2tVeGNvOTEwdWs3RWQ3dThhYXQyOFM1MHVSZ0FmcUVPOGMza0llS1B0ejQ1Sys2c2RvT0crVmQ5RU1aVmlYeXM1TjdXMy9ibXRaLzdHSHVHUHVnQ2RxSUdTQTNnY0RzWHMvcStkUHFXZU84VGQyNXliS0pWR2xrTzJ6dDM2TUJRQWIwZHMza3Y1cTk3VGhETTU2OE41UlFJQTg3ckFybzNyUmlBNnlGemYwTHB1dFhqcmpYVEtUVEdHaEFEKzh1M3I2aUhmQlZHZ09HRXBsV05mZ2pzMEFIdGZEMGJ1TkFmT1ZuZjliYzNndlY4cFgzTk5IVm5acmdhWnpUUnJNdmRXckpBQVAybXUrLzQ1MlJ2NVZGazEzVHgxdUszN1RFT2RqOENYc0g0a0V2SDZuYXZZQ3d2VzRqZDR1TTlxcmZBRGVWdnhXNE1zdmVMaVRRWC9ncTNWZ0JzOFdBODVmZkh2LzVzK3crZGhBWHVnemZIUmplZW9QcC9WV0VUQmc4TldMWnhoVDd6c3dWT0hTQkNKellRamE3YTBiY2RXcGFNUzNkb2xHTGlCNFE4SHRtM0FCUXJ1LzFIL0Z3Rm53RVhrUXpIN1ZyTkcwRzhTUXpEZlc4TWw4dmdTOExrclBIZkN4dXpkcHpDL2dlWHc5QzZhQ2RtaUNxdGxqNGE0TUhVQ0xaODZFaE11SnFhK2FNWXBvV2JTVDVFOVVlNGdzZ0pEV21SSG9SaFFnR3ZNaHVZZjlhQ2owVkhEbkZyMW5BYitZY0tYckZIQUVMTDVML1VKdzUrWlVQTVpsY291eXplZUxNaDQ5OG1XY1gwY0JyejI0THhuZzRhNncwbVR2L0Z0VzZTeWhFZlArVFN2cEU3MVZWdEd1c1dpa3ZJL2xFYnBESCtndFBJQ25NWHZBc3pER3J6M1dhRVRra2lQZ042NUlSU0w4MWNabnFiN1BGMkwyaVYrc1BBN2hDSHl6QVVhZ3NsdkxMS2V6L0drdEdlZlhPY0QvK2VVRVBFdzF6QndVSGQ2N3hlQVlSb0p6Zkh0bGFCZGxkRzkwUlBUR1QrQ0JGdlhTV2Q2bTVjTHAyTDFiNmRDQXhvdG5FTy9DYVZoWC9BTDRNTmVFUVhyT3pEVnBDQVFoZzhTZDluaWxEWk1Md1NZK3hjdHc5dnVBS0NOU2RnVTZJRjVScnA0NzRSby9VSVFKV1FxQkJvNEdGSVB5eVVjYXRuRlAxQ3ZuV2JOcjNBQ2g3T2pHWWpKMUNsUW85UTRvcjhvUG03RWVqSHpPK1h6TXZ1N0liUW43RnlvUzhCaDJIRmV5V1RpeDFxd2VVSUdUaDRGVGh2Y2c2d1pqUnlTTXNvaGN1OFRieUU4WDZVQ09FTURUeUdzYXZZdG4ySXJld0tpeUJxZ3Z6YVFIZDIwajFDY2lRRTJFait4amViSDd0OVh6SjBVSDE5aiswSWQwaUZ5OWlGS0FQa3g0M0tRTUNLb3RhYjk2YUFRc00vY0JmY0VVK1BPQmJXdTVMbjFnRDVPSDlpR0Q2Sm80aURDZXFWbUFiOTB5NWVOdStuQ21vdE03YUJrNmsrcGovV2d1MThUQjBCWTU3OHczeHZsdnl6ai91WXNFUFBBQTZ2RFZQTkJhY0c0cTJFRDRhcno2NEk1TjdNbkIweVlUaHFsa3V3NFdFblZBaTYxVkE4Kzh5VmhGR21uQmZ1SkxJd0NHTDVKRUZMRXhFRUxGd1A5WHpSd3RKc1Yra3ZtRE1PYzFGVHRvRUFZaEw4Q2FCWkpoempEMWFBRUtFeXp5NnFGZDIwSjd2a1pCa0dpSUs1VysxWXNleXl3d3k4Q09aTy9DSncveFVkTHZvdzh1QnNOU3RzU3Q5c3laU0o5SGdEOTdETkpPQ1BrNWhEcGxsQTZyeXIyR3ovalRXb0xoazNIK2N4RUplQUp5NEFFRzhMZXQ5OWlBVzNiajhOQ0g5bjZqSiszQ0p3L3FyQzZrM1Jpd1NxTVd3eHNBVDFxZWJ5V0RBUXdzMUwySng3RnVPYlhBNFdQNzlBNDh0aGRxSGNWVXZYS2VvYjgrVE9EK1VPcEROeTQ1NGZPRVR4elVLd2djZTJWa0x3Ykh6eWVJOEc4czVWTThkclFBYW9JVjRtVVF1V2d1dld0c1AzeU50SXpyVDFFVFdneVBoc0VEVzFibnAyN2ZzRkd2OEp2enBVakFOOEZ4QmZEdXlVT0FuelhneWRnQmVMQWhIbHdqNEhVc1BTYlVGUERvRk0vOEtkVDNoL2J0eEFVd1RSQVNDMEFCdUtjTUk3R3ZGOUw0WW1TTElsK0lkd0JNUFM4b0RlMytpaXhqOU00TlNBZnM5a1BBOXdUd1hBWFV2ZDdWUjFtbzU0NFRBcUJXUk1CdkNOcDVXOUhoWDk0bHN4aVRxZ1JsVE45ODF1MUQ3eitIbjlhU0lnRVB3SWhnc1ZxZVQvLzNSSmVlNGxQaWMyQ2ZNK0J0eFEycGg2RllEZGliemtJZExtYVc5YWdYVGtHNWFSSStkWWdFQWJQRDdXVjU2d2pYb1JzZ0F0aFRpRjRUZ09la0FBQWZkOWhnOGd4NGRrMFlDSmpWeStjb0ZxcjlKalNnWWdjN0g5aTJocmdtYjVqWDR2eTB6ZitUYnNkT3ZzRXZSWkoyT09vOHdUekh0cUszclBFRFp3NWFLRFhMR2ZCRTFEVUhkOFB0VjgwYVl6b0xEai9PTnBZV3o5d2dGQjBSYjR1QUlsdk1ZN2V2bk1lZWt4RVFlMkFZUDZuV3NBZUppa0JEWjRKMnFFR2lkRWVQSW9zeHE1ZVhvSS9Ra3VqS2dtN1IxYko2SVA5aG5QL000SmNpQVE5VGhVdFA4Yngxd3BsNlh2YmtKand1SXQ2Y0FRK3ZScTRMQzY5bDRBd0NEWTVCcGdTSVdSemRXMlZJRVZXeFQ3V2poaTA5RUlSUWlZS2hJSTdnS2xBZklOOWc0Um1mdTUwdXlPbmF3Z3J3SytaeGdmQ1hPVlFXdmZnNFg0b0VQTzJrcWVqRDlqSVFVaHR5eUcvaFVjUHdFVTduREhqaUFncGRlYzFvcHNVMnVBRDRFVmhhYXVPZnFyVFd0QjN0RUxsK0dmOEYrZzBMTDhnLzFvYUpacDM2Yi9IYVBYMEVXaTk4Zkw5RjVvOUJjREVZRU1MdlJaM01nYzJ2SzY2K0JEelpwa0tVMW5vWHo4VHFZcjNob2pIQ21lbXU2dEs1Z0FHeUNqdlBRNTh6NEpsTEdkV2J1QUF6QzM5bXlBc3dEaDBvYUtVU1RyMG9TdlNONmdERW11WWFsRUdkREJmSVc2b0RHUW9Ob2gzK1FlQU5IVWlzenI0Z1I4OTN0VHRBMFJIeEF1VURyRjhMWWRoMW81K09LeUlTU1hqZGJNamgyZ3VKYytzNFgrZnR5eDA3djFuQUo1TVV1cEZuemp2Z3hhTU1iUzZ5V2RUaGtLeGlOeDU0NHkrdU5SV213QWJtM0ZNeVFWakZuQUV2MGwzQmI3ZHdPZXlXZDQwZkFGWnhzNW1MdWhjcTlzVXVkUFFhSGFEM0hEMkxBUjdqdzVDem5UNndkWFZGcC85a3JwOWdoRUNBbTZPTTZjTWVlQVJPanJkRTcyVHYyVG1ucjZMRlE2SDBnRXdCNlFtVUR2bC9OdmFoRkppUm02QjFvOHdHL0VNdWNqZFlrbk5BQjZweGlYMjRPdDhYUzEraW83ZzA1TXM0L3pjQWVHQW16SjF2elJKbFVHY3laNFVBdkNEaGVhQXg4bUlUYnVUYVpiejNhTmxWSG5Hd0NtSEc0UkRVMWVnZlBnNmNvUEFHQ3QwSStHaFV2M21Ha2FseVlSREI5aUVFeVJ5OFNRdVdsdW82YXVsSWNUT1VWbWxIeWdDd2dVQ1FUOC9RM3UyUTU2eUVZajZRYjFwRlMxRE55dE9sdmxVdVBCRUc1NzVCOWJ2VGRKMnh2Z0FBaDQra3Q4ZFNVVU4vT0VJeTg0eWcyWHlFYWtMYUdST2xGbGVjT0RqaVBsUi9ObDg0UWJsTEllUDhWN3Q2VndLZVp4MWFtS2RjTTYwRkFqd0NickhuL3ZXbEpNRElab0VIWUlBWkpMbUZ4NXV4QUFpMjF1eHlOMnk1SVZxbWhKNUdjSzdGLzJpQjZJMnI3c2xEdFc1c095ZDhFTFc2MkV6SzZVbUFrei9YbkFKTU5IV3ZvQkhjb2hkZ0dkQkhHSHpUNmlEV3hyV1RjdU5lVVNaQUVUNHFobFI4UmZ0YTd4dDNnM0lhQ0FVS0J6bkdRL200cXdIRytCM3dDQVE3ek12L0FnTzZwNDNBbGNCWmVJbFA0QlJadlQvS09QOVZCVHdlTDVVa25rK25CTGR2eExVR1NEaVpXQzFJWnN3UmRTWmttSWxzQVpWQUVmdFljZ2E4NXQ1amdmR0syUXlISmFUUXRYWW1yejRMb0dRRlVPa1Qrd1FDTEZ1L3p4d3NNU1lRTWhCZzlLVG9uWW1nMyttVGlVbEllMmUvOURLZzM1Z3Vtd1AyK0JZVFpibkJEaDNIdkh6TFlrRG1GV2Q3dkNLbjdncHZYOGI1aFpUMDBWV0lpS0h5Q25nQkRHckNDR1U1V0FZZkZYOGIyNHNGcGpvVmo1Y1FHdHRJSlR6MkNoTVhLYnRxRHZnVEIreHRqWUNYVXBkK1FsdGs5V1NjLzR3LzkvWjc3VFJLZlpXRVVLa1dnTTlkc0lmVWsxTjVCdEdkZVJBOUdhUE14cGo5dm0vdFVsRkpLcVdPbnJjUDh1VlBhK1VvdjN2MEM2NU50Rjlxcm9mb1R6M1FZSjlud09NaFkvTnhSSWx5Q1ZuaDh5Q1RUSzA2YkJPMGMxWEplRGFFNENCSUFOUjU1QnQvV3N2Nk5CNHAyZ0hUdGY1OHE1RTlRYVgrdWh0Q0FENy9Rb1FQVHhiWXVvWXNGMFEzNURiSFJkVHMvNWJhTXRKbW9raEdpaFRUT0IrN0pER2Z4VzlBYWFkUkd0QnVmS3RuVHdvRmVPMEFObGd4OHRpY0VnL1huYTR6K1Q5N2Q1amFJQkRFVWZ3d0tVbVExbmdBSVcxSVF1OS9nOTZrdXc3eWo2Tkk4Wk16ZmZCTzBQckR6VHE2L2xtVUl1UmI1YnFzeTN1RXkvbjRJWGtkNitoaC8yMzM1Q0x3UlBzSThLSStQNmxaZXJlMFYvQUVlTzdxWlR0RHg3ZTZyMHNEbmdDZnc3bVc3dmNQbys2VzdvQW53SWQzUGl6ZFQ1VzY3Y2JOZm9FcndCUGc0MnJYQTdabnV5SWM4QVQ0eUhmMTZ2eXNwYnY3T3dDZUFCOS8xMTFMZDM5U3N3VjRBbnlTR1ZqTnpLdy9TQWM4QVQ1dU51NHU1OHZJQVUrQWorL2NMOTBWNENsNGdQZExkei91RG5nS0hlQzFHMmZqN3JieFBqcjNEOUlCVDdFRHZNYmR6Zm1HclRqQUUrRERPUGZqN2dyd0ZEWEF5N2t0M2YzTVRHY0JudUlIZUwyVVBvNjdyenNIUE1VTThIcURUYzdueUFGUHNRTjhkVzVMOStibFRWVUZlSW9lNE1jM1ZmM01UR2NCUGtVRWVMMlVmbDc4Rkd6MEFFK0ExOGE3ZlU5cU1nTWIzem5nQ2ZCeTdwYnVzWDZsQTU0QXYzM2NQZEhTSGZBRWVCM001Qit3NWFJT2VBSjhid2UyNkxXV2JML1NBVStBdDRPWjlIVjMvejJwUy9RQVQ0QS9hTno5VStQdTZad0RuZ0N2NDVNYmMyN0lvUTc0SkFIZU85ZXVlNW9BVDREM2I2cUtlcUlOT2NBVDRIczM3cTR4V0pBRFBrK0ExMTM5YS9sN1VnVDRGRmNENFBYZHVFWXpzR3k4QTk3dnlqNUxiY0FaYWNDL0RjNjFkUGRuc0VFZDhCUGhqN1pjSC9VcXVUWGx0bURMdndoUlYvOXIxK1BySnlKNWtBNzRicHBwYjM4ZUZYbTlJVnhQNVlxcE40cCtHSisrdjdOekcrWS9hLzlFYzg2UHNuOEozZ3MzM2hKK2ErcmQ0SG8wNUxYK1VOTDUyenNIRC9MdjMvYk83bGV1NnlyZy9XTVNFb0lhMlNFdEw5aEpLTFZ3NHFvUGZDQytHeXIxQVFraEVTQVZEMGdVYUVyVkJ4QktJWkVRYXFHaVFrQUZyUkJTV2hwVWxiUWdwZUdESmtBaDl2Vkg2dFpKN0tUSnRhRU4vSnlOVC9mOXpmV2U1VE5uN3B3OVhVZGIxc3g0bnpQbnp0bS92VDdXMm1zZjJqbCtlT2ZlN3p4OTM1MDd4Ky9na3dPejBzLzl4UEZYUHZtSi96bDc2bit2SFYvL3l2bmRKejZkd0c4TWNoRU92VVdNQXptU0hKNEw1NFZ3dHdSKzFwelREa040UWYzMGlUZWRmdHViZWMySEIzTVBvUDdhN2k2UTY0RC9CSDZEQnJraGJ4QStmK0NUODBxazM3RlRPRC94WmxDblhRTytTUGoxdHN0UC82TkJUK0FqclZhSEdnZWFFajFSbGk2ODk1ZjJGZU9TNTFBcVhiMUIrQUVEbjQwSEduem9jUFh5WC93eG1uT2x2ZDh4eUhPMUF2d0x2L3ViOVVWNHV3N1p6cFhYQlh3Q3IrTWJseTR5Q0tyZ1dmR3JJOFp2ZTEyTTMxSkJYaG5rdEU2QVQrQjF2SFo1ZC9lSng4Kzk0OFJwaWZSTkFNL3NJMDBlT1hUK2dmdkwvMTc2eUNOcHcwOER2T2ZSTTZmTy91aGJFZU1SWGIxTDRCTjRDZnl2bmovLzRMdEUrTUVETC9HTzdKbnU0Z2w4ZXdTY2YrN01EOTdWSUx4NzRCTjRLM2VYenIzejdac0ZYajc1OFpkSzRIbTlhSkRqV3Ivd2F3OWMvUEFITC8vckYxN2JmWFdSZWNoTTRQdHEwb2YzK3Q0UEErMjUrOS8yNHFNZnVQelUzME80TmJ0ek94c0F2bjN6Q1h6YzQycmc2L0Q0UFlxYzNYVG1CNDVlK2RMVEdnR3ZmdWF4em9GUDRCMWdHNngwNVBtVlovNVpUNXk1WUFiQWh5NmV3RHRmZlEvd1owNFdnN3p0V3IvOEwwL1dQenBpdjJmZ0Uvakh6ZmxDUTZyWHB5RDVOd1U4enJrRWZtU1F2T1NyQS9rM2dULzliQkRGYjF4OHNmN2RMLzdCN3lUdy9iUkRlNEQvM044Q2FyczkvLzVmdGxhL0llQjk4UVErRWg2djg5V0JmQVR3TC8zcGgvWU1tbi80YkFMZlJTdUI5QUR3YmtUbTZyTVMrTTBDdjhoMmFjT3lzeXFWOWNqTmRiNzZPT0NmKzVrZnByOU9UT0M3U0hkSGRSOEJQRkk5Z2Q4dzhDSmMrZXJYSXVRRjh2MFRZRVlEVHdzRDc1bmlhMy85TVR4L3VQZDFCVndEbUFhZEFvOXRpZmNMaDBpZEU4TGIzU2MvUjI3aTZxa21YSWQ4cDNKWnZvTGdjNVR6L2J4eEt3SGZ2MHJQRXlrUHEveWt3Nis2OHZQeXQ1Q25PSXdIdm90UHBwRHdvRjRTM2VxVlo0angvZkRlSVBEUC85YXZEdCtsUXk1QTNQNE40SlYzQVdrUllPcFRTTWE2b1ZUdEsvLzFiMjNVUytkMnNtZmtZZE50TWVERTNRNkRKaDZPa2tnWGxoSGdHNmY4OTdQL2NRREF4MU5GNG5tMVRKU0FGOGtsNVdkZkpXckFBOUkxVi84cDNsQUlkNWFiSmZrc2dNZkl2OUdVSG5TQmZZR0huSGlpMWNCTWZRcXorTkpUNm1IQkZMUFl3VFMyRG92bE9QQ2M0Z3UxZ1I4Q2JFMnYrNHBPdTVjLy9pZmRBYytrZjZNNVpzempuRFVDZUF1QXFZQS91V0NRdTgwQStEUGZmMFRhZS9CQTFILzFWMzdXd0p0R2k5K0d1STZuWnlHMEEwcUVhQXdka2h0dDRQbGVwb2tJOEkxQStpVEExNkY0dkhjRTUvc0NIaUhoWHpLOGZLZ3dId2RlMG1WSzRJWFdRUUtQZmg3TXZWbWtuWkFlWmp3d0QzMTRqZHQvMzU1bmZ1anVSZUFSMGJYa1hQcEwrV0diNFZhMk5wTkxRMnZRVUdNS0dLN01DeW1RNVc0WlFFSGdoM21LejRlWmd0TzVMSzFlcVZwUWgzTnA3NU1Banp5dis3L3lOMy9GaHgwQnIzblRENnZ5RHZDYjYza0ZKSXFCSDY3QTQyT2lxVjA4dk8wVmVCeHNpc01ITlhsUWIwZjdsTDFMUHU4aThJS3Q4VHZLQkFnYUFqeGo2Ly90QlZ0TnRWLzZCVzhqSTV0dTZ0OFU2UUp2TXVEQnUrNk1xRmVIK1R2dGtOS2FjeHRuU1p4RVJvc2VidnVVTG9GSElFc09SN3B4OEVuazRtTCtoWWNmRXZDeGhHby9QeDU4bXpwcEJJMGhKWWJqeG5sVHYzQTNpNWVXTjI1aTRFbWVCWFVsMG92MkhvQzNpeGZ4S3cycmJheEpMMnNEcjltL1grQnRrME40UkdncjYxN2RHbzJlZTJiTkx6NGw0Q1dFNFNUaWZ1T1VnV1JldERXQ1JqZHdEVTQzT3FVeElBUzh4cGxVZDFucEk5cUlSWEtYUHZyN25OZ2Q4UHlHY1dWUUF5dzRwemRzaXU2QlIzV1grTVh3WGtkbWp1WVV4cjJBNXdHb3cxTFNPS1VRMVg3MjBDZ0IyeER2N2JrL05rTUplQ24vUlhVL0xNNVhiRGU2REI2Qmo2T3VPK0ExU0R3MXgrZm9wcU8zb2Y5M0NUd2lIUmNkYnJrQ29SenBnTjJVMGpieVI2WHU0dHgrVk1EcmVXRFZMNldYVTNnYkViUHRod2ZrRFFzL3FGdEdnTC93MElORGdFMWNIUmp3VXVuUHYvdGQvUUJ2S2UycE9SN2M4ZWtHWGlwaEI4Q1BEcHY1Z3RiblJ5Nm5rNElBVndKZXpoZzZ0QkdpYzYydU43eXZqV2VzSzBSVVJJM1V0aGt2NENYU053aTh2UFM5QUE5K2pjY2R0K1RiUWtYNi9IWUN6MWxJL3FCT0R2eU5ub0VybE4vUndLT2h0WU5uNENwNXJoaCtlenlWT2FJOUNGWWJxZmE2NzYxTnNETVIzbkdublpOdHNOdVI2bVhaakVUOVhJR1ArMDNjUmp0cjFHZmJnTWRvUjk5ZWVsbEg2VmU3TWRnejhCYTJscG1Dazg3UzB6UmM1TkwzdzlNc00vN1FWeCtxQTJ4QXJuejFUUUR2aHZWT0g5MC9jOEhNZ1ova05xUm1ialB3Z2h3cHJXeVpzRUp1Ly95NFVMK0FsN2lXdlMyMjZhWVl2aDZoekFUTkVicm1aTUFYMUt0QU9wQ3J5TVJHZ1hmNmpmejJNd2RldWxqYytOSUFXNnF1dDlYK3ZyMzA0L0x3ZUR2aUl1Z0ZiZUNGSDY4WFRUaUJMVDBmdkcwQzJFWm9tOWtyQVA5Nzc3K1c3azd6aWpSek9BUGdhYXlaY1ViOWpJR1hMalpSeGNlTmxkeEs0QzJ1d2RzalEvT3V4YmpkY25UVDlMRSs0Rjk4NUFQMnhzMGVlS3o2cFpiOFRnS2Z3RWRzL25aYUxqQWJlTXRrcTIxSTllcGNEd1VaQWpyRmMwUjhCTGdkMnJzb1hWNzN6b0NucWRCVkY4QzNzeHZqYWJuMjh5ZncwenZ0N0tWdnhGcnRpYTNYTURTOGZjUC95bUJiWFc0VTFJczN6cHduOEIwNjdYajBDWHdJZU54dks0YmxvRnJBSzZGRklwZnBQSmc4QStRNnBUR1hDM2haQklHVnFoc0FQb0Z2RElNVkU2SVRlRisydmJxbW5iSHYzeHFRQWsvRnMwQmhzdW50NHdweTZyWXJYaXg2WlozdTdwVXRDZnhtRW0rQ2l4VGRvb3N5RTNoYjRPUDlkcGo5K3EwRnZBd3RFY2duYlZtOWlMZW1nT2FzNzNUMzBBcTIvb0VuOXE3cTlMTUZYZ01qdnVxaHNXakNIUko0cjQxZGRmR01JbVNISWd1WWVhMEV1MGFWdTNwUzRJbkc2dUV3akw2OHAvekxPKzR6NTlzSnZBdlh3di9NZ2VmcHI3NTR4Z3BDQWgrc2RZUFFIcmM4OW11UGZWekFONXh3NElyMGJzdHFUZitnemhYaTYyRmUrZFFuTE9oc3BXOGg4S1RROTVWNG8ybTlQT2pSeTJPSEV4UDQxbHBhTGJZWlVRQURVWC8yeDQ0WitHVXIySmJLYXJuZnl1djJNeHRXcWlMU0VleE9RUWxyeFpEVEYvQ2sxaktwMFZOLzh1eUJ0L1lYcUZGbmk2OWhHQ2J3alRWelRyT05yN2UvK0tHSFhlS3FhVzRWRXlDaXd0VlN2Uzc1dnNqNW91TjlNYmNjSk5vcnhsbFNEczhDYkc3QWkvT3lnYXhtTjVXcG5qbnc0TDFZVnBDejJwSkEvYTBuSnZEeDhqaU5JcGJsVHJTRGxhcldCcWRrcTJGTnZjQ21tbEMvamplT3NoQ0xaV0hBQTBqRURFUlZuV2NDL1BpRG0rVHY2Z1Y0emV6dElwYlkvSm9kbklLVndNZFY5TkNoNkwzcjBrZXR0U0swZzNhYW9yV1YxLzFxOFFuSDBpdVlMZnFhUisvQXl6UGZBZkJqQzRvM292Y0pmRlRPeHhiaFd2TVBBKytrVi9uZTR1UGczRS9kR3cra3c3emxmS0E0SEJucFBRTFB2UlhscFNQZ0plY0RlODRFTlA4RVBoNWFSNW1QQ1BaU05pc012R0l3MXNUaW9SZm9IUkZnZzB4RWZRUjFla29abmpudzNETzNoSmRSbGEzNkFkNXFJUFk1SkM5Rm5XN3k3YzBGK080YWJqa3NjMmFXb3VkcnZUMm9IOGhta2s2RExaeTNVVytMZXJ6V3JCNlR3T2N0d0lDdXBmcjJOb0MvYWhBZG0rKzJuMlVuRDV3MVVnbDV5NGY4bDFFZjNSTDRHV3dYM1VoM3p6WnI0TE1sOENNNE4rcUphQUtmd0c4aDhJMTA5NzViQXAvQUovRE9tVW5WdlgvZ3N5WHdZZFc5ZjlRVCtHd0p2RG12VjZydWRNMTVBcDh0Z1k4NjN0TkVUK0MzcVNYdzF0NVRkVS9ndDdvbDhGVzYrNzEzSnVvSi9GYTJCSjZXZ2ZRRWZudGJBbit5Qmg3VWsvTUVmcHRiU3ZpN2J0azVkbnRKZDAvVUUvZ0Vma3NGKzNmZmRQTG96YWZ1dmdYeGpxMmVKbm9DbiswTlc0bjZTMy8yNFN2LytjeXdsbzQxekZlZS9mZjJJR09kTml2VldNczVWSkpsalpwV2RHYWJGL0RaRXZqbmYvczkxMXN3ZjczaEJkV3d2ZThwekFKMTZjZ3lIZERaSzFXekpmQUpmRjJnaW1YcUxGWlh5Um9rTUo5UXJJS3lGaFMwV2VsYmp0eUVvZjdTeC83SXlDNERIblJWZVVMQUQ1TkN1Nzd5VmpldjJHZkswNHA5S2xMeVgzU1lDdmdMNzMzdzFiLzdOTXZMNjFJVGFHcDhRaGtpRlJyTU5ndmdZUmpPSlc4YkJ6TkMyVnNtcnJyRCtWVVBQRmI2OTl4MjRkY2ZhRjkvM3hFODZQQnQ0RlZoVnNKLzZ4dlRJcHd2ZllKTW5lTnE3TGd5NzluOUZTNVhmWTZYa1FrZlRDZ0ovSmdHNnVQS1RpTHpLVm5UNXJ5Z2Z1b3E2cmVlZXN0MzdMejFkcFdqS3dOaWtBTVhIbnJ3eWpQL3RHOWhLVWtxOVBaQnBKY2lNd2s4b2p2KytNclBPRnJVVTk5eU5USmRrdFJIQWorRGFwTSttQ2tvWW5YOW9Qck4xemgvNDVBOEI5dU5QWDJJdlJPTld4eGVTS1RnTUlWL2plbnRSOTNUNG5xWmR6SFA4V1M2Y0oyUEJINWFjMTJiUTVXREQ5bmdIWTJkNlVDVjVMSGg5OVVGK0M5eFhsUjNZbXlnVGx3OXNBR3pnTGZxMk43a3JMUjAydFhBbzlnajhKbis2cCtSQXBXeWpFclBVYlM3Nm50UjAxVDFmYVBBSi9EZU1jSXFPcHd2UFpIcHdOZ1g1by9jZk9xdXE2cDdRUjNPNnd4WmxaZldNeFB3YmNHVnZ2RTI4QUJjT0k5cjQvR2dwaHdFd0ErdURTOTlLU0FaQjM0dEdDZndpUEgybmxEdGh1bXVLekFGWEhqUHp6YzRGL0RhSENvS3ZIY3B6K1lkSUJIakk3aGxDaGl4Z1RRTy8zUDNuMWc5TE1la2tNQlBEcnozY3BkOEhxRWppSG0yVlk3OEdhaDVjZUE5T2hQNDZlSjIybllpY29vOEtWUEY0UmtHQ2Z5RXdOdDBYNUYydk81RmRULzdJOThMNURlNkk3ZjZSNEJuT0Nid2t6ZUY2Ry9JUVFENThEOHQ4Qm9TMlNiYmVVWWJ2OFJPTElGMHJQUmJUdDN6N1RqZVQ3M3VqWlBMbmRRTG5IQUpmSTh1L1loNDErN1Jjd2MrZ2Njbko4TWJ6VHkwc3VYSTY0NzN0OXoydXRkOWo0bU9TOFlNSi9CYkJ6eUVPM2x4T3VCSnhFamcxd0k4OHJ6dHFEUHFSNFlBbTZKcjJyQk51N2gyRER6K2FseGZ1S01VZk9KN2NTV1VpR0Q4VWtERmliVnM1QzBlTW9LRk13SStrSUJjL3hyOFBoTUNMejh1d2J4dkFaZ1AxVzJOd0NQU0crSzk0cnhTM1F2cXg0WWJiYzdRM3FmZENsdmtBUGdTZUk4ZjlGOTlrMFlnaFBOSVVpbzlsNkxlem0rZFE0NUEvY2Z5dXRGVHVVeW85K3NEbmhEZDlyRXR2QUVLaTVpUUZueVY5Tk1KZ2JjK2IrdmQ2ZTUxenN6dDB0NkQyekJEZUhmQTAyMzAxeTNHcm9JN3lkT3RHTU1iYWJiSm0vcThuUE1KZkp0d0kzTnNMK1R3ZGMrdHlGUldsL0F2SDlKNWV1QkptS2xIMjVBU082UzdjeE9CUVBweXJaN24xeEh3eUNzTDlySEFpNDNnd1FTeGtZaTlYTzdCb0QzMnlPVEFjOWt0QUg1ZlNZN1VSRWNHS3lBbnNBWGhzQVp4ZGN5TEtXQXR3TXMvano1L2JRWGJyWVBYZmZSZnE2V1JIUUV2MmdzQURPdjZtdWkwWU1tNDU3OGF3Tk5uVVcrdjgxdDV3VnNsdDVxM3RUY3ZOQWIrb0FHdjZZay81L0lYUGwvTFo0WUJiN0hEa1FIamdDZksweS9rVEh3UURrcVZHUDgydE9ZQ2VXa0dFL041VGNEWHViUzhMcXA3amJwRSttaXRqR096VHJzMjhHMU5IdFFiK1BGZm5DTGdGYmlLZ0NRTG43Y0hLZHZMZmNhL1duTnIrV09YT2lsWURCK2t0N2s2YTNkV0c3bExobHRYeCsxMWQ5SFZLODdiWUI1ZEcvQjdKTStaazJnYXEzRGU5dHN4d2M4ZmVBU2RodGNJaTFvTXh5L0ZUU3FiZmEwaUhjbk1YQ2JsSWtLN2ZpVlE1NU5HYlFLRmJJb0hOMjRQdHVHSC9JUEZmbjlySERGZUdlUUQ1RzNDMXcrOEhISmVsT28vWnRYY0NWbGljd1hlM2VLYWJkeVB6WmZHVHZHM1Q5VUNLRjRLK2c1a1hrWFd4b3BTa0o1d3FSd1h2UFNSUnpaaWtCZGhYaVE1dWpyYU9Da3FiY0lQQW5oeHpwMXhmeTg4L0ZDYnRPMEh2c21iTHp0ZXZBZHRjcnNQZkFQVEErL2FJZkdpR2pKNTZsbmo1Yi84NlBsZitPbml0QU5zRk8rdmY4WFRBWjlNdmphV0wxb0w1Q0pjdXZwUklDOWl2SEJ1MUE4YWVISE9MUTRCdGhjKytMNEVYa3RFSjZ5S0ErUTFFaU5jNVJ3SEtlRkxaYnRWQXBiYy9QVzg5RGp0NG55aW9qTmFhSXU2T3VZQXdoeGZRSEVKNitDLzFrTDQ0RlF2a0NQSnY4bTVDZDhBOE9LOExFb3ZPVE4xR3F6bTBRUWVRVGRWVlJ4WnVieU4xNFN6R1g5UXdNY1Zld01meTZVWDh4anpxdzh3WWErRkcyRzhlU0dEWEY2M1d5Q29iWkJ2REhqUlh0ZU5rNGt1NEprMTF3bzhjL1BNZ1ErWTNDT1ZYbmNJQTgvYjlTMkdMZVZ1aHNpaXRQUVk4TzR2NE51Qm05WEwxM0lGTVIrV1d6YklTL3lzRVI1WG13ZndyaWYxeHBJYmQ3MzViT3J5UVBiU2R4Q1dHMXN6S3k0RHh4OVRBOStPTE1ZamlQN3J3cW0xcU55VHl4aXVHVkljUlBpZTRObFZYUjJuZXEyb0MvWDVBVjgyWmxLNnU2VzZXOXlQc3ZWeCtHbEZLMkt6SCtDVmU5TTJLQVM4STNrQ3ZwMk9aUm16K2toekFOamg4UjJsc2paMTlUa0N2NWp1ZmtPQmRMbFBKd1hlajNiR3dFOWZKSSt2NndSNHozb2lPUUk4dWtBY2VDWGh1Y05JSWYrbzNJR0xCdmtBK1NESkc0VFBGL2ppall0enJrYnNmVTFKeTh5eVV0N21DWHdDMzA0ckRqb2F3c0Ric3pOSjVPemNUeDczRUFLSElUemVUb0RwQzNpdFZJM1Nic2ZwOUg0N1psbkhTL29CZm5YM3VHK3YyNDByZ0hrbXdMY1RZT3BydnZyWlR4VkZ2VzJRZHdsOGZCRmJzRkxGbWd4NGdpVXpCeDR2M2VxaXRmTXEyZzJZN2VTemczUDl3SXR3clMzZEEveG5QdGttdkcvZ1Yyd3k0NUhNayt2ejNraXNCNmNkZ201QzRDR2tkK0RWQ05mNzk0d0RQMExBSEtOVmEwc1g4dFgzQXYrWUVVcmdyWHRQS2VUdEdrQ2Zuei93TURuZFlqWHJDN3pkSXVBZGhzRHNIK2UwNDNXazBoT2NEK0Z4TzlWZGR0azFseFA0UmxuNDFWUHVsTS9qR2FTWFRMdlZWNlFyTFI4OE9yVGhsU1BvYmxKaFJvVGxlTmJDdXhMalE1WmJCWGxsa0d2djAvcG00RCtCRHduNTFkMzEyT284VVYrcUUrRDVmUFZrdSttbmo4MTU2Ym50UnE2T2Zxc0E4QjVwNU1rcGxWVUx5Q1hKZzJVZDNDR0JYK3BqQTFvZXhnamE1UkdROWQ3WGFqbVhwaHhmTWNySnA3TnQ3VGg4YkRsZ0FmNHdKTGQxU1Y1ZmsrVERvaFNGeDhlVWFXTVBwUVErNUdZRDhsWFdHRE5CeURUZ0xWTkFGOEI3RUkvZk9Obmxic1k1QXJINW1TOG1FZGZjeHNTWmRwNGQvQlFLOElzR3VUdzdMLzM1SDU0NldnaTNvZzYwVmZYa1ZzTmMxNjRLN0hHWXdJOWNoMUJFTkhQQlVzR3VXSXQwaFBrRDM2Q1V0NHpzcGZXbjZUTzZXcFlvNGxaMWs2TmJ1WDh1cFMrTjFOWGxWaU1UaXBoLzdwMXYzN252emlMaDYrRFo1UzgrcFEzSXpYblZpbVlPekV2M0xLYm5TUDk4QWkvbWhUMHBPc1VhMTNiZldpRmoyanNEWG9MTGxTZHJEWi9YZkRLTWVBRXZTMTdyVDFVUHN5eGM0NjdxemxNQnIrWHV1ay90RHg5VWJkcno0KzRUajEvNGpWOHM0ZkV2Lzl5UEk4bWhWM0s0N1ZlckRYS2tQY1hVd1h2Z25MZDh5RVVXdHpZUFE1WEFXek1mZjJER20vWnVnQjlmV05yQUc0bjRNVDN3OFNOT3V3MkJ3S0ZxNkkwV3ZJNVVCbHNCQ1h6YzkwYU83Yml4WWx6N0E5NHE3dXBKNzdHU2I5WUNBR2tEd0xlTkRyVVRiK0s1b01BLy83NTNCMzhyeS9ZSmdMZWpMb0VmNzhiRHk0SnlIcXdpeUJ4aGE3OW40SU4xbCtOR3NoYWNOMUQzMWRwdHRmMnRwUE8zdkJVbi9wOXcybFczM0wxMzdCeW5IZDc1UHRyVjVTdnl5ZWtvK3hvRmhUQ21lSzJ4TjQ0clgzcGFNMGdDdjJvckpjU0kyMG5WUjNYblEvaGMzOFlnQW40akRmYTBrMlNCdk93QWlTSndRNWZDV0lCQUNYemVjalU0WDEycXQ3OTMyTVJTKzJIV0cyT0k4QnB5MmpYSUI5KzdoY1R1azUrbjNua3Qwakd0U1l3Sk9NL3RrOE5weHh6QjZZS2ZUK0NjLzlVMUUvZ08yZ3lCenpad1hoRitPTHc2NnhDK09vSnQ4MElvZ1UvZ3MwbVkxN3A2VWRUYmtDZndDWHdDM3h2aGdweW1oU3NKZkFLZndQZlQyZ1o1Z2J4QmVBS2Z3Q2Z3SFVweVdrVjRnKzBFUG9GUDRMdHFJbnlJbkZXNmVnS2Z3Q2Z3dmV2cXRhSnVYYjFOZUFLZndDZnduVUF1U2Q0Z1BJRlA0QlA0VG9ObmxVSGVaanVCVCtBVCtONElWNWFiZGZVRVBvRlA0UHNtdkFHNWZwd0VQb0ZQNER2TVk2M1RZTnJoOFFRK2dVL2dlK1c4SXJ5QmR3TGZXVXZnRS9oV2xwdFFUK0FUK0FTK1IydThWNE04Z1UvZ0UvZzQ1SlZydlJFZTc2a2w4QWw4QXY5ZDRsd0crVllRbnNBbjhBbThnMmRkaE1jVCtBUStnUitmeXFvRjVQMFNuc0FuOEFtOERQSkdlUHhZRXA3QUovQ2RBZy9rZHJtbG9yNU53Q2Z3Q2J5ejNPWnJrQ2Z3Q2Z6L0FTSXVLWGd2RndHSkFBQUFBRWxGVGtTdVFtQ0MnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlSW5kZXg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVJbWFnZXNbdGhpcy5zYW1wbGVJbmRleF07XHJcbiAgICBcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBpbWFnZVVybDogdGhpcy5zYW1wbGVEYXRhIH0gfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlSW5kZXgrKzsgXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNhbXBsZUluZGV4ID49IHRoaXMuc2FtcGxlSW1hZ2VzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYW1wbGVJbmRleCA9IDA7IFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlSW1hZ2VzW3RoaXMuc2FtcGxlSW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFJpY2h0ZXh0RGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiUmljaHRleHREYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlJpY2h0ZXh0IGRhdGFcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWyd0ZXh0Ym94JyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGE6IHN0cmluZ1tdID0gW1wiRXhhbXBsZSBUZXh0XCIsXHJcbiAgICAgICAgICAgIFwiY29tcGFueSdzIGRhdGFcIixcclxuICAgICAgICAgICAgXCJQb3dlciBCSVwiLFxyXG4gICAgICAgICAgICBcInZpc3VhbGl6YXRpb25cIixcclxuICAgICAgICAgICAgXCJzcG90IHRyZW5kc1wiLFxyXG4gICAgICAgICAgICBcImNoYXJ0c1wiLFxyXG4gICAgICAgICAgICBcInNpbXBsZSBkcmFnLWFuZC1kcm9wIGdlc3R1cmVzXCIsXHJcbiAgICAgICAgICAgIFwicGVyc29uYWxpemVkIGRhc2hib2FyZHNcIiAgICAgICAgICAgICAgICBcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZVNpbmdsZURhdGEgPSB0aGlzLnNhbXBsZURhdGFbMF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlVGV4dFN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250RmFtaWx5OiBcIkhlYWRpbmdcIixcclxuICAgICAgICAgICAgZm9udFNpemU6IFwiMjRweFwiLFxyXG4gICAgICAgICAgICB0ZXh0RGVjb3JhdGlvbjogXCJ1bmRlcmxpbmVcIixcclxuICAgICAgICAgICAgZm9udFdlaWdodDogXCIzMDBcIixcclxuICAgICAgICAgICAgZm9udFN0eWxlOiBcIml0YWxpY1wiLFxyXG4gICAgICAgICAgICBmbG9hdDogXCJsZWZ0XCJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG4gICAgICAgICAgICAvLyAxIHBhcmFncmFwaHMsIHdpdGggZm9ybWF0dGluZ1xyXG4gICAgICAgICAgICB2YXIgcGFyYWdyYXBoczogUGFyYWdyYXBoQ29udGV4dFtdID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWxUZXh0QWxpZ25tZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHRleHRSdW5zOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdGhpcy5zYW1wbGVTaW5nbGVEYXRhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0U3R5bGU6IHRoaXMuc2FtcGxlVGV4dFN0eWxlXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH1dO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnVpbGRQYXJhZ3JhcGhzRGF0YVZpZXcocGFyYWdyYXBocyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIGJ1aWxkUGFyYWdyYXBoc0RhdGFWaWV3KHBhcmFncmFwaHM6IHBvd2VyYmkudmlzdWFscy5QYXJhZ3JhcGhDb250ZXh0W10pOiBwb3dlcmJpLkRhdGFWaWV3W10ge1xyXG4gICAgICAgICAgICByZXR1cm4gW3sgbWV0YWRhdGE6IHsgY29sdW1uczogW10sIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBwYXJhZ3JhcGhzOiBwYXJhZ3JhcGhzIH0gfSB9IH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlU2luZ2xlRGF0YSA9IHRoaXMucmFuZG9tRWxlbWVudCh0aGlzLnNhbXBsZURhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZVRleHRTdHlsZS5mb250U2l6ZSA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMTIsIDQwKSArIFwicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVUZXh0U3R5bGUuZm9udFdlaWdodCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMzAwLCA3MDApLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcclxuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgU2FsZXNCeUNvdW50cnlEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xyXG5cclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTYWxlc0J5Q291bnRyeURhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU2FsZXMgQnkgQ291bnRyeVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2RlZmF1bHQnXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gW1xyXG4gICAgICAgICAgICBbNzQyNzMxLjQzLCAxNjIwNjYuNDMsIDI4MzA4NS43OCwgMzAwMjYzLjQ5LCAzNzYwNzQuNTcsIDgxNDcyNC4zNF0sXHJcbiAgICAgICAgICAgIFsxMjM0NTUuNDMsIDQwNTY2LjQzLCAyMDA0NTcuNzgsIDUwMDAuNDksIDMyMDAwMC41NywgNDUwMDAwLjM0XVxyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNaW46IG51bWJlciA9IDMwMDAwO1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWF4OiBudW1iZXIgPSAxMDAwMDAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZVNpbmdsZURhdGE6IG51bWJlciA9IDU1OTQzLjY3O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG5cclxuICAgICAgICAgICAgdmFyIGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJ0YWJsZTFcIiwgY29sdW1uOiBcImNvdW50cnlcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeVZhbHVlcyA9IFtcIkF1c3RyYWxpYVwiLCBcIkNhbmFkYVwiLCBcIkZyYW5jZVwiLCBcIkdlcm1hbnlcIiwgXCJVbml0ZWQgS2luZ2RvbVwiLCBcIlVuaXRlZCBTdGF0ZXNcIl07XHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvd2VyYmkuZGF0YS5jcmVhdGVEYXRhVmlld1Njb3BlSWRlbnRpdHkoZXhwcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNZXRhZGF0YSwgZGVzY3JpYmVzIHRoZSBkYXRhIGNvbHVtbnMsIGFuZCBwcm92aWRlcyB0aGUgdmlzdWFsIHdpdGggaGludHNcclxuICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRlY2lkZSBob3cgdG8gYmVzdCByZXByZXNlbnQgdGhlIGRhdGFcclxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQ291bnRyeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ0NvdW50cnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTYWxlcyBBbW91bnQgKDIwMTQpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogeyBkYXRhUG9pbnQ6IHsgZmlsbDogeyBzb2xpZDogeyBjb2xvcjogJ3B1cnBsZScgfSB9IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTYWxlcyBBbW91bnQgKDIwMTUpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhbGVzIEFtb3VudCBmb3IgMjAxNFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhWzBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1syXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTVcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuc2FtcGxlRGF0YVsxXSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVmFsdWVzOiBEYXRhVmlld1ZhbHVlQ29sdW1ucyA9IERhdGFWaWV3VHJhbnNmb3JtLmNyZWF0ZVZhbHVlQ29sdW1ucyhjb2x1bW5zKTtcclxuICAgICAgICAgICAgdmFyIHRhYmxlRGF0YVZhbHVlcyA9IGNhdGVnb3J5VmFsdWVzLm1hcChmdW5jdGlvbiAoY291bnRyeU5hbWUsIGlkeCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtjb3VudHJ5TmFtZSwgY29sdW1uc1swXS52YWx1ZXNbaWR4XSwgY29sdW1uc1sxXS52YWx1ZXNbaWR4XV07XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZGF0YVZpZXdNZXRhZGF0YSxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5OiBjYXRlZ29yeUlkZW50aXRpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiB0YWJsZURhdGFWYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgY29sdW1uczogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNpbmdsZTogeyB2YWx1ZTogdGhpcy5zYW1wbGVTaW5nbGVEYXRhIH1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4sIHRoaXMuc2FtcGxlTWF4KSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVTaW5nbGVEYXRhID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbiwgdGhpcy5zYW1wbGVNYXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgRGF0YVZpZXdUcmFuc2Zvcm0gPSBwb3dlcmJpLmRhdGEuRGF0YVZpZXdUcmFuc2Zvcm07XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBTYWxlc0J5RGF5T2ZXZWVrRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2FsZXNCeURheU9mV2Vla0RhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU2FsZXMgYnkgZGF5IG9mIHdlZWtcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWydjb21ib0NoYXJ0JyxcclxuICAgICAgICAgICAgJ2RhdGFEb3RDbHVzdGVyZWRDb2x1bW5Db21ib0NoYXJ0JyxcclxuICAgICAgICAgICAgJ2RhdGFEb3RTdGFja2VkQ29sdW1uQ29tYm9DaGFydCcsXHJcbiAgICAgICAgICAgICdsaW5lU3RhY2tlZENvbHVtbkNvbWJvQ2hhcnQnLFxyXG4gICAgICAgICAgICAnbGluZUNsdXN0ZXJlZENvbHVtbkNvbWJvQ2hhcnQnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGExID0gW1xyXG4gICAgICAgICAgICBbNzQyNzMxLjQzLCAxNjIwNjYuNDMsIDI4MzA4NS43OCwgMzAwMjYzLjQ5LCAzNzYwNzQuNTcsIDgxNDcyNC4zNF0sXHJcbiAgICAgICAgICAgIFsxMjM0NTUuNDMsIDQwNTY2LjQzLCAyMDA0NTcuNzgsIDUwMDAuNDksIDMyMDAwMC41NywgNDUwMDAwLjM0XVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluMTogbnVtYmVyID0gMzAwMDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXgxOiBudW1iZXIgPSAxMDAwMDAwO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGEyID0gW1xyXG4gICAgICAgICAgICBbMzEsIDE3LCAyNCwgMzAsIDM3LCA0MCwgMTJdLFxyXG4gICAgICAgICAgICBbMzAsIDM1LCAyMCwgMjUsIDMyLCAzNSwgMTVdXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNaW4yOiBudW1iZXIgPSAxMDtcclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1heDI6IG51bWJlciA9IDQ1O1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG4gICAgICAgICAgICAvL2ZpcnN0IGRhdGFWaWV3IC0gU2FsZXMgYnkgZGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgdmFyIGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJ0YWJsZTFcIiwgY29sdW1uOiBcImRheSBvZiB3ZWVrXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlWYWx1ZXMgPSBbXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiLCBcIlN1bmRheVwiXTtcclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5SWRlbnRpdGllcyA9IGNhdGVnb3J5VmFsdWVzLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleHByID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZXF1YWwoZmllbGRFeHByLCBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci50ZXh0KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG93ZXJiaS5kYXRhLmNyZWF0ZURhdGFWaWV3U2NvcGVJZGVudGl0eShleHByKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIE1ldGFkYXRhLCBkZXNjcmliZXMgdGhlIGRhdGEgY29sdW1ucywgYW5kIHByb3ZpZGVzIHRoZSB2aXN1YWwgd2l0aCBoaW50c1xyXG4gICAgICAgICAgICAvLyBzbyBpdCBjYW4gZGVjaWRlIGhvdyB0byBiZXN0IHJlcHJlc2VudCB0aGUgZGF0YVxyXG4gICAgICAgICAgICB2YXIgZGF0YVZpZXdNZXRhZGF0YTogcG93ZXJiaS5EYXRhVmlld01ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdEYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmV2aW91cyB3ZWVrIHNhbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogeyBkYXRhUG9pbnQ6IHsgZmlsbDogeyBzb2xpZDogeyBjb2xvcjogJ3B1cnBsZScgfSB9IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdUaGlzIHdlZWsgc2FsZXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogXCIkMCwwMDAuMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAnc2FsZXMyJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGExWzBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1syXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTVcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuc2FtcGxlRGF0YTFbMV0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XHJcbiAgICAgICAgICAgIHZhciB0YWJsZURhdGFWYWx1ZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKGRheU5hbWUsIGlkeCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtkYXlOYW1lLCBjb2x1bW5zWzBdLnZhbHVlc1tpZHhdLCBjb2x1bW5zWzFdLnZhbHVlc1tpZHhdXTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIC8vZmlyc3QgZGF0YVZpZXcgLSBTYWxlcyBieSBkYXkgb2Ygd2VlayBFTkRcclxuXHJcbiAgICAgICAgICAgIC8vc2Vjb25kIGRhdGFWaWV3IC0gVGVtcGVyYXR1cmUgYnkgZGF5IG9mIHdlZWtcclxuICAgICAgICAgICAgdmFyIGZpZWxkRXhwclRlbXAgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5maWVsZERlZih7IHNjaGVtYTogJ3MnLCBlbnRpdHk6IFwidGFibGUyXCIsIGNvbHVtbjogXCJkYXkgb2Ygd2Vla1wiIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5VmFsdWVzVGVtcCA9IFtcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCIsIFwiU3VuZGF5XCJdO1xyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlJZGVudGl0aWVzVGVtcCA9IGNhdGVnb3J5VmFsdWVzVGVtcC5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwclRlbXAgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHJUZW1wLCBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci50ZXh0KHZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG93ZXJiaS5kYXRhLmNyZWF0ZURhdGFWaWV3U2NvcGVJZGVudGl0eShleHByVGVtcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNZXRhZGF0YSwgZGVzY3JpYmVzIHRoZSBkYXRhIGNvbHVtbnMsIGFuZCBwcm92aWRlcyB0aGUgdmlzdWFsIHdpdGggaGludHNcclxuICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRlY2lkZSBob3cgdG8gYmVzdCByZXByZXNlbnQgdGhlIGRhdGFcclxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGFUZW1wOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ0RheScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgdGV4dDogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1ByZXZpb3VzIHdlZWsgdGVtcGVyYXR1cmUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3RlbXAxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL29iamVjdHM6IHsgZGF0YVBvaW50OiB7IGZpbGw6IHsgc29saWQ6IHsgY29sb3I6ICdwdXJwbGUnIH0gfSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVGhpcyB3ZWVrIHRlbXBlcmF0dXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICd0ZW1wMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zVGVtcCA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLmNvbHVtbnNbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcGVyYXR1cmUgcHJldiB3ZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGEyWzBdLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLmNvbHVtbnNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGVtcGVyYXR1cmUgdGhpcyB3ZWVrXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGEyWzFdLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZXNUZW1wOiBEYXRhVmlld1ZhbHVlQ29sdW1ucyA9IERhdGFWaWV3VHJhbnNmb3JtLmNyZWF0ZVZhbHVlQ29sdW1ucyhjb2x1bW5zVGVtcCk7XHJcbiAgICAgICAgICAgIHZhciB0YWJsZURhdGFWYWx1ZXNUZW1wID0gY2F0ZWdvcnlWYWx1ZXNUZW1wLm1hcChmdW5jdGlvbiAoZGF5TmFtZSwgaWR4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW2RheU5hbWUsIGNvbHVtbnNUZW1wWzBdLnZhbHVlc1tpZHhdLCBjb2x1bW5zVGVtcFsxXS52YWx1ZXNbaWR4XV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2ZpcnN0IGRhdGFWaWV3IC0gU2FsZXMgYnkgZGF5IG9mIHdlZWsgRU5EXHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IGRhdGFWaWV3TWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGNhdGVnb3J5VmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogZGF0YVZhbHVlc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogdGFibGVEYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1ucyxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLmNvbHVtbnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXNUZW1wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzVGVtcCxcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGRhdGFWYWx1ZXNUZW1wXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiB0YWJsZURhdGFWYWx1ZXNUZW1wLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGRhdGFWaWV3TWV0YWRhdGFUZW1wLmNvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YTEgPSB0aGlzLnNhbXBsZURhdGExLm1hcCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWFwKCgpID0+IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4xLCB0aGlzLnNhbXBsZU1heDEpKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEyID0gdGhpcy5zYW1wbGVEYXRhMi5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluMiwgdGhpcy5zYW1wbGVNYXgyKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgRGF0YVZpZXdUcmFuc2Zvcm0gPSBwb3dlcmJpLmRhdGEuRGF0YVZpZXdUcmFuc2Zvcm07XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNpbXBsZUZ1bm5lbERhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlNpbXBsZUZ1bm5lbERhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU2ltcGxlIGZ1bm5lbCBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnZnVubmVsJ107XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YSA9IFs4MTQ3MjQuMzQsIDc0MjczMS40MywgMzc2MDc0LjU3LCAyMDAyNjMuNDksIDE0MDA2My40OSwgOTYwNjYuNDNdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluOiBudW1iZXIgPSAzMDAwO1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWF4OiBudW1iZXIgPSAxMDAwMDAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJmdW5uZWxcIiwgY29sdW1uOiBcImNvdW50cnlcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeVZhbHVlcyA9IFtcIkF1c3RyYWxpYVwiLCBcIkNhbmFkYVwiLCBcIkZyYW5jZVwiLCBcIkdlcm1hbnlcIiwgXCJVbml0ZWQgS2luZ2RvbVwiLCBcIlVuaXRlZCBTdGF0ZXNcIl07XHJcbiAgICAgICAgICAgIGxldCBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvd2VyYmkuZGF0YS5jcmVhdGVEYXRhVmlld1Njb3BlSWRlbnRpdHkoZXhwcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNZXRhZGF0YSwgZGVzY3JpYmVzIHRoZSBkYXRhIGNvbHVtbnMsIGFuZCBwcm92aWRlcyB0aGUgdmlzdWFsIHdpdGggaGludHNcclxuICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRlY2lkZSBob3cgdG8gYmVzdCByZXByZXNlbnQgdGhlIGRhdGFcclxuICAgICAgICAgICAgbGV0IGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnQ291bnRyeScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ0NvdW50cnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTYWxlcyBBbW91bnQgKDIwMTQpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogeyBkYXRhUG9pbnQ6IHsgZmlsbDogeyBzb2xpZDogeyBjb2xvcjogJ3B1cnBsZScgfSB9IH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgY29sdW1ucyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1sxXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuc2FtcGxlRGF0YSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICBsZXQgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBjYXRlZ29yeVZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllcyxcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGRhdGFWYWx1ZXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCkpO1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEuc29ydCgoYSwgYikgPT4geyByZXR1cm4gYiAtIGE7IH0pO1xyXG4gICAgICAgIH0gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcclxuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFNpbXBsZUdhdWdlRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2ltcGxlR2F1Z2VEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbXBsZSBnYXVnZSBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnZ2F1Z2UnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YTogbnVtYmVyW10gPSBbNTAsIDI1MCwgMzAwLCA1MDBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1pbjogbnVtYmVyID0gNTA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXg6IG51bWJlciA9IDE1MDA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XHJcbiAgICAgICAgICAgIGxldCBnYXVnZURhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnY29sMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdNaW5WYWx1ZSc6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnJDAnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnY29sMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdZJzogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICckMCcgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdjb2w0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXM6IHsgJ1RhcmdldFZhbHVlJzogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICckMCcgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdjb2wzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZXM6IHsgJ01heFZhbHVlJzogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICckMCcgfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgZ3JvdXBzOiBbXSxcclxuICAgICAgICAgICAgICAgIG1lYXN1cmVzOiBbMF0sXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICBzaW5nbGU6IHsgdmFsdWU6IHRoaXMuc2FtcGxlRGF0YVsxXSB9LFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IERhdGFWaWV3VHJhbnNmb3JtLmNyZWF0ZVZhbHVlQ29sdW1ucyhbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZ2F1Z2VEYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbMF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGdhdWdlRGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbdGhpcy5zYW1wbGVEYXRhWzFdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1syXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogW3RoaXMuc2FtcGxlRGF0YVsyXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZ2F1Z2VEYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbM11dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGEgLSBiOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgaW1wb3J0IFZhbHVlVHlwZSA9IHBvd2VyYmkuVmFsdWVUeXBlO1xyXG4gICAgaW1wb3J0IFByaW1pdGl2ZVR5cGUgPSBwb3dlcmJpLlByaW1pdGl2ZVR5cGU7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVNYXRyaXhEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xyXG5cclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTaW1wbGVNYXRyaXhEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbXBsZSBtYXRyaXggZGF0YVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ21hdHJpeCcsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFUeXBlTnVtYmVyID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YVR5cGVTdHJpbmcgPSBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLlRleHQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UxOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUxJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDMsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjLjAnIH0gfSB9O1xyXG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTI6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTInLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogNCwgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMuMDAnIH0gfSB9O1xyXG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTM6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTMnLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogNSwgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMnIH0gfSB9O1xyXG5cclxuICAgICAgICAgICAgdmFyIHJvd0dyb3VwU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdSb3dHcm91cDEnLCBxdWVyeU5hbWU6ICdSb3dHcm91cDEnLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDAgfTtcclxuICAgICAgICAgICAgdmFyIHJvd0dyb3VwU291cmNlMjogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdSb3dHcm91cDInLCBxdWVyeU5hbWU6ICdSb3dHcm91cDInLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDEgfTtcclxuICAgICAgICAgICAgdmFyIHJvd0dyb3VwU291cmNlMzogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdSb3dHcm91cDMnLCBxdWVyeU5hbWU6ICdSb3dHcm91cDMnLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDIgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtYXRyaXhUaHJlZU1lYXN1cmVzVGhyZWVSb3dHcm91cHM6IERhdGFWaWV3TWF0cml4ID0ge1xyXG4gICAgICAgICAgICAgICAgcm93czoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ05vcnRoIEFtZXJpY2EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDYW5hZGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ09udGFyaW8nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDEwMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDEwMDEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDEwMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1F1ZWJlYycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMTAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMTAxMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMTAxMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdVU0EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1dhc2hpbmd0b24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDExMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDExMDEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDExMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ09yZWdvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMTExMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMTExMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMTExMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnU291dGggQW1lcmljYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0JyYXppbCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQW1hem9uYXMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDIwMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDIwMDEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDIwMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ01hdG8gR3Jvc3NvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAyMDEwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAyMDExLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyOiB7IHZhbHVlOiAyMDEyLCB2YWx1ZVNvdXJjZUluZGV4OiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0NoaWxlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdBcmljYScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMjEwMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMjEwMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMjEwMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnUGFyaW5hY290YScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMjExMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMjExMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMjExMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc291cmNlczogW3Jvd0dyb3VwU291cmNlMV0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbcm93R3JvdXBTb3VyY2UyXSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHNvdXJjZXM6IFtyb3dHcm91cFNvdXJjZTNdIH1cclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgY29sdW1uczoge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGV2ZWw6IDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGV2ZWw6IDAsIGxldmVsU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbGV2ZWw6IDAsIGxldmVsU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBsZXZlbHM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYXN1cmVTb3VyY2UxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlM1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB2YWx1ZVNvdXJjZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlMSxcclxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlMixcclxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlM1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogeyBjb2x1bW5zOiBbcm93R3JvdXBTb3VyY2UxLCByb3dHcm91cFNvdXJjZTIsIHJvd0dyb3VwU291cmNlM10sIHNlZ21lbnQ6IHt9IH0sXHJcbiAgICAgICAgICAgICAgICBtYXRyaXg6IG1hdHJpeFRocmVlTWVhc3VyZXNUaHJlZVJvd0dyb3Vwc1xyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcclxuICAgIGltcG9ydCBWYWx1ZVR5cGUgPSBwb3dlcmJpLlZhbHVlVHlwZTtcclxuICAgIGltcG9ydCBQcmltaXRpdmVUeXBlID0gcG93ZXJiaS5QcmltaXRpdmVUeXBlO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU2ltcGxlVGFibGVEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xyXG5cclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTaW1wbGVUYWJsZURhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiU2ltcGxlIHRhYmxlIGRhdGFcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWyd0YWJsZScsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFUeXBlTnVtYmVyID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpO1xyXG4gICAgICAgICAgICB2YXIgZGF0YVR5cGVTdHJpbmcgPSBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLlRleHQpOyAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgdmFyIGdyb3VwU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdncm91cDEnLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDAgfTtcclxuICAgICAgICAgICAgdmFyIGdyb3VwU291cmNlMjogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdncm91cDInLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDEgfTtcclxuICAgICAgICAgICAgdmFyIGdyb3VwU291cmNlMzogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdncm91cDMnLCB0eXBlOiBkYXRhVHlwZVN0cmluZywgaW5kZXg6IDIgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMScsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiAzLCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIy4wJyB9IH0gfTtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UyOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUyJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDQsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjLjAwJyB9IH0gfTtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UzOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUzJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDUsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjJyB9IH0gfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHsgY29sdW1uczogW2dyb3VwU291cmNlMSwgbWVhc3VyZVNvdXJjZTEsIGdyb3VwU291cmNlMiwgbWVhc3VyZVNvdXJjZTIsIGdyb3VwU291cmNlMywgbWVhc3VyZVNvdXJjZTNdIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtncm91cFNvdXJjZTEsIG1lYXN1cmVTb3VyY2UxLCBncm91cFNvdXJjZTIsIG1lYXN1cmVTb3VyY2UyLCBncm91cFNvdXJjZTMsIG1lYXN1cmVTb3VyY2UzXSxcclxuICAgICAgICAgICAgICAgICAgICByb3dzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnQScsIDEwMCwgJ2FhJywgMTAxLCAnYWExJywgMTAyXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgWydBJywgMTAzLCAnYWEnLCAxMDQsICdhYTInLCAxMDVdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0EnLCAxMDYsICdhYicsIDEwNywgJ2FiMScsIDEwOF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnQicsIDEwOSwgJ2JhJywgMTEwLCAnYmExJywgMTExXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgWydCJywgMTEyLCAnYmInLCAxMTMsICdiYjEnLCAxMTRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0InLCAxMTUsICdiYicsIDExNiwgJ2JiMicsIDExN10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnQycsIDExOCwgJ2NjJywgMTE5LCAnY2MxJywgMTIwXSxcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgVGVhbVNjb3JlRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiVGVhbVNjb3JlRGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJUZWFtIHNjb3JlIGRhdGFcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWydjaGVlck1ldGVyJyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG4gICAgICAgICAgICB2YXIgZmllbGRFeHByID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZmllbGREZWYoeyBzY2hlbWE6ICdzJywgZW50aXR5OiBcInRhYmxlMVwiLCBjb2x1bW46IFwidGVhbXNcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeVZhbHVlcyA9IFtcIlNlYWhhd2tzXCIsIFwiNDllcnNcIl07XHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvd2VyYmkuZGF0YS5jcmVhdGVEYXRhVmlld1Njb3BlSWRlbnRpdHkoZXhwcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVGVhbScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ1RlYW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdWb2x1bWUnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lYXN1cmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3ZvbHVtZTEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGNvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbOTAsIDMwXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBjYXRlZ29yeVZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFQb2ludDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2xpZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiKDE2NSwgMTcyLCAxNzUpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29saWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYigxNzUsIDMwLCA0NCknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiAqICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4gKlxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuICogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4gKiAgTUlUIExpY2Vuc2VcclxuICpcclxuICogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuICogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiAqICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiAqICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiAqICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuICogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiAqICAgXHJcbiAqICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuICogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4gKiAgIFxyXG4gKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiAqICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiAqICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiAqICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4gKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuICogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuICogIFRIRSBTT0ZUV0FSRS5cclxuICovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEge1xyXG5cclxuICAgIGltcG9ydCBzYW1wbGVEYXRhVmlld3MgPSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU2FtcGxlRGF0YSB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRhdGEgPSBbXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuRmlsZVN0b3JhZ2VEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2FsZXNCeUNvdW50cnlEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2FsZXNCeURheU9mV2Vla0RhdGEoKSxcclxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5TaW1wbGVGdW5uZWxEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2ltcGxlR2F1Z2VEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2ltcGxlTWF0cml4RGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEoKVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgc2FtcGxlIGRhdGEgdmlldyBmb3IgYSB2aXN1YWxpemF0aW9uIGVsZW1lbnQgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0U2FtcGxlc0J5UGx1Z2luTmFtZShwbHVnaW5OYW1lOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzYW1wbGVzID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5oYXNQbHVnaW4ocGx1Z2luTmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNhbXBsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNhbXBsZXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGEuZmlsdGVyKChpdGVtKSA9PiBpdGVtLmhhc1BsdWdpbihcImRlZmF1bHRcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJucyBzYW1wbGVEYXRhVmlldyBJbnN0YW5jZSBmb3IgYSB2aXN1YWxpemF0aW9uIGVsZW1lbnQgc3BlY2lmaWVkLlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGF0YVZpZXdzQnlTYW1wbGVOYW1lKHNhbXBsZU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSkgPT4gKGl0ZW0uZ2V0TmFtZSgpID09PSBzYW1wbGVOYW1lKSlbMF07XHJcbiAgICAgICAgfSBcclxuICAgIH0gICAgIFxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbmludGVyZmFjZSBKUXVlcnkge1xyXG4gICAgcmVzaXphYmxlKG9wdGlvbnM6IGFueSk6IEpRdWVyeTtcclxufVxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscyB7XHJcbiAgICBcclxuICAgIGltcG9ydCBTYW1wbGVEYXRhID0gcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEuU2FtcGxlRGF0YTtcclxuXHJcbiAgICBleHBvcnQgY2xhc3MgSG9zdENvbnRyb2xzIHtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2aXN1YWxFbGVtZW50OiBJVmlzdWFsO1xyXG4gICAgICAgIHByaXZhdGUgZGF0YVZpZXdzU2VsZWN0OiBKUXVlcnk7XHJcblxyXG4gICAgICAgIC8qKiBSZXByZXNlbnRzIHNhbXBsZSBkYXRhIHZpZXdzIHVzZWQgYnkgdmlzdWFsaXphdGlvbiBlbGVtZW50cy4qL1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YVZpZXdzO1xyXG4gICAgICAgIHByaXZhdGUgYW5pbWF0aW9uX2R1cmF0aW9uOiBudW1iZXIgPSAyNTA7XHJcbiAgICAgICAgcHJpdmF0ZSBzdXBwcmVzc0FuaW1hdGlvbnM6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdXBwcmVzc0FuaW1hdGlvbnNFbGVtZW50OiBKUXVlcnk7XHJcbiAgICAgICAgcHJpdmF0ZSBhbmltYXRpb25EdXJhdGlvbkVsZW1lbnQ6IEpRdWVyeTtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHZpZXdwb3J0OiBJVmlld3BvcnQ7XHJcbiAgICAgICAgcHJpdmF0ZSBjb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBtaW5XaWR0aDogbnVtYmVyID0gMjAwO1xyXG4gICAgICAgIHByaXZhdGUgbWF4V2lkdGg6IG51bWJlciA9IDEwMDA7XHJcbiAgICAgICAgcHJpdmF0ZSBtaW5IZWlnaHQ6IG51bWJlciA9IDEwMDtcclxuICAgICAgICBwcml2YXRlIG1heEhlaWdodDogbnVtYmVyID0gNjAwO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3RvcihwYXJlbnQ6IEpRdWVyeSkge1xyXG4gICAgICAgICAgICBwYXJlbnQuZmluZCgnI3JhbmRvbWl6ZScpLm9uKCdjbGljaycsICgpID0+IHRoaXMucmFuZG9taXplKCkpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QgPSBwYXJlbnQuZmluZCgnI2RhdGFWaWV3c1NlbGVjdCcpLmZpcnN0KCk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnN1cHByZXNzQW5pbWF0aW9uc0VsZW1lbnQgPSBwYXJlbnQuZmluZCgnaW5wdXRbbmFtZT1zdXBwcmVzc0FuaW1hdGlvbnNdJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5zdXBwcmVzc0FuaW1hdGlvbnNFbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uQ2hhbmdlU3VwcHJlc3NBbmltYXRpb25zKCkpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbkVsZW1lbnQgPSBwYXJlbnQuZmluZCgnaW5wdXRbbmFtZT1hbmltYXRpb25fZHVyYXRpb25dJykuZmlyc3QoKTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EdXJhdGlvbkVsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHRoaXMub25DaGFuZ2VEdXJhdGlvbigpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzZXRFbGVtZW50KGNvbnRhaW5lcjogSlF1ZXJ5KTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIucmVzaXphYmxlKHtcclxuICAgICAgICAgICAgICAgIG1pbldpZHRoOiB0aGlzLm1pbldpZHRoLFxyXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6IHRoaXMubWF4V2lkdGgsXHJcbiAgICAgICAgICAgICAgICBtaW5IZWlnaHQ6IHRoaXMubWluSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgbWF4SGVpZ2h0OiB0aGlzLm1heEhlaWdodCxcclxuXHJcbiAgICAgICAgICAgICAgICByZXNpemU6IChldmVudCwgdWkpID0+IHRoaXMub25SZXNpemUodWkuc2l6ZSlcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLm9uUmVzaXplKHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5jb250YWluZXIuaGVpZ2h0KCksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5jb250YWluZXIud2lkdGgoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHNldFZpc3VhbCh2aXN1YWxFbGVtZW50OiBJVmlzdWFsKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudCA9IHZpc3VhbEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uUmVzaXplKHNpemU6IElWaWV3cG9ydCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXdwb3J0ID0ge1xyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBzaXplLmhlaWdodCAtIDUsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogc2l6ZS53aWR0aCAtIDE1LFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudmlzdWFsRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudmlzdWFsRWxlbWVudC51cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVZpZXdzOiB0aGlzLnNhbXBsZURhdGFWaWV3cy5nZXREYXRhVmlld3MoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VwcHJlc3NBbmltYXRpb25zOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydDogdGhpcy52aWV3cG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnZpc3VhbEVsZW1lbnQub25SZXNpemluZyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50Lm9uUmVzaXppbmcodGhpcy52aWV3cG9ydCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXRWaWV3cG9ydCgpOiBJVmlld3BvcnQge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy52aWV3cG9ydDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcmFuZG9taXplKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGFWaWV3cy5yYW5kb21pemUoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNoYW5nZUR1cmF0aW9uKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbl9kdXJhdGlvbiA9IHBhcnNlSW50KHRoaXMuYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50LnZhbCgpLCAxMCk7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2VTdXBwcmVzc0FuaW1hdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VwcHJlc3NBbmltYXRpb25zID0gdGhpcy5zdXBwcmVzc0FuaW1hdGlvbnNFbGVtZW50LnZhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmlzdWFsRWxlbWVudC51cGRhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudC51cGRhdGUoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFWaWV3czogdGhpcy5zYW1wbGVEYXRhVmlld3MuZ2V0RGF0YVZpZXdzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcHJlc3NBbmltYXRpb25zOiB0aGlzLnN1cHByZXNzQW5pbWF0aW9ucyxcclxuICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydDogdGhpcy52aWV3cG9ydFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQub25EYXRhQ2hhbmdlZCh7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YVZpZXdzOiB0aGlzLnNhbXBsZURhdGFWaWV3cy5nZXREYXRhVmlld3MoKSxcclxuICAgICAgICAgICAgICAgICAgICBzdXBwcmVzc0FuaW1hdGlvbnM6IHRoaXMuc3VwcHJlc3NBbmltYXRpb25zXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQub25SZXNpemluZyh0aGlzLnZpZXdwb3J0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIG9uUGx1Z2luQ2hhbmdlKHBsdWdpbk5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFWaWV3c1NlbGVjdC5lbXB0eSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFWaWV3cyA9IFNhbXBsZURhdGEuZ2V0U2FtcGxlc0J5UGx1Z2luTmFtZShwbHVnaW5OYW1lKTtcclxuICAgICAgICAgICAgbGV0IGRlZmF1bHREYXRhVmlldztcclxuXHJcbiAgICAgICAgICAgIGRhdGFWaWV3cy5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uOiBKUXVlcnkgPSAkKCc8b3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWwoaXRlbS5nZXROYW1lKCkpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9uLnRleHQoaXRlbS5nZXREaXNwbGF5TmFtZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbi5hdHRyKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHREYXRhVmlldyA9IGl0ZW0uZ2V0TmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QuYXBwZW5kKG9wdGlvbik7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QuY2hhbmdlKCgpID0+IHRoaXMub25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbih0aGlzLmRhdGFWaWV3c1NlbGVjdC52YWwoKSkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlZmF1bHREYXRhVmlldykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkNoYW5nZURhdGFWaWV3U2VsZWN0aW9uKGRlZmF1bHREYXRhVmlldyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBvbkNoYW5nZURhdGFWaWV3U2VsZWN0aW9uKHNhbXBsZU5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGFWaWV3cyA9IFNhbXBsZURhdGEuZ2V0RGF0YVZpZXdzQnlTYW1wbGVOYW1lKHNhbXBsZU5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGVkZWZzL3R5cGVkZWZzLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidHlwZWRlZnMvdHlwZWRlZnMub2JqLnRzXCIvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9zYW1wbGVEYXRhVmlld3MudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvRmlsZVN0b3JhZ2VEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL0ltYWdlRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9SaWNodGV4dERhdGEudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2FsZXNCeUNvdW50cnlEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NhbGVzQnlEYXlPZldlZWtEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZUZ1bm5lbERhdGEudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlR2F1Z2VEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZU1hdHJpeERhdGEudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlVGFibGVEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1RlYW1TY29yZURhdGEudHNcIi8+XHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImhvc3RDb250cm9scy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cImFwcC50c1wiLz4iLCIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxuaW50ZXJmYWNlIEpRdWVyeSB7XHJcbiAgICAvKiogRGVtb25zdHJhdGVzIGhvdyBQb3dlciBCSSB2aXN1YWwgY3JlYXRpb24gY291bGQgYmUgaW1wbGVtZW50ZWQgYXMgalF1ZXJ5IHBsdWdpbiAqL1xyXG4gICAgdmlzdWFsKHBsdWdpbjogT2JqZWN0LCBkYXRhVmlldz86IE9iamVjdCk6IEpRdWVyeTtcclxufVxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscyB7XHJcbiAgICBcclxuICAgIGltcG9ydCBkZWZhdWx0VmlzdWFsSG9zdFNlcnZpY2VzID0gcG93ZXJiaS52aXN1YWxzLmRlZmF1bHRWaXN1YWxIb3N0U2VydmljZXM7XHJcblxyXG4gICAgaW1wb3J0IEhvc3RDb250cm9scyA9IHBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHM7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBEZW1vbnN0cmF0ZXMgUG93ZXIgQkkgdmlzdWFsaXphdGlvbiBlbGVtZW50cyBhbmQgdGhlIHdheSB0byBlbWJlZCB0aGVtIGluIHN0YW5kYWxvbmUgd2ViIHBhZ2UuXHJcbiAgICAgKi9cclxuICAgIGV4cG9ydCBjbGFzcyBQbGF5Z3JvdW5kIHtcclxuXHJcbiAgICAgICAgLyoqIFJlcHJlc2VudHMgc2FtcGxlIGRhdGEgdmlldyB1c2VkIGJ5IHZpc3VhbGl6YXRpb24gZWxlbWVudHMuICovXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcGx1Z2luU2VydmljZTogSVZpc3VhbFBsdWdpblNlcnZpY2UgPSBwb3dlcmJpLnZpc3VhbHMudmlzdWFsUGx1Z2luRmFjdG9yeS5jcmVhdGUoKTtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyB2aXN1YWxFbGVtZW50OiBJVmlzdWFsO1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBob3N0Q29udHJvbHM6IEhvc3RDb250cm9scztcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBjb250YWluZXI6IEpRdWVyeTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdmlzdWFsU3R5bGU6IElWaXN1YWxTdHlsZSA9IHtcclxuICAgICAgICAgICAgdGl0bGVUZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogeyB2YWx1ZTogJ3JnYmEoNTEsNTEsNTEsMSknIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3ViVGl0bGVUZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjogeyB2YWx1ZTogJ3JnYmEoMTQ1LDE0NSwxNDUsMSknIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29sb3JQYWxldHRlOiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhQ29sb3JzOiBuZXcgcG93ZXJiaS52aXN1YWxzLkRhdGFDb2xvclBhbGV0dGUoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFiZWxUZXh0OiB7XHJcbiAgICAgICAgICAgICAgICBjb2xvcjoge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiAncmdiYSg1MSw1MSw1MSwxKScsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxMXB4J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpc0hpZ2hDb250cmFzdDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLyoqIFBlcmZvcm1zIHNhbXBsZSBhcHAgaW5pdGlhbGl6YXRpb24uKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gJCgnI2NvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RDb250cm9scyA9IG5ldyBIb3N0Q29udHJvbHMoJCgnI29wdGlvbnMnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaG9zdENvbnRyb2xzLnNldEVsZW1lbnQodGhpcy5jb250YWluZXIpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZVZpc3VhbFR5cGVTZWxlY3QoKTtcclxuICAgICAgICAgICAgcG93ZXJiaS52aXN1YWxzLkRlZmF1bHRWaXN1YWxIb3N0U2VydmljZXMuaW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgICAgICAvLyBXcmFwcGVyIGZ1bmN0aW9uIHRvIHNpbXBsaWZ5IHZpc3VhbGl6YXRpb24gZWxlbWVudCBjcmVhdGlvbiB3aGVuIHVzaW5nIGpRdWVyeVxyXG4gICAgICAgICAgICAkLmZuLnZpc3VhbCA9IGZ1bmN0aW9uIChwbHVnaW46IElWaXN1YWxQbHVnaW4sIGRhdGFWaWV3PzogRGF0YVZpZXdbXSkge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIFN0ZXAgMTogQ3JlYXRlIG5ldyBET00gZWxlbWVudCB0byByZXByZXNlbnQgUG93ZXIgQkkgdmlzdWFsXHJcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9ICQoJzxkaXYvPicpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRDbGFzcygndmlzdWFsJyk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Wyd2aXNpYmxlJ10gPSAoKSA9PiB7IHJldHVybiB0cnVlOyB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hcHBlbmQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgUGxheWdyb3VuZC5jcmVhdGVWaXN1YWxFbGVtZW50KGVsZW1lbnQsIHBsdWdpbiwgZGF0YVZpZXcpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlzdWFsQnlEZWZhdWx0ID0ganNDb21tb24uVXRpbGl0eS5nZXRVUkxQYXJhbVZhbHVlKCd2aXN1YWwnKTtcclxuICAgICAgICAgICAgaWYgKHZpc3VhbEJ5RGVmYXVsdCkge1xyXG4gICAgICAgICAgICAgICAgJCgnLnRvcEJhciwgI29wdGlvbnMnKS5jc3MoeyBcImRpc3BsYXlcIjogXCJub25lXCIgfSk7XHJcbiAgICAgICAgICAgICAgICBQbGF5Z3JvdW5kLm9uVmlzdWFsVHlwZVNlbGVjdGlvbih2aXN1YWxCeURlZmF1bHQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5vblZpc3VhbFR5cGVTZWxlY3Rpb24oJCgnI3Zpc3VhbFR5cGVzJykudmFsKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlVmlzdWFsRWxlbWVudChlbGVtZW50OiBKUXVlcnksIHBsdWdpbjogSVZpc3VhbFBsdWdpbiwgZGF0YVZpZXc/OiBEYXRhVmlld1tdKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTdGVwIDI6IEluc3RhbnRpYXRlIFBvd2VyIEJJIHZpc3VhbFxyXG4gICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQgPSBwbHVnaW4uY3JlYXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudC5pbml0KHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXHJcbiAgICAgICAgICAgICAgICBob3N0OiBkZWZhdWx0VmlzdWFsSG9zdFNlcnZpY2VzLFxyXG4gICAgICAgICAgICAgICAgc3R5bGU6IHRoaXMudmlzdWFsU3R5bGUsXHJcbiAgICAgICAgICAgICAgICB2aWV3cG9ydDogdGhpcy5ob3N0Q29udHJvbHMuZ2V0Vmlld3BvcnQoKSxcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7IHNsaWNpbmdFbmFibGVkOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICBpbnRlcmFjdGl2aXR5OiB7IGlzSW50ZXJhY3RpdmVMZWdlbmQ6IGZhbHNlLCBzZWxlY3Rpb246IGZhbHNlIH0sXHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb246IHsgdHJhbnNpdGlvbkltbWVkaWF0ZTogdHJ1ZSB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMuc2V0VmlzdWFsKHRoaXMudmlzdWFsRWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcG9wdWxhdGVWaXN1YWxUeXBlU2VsZWN0KCk6IHZvaWQge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBsZXQgdHlwZVNlbGVjdCA9ICQoJyN2aXN1YWxUeXBlcycpO1xyXG4gICAgICAgICAgICAvL3R5cGVTZWxlY3QuYXBwZW5kKCc8b3B0aW9uIHZhbHVlPVwiXCI+KG5vbmUpPC9vcHRpb24+Jyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmlzdWFscyA9IHRoaXMucGx1Z2luU2VydmljZS5nZXRWaXN1YWxzKCk7XHJcbiAgICAgICAgICAgIHZpc3VhbHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGEubmFtZSA8IGIubmFtZSkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEubmFtZSA+IGIubmFtZSkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmlzdWFscy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHZpc3VhbCA9IHZpc3VhbHNbaV07XHJcbiAgICAgICAgICAgICAgICB0eXBlU2VsZWN0LmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicgKyB2aXN1YWwubmFtZSArICdcIj4nICsgdmlzdWFsLm5hbWUgKyAnPC9vcHRpb24+Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHR5cGVTZWxlY3QuY2hhbmdlKCgpID0+IHRoaXMub25WaXN1YWxUeXBlU2VsZWN0aW9uKHR5cGVTZWxlY3QudmFsKCkpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIG9uVmlzdWFsVHlwZVNlbGVjdGlvbihwbHVnaW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgaWYgKHBsdWdpbk5hbWUubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlzdWFsUGx1Z2luKHBsdWdpbk5hbWUpO1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RDb250cm9scy5vblBsdWdpbkNoYW5nZShwbHVnaW5OYW1lKTtcclxuICAgICAgICB9ICAgICAgICBcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlVmlzdWFsUGx1Z2luKHBsdWdpbk5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbigpLm5vdChcIi51aS1yZXNpemFibGUtaGFuZGxlXCIpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHBsdWdpbiA9IHRoaXMucGx1Z2luU2VydmljZS5nZXRQbHVnaW4ocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgICAgIGlmICghcGx1Z2luKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ3cm9uZ1Zpc3VhbFdhcm5pbmdcIj5Xcm9uZyB2aXN1YWwgbmFtZSA8c3Bhbj5cXCcnICsgcGx1Z2luTmFtZSArICdcXCc8L3NwYW4+IGluIHBhcmFtZXRlcnM8L2Rpdj4nKTsgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnZpc3VhbChwbHVnaW4pO1xyXG4gICAgICAgIH0gICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9ICAgXHJcbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=