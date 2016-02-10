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

module powerbi.data {
    import inheritSingle = Prototype.inheritSingle;

    export module DataViewConcatenateCategoricalColumns {

        interface CategoryColumnsByRole {
            roleName: string;
            categories: DataViewCategoryColumn[];
        }

        export function detectAndApply(dataView: DataView, roleMappings: DataViewMapping[]): DataView {
            debug.assertValue(dataView, 'dataView');

            let result = dataView;
            let dataViewCategorical: DataViewCategorical = dataView.categorical;

            if (dataViewCategorical) {
                let concatenationSource: CategoryColumnsByRole = detectCategoricalRoleForHierarchicalGroup(dataViewCategorical, roleMappings);

                if (concatenationSource) {
                    result = applyConcatenation(dataView, concatenationSource);
                }
            }

            return result;
        }

        /**
         * Returns the role and its assocated category columns (from dataViewCategorical.categories)
         * that should be concatenated for the case of hierarchical group.
         *
         * Note: In the future if we support sibling hierarchical groups in categorical,
         * change the return type to CategoryColumnsByRole[] and update detection logic.
         */
        function detectCategoricalRoleForHierarchicalGroup(dataViewCategorical: DataViewCategorical, roleMappings: DataViewMapping[]): CategoryColumnsByRole {
            debug.assertValue(dataViewCategorical, 'dataViewCategorical');

            let result: CategoryColumnsByRole;

            // For now, just handle the case where roleMappings.length === 1.
            // If there is more than 1, we might want to proceed if, 
            // for example, all role mappings map category to the same role name and they all have { max: 1 } conditions.
            let roleMappingForCategorical: DataViewMapping = (roleMappings && roleMappings.length === 1 && !!roleMappings[0].categorical) ? roleMappings[0] : undefined;
            if (roleMappingForCategorical) {
                let roleNamesForCategory: string[] = getAllRolesInCategories(roleMappingForCategorical.categorical);

                // With "list" in role mapping, is it possible to have multiple role names for category.
                // For now, proceed with combining category columns only when categories are bound to 1 Role.
                // We can change this if we want to support independent (sibling) group hierarchies in categorical.
                if (roleNamesForCategory && roleNamesForCategory.length === 1)
                {
                    let targetRoleName = roleNamesForCategory[0];

                    let isVisualExpectingMaxOneCategoryColumn: boolean =
                        !_.isEmpty(roleMappingForCategorical.conditions) &&
                        _.every(roleMappingForCategorical.conditions, condition => condition[targetRoleName] && condition[targetRoleName].max === 1);

                    if (isVisualExpectingMaxOneCategoryColumn) {
                        let categoriesForTargetRole: DataViewCategoryColumn[] = _.filter(
                            dataViewCategorical.categories,
                            (categoryColumn: DataViewCategoryColumn) => categoryColumn.source.roles && !!categoryColumn.source.roles[targetRoleName] );

                        // At least for now, we expect all category columns for the same role to have the same number of value entries.
                        // If that's not the case, we won't run the concatenate logic for that role at all...
                        let areValuesCountsEqual: boolean = _.every(
                            categoriesForTargetRole,
                            (categoryColumn: DataViewCategoryColumn) => categoryColumn.values.length === categoriesForTargetRole[0].values.length);

                        // Also, there is no need to concatenate columns unless there is actually more than one column
                        if (areValuesCountsEqual &&
                            categoriesForTargetRole.length >= 2) {
                            result = {
                                roleName: targetRoleName,
                                categories: categoriesForTargetRole
                            };
                        }
                    }
                }
            }

            return result;
        }

        /**
         * Returns the array of role names that are mapped to categorical categories.
         * Returns an empty array if none exists.
         */
        function getAllRolesInCategories(categoricalRoleMapping: DataViewCategoricalMapping): string[] {
            debug.assertValue(categoricalRoleMapping, 'categoricalRoleMapping');

            let roleNames: string[] = [];
            if (categoricalRoleMapping.categories) {
                // TODO VSTS 6842137: Handle roleMapping.categorical.categories with a visitor class (see DataViewRoleForMapping, DataViewRoleBindMapping, and DataViewListRoleMapping).
                // For reference implementation, see visitCategoricalCategories(...) in src\Clients\Data\dataView\compiledDataViewMappingVisitor.ts

                let mappings: (DataViewRoleForMapping | DataViewRoleBindMapping)[] = (<DataViewListRoleMapping>categoricalRoleMapping.categories).select;
                if (!mappings) {
                    mappings = [<DataViewRoleMappingWithReduction>categoricalRoleMapping.categories];
                }

                for (let mapping of mappings) {
                    let forValue = (<DataViewRoleForMapping>mapping).for;
                    if (forValue) {
                        roleNames.push(forValue.in);
                    }
                    else {
                        let bindValue = (<DataViewRoleBindMapping>mapping).bind;
                        if (bindValue) {
                            roleNames.push(bindValue.to);
                        }
                    }
                }
            }

            return roleNames;
        }

        function applyConcatenation(dataView: DataView, concatenationSource: CategoryColumnsByRole): DataView {
            let concatenatedValues: string[] = concatenateValues(concatenationSource.categories);

            let concatenatedColumnMetadata: DataViewMetadataColumn = createConcatenatedColumnMetadata(concatenationSource.categories, concatenationSource.roleName);
            let transformedDataView = inheritSingle(dataView);
            addToMetadata(transformedDataView, concatenatedColumnMetadata);

            let concatenatedCategoryColumn: DataViewCategoryColumn = createConcatenatedCategoryColumn(
                concatenationSource.categories,
                concatenatedColumnMetadata,
                concatenatedValues);
            
            let dataViewCategorical: DataViewCategorical = dataView.categorical;

            let transformedCategoricalCategories: DataViewCategoryColumn[] = _.difference(dataViewCategorical.categories, concatenationSource.categories);
            transformedCategoricalCategories.push(concatenatedCategoryColumn);

            let transformedCategorical: DataViewCategorical = inheritSingle(dataViewCategorical);
            transformedCategorical.categories = transformedCategoricalCategories;
            transformedDataView.categorical = transformedCategorical;

            return transformedDataView;
        }

        function concatenateValues(categoryColumns: DataViewCategoryColumn[]): string[] {
            debug.assertValue(categoryColumns, 'categoryColumns');

            let concatenatedValues: string[] = [];

            // concatenate the values in dataViewCategorical.categories[0..length-1].values[j], and store it in combinedValues[j]
            for (let categoryColumn of categoryColumns) {
                for (let i = 0, len = categoryColumn.values.length; i < len; i++) {
                    // TODO VSTS 6842107: need to clean up this value concatenation logic
                    // This code does not have access to valueFormatter module.  So first, move valueFormatter.getFormatString(...)
                    // and/or valueFormatter.formatValueColumn(...) to somewhere near DataViewObjects.ts, and then use it from here.
                    let valueToAppend = categoryColumn.values && categoryColumn.values[i];
                    concatenatedValues[i] = (concatenatedValues[i] === undefined) ? (valueToAppend + '') : (concatenatedValues[i] + ' ' + valueToAppend);
                }
            }

            return concatenatedValues;
        }

        function createConcatenatedColumnMetadata(categoryColumns: DataViewCategoryColumn[], roleName: string): DataViewMetadataColumn {
            debug.assertNonEmpty(categoryColumns, 'categoryColumns');

            let concatenatedDisplayName: string;

            // By the end of the for-loop, consistentIsMeasure will be:
            // - true if _.every(categoryColumn, c => c.source.isMeasure === true), or else
            // - false if _.every(categoryColumn, c => c.source.isMeasure === false), or else
            // - undefined.
            let consistentIsMeasure: boolean = categoryColumns[0].source.isMeasure;

            for (let categoryColumn of categoryColumns) {
                let columnSource: DataViewMetadataColumn = categoryColumn.source;

                concatenatedDisplayName = (concatenatedDisplayName == null) ? columnSource.displayName : (concatenatedDisplayName + ' ' + columnSource.displayName);

                if (consistentIsMeasure !== columnSource.isMeasure) {
                    consistentIsMeasure = undefined;
                }
            }

            let newRoles: { [name: string]: boolean } = {};
            newRoles[roleName] = true;

            let newColumnMetadata: DataViewMetadataColumn = {
                displayName: concatenatedDisplayName,
                roles: newRoles,
                type: ValueType.fromPrimitiveTypeAndCategory(PrimitiveType.Text)
            };

            if (consistentIsMeasure !== undefined) {
                newColumnMetadata.isMeasure = consistentIsMeasure;
            }

            // TODO VSTS 6842046: The Chart visual code depends on having a string for DataViewMetadataColumn.queryName,
            // even though the property is optional as specified on DataViewMetadataColumn.
            // Investigate whether we should change that property to mandatory or change the Chart visual code.
            newColumnMetadata.queryName = 'Concatenated Column Metadata';

            return newColumnMetadata;
        }

        function addToMetadata(transformedDataView: DataView, newColumn: DataViewMetadataColumn): void {
            let transformedColumns = inheritSingle(transformedDataView.metadata.columns);
            transformedColumns.push(newColumn);

            let transformedMetadata = inheritSingle(transformedDataView.metadata);
            transformedMetadata.columns = transformedColumns;

            transformedDataView.metadata = transformedMetadata;
        }

        function createConcatenatedCategoryColumn(
            concatenationSourceColumns: DataViewCategoryColumn[],
            columnMetadata: DataViewMetadataColumn,
            concatenatedValues: string[]): DataViewCategoryColumn {
            debug.assert(concatenationSourceColumns && concatenationSourceColumns.length >= 2, 'concatenationSourceColumns && concatenationSourceColumns.length >= 2');

            let newCategoryColumn: DataViewCategoryColumn = {
                source: columnMetadata,
                values: concatenatedValues
            };

            // We expect every DataViewCategoryColumn in concatenationSourceColumns to have the same set of identities, always.
            // So, we'll just take the identities and identityFields from the first column
            let firstColumn = concatenationSourceColumns[0];

            if (firstColumn.identity) {
                newCategoryColumn.identity = firstColumn.identity;
            }

            if (firstColumn.identityFields) {
                newCategoryColumn.identityFields = firstColumn.identityFields;
            }

            // I doubt that any firstColumn.objects property would still make sense in the new column,
            // so I won't copy that over for now.

            return newCategoryColumn;
        }
    }
}