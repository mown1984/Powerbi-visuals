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

module powerbi.data {
    import EnumExtensions = jsCommon.EnumExtensions;
    import INumberDictionary = jsCommon.INumberDictionary;

    /** Responsible for removing selects from the DataView. */
    export module DataViewRemoveSelects {
        export function apply(dataView: DataView, targetDataViewKinds: StandardDataViewKinds, selectsToInclude: INumberDictionary<boolean>): void {
            debug.assertValue(dataView, 'dataView');
            debug.assertValue(targetDataViewKinds, 'targetDataViewKinds');
            debug.assertAnyValue(selectsToInclude, 'selectsToInclude');
            
            if (!selectsToInclude)
                return;
            
            if (dataView.categorical && EnumExtensions.hasFlag(targetDataViewKinds, StandardDataViewKinds.Categorical)) {
                applyToCategorical(dataView.categorical, selectsToInclude);
            }
        }
        
        function applyToCategorical(categorical: DataViewCategorical, selectsToInclude: INumberDictionary<boolean>): void {
            debug.assertValue(categorical, 'categorical');
            debug.assertValue(selectsToInclude, 'selectsToInclude');

            let valueColumns = categorical.values;
            if (valueColumns) {
                let updatedColumns: boolean;

                if (valueColumns.source) {
                    if (!selectsToInclude[valueColumns.source.index]) {
                        // if processing a split and this is the split without series...
                        valueColumns.source = undefined;
                        updatedColumns = true;
                    }
                }

                // Apply selectsToInclude to values by removing value columns not included
                for (let i = valueColumns.length - 1; i >= 0; i--) {
                    if (!selectsToInclude[valueColumns[i].source.index]) {
                        valueColumns.splice(i, 1);
                        updatedColumns = true;
                    }
                }

                // Apply the latest updates to the values.grouped()
                if (updatedColumns) {
                    DataViewCategoricalEvalGrouped.apply(categorical);
                }
            }
        }
    }
}
