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

/// <reference path="../../_references.ts"/>

module powerbitests.customVisuals.helpers {
    //(<any>jasmine).DEFAULT_TIMEOUT_INTERVAL = 999999;

    export let d3TimerEnabled: boolean = (() => {
        let d3Timer = d3.timer;
        let d3DisabledTimer = _.merge(callback => d3Timer(callback, 0, 0), d3Timer);

        Object.defineProperty(helpers, 'd3TimerEnabled', { enumerable: true, 
            get: () => d3Timer === d3.timer,
            set: (value) => {
                if(d3TimerEnabled===!value) {
                    (<any>d3).timer = value ? d3Timer : d3DisabledTimer;
                }
            }
        });

        return true;
    })();

    export function getRelativePosition(fromElement: JQuery, toElement: JQuery): powerbi.visuals.shapes.IPoint {
        if(!fromElement.length || !toElement.length) {
            return null;
        }

        let fromElementRect = fromElement[0].getBoundingClientRect();
        let toElementRect = toElement[0].getBoundingClientRect();

        return {
                x: toElementRect.left - fromElementRect.left,
                y: toElementRect.top - fromElementRect.top  
            };
    }

    export function renderTimeout(fn: Function, timeout: number = powerbitests.DefaultWaitForRender): number {
        return setTimeout(fn, timeout);
    }
}