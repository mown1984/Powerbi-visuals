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

module powerbi.data.utils {
    export module DataViewMatrixUtils {
        /**
         * Invokes the specified callback once per descendent leaf node of the specified matrixNode, with an optional 
         * index parameter in the callback that is the 0-based index of the particular leaf node in the context of this 
         * visitLeafNodes(...) invocation.
         */
        export function visitLeafNodes(matrixNode: DataViewMatrixNode, callback: (leafNode: DataViewMatrixNode, index?: number) => void): void {
            debug.assertValue(matrixNode, 'matrixNode');
            debug.assertValue(callback, 'callback');

            visitLeafNodesRecursive(matrixNode, 0, callback);
        }

        function visitLeafNodesRecursive(matrixNode: DataViewMatrixNode, nextIndex: number, callback: (leafNode: DataViewMatrixNode, index?: number) => void): number {
            debug.assertValue(matrixNode, 'matrixNode');
            debug.assertValue(callback, 'callback');

            if (_.isEmpty(matrixNode.children)) {
                callback(matrixNode, nextIndex);
                nextIndex++;
            }
            else {
                let children = matrixNode.children;
                for (var i = 0, len = children.length; i < len; i++) {
                    var nextChild = children[i];
                    if (nextChild) {
                        nextIndex = visitLeafNodesRecursive(nextChild, nextIndex, callback);
                    }
                }
            }

            return nextIndex;
        }
    }
} 