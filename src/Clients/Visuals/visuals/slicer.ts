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
    import PixelConverter = jsCommon.PixelConverter;

    export interface SlicerDefaultValueHandler {
        getDefaultValue(): data.SQConstantExpr;
        getIdentityFields(): data.SQExpr[];
    }

    export interface SlicerConstructorOptions {
        behavior?: SlicerWebBehavior;
    }

    export interface SlicerData {
        categorySourceName: string;
        formatString: string;
        slicerDataPoints: SlicerDataPoint[];
        slicerSettings: SlicerSettings;
        hasSelectionOverride?: boolean;
    }

    export interface SlicerDataPoint extends SelectableDataPoint {
        value: string;
        isSelectAllDataPoint?: boolean;
    }

    export interface SlicerSettings {
        general: {
            outlineColor: string;
            outlineWeight: number;
        };
        header: {
            borderBottomWidth: number;
            show: boolean;
            outline: string;
            fontColor: string;
            background: string;
            textSize: number;
        };
        selection: {
            selectAllCheckboxEnabled: boolean;
            singleSelect: boolean;
        };
        slicerText: {
            color: string;
            outline: string;
            background: string;
            textSize: number;
        };
    }

    interface CheckboxStyle {
        transform: string;
        'transform-origin': string;
        'font-size': string;
    }

    export class Slicer implements IVisual, SlicerDefaultValueHandler {
        private element: JQuery;
        private currentViewport: IViewport;
        private dataView: DataView;
        private slicerHeader: D3.Selection;
        private slicerBody: D3.Selection;
        private slicerContainer: D3.Selection;
        private listView: IListView;
        private slicerData: SlicerData;
        private settings: SlicerSettings;
        private interactivityService: IInteractivityService;
        private behavior: SlicerWebBehavior;
        private hostServices: IVisualHostServices;
        private waitingForData: boolean;
        private textProperties: TextProperties = {
            'fontFamily': 'wf_segoe-ui_normal, helvetica, arial, sans-serif',
            'fontSize': '14px',
        };

        public static DefaultStyleProperties(): SlicerSettings {
            return {
                general: {
                    outlineColor: '#808080',
                    outlineWeight: 1
                },
                header: {
                    borderBottomWidth: 1,
                    show: true,
                    outline: 'BottomOnly',
                    fontColor: '#000000',
                    background: '#ffffff',
                    textSize: 10,
                },
                selection: {
                    selectAllCheckboxEnabled: false,
                    singleSelect: true
                },
                slicerText: {
                    color: '#666666',
                    outline: 'None',
                    background: '#ffffff',
                    textSize: 10,
                },
            };
        }

        constructor(options?: SlicerConstructorOptions) {
            if (options) {
                this.behavior = options.behavior;
            }
        }

        public static converter(dataView: DataView, localizedSelectAllText: string, interactivityService: IInteractivityService, hostServices?: IVisualHostServices): SlicerData {
            return DataConversion.convert(dataView, localizedSelectAllText, interactivityService, hostServices);
        }

        public init(options: VisualInitOptions): void {
            this.element = options.element;
            this.currentViewport = options.viewport;
            if (this.behavior) {
                this.interactivityService = createInteractivityService(options.host);
            }
            this.hostServices = options.host;
            this.settings = Slicer.DefaultStyleProperties();

            this.initContainer();
        }

        public onDataChanged(options: VisualDataChangedOptions): void {
            let dataViews = options.dataViews;
            debug.assertValue(dataViews, 'dataViews');

            let existingDataView = this.dataView;
            if (dataViews && dataViews.length > 0) {
                this.dataView = dataViews[0];
            }

            let resetScrollbarPosition = false;
            // Null check is needed here. If we don't check for null, selecting a value on loadMore event will evaluate the below condition to true and resets the scrollbar
            if (options.operationKind !== undefined) {
                resetScrollbarPosition = options.operationKind !== VisualDataChangeOperationKind.Append
                && !DataViewAnalysis.hasSameCategoryIdentity(existingDataView, this.dataView);
            }

            this.updateInternal(resetScrollbarPosition);
            this.waitingForData = false;
        }

        public onResizing(finalViewport: IViewport): void {
            this.currentViewport = finalViewport;
            this.updateInternal(false /* resetScrollbarPosition */);
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] {
            return ObjectEnumerator.enumerateObjectInstances(options, this.slicerData, this.settings);
        }

        // SlicerDefaultValueHandler
        public getDefaultValue(): data.SQConstantExpr {
            return DataConversion.getDefaultValue(this.dataView);
        }

        public getIdentityFields(): data.SQExpr[] {
            if (!this.dataView) {
                return;
            }

            let dataViewCategorical = this.dataView.categorical;
            if (dataViewCategorical == null || _.isEmpty(dataViewCategorical.categories))
                return;

            return dataViewCategorical.categories[0].identityFields;
        }

        private updateInternal(resetScrollbarPosition: boolean) {
            this.updateSlicerBodyDimensions();

            let localizedSelectAllText = this.hostServices.getLocalizedString(DisplayNameKeys.SelectAll);
            let data = Slicer.converter(this.dataView, localizedSelectAllText, this.interactivityService, this.hostServices);
            if (!data) {
                this.listView.empty();
                return;
            }

            data.slicerSettings.general.outlineWeight = data.slicerSettings.general.outlineWeight < 0 ? 0 : data.slicerSettings.general.outlineWeight;
            this.slicerData = data;
            this.settings = this.slicerData.slicerSettings;

            this.updateSelectionStyle();

            this.listView
                .viewport(this.getSlicerBodyViewport(this.currentViewport))
                .rowHeight(this.getRowHeight())
                .data(
                    data.slicerDataPoints,
                    (d: SlicerDataPoint) => $.inArray(d, data.slicerDataPoints),
                    resetScrollbarPosition
                    );
        }

        private updateSelectionStyle(): void {
            this.slicerContainer.classed('isMultiSelectEnabled', !this.settings.selection.singleSelect);
        }

        private initContainer() {
            let settings = this.settings;
            let slicerBodyViewport = this.getSlicerBodyViewport(this.currentViewport);

            let slicerContainerDiv = document.createElement('div');
            slicerContainerDiv.className = Selectors.Container.class;
            let slicerContainer = this.slicerContainer = d3.select(slicerContainerDiv);

            this.slicerHeader = slicerContainer.append('div').classed(Selectors.Header.class, true);

            this.slicerHeader.append('span')
                .classed(Selectors.Clear.class, true)
                .attr('title', this.hostServices.getLocalizedString(DisplayNameKeys.Clear));

            this.slicerHeader.append('div').classed(Selectors.HeaderText.class, true)
                .style({
                    'border-style': Styles.getBorderStyle(settings.header.outline),
                    'border-color': settings.general.outlineColor,
                    'border-width': Styles.getBorderWidth(settings.header.outline, settings.general.outlineWeight),
                    'font-size': PixelConverter.fromPoint(settings.header.textSize),
                });

            this.slicerBody = slicerContainer.append('div').classed(Selectors.Body.class, true)
                .style({
                    'height': PixelConverter.toString(slicerBodyViewport.height),
                    'width': PixelConverter.toString(slicerBodyViewport.width),
                });

            let rowEnter = (rowSelection: D3.Selection) => {
                let settings = this.settings;
                let listItemElement = rowSelection.append('li')
                    .classed(Selectors.ItemContainer.class, true);

                let labelElement = listItemElement.append('div')
                    .classed(Selectors.Input.class, true);

                labelElement.append('input')
                    .attr('type', 'checkbox');

                labelElement.append('span')
                    .classed(Selectors.Checkbox.class, true)
                    .style(Styles.buildCheckboxStyle(this.settings));

                listItemElement.append('span')
                    .classed(Selectors.LabelText.class, true)
                    .style({
                        'font-size': PixelConverter.fromPoint(settings.slicerText.textSize),
                    });
            };

            let rowUpdate = (rowSelection: D3.Selection) => {
                let settings = this.settings;
                let data = this.slicerData;
                if (data && settings) {

                    if (settings.header.show) {
                        this.slicerHeader.style('display', 'block');
                        this.slicerHeader.select(Selectors.HeaderText.selector)
                            .text(this.slicerData.categorySourceName)
                            .style({
                                'border-style': Styles.getBorderStyle(settings.header.outline),
                                'border-color': settings.general.outlineColor,
                                'border-width': Styles.getBorderWidth(settings.header.outline, settings.general.outlineWeight),
                                'color': settings.header.fontColor,
                                'background-color': settings.header.background,
                                'font-size': PixelConverter.fromPoint(settings.header.textSize),
                            });
                    }
                    else {
                        this.slicerHeader.style('display', 'none');
                    }

                    let slicerText = rowSelection.selectAll(Selectors.LabelText.selector);
                    let formatString = data.formatString;
                    slicerText.text((d: SlicerDataPoint) => valueFormatter.format(d.value, formatString));
                    slicerText.style({
                        'color': settings.slicerText.color,
                        'background-color': settings.slicerText.background,
                        'border-style': Styles.getBorderStyle(settings.slicerText.outline),
                        'border-color': settings.general.outlineColor,
                        'border-width': Styles.getBorderWidth(settings.slicerText.outline, settings.general.outlineWeight),
                        'font-size': PixelConverter.fromPoint(settings.slicerText.textSize),
                    });

                    let slicerCheckbox = rowSelection.selectAll(Selectors.Input.selector).selectAll('span');
                    slicerCheckbox.style(Styles.buildCheckboxStyle(this.settings));

                    if (this.interactivityService && this.slicerBody) {
                        let slicerBody = this.slicerBody.attr('width', this.currentViewport.width);
                        let slicerItemContainers = slicerBody.selectAll(Selectors.ItemContainer.selector);
                        let slicerItemLabels = slicerBody.selectAll(Selectors.LabelText.selector);
                        let slicerItemInputs = slicerBody.selectAll(Selectors.Input.selector);
                        let slicerClear = this.slicerHeader.select(Selectors.Clear.selector);

                        let behaviorOptions: SlicerBehaviorOptions = {
                            dataPoints: data.slicerDataPoints,
                            slicerItemContainers: slicerItemContainers,
                            slicerItemLabels: slicerItemLabels,
                            slicerItemInputs: slicerItemInputs,
                            slicerClear: slicerClear,
                            interactivityService: this.interactivityService,
                            slicerSettings: data.slicerSettings,
                        };

                        this.interactivityService.bind(
                            data.slicerDataPoints,
                            this.behavior,
                            behaviorOptions,
                            { overrideSelectionFromData: true, hasSelectionOverride: data.hasSelectionOverride, slicerDefaultValueHandler: this });
                        SlicerWebBehavior.styleSlicerInputs(rowSelection.select(Selectors.Input.selector), this.interactivityService.hasSelection());
                    }
                    else {
                        SlicerWebBehavior.styleSlicerInputs(rowSelection.select(Selectors.Input.selector), false);
                    }
                }
            };

            let rowExit = (rowSelection: D3.Selection) => {
                rowSelection.remove();
            };

            let listViewOptions: ListViewOptions = {
                rowHeight: this.getRowHeight(),
                enter: rowEnter,
                exit: rowExit,
                update: rowUpdate,
                loadMoreData: () => this.onLoadMoreData(),
                scrollEnabled: true,
                viewport: this.getSlicerBodyViewport(this.currentViewport),
                baseContainer: this.slicerBody,
            };

            this.listView = ListViewFactory.createListView(listViewOptions);

            // Append container to DOM
            this.element.get(0).appendChild(slicerContainerDiv);
        }

        private onLoadMoreData(): void {
            if (!this.waitingForData && this.dataView.metadata && this.dataView.metadata.segment) {
                this.hostServices.loadMoreData();
                this.waitingForData = true;
            }
        }

        private getSlicerBodyViewport(currentViewport: IViewport): IViewport {
            let settings = this.settings;
            let headerHeight = (settings.header.show) ? this.getHeaderHeight() : 0;
            let slicerBodyHeight = currentViewport.height - (headerHeight + settings.header.borderBottomWidth);
            return {
                height: slicerBodyHeight,
                width: currentViewport.width
            };
        }

        private updateSlicerBodyDimensions(): void {
            let slicerViewport = this.getSlicerBodyViewport(this.currentViewport);
            this.slicerBody.style({
                'height': PixelConverter.toString(slicerViewport.height),
                'width': PixelConverter.toString(slicerViewport.width),
            });
        }

        private getTextProperties(textSize: number): TextProperties {
            this.textProperties.fontSize = PixelConverter.fromPoint(textSize);
            return this.textProperties;
        }

        private getHeaderHeight(): number {
            return TextMeasurementService.estimateSvgTextHeight(
                this.getTextProperties(this.settings.header.textSize)
                );
        }

        private getRowHeight(): number {
            return TextMeasurementService.estimateSvgTextHeight(
                this.getTextProperties(this.settings.slicerText.textSize)
                );
        }
    }

    /** Helper module for converting a DataView into SlicerData. */
    module DataConversion {
        export function convert(dataView: DataView, localizedSelectAllText: string, interactivityService: IInteractivityService, hostServices?: IVisualHostServices): SlicerData {
            let slicerData: SlicerData;
            if (!dataView) {
                return;
            }

            let dataViewCategorical = dataView.categorical;
            if (dataViewCategorical == null || dataViewCategorical.categories == null || dataViewCategorical.categories.length === 0)
                return;

            let isInvertedSelectionMode = undefined;
            let objects = dataView.metadata ? <any> dataView.metadata.objects : undefined;
            let categories = dataViewCategorical.categories[0];

            let numberOfScopeIds: number;
            let filter: data.SemanticFilter;
            if (objects && objects.general && objects.general.filter) {
                let identityFields = categories.identityFields;
                if (!identityFields)
                    return;
                filter = <data.SemanticFilter>objects.general.filter;
                let scopeIds = powerbi.data.SQExprConverter.asScopeIdsContainer(filter, identityFields);
                if (scopeIds) {
                    isInvertedSelectionMode = scopeIds.isNot;
                    numberOfScopeIds = scopeIds.scopeIds ? scopeIds.scopeIds.length : 0;
                }
                else {
                    isInvertedSelectionMode = false;
                }
            }

            let defaultValueScopeIdentity = getDefaultValueScopeIdentity(dataView, filter, interactivityService, categories.identityFields, hostServices);

            if (interactivityService) {
                if (isInvertedSelectionMode === undefined) {
                    // The selection state is read from the Interactivity service in case of SelectAll or Clear when query doesn't update the visual
                    isInvertedSelectionMode = interactivityService.isSelectionModeInverted();
                }
                else {
                    interactivityService.setSelectionModeInverted(isInvertedSelectionMode);
                }
            }

            let categoryValuesLen = categories && categories.values ? categories.values.length : 0;
            let slicerDataPoints: SlicerDataPoint[] = [];                
                                     
            // Pass over the values to see if there's a positive or negative selection
            let hasSelection: boolean = undefined;

            for (let idx = 0; idx < categoryValuesLen; idx++) {
                let selected = isCategoryColumnSelected(slicerProps.selectedPropertyIdentifier, categories, idx);
                if (selected != null) {
                    hasSelection = selected;
                    break;
                }
            }

            let numberOfCategoriesSelectedInData = 0;
            for (let idx = 0; idx < categoryValuesLen; idx++) {
                let categoryIdentity = categories.identity ? categories.identity[idx] : null;
                let categoryIsSelected = isCategoryColumnSelected(slicerProps.selectedPropertyIdentifier, categories, idx);
                if (defaultValueScopeIdentity && DataViewScopeIdentity.equals(categoryIdentity, defaultValueScopeIdentity))
                    categoryIsSelected = true;

                if (hasSelection != null) {
                    // If the visual is in InvertedSelectionMode, all the categories should be selected by default unless they are not selected
                    // If the visual is not in InvertedSelectionMode, we set all the categories to be false except the selected category                         
                    if (isInvertedSelectionMode) {
                        if (categories.objects == null)
                            categoryIsSelected = undefined;

                        if (categoryIsSelected != null) {
                            categoryIsSelected = hasSelection;
                        }
                        else if (categoryIsSelected == null)
                            categoryIsSelected = !hasSelection;
                    }
                    else {
                        if (categoryIsSelected == null) {
                            categoryIsSelected = !hasSelection;
                        }
                    }
                }

                if (categoryIsSelected)
                    numberOfCategoriesSelectedInData++;

                slicerDataPoints.push({
                    value: categories.values[idx],
                    identity: SelectionId.createWithId(categoryIdentity),
                    selected: categoryIsSelected
                });
            }

            let defaultSettings = createDefaultSettings(dataView);

            if (defaultSettings.selection.selectAllCheckboxEnabled) {
                slicerDataPoints.unshift({
                    value: localizedSelectAllText,
                    identity: SelectionId.createWithMeasure(localizedSelectAllText),
                    selected: !!isInvertedSelectionMode,
                    isSelectAllDataPoint: true
                });
            }

            slicerData = {
                categorySourceName: categories.source.displayName,
                formatString: valueFormatter.getFormatString(categories.source, slicerProps.formatString),
                slicerSettings: defaultSettings,
                slicerDataPoints: slicerDataPoints,
            };

            // Override hasSelection if a objects contained more scopeIds than selections we found in the data
            if (numberOfScopeIds != null && numberOfScopeIds > numberOfCategoriesSelectedInData) {
                slicerData.hasSelectionOverride = true;
            }

            return slicerData;
        }

        function createDefaultSettings(dataView: DataView): SlicerSettings {
            let defaultSettings = Slicer.DefaultStyleProperties();
            let objects = dataView.metadata.objects;

            if (objects) {
                defaultSettings.general.outlineColor = DataViewObjects.getFillColor(objects, slicerProps.general.outlineColor, defaultSettings.general.outlineColor);
                defaultSettings.general.outlineWeight = DataViewObjects.getValue<number>(objects, slicerProps.general.outlineWeight, defaultSettings.general.outlineWeight);

                defaultSettings.header.show = DataViewObjects.getValue<boolean>(objects, slicerProps.header.show, defaultSettings.header.show);
                defaultSettings.header.fontColor = DataViewObjects.getFillColor(objects, slicerProps.header.fontColor, defaultSettings.header.fontColor);
                defaultSettings.header.background = DataViewObjects.getFillColor(objects, slicerProps.header.background, defaultSettings.header.background);
                defaultSettings.header.outline = DataViewObjects.getValue<string>(objects, slicerProps.header.outline, defaultSettings.header.outline);
                defaultSettings.header.textSize = DataViewObjects.getValue<number>(objects, slicerProps.header.textSize, defaultSettings.header.textSize);

                defaultSettings.slicerText.color = DataViewObjects.getFillColor(objects, slicerProps.Rows.fontColor, defaultSettings.slicerText.color);
                defaultSettings.slicerText.background = DataViewObjects.getFillColor(objects, slicerProps.Rows.background, defaultSettings.slicerText.background);
                defaultSettings.slicerText.outline = DataViewObjects.getValue<string>(objects, slicerProps.Rows.outline, defaultSettings.slicerText.outline);
                defaultSettings.slicerText.textSize = DataViewObjects.getValue<number>(objects, slicerProps.Rows.textSize, defaultSettings.slicerText.textSize);

                defaultSettings.selection.selectAllCheckboxEnabled = DataViewObjects.getValue<boolean>(objects, slicerProps.selection.selectAllCheckboxEnabled, defaultSettings.selection.selectAllCheckboxEnabled);
                defaultSettings.selection.singleSelect = DataViewObjects.getValue<boolean>(objects, slicerProps.selection.singleSelect, defaultSettings.selection.singleSelect);
            }

            return defaultSettings;
        }

        function createPropertiesWithDefaultFilter(fieldsExpr: data.SQExpr[]): VisualObjectInstance[]{
            debug.assertValue(fieldsExpr, 'fieldsExpr');

            let filterPropertyIdentifier = slicerProps.filterPropertyIdentifier;
            let properties: { [propertyName: string]: DataViewPropertyValue } = {};
            let filter = powerbi.data.SemanticFilter.getDefaultValueFilter(fieldsExpr[0]);
            properties[filterPropertyIdentifier.propertyName] = filter;

            return [<VisualObjectInstance> {
                objectName: filterPropertyIdentifier.objectName,
                selector: undefined,
                properties: properties
            }];
        }

        function getDefaultValueScopeIdentity(
            dataView: DataView,
            filter: data.SemanticFilter,
            interactivityService: IInteractivityService,
            identityFields: data.SQExpr[],
            hostServices: IVisualHostServices): DataViewScopeIdentity {
            let defaultValueScopeIdentity: DataViewScopeIdentity;
            let defaultValue = getDefaultValue(dataView);
            if (defaultValue && interactivityService && !_.isEmpty(identityFields)) {
                if (!filter || data.SemanticFilter.isDefaultFilter(filter)) {
                    defaultValueScopeIdentity = data.createDataViewScopeIdentity(data.SQExprBuilder.equal(identityFields[0], defaultValue));

                    // update filter if this is the first time loaded slicer
                    if (interactivityService.isDefaultValueEnabled() === undefined) {
                        interactivityService.setDefaultValueMode(true);
                        if (hostServices)
                            hostServices.persistProperties(createPropertiesWithDefaultFilter(identityFields));
                    }
                }
            }
            return defaultValueScopeIdentity;
        }

        export function getDefaultValue(dataView: DataView): data.SQConstantExpr {
            if (dataView && dataView.metadata && !_.isEmpty(dataView.metadata.columns)) {
                return DataViewObjects.getValue<data.SQConstantExpr>(dataView.metadata.columns[0].objects, slicerProps.defaultValue);
            }
        }
    }

    /** Helper class for calculating the current slicer settings. */
    module ObjectEnumerator {
        export function enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions, data: SlicerData, settings: SlicerSettings): VisualObjectInstance[] {
            if (!data)
                return;

            switch (options.objectName) {
                case 'Rows':
                    return enumerateRows(data, settings);
                case 'header':
                    return enumerateHeader(data, settings);
                case 'general':
                    return enumerateGeneral(data, settings);
                case 'selection':
                    return enumerateSelection(data, settings);
            }
        }

        function enumerateSelection(data: SlicerData, settings: SlicerSettings): VisualObjectInstance[] {
            let slicerSettings = settings;
            let selectAllCheckboxEnabled = data && data.slicerSettings && data.slicerSettings.selection && data.slicerSettings.selection.selectAllCheckboxEnabled !== undefined ?
                data.slicerSettings.selection.selectAllCheckboxEnabled : slicerSettings.selection.selectAllCheckboxEnabled;
            let singleSelect = data && data.slicerSettings && data.slicerSettings.selection && data.slicerSettings.selection.singleSelect !== undefined ?
                data.slicerSettings.selection.singleSelect : slicerSettings.selection.singleSelect;

            return [{
                selector: null,
                objectName: 'selection',
                properties: {
                    selectAllCheckboxEnabled: selectAllCheckboxEnabled,
                    singleSelect: singleSelect
                }
            }];
        }

        function enumerateHeader(data: SlicerData, settings: SlicerSettings): VisualObjectInstance[] {
            let slicerSettings = settings;
            let fontColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.header && data.slicerSettings.header.fontColor ?
                data.slicerSettings.header.fontColor : slicerSettings.header.fontColor;
            let background = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.header && data.slicerSettings.header.background ?
                data.slicerSettings.header.background : slicerSettings.header.background;
            return [{
                selector: null,
                objectName: 'header',
                properties: {
                    show: slicerSettings.header.show,
                    fontColor: fontColor,
                    background: background,
                    outline: slicerSettings.header.outline,
                    textSize: slicerSettings.header.textSize,
                }
            }];
        }

        function enumerateRows(data: SlicerData, settings: SlicerSettings): VisualObjectInstance[] {
            let slicerSettings = settings;
            let fontColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.slicerText && data.slicerSettings.slicerText.color ?
                data.slicerSettings.slicerText.color : slicerSettings.slicerText.color;
            let background = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.slicerText && data.slicerSettings.slicerText.background ?
                data.slicerSettings.slicerText.background : slicerSettings.slicerText.background;
            return [{
                selector: null,
                objectName: 'rows',
                properties: {
                    fontColor: fontColor,
                    background: background,
                    outline: slicerSettings.slicerText.outline,
                    textSize: slicerSettings.slicerText.textSize,
                }
            }];
        }

        function enumerateGeneral(data: SlicerData, settings: SlicerSettings): VisualObjectInstance[] {
            let slicerSettings = settings;
            let outlineColor = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.general && data.slicerSettings.general.outlineColor ?
                data.slicerSettings.general.outlineColor : slicerSettings.general.outlineColor;
            let outlineWeight = data !== undefined && data.slicerSettings !== undefined && data.slicerSettings.general && data.slicerSettings.general.outlineWeight ?
                data.slicerSettings.general.outlineWeight : slicerSettings.general.outlineWeight;

            return [{
                selector: null,
                objectName: 'general',
                properties: {
                    outlineColor: outlineColor,
                    outlineWeight: outlineWeight
                }
            }];
        }
    }

    /** Helper class for managing slicer styles. */
    module Styles {
        export function buildCheckboxStyle(settings: SlicerSettings): CheckboxStyle {
            let checkboxScale = getCheckboxScale(settings);
            let checkboxTransformOrigin = SVGUtil.transformOrigin('left', 'center');
            return {
                'transform': checkboxScale,
                'transform-origin': checkboxTransformOrigin,
                'font-size': PixelConverter.fromPoint(settings.slicerText.textSize),
            };
        }

        export function getBorderStyle(outlineElement: string): string {
            return outlineElement === '0px' ? 'none' : 'solid';
        }

        export function getBorderWidth(outlineElement: string, outlineWeight: number): string {
            switch (outlineElement) {
                case 'None':
                    return '0px';
                case 'BottomOnly':
                    return '0px 0px ' + outlineWeight + 'px 0px';
                case 'TopOnly':
                    return outlineWeight + 'px 0px 0px 0px';
                case 'TopBottom':
                    return outlineWeight + 'px 0px ' + outlineWeight + 'px 0px';
                case 'LeftRight':
                    return '0px ' + outlineWeight + 'px 0px ' + outlineWeight + 'px';
                case 'Frame':
                    return outlineWeight + 'px';
                default:
                    return outlineElement.replace("1", outlineWeight.toString());
            }
        }

        function getCheckboxScale(settings: SlicerSettings): string {
            let scale = jsCommon.TextSizeDefaults.getScale(settings.slicerText.textSize);
            let size = (CheckboxSprite.MinimumSize + (CheckboxSprite.SizeRange * scale));
            let relativeZoom = size / CheckboxSprite.Size;

            let rounded = powerbi.Double.toIncrement(relativeZoom, 0.05);

            return SVGUtil.scale(rounded);
        }
    }

    /** CSS selectors for slicer elements. */
    module Selectors {
        import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;

        export const Container = createClassAndSelector('slicerContainer');
        export const Header = createClassAndSelector('slicerHeader');
        export const HeaderText = createClassAndSelector('headerText');
        export const Body = createClassAndSelector('slicerBody');
        export const ItemContainer = createClassAndSelector('slicerItemContainer');
        export const LabelText = createClassAndSelector('slicerText');
        export const Input = createClassAndSelector('slicerCheckbox');
        export const Checkbox = createClassAndSelector('checkbox');
        export const Clear = createClassAndSelector('clear');
    }

    module DisplayNameKeys {
        export const Clear = 'Slicer_Clear';
        export const SelectAll = 'Slicer_SelectAll';
    }

    module CheckboxSprite {
        export const MinimumSize = 8;
        export const Size = 13;
        export const SizeRange = Size - MinimumSize;
    }
}