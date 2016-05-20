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

module powerbi.visuals.system {
    export class DebugVisual implements IVisual {
        public static capabilities = {
            dataRoles: [{
                name: 'Values',
                kind: VisualDataRoleKind.GroupingOrMeasure,
                displayName: data.createDisplayNameGetter('Role_DisplayName_Values'),
            }],
            dataViewMappings: [{
                table: {
                    rows: {
                        for: { in: 'Values' }
                    },
                    rowCount: { preferred: { min: 1 } }
                },
            }],
        };

        private adapter: IVisual;
        private container: JQuery;
        private visualContainer: JQuery;
        private optionsForVisual: VisualInitOptions;
        private host: IVisualHostServices;
        private lastUpdateOptions: VisualUpdateOptions;
        
        private reloadAdapter() {
            let baseUrl = localStorageService.getData('DEVELOPMENT_SERVER_URL');
            $.getScript(baseUrl + 'visual.js', () => {
                $.get(baseUrl + 'visual.css', (data) => {
                    $('#css-DEBUG').remove();
                    $("<style/>", {
                        id: 'css-DEBUG',
                        html: data,
                    }).appendTo($('head'));
                    powerbi.visuals.plugins.debugVisual.capabilities = powerbi.visuals.plugins.custom.capabilities;
                    this.host.visualCapabilitiesChanged();
                });
            });
        }

        private createRefreshBtn() {
            let refreshBtn = $('<i title="Reload Visual\'s Code" class="controlBtn glyphicon pbi-glyph-refresh"></i>');
            refreshBtn.on('click', () => this.reloadAdapter());
            return refreshBtn;
        }

        private createDataBtn() {
            let dataBtn = $('<i title="Inspect Dataview" class="controlBtn glyphicon pbi-glyph-seedata"></i>');
            return dataBtn;
        }

        private createHelpBtn() {
            let helpBtn = $('<i title="Get Help" class="controlBtn glyphicon pbi-glyph-question"></i>');
            return helpBtn;
        }

        private createSmilyBtn() {
            let smilyBtn = $('<i title="Tweet Feedback" class="controlBtn glyphicon pbi-glyph-smiley"></i>');
            return smilyBtn;
        }

        //TODO: Localize all button labels
        private buildControls(): JQuery {
            let controlsContainer = $('<div class="debugVisual-controlsContainer"></div>');
            controlsContainer
                .append(
                this.createRefreshBtn(),
                this.createDataBtn(),
                this.createHelpBtn(),
                this.createSmilyBtn());

            return controlsContainer;
        }

        public init(options: VisualInitOptions): void {
            this.host = options.host;
            let container = this.container = $('<div class="debugVisualContainer"></div>');
            let visualContainer = this.visualContainer = $('<div class="custom"></div>');
            container.append(visualContainer);
            options.element.append(container);

            let optionsForVisual = this.optionsForVisual = Prototype.inherit(options);
            optionsForVisual.element = visualContainer;
            let adapter = this.adapter
                = extensibility.createVisualAdapter(powerbi.visuals.plugins.custom);

            this.host.setToolbar(this.buildControls());
            if (adapter.init) {
                adapter.init(optionsForVisual);
            }
        }

        public update(options: VisualUpdateOptions) {
            let visualOptions = this.lastUpdateOptions = Prototype.inherit(options);
            let height = options.viewport.height;
            let width = options.viewport.width;
            this.visualContainer
                .height(height)
                .width(width);
            if (this.adapter.update) {
                this.adapter.update(visualOptions);
            }
        }

        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions) {
            if (this.adapter.enumerateObjectInstances) {
                return this.adapter.enumerateObjectInstances(options);
            }
            return [];
        }

        public destroy() {
            if (this.adapter.destroy) {
                this.adapter.destroy();
            };
            this.container = null;
        }
    }
}