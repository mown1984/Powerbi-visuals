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

module powerbi.extensibility {
    import IPoint = visuals.IPoint;

    export interface SelectionManagerOptions{
        hostServices: IVisualHostServices;
    };

    export class SelectionManager implements ISelectionManager {
        private selectedIds: ISelectionId[];
        private hostServices: IVisualHostServices;
        private promiseFactory: IPromiseFactory;

        public constructor(options: SelectionManagerOptions) {
            this.hostServices = options.hostServices;
            this.selectedIds = [];
            this.promiseFactory = this.hostServices.promiseFactory();
        }
        
        public select(selectionId: ISelectionId, multiSelect: boolean = false): IPromise<ISelectionId[]> {
            let deferred: IDeferred<data.Selector[]> = this.promiseFactory.defer();
            
            if (this.hostServices.shouldRetainSelection()) {
                this.sendSelectionToHost([selectionId]);
            }
            else {
                this.selectInternal(selectionId, multiSelect);
                this.sendSelectionToHost(this.selectedIds);
            }

            deferred.resolve(this.selectedIds);
            return deferred.promise;
        }

        public showContextMenu(selectionId: ISelectionId, position: IPoint): IPromise<{}> {
            let deferred: IDeferred<{}> = this.promiseFactory.defer();

            this.sendContextMenuToHost(selectionId, position);

            deferred.resolve(null);
            return deferred.promise;
        }

        public hasSelection(): boolean {
            return this.selectedIds.length > 0;
        }

        public clear(): IPromise<{}> {
            let deferred = this.promiseFactory.defer();
            this.selectedIds = [];
            this.sendSelectionToHost([]);
            deferred.resolve(null);
            return deferred.promise;
        }

        public getSelectionIds(): ISelectionId[] {
            return this.selectedIds;
        }

        private sendSelectionToHost(ids: ISelectionId[]) {
            let selectArgs: SelectEventArgs = {
                data: ids
                    .filter((value: ISelectionId) => (<visuals.SelectionId>value).hasIdentity())
                    .map((value: ISelectionId) => (<visuals.SelectionId>value).getSelector())
            };

            let data2 = this.getSelectorsByColumn(ids);

            if (!_.isEmpty(data2))
                selectArgs.data2 = data2;

            this.hostServices.onSelect(selectArgs);
        }

        private sendContextMenuToHost(selectionId: ISelectionId, position: IPoint): void {
            let selectors = this.getSelectorsByColumn([selectionId]);
            if (_.isEmpty(selectors))
                return;

            let args: ContextMenuArgs = {
                data: selectors,
                position: position
            };

            this.hostServices.onContextMenu(args);
        }

        private getSelectorsByColumn(selectionIds: ISelectionId[]): SelectorsByColumn[] {
            return _(selectionIds)
                .filter(value => (<visuals.SelectionId>value).hasIdentity)
                .map(value => (<visuals.SelectionId>value).getSelectorsByColumn())
                .compact()
                .value();
        }

        private selectInternal(selectionId: ISelectionId, multiSelect: boolean) {
            if (SelectionManager.containsSelection(this.selectedIds, selectionId)) {
                this.selectedIds = multiSelect
                    ? this.selectedIds.filter(d => !(<visuals.SelectionId>selectionId).equals(<visuals.SelectionId>d))
                    : this.selectedIds.length > 1
                        ? [selectionId] : [];
            } else {
                if (multiSelect)
                    this.selectedIds.push(selectionId);
                else
                    this.selectedIds = [selectionId];
            }
        }

        public static containsSelection(list: ISelectionId[], id: ISelectionId) {
            return list.some(d => (<visuals.SelectionId>id).equals(<visuals.SelectionId>d));
        }
    }
} 