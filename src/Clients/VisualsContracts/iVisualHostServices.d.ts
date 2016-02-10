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

declare module powerbi {

    /** Defines behavior for IVisual interaction with the host environment. */
    export interface IVisualHostServices {
        /** Returns the localized form of a string. */
        getLocalizedString(stringId: string): string;

        /** Notifies of a DragStart event. */
        onDragStart(args: DragEventArgs): void;

        ///** Indicates whether the drag payload is compatible with the IVisual's data role.  This is useful when dropping to a particular drop area within the visual (e.g., dropping on a legend). */
        //canDropAs(payload: DragPayload, dataRole?: string): boolean;

        ///** Notifies of a Drop event. */
        //onDrop(args: DragEventArgs, dataRole?: string);

        /** Gets a value indicating whether the given selection is valid. */
        canSelect(args: SelectEventArgs): boolean;

        /** Notifies of a data point being selected. */
        onSelect(args: SelectEventArgs): void;  // TODO: Revisit onSelect vs. onSelectObject.

        /** Check if selection is sticky or otherwise. */
        shouldRetainSelection(): boolean;

        /** Notifies of a visual object being selected. */
        onSelectObject?(args: SelectObjectEventArgs): void;  // TODO: make this mandatory, not optional.

        /** Notifies that properties of the IVisual have changed. */
        persistProperties(changes: VisualObjectInstance[]): void;
        persistProperties(changes: VisualObjectInstancesToPersist): void;

        ///** This information will be part of the query. */
        //onDataRangeChanged(range: {
        //    categorical: { // TODO: this structure is affected by the reduction algorithm as well as the data view type
        //        categories?: {
        //            /** Index of the category. */
        //            index: number;
        //            lower?: DataViewScopeIdentity;
        //            upper?: DataViewScopeIdentity;
        //        }[]
        //    }
        // });

        ///** Notifies of a drill down on the specified data point. */
        //onDrillDown(data: DataViewScopeIdentity): void;

        /** Requests more data to be loaded. */
        loadMoreData(): void;

        /** Notification to sort on the specified column */
        onCustomSort(args: CustomSortEventArgs): void;

        /** Indicates which view mode the host is in. */
        getViewMode(): ViewMode;

        /** Notify any warning that happened during update of the visual. */
        setWarnings(clientWarnings: IVisualWarning[]): void;

        /** Sets a toolbar on the host. */
        setToolbar($selector: JQuery): void;

        /** Gets Geocoding Service. */
        geocoder(): IGeocoder;

        /** Gets the locale string */
        locale?(): string;

        /** Gets the promise factory. */
        promiseFactory(): IPromiseFactory;

        /** Gets filter analyzer */
        analyzeFilter(options: FilterAnalyzerOptions): AnalyzedFilter;

        /** Gets display name for the identities */
        getIdentityDisplayNames(identities: DataViewScopeIdentity[]): DisplayNameIdentityPair[];

        /** Set the display names for their corresponding DataViewScopeIdentity */
        setIdentityDisplayNames(displayNamesIdentityPairs: DisplayNameIdentityPair[]): void;

        /** 
         * Creates a Selection Id Builder
         * designed to simplify the creation of SelectionId objects 
         */
        createSelectionIdBuilder?(): visuals.ISelectionIdBuilder;
    }

    export interface DisplayNameIdentityPair {
        displayName: string;
        identity: DataViewScopeIdentity;
    }
}