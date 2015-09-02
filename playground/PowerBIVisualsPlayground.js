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
                    width: size.width - 10,
                };
                if (this.visualElement) {
                    this.visualElement.onResizing(this.viewport);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInR5cGVkZWZzL3R5cGVkZWZzLnRzIiwidHlwZWRlZnMvdHlwZWRlZnMub2JqLnRzIiwic2FtcGxlRGF0YVZpZXdzL3NhbXBsZURhdGFWaWV3cy50cyIsInNhbXBsZURhdGFWaWV3cy9GaWxlU3RvcmFnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvSW1hZ2VEYXRhLnRzIiwic2FtcGxlRGF0YVZpZXdzL1JpY2h0ZXh0RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TYWxlc0J5Q291bnRyeURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2FsZXNCeURheU9mV2Vla0RhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlRnVubmVsRGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVHYXVnZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvU2ltcGxlTWF0cml4RGF0YS50cyIsInNhbXBsZURhdGFWaWV3cy9TaW1wbGVUYWJsZURhdGEudHMiLCJzYW1wbGVEYXRhVmlld3MvVGVhbVNjb3JlRGF0YS50cyIsInNhbXBsZURhdGEudHMiLCJIb3N0Q29udHJvbHMudHMiLCJfcmVmZXJlbmNlcy50cyIsImFwcC50cyJdLCJuYW1lcyI6WyJwb3dlcmJpIiwicG93ZXJiaS52aXN1YWxzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXROYW1lIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYW1wbGVEYXRhVmlld3MuZ2V0RGlzcGxheU5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5oYXNQbHVnaW4iLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbXBsZURhdGFWaWV3cy5nZXRSYW5kb21WYWx1ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FtcGxlRGF0YVZpZXdzLnJhbmRvbUVsZW1lbnQiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkZpbGVTdG9yYWdlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuRmlsZVN0b3JhZ2VEYXRhLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5GaWxlU3RvcmFnZURhdGEucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5JbWFnZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLkltYWdlRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLmdldERhdGFWaWV3cyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuSW1hZ2VEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5SaWNodGV4dERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YS5idWlsZFBhcmFncmFwaHNEYXRhVmlldyIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuUmljaHRleHREYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeUNvdW50cnlEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5Q291bnRyeURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlEYXlPZldlZWtEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2FsZXNCeURheU9mV2Vla0RhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TYWxlc0J5RGF5T2ZXZWVrRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUZ1bm5lbERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVGdW5uZWxEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlR2F1Z2VEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVHYXVnZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVNYXRyaXhEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3MuU2ltcGxlVGFibGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5TaW1wbGVUYWJsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5nZXREYXRhVmlld3MiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlNpbXBsZVRhYmxlRGF0YS5yYW5kb21pemUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzLlRlYW1TY29yZURhdGEuZ2V0RGF0YVZpZXdzIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cy5UZWFtU2NvcmVEYXRhLnJhbmRvbWl6ZSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhIiwicG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGEuU2FtcGxlRGF0YSIsInBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhLlNhbXBsZURhdGEuY29uc3RydWN0b3IiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldFNhbXBsZXNCeVBsdWdpbk5hbWUiLCJwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YS5TYW1wbGVEYXRhLmdldERhdGFWaWV3c0J5U2FtcGxlTmFtZSIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLmNvbnN0cnVjdG9yIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRFbGVtZW50IiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5zZXRWaXN1YWwiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLm9uUmVzaXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5nZXRWaWV3cG9ydCIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMucmFuZG9taXplIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZUR1cmF0aW9uIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucyIsInBvd2VyYmkudmlzdWFscy5Ib3N0Q29udHJvbHMub25DaGFuZ2UiLCJwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzLm9uUGx1Z2luQ2hhbmdlIiwicG93ZXJiaS52aXN1YWxzLkhvc3RDb250cm9scy5vbkNoYW5nZURhdGFWaWV3U2VsZWN0aW9uIiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5jb25zdHJ1Y3RvciIsInBvd2VyYmkudmlzdWFscy5QbGF5Z3JvdW5kLmluaXRpYWxpemUiLCJwb3dlcmJpLnZpc3VhbHMuUGxheWdyb3VuZC5jcmVhdGVWaXN1YWxFbGVtZW50IiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQucG9wdWxhdGVWaXN1YWxUeXBlU2VsZWN0IiwicG93ZXJiaS52aXN1YWxzLlBsYXlncm91bmQub25WaXN1YWxUeXBlU2VsZWN0aW9uIiwicG93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RUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDdEtBLEVBQUVBLFdBQVdBLEVBQUVBLHdCQUF3QkEsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDL0tBLEVBQUVBLFdBQVdBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLFNBQVNBLEVBQUVBLElBQUlBLEVBQUVBLFVBQVVBLEVBQUVBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEVBQUVBLElBQUlBLEVBQUVBLFNBQVNBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUE7d0JBQ2hLQSxFQUFFQSxXQUFXQSxFQUFFQSxVQUFVQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxTQUFTQSxFQUFFQSxJQUFJQSxFQUFFQSxVQUFVQSxFQUFFQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxFQUFFQSxJQUFJQSxFQUFFQSxTQUFTQSxDQUFDQSw0QkFBNEJBLENBQUNBLGFBQWFBLENBQUNBLE1BQU1BLENBQUNBLEVBQUVBO3dCQUNqS0EsRUFBRUEsV0FBV0EsRUFBRUEsT0FBT0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsVUFBVUEsRUFBRUEsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsRUFBRUEsSUFBSUEsRUFBRUEsU0FBU0EsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxDQUFDQSxNQUFNQSxDQUFDQSxFQUFFQTt3QkFDOUpBLEVB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UUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsU0FBU0E7d0RBQ2hCQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLENBQUNBLEVBQUVBOzREQUN2Q0EsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTt5REFDMUNBO3FEQUNKQTtvREFDREE7d0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO3dEQUNSQSxLQUFLQSxFQUFFQSxRQUFRQTt3REFDZkEsTUFBTUEsRUFBRUE7NERBQ0pBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBOzREQUNsQkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUEsZ0JBQWdCQSxFQUFFQSxDQUFDQSxFQUFFQTs0REFDdkNBLENBQUNBLEVBQUVBLEVBQUVBLEtBQUtBLEVBQUVBLElBQUlBLEVBQUVBLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsRUFBRUE7eURBQzFDQTtxREFDSkE7aURBQ0pBOzZDQUNKQTs0Q0FDREE7Z0RBQ0lBLEtBQUtBLEVBQUVBLENBQUNBO2dEQUNSQSxLQUFLQSxFQUFFQSxLQUFLQTtnREFDWkEsUUFBUUEsRUFBRUE7b0RBQ05BO3dEQUNJQSxLQUFLQSxFQUFFQSxDQUFDQTt3REFDUkEsS0FBS0EsRUFBRUEsWUFBWUE7d0RBQ25CQSxNQUFNQSxFQUFFQTs0REFDSkEsQ0FBQ0EsRUFBRUEsRUFBRUEsS0FBS0EsRUFBRUEsSUFBSUEsRUFBRUE7NERBQ2xCQSxDQUFDQSxFQUFFQSxFQUFFQSxLQUFLQSxFQUFFQSxJQUFJQSxFQUFFQSxnQkFBZ0JBLEVBQUVBLENBQUNBLEVBQUVBOzREQUN2Q0EsQ0FB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QUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBQ3JHQSxJQUFJQSxZQUFZQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsUUFBUUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsQ0FBQ0E7b0JBRXJHQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsS0FBS0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQ3pLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsTUFBTUEsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBQzFLQSxJQUFJQSxjQUFjQSxHQUEyQkEsRUFBRUEsV0FBV0EsRUFBRUEsVUFBVUEsRUFBRUEsSUFBSUEsRUFBRUEsY0FBY0EsRUFBRUEsU0FBU0EsRUFBRUEsSUFBSUEsRUFBRUEsS0FBS0EsRUFBRUEsQ0FBQ0EsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsRUFBRUEsWUFBWUEsRUFBRUEsR0FBR0EsRUFBRUEsRUFBRUEsRUFBRUEsQ0FBQ0E7b0JBRXZLQSxNQUFNQSxDQUFDQSxDQUFDQTs0QkFDSkEsUUFBUUEsRUFBRUEsRUFBRUEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0EsRUFBRUE7NEJBQ2pIQSxLQUFLQSxFQUFFQTtnQ0FDSEEsT0FBT0EsRUFBRUEsQ0FBQ0EsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsRUFBRUEsWUFBWUEsRUFBRUEsY0FBY0EsQ0FBQ0E7Z0NBQ25HQSxJQUFJQSxFQUFFQTtvQ0FDRkEsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0EsRUFBRUEsS0FBS0EsRUFBRUEsR0FBR0EsQ0FBQ0E7b0NBQ2pDQSxDQUFDQSxHQUFHQSxFQUFFQSxHQUFHQSxFQUFFQSxJQUFJQSxFQUFFQSxHQUFHQSxFQUFFQSxLQUFLQSxFQUFFQSxHQUFHQSxDQUFDQTtvQ0FDakNBLENBQUNBLEdBQUdBLEVBQUVBLEdBQUdBLEVBQUVBLElBQUlBLEVBQUVBLEdBQUdBLEVBQUVBLEtBQUtBLEVBQUVBLEdBQUdBLENBQUNBO29DQUNqQ0EsQ0FBQ0EsR0FBR0EsRUFBRUEsR0FBR0EsRUFBRUEsSUFBSUEsRUFBRUEsR0FBR0Es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QSxrQkFBa0JBO3FCQUM1QkE7b0JBQ0RBLFFBQVFBLEVBQUVBLE1BQU1BO2lCQUNuQkE7Z0JBQ0RBLGNBQWNBLEVBQUVBLEtBQUtBO2FBQ3hCQSxDQUFDQTtZQXVGTkEsaUJBQUNBO1FBQURBLENBakhBbkUsQUFpSENtRSxJQUFBbkU7UUFqSFlBLG9CQUFVQSxhQWlIdEJBLENBQUFBO0lBQ0xBLENBQUNBLEVBM0hjRCxPQUFPQSxHQUFQQSxlQUFPQSxLQUFQQSxlQUFPQSxRQTJIckJBO0FBQURBLENBQUNBLEVBM0hNLE9BQU8sS0FBUCxPQUFPLFFBMkhiIiwiZmlsZSI6InNyYy9DbGllbnRzL1Bvd2VyQklWaXN1YWxzUGxheWdyb3VuZC9vYmovUG93ZXJCSVZpc3VhbHNQbGF5Z3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiAqICBNSVQgTGljZW5zZVxyXG4gKlxyXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuICogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICogICBcclxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4gKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqICAgXHJcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuICogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiAqICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiAgVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuXHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1R5cGVkZWZzL2pxdWVyeS9qcXVlcnkuZC50c1wiLz5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVHlwZWRlZnMvZDMvZDMuZC50c1wiLz5cclxuIiwiLypcclxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiAqICBNSVQgTGljZW5zZVxyXG4gKlxyXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuICogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICogICBcclxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4gKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqICAgXHJcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuICogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiAqICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiAgVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuXHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1Zpc3VhbHNDb21tb24vb2JqL1Zpc3VhbHNDb21tb24uZC50c1wiLz5cclxuLy8vPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vVmlzdWFsc0RhdGEvb2JqL1Zpc3VhbHNEYXRhLmQudHNcIi8+XHJcbi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL1Zpc3VhbHMvb2JqL1Zpc3VhbHMuZC50c1wiLz4iLCIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICAgICAgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIGRpc3BsYXlOYW1lOiBzdHJpbmc7IFxyXG4gICAgICAgIHZpc3VhbHM6IHN0cmluZ1tdO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzIHtcclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5TmFtZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBoYXNQbHVnaW4ocGx1Z2luTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZpc3VhbHMuaW5kZXhPZihwbHVnaW5OYW1lKSA+PSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh2YWx1ZSAqIDEwMCkgLyAxMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9tRWxlbWVudChhcnI6IGFueVtdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBhcnJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyLmxlbmd0aCldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIGV4dGVuZHMgSVNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICAgICAgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W107XHJcbiAgICAgICAgcmFuZG9taXplKCk6IHZvaWQ7XHJcbiAgICAgICAgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyO1xyXG4gICAgICAgIHJhbmRvbUVsZW1lbnQoYXJyOiBhbnlbXSk6IGFueTtcclxuICAgIH1cclxufVxyXG4iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xyXG4gICAgaW1wb3J0IFZhbHVlVHlwZSA9IHBvd2VyYmkuVmFsdWVUeXBlO1xyXG4gICAgaW1wb3J0IFByaW1pdGl2ZVR5cGUgPSBwb3dlcmJpLlByaW1pdGl2ZVR5cGU7XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBGaWxlU3RvcmFnZURhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIkZpbGVTdG9yYWdlRGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJGaWxlIHN0b3JhZ2UgZGF0YVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ3RyZWVtYXAnLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhID0gWzc0MjczMS40MywgMTYyMDY2LjQzLCAyODMwODUuNzgsIDMwMDI2My40OSwgMzc2MDc0LjU3LCA4MTQ3MjQuMzRdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1pbjogbnVtYmVyID0gMzAwMDA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXg6IG51bWJlciA9IDEwMDAwMDA7XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XHJcbiAgICAgICAgICAgIHZhciB0cmVlTWFwTWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnRXZlbnRDb3VudCcsIHF1ZXJ5TmFtZTogJ3NlbGVjdDEnLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ01lZGFsQ291bnQnLCBxdWVyeU5hbWU6ICdzZWxlY3QyJywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IFtcclxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdQcm9ncmFtIEZpbGVzJywgcXVlcnlOYW1lOiAnc2VsZWN0MScsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdEb2N1bWVudHMgYW5kIFNldHRpbmdzJywgcXVlcnlOYW1lOiAnc2VsZWN0MicsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdXaW5kb3dzJywgcXVlcnlOYW1lOiAnc2VsZWN0MycsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgICAgIHsgZGlzcGxheU5hbWU6ICdSZWNvdmVyeScsIHF1ZXJ5TmFtZTogJ3NlbGVjdDQnLCBpc01lYXN1cmU6IHRydWUsIHByb3BlcnRpZXM6IHsgXCJZXCI6IHRydWUgfSwgdHlwZTogVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5Eb3VibGUpIH0sXHJcbiAgICAgICAgICAgICAgICB7IGRpc3BsYXlOYW1lOiAnVXNlcnMnLCBxdWVyeU5hbWU6ICdzZWxlY3Q1JywgaXNNZWFzdXJlOiB0cnVlLCBwcm9wZXJ0aWVzOiB7IFwiWVwiOiB0cnVlIH0sIHR5cGU6IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKSB9LFxyXG4gICAgICAgICAgICAgICAgeyBkaXNwbGF5TmFtZTogJ1Byb2dyYW1EYXRhJywgcXVlcnlOYW1lOiAnc2VsZWN0NicsIGlzTWVhc3VyZTogdHJ1ZSwgcHJvcGVydGllczogeyBcIllcIjogdHJ1ZSB9LCB0eXBlOiBWYWx1ZVR5cGUuZnJvbVByaW1pdGl2ZVR5cGVBbmRDYXRlZ29yeShQcmltaXRpdmVUeXBlLkRvdWJsZSkgfSxcclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFsdWVzLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogY29sdW1uc1tpXSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbaV1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogdHJlZU1hcE1ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IERhdGFWaWV3VHJhbnNmb3JtLmNyZWF0ZVZhbHVlQ29sdW1ucyh2YWx1ZXMpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbiwgdGhpcy5zYW1wbGVNYXgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgSW1hZ2VEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xyXG5cclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJJbWFnZURhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiSW1hZ2UgZGF0YVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2ltYWdlJyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZUltYWdlcyA9IFtcclxuICAgICAgICAgICAgJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTmdBQUFEWUNBWUFBQUgrSngxN0FBQUFBWE5TUjBJQXJzNGM2UUFBQUFSblFVMUJBQUN4and2OFlRVUFBQUFKY0VoWmN3QUFDeE1BQUFzVEFRQ2FuQmdBQUJ4VFNVUkJWSGhlN1owSmRCUmx0b0JkWnRUUnAwOW5uT2U4TS9QZVREcktKZ2lDT203Z2lnS2lJSUlzZ3R1d0N3S21rNUE5RUNFaEpFZ3dLSXVBZ0NCclJDRHNHQVZOQWdaWmpDakJFQklJU1NjUlFuQlVGS2pKWDk3U3F2SldkM1YxN2JuZk9kODU2ZnhiM2I2NTZlcXE2dXFMUW1GUlVYVlArRkUvdXM4dXVySjU3TkFMWVJHUGNHSTdwcWVYUWhkdHZMdW5kcEI4VWlXRFhpd3NvdHR2dGxpdFFTL21pZWg5RnB0SWplNWZER3ZEdE05aVlyRDJRSXNKQ0kvUnhaU1E5OU4xTWFYSGd0aGlBdktmbWJvc3RyUWdsMlBLK3dvSS9YVlpESnAvMDFkQTZLOUx6cUJaTWxiK016TmdaUDNmOE1Lam54SDMwMzB4ZjcranhZVCtRZjJCUEpZNVF0SlBsOFhreWhjUk5HUXhKWVhGc0RaTTV5Mm1HbE1YdXlYaGxUSnNJalVHdlJoR2o1bno4N0hKNWVxeUdNYlN6MnI2bTdhWW5CMUhHMXJCai9yUldKTVhyOXhYMDEwZUZSTzZhR054WWQwMUQyWms3c1VteG9SaDZzRW1VU3RNb1I1c0VyWENGT3JCSmxFclRLRWViQksxQmp2ZUhvdHRLYzcvK2NVSXdQb0VXa3hBZUl4MnhzRDY2YmFZL0RGRC9EdW1mREV4NHNkQ2U4aUxZYnZlRFBIalgvb0xQNGdWZHhBUXR3dXl4YUNaZnl4Ry9QaVgvc0lQWWpIYXh2ZjZUVC9kRm1PNzNlem53cS8zODQ4WjhuNjZMWWI5amlIK25mTVhFMGhaODZiazk3b3RoaUh2cDh0aWFqVjlNZXozU2pwcnNhREFKbEVyVEtFZWJCSzF3aFRhR2I3NjhCUFl4Smd3UkY5bUYxVmVmL3VyaVVkTldTd1VkcFkyM1B0Z1ptYWhmRVB2VGtzOUFsM3N3WWFTQzVmdnEvbys3Sm41eXhmZUZQM2NlZmtHcTlXVU4wQjVIUGU3OU8yKzhBR3pGOFcwU1J4N0J0c1F2VFU4c0ZEZXZZY2lCYVlWT3dTR3RTdlpPbUgwVC81OEtPUFZEL2hKblJhWVdoMGJtQng1dStyQWdnRWJMOWVXZ1UzZnZGalMxdkQ5dDlEeUsrSjJURFdCWVNpMWljY3hOUVVXcUoyQjlSSHJ5TUNHTFVoRys0Z1ZCd2JEZmtIb2c2SFVKdnhlVUhOZzdKMG5obnlja3JZTVRBMGRKdzFDNXhHMGJjWXc1U2lkL0dJNktqQ21IS3dQa3dLVG9kUW0vRjdRc0JwallQTUkyaVl3SnZzM3JnYnNHS3RjV3dXbXAwMGlNS3c5VkcwUm1NZmJnd3VQNnF1TGQwNk8vZmtna1IwQ013VFhCaVptMVJjbi8vN1k2MW5UMmlTT3E4RTJSazlORFN3WXNqNzJoUTlmdXZHZFZnbWo2ckVORDZSdEExUExXeC9YWHYzUW5JUE4rczFkc2tZYzJOMXBLV1hReFIzc0xLKy9idUh1bXI3dzBMbkViYXhJYXg0NzdOL2liREdoMmQ1a2JTaTV2TXozN1YrZWYzdjFBbmtBU3NKUSt6Q2xzV2JtRmZxZXZTOGo0d3RzZzlVSzA1blBDbzY3Tkc1RGVmakVqZnNuZUx4UGFUNnJvaVFzWXl4ekM2cHZHTFRrOEYyUFRNL2U0NG5xby9sakRzRUlTeHNIdHFnWnd2TEdnUzFxaHJDOGNXQ0xtaUVzYnh6WW9tWUl5eHNIdHFnWnd2TEdnUzFxaHJBOEQ5YU9pWjNvRTN0N1NzelpvdEtUL3gvVXBIckxMdzVnN2FGb3lLUnE1UmNIc1BaUXBjRDBGbUxpd2RyOStlYjJaWERRN1Zma2ZZS2VsSjFvVUFMcnJ5VEV4SU8xKzFPM3dJNmY5TUh3d0dEak1TRW1IcXpkbjdvRkZpellISEloSmg2czNaK0dCU1kvTmk5SDNLWWt4TVNEdFdPTWVTZVZiek1zTUhtNy9HU0Z2QjBUWXVMQjJqRk1EMHplQjJ1WEN6SHhZTzBZamd0TStIQ0M4QUVGSm9icGdZay9Ec0NRdDJOQ1REd3dqRWRveHpBOU1ESHlDL1NWaEpoNFlDaVAwSTVoZUdEc2d4dXJQdDBDajZSZzR6RWhKaDRZeWlPMFl4Z2VXQ0N3T2VSQ1REd3dqRWRveDdBOE1BWTJqMWlJaVFlRzhBanRHS2I4S1FwdFNwY2VzVDlWOFJ4eUlTWWVHTUlqdEdPWS9zOURVQTdXUnhCaTRvSHVQRUk3aG1XQnlmK2hZSDBFSVNZZTZNNGp0R05ZRmhoVEROWXVDREh4UUhjZW9SMkRBbXRVMThEa2w5QmlmUVFoSmg3b3ppTzBZMWdTMlB3ZE9kRDZLMWcvUVlpSkI3cnpDTzBZaGdlbUJ2YXVHNXRMRUdMaWdTRThRanVHTFFMRDVoRUxNZkhBRUI2aEhVUDN3QVRsZS9GS1lHUGxRa3c4TUl4SGFNY3dMREFseFhzaWFvV1llR0RiZUlSMkROTUQweUxFeEFQYnhpTzBZemd1TUt3OVZDa3d2WVdZZUxEMlVDdzl5ZjIzTFFMRExxalVvc2ZiNi94ZGs4ZW04NU5paTVvaHY3aVJZSXVhSVN4dkhOaWlaZ2pMR3dlMnFCbkM4c2FCTFdxR3NMdzVaTzJzdnZQZUtaTS9ENDhjWVBnRjBMQ2tkYnp4U1ZYcmp1a1Q1cmRManE3RE5sQ3JNTDI5MkZCU2Q4M2lvdW83YjB1Sks4YzJXbzB3bFROWTk4WEpqdU5XNTAxUmMzMGpESEVtN0dMT3BMeks2NWZzcWVuWEpuRmNyV3NDczRMbG56WDhlZno2OGc3djd2VTl6KzQ1Y3Z1cmNZYzlrVStlRTU3UVd5ZEUxMEJYd2loS1NpNWMvdjZCNmhzbWJDenZNV0RlOHUxM3AwNHFhUmJ6d3I4OTNwNUJYK1hyK0E5b1dFWGplL2xMbHUrdmJSNjFycUxmb0tWZmozMGllODU3TGVOSGZoc1cwUVY5b3ZXU0VpYURWY09DVDMzM2pGNVQ5c285YVNsN1c4WU5id2lQR21qSkI5UXdtMHpDdHBhZWJwYTZyWEx3aXd2WEZqYnVNelpnVDRZVGRIekNsdTMxM1JQOTNvN29EaFBpYXNJam45Yjk0eXQyMC9FSnMrcnp0RlpKQ1hPWWxEQ0hTUWx6bUpRd2g2bVVNSFpIMXFJaTd2ZDJFalpOQ2lYc1o3QytkdEs3ZXQxWWZrTXBZVCtEOWJXYjdTZDRLeWhoQU5iWGpsTENBS3l2M3ZiTUdzM0ZycHp1VjJ5Y1dFc1N4ajdZeVM1QnhXNVBlN0N5MU84ZEprUFZ5b1JoVjdQSndjYUpOU3hoN043QmVxRG1Gb2JCU0FrVGFSU0JQaFlUakpRd2tVWVN1U3dEWFROWUtXRWkvWUgxbHhzSWJFeXc2cEV3dFFoWFlndTZMbUZNZjJEOWc1VVNKdElmV0g5TWYyRDlnNVVTSnRJZldIKzViSTlRaVVBZjBGS3JVc0pnR1JUNUhHcHhmY0w4Z2ZYWElpVk1wRCt3L2t5Mjl4Y0liSnhXS1dFaTlZWWRDZEh5b1VGL1VzSkVHbzBlaDZ3b1lTTE5BbHRiclpRd2tmN0ErbU95NzAxU0F6WldqWlF3a2Y3QStnZlNIK3lvUGpZbWtKUXdrZjdBK3F2Ukgxai9RRkxDUlBvRDY2OUdmMkQ5QTBrSkUra1BySDhnQTcyZVlXTUNTUWtUNlErc3Z6K05la05OQ1JPcEZuYkxJSFpHbXQyTGxyMHhackxIYkVkQ0xkajZhcVNFaVRRTGJHMjFVc0pFR28wZVo1MHBZVUhJVHArd2YzMXE3NkxHa0g4UmVLaFN3aHdtSmN4aEtpVU02MnRIS1dFQTF0ZU9Vc0lBcksvZHZIVkN4QWxLR0lEMXRaTzlaODFhem04b0pjeGhVTUljQmlYTVlWRENISVluNGlsS21KTllrRmQyUmZZbkovNitjbjl0ajhqM2RxVGVPeVgxeS9EeEEzL0VnbldEamsrWUdqaU91emlKNHk3SjQ3amY3U2c5M1d6MWdick9mZWUrczZyamxMUkROeWVNUlo4WXU5b2tFcWFWZ3RJek4ydzZWSGRIdHhrenQ0Ukg5VFhsSytjRFNRblRpWGxGTmQxak41YkgzRG94OGxETCtCSGZlYnhQR25Kbk9VcVlpVFQrYTc1MDgxZW53dWJ0cm42NDYrdXZ2M1hmMUl6U214UEdmQnNlMWYrWGUvb0draEptWTFidS9lYm1TVnVPOVpxYWQyalpIWk9TS3ozZUo4NTFmbTFHQVRRVGRtVnYyZmYvMkhTby9vNjA3Y2ZHdzY4SU84QnVxSldkNzdzeGRldnhoeE0zN0ozMDZJd1oyMXJGalRndC9wY0lYUWtybUxxNTZxclhkbFMrL0Zqalh1aHRreEtPaEhsN0JOd1RoYUdFa1JTVzFGMHpzNkQ2bHBTTisxN3RNdU9Ob3JiSlhwOG5zdjlQV0VJQ0NWTVNvY0srSHFQMzhvby9SRFJXelFkZjEzZVlsKzk3dGxONjJqNjk3Mk1QeXhIQnNyTzgvcnJzajA1MEdyYjZ5TERXQ1NNTE9rK2JjZENvOTE1aVlYa0NnMVhON0tMS0t4ZnNQWFh0K3M5UFBSQ1I4K0hFN3RsenRyWkpIRmNUNW4wY2ZVS05GamFORU5oNnFONHplZXZ4dm0yVHgreTVMU1greEUzUkE3LzNSRDZsK28ydDBjSm1OaTN5eXNxdW1MNnQrb2IxaDA1Mm1sdFE5ZkxReGJrTDJpU05jOFMzUlVBSTd1ZnRncHF1YVZzclgrNlNOY3NYSGozQXNhZGZJQnpucytSQS9YVXpQenIrZjFHNUZXM3VlK09MaDVOeWk2WjFtQmhmM1N6Mlg2NDZOd2JoT3BlM2Q5VTgzVFZyNXFibU1VUE9oWG03MitJVWlKRkMyTTRGQzhyTlF0ak9CUXZLelVMWXpnVUx5czFDMk00RkM4ck5RdGpPQlF2S3pVTFl6Z1VMeXMxQzJNNEZDOHJOUXRqT0JRdkt6VUxZemdVTHlzMUMyTTRGQzhyTlF0aS9RZjVsYTFaYlhNeGRCcHNtQlF2S3pVTFlFckIrb2RveTl2bHpyUk5HLzZUVm0rTmYrcW5UbEltSFhsaXdjQkpzNXM5Z2k3bFpDRnNDMXM5T3Rvd2RkZ28ybFJMR3dQclp6UTRUdlpXTzJWZzk1WU9XZ2ZXem80N2FXTDNrZzVhQjliT2p1MHBQTjZPRU5ZTDFzNk54YXpjUG80UTFndld6bzRuck5nMmhoRFdDOVROQzdFdEt4ZDZmK2p3NlRwQVNCbUQ5akRBUThydS95YlVzWWV4R2xVcjNUR1RmUG91TjBVdklrUVNzbnhFR3dqWUpTMW56Sm15U2VveEtIT1JJQXRiUENBTmhXY0xZVFplRHVlR3lFbHEvL2NHZmtDTUpXRDhqRElTcENXTjN5RFlDVnAzWWVscUZIRW5BK2hsaElFeE5tRjVmdEkyQnJhZFZ5SkVFcko4UkJzSTFDZFB6aTdjaFJ4S3dma1lZQ05ja2pJR3RxVVhJa1FTc254RUd3allKQy9UVmlHcjJJckZ4V29RY1NjRDZLY21lVkxYSXh3YkNOZ2xqNzdtd01XSUQ3YlRvdGZNQk9aS0E5Vk9TRWliU0gycm5DQ1RrU0FMV1QwbEttRWlsb3g4TVNwZ05FNmJISElHRUhFbkEraWxKQ1JQcGJ3NjlkdTBoUnhLd2ZrcFN3a1J1S2M2SEViK0Y3WlJnWTRJVmNpUmhhVUV1NTAveGVFcVlTSDlnL2JVSU9aSUFTeWdpSGs4SkUra1ByTDhXSVVjU1lBbEZ4T01wWVNEcm93U2JHeHVqUmNpUkJGaEdFZkY0U2xpamdiNmdGQnVqVmNpUkJGaEdFZkg0SnArdzR5ZDkwQXZuc2N3UjZEaXRRbzRrd0ZLS2lNYzNtWVN4Sno3WWI1UFY4eWk5SU9SSUFpeW5pSGg4azBpWVZpaGhVbTJmTUlFdGplL1BzRFcxQ0RtU0FNc29JaDVQQ1ZNSk8wV0RyUnVza0NNSnNJUWk0dkdVc0NEUUkybVFJd2t3dlNMaThaU3dJQW4xdkJqa1NBSk1yWWg0ZkpOSUdOc3JWRHJqekg3UHJrRU1CbXdldFVLT0pNQzBpb2pITjRtRXFUblNJYmpGendGZ0FiWVdObGFOa0NNSk1LMGk0dkdVTU1SQVJ6NFkyRGcxUW80a3dKU0tpTWRUd2hRTVZHbllHRFZDamlUQWxJcUl4MVBDL09nUGYxZGgrUk55SkFHbVZFUThuaExtUjdZYnI0VFcxekhJa1FTWVVoSHhlRXFZSDQyWUUzSWtBYVpVUkR5ZUV1WkhTcGhVMnllTUhmeFZnaElXb2tZa3pCOWJOQjRRaGh4SmdDa1ZFWStuaENuWU5yNFhqTWJSZW9nS2NpUUJwbFJFUEo0U3BtQWdzREZxaEJ4SmdDa1ZFWStuaE1rTVZGa0MyRmcxUW80a3dKU0tpTWMzaVlTSllkZHdzTmNmMXArOStSWDB0NE1oUit0ckloTnlKQUdtVlVROHZza2xUQSt3OWRVS09aSUEweW9pSGs4SkN4SlduZGo2YW9VY1NZQ3BGUkdQcDRRRkFaMXhkbERDNkpvT25STW1sbDJEeUJJWTZDSlJ0WVN5a3lFWGNpUUJsbEZFUE42VkNWTXkyTDFCbG5DMm00L05wVlhJa1FSWVRoSHgrQ2FWTUgreXhHZzl4eFdNa0NNSjhId3BJaDVQQ1ROWnlKRUVlTDRVRVkrbmhKa3M1RWdDUEYrS2lNZFR3a3dXY2lRQjYyZEhLV0VBMXMrT2pzL0pIVTRKYXdUclowY3BZUURXejQ1dU8zeXFQU1dzRWF5ZkhYWFV4dW9sSDdRTXJKL2RiQms3NUxSak5sWlArYUJsWVAzc1pIaGszN093cVpRd3hzQjU4MmFGUno3TmhVZjF0WlV0NDRhZTZUMW56dnJaYXl1dmhFMmxoRGtPTENnM0MyRTdGeXdvTnd0aE94Y3NLRGNMWVRzWExDZzNDMkU3Rnl3b053dGhPeGNzS0RjTFlUc1hMQ2czQzJFN0Z5d29Od3RoTzVld2lDNW9ZRzRWd25ZdXp5MG91M2JIMXczM3pOdnRlK0hKMlcvbnRwOFk0d3Z6UG80RzZ3WWhiSGRSWE14ZDl2YWU2bHZpTmxWMEdiMTg2NnoyRTJMTFc4V09PQjBXMFExOUVwd2toT2h1a2pqdWtoVXJ1RXRMVGpUOE9lL1FxWFlUY3ZkRVBaUXhiZGZkYVZNNFQrUlQ2Qk5qVnlHa3Brdk93ZE4vaXM0OSttRHZoVi8xalYyN2UwYW45UFREemNZUFBvczlXWFlRTnB1UVUxbkpYZm5Ka1pOL2YvUGpxdWRiSjQ0N0ZlYnRmZ0Y3QXMwV05vOElSRkVSOS91bEI2cHZpTXF0YUxOaWIrM1FCek16OXJaSkdsZlRMT2JGSDdBbjFpaGhjNGhRMkZwNnVsbkdCeWVHM3BlUnR2M21oRkcxNGRFRGY4U2ViRDJFSlFrOVdkRzRseHE1N3RoTjcrMnJlMnJoTHQ5emoyVE4yTmtxYmxTOUhudXBzQVJoQm9VbGRkZXNPL2hONjZ3UHE1NStkUHFNamUyU1krcGJ4QXo3SGt1TWtqQVZZUVZyaXlxdmZDMnY3TnJCcTB2Kzl2N24zOXlUOFA2dTVJZW12Yll2UEtxdjRnNE9EQ1hzeHNlMXRWZS92ck95ODRMZFZmMWVXTFIrMTAzakIzM1grQy8xQWpRVGhMbHdISGR4WG1YRDlZcy9yV21mdExtaTM4aGxHOU9HdkxOK2U1L1o3Kzd2UEgzbTRkYUpZMCtHUncwNDIvWDFtVHRnQ0VFMFBUYVVYTGo4alozbDF5VnRydnFmc2F1UC9pOTdPZTY3NE10L3JEeFFlOXM3bjlVTzhPWjhsTlo3OXNLMUQyZG03YjhsMlZzYkh2bjBlZXlsV2NtNzB5WWZnYVVJd2wyd2czTUZwV2R1MkhTNC9zYlYrMnZhejgzM2RVblBPekV3Y2wxWnhEOG54Mzk0VjJyeW5qc25UVHpXTEdid1dZKzM5M2tqRHQ1MVRFOHZoYzBoQ1B1VFY4WmRzYml3N3ByTWJSVi8zWEtvb2VXYUE2ZWVuTCtyZW5CODdxY0pvNVp2ZnEzL3ZDVkxIc2pNM0gxendzc253N3hQV0g2MG13cU1zQlVyT083U0Q3OCswMmJxUjVYL0dwRnpKS05EeXZqUEd5MjVmVkp5WmF1RWw3N3pSUFgveVJQNTFEbTduQ29LSkJVWVlRaHJLeXV2WkNmQzV4VFcvUzFqeC9GbVk5Y2ViVDlqWi9YRGkvYlVqWG9sWjhkYlBXYk8vZWpPeVVsSFdzUU9PM05UOUF0bmI0eCs1bHk0TjdqM04wNlFDb3pRQkh1bCtiUzhQbnpOL3BPZEZoVlY5NXo1U2RVTHc1YXV6M3prdFJsRnJlSkhuOFArMkpxaVZHREVSVVdOcnpaNVphZXVYYjIvOGRYbWd4TWRCcjE3dU1lOVU1TGVtcE5mRlRsODZjWmx2ZDU4ZStkOVU2ZVd0RXVPK3FaNXpJcy9lQ0w3T0dMM3pBNVNnYmtNZG42R1hYRGFad1YzS2J0Q3FyaSsvbys3eStzOTdPNHRxdy9VZFo1WFVEMXcrSkxjR1oyblRjOXZPeUdxcW5YaUsxeXptTUZjZUZRLzlBK0VERTBxTUFleTYvanBQODB0ck8wUXYrbG85MUU1cFFQN0x5a1owVFo1OU00Qjg1ZXYrdWVrNU5LVzhTTlBOaC8vNG5jZWI1K2YzSEFadnBPbEFyT1lGY1hGbDJYbVYvd2hZblBWVmRtN2ZIOXBmS1Y1WUZhQmI4VFV2TXFZZnkxZXM2RFA3RVhyN3ArYWZxRGRoUEcxeldPR25xWGRNMmRKQldZeGJaTWpEb2RGOXZyUjQrMUJCd1pjS0JXWXhYZ2lldHYyODF0azZGS0JXUXdWbUx1bEFyTVlLakIzU3dWbU1WUmc3cFlLekdLb3dOd3RGWmpGVUlHNVd5b3dpNkVDYzdkVVlCWkRCZVp1cWNBc2hnck0zVktCV1F3Vm1Mc05wc0J1UzM0bTh2SHBzZG1QdnhZejA4NG1yRms3UEdkL2JRK3JYSFdndHVlbUwwODljS0N5b1VWR1h1WDFVemRYWGNVK1BnVlBveFFxTUhjYlRJRmg0OG5BZXJ4UG5MdDF3cmhqTTdaLzFoK2V5bCtoQW5PM1ZHRG1HaDdkLzhlVm4xZmREMDhwRlpqYnBRS3p3cTRYUmk5ZitSTC9wRktCdVZzcU1HdjBlSHVjTHl2anJxQUNjN2xVWU5hWi9lRm4zYWpBWEM0Vm1IWEd2cjlwRkJXWXk2VUNzODdFZFp1R1VJRzUzS1phWUc5dVg4YUZ5cGgzVXRHNTFVb0YxbWovTjd5S1l2MmRKaFdZZHFqQS9NZ0taUHJteFZ6aDEvdmg2UW9kTnBmVENvOEtURHROdXNEYXh2ZmloaTFJNWxaOXVvVTdmdElIVDRsNUhLd3M1YmNCMnpZN1NRV21IZGNYV01kSmc3aklaUm5jbHVKOHJ1SDdieUZzZThHMkRkdDJ1MGdGcGgzWEZoamJ0WE1TclBqWlB3TXNGcXVsQXRNT0Zaak5zR09SVVlGcGh3ck1odGp0ZlJrVm1IYW93QUxBRG42d2d5QXBhOTdrai81aHJ6RHM5L04zNU9oMm9NUnU3OG5zVUdBOXMwWnpTd3R5ZFpYTmlhMGxTQVhtUjYwRnhnNmpZL01GNDJPWkkwSStvR0tuUS9sMktERDJoNm8zZ2Y3NHFjRDhhR1dCQ1laeS9veHRQemFuRlZLQmFZY0tUSWFlQmNiVWl0N2JFWXBVWU5xaEFwT2g5eDgyZTIrbUJTb3dxVlJnU0tPVjJxWEE3TElkb1VnRnBoMHFNQmwyS1RBMkRwdlBDcW5BdEVNRkprUHZBbVBYRzJyQlRpZWNneWt3Mkh4TllHc0xVb0VoalZacWh3SmoxMEJxZ1oxM3crYXpTaW93N1ZDQnlkQ3J3Tmk1TUMyd2s5WFlmRlpLQmFZZEtqQVplaFNZMXJYWnlXazdmbnlGQ2t3N1ZHQXl0QllZS3d5MmE2Y1Y5bDRObTljT1VvRnBod3BNaHRvQ0V6Nm9xY2Ruek5oMWp0Z2FkcEVLVER0VVlCYWk1d0VWSTZVQzB3NFZtRTFneFdiWGUzVlFnV21IQ3N5R3NDT0o3Q2drRnBjVlVvRnBod3JNeHJEM2QzWW9OQ293N1ZDQk9RQ3IzNnRSZ1dtSENzd2hXSG1PakFwTU8xUmdNdlI4dFdDSDhyY1U1OFBNK21CRmtWR0JhWWNLVElhUnUyTmFyMDBVWThXbFZGUmcycUVDazJIRyt4MTJZamtVMkljNHNYbU5rZ3BNTzFSZ01zdzZvTUEramhJSzJKeEdTUVdtSFNvd0dXWWVzZE42eFQzRHpNdXJxTUMwUXdVbXc4d0NZN0wxdEdEbVo4YW93TFJEQlNiRDdBSnp3blpTZ1dtSENrd0dGZGh2cFFMVERoV1lETE1MVE9zOU82akFRb2NLTEFTZFVHQmF0NUhCeG1KekdpRVZtSGFvd0dTWVZXQmFiMGdxWU9aSFc2akF0RU1GSnNQb0F0UGphZzZ6ZDJPcHdMUkRCU2FEWFlyRXhySlhDR2FvMS82eEU4cHNQajF1TFNCZzlqMFRxY0MwUXdYbU1OZ3JJQmF2a1ZLQmFZY0t6RUZZZFVzQktqRHRVSUU1QUxiYmF1WDlFcW5BdEVNRlpuUFlaOHF3K015VUNrdzdyaTB3ZGlDQTdWS3hRbVBYN1drOW9Xc0ZkcmtYaHlBVm1IWmNXMkRCeW9xUlhhSE96ayt4dytCNkh2VlRBMXZQcmpjZ3BRTFREaFdZQnRtcmkvRHFLQlFrVXcyc2tGaGZOdFpPcjFMK3BBTFREaFVZR1ZBcU1PMVFnWkVCcFFMVERoVVlHZEJnQ2l4MjVYUk9xOWphZ2oyelJuTkxDM0oxbGMySnJTV1lsSlBOZlg2c0pDU2ZueHVMenExV0tyQW1ZREFGaG8wbnRVc0YxZ1NrQXJQTzhlK3RIMGtGNW5LcHdLd3pjOXV1SjZuQVhDNFZtRlYydlpCZlVmOUhLakNYU3dWbWpZTVhMVXJpbjFRcU1IZExCV2F1SG0rdjh5a2Jkb3lBcDVRS3pPMVNnWmxqeTlqQnB5TlhyUnRUWE14ZEJrL256MUNCdWR0Z0NtempsNmVidjdYYk4zSnVRWFhFdkU5cnhwRUs3cXFOV0xhdjd0bFI3eDk5Y014N1plMFdGRlQ5SXltUCt4MDhqVktvd054dE1BVkdHQUFWbUx1bEFyTVlLakIzU3dWbU1WUmc3cFlLekdLb3dOd3RGWmpGVUlHNVd5b3dpNkVDYzdkVVlCWkRCZVp1cWNBc0p1eVZ4ODVqaVNIZElSV1l4Y3pOOTNYcE1YUDJtazVUcGhUZE5UbWx1bDF5MU5ubU1VTi84a1QydVlBbGpIU1dWR0EyZ3VPNGkxY1VjNWV0K2JMMjZya0YxVGVrYnk4UEg3ZnVTTnRuRnBmY3ViREk5MmpHQjRkakJ5MVltZFA5OVRtZlBEUnQrb0c3VWlkVk5JOGQ4Z09XV05JZVVvRzVoTDFscDY3Tis2cWh4YnQ3YSsvUC9zVFhlOXBISjRZUG1MZHEvNzFUTStwYUo0dzc0NG5xOXlQMkIwQWFLeFZZRTZEeGxmR1N2TEt5SytibVYvd3hhY094djhWdFBocFdlTFNoMWJhdlQzZDlkNi92K2NUY1BhbmRzMmZ0NkpBU1c5azZmc3pwbHJFanZ3K1A3RWZ2RFhXUUNveFFwS3lNdTJKVGNmMk44d3RyT3FadFAvNzBneGxUbGp5ZVBXZnpQZW1UUzI5TmlhbHFrelN1cm1YYzhJYWJvZ2MxN3FaMm8vZU1pRlJnaENiWSswWDJ5c2plTTA3NXVQYnF6UHlLdithWDF0K1JzLyticm91S2F2cGs1QjBhUFdiVnRxbTlaeTE2LzZITWFVVzNKa1ZWdEJnL3RQRlZzUXY2aCtoV3FjQUlVMmw4bjNqOU8zdDk3Ykkrcm5wZzh2WmozZUkybHZkNU1DTjF6cENsNjJaM25qN2o0RzBURW1wYXhvLzg5c2JvNTg1NnZFODZmamVWQ295d0RTczQ3dExaUmR6dnN6YVVYSjZVVjNaRjcrVVZmK2k4YU45VjQ5ZVhYM2Z3K0EvTmNqNnZleVIrN2E2NFI3Tm1GdDZjK1BMSlpqR0RPVS9VMDF5WXR4djZ4MjBIcWNBSVY1Qlg3UHV2aFh2cVdpWnRydWcwY1ZORno5bUZQdS9JWlp2ZmZ6ejdyVjBkMHlkLzFUcHhURTJMMkNFTjRkRURURDJhU2dWR05EazJsSlJjWGxUVzBHTFpaelhkNXUrcUhwQzk4OFN3Wjk5ZU5lZStqTFE5TGVLR24vRjRlNThQOC9ab0xKRFFYeG52VGtzOUFzc1NCQ0hBZGxkekRwNyswNnlQZmVHeGE0KzJ6L3p3MkFQTFA2dDdidUttQXluOTMzcDNaY2NwcWZ2YkpvNnJhaFgzMHFtYm9nZDk1NG5zZ3haWSs1UVlIMHhKRUlRVzJOSFVmVlVYcmlvOGVpcHN6WUc2aDJkOVV2WENoRTNsRTcxcmpzeWNVMWpkSDdvUnBuUFJSZjhCTCtMK25tcmt6b2NBQUFBQVNVVk9SSzVDWUlJPScsXHJcbiAgICAgICAgICAgICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVZBQUFBRE5DQUlBQUFCaEJiK25BQUFwd1VsRVFWUjRBZXliM1c2Q1FCQ0YreXlWUmFCVnZKY2ZVS0h2L3dZN1BFazdUSWhPdGlRMFl0YTFKL2t1Mmh1di9ETG43SXh2OXZnZU1FVmtTMFAxbHRxVXpoOTAyUTM5ZnZqS1J3N005TGY2dDgrSGJrZVhUenBuMUNaVWIyMWxiQm5aWWlNZkM4Q3JFcWJ3eFliOXJBdzFXenBsUCtxSzUxcnlPUTdLLzM3UDVwOHlhaEtxWXY1WW1BOGcvRlBaVGxWTWJTcWVLM3VYNC9yZjU5VHRPQ2EwcWEwTW5BY1Ezbk42RjgvWnlXNk03cjJLN25lZzByN01mREdmNmhnREgwQjREOUZkcWE1citYcW9xQzg5bjA3UzgyUDBmQURoSDYxNnpOWDZuSTJlTy9WN1BaYjNmQ3M5djRENUFNS3ZSUm5KYXh4N3JpTzNIOXllM3lUbytRREMzem5TRGRYc3VZN3V1VC9iNTN0K0p6MC9RODhIRVA3UDBaMGt1cXNGbTgvQnZqenF5OENYdEQrYWI1RDJBWVQvemZNaVl0V25teG54Zk4yVzdxSG50eWsxTjJjOE1COUFlTmFnTXRRbTdIbTM5R0FtRlAvMUN4OTYvcjhGd2hleVlKdWllK2NzMGdOSDkvdzk2YTBlei93ajVIOXRJSHl4dVRsM1R4NjBTQStpNTB2YXB5cEcybjlGSUx4OHA2L243dUs1MzRydVgzNHhYMzZ1TXozdmhXNCtnUERUYTV4NmRRY1Q0ZmQ4QU9GbHdhWitxZXEwZEhDZDlzNVdUOUkrdnBSUERZUjN6dDBIZFFZTHoyZVk2L2sxdG5wUENJUlg1KzVxd1FiVlYrdjVwWUgybm9Id292cDF3Y2J6L0p1OTgvNXk0cnJpK0IrVGsveVFjM0pDN0lCdGlKTkE0b1FDdXpaZ1U4Q0E2YjNZOUU3b1p5bW1zMkFNbUE0dWdBMGN3UFJlTU1VWUZqQ0ZsWGFsa1ZaYUZhMUduWHprWjRaaE5Ec0lJVkc4ajNQUEh1bnA2YjAzdzN4ditkNzduc3llNCthdjJZcmVkUFo5djdwMFR2allmdlgwVWYrR1VtVjBuNG9QL21scjJhQzg2VjhrMUMxRXE5N2xEdU02eVRqL0JZZ0VQTStjeFU1VlBkVHQ3elowVHhvU1Byb3ZacitYaXNVZWlIL0pSTUt0Uks1ZkNYeTlYaG5jR1hWQVQ0bnRyT044c25vd2ZETE9sMUpvd0d1dXU2SGMzZUM2TjYwSHppdTdOTWVreDJ4M1U2cjZJSlY4WVBvdmtValdoS0szcmxldm1Fdi84bVpQWmUxbG5DOFA0Wk5TRU1CcnhMdDJucFR4S1JRQ1loMjkzcXNxR1JmYXR5UHVjcWJVOElOcy9xVlM5S3c1c012ZTVtODVnVUhHK2FLQVR5YnpuMWtrNERXYzYxajN4d1I3WHQ0czdib3JJM3I0MWl5TzNyeG1qdXBrOGtFaWpsZWZTc1JOUHllOHQ3ZDUrNm1lZnFaR250aU5lS0dpdzcrZGd6bzV1aGZaV3RSLzFOanhIV2YvZG80K2JXaGtIRnZ6MThWb0JSVEdoOUZvOFZjaHZIN2lqT2hRVzR2WFJYOWU4RGJ6NXRQSWkvc1BVL3IzR3FjZGZ2bEFTM2thd0J0MnFnTDFXaExwWUthNnRFUTljelN1T0RKQm5vckhVeEdWQUw3bThKN3FsZk05Y3lkRmZ5NTdGc0R6WlBQbzA5UFJvMWdaMHRuWnR5M2tIeTIxSWNmK1hpUHYwdG1ScXovRUsrNnJaNDg3K3JhbGtmNnNtY1pZK1ozWTNWc29Bb1lLYlBsY0dmSmg0VERQcE16aVc3V2c1dEFlN2diaTM3ekswYWV0UlNERDR0MVRQd2wrdDFYMHh3bkNlMEl4YVIwY3ZWdjdONnp3cjEvK2l5enpyME9XOHRvN2I1S3QrV3RXY2I0VUNYaGR1ZnNmek1yZHpaRVFyeXpYMkRpTmt4TTRWMDhkOWk2Y3prT0pyMjVyOVFhMkNFdXJYam1YTStEQlJ1VkhyWGowRXo1dk1oUkloa1BKVURBWjhLbW5ENFA4VE9SZ1FyMUxaNldpVVppQzhQSHZFV1ZvR3RKZ094bXVTZFlFd3ljT3hKMFZ6djd0bVIxQ2diY1Y3WnNVeUxZckkzc3lLYk9rM1p4WWxGdUVzOE1hUEhNbm1tb1pGQm5yZ1FIaEsvUkg2Qi81OFlMOS9YOW9mVHdsNC9rVXhjbzkxMHVrN0VkN3U4YWF0MjhTNTB1UmdBZnFFTzhjM2tJZUtQdHo0NUsrNnNkb09HK1ZkOUVNWlZpWHlzNU43VzMvYm10Wi83R0h1R1B1Z0NkcUlHU0EzZ2NEc1hzL3ErZFBxV2VPOFRkMjV5YktKVkdsa08yenQzNk1CUUFiMGRzM2t2NXE5N1RoRE01NjhONVJRSUE4N3JBcm8zclJpQTZ5RnpmMExwdXRYanJqWFRLVFRHR2hBRCs4dTNyNmlIZkJWR2dPR0VwbFdOZmdqczBBSHRmRDBidU5BZk9WbmY5YmMzZ3ZWOHBYM05OSFZuWnJnYVp6VFJyTXZkV3JKQUFQMm11Ky80NTJSdjVWRmsxM1R4MXVLMzdURU9kajhDWHNINGtFdkg2bmF2WUN3dlc0amQ0dU05cXJmQURlVnZ4VzRNc3ZlTGlUUVgvZ3EzVmdCczhXQTg1ZmZIdi81cyt3K2RoQVh1Z3pmSFJqZWVvUHAvVldFVEJnOE5XTFp4aFQ3enN3Vk9IU0JDSnpZUWphN2EwYmNkV3BhTVMzZG9sR0xpQjRROEh0bTNBQlFydS8xSC9Gd0Zud0VYa1F6SDdWck5HMEc4U1F6RGZXOE1sOHZnUzhMa3JQSGZDeHV6ZHB6Qy9nZVh3OUM2YUNkbWlDcXRsajRhNE1IVUNMWjg2RWhNdUpxYSthTVlwb1diU1Q1RTlVZTRnc2dKRFdtUkhvUmhRZ0d2TWh1WWY5YUNqMFZIRG5GcjFuQWIrWWNLWHJGSEFFTEw1TC9VSnc1K1pVUE1abGNvdXl6ZWVMTWg0OThtV2NYMGNCcnoyNEx4bmc0YTZ3MG1Udi9GdFc2U3loRWZQK1RTdnBFNzFWVnRHdXNXaWt2SS9sRWJwREgrZ3RQSUNuTVh2QXN6REdyejNXYUVUa2tpUGdONjVJUlNMODFjWm5xYjdQRjJMMmlWK3NQQTdoQ0h5ekFVYWdzbHZMTEtlei9Ha3RHZWZYT2NELytlVUVQRXcxekJ3VUhkNjd4ZUFZUm9KemZIdGxhQmRsZEc5MFJQVEdUK0NCRnZYU1dkNm01Y0xwMkwxYjZkQ0F4b3RuRU8vQ2FWaFgvQUw0TU5lRVFYck96RFZwQ0FRaGc4U2Q5bmlsRFpNTHdTWSt4Y3R3OXZ1QUtDTlNkZ1U2SUY1UnJwNDc0Um8vVUlRSldRcUJCbzRHRklQeXlVY2F0bkZQMUN2bldiTnIzQUNoN09qR1lqSjFDbFFvOVE0b3I4b1BtN0Vlakh6TytYek12dTdJYlFuN0Z5b1M4QmgySEZleVdUaXgxcXdlVUlHVGg0RlRodmNnNndaalJ5U01zb2hjdThUYnlFOFg2VUNPRU1EVHlHc2F2WXRuMklyZXdLaXlCcWd2emFRSGQyMGoxQ2NpUUUyRWoreGplYkg3dDlYekowVUgxOWorMElkMGlGeTlpRktBUGt4NDNLUU1DS290YWI5NmFBUXNNL2NCZmNFVStQT0JiV3U1TG4xZ0Q1T0g5aUdENkpvNGlEQ2VxVm1BYjkweTVlTnUrbkNtb3RNN2FCazZrK3BqL1dndTE4VEIwQlk1Nzh3M3h2bHZ5emovdVlzRVBQQUE2dkRWUE5CYWNHNHEyRUQ0YXJ6NjRJNU43TW5CMHlZVGhxbGt1dzRXRW5WQWk2MVZBOCs4eVZoRkdtbkJmdUpMSXdDR0w1SkVGTEV4RUVMRndQOVh6Und0SnNWK2t2bURNT2MxRlR0b0VBWWhMOENhQlpKaHpqRDFhQUVLRXl6eTZxRmQyMEo3dmtaQmtHaUlLNVcrMVlzZXl5d3d5OENPWk8vQ0p3L3hVZEx2b3c4dUJzTlN0c1N0OXN5WlNKOUhnRDk3RE5KT0NQazVoRHBsbEE2cnlyMkd6L2pUV29MaGszSCtjeEVKZUFKeTRBRUc4TGV0OTlpQVczYmo4TkNIOW42akorM0NKdy9xckM2azNSaXdTcU1Xd3hzQVQxcWVieVdEQVF3czFMMkp4N0Z1T2JYQTRXUDc5QTQ4dGhkcUhjVlV2WEtlb2I4K1RPRCtVT3BETnk0NTRmT0VUeHpVS3dnY2UyVmtMd2JIenllSThHOHM1Vk04ZHJRQWFvSVY0bVVRdVdndXZXdHNQM3lOdEl6clQxRVRXZ3lQaHNFRFcxYm5wMjdmc0ZHdjhKdnpwVWpBTjhGeEJmRHV5VU9BbnpYZ3lkZ0JlTEFoSGx3ajRIVXNQU2JVRlBEb0ZNLzhLZFQzaC9idHhBVXdUUkFTQzBBQnVLY01JN0d2RjlMNFltU0xJbCtJZHdCTVBTOG9EZTMraWl4ajlNNE5TQWZzOWtQQTl3VHdYQVhVdmQ3VlIxbW81NDRUQXFCV1JNQnZDTnA1VzlIaFg5NGxzeGlUcWdSbFROOTgxdTFEN3orSG45YVNJZ0VQd0loZ3NWcWVULy8zUkplZTRsUGljMkNmTStCdHhRMnBoNkZZRGRpYnprSWRMbWFXOWFnWFRrRzVhUkkrZFlnRUFiUEQ3V1Y1NndqWG9Sc2dBdGhUaUY0VGdPZWtBQUFmZDloZzhneDRkazBZQ0pqVnkrY29GcXI5SmpTZ1lnYzdIOWkyaHJnbWI1alg0dnkwemYrVGJzZE92c0V2UlpKMk9Pbzh3VHpIdHFLM3JQRURadzVhS0RYTEdmQkUxRFVIZDhQdFY4MGFZem9MRGovT05wWVd6OXdnRkIwUmI0dUFJbHZNWTdldm5NZWVreEVRZTJBWVA2bldzQWVKaWtCRFo0SjJxRUdpZEVlUElvc3hxNWVYb0kvUWt1aktnbTdSMWJKNklQOWhuUC9NNEpjaUFROVRoVXRQOGJ4MXdwbDZYdmJrSmp3dUl0NmNBUSt2UnE0TEM2OWw0QXdDRFk1QnBnU0lXUnpkVzJWSUVWV3hUN1dqaGkwOUVJUlFpWUtoSUk3Z0tsQWZJTjlnNFJtZnU1MHV5T25hd2dyd0srWnhnZkNYT1ZRV3ZmZzRYNG9FUE8ya3FlakQ5aklRVWh0eXlHL2hVY1B3RVU3bkRIamlBZ3BkZWMxb3BzVTJ1QUQ0RVZoYWF1T2ZxclRXdEIzdEVMbCtHZjhGK2cwTEw4Zy8xb2FKWnAzNmIvSGFQWDBFV2k5OGZMOUY1bzlCY0RFWUVNTHZSWjNNZ2Mydks2NitCRHpacGtLVTFub1h6OFRxWXIzaG9qSENtZW11NnRLNWdBR3lDanZQUTU4ejRKbExHZFdidUFBekMzOW15QXN3RGgwb2FLVVNUcjBvU3ZTTjZnREVtdVlhbEVHZERCZklXNm9ER1FvTm9oMytRZUFOSFVpc3pyNGdSODkzdFR0QTBSSHhBdVVEckY4TFlkaDFvNStPS3lJU1NYamRiTWpoMmd1SmMrczRYK2Z0eXgwN3YxbkFKNU1VdXBGbnpqdmd4YU1NYlM2eVdkVGhrS3hpTng1NDR5K3VOUldtd0FibTNGTXlRVmpGbkFFdjBsM0JiN2R3T2V5V2Q0MGZBRlp4czVtTHVoY3E5c1V1ZFBRYUhhRDNIRDJMQVI3anc1Q3puVDZ3ZFhWRnAvOWtycDlnaEVDQW02T002Y01lZUFST2pyZEU3MlR2MlRtbnI2TEZRNkgwZ0V3QjZRbVVEdmwvTnZhaEZKaVJtNkIxbzh3Ry9FTXVjamRZa25OQUI2cHhpWDI0T3Q4WFMxK2lvN2cwNU1zNC96Y0FlR0FtekoxdnpSSmxVR2N5WjRVQXZDRGhlYUF4OG1JVGJ1VGFaYnozYU5sVkhuR3dDbUhHNFJEVTFlZ2ZQZzZjb1BBR0N0MEkrR2hVdjNtR2thbHlZUkRCOWlFRXlSeThTUXVXbHVvNmF1bEljVE9VVm1sSHlnQ3dnVUNRVDgvUTN1MlE1NnlFWWo2UWIxcEZTMUROeXRPbHZsVXVQQkVHNTc1QjlidlRkSjJ4dmdBQWg0K2t0OGRTVVVOL09FSXk4NHlnMlh5RWFrTGFHUk9sRmxlY09EamlQbFIvTmw4NFFibExJZVA4Vjd0NlZ3S2VaeDFhbUtkY002MEZBandDYnJIbi92V2xKTURJWm9FSFlJQVpKTG1GeDV1eEFBaTIxdXh5TjJ5NUlWcW1oSjVHY0s3Ri8yaUI2STJyN3NsRHRXNXNPeWQ4RUxXNjJFeks2VW1Ba3ovWG5BSk1OSFd2b0JIY29oZGdHZEJIR0h6VDZpRFd4cldUY3VOZVVTWkFFVDRxaGxSOFJmdGE3eHQzZzNJYUNBVUtCem5HUS9tNHF3SEcrQjN3Q0FRN3pNdi9BZ082cDQzQWxjQlplSWxQNEJSWnZUL0tPUDlWQlR3ZUw1VWtuaytuQkxkdnhMVUdTRGlaV0MxSVpzd1JkU1prbUlsc0FaVkFFZnRZY2dhODV0NWpnZkdLMlF5SEphVFF0WFltcno0TG9HUUZVT2tUK3dRQ0xGdS96eHdzTVNZUU1oQmc5S1RvblltZzMrbVRpVWxJZTJlLzlES2czNWd1bXdQMitCWVRaYm5CRGgzSHZIekxZa0RtRldkN3ZDS243Z3B2WDhiNWhaVDAwVldJaUtIeUNuZ0JER3JDQ0dVNVdBWWZGWDhiMjRzRnBqb1ZqNWNRR3R0SUpUejJDaE1YS2J0cUR2Z1RCK3h0allDWFVwZCtRbHRrOVdTYy80dy85L1o3N1RSS2ZaV0VVS2tXZ005ZHNJZlVrMU41QnRHZGVSQTlHYVBNeHBqOXZtL3RVbEZKS3FXT25yY1A4dVZQYStVb3YzdjBDNjVOdEY5cXJvZm9UejNRWUo5bndPTWhZL054UklseUNWbmg4eUNUVEswNmJCTzBjMVhKZURhRTRDQklBTlI1NUJ0L1dzdjZOQjRwMmdIVHRmNThxNUU5UWFYK3VodENBRDcvUW9RUFR4Yll1b1lzRjBRMzVEYkhSZFRzLzViYU10Sm1va2hHaWhUVE9CKzdKREdmeFc5QWFhZFJHdEJ1Zkt0blR3b0ZlTzBBTmxneDh0aWNFZy9YbmE0eitUOTdkNWphSUJERVVmd3dLVW1RMW5nQUlXMUlRdTkvZzk2a3V3N3lqNk5JOFpNemZmQk8wUHJEelRxNi9sbVVJdVJiNWJxc3kzdUV5L240SVhrZDYraGgvMjMzNUNMd1JQc0k4S0krUDZsWmVyZTBWL0FFZU83cVpUdER4N2U2cjBzRG5nQ2Z3N21XN3ZjUG8rNlc3b0Fud0lkM1BpemRUNVc2N2NiTmZvRXJ3QlBnNDJyWEE3Wm51eUljOEFUNHlIZjE2dnlzcGJ2N093Q2VBQjkvMTExTGQzOVNzd1Y0QW55U0dWak56S3cvU0FjOEFUNXVOdTR1NTh2SUFVK0FqKy9jTDkwVjRDbDRnUGRMZHovdURuZ0tIZUMxRzJmajdyYnhQanIzRDlJQlQ3RUR2TWJkemZtR3JUakFFK0RET1BmajdncndGRFhBeTdrdDNmM01UR2NCbnVJSGVMMlVQbzY3cnpzSFBNVU04SHFEVGM3bnlBRlBzUU44ZFc1TDkrYmxUVlVGZUlvZTRNYzNWZjNNVEdjQlBrVUVlTDJVZmw3OEZHejBBRStBMThhN2ZVOXFNZ01iM3puZ0NmQnk3cGJ1c1g2bEE1NEF2MzNjUGRIU0hmQUVlQjNNNUIrdzVhSU9lQUo4YndlMjZMV1diTC9TQVUrQXQ0T1o5SFYzL3oycFMvUUFUNEEvYU56OVUrUHU2WndEbmdDdjQ1TWJjMjdJb1E3NEpBSGVPOWV1ZTVvQVQ0RDNiNnFLZXFJTk9jQVQ0SHMzN3E0eFdKQURQaytBMTEzOWEvbDdVZ1Q0RkZjRDRQWGR1RVl6c0d5OEE5N3Z5ajVMYmNBWmFjQy9EYzYxZFBkbnNFRWQ4QlBoajdaY0gvVXF1VFhsdG1ETHZ3aFJWLzlyMStQckp5SjVrQTc0YnBwcGIzOGVGWG05SVZ4UDVZcXBONHArR0orK3Y3TnpHK1kvYS85RWM4NlBzbjhKM2dzMzNoSithK3JkNEhvMDVMWCtVTkw1MnpzSEQvTHYzL2JPN2xldTZ5cmcvV01TRW9JYTJTRXRMOWhKS0xWdzRxb1BmQ0MrR3lyMUFRa2hFU0FWRDBnVWFFclZCeEJLSVpFUWFxR2lRa0FGclJCU1docFVsYlFncGVHREprQWg5dlZINnRaSjdLVEp0YUVOL0p5TlQvZjl6ZldlNVRObjdwdzlYVWRiMXN4NG56UG56dG0vdlQ3VzJtc2YyamwrZU9mZTd6eDkzNTA3eCsvZ2t3T3owcy85eFBGWFB2bUovemw3Nm4rdkhWLy95dm5kSno2ZHdHOE1jaEVPdlVXTUF6bVNISjRMNTRWd3R3UisxcHpURGtONFFmMzBpVGVkZnR1YmVjMkhCM01Qb1A3YTdpNlE2NEQvQkg2REJya2hieEErZitDVDgwcWszN0ZUT0QveFpsQ25YUU8rU1BqMXRzdFAvNk5CVCtBanJWYUhHZ2VhRWoxUmxpNjg5NWYyRmVPUzUxQXFYYjFCK0FFRG40MEhHbnpvY1BYeVgvd3htbk9sdmQ4eHlITzFBdndMdi91YjlVVjR1dzdaenBYWEJYd0NyK01ibHk0eUNLcmdXZkdySThadmUxMk0zMUpCWGhua3RFNkFUK0IxdkhaNWQvZUp4OCs5NDhScGlmUk5BTS9zSTAwZU9YVCtnZnZMLzE3NnlDTnB3MDhEdk9mUk02Zk8vdWhiRWVNUlhiMUw0Qk40Q2Z5dm5qLy80THRFK01FREwvR083Sm51NGdsOGV3U2NmKzdNRDk3VklMeDc0Qk40SzNlWHpyM3o3WnNGWGo3NThaZEs0SG05YUpEaldyL3dhdzljL1BBSEwvL3JGMTdiZlhXUmVjaE00UHRxMG9mMyt0NFBBKzI1KzkvMjRxTWZ1UHpVMzBPNE5idHpPeHNBdm4zekNYemM0MnJnNi9ENFBZcWMzWFRtQjQ1ZStkTFRHZ0d2ZnVheHpvRlA0QjFnRzZ4MDVQbVZaLzVaVDV5NVlBYkFoeTZld0R0ZmZRL3daMDRXZzd6dFdyLzhMMC9XUHpwaXYyZmdFL2pIemZsQ1E2clhweUQ1TndVOHpya0VmbVNRdk9TckEvazNnVC85YkJERmIxeDhzZjdkTC83Qjd5VHcvYlJEZTRELzNOOENhcnM5Ly81ZnRsYS9JZUI5OFFRK0VoNnY4OVdCZkFUd0wvM3BoL1lNbW4vNGJBTGZSU3VCOUFEd2JrVG02ck1TK00wQ3Y4aDJhY095c3lxVjljak5kYjc2T09DZis1a2ZwcjlPVE9DN1NIZEhkUjhCUEZJOWdkOHc4Q0pjK2VyWEl1UUY4djBUWUVZRFR3c0Q3NW5pYTMvOU1UeC91UGQxQlZ3RG1BYWRBbzl0aWZjTGgwaWRFOExiM1NjL1IyN2k2cWttWElkOHAzSlp2b0xnYzVUei9ieHhLd0hmdjByUEV5a1BxL3lrdzYrNjh2UHl0NUNuT0l3SHZvdFBwcER3b0Y0UzNlcVZaNGp4L2ZEZUlQRFAvOWF2RHQrbFF5NUEzUDRONEpWM0FXa1JZT3BUU01hNm9WVHRLLy8xYjIzVVMrZDJzbWZrWWROdE1lREUzUTZESmg2T2trZ1hsaEhnRzZmODk3UC9jUURBeDFORjRubTFUSlNBRjhrbDVXZGZKV3JBQTlJMVYvOHAzbEFJZDVhYkpma3NnTWZJdjlHVUhuU0JmWUdIbkhpaTFjQk1mUXF6K05KVDZtSEJGTFBZd1RTMkRvdmxPUENjNGd1MWdSOENiRTJ2KzRwT3U1Yy8vaWZkQWMra2Y2TTVac3pqbkRVQ2VBdUFxWUEvdVdDUXU4MEErRFBmZjBUYWUvQkExSC8xVjM3V3dKdEdpOStHdUk2blp5RzBBMHFFYUF3ZGtodHQ0UGxlcG9rSThJMUEraVRBMTZGNHZIY0U1L3NDSGlIaFh6SzhmS2d3SHdkZTBtVks0SVhXUVFLUGZoN012Vm1rblpBZVpqd3dEMzE0amR0LzM1NW5mdWp1UmVBUjBiWGtYUHBMK1dHYjRWYTJOcE5MUTJ2UVVHTUtHSzdNQ3ltUTVXNFpRRUhnaDNtS3o0ZVpndE81TEsxZXFWcFFoM05wNzVNQWp6eXYrNy95TjMvRmh4MEJyM25URDZ2eUR2Q2I2M2tGSklxQkg2N0E0Mk9pcVYwOHZPMFZlQnhzaXNNSE5YbFFiMGY3bEwxTFB1OGk4SUt0OFR2S0JBZ2FBanhqNi8vdEJWdE50Vi82Qlc4akk1dHU2dDhVNlFKdk11REJ1KzZNcUZlSCtUdnRrTkthY3h0blNaeEVSb3NlYnZ1VUxvRkhJRXNPUjdweDhFbms0bUwraFljZkV2Q3hoR28vUHg1OG16cHBCSTBoSllianhubFR2M0EzaTVlV04yNWk0RW1lQlhVbDBvdjJIb0MzaXhmeEt3MnJiYXhKTDJzRHI5bS9YK0J0azBONFJHZ3I2MTdkR28yZWUyYk5MejRsNENXRTRTVGlmdU9VZ1dSZXREV0NSamR3RFU0M09xVXhJQVM4eHBsVWQxbnBJOXFJUlhLWFB2cjduTmdkOFB5R2NXVlFBeXc0cHpkc2l1NkJSM1dYK01Yd1hrZG1qdVlVeHIyQTV3R293MUxTT0tVUTFYNzIwQ2dCMnhEdjdiay9Oa01KZUNuL1JYVS9MTTVYYkRlNkRCNkJqNk91TytBMVNEdzF4K2ZvcHFPM29mOTNDVHdpSFJjZGJya0NvUnpwZ04yVTBqYnlSNlh1NHR4K1ZNRHJlV0RWTDZXWFUzZ2JFYlB0aHdma0RRcy9xRnRHZ0wvdzBJTkRnRTFjSFJqd1V1blB2L3RkL1FCdktlMnBPUjdjOGVrR1hpcGhCOENQRHB2NWd0Ym5SeTZuazRJQVZ3SmV6aGc2dEJHaWM2MnVON3l2aldlc0swUlVSSTNVdGhrdjRDWFNOd2k4dlBTOUFBOStqY2NkdCtUYlFrWDYvSFlDejFsSS9xQk9EdnlObm9FcmxOL1J3S09odFlObjRDcDVyaGgrZXp5Vk9hSTlDRllicWZhNjc2MU5zRE1SM25Hbm5aTnRzTnVSNm1YWmpFVDlYSUdQKzAzY1JqdHIxR2ZiZ01kb1I5OWVlbGxINlZlN01kZ3o4QmEybHBtQ2s4N1MwelJjNU5MM3c5TXNNLzdRVngrcUEyeEFybnoxVFFEdmh2Vk9IOTAvYzhITWdaL2tOcVJtYmpQd2dod3ByV3lac0VKdS8veTRVTCtBbDdpV3ZTMjI2YVlZdmg2aHpBVE5FYnJtWk1BWDFLdEFPcENyeU1SR2dYZjZqZnoyTXdkZXVsamMrTklBVzZxdXQ5WCt2cjMwNC9Md2VEdmlJdWdGYmVDRkg2OFhUVGlCTFQwZnZHMEMyRVpvbTlrckFQOTc3NytXN2s3emlqUnpPQVBnYWF5WmNVYjlqSUdYTGpaUnhjZU5sZHhLNEMydXdkc2pRL091eGJqZGNuVFQ5TEUrNEY5ODVBUDJ4czBlZUt6NnBaYjhUZ0tmd0Vkcy9uWmFMakFiZU10a3EyMUk5ZXBjRHdVWkFqckZjMFI4QkxnZDJyc29YVjczem9DbnFkQlZGOEMzc3h2amFibjI4eWZ3MHp2dDdLVnZ4RnJ0aWEzWE1EUzhmY1AveW1CYlhXNFUxSXMzenB3bjhCMDY3WGowQ1h3SWVOeHZLNGJsb0ZyQUs2RkZJcGZwUEpnOEErUTZwVEdYQzNoWkJJR1ZxaHNBUG9GdkRJTVZFNklUZUYrMnZicW1uYkh2M3hxUUFrL0ZzMEJoc3VudDR3cHk2cllyWGl4NlpaM3U3cFV0Q2Z4bUVtK0NpeFRkb29zeUUzaGI0T1A5ZHBqOStxMEZ2QXd0RWNnbmJWbTlpTGVtZ09hczczVDMwQXEyL29FbjlxN3E5TE1GWGdNanZ1cWhzV2pDSFJKNHI0MWRkZkdNSW1TSElndVllYTBFdTBhVnUzcFM0SW5HNnVFd2pMNjhwL3pMTys0ejU5c0p2QXZYd3YvTWdlZnByNzU0eGdwQ0FoK3NkWVBRSHJjODltdVBmVnpBTjV4dzRJcjBic3RxVGYrZ3poWGk2MkZlK2RRbkxPaHNwVzhoOEtUUTk1VjRvMm05UE9qUnkyT0hFeFA0MWxwYUxiWVpVUUFEVVgvMng0NForR1VyMkpiS2FybmZ5dXYyTXh0V3FpTFNFZXhPUVFscnhaRFRGL0NrMWpLcDBWTi84dXlCdC9ZWHFGRm5pNjloR0Nid2pUVnpUck9OcjdlLytLR0hYZUtxYVc0VkV5Q2l3dFZTdlM3NXZzajVvdU45TWJjY0pOb3J4bGxTRHM4Q2JHN0FpL095Z2F4bU41V3Buam53NEwxWVZwQ3oycEpBL2Ewbkp2RHg4amlOSXBibFRyU0RsYXJXQnFka3EyRk52Y0NtbWxDL2pqZU9zaENMWldIQUEwakVERVJWbldjQy9QaURtK1R2NmdWNHplenRJcGJZL0pvZG5JS1Z3TWRWOU5DaDZMM3Iwa2V0dFNLMGczYWFvcldWMS8xcThRbkgwaXVZTGZxYVIrL0F5elBmQWZCakM0bzNvdmNKZkZUT3h4YmhXdk1QQSsra1YvbmU0dVBnM0UvZEd3K2t3N3psZktBNEhCbnBQUUxQdlJYbHBTUGdKZWNEZTg0RU5QOEVQaDVhUjVtUENQWlNOaXNNdkdJdzFzVGlvUmZvSFJGZ2cweEVmUVIxZWtvWm5qbnczRE8zaEpkUmxhMzZBZDVxSVBZNUpDOUZuVzd5N2MwRitPNGFiamtzYzJhV291ZHJ2VDJvSDhobWtrNkRMWnkzVVcrTGVyeldyQjZUd09jdHdJQ3VwZnIyTm9DL2FoQWRtKysybjJVbkQ1dzFVZ2w1eTRmOGwxRWYzUkw0R1d3WDNVaDN6elpyNExNbDhDTTROK3FKYUFLZndHOGg4STEwOTc1YkFwL0FKL0RPbVVuVnZYL2dzeVh3WWRXOWY5UVQrR3dKdkRtdlY2cnVkTTE1QXA4dGdZODYzdE5FVCtDM3FTWHcxdDVUZFUvZ3Q3b2w4Rlc2KzcxM0p1b0ovRmEyQko2V2dmUUVmbnRiQW4reUJoN1VrL01FZnB0YlN2aTdidGs1ZG50SmQwL1VFL2dFZmtzRiszZmZkUExvemFmdXZnWHhqcTJlSm5vQ24rME5XNG42UzMvMjRTdi8rY3l3bG80MXpGZWUvZmYySUdPZE5pdlZXTXM1VkpKbGpacFdkR2FiRi9EWkV2am5mL3M5MTFzd2Y3M2hCZFd3dmU4cHpBSjE2Y2d5SGREWksxV3pKZkFKZkYyZ2ltWHFMRlpYeVJva01KOVFySUt5RmhTMFdlbGJqdHlFb2Y3U3gvN0l5QzRESG5SVmVVTEFENU5DdTc3eVZqZXYyR2ZLMDRwOUtsTHlYM1NZQ3ZnTDczM3cxYi83Tk12TDYxSVRhR3A4UWhraUZSck1OZ3ZnWVJqT0pXOGJCek5DMlZzbXJyckQrVlVQUEZiNjk5eDI0ZGNmYUY5LzN4RTg2UEJ0NEZWaFZzSi82eHZUSXB3dmZZSk1uZU5xN0xneTc5bjlGUzVYZlk2WGtRa2ZUQ2dKL0pnRzZ1UEtUaUx6S1ZuVDVyeWdmdW9xNnJlZWVzdDM3THoxZHBXakt3TmlrQU1YSG5yd3lqUC90RzloS1VrcTlQWkJwSmNpTXdrOG9qdisrTXJQT0ZyVVU5OXlOVEpka3RSSEFqK0RhcE0rbUNrb1luWDlvUHJOMXpoLzQ1QThCOXVOUFgySXZST05XeHhlU0tUZ01JVi9qZW50UjkzVDRucVpkekhQOFdTNmNKMlBCSDVhYzEyYlE1V0REOW5nSFkyZDZVQ1Y1TEhoOTlVRitDOXhYbFIzWW15Z1RsdzlzQUd6Z0xmcTJON2tyTFIwMnRYQW85Z2o4Sm4rNnArUkFwV3lqRXJQVWJTNzZudFIwMVQxZmFQQUovRGVNY0lxT3B3dlBaSHB3TmdYNW8vY2ZPcXVxNnA3UVIzTzZ3eFpsWmZXTXhQd2JjR1Z2dkUyOEFCY09JOXI0L0dncGh3RXdBK3VEUzk5S1NBWkIzNHRHQ2Z3aVBIMm5sRHRodW11S3pBRlhIalB6emM0Ri9EYUhDb0t2SGNweitZZElCSGpJN2hsQ2hpeGdUUU8vM1AzbjFnOUxNZWtrTUJQRHJ6M2NwZDhIcUVqaUhtMlZZNzhHYWg1Y2VBOU9oUDQ2ZUoyMm5ZaWNvbzhLVlBGNFJrR0NmeUV3TnQwWDVGMnZPNUZkVC83STk4TDVEZTZJN2Y2UjRCbk9DYndremVGNkcvSVFRRDU4RDh0OEJvUzJTYmJlVVlidjhST0xJRjByUFJiVHQzejdUamVUNzN1alpQTG5kUUxuSEFKZkk4dS9ZaDQxKzdSY3djK2djY25KOE1ielR5MHN1WEk2NDczdDl6MnV0ZDlqNG1PUzhZTUovQmJCenlFTzNseE91Qkp4RWpnMXdJODhyenRxRFBxUjRZQW02SnIyckJOdTdoMkREeithbHhmdUtNVWZPSjdjU1dVaUdEOFVrREZpYlZzNUMwZU1vS0ZNd0kra0lCYy94cjhQaE1DTHo4dXdieHZBWmdQMVcyTndDUFNHK0s5NHJ4UzNRdnF4NFliYmM3UTNxZmRDbHZrQVBnU2VJOGY5Rjk5azBZZ2hQTklVaW85bDZMZXptK2RRNDVBL2NmeXV0RlR1VXlvOStzRG5oRGQ5ckV0dkFFS2k1aVFGbnlWOU5NSmdiYytiK3ZkNmU1MXpzenQwdDZEMnpCRGVIZkEwMjMwMXkzR3JvSTd5ZE90R01NYmFiYkptL3E4blBNSmZKdHdJM05zTCtUd2RjK3R5RlJXbC9Bdkg5SjVldUJKbUtsSDI1QVNPNlM3Y3hPQlFQcHlyWjduMXhId3lDc0w5ckhBaTQzZ3dRU3hrWWk5WE83Qm9EMzJ5T1RBYzlrdEFINWZTWTdVUkVjR0t5QW5zQVhoc0FaeGRjeUxLV0F0d01zL2p6NS9iUVhicllQWGZmUmZxNldSSFFFdjJnc0FET3Y2bXVpMFlNbTQ1Nzhhd05OblVXK3Y4MXQ1d1ZzbHQ1cTN0VGN2TkFiK29BR3Y2WWsvNS9JWFBsL0xaNFlCYjdIRGtRSGpnQ2ZLMHkva1RId1FEa3FWR1A4MnRPWUNlV2tHRS9ONVRjRFh1YlM4THFwN2picEUrbWl0akdPelRyczI4RzFOSHRRYitQRmZuQ0xnRmJpS2dDUUxuN2NIS2R2TGZjYS9Xbk5yK1dPWE9pbFlEQitrdDdrNmEzZFdHN2xMaGx0WHgrMTFkOUhWSzg3YllCNWRHL0I3Sk0rWmsyZ2FxM0RlOXRzeHdjOGZlQVNkaHRjSWkxb014eS9GVFNxYmZhMGlIY25NWENibElrSzdmaVZRNTVOR2JRS0ZiSW9ITjI0UHR1R0gvSVBGZm45ckhERmVHZVFENUczQzF3KzhISEplbE9vL1p0WGNDVmxpY3dYZTNlS2FiZHlQelpmR1R2RzNUOVVDS0Y0SytnNWtYa1hXeG9wU2tKNXdxUndYdlBTUlJ6WmlrQmRoWGlRNXVqcmFPQ2txYmNJUEFuaHh6cDF4Znk4OC9GQ2J0TzBIdnNtYkx6dGV2QWR0Y3JzUGZBUFRBKy9hSWZHaUdqSjU2bG5qNWIvODZQbGYrT25pdEFOc0ZPK3ZmOFhUQVo5TXZqYVdMMW9MNUNKY3V2cFJJQzlpdkhCdTFBOGFlSEhPTFE0QnRoYysrTDRFWGt0RUo2eUtBK1ExRWlOYzVSd0hLZUZMWmJ0VkFwYmMvUFc4OURqdDRueWlvak5hYUl1Nk91WUF3aHhmUUhFSjYrQy8xa0w0NEZRdmtDUEp2OG01Q2Q4QThPSzhMRW92T1ROMUdxem0wUVFlUVRkVlZSeFp1YnlOMTRTekdYOVF3TWNWZXdNZnk2VVg4eGp6cXc4d1lhK0ZHMkc4ZVNHRFhGNjNXeUNvYlpCdkRIalJYdGVOazRrdTRKazExd284Yy9QTWdRK1kzQ09WWG5jSUE4L2I5UzJHTGVWdWhzaWl0UFFZOE80djROdUJtOVhMMTNJRk1SK1dXemJJUy95c0VSNVhtd2Z3cmlmMXhwSWJkNzM1Yk9yeVFQYlNkeENXRzFzekt5NER4eDlUQTkrT0xNWWppUDdyd3FtMXFOeVR5eGl1R1ZJY1JQaWU0TmxWWFIybmVxMm9DL1g1QVY4MlpsSzZ1Nlc2Vzl5UHN2VngrR2xGSzJLekgrQ1ZlOU0yS0FTOEkza0N2cDJPWlJteitraHpBTmpoOFIybHNqWjE5VGtDdjVqdWZrT0JkTGxQSndYZWozYkd3RTlmSkkrdjZ3UjR6M29pT1FJOHVrQWNlQ1hodWNOSUlmK28zSUdMQnZrQStTREpHNFRQRi9qaWpZdHpya2JzZlUxSnk4eXlVdDdtQ1h3QzMwNHJEam9hd3NEYnN6Tko1T3pjVHg3M0VBS0hJVHplVG9EcEMzaXRWSTNTYnNmcDlINDdabG5IUy9vQmZuWDN1Ryt2MjQwcmdIa213TGNUWU9wcnZ2clpUeFZGdlcyUWR3bDhmQkZic0ZMRm1neDRnaVV6Qng0djNlcWl0Zk1xMmcyWTdlU3pnM1A5d0l0d3JTM2RBL3huUHRrbXZHL2dWMnd5NDVITWsrdnoza2lzQjZjZGdtNUM0Q0drZCtEVkNOZjc5NHdEUDBMQUhLTlZhMHNYOHRYM0F2K1lFVXJnclh0UEtlVHRHa0Nmbnovd01EbmRZalhyQzd6ZEl1QWRoc0RzSCtlMDQzV2swaE9jRCtGeE85VmRkdGsxbHhQNFJsbjQxVlB1bE0vakdhU1hUTHZWVjZRckxSODhPclRobFNQb2JsSmhSb1RsZU5iQ3V4TGpRNVpiQlhsbGtHdnYwL3BtNEQrQkR3bjUxZDMxMk9vOFVWK3FFK0Q1ZlBWa3UrbW5qODE1NmJudFJxNk9mcXNBOEI1cDVNa3BsVlVMeUNYSmcyVWQzQ0dCWCtwakExb2V4Z2phNVJHUTlkN1hham1YcGh4Zk1jckpwN050N1RoOGJEbGdBZjR3SkxkMVNWNWZrK1REb2hTRng4ZVVhV01QcFFRKzVHWUQ4bFhXR0ROQnlEVGdMVk5BRjhCN0VJL2ZPTm5sYnNZNUFySDVtUzhtRWRmY3hzU1pkcDRkL0JRSzhJc0d1VHc3TC8zNUg1NDZXZ2kzb2c2MFZmWGtWc05jMTY0SzdIR1l3STljaDFCRU5IUEJVc0d1V0l0MGhQa0QzNkNVdDR6c3BmV242VE82V3BZbzRsWjFrNk5idVg4dXBTK04xTlhsVmlNVGlwaC83cDF2MzdudnppTGg2K0RaNVM4K3BRM0l6WG5WaW1ZT3pFdjNMS2JuU1A5OEFpL21oVDBwT3NVYTEzYmZXaUZqMmpzRFhvTExsU2RyRFovWGZES01lQUV2UzE3clQxVVBzeXhjNDY3cXpsTUJyK1h1dWsvdER4OVViZHJ6NCs0VGoxLzRqVjhzNGZFdi85eVBJOG1oVjNLNDdWZXJEWEtrUGNYVXdYdmduTGQ4eUVVV3R6WVBRNVhBV3pNZmYyREdtL1p1Z0I5ZldOckFHNG40TVQzdzhTTk91dzJCd0tGcTZJMFd2STVVQmxzQkNYemM5MGFPN2JpeFlsejdBOTRxN3VwSjc3R1NiOVlDQUdrRHdMZU5EclVUYitLNW9NQS8vNzUzQjM4cnkvWUpnTGVqTG9FZjc4YkR5NEp5SHF3aXlCeGhhNzluNElOMWwrTkdzaGFjTjFEMzFkcHR0ZjJ0cFBPM3ZCVW4vcDl3MmxXMzNMMTM3QnluSGQ3NVB0clY1U3Z5eWVrbyt4b0ZoVENtZUsyeE40NHJYM3BhTTBnQ3Yyb3JKY1NJMjBuVlIzWG5RL2hjMzhZZ0FuNGpEZmEwazJTQnZPd0FpU0p3UTVmQ1dJQkFDWHplY2pVNFgxMnF0NzkzMk1SUysySFdHMk9JOEJweTJqWElCOSs3aGNUdWs1K24zbmt0MGpHdFNZd0pPTS90azhOcHh4ekI2WUtmVCtDYy85VTFFL2dPMmd5Qnp6WndYaEYrT0x3NjZ4QytPb0p0ODBJb2dVL2dzMG1ZMTdwNlVkVGJrQ2Z3Q1h3QzN4dmhncHltaFNzSmZBS2Z3UGZUMmdaNWdieEJlQUtmd0Nmd0hVcHlXa1Y0ZyswRVBvRlA0THRxSW55SW5GVzZlZ0tmd0Nmd3ZldnF0YUp1WGIxTmVBS2Z3Q2Z3blVBdVNkNGdQSUZQNEJQNFRvTm5sVUhlWmp1QlQrQVQrTjRJVjVhYmRmVUVQb0ZQNFBzbXZBRzVmcHdFUG9GUDREdk1ZNjNUWU5yaDhRUStnVS9nZStXOElyeUJkd0xmV1V2Z0UvaFdscHRRVCtBVCtBUytSMnU4VjRNOGdVL2dFL2c0NUpWcnZSRWU3NmtsOEFsOEF2OWQ0bHdHK1ZZUW5zQW44QW04ZzJkZGhNY1QrQVErZ1IrZnlxb0Y1UDBTbnNBbjhBbThEUEpHZVB4WUVwN0FKL0NkQWcva2RybWxvcjVOd0Nmd0NieXozT1pya0Nmd0Nmei9BU0l1S1hndkZ3R0pBQUFBQUVsRlRrU3VRbUNDJyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZUluZGV4OiBudW1iZXIgPSAwO1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlSW1hZ2VzW3RoaXMuc2FtcGxlSW5kZXhdO1xyXG4gICAgXHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgaW1hZ2VVcmw6IHRoaXMuc2FtcGxlRGF0YSB9IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZUluZGV4Kys7IFxyXG4gICAgICAgICAgICBpZiAodGhpcy5zYW1wbGVJbmRleCA+PSB0aGlzLnNhbXBsZUltYWdlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlSW5kZXggPSAwOyBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGEgPSB0aGlzLnNhbXBsZUltYWdlc1t0aGlzLnNhbXBsZUluZGV4XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBSaWNodGV4dERhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlJpY2h0ZXh0RGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJSaWNodGV4dCBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsndGV4dGJveCcsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhOiBzdHJpbmdbXSA9IFtcIkV4YW1wbGUgVGV4dFwiLFxyXG4gICAgICAgICAgICBcImNvbXBhbnkncyBkYXRhXCIsXHJcbiAgICAgICAgICAgIFwiUG93ZXIgQklcIixcclxuICAgICAgICAgICAgXCJ2aXN1YWxpemF0aW9uXCIsXHJcbiAgICAgICAgICAgIFwic3BvdCB0cmVuZHNcIixcclxuICAgICAgICAgICAgXCJjaGFydHNcIixcclxuICAgICAgICAgICAgXCJzaW1wbGUgZHJhZy1hbmQtZHJvcCBnZXN0dXJlc1wiLFxyXG4gICAgICAgICAgICBcInBlcnNvbmFsaXplZCBkYXNoYm9hcmRzXCIgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVTaW5nbGVEYXRhID0gdGhpcy5zYW1wbGVEYXRhWzBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZVRleHRTdHlsZSA9IHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogXCJIZWFkaW5nXCIsXHJcbiAgICAgICAgICAgIGZvbnRTaXplOiBcIjI0cHhcIixcclxuICAgICAgICAgICAgdGV4dERlY29yYXRpb246IFwidW5kZXJsaW5lXCIsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6IFwiMzAwXCIsXHJcbiAgICAgICAgICAgIGZvbnRTdHlsZTogXCJpdGFsaWNcIixcclxuICAgICAgICAgICAgZmxvYXQ6IFwibGVmdFwiXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgLy8gMSBwYXJhZ3JhcGhzLCB3aXRoIGZvcm1hdHRpbmdcclxuICAgICAgICAgICAgdmFyIHBhcmFncmFwaHM6IFBhcmFncmFwaENvbnRleHRbXSA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsVGV4dEFsaWdubWVudDogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0UnVuczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuc2FtcGxlU2luZ2xlRGF0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFN0eWxlOiB0aGlzLnNhbXBsZVRleHRTdHlsZVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9XTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJ1aWxkUGFyYWdyYXBoc0RhdGFWaWV3KHBhcmFncmFwaHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBidWlsZFBhcmFncmFwaHNEYXRhVmlldyhwYXJhZ3JhcGhzOiBwb3dlcmJpLnZpc3VhbHMuUGFyYWdyYXBoQ29udGV4dFtdKTogcG93ZXJiaS5EYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgcmV0dXJuIFt7IG1ldGFkYXRhOiB7IGNvbHVtbnM6IFtdLCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgcGFyYWdyYXBoczogcGFyYWdyYXBocyB9IH0gfSB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZVNpbmdsZURhdGEgPSB0aGlzLnJhbmRvbUVsZW1lbnQodGhpcy5zYW1wbGVEYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVUZXh0U3R5bGUuZm9udFNpemUgPSB0aGlzLmdldFJhbmRvbVZhbHVlKDEyLCA0MCkgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlVGV4dFN0eWxlLmZvbnRXZWlnaHQgPSB0aGlzLmdldFJhbmRvbVZhbHVlKDMwMCwgNzAwKS50b1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgRGF0YVZpZXdUcmFuc2Zvcm0gPSBwb3dlcmJpLmRhdGEuRGF0YVZpZXdUcmFuc2Zvcm07XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIFNhbGVzQnlDb3VudHJ5RGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2FsZXNCeUNvdW50cnlEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNhbGVzIEJ5IENvdW50cnlcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWydkZWZhdWx0J107XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlRGF0YSA9IFtcclxuICAgICAgICAgICAgWzc0MjczMS40MywgMTYyMDY2LjQzLCAyODMwODUuNzgsIDMwMDI2My40OSwgMzc2MDc0LjU3LCA4MTQ3MjQuMzRdLFxyXG4gICAgICAgICAgICBbMTIzNDU1LjQzLCA0MDU2Ni40MywgMjAwNDU3Ljc4LCA1MDAwLjQ5LCAzMjAwMDAuNTcsIDQ1MDAwMC4zNF1cclxuICAgICAgICBdO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluOiBudW1iZXIgPSAzMDAwMDtcclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1heDogbnVtYmVyID0gMTAwMDAwMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVTaW5nbGVEYXRhOiBudW1iZXIgPSA1NTk0My42NztcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBmaWVsZEV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5maWVsZERlZih7IHNjaGVtYTogJ3MnLCBlbnRpdHk6IFwidGFibGUxXCIsIGNvbHVtbjogXCJjb3VudHJ5XCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlWYWx1ZXMgPSBbXCJBdXN0cmFsaWFcIiwgXCJDYW5hZGFcIiwgXCJGcmFuY2VcIiwgXCJHZXJtYW55XCIsIFwiVW5pdGVkIEtpbmdkb21cIiwgXCJVbml0ZWQgU3RhdGVzXCJdO1xyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlJZGVudGl0aWVzID0gY2F0ZWdvcnlWYWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHIsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3dlcmJpLmRhdGEuY3JlYXRlRGF0YVZpZXdTY29wZUlkZW50aXR5KGV4cHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gTWV0YWRhdGEsIGRlc2NyaWJlcyB0aGUgZGF0YSBjb2x1bW5zLCBhbmQgcHJvdmlkZXMgdGhlIHZpc3VhbCB3aXRoIGhpbnRzXHJcbiAgICAgICAgICAgIC8vIHNvIGl0IGNhbiBkZWNpZGUgaG93IHRvIGJlc3QgcmVwcmVzZW50IHRoZSBkYXRhXHJcbiAgICAgICAgICAgIHZhciBkYXRhVmlld01ldGFkYXRhOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0NvdW50cnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdDb3VudHJ5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyB0ZXh0OiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU2FsZXMgQW1vdW50ICgyMDE0KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIiQwLDAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZGF0YVBvaW50OiB7IGZpbGw6IHsgc29saWQ6IHsgY29sb3I6ICdwdXJwbGUnIH0gfSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU2FsZXMgQW1vdW50ICgyMDE1KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIiQwLDAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sdW1ucyA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1sxXSxcclxuICAgICAgICAgICAgICAgICAgICAvLyBTYWxlcyBBbW91bnQgZm9yIDIwMTRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHRoaXMuc2FtcGxlRGF0YVswXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE1XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGFbMV0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF07XHJcblxyXG4gICAgICAgICAgICB2YXIgZGF0YVZhbHVlczogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1ucyk7XHJcbiAgICAgICAgICAgIHZhciB0YWJsZURhdGFWYWx1ZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKGNvdW50cnlOYW1lLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbY291bnRyeU5hbWUsIGNvbHVtbnNbMF0udmFsdWVzW2lkeF0sIGNvbHVtbnNbMV0udmFsdWVzW2lkeF1dO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IGRhdGFWaWV3TWV0YWRhdGEsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWNhbDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3JpZXM6IFt7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGNhdGVnb3J5VmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZGVudGl0eTogY2F0ZWdvcnlJZGVudGl0aWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogZGF0YVZhbHVlc1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogdGFibGVEYXRhVmFsdWVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1ucyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzaW5nbGU6IHsgdmFsdWU6IHRoaXMuc2FtcGxlU2luZ2xlRGF0YSB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluLCB0aGlzLnNhbXBsZU1heCkpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlU2luZ2xlRGF0YSA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5zYW1wbGVNaW4sIHRoaXMuc2FtcGxlTWF4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU2FsZXNCeURheU9mV2Vla0RhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlNhbGVzQnlEYXlPZldlZWtEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNhbGVzIGJ5IGRheSBvZiB3ZWVrXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnY29tYm9DaGFydCcsXHJcbiAgICAgICAgICAgICdkYXRhRG90Q2x1c3RlcmVkQ29sdW1uQ29tYm9DaGFydCcsXHJcbiAgICAgICAgICAgICdkYXRhRG90U3RhY2tlZENvbHVtbkNvbWJvQ2hhcnQnLFxyXG4gICAgICAgICAgICAnbGluZVN0YWNrZWRDb2x1bW5Db21ib0NoYXJ0JyxcclxuICAgICAgICAgICAgJ2xpbmVDbHVzdGVyZWRDb2x1bW5Db21ib0NoYXJ0J1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhMSA9IFtcclxuICAgICAgICAgICAgWzc0MjczMS40MywgMTYyMDY2LjQzLCAyODMwODUuNzgsIDMwMDI2My40OSwgMzc2MDc0LjU3LCA4MTQ3MjQuMzRdLFxyXG4gICAgICAgICAgICBbMTIzNDU1LjQzLCA0MDU2Ni40MywgMjAwNDU3Ljc4LCA1MDAwLjQ5LCAzMjAwMDAuNTcsIDQ1MDAwMC4zNF1cclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1pbjE6IG51bWJlciA9IDMwMDAwO1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWF4MTogbnVtYmVyID0gMTAwMDAwMDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVEYXRhMiA9IFtcclxuICAgICAgICAgICAgWzMxLCAxNywgMjQsIDMwLCAzNywgNDAsIDEyXSxcclxuICAgICAgICAgICAgWzMwLCAzNSwgMjAsIDI1LCAzMiwgMzUsIDE1XVxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWluMjogbnVtYmVyID0gMTA7XHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNYXgyOiBudW1iZXIgPSA0NTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgLy9maXJzdCBkYXRhVmlldyAtIFNhbGVzIGJ5IGRheSBvZiB3ZWVrXHJcbiAgICAgICAgICAgIHZhciBmaWVsZEV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5maWVsZERlZih7IHNjaGVtYTogJ3MnLCBlbnRpdHk6IFwidGFibGUxXCIsIGNvbHVtbjogXCJkYXkgb2Ygd2Vla1wiIH0pO1xyXG5cclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5VmFsdWVzID0gW1wiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIiwgXCJTdW5kYXlcIl07XHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeUlkZW50aXRpZXMgPSBjYXRlZ29yeVZhbHVlcy5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmVxdWFsKGZpZWxkRXhwciwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvd2VyYmkuZGF0YS5jcmVhdGVEYXRhVmlld1Njb3BlSWRlbnRpdHkoZXhwcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBNZXRhZGF0YSwgZGVzY3JpYmVzIHRoZSBkYXRhIGNvbHVtbnMsIGFuZCBwcm92aWRlcyB0aGUgdmlzdWFsIHdpdGggaGludHNcclxuICAgICAgICAgICAgLy8gc28gaXQgY2FuIGRlY2lkZSBob3cgdG8gYmVzdCByZXByZXNlbnQgdGhlIGRhdGFcclxuICAgICAgICAgICAgdmFyIGRhdGFWaWV3TWV0YWRhdGE6IHBvd2VyYmkuRGF0YVZpZXdNZXRhZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnRGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAnRGF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyB0ZXh0OiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnUHJldmlvdXMgd2VlayBzYWxlcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIiQwLDAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZGF0YVBvaW50OiB7IGZpbGw6IHsgc29saWQ6IHsgY29sb3I6ICdwdXJwbGUnIH0gfSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVGhpcyB3ZWVrIHNhbGVzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQ6IFwiJDAsMDAwLjAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5TmFtZTogJ3NhbGVzMicsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFNhbGVzIEFtb3VudCBmb3IgMjAxNFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhMVswXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE1XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGExWzFdLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZXM6IERhdGFWaWV3VmFsdWVDb2x1bW5zID0gRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKGNvbHVtbnMpO1xyXG4gICAgICAgICAgICB2YXIgdGFibGVEYXRhVmFsdWVzID0gY2F0ZWdvcnlWYWx1ZXMubWFwKGZ1bmN0aW9uIChkYXlOYW1lLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbZGF5TmFtZSwgY29sdW1uc1swXS52YWx1ZXNbaWR4XSwgY29sdW1uc1sxXS52YWx1ZXNbaWR4XV07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvL2ZpcnN0IGRhdGFWaWV3IC0gU2FsZXMgYnkgZGF5IG9mIHdlZWsgRU5EXHJcblxyXG4gICAgICAgICAgICAvL3NlY29uZCBkYXRhVmlldyAtIFRlbXBlcmF0dXJlIGJ5IGRheSBvZiB3ZWVrXHJcbiAgICAgICAgICAgIHZhciBmaWVsZEV4cHJUZW1wID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZmllbGREZWYoeyBzY2hlbWE6ICdzJywgZW50aXR5OiBcInRhYmxlMlwiLCBjb2x1bW46IFwiZGF5IG9mIHdlZWtcIiB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYXRlZ29yeVZhbHVlc1RlbXAgPSBbXCJNb25kYXlcIiwgXCJUdWVzZGF5XCIsIFwiV2VkbmVzZGF5XCIsIFwiVGh1cnNkYXlcIiwgXCJGcmlkYXlcIiwgXCJTYXR1cmRheVwiLCBcIlN1bmRheVwiXTtcclxuICAgICAgICAgICAgdmFyIGNhdGVnb3J5SWRlbnRpdGllc1RlbXAgPSBjYXRlZ29yeVZhbHVlc1RlbXAubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cHJUZW1wID0gcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIuZXF1YWwoZmllbGRFeHByVGVtcCwgcG93ZXJiaS5kYXRhLlNRRXhwckJ1aWxkZXIudGV4dCh2YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvd2VyYmkuZGF0YS5jcmVhdGVEYXRhVmlld1Njb3BlSWRlbnRpdHkoZXhwclRlbXApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gTWV0YWRhdGEsIGRlc2NyaWJlcyB0aGUgZGF0YSBjb2x1bW5zLCBhbmQgcHJvdmlkZXMgdGhlIHZpc3VhbCB3aXRoIGhpbnRzXHJcbiAgICAgICAgICAgIC8vIHNvIGl0IGNhbiBkZWNpZGUgaG93IHRvIGJlc3QgcmVwcmVzZW50IHRoZSBkYXRhXHJcbiAgICAgICAgICAgIHZhciBkYXRhVmlld01ldGFkYXRhVGVtcDogcG93ZXJiaS5EYXRhVmlld01ldGFkYXRhID0ge1xyXG4gICAgICAgICAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdEYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdEYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IHRleHQ6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdQcmV2aW91cyB3ZWVrIHRlbXBlcmF0dXJlJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICd0ZW1wMScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHBvd2VyYmkuVmFsdWVUeXBlLmZyb21EZXNjcmlwdG9yKHsgbnVtZXJpYzogdHJ1ZSB9KSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9vYmplY3RzOiB7IGRhdGFQb2ludDogeyBmaWxsOiB7IHNvbGlkOiB7IGNvbG9yOiAncHVycGxlJyB9IH0gfSB9LFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RoaXMgd2VlayB0ZW1wZXJhdHVyZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnlOYW1lOiAndGVtcDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgY29sdW1uc1RlbXAgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhVGVtcC5jb2x1bW5zWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBlcmF0dXJlIHByZXYgd2Vla1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhMlswXSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhVGVtcC5jb2x1bW5zWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRlbXBlcmF0dXJlIHRoaXMgd2Vla1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogdGhpcy5zYW1wbGVEYXRhMlsxXSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVmFsdWVzVGVtcDogRGF0YVZpZXdWYWx1ZUNvbHVtbnMgPSBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoY29sdW1uc1RlbXApO1xyXG4gICAgICAgICAgICB2YXIgdGFibGVEYXRhVmFsdWVzVGVtcCA9IGNhdGVnb3J5VmFsdWVzVGVtcC5tYXAoZnVuY3Rpb24gKGRheU5hbWUsIGlkeCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtkYXlOYW1lLCBjb2x1bW5zVGVtcFswXS52YWx1ZXNbaWR4XSwgY29sdW1uc1RlbXBbMV0udmFsdWVzW2lkeF1dO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy9maXJzdCBkYXRhVmlldyAtIFNhbGVzIGJ5IGRheSBvZiB3ZWVrIEVORFxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcmljYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yaWVzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGRhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1swXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBjYXRlZ29yeVZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllcyxcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGRhdGFWYWx1ZXNcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB0YWJsZToge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvd3M6IHRhYmxlRGF0YVZhbHVlcyxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnMsXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiBkYXRhVmlld01ldGFkYXRhVGVtcCxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhVGVtcC5jb2x1bW5zWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IGNhdGVnb3J5VmFsdWVzVGVtcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWRlbnRpdHk6IGNhdGVnb3J5SWRlbnRpdGllc1RlbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzVGVtcFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHRhYmxlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogdGFibGVEYXRhVmFsdWVzVGVtcCxcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBkYXRhVmlld01ldGFkYXRhVGVtcC5jb2x1bW5zLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNhbXBsZURhdGExID0gdGhpcy5zYW1wbGVEYXRhMS5tYXAoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLm1hcCgoKSA9PiB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMuc2FtcGxlTWluMSwgdGhpcy5zYW1wbGVNYXgxKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhMiA9IHRoaXMuc2FtcGxlRGF0YTIubWFwKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbjIsIHRoaXMuc2FtcGxlTWF4MikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4qICBQb3dlciBCSSBWaXN1YWxpemF0aW9uc1xyXG4qXHJcbiogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiogIEFsbCByaWdodHMgcmVzZXJ2ZWQuIFxyXG4qICBNSVQgTGljZW5zZVxyXG4qXHJcbiogIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4qICB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4qICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4qICAgXHJcbiogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4qICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuKiAgIFxyXG4qICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4qICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgXHJcbiogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiogIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuKiAgVEhFIFNPRlRXQVJFLlxyXG4qL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL19yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhVmlld3Mge1xyXG4gICAgaW1wb3J0IERhdGFWaWV3VHJhbnNmb3JtID0gcG93ZXJiaS5kYXRhLkRhdGFWaWV3VHJhbnNmb3JtO1xyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVGdW5uZWxEYXRhIGV4dGVuZHMgU2FtcGxlRGF0YVZpZXdzIGltcGxlbWVudHMgSVNhbXBsZURhdGFWaWV3c01ldGhvZHMge1xyXG5cclxuICAgICAgICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJTaW1wbGVGdW5uZWxEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbXBsZSBmdW5uZWwgZGF0YVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2Z1bm5lbCddO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGEgPSBbODE0NzI0LjM0LCA3NDI3MzEuNDMsIDM3NjA3NC41NywgMjAwMjYzLjQ5LCAxNDAwNjMuNDksIDk2MDY2LjQzXTtcclxuICAgICAgICBcclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1pbjogbnVtYmVyID0gMzAwMDtcclxuICAgICAgICBwcml2YXRlIHNhbXBsZU1heDogbnVtYmVyID0gMTAwMDAwMDtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBmaWVsZEV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5maWVsZERlZih7IHNjaGVtYTogJ3MnLCBlbnRpdHk6IFwiZnVubmVsXCIsIGNvbHVtbjogXCJjb3VudHJ5XCIgfSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlWYWx1ZXMgPSBbXCJBdXN0cmFsaWFcIiwgXCJDYW5hZGFcIiwgXCJGcmFuY2VcIiwgXCJHZXJtYW55XCIsIFwiVW5pdGVkIEtpbmdkb21cIiwgXCJVbml0ZWQgU3RhdGVzXCJdO1xyXG4gICAgICAgICAgICBsZXQgY2F0ZWdvcnlJZGVudGl0aWVzID0gY2F0ZWdvcnlWYWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHIsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3dlcmJpLmRhdGEuY3JlYXRlRGF0YVZpZXdTY29wZUlkZW50aXR5KGV4cHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgLy8gTWV0YWRhdGEsIGRlc2NyaWJlcyB0aGUgZGF0YSBjb2x1bW5zLCBhbmQgcHJvdmlkZXMgdGhlIHZpc3VhbCB3aXRoIGhpbnRzXHJcbiAgICAgICAgICAgIC8vIHNvIGl0IGNhbiBkZWNpZGUgaG93IHRvIGJlc3QgcmVwcmVzZW50IHRoZSBkYXRhXHJcbiAgICAgICAgICAgIGxldCBkYXRhVmlld01ldGFkYXRhOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ0NvdW50cnknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdDb3VudHJ5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyB0ZXh0OiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU2FsZXMgQW1vdW50ICgyMDE0KScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBcIiQwLDAwMC4wMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdzYWxlczEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBwb3dlcmJpLlZhbHVlVHlwZS5mcm9tRGVzY3JpcHRvcih7IG51bWVyaWM6IHRydWUgfSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IHsgZGF0YVBvaW50OiB7IGZpbGw6IHsgc29saWQ6IHsgY29sb3I6ICdwdXJwbGUnIH0gfSB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IGNvbHVtbnMgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FsZXMgQW1vdW50IGZvciAyMDE0XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB0aGlzLnNhbXBsZURhdGEsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGRhdGFWYWx1ZXM6IERhdGFWaWV3VmFsdWVDb2x1bW5zID0gRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKGNvbHVtbnMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZGF0YVZpZXdNZXRhZGF0YSxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5OiBjYXRlZ29yeUlkZW50aXRpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgfV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBkYXRhVmFsdWVzXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbiwgdGhpcy5zYW1wbGVNYXgpKTtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhLnNvcnQoKGEsIGIpID0+IHsgcmV0dXJuIGIgLSBhOyB9KTtcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgRGF0YVZpZXdUcmFuc2Zvcm0gPSBwb3dlcmJpLmRhdGEuRGF0YVZpZXdUcmFuc2Zvcm07XHJcbiAgICBcclxuICAgIGV4cG9ydCBjbGFzcyBTaW1wbGVHYXVnZURhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlNpbXBsZUdhdWdlRGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJTaW1wbGUgZ2F1Z2UgZGF0YVwiO1xyXG5cclxuICAgICAgICBwdWJsaWMgdmlzdWFsczogc3RyaW5nW10gPSBbJ2dhdWdlJyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGE6IG51bWJlcltdID0gWzUwLCAyNTAsIDMwMCwgNTAwXTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzYW1wbGVNaW46IG51bWJlciA9IDUwO1xyXG4gICAgICAgIHByaXZhdGUgc2FtcGxlTWF4OiBudW1iZXIgPSAxNTAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0RGF0YVZpZXdzKCk6IERhdGFWaWV3W10ge1xyXG4gICAgICAgICAgICBsZXQgZ2F1Z2VEYXRhVmlld01ldGFkYXRhOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2NvbDInLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlczogeyAnTWluVmFsdWUnOiB0cnVlIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTWVhc3VyZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyQwJyB9IH0sXHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ2NvbDEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlczogeyAnWSc6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnJDAnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnY29sNCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdUYXJnZXRWYWx1ZSc6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnJDAnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnY29sMycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvbGVzOiB7ICdNYXhWYWx1ZSc6IHRydWUgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnJDAnIH0gfSxcclxuICAgICAgICAgICAgICAgICAgICB9XSxcclxuICAgICAgICAgICAgICAgIGdyb3VwczogW10sXHJcbiAgICAgICAgICAgICAgICBtZWFzdXJlczogWzBdLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZ2F1Z2VEYXRhVmlld01ldGFkYXRhLFxyXG4gICAgICAgICAgICAgICAgc2luZ2xlOiB7IHZhbHVlOiB0aGlzLnNhbXBsZURhdGFbMV0gfSxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBEYXRhVmlld1RyYW5zZm9ybS5jcmVhdGVWYWx1ZUNvbHVtbnMoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGdhdWdlRGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzBdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbdGhpcy5zYW1wbGVEYXRhWzBdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBnYXVnZURhdGFWaWV3TWV0YWRhdGEuY29sdW1uc1sxXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogW3RoaXMuc2FtcGxlRGF0YVsxXV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZ2F1Z2VEYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IFt0aGlzLnNhbXBsZURhdGFbMl1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6IGdhdWdlRGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiBbdGhpcy5zYW1wbGVEYXRhWzNdXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfV0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YSA9IHRoaXMuc2FtcGxlRGF0YS5tYXAoKCkgPT4gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLnNhbXBsZU1pbiwgdGhpcy5zYW1wbGVNYXgpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2FtcGxlRGF0YS5zb3J0KChhLCBiKSA9PiB7IHJldHVybiBhIC0gYjsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcclxuICAgIGltcG9ydCBWYWx1ZVR5cGUgPSBwb3dlcmJpLlZhbHVlVHlwZTtcclxuICAgIGltcG9ydCBQcmltaXRpdmVUeXBlID0gcG93ZXJiaS5QcmltaXRpdmVUeXBlO1xyXG4gICAgXHJcbiAgICBleHBvcnQgY2xhc3MgU2ltcGxlTWF0cml4RGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2ltcGxlTWF0cml4RGF0YVwiO1xyXG4gICAgICAgIHB1YmxpYyBkaXNwbGF5TmFtZTogc3RyaW5nID0gXCJTaW1wbGUgbWF0cml4IGRhdGFcIjtcclxuXHJcbiAgICAgICAgcHVibGljIHZpc3VhbHM6IHN0cmluZ1tdID0gWydtYXRyaXgnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhVHlwZU51bWJlciA9IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKTtcclxuICAgICAgICAgICAgdmFyIGRhdGFUeXBlU3RyaW5nID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5UZXh0KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMTogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMScsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiAzLCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIy4wJyB9IH0gfTtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UyOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUyJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDQsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjLjAwJyB9IH0gfTtcclxuICAgICAgICAgICAgdmFyIG1lYXN1cmVTb3VyY2UzOiBEYXRhVmlld01ldGFkYXRhQ29sdW1uID0geyBkaXNwbGF5TmFtZTogJ21lYXN1cmUzJywgdHlwZTogZGF0YVR5cGVOdW1iZXIsIGlzTWVhc3VyZTogdHJ1ZSwgaW5kZXg6IDUsIG9iamVjdHM6IHsgZ2VuZXJhbDogeyBmb3JtYXRTdHJpbmc6ICcjJyB9IH0gfTtcclxuXHJcbiAgICAgICAgICAgIHZhciByb3dHcm91cFNvdXJjZTE6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnUm93R3JvdXAxJywgcXVlcnlOYW1lOiAnUm93R3JvdXAxJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAwIH07XHJcbiAgICAgICAgICAgIHZhciByb3dHcm91cFNvdXJjZTI6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnUm93R3JvdXAyJywgcXVlcnlOYW1lOiAnUm93R3JvdXAyJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAxIH07XHJcbiAgICAgICAgICAgIHZhciByb3dHcm91cFNvdXJjZTM6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnUm93R3JvdXAzJywgcXVlcnlOYW1lOiAnUm93R3JvdXAzJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAyIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbWF0cml4VGhyZWVNZWFzdXJlc1RocmVlUm93R3JvdXBzOiBEYXRhVmlld01hdHJpeCA9IHtcclxuICAgICAgICAgICAgICAgIHJvd3M6IHtcclxuICAgICAgICAgICAgICAgICAgICByb290OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdOb3J0aCBBbWVyaWNhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQ2FuYWRhJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdPbnRhcmlvJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAxMDAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAxMDAxLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyOiB7IHZhbHVlOiAxMDAyLCB2YWx1ZVNvdXJjZUluZGV4OiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdRdWViZWMnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDEwMTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDEwMTEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDEwMTIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnVVNBJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdXYXNoaW5ndG9uJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAxMTAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAxMTAxLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyOiB7IHZhbHVlOiAxMTAyLCB2YWx1ZVNvdXJjZUluZGV4OiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdPcmVnb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDExMTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDExMTEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDExMTIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1NvdXRoIEFtZXJpY2EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdCcmF6aWwnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ0FtYXpvbmFzJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAwOiB7IHZhbHVlOiAyMDAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxOiB7IHZhbHVlOiAyMDAxLCB2YWx1ZVNvdXJjZUluZGV4OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyOiB7IHZhbHVlOiAyMDAyLCB2YWx1ZVNvdXJjZUluZGV4OiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbDogMixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdNYXRvIEdyb3NzbycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMDogeyB2YWx1ZTogMjAxMCB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMTogeyB2YWx1ZTogMjAxMSwgdmFsdWVTb3VyY2VJbmRleDogMSB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMjogeyB2YWx1ZTogMjAxMiwgdmFsdWVTb3VyY2VJbmRleDogMiB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdDaGlsZScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbjogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWw6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiAnQXJpY2EnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDIxMDAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDIxMDEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDIxMDIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsOiAyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ1BhcmluYWNvdGEnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDA6IHsgdmFsdWU6IDIxMTAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHsgdmFsdWU6IDIxMTEsIHZhbHVlU291cmNlSW5kZXg6IDEgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDI6IHsgdmFsdWU6IDIxMTIsIHZhbHVlU291cmNlSW5kZXg6IDIgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGxldmVsczogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHNvdXJjZXM6IFtyb3dHcm91cFNvdXJjZTFdIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc291cmNlczogW3Jvd0dyb3VwU291cmNlMl0gfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBzb3VyY2VzOiBbcm93R3JvdXBTb3VyY2UzXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IHtcclxuICAgICAgICAgICAgICAgICAgICByb290OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxldmVsOiAwIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxldmVsOiAwLCBsZXZlbFNvdXJjZUluZGV4OiAxIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IGxldmVsOiAwLCBsZXZlbFNvdXJjZUluZGV4OiAyIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWxzOiBbe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZWFzdXJlU291cmNlMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lYXN1cmVTb3VyY2UyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTNcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdmFsdWVTb3VyY2VzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTIsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZVNvdXJjZTNcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBbe1xyXG4gICAgICAgICAgICAgICAgbWV0YWRhdGE6IHsgY29sdW1uczogW3Jvd0dyb3VwU291cmNlMSwgcm93R3JvdXBTb3VyY2UyLCByb3dHcm91cFNvdXJjZTNdLCBzZWdtZW50OiB7fSB9LFxyXG4gICAgICAgICAgICAgICAgbWF0cml4OiBtYXRyaXhUaHJlZU1lYXN1cmVzVGhyZWVSb3dHcm91cHNcclxuICAgICAgICAgICAgfV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgcmFuZG9taXplKCk6IHZvaWQge1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5tb2R1bGUgcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cyB7XHJcbiAgICBpbXBvcnQgVmFsdWVUeXBlID0gcG93ZXJiaS5WYWx1ZVR5cGU7XHJcbiAgICBpbXBvcnQgUHJpbWl0aXZlVHlwZSA9IHBvd2VyYmkuUHJpbWl0aXZlVHlwZTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFNpbXBsZVRhYmxlRGF0YSBleHRlbmRzIFNhbXBsZURhdGFWaWV3cyBpbXBsZW1lbnRzIElTYW1wbGVEYXRhVmlld3NNZXRob2RzIHtcclxuXHJcbiAgICAgICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiU2ltcGxlVGFibGVEYXRhXCI7XHJcbiAgICAgICAgcHVibGljIGRpc3BsYXlOYW1lOiBzdHJpbmcgPSBcIlNpbXBsZSB0YWJsZSBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsndGFibGUnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHB1YmxpYyBnZXREYXRhVmlld3MoKTogRGF0YVZpZXdbXSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhVHlwZU51bWJlciA9IFZhbHVlVHlwZS5mcm9tUHJpbWl0aXZlVHlwZUFuZENhdGVnb3J5KFByaW1pdGl2ZVR5cGUuRG91YmxlKTtcclxuICAgICAgICAgICAgdmFyIGRhdGFUeXBlU3RyaW5nID0gVmFsdWVUeXBlLmZyb21QcmltaXRpdmVUeXBlQW5kQ2F0ZWdvcnkoUHJpbWl0aXZlVHlwZS5UZXh0KTsgICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIHZhciBncm91cFNvdXJjZTE6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnZ3JvdXAxJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAwIH07XHJcbiAgICAgICAgICAgIHZhciBncm91cFNvdXJjZTI6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnZ3JvdXAyJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAxIH07XHJcbiAgICAgICAgICAgIHZhciBncm91cFNvdXJjZTM6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnZ3JvdXAzJywgdHlwZTogZGF0YVR5cGVTdHJpbmcsIGluZGV4OiAyIH07XHJcblxyXG4gICAgICAgICAgICB2YXIgbWVhc3VyZVNvdXJjZTE6IERhdGFWaWV3TWV0YWRhdGFDb2x1bW4gPSB7IGRpc3BsYXlOYW1lOiAnbWVhc3VyZTEnLCB0eXBlOiBkYXRhVHlwZU51bWJlciwgaXNNZWFzdXJlOiB0cnVlLCBpbmRleDogMywgb2JqZWN0czogeyBnZW5lcmFsOiB7IGZvcm1hdFN0cmluZzogJyMuMCcgfSB9IH07XHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMjogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMicsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiA0LCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIy4wMCcgfSB9IH07XHJcbiAgICAgICAgICAgIHZhciBtZWFzdXJlU291cmNlMzogRGF0YVZpZXdNZXRhZGF0YUNvbHVtbiA9IHsgZGlzcGxheU5hbWU6ICdtZWFzdXJlMycsIHR5cGU6IGRhdGFUeXBlTnVtYmVyLCBpc01lYXN1cmU6IHRydWUsIGluZGV4OiA1LCBvYmplY3RzOiB7IGdlbmVyYWw6IHsgZm9ybWF0U3RyaW5nOiAnIycgfSB9IH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gW3tcclxuICAgICAgICAgICAgICAgIG1ldGFkYXRhOiB7IGNvbHVtbnM6IFtncm91cFNvdXJjZTEsIG1lYXN1cmVTb3VyY2UxLCBncm91cFNvdXJjZTIsIG1lYXN1cmVTb3VyY2UyLCBncm91cFNvdXJjZTMsIG1lYXN1cmVTb3VyY2UzXSB9LFxyXG4gICAgICAgICAgICAgICAgdGFibGU6IHtcclxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbZ3JvdXBTb3VyY2UxLCBtZWFzdXJlU291cmNlMSwgZ3JvdXBTb3VyY2UyLCBtZWFzdXJlU291cmNlMiwgZ3JvdXBTb3VyY2UzLCBtZWFzdXJlU291cmNlM10sXHJcbiAgICAgICAgICAgICAgICAgICAgcm93czogW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0EnLCAxMDAsICdhYScsIDEwMSwgJ2FhMScsIDEwMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnQScsIDEwMywgJ2FhJywgMTA0LCAnYWEyJywgMTA1XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgWydBJywgMTA2LCAnYWInLCAxMDcsICdhYjEnLCAxMDhdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0InLCAxMDksICdiYScsIDExMCwgJ2JhMScsIDExMV0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFsnQicsIDExMiwgJ2JiJywgMTEzLCAnYmIxJywgMTE0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgWydCJywgMTE1LCAnYmInLCAxMTYsICdiYjInLCAxMTddLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ0MnLCAxMTgsICdjYycsIDExOSwgJ2NjMScsIDEyMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyByYW5kb21pemUoKTogdm9pZCB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG59IiwiLypcclxuKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuKlxyXG4qICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4qICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuKiAgTUlUIExpY2Vuc2VcclxuKlxyXG4qICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiogIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiXCJTb2Z0d2FyZVwiXCIpLCB0byBkZWFsXHJcbiogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4qICBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuKiAgIFxyXG4qICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBcclxuKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiogICBcclxuKiAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEICpBUyBJUyosIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1IgXHJcbiogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4qICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIFxyXG4qICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4qICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiogIFRIRSBTT0ZUV0FSRS5cclxuKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi9fcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMuc2FtcGxlRGF0YVZpZXdzIHtcclxuICAgIGltcG9ydCBEYXRhVmlld1RyYW5zZm9ybSA9IHBvd2VyYmkuZGF0YS5EYXRhVmlld1RyYW5zZm9ybTtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFRlYW1TY29yZURhdGEgZXh0ZW5kcyBTYW1wbGVEYXRhVmlld3MgaW1wbGVtZW50cyBJU2FtcGxlRGF0YVZpZXdzTWV0aG9kcyB7XHJcblxyXG4gICAgICAgIHB1YmxpYyBuYW1lOiBzdHJpbmcgPSBcIlRlYW1TY29yZURhdGFcIjtcclxuICAgICAgICBwdWJsaWMgZGlzcGxheU5hbWU6IHN0cmluZyA9IFwiVGVhbSBzY29yZSBkYXRhXCI7XHJcblxyXG4gICAgICAgIHB1YmxpYyB2aXN1YWxzOiBzdHJpbmdbXSA9IFsnY2hlZXJNZXRlcicsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcHVibGljIGdldERhdGFWaWV3cygpOiBEYXRhVmlld1tdIHtcclxuICAgICAgICAgICAgdmFyIGZpZWxkRXhwciA9IHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLmZpZWxkRGVmKHsgc2NoZW1hOiAncycsIGVudGl0eTogXCJ0YWJsZTFcIiwgY29sdW1uOiBcInRlYW1zXCIgfSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlWYWx1ZXMgPSBbXCJTZWFoYXdrc1wiLCBcIjQ5ZXJzXCJdO1xyXG4gICAgICAgICAgICB2YXIgY2F0ZWdvcnlJZGVudGl0aWVzID0gY2F0ZWdvcnlWYWx1ZXMubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGV4cHIgPSBwb3dlcmJpLmRhdGEuU1FFeHByQnVpbGRlci5lcXVhbChmaWVsZEV4cHIsIHBvd2VyYmkuZGF0YS5TUUV4cHJCdWlsZGVyLnRleHQodmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb3dlcmJpLmRhdGEuY3JlYXRlRGF0YVZpZXdTY29wZUlkZW50aXR5KGV4cHIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhVmlld01ldGFkYXRhOiBwb3dlcmJpLkRhdGFWaWV3TWV0YWRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1RlYW0nLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICdUZWFtJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyB0ZXh0OiB0cnVlIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnVm9sdW1lJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNNZWFzdXJlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeU5hbWU6ICd2b2x1bWUxJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogcG93ZXJiaS5WYWx1ZVR5cGUuZnJvbURlc2NyaXB0b3IoeyBudW1lcmljOiB0cnVlIH0pLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBjb2x1bW5zID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZTogZGF0YVZpZXdNZXRhZGF0YS5jb2x1bW5zWzFdLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogWzkwLCAzMF0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGFWYWx1ZXM6IERhdGFWaWV3VmFsdWVDb2x1bW5zID0gRGF0YVZpZXdUcmFuc2Zvcm0uY3JlYXRlVmFsdWVDb2x1bW5zKGNvbHVtbnMpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIFt7XHJcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogZGF0YVZpZXdNZXRhZGF0YSxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3JpY2FsOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcmllczogW3tcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlOiBkYXRhVmlld01ldGFkYXRhLmNvbHVtbnNbMF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlczogY2F0ZWdvcnlWYWx1ZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkZW50aXR5OiBjYXRlZ29yeUlkZW50aXRpZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdHM6IFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhUG9pbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29saWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYigxNjUsIDE3MiwgMTc1KSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVBvaW50OiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvbGlkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICdyZ2IoMTc1LCAzMCwgNDQpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgICAgIH1dLFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlczogZGF0YVZhbHVlcyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH1dO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbn0iLCIvKlxyXG4gKiAgUG93ZXIgQkkgVmlzdWFsaXphdGlvbnNcclxuICpcclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uXHJcbiAqICBBbGwgcmlnaHRzIHJlc2VydmVkLiBcclxuICogIE1JVCBMaWNlbnNlXHJcbiAqXHJcbiAqICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiAqICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4gKiAgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gKiAgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiAqICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG4gKiAgIFxyXG4gKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiAqICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuICogICBcclxuICogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4gKiAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksIFxyXG4gKiAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIFxyXG4gKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuICogIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiAqICBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiAqICBUSEUgU09GVFdBUkUuXHJcbiAqL1xyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIl9yZWZlcmVuY2VzLnRzXCIvPlxyXG5cclxubW9kdWxlIHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhIHtcclxuXHJcbiAgICBpbXBvcnQgc2FtcGxlRGF0YVZpZXdzID0gcG93ZXJiaS52aXN1YWxzLnNhbXBsZURhdGFWaWV3cztcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIFNhbXBsZURhdGEge1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkYXRhID0gW1xyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLkZpbGVTdG9yYWdlRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLkltYWdlRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlJpY2h0ZXh0RGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlDb3VudHJ5RGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlNhbGVzQnlEYXlPZldlZWtEYXRhKCksXHJcbiAgICAgICAgICAgIG5ldyBzYW1wbGVEYXRhVmlld3MuU2ltcGxlRnVubmVsRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlNpbXBsZUdhdWdlRGF0YSgpLFxyXG4gICAgICAgICAgICBuZXcgc2FtcGxlRGF0YVZpZXdzLlNpbXBsZU1hdHJpeERhdGEoKSxcclxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5TaW1wbGVUYWJsZURhdGEoKSxcclxuICAgICAgICAgICAgbmV3IHNhbXBsZURhdGFWaWV3cy5UZWFtU2NvcmVEYXRhKClcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHNhbXBsZSBkYXRhIHZpZXcgZm9yIGEgdmlzdWFsaXphdGlvbiBlbGVtZW50IHNwZWNpZmllZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldFNhbXBsZXNCeVBsdWdpbk5hbWUocGx1Z2luTmFtZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2FtcGxlcyA9IHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaGFzUGx1Z2luKHBsdWdpbk5hbWUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzYW1wbGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzYW1wbGVzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSkgPT4gaXRlbS5oYXNQbHVnaW4oXCJkZWZhdWx0XCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgc2FtcGxlRGF0YVZpZXcgSW5zdGFuY2UgZm9yIGEgdmlzdWFsaXphdGlvbiBlbGVtZW50IHNwZWNpZmllZC5cclxuICAgICAgICAgKi9cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGdldERhdGFWaWV3c0J5U2FtcGxlTmFtZShzYW1wbGVOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5maWx0ZXIoKGl0ZW0pID0+IChpdGVtLmdldE5hbWUoKSA9PT0gc2FtcGxlTmFtZSkpWzBdO1xyXG4gICAgICAgIH0gXHJcbiAgICB9ICAgICBcclxufSIsIi8qXHJcbiogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbipcclxuKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb25cclxuKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiogIE1JVCBMaWNlbnNlXHJcbipcclxuKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4qICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlwiU29mdHdhcmVcIlwiKSwgdG8gZGVhbFxyXG4qICBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuKiAgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiogIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcbiogICBcclxuKiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gXHJcbiogIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG4qICAgXHJcbiogIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAqQVMgSVMqLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIFxyXG4qICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgXHJcbiogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuKiAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBcclxuKiAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4qICBUSEUgU09GVFdBUkUuXHJcbiovXHJcblxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiX3JlZmVyZW5jZXMudHNcIi8+XHJcblxyXG5pbnRlcmZhY2UgSlF1ZXJ5IHtcclxuICAgIHJlc2l6YWJsZShvcHRpb25zOiBhbnkpOiBKUXVlcnk7XHJcbn1cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMge1xyXG4gICAgXHJcbiAgICBpbXBvcnQgU2FtcGxlRGF0YSA9IHBvd2VyYmkudmlzdWFscy5zYW1wbGVEYXRhLlNhbXBsZURhdGE7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEhvc3RDb250cm9scyB7XHJcblxyXG4gICAgICAgIHByaXZhdGUgdmlzdWFsRWxlbWVudDogSVZpc3VhbDtcclxuICAgICAgICBwcml2YXRlIGRhdGFWaWV3c1NlbGVjdDogSlF1ZXJ5O1xyXG5cclxuICAgICAgICAvKiogUmVwcmVzZW50cyBzYW1wbGUgZGF0YSB2aWV3cyB1c2VkIGJ5IHZpc3VhbGl6YXRpb24gZWxlbWVudHMuKi9cclxuICAgICAgICBwcml2YXRlIHNhbXBsZURhdGFWaWV3cztcclxuICAgICAgICBwcml2YXRlIGFuaW1hdGlvbl9kdXJhdGlvbjogbnVtYmVyID0gMjUwO1xyXG4gICAgICAgIHByaXZhdGUgc3VwcHJlc3NBbmltYXRpb25zOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3VwcHJlc3NBbmltYXRpb25zRWxlbWVudDogSlF1ZXJ5O1xyXG4gICAgICAgIHByaXZhdGUgYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50OiBKUXVlcnk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHJpdmF0ZSB2aWV3cG9ydDogSVZpZXdwb3J0O1xyXG4gICAgICAgIHByaXZhdGUgY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgbWluV2lkdGg6IG51bWJlciA9IDIwMDtcclxuICAgICAgICBwcml2YXRlIG1heFdpZHRoOiBudW1iZXIgPSAxMDAwO1xyXG4gICAgICAgIHByaXZhdGUgbWluSGVpZ2h0OiBudW1iZXIgPSAxMDA7XHJcbiAgICAgICAgcHJpdmF0ZSBtYXhIZWlnaHQ6IG51bWJlciA9IDYwMDtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocGFyZW50OiBKUXVlcnkpIHtcclxuICAgICAgICAgICAgcGFyZW50LmZpbmQoJyNyYW5kb21pemUnKS5vbignY2xpY2snLCAoKSA9PiB0aGlzLnJhbmRvbWl6ZSgpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXdzU2VsZWN0ID0gcGFyZW50LmZpbmQoJyNkYXRhVmlld3NTZWxlY3QnKS5maXJzdCgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zdXBwcmVzc0FuaW1hdGlvbnNFbGVtZW50ID0gcGFyZW50LmZpbmQoJ2lucHV0W25hbWU9c3VwcHJlc3NBbmltYXRpb25zXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3VwcHJlc3NBbmltYXRpb25zRWxlbWVudC5vbignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkNoYW5nZVN1cHByZXNzQW5pbWF0aW9ucygpKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50ID0gcGFyZW50LmZpbmQoJ2lucHV0W25hbWU9YW5pbWF0aW9uX2R1cmF0aW9uXScpLmZpcnN0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWF0aW9uRHVyYXRpb25FbGVtZW50Lm9uKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uQ2hhbmdlRHVyYXRpb24oKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc2V0RWxlbWVudChjb250YWluZXI6IEpRdWVyeSk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnJlc2l6YWJsZSh7XHJcbiAgICAgICAgICAgICAgICBtaW5XaWR0aDogdGhpcy5taW5XaWR0aCxcclxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiB0aGlzLm1heFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgbWluSGVpZ2h0OiB0aGlzLm1pbkhlaWdodCxcclxuICAgICAgICAgICAgICAgIG1heEhlaWdodDogdGhpcy5tYXhIZWlnaHQsXHJcblxyXG4gICAgICAgICAgICAgICAgcmVzaXplOiAoZXZlbnQsIHVpKSA9PiB0aGlzLm9uUmVzaXplKHVpLnNpemUpXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5vblJlc2l6ZSh7XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuY29udGFpbmVyLmhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuY29udGFpbmVyLndpZHRoKClcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzZXRWaXN1YWwodmlzdWFsRWxlbWVudDogSVZpc3VhbCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQgPSB2aXN1YWxFbGVtZW50O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBvblJlc2l6ZShzaXplOiBJVmlld3BvcnQpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy52aWV3cG9ydCA9IHtcclxuICAgICAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oZWlnaHQgLSA1LFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IHNpemUud2lkdGggLSAxMCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpc3VhbEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzdWFsRWxlbWVudC5vblJlc2l6aW5nKHRoaXMudmlld3BvcnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgZ2V0Vmlld3BvcnQoKTogSVZpZXdwb3J0IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmlld3BvcnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHJhbmRvbWl6ZSgpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhVmlld3MucmFuZG9taXplKCk7XHJcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2VEdXJhdGlvbigpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25fZHVyYXRpb24gPSBwYXJzZUludCh0aGlzLmFuaW1hdGlvbkR1cmF0aW9uRWxlbWVudC52YWwoKSwgMTApO1xyXG4gICAgICAgICAgICB0aGlzLm9uQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIG9uQ2hhbmdlU3VwcHJlc3NBbmltYXRpb25zKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLnN1cHByZXNzQW5pbWF0aW9ucyA9IHRoaXMuc3VwcHJlc3NBbmltYXRpb25zRWxlbWVudC52YWwoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZpc3VhbEVsZW1lbnQudXBkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQudXBkYXRlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhVmlld3M6IHRoaXMuc2FtcGxlRGF0YVZpZXdzLmdldERhdGFWaWV3cygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHN1cHByZXNzQW5pbWF0aW9uczogdGhpcy5zdXBwcmVzc0FuaW1hdGlvbnMsXHJcbiAgICAgICAgICAgICAgICAgICAgdmlld3BvcnQ6IHRoaXMudmlld3BvcnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50Lm9uRGF0YUNoYW5nZWQoe1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFWaWV3czogdGhpcy5zYW1wbGVEYXRhVmlld3MuZ2V0RGF0YVZpZXdzKCksXHJcbiAgICAgICAgICAgICAgICAgICAgc3VwcHJlc3NBbmltYXRpb25zOiB0aGlzLnN1cHByZXNzQW5pbWF0aW9uc1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50Lm9uUmVzaXppbmcodGhpcy52aWV3cG9ydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBvblBsdWdpbkNoYW5nZShwbHVnaW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhVmlld3NTZWxlY3QuZW1wdHkoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBkYXRhVmlld3MgPSBTYW1wbGVEYXRhLmdldFNhbXBsZXNCeVBsdWdpbk5hbWUocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgICAgIGxldCBkZWZhdWx0RGF0YVZpZXc7XHJcblxyXG4gICAgICAgICAgICBkYXRhVmlld3MuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IG9wdGlvbjogSlF1ZXJ5ID0gJCgnPG9wdGlvbj4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsKGl0ZW0uZ2V0TmFtZSgpKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbi50ZXh0KGl0ZW0uZ2V0RGlzcGxheU5hbWUoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24uYXR0cignc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0RGF0YVZpZXcgPSBpdGVtLmdldE5hbWUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVZpZXdzU2VsZWN0LmFwcGVuZChvcHRpb24pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVZpZXdzU2VsZWN0LmNoYW5nZSgoKSA9PiB0aGlzLm9uQ2hhbmdlRGF0YVZpZXdTZWxlY3Rpb24odGhpcy5kYXRhVmlld3NTZWxlY3QudmFsKCkpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZhdWx0RGF0YVZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbihkZWZhdWx0RGF0YVZpZXcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHByaXZhdGUgb25DaGFuZ2VEYXRhVmlld1NlbGVjdGlvbihzYW1wbGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5zYW1wbGVEYXRhVmlld3MgPSBTYW1wbGVEYXRhLmdldERhdGFWaWV3c0J5U2FtcGxlTmFtZShzYW1wbGVOYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn1cclxuIiwiLypcclxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiAqICBNSVQgTGljZW5zZVxyXG4gKlxyXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuICogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICogICBcclxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4gKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqICAgXHJcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuICogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiAqICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiAgVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJ0eXBlZGVmcy90eXBlZGVmcy50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInR5cGVkZWZzL3R5cGVkZWZzLm9iai50c1wiLz5cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3Mvc2FtcGxlRGF0YVZpZXdzLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL0ZpbGVTdG9yYWdlRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9JbWFnZURhdGEudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJzYW1wbGVEYXRhVmlld3MvUmljaHRleHREYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NhbGVzQnlDb3VudHJ5RGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9TYWxlc0J5RGF5T2ZXZWVrRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9TaW1wbGVGdW5uZWxEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZUdhdWdlRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9TaW1wbGVNYXRyaXhEYXRhLnRzXCIvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwic2FtcGxlRGF0YVZpZXdzL1NpbXBsZVRhYmxlRGF0YS50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGFWaWV3cy9UZWFtU2NvcmVEYXRhLnRzXCIvPlxyXG5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInNhbXBsZURhdGEudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJob3N0Q29udHJvbHMudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJhcHAudHNcIi8+IiwiLypcclxuICogIFBvd2VyIEJJIFZpc3VhbGl6YXRpb25zXHJcbiAqXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvblxyXG4gKiAgQWxsIHJpZ2h0cyByZXNlcnZlZC4gXHJcbiAqICBNSVQgTGljZW5zZVxyXG4gKlxyXG4gKiAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gKiAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJcIlNvZnR3YXJlXCJcIiksIHRvIGRlYWxcclxuICogIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuICogIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuICogIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gKiAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuICogICBcclxuICogIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIFxyXG4gKiAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcbiAqICAgXHJcbiAqICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgKkFTIElTKiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBcclxuICogIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBcclxuICogIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBcclxuICogIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgXHJcbiAqICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gKiAgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gKiAgVEhFIFNPRlRXQVJFLlxyXG4gKi9cclxuXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJfcmVmZXJlbmNlcy50c1wiLz5cclxuXHJcbmludGVyZmFjZSBKUXVlcnkge1xyXG4gICAgLyoqIERlbW9uc3RyYXRlcyBob3cgUG93ZXIgQkkgdmlzdWFsIGNyZWF0aW9uIGNvdWxkIGJlIGltcGxlbWVudGVkIGFzIGpRdWVyeSBwbHVnaW4gKi9cclxuICAgIHZpc3VhbChwbHVnaW46IE9iamVjdCwgZGF0YVZpZXc/OiBPYmplY3QpOiBKUXVlcnk7XHJcbn1cclxuXHJcbm1vZHVsZSBwb3dlcmJpLnZpc3VhbHMge1xyXG4gICAgXHJcbiAgICBpbXBvcnQgZGVmYXVsdFZpc3VhbEhvc3RTZXJ2aWNlcyA9IHBvd2VyYmkudmlzdWFscy5kZWZhdWx0VmlzdWFsSG9zdFNlcnZpY2VzO1xyXG5cclxuICAgIGltcG9ydCBIb3N0Q29udHJvbHMgPSBwb3dlcmJpLnZpc3VhbHMuSG9zdENvbnRyb2xzO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGVtb25zdHJhdGVzIFBvd2VyIEJJIHZpc3VhbGl6YXRpb24gZWxlbWVudHMgYW5kIHRoZSB3YXkgdG8gZW1iZWQgdGhlbSBpbiBzdGFuZGFsb25lIHdlYiBwYWdlLlxyXG4gICAgICovXHJcbiAgICBleHBvcnQgY2xhc3MgUGxheWdyb3VuZCB7XHJcblxyXG4gICAgICAgIC8qKiBSZXByZXNlbnRzIHNhbXBsZSBkYXRhIHZpZXcgdXNlZCBieSB2aXN1YWxpemF0aW9uIGVsZW1lbnRzLiAqL1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHBsdWdpblNlcnZpY2U6IElWaXN1YWxQbHVnaW5TZXJ2aWNlID0gcG93ZXJiaS52aXN1YWxzLnZpc3VhbFBsdWdpbkZhY3RvcnkuY3JlYXRlKCk7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgdmlzdWFsRWxlbWVudDogSVZpc3VhbDtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaG9zdENvbnRyb2xzOiBIb3N0Q29udHJvbHM7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgY29udGFpbmVyOiBKUXVlcnk7XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHZpc3VhbFN0eWxlOiBJVmlzdWFsU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlVGV4dDoge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHsgdmFsdWU6ICdyZ2JhKDUxLDUxLDUxLDEpJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1YlRpdGxlVGV4dDoge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHsgdmFsdWU6ICdyZ2JhKDE0NSwxNDUsMTQ1LDEpJyB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbG9yUGFsZXR0ZToge1xyXG4gICAgICAgICAgICAgICAgZGF0YUNvbG9yczogbmV3IHBvd2VyYmkudmlzdWFscy5EYXRhQ29sb3JQYWxldHRlKCksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxhYmVsVGV4dDoge1xyXG4gICAgICAgICAgICAgICAgY29sb3I6IHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3JnYmEoNTEsNTEsNTEsMSknLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMTFweCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXNIaWdoQ29udHJhc3Q6IGZhbHNlLFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8qKiBQZXJmb3JtcyBzYW1wbGUgYXBwIGluaXRpYWxpemF0aW9uLiovXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKCk6IHZvaWQge1xyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciA9ICQoJyNjb250YWluZXInKTtcclxuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMgPSBuZXcgSG9zdENvbnRyb2xzKCQoJyNvcHRpb25zJykpO1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RDb250cm9scy5zZXRFbGVtZW50KHRoaXMuY29udGFpbmVyKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucG9wdWxhdGVWaXN1YWxUeXBlU2VsZWN0KCk7XHJcbiAgICAgICAgICAgIHBvd2VyYmkudmlzdWFscy5EZWZhdWx0VmlzdWFsSG9zdFNlcnZpY2VzLmluaXRpYWxpemUoKTtcclxuICAgICAgICAgICAgLy8gV3JhcHBlciBmdW5jdGlvbiB0byBzaW1wbGlmeSB2aXN1YWxpemF0aW9uIGVsZW1lbnQgY3JlYXRpb24gd2hlbiB1c2luZyBqUXVlcnlcclxuICAgICAgICAgICAgJC5mbi52aXN1YWwgPSBmdW5jdGlvbiAocGx1Z2luOiBJVmlzdWFsUGx1Z2luLCBkYXRhVmlldz86IERhdGFWaWV3W10pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBTdGVwIDE6IENyZWF0ZSBuZXcgRE9NIGVsZW1lbnQgdG8gcmVwcmVzZW50IFBvd2VyIEJJIHZpc3VhbFxyXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSAkKCc8ZGl2Lz4nKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ3Zpc3VhbCcpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudFsndmlzaWJsZSddID0gKCkgPT4geyByZXR1cm4gdHJ1ZTsgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIFBsYXlncm91bmQuY3JlYXRlVmlzdWFsRWxlbWVudChlbGVtZW50LCBwbHVnaW4sIGRhdGFWaWV3KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpc3VhbEJ5RGVmYXVsdCA9IGpzQ29tbW9uLlV0aWxpdHkuZ2V0VVJMUGFyYW1WYWx1ZSgndmlzdWFsJyk7XHJcbiAgICAgICAgICAgIGlmICh2aXN1YWxCeURlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgICQoJy50b3BCYXIsICNvcHRpb25zJykuY3NzKHsgXCJkaXNwbGF5XCI6IFwibm9uZVwiIH0pO1xyXG4gICAgICAgICAgICAgICAgUGxheWdyb3VuZC5vblZpc3VhbFR5cGVTZWxlY3Rpb24odmlzdWFsQnlEZWZhdWx0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25WaXN1YWxUeXBlU2VsZWN0aW9uKCQoJyN2aXN1YWxUeXBlcycpLnZhbCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVZpc3VhbEVsZW1lbnQoZWxlbWVudDogSlF1ZXJ5LCBwbHVnaW46IElWaXN1YWxQbHVnaW4sIGRhdGFWaWV3PzogRGF0YVZpZXdbXSkge1xyXG5cclxuICAgICAgICAgICAgLy8gU3RlcCAyOiBJbnN0YW50aWF0ZSBQb3dlciBCSSB2aXN1YWxcclxuICAgICAgICAgICAgdGhpcy52aXN1YWxFbGVtZW50ID0gcGx1Z2luLmNyZWF0ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnZpc3VhbEVsZW1lbnQuaW5pdCh7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxyXG4gICAgICAgICAgICAgICAgaG9zdDogZGVmYXVsdFZpc3VhbEhvc3RTZXJ2aWNlcyxcclxuICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLnZpc3VhbFN0eWxlLFxyXG4gICAgICAgICAgICAgICAgdmlld3BvcnQ6IHRoaXMuaG9zdENvbnRyb2xzLmdldFZpZXdwb3J0KCksXHJcbiAgICAgICAgICAgICAgICBzZXR0aW5nczogeyBzbGljaW5nRW5hYmxlZDogdHJ1ZSB9LFxyXG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpdml0eTogeyBpc0ludGVyYWN0aXZlTGVnZW5kOiBmYWxzZSwgc2VsZWN0aW9uOiBmYWxzZSB9LFxyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB7IHRyYW5zaXRpb25JbW1lZGlhdGU6IHRydWUgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHRoaXMuaG9zdENvbnRyb2xzLnNldFZpc3VhbCh0aGlzLnZpc3VhbEVsZW1lbnQpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIHBvcHVsYXRlVmlzdWFsVHlwZVNlbGVjdCgpOiB2b2lkIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IHR5cGVTZWxlY3QgPSAkKCcjdmlzdWFsVHlwZXMnKTtcclxuICAgICAgICAgICAgLy90eXBlU2VsZWN0LmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIlwiPihub25lKTwvb3B0aW9uPicpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHZpc3VhbHMgPSB0aGlzLnBsdWdpblNlcnZpY2UuZ2V0VmlzdWFscygpO1xyXG4gICAgICAgICAgICB2aXN1YWxzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhLm5hbWUgPCBiLm5hbWUpIHJldHVybiAtMTtcclxuICAgICAgICAgICAgICAgIGlmIChhLm5hbWUgPiBiLm5hbWUpIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZpc3VhbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCB2aXN1YWwgPSB2aXN1YWxzW2ldO1xyXG4gICAgICAgICAgICAgICAgdHlwZVNlbGVjdC5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInICsgdmlzdWFsLm5hbWUgKyAnXCI+JyArIHZpc3VhbC5uYW1lICsgJzwvb3B0aW9uPicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0eXBlU2VsZWN0LmNoYW5nZSgoKSA9PiB0aGlzLm9uVmlzdWFsVHlwZVNlbGVjdGlvbih0eXBlU2VsZWN0LnZhbCgpKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBvblZpc3VhbFR5cGVTZWxlY3Rpb24ocGx1Z2luTmFtZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgICAgIGlmIChwbHVnaW5OYW1lLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpc3VhbFBsdWdpbihwbHVnaW5OYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5ob3N0Q29udHJvbHMub25QbHVnaW5DaGFuZ2UocGx1Z2luTmFtZSk7XHJcbiAgICAgICAgfSAgICAgICAgXHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGNyZWF0ZVZpc3VhbFBsdWdpbihwbHVnaW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2hpbGRyZW4oKS5ub3QoXCIudWktcmVzaXphYmxlLWhhbmRsZVwiKS5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwbHVnaW4gPSB0aGlzLnBsdWdpblNlcnZpY2UuZ2V0UGx1Z2luKHBsdWdpbk5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoIXBsdWdpbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuYXBwZW5kKCc8ZGl2IGNsYXNzPVwid3JvbmdWaXN1YWxXYXJuaW5nXCI+V3JvbmcgdmlzdWFsIG5hbWUgPHNwYW4+XFwnJyArIHBsdWdpbk5hbWUgKyAnXFwnPC9zcGFuPiBpbiBwYXJhbWV0ZXJzPC9kaXY+Jyk7IHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lci52aXN1YWwocGx1Z2luKTtcclxuICAgICAgICB9ICAgICAgIFxyXG4gICAgICAgIFxyXG4gICAgfSAgIFxyXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9