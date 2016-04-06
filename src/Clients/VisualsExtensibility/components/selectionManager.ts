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

module powerbi.extensibility {
    import ISelectionId = visuals.ISelectionId;
    
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
            let defered: IDeferred<data.Selector[]> = this.promiseFactory.defer();
            
            if (this.hostServices.shouldRetainSelection()) {
                this.sendSelectionToHost([selectionId]);
            }
            else {
                this.selectInternal(selectionId, multiSelect);
                this.sendSelectionToHost(this.selectedIds);
            }

            defered.resolve(this.selectedIds);
            return defered.promise;
        }

        public hasSelection(): boolean {
            return this.selectedIds.length > 0;
        }

        public clear(): IPromise<{}> {
            let defered = this.promiseFactory.defer();
            this.selectedIds = [];
            this.sendSelectionToHost([]);
            defered.resolve(null);
            return defered.promise;
        }

        public getSelectionIds(): ISelectionId[] {
            return this.selectedIds;
        }

        private sendSelectionToHost(ids: ISelectionId[]) {
            let selectArgs: SelectEventArgs = {
                data: ids
                    .filter((value: ISelectionId) => value.hasIdentity())
                    .map((value: ISelectionId) => value.getSelector())
            };

            let data2: SelectorsByColumn[] = ids
                .filter((value: ISelectionId) => value.getSelectorsByColumn() && value.hasIdentity())
                .map((value: ISelectionId) => value.getSelectorsByColumn());

            if (data2 && data2.length > 0)
                selectArgs.data2 = data2;

            this.hostServices.onSelect(selectArgs);
        }

        private selectInternal(selectionId: ISelectionId, multiSelect: boolean) {
            if (SelectionManager.containsSelection(this.selectedIds, selectionId)) {
                this.selectedIds = multiSelect
                    ? this.selectedIds.filter(d => !selectionId.equals(d))
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
            return list.some(d => id.equals(d));
        }
    }
} 