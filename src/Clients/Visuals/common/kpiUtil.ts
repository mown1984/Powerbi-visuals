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

module powerbi.visuals {

    export module KpiUtil {

        export const enum KpiImageSize {
            Small,
            Big,
        }

        export interface KpiImageMetadata {
            statusGraphic: string;
            caption: string;
            class: string;
        }

        export interface KPIGraphicClass {
            kpiIconClass: string;
            statusValues: string[];
        }

        const KPIImageClassName = 'ms-kpi-glyph';
        const BigImageClassName = 'big-kpi';
        const RYGStatusIconClassNames = ['kpi-red', 'kpi-yellow', 'kpi-green'];

        const statusGraphicFormatStrings: { [statusGraphic: string]: KPIGraphicClass } = {
            'Traffic Light - Single': {
                kpiIconClass: 'circle',
                statusValues: RYGStatusIconClassNames,
            },
            'Three Flags Colored': {
                kpiIconClass: 'flag',
                statusValues: RYGStatusIconClassNames,
            },
            'Road Signs': {
                kpiIconClass: '',
                statusValues: ['circle-x kpi-red', 'circle-exclamation kpi-yellow', 'circle-checkmark kpi-green'],
            },
            'Traffic Light': {
                kpiIconClass: 'traffic-light',
                statusValues: RYGStatusIconClassNames,
            },
            'Three Symbols UnCircled Colored': {
                kpiIconClass: '',
                statusValues: ['x kpi-red', 'exclamation kpi-yellow', 'checkmark kpi-green'],
            },
            'Shapes': {
                kpiIconClass: '',
                statusValues: ['rhombus kpi-red', 'triangle kpi-yellow', 'circle kpi-green'],
            },
            'Three Stars Colored': {
                kpiIconClass: 'star-stacked',
                statusValues: ['star-empty', 'star-half-full', 'star-full'],
            },
            'Five Bars Colored': {
                kpiIconClass: 'bars-stacked',
                statusValues: ['bars-zero', 'bars-one', 'bars-two', 'bars-three', 'bars-four'],
            },
            'Five Boxes Colored': {
                kpiIconClass: 'boxes-stacked',
                statusValues: ['boxes-zero', 'boxes-one', 'boxes-two', 'boxes-three', 'boxes-four'],
            },
            'Gauge - Ascending': {
                kpiIconClass: '',
                statusValues: ['circle-empty', 'circle-one-quarter', 'circle-half', 'circle-three-quarters', 'circle-full'],
            }
        };

        function getKpiIcon(statusGraphic: string, value: string): string {
            let intValue = parseInt(value, 10);
            let statusGraphicFormat = statusGraphicFormatStrings[statusGraphic];

            if (!statusGraphicFormat || isNaN(intValue))
                return undefined;

            // Convert values from the range of (-n/2, ..., 0, ..., n/2) to (0, 1, ..., n-1)
            let statusValues = statusGraphicFormat.statusValues;
            let num = intValue + Math.floor(statusValues.length / 2);

            return [statusGraphicFormat.kpiIconClass, statusValues[num]].join(' ').trim();
        }

        function getKpiIconClassName(kpiIcon: string, kpiImageSize?: KpiImageSize): string {
            if (!kpiIcon)
                return undefined;

            if (kpiImageSize === KpiImageSize.Big)
                return [KPIImageClassName, BigImageClassName, kpiIcon].join(' ');
            else
                return [KPIImageClassName, kpiIcon].join(' ');
        }

        export function getClassForKpi(statusGraphic: string, value: string, kpiImageSize?: KpiImageSize): string {
            debug.assertValue(statusGraphic, 'statusGraphic');
            debug.assertValue(value, 'value');

            let kpiIcon: string = getKpiIcon(statusGraphic, value);
            return getKpiIconClassName(kpiIcon, kpiImageSize);
        }

        export function getKpiImageMetadata(metaDataColumn: DataViewMetadataColumn, value: string, kpiImageSize?: KpiImageSize): KpiImageMetadata {
            let statusGraphic: string = metaDataColumn && metaDataColumn.kpiStatusGraphic;

            if (statusGraphic) {
                let kpiIcon = getKpiIcon(statusGraphic, value);
                if (kpiIcon) {
                    return {
                        caption: kpiIcon,
                        statusGraphic: statusGraphic,
                        class: getKpiIconClassName(kpiIcon, kpiImageSize),
                    };
                }
            }
        }
    }
}