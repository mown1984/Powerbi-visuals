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

module powerbi.visuals.samples {
    import ValueFormatter = powerbi.visuals.valueFormatter;
    import SelectionManager = utility.SelectionManager;
    import PixelConverter = jsCommon.PixelConverter;
    import IStringResourceProvider = jsCommon.IStringResourceProvider;

    const PercentFormat: string = "0.00 %;-0.00 %;0.00 %";
    const MillisecondsInAWeek: number = 604800000;
    const ChartLineHeight: number = 45;
    const PaddingTasks: number = 5;
    const DefaultTaskColor: string = "#01b8aa";
    const AxisTickPadding = 10;

    export interface Task extends SelectableDataPoint {
        id: number;
        name: string;
        start: Date;
        duration: number;
        completion: number;
        resource: string;
        end: Date;
        taskType: string;
        description: string;
        color: string;
        tooltipInfo: TooltipDataItem[];
    }

    export interface GanttChartFormatters {
        startDateFormatter: IValueFormatter;
        completionFormatter: IValueFormatter;
        durationFormatter: IValueFormatter;
    }

    export interface GanttChartData {
        legendData: LegendData;
        series: GanttSeries[];
        showLegend: boolean;
    }

    export interface GanttViewModel {
        taskLabelsShow: boolean;
        taskLabelsColor: string;
        taskLabelsFontSize: number;
        taskLabelsWidth: number;
        taskProgressColor: string;
        taskResourceShow: boolean;
        taskResourceColor: string;
        taskResourceFontSize: number;
    }

    export interface GanttSeries {
        typeName: string;
        color: string;
        values: any[];
        selectionId: SelectionId;
    }

    interface Line {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }

    export const GanttChartProps = {
        taskCompletion: {
            fill: <DataViewObjectPropertyIdentifier>{ objectName: 'taskCompletion', propertyName: 'fill' },
        },
        dataPoint: {
            fill: <DataViewObjectPropertyIdentifier>{ objectName: 'dataPoint', propertyName: 'fill' },
        },
        taskLabels: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'taskLabels', propertyName: 'show' },
            fill: <DataViewObjectPropertyIdentifier>{ objectName: 'taskLabels', propertyName: 'fill' },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'taskLabels', propertyName: 'fontSize' },
            width: <DataViewObjectPropertyIdentifier>{ objectName: 'taskLabels', propertyName: 'width' },
        },
        taskResource: {
            show: <DataViewObjectPropertyIdentifier>{ objectName: 'taskResource', propertyName: 'show' },
            fill: <DataViewObjectPropertyIdentifier>{ objectName: 'taskResource', propertyName: 'fill' },
            fontSize: <DataViewObjectPropertyIdentifier>{ objectName: 'taskResource', propertyName: 'fontSize' },
        }
    };

    module Selectors {

        import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
        import CreateClassAndSelector = jsCommon.CssConstants.createClassAndSelector;

        export const ClassName: ClassAndSelector = CreateClassAndSelector("gantt");
        export const Chart: ClassAndSelector = CreateClassAndSelector("chart");
        export const ChartLine: ClassAndSelector = CreateClassAndSelector("chart-line");
        export const Body: ClassAndSelector = CreateClassAndSelector("gantt-body");
        export const AxisGroup: ClassAndSelector = CreateClassAndSelector("axis");
        export const Domain: ClassAndSelector = CreateClassAndSelector("domain");
        export const AxisTick: ClassAndSelector = CreateClassAndSelector("tick");

        export const Tasks: ClassAndSelector = CreateClassAndSelector("tasks");
        export const SingleTask: ClassAndSelector = CreateClassAndSelector("task");
        export const TaskRect: ClassAndSelector = CreateClassAndSelector("task-rect");
        export const TaskProgress: ClassAndSelector = CreateClassAndSelector("task-progress");
        export const TaskResource: ClassAndSelector = CreateClassAndSelector("task-resource");
        export const SingleMilestone: ClassAndSelector = CreateClassAndSelector("milestone");

        export const TaskLabels: ClassAndSelector = CreateClassAndSelector("task-labels");
        export const TaskLines: ClassAndSelector = CreateClassAndSelector("task-lines");
        export const SingleTaskLine: ClassAndSelector = CreateClassAndSelector("task-line");
        export const Label: ClassAndSelector = CreateClassAndSelector("label");
    }

    export class Gantt implements IVisual {

        private data: GanttChartData;
        private dataView: DataView;
        private viewport: IViewport;
        private timeInterval: D3.Time.Range;

        private static DefaultValues = {
            AxisTickSize: 6,
            LabelFontSize: 14,
            LegendFontSize: 8,
            LegendLabelColor: "#000000",
            MaxTaskOpacity: 1,
            MinTaskOpacity: 0.4,
            ProgressBarHeight: 4,
            ProgressColor: "#000000",
            ResourceFontSize: 12,
            ResourceWidth: 100,
            TaskColor: "#00B099",
            TaskLabelColor: "#000000",
            TaskLabelWidth: 140,
            TaskLineWidth: 15,
            TaskResourceColor: "#000000",
        };

        public static capabilities: VisualCapabilities = {
            dataRoles: [
                {
                    name: "Series",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: "Legend",
                }, {
                    name: "Task",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: "Task"
                }, {
                    name: "StartDate",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: "Start Date"
                }, {
                    name: "Duration",
                    kind: VisualDataRoleKind.Measure,
                    displayName: "Duration",
                    requiredTypes: [{ numeric: true }, { integer: true }]
                }, {
                    name: "Completion",
                    kind: VisualDataRoleKind.Measure,
                    displayName: "% Completion",
                    requiredTypes: [{ numeric: true }, { integer: true }]
                }, {
                    name: "Resource",
                    kind: VisualDataRoleKind.Grouping,
                    displayName: "Resource"
                }
            ],
            dataViewMappings: [{
                conditions: [
                    {
                        "Series": { min: 0, max: 1 },
                        "Task": { min: 1, max: 1 },
                        "StartDate": { min: 0, max: 0 },
                        "Duration": { min: 0, max: 0 },
                        "Completion": { min: 0, max: 0 },
                        "Resource": { min: 0, max: 0 }
                    }, {
                        "Series": { min: 0, max: 1 },
                        "Task": { min: 1, max: 1 },
                        "StartDate": { min: 0, max: 1 },
                        "Duration": { min: 0, max: 0 },
                        "Completion": { min: 0, max: 0 },
                        "Resource": { min: 0, max: 0 }
                    }, {
                        "Series": { min: 0, max: 1 },
                        "Task": { min: 0, max: 1 },
                        "StartDate": { min: 0, max: 1 },
                        "Duration": { min: 0, max: 1 },
                        "Completion": { min: 0, max: 1 },
                        "Resource": { min: 0, max: 1 },
                    }
                ],
                table: {
                    rows: {
                        select:
                        [
                            { for: { in: "Series" } },
                            { for: { in: "Task" } },
                            { for: { in: "StartDate" } },
                            { for: { in: "Resource" } },
                            { for: { in: "Duration" } },
                            { for: { in: "Completion" } }
                        ]
                    }
                },
            }],
            objects: {
                taskLabels: {
                    displayName: 'Category Labels',
                    properties: {
                        show: {
                            displayName: "Show",
                            type: { bool: true }
                        },
                        fill: {
                            displayName: 'Fill',
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: 'Font Size',
                            type: { formatting: { fontSize: true } }
                        },
                        width: {
                            displayName: 'Width',
                            type: { numeric: true }
                        }
                    }
                },
                taskCompletion: {
                    displayName: 'Task Completion',
                    properties: {
                        show: {
                            type: { bool: true }
                        },
                        fill: {
                            displayName: 'Completion Color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                taskResource: {
                    displayName: 'Data Labels',
                    properties: {
                        show: {
                            displayName: "Show",
                            type: { bool: true }
                        },
                        fill: {
                            displayName: 'Color',
                            type: { fill: { solid: { color: true } } }
                        },
                        fontSize: {
                            displayName: 'Font Size',
                            type: { formatting: { fontSize: true } }
                        }
                    }
                },
            }
        };

        private margin: IMargin = {
            top: 30,
            right: 40,
            bottom: 40,
            left: 10
        };

        private style: IVisualStyle;
        private body: D3.Selection;
        private ganttSvg: D3.Selection;
        private viewModel: GanttViewModel;
        private timeScale: D3.Scale.TimeScale;
        private timeAxis: D3.Svg.Axis;
        private axisGroup: D3.Selection;

        private chartGroup: D3.Selection;
        private taskGroup: D3.Selection;
        private labelGroup: D3.Selection;
        private lineGroup: D3.Selection;

        private clearCatcher: D3.Selection;
        private ganttDiv: D3.Selection;
        private selectionManager: SelectionManager;
        private behavior: GanttChartBehavior;
        private interactivityService: IInteractivityService;
        private hostServices: IVisualHostServices;

        public static getMaxTaskOpacity(): number {
            return Gantt.DefaultValues.MaxTaskOpacity;
        }

        public static getMinTaskOpacity(): number {
            return Gantt.DefaultValues.MinTaskOpacity;
        }

        public init(options: VisualInitOptions): void {
            this.style = options.style;
            this.body = d3.select(options.element.get(0));

            this.hostServices = options.host;
            this.selectionManager = new SelectionManager({ hostServices: options.host });

            this.createViewport();
            this.updateChartSize(options.viewport);
            this.behavior = new GanttChartBehavior();
            this.interactivityService = createInteractivityService(this.hostServices);

            this.timeScale = d3.time.scale();
            this.data = {
                legendData: null,
                series: null,
                showLegend: null
            };
        }

        private createViewport(): void {

            //create div container to the whole viewport area
            this.ganttDiv = this.body.append("div")
                .classed(Selectors.Body.class, true);

            //create container to the svg area
            this.ganttSvg = this.ganttDiv
                .append("svg")
                .classed(Selectors.ClassName.class, true);
         
            //create clear catcher
            this.clearCatcher = appendClearCatcher(this.ganttSvg);

            //create axis container
            this.axisGroup = this.ganttSvg
                .append("g")
                .classed(Selectors.AxisGroup.class, true);
            
            //create task lines container
            this.lineGroup = this.ganttSvg
                .append("g")
                .classed(Selectors.TaskLines.class, true);
            
            //create chart container
            this.chartGroup = this.ganttSvg
                .append("g")
                .classed(Selectors.Chart.class, true);
            
            //create tasks container
            this.taskGroup = this.chartGroup
                .append("g")
                .classed(Selectors.Tasks.class, true);
            
            //create tasks labels container
            this.labelGroup = this.chartGroup
                .append("g")
                .classed(Selectors.TaskLabels.class, true);
        }

        private clearViewport(): void {
            this.axisGroup.selectAll(Selectors.AxisTick.selector).remove();
            this.axisGroup.selectAll(Selectors.Domain.selector).remove();
            this.lineGroup.selectAll("*").remove();
            this.chartGroup.selectAll(Selectors.ChartLine.selector).remove();
            this.chartGroup.selectAll(Selectors.SingleTask.selector).remove();
        }

        /**
         * Update div container size to the whole viewport area
         * @param viewport The vieport to change it size 
         */
        private updateChartSize(viewport: IViewport): void {
            this.ganttDiv.style({
                height: PixelConverter.toString(viewport.height),
                width: PixelConverter.toString(viewport.width)
            });
        }

        /**
        * Convert the dataView to view model
        * @param dataView The data Model
        */
        public static converter(dataView: DataView): GanttViewModel {
            let taskLabelsShow: boolean = DataViewObjects.getValue<boolean>(dataView.metadata.objects, GanttChartProps.taskLabels.show, true);
            let taskLabelsColor: string = DataViewObjects.getFillColor(dataView.metadata.objects, GanttChartProps.taskLabels.fill, Gantt.DefaultValues.TaskLabelColor);
            let taskLabelsFontSize: number = DataViewObjects.getValue<number>(dataView.metadata.objects, GanttChartProps.taskLabels.fontSize, Gantt.DefaultValues.LabelFontSize);
            let taskLabelsWidth: number = DataViewObjects.getValue<number>(dataView.metadata.objects, GanttChartProps.taskLabels.width, Gantt.DefaultValues.TaskLabelWidth);
            let taskProgressColor: string = DataViewObjects.getFillColor(dataView.metadata.objects, GanttChartProps.taskCompletion.fill, Gantt.DefaultValues.ProgressColor);
            let taskResourceShow: boolean = DataViewObjects.getValue<boolean>(dataView.metadata.objects, GanttChartProps.taskResource.show, true);
            let taskResourceColor: string = DataViewObjects.getFillColor(dataView.metadata.objects, GanttChartProps.taskResource.fill, Gantt.DefaultValues.TaskResourceColor);
            let taskResourceFontSize: number = DataViewObjects.getValue<number>(dataView.metadata.objects, GanttChartProps.taskResource.fontSize, Gantt.DefaultValues.ResourceFontSize);

            let settings: GanttViewModel = {
                taskLabelsShow: taskLabelsShow,
                taskLabelsColor: taskLabelsColor,
                taskLabelsFontSize: taskLabelsFontSize,
                taskLabelsWidth: taskLabelsWidth,
                taskProgressColor: taskProgressColor,
                taskResourceShow: taskResourceShow,
                taskResourceColor: taskResourceColor,
                taskResourceFontSize: taskResourceFontSize,
            };

            return settings;
        }

        /**
         * Returns the chart formatters
         * @param dataView The data Model
         */
        private parseSettings(dataView: DataView): GanttChartFormatters {
            if (!dataView ||
                !dataView.metadata ||
                !dataView.metadata.columns)
                return null;

            let dateFormat = "d";
            let numberFormat = "#";

            for (let dvColumn of dataView.metadata.columns) {
                let startNameInCapabilitiesName = Gantt.capabilities.dataRoles.filter((d) => d.name === "StartDate");
                if (dvColumn.queryName.indexOf(startNameInCapabilitiesName[0].displayName.toString()) > -1)
                    dateFormat = dvColumn.format;
            }

            return <GanttChartFormatters>{
                startDateFormatter: valueFormatter.create({ format: dateFormat }),
                durationFormatter: valueFormatter.create({ format: numberFormat }),
                completionFormatter: valueFormatter.create({ format: PercentFormat, value: 1, allowFormatBeautification: true })
            };
        }

        /**
        * Create task objects dataView
        * @param dataView The data Model.
        * @param formatters task attributes represented format.
        * @param series An array that holds the color data of different task groups.
        */
        private createTasks(dataView: DataView, formatters: GanttChartFormatters): Task[] {

            let columnSource = dataView.table.columns;
            let data = dataView.table.rows;
            let categories = dataView.categorical.categories[0];

            return data.map((child: DataViewTableRow, index: number) => {

                let dateString = this.getTaskProperty<string>(columnSource, child, "StartDate");
                let startDate = new Date(dateString);

                let duration = this.getTaskProperty<number>(columnSource, child, "Duration");

                let completion = this.getTaskProperty<number>(columnSource, child, "Completion");
                completion = completion <= 1 ? completion : 1;

                let taskType = this.getTaskProperty<string>(columnSource, child, "Series");

                let task: Task = {
                    id: index,
                    name: this.getTaskProperty<string>(columnSource, child, "Task"),
                    start: dateString ? startDate : new Date(Date.now()),
                    duration: duration > 0 ? duration : 1,
                    end: null,
                    completion: completion > 0 ? completion : 0,
                    resource: this.getTaskProperty<string>(columnSource, child, "Resource"),
                    taskType: taskType,
                    color: DefaultTaskColor,
                    tooltipInfo: null,
                    description: "",
                    identity: SelectionId.createWithId(categories.identity[index]),
                    selected: false
                };

                task.end = d3.time.day.offset(task.start, task.duration);
                task.tooltipInfo = this.getTooltipInfo(task, formatters);
                return task;
            });
        }

        /**
        * Get the tooltip info (data display names & formated values)
        * @param task All task attributes.
        * @param formatters Formatting options for gantt attributes.
        */
        private getTooltipInfo(task: Task, formatters: GanttChartFormatters, timeInterval: string = "Days") {
            let tooltipDataArray: TooltipDataItem[] = [];

            if (task.taskType)
                tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[0].name, value: task.taskType });

            tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[1].name, value: task.name });
            if (!isNaN(task.start.getDate()))
                tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[2].name, value: formatters.startDateFormatter.format(task.start.toLocaleDateString()) });

            tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[3].name, value: formatters.durationFormatter.format(task.duration) + " " + timeInterval });
            tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[4].name, value: formatters.completionFormatter.format(task.completion) });

            if (task.resource)
                tooltipDataArray.push({ displayName: Gantt.capabilities.dataRoles[5].name, value: task.resource });

            return tooltipDataArray;
        }

        /**
         * Get task property from the data view
         * @param columnSource
         * @param child
         * @param propertyName The property to get
         */
        private getTaskProperty<T>(columnSource: DataViewMetadataColumn[], child: DataViewTableRow, propertyName: string): T {
            if (!child ||
                !columnSource ||
                !(columnSource.length > 0) ||
                !columnSource[0].roles)
                return null;

            let index = columnSource.indexOf(columnSource.filter(x=> x.roles[propertyName])[0]);
            return index !== -1 ? <T>child[index] : null;
        }

        private isChartHasTask(dataView: DataView): boolean {
            for (let dvCategory of dataView.categorical.categories) {
                let taskInCapabilitiesName = Gantt.capabilities.dataRoles.filter((d) => d.name === "Task");
                if (dvCategory.source.queryName.indexOf(taskInCapabilitiesName[0].displayName.toString()) > -1)
                    return true;
            }
            return false;
        }

        /**
         * check if data is filtered data
         * @param dataView The new data model
         */
        public isDataViewFiltered(dataView: DataView): boolean {
            if (!dataView.table ||
                !dataView.table.rows ||
                !this.dataView ||
                !this.dataView.table ||
                !this.dataView.table.rows) {

                return false;
            }

            let currentRows = dataView.table.rows;
            let previousRows = this.dataView.table.rows;

            if (currentRows.length > previousRows.length)
                return false;

            let numOfIdenticalRows = 0;
            let rowFound: boolean;

            for (let row of previousRows) {
                rowFound = false;
                for (let prevRow of currentRows) {
                    if (_.isEqual(prevRow, row))
                        rowFound = true;
                }
                if (rowFound)
                    numOfIdenticalRows++;
            }

            if (currentRows.length === numOfIdenticalRows &&
                currentRows.length !== previousRows.length)
                return true;
            return false;
        }

        /**
        * Called on data change or resizing
        * @param options The visual option that contains the dataview and the viewport
        */
        public update(options: VisualUpdateOptions) {
            if (!options.dataViews || !options.dataViews[0])
                return;
            let dataView = options.dataViews[0];

            if (!this.isChartHasTask(dataView)) {
                this.clearViewport();
                return;
            }

            let viewport = options.viewport;
            this.viewport = viewport;

            this.updateChartSize(viewport);

            let viewModel: GanttViewModel = Gantt.converter(dataView),
                tasks: Task[] = [],
                height = viewport.height - this.margin.top - this.margin.bottom,
                updateTaskSelection: D3.UpdateSelection,
                taskSelection: D3.Selection,
                filteredDataView: DataView;

            let formatters: GanttChartFormatters = this.parseSettings(dataView);

            if (this.isDataViewFiltered(dataView))
                filteredDataView = dataView;

            if (!this.dataView || dataView.metadata.objects)
                this.dataView = dataView;

            tasks = this.createTasks(dataView, formatters);
            this.viewModel = viewModel;

            if (this.interactivityService)
                this.interactivityService.applySelectionStateToData(tasks);

            let tasksSortedByStartDate = _.sortBy(tasks, (t) => t.start);
            let tasksSortedByEndDate = _.sortBy(tasks, (t) => t.end);

            this.timeAxis = d3.svg.axis().orient("bottom");
            let t1: Date = tasksSortedByStartDate[0].start,
                t2: Date = tasksSortedByEndDate[tasks.length - 1].end;
 
            let weeks: number = Math.ceil(Math.round(t2.valueOf() - t1.valueOf()) / MillisecondsInAWeek);
            let axisLength = weeks * 50;
            this.ganttSvg
                .attr({
                    "fill-opacity": 1,
                    height: PixelConverter.toString(tasks.length * ChartLineHeight + this.margin.top),
                    width: PixelConverter.toString(this.margin.left + this.viewModel.taskLabelsWidth + axisLength + Gantt.DefaultValues.ResourceWidth)
                });
            this.timeInterval = weeks === 1 ? d3.time.scale.utc() : d3.time.weeks;

            this.setAxisAttributes(tasks, axisLength, height, this.timeInterval);
            this.updateElementsPositions(viewport, this.margin);

            this.createMilestoneLine(tasks);
            this.updateTaskLabels(tasks, viewModel.taskLabelsWidth);
            updateTaskSelection = this.updateTasks(tasks);
            this.addTaskTooltips(updateTaskSelection);
            taskSelection = this.getAllTaskSelection();

            if (this.interactivityService) {
                let behaviorOptions: GanttBehaviorOptions = {
                    clearCatcher: this.clearCatcher,
                    taskSelection: taskSelection,
                    interactivityService: this.interactivityService
                };
                this.interactivityService.bind(tasks, this.behavior, behaviorOptions);
            }
        }

        /**
        * Update task labels and add its tooltips 
        * @param tasks All tasks array
        * @param width The task label width
        */
        private updateTaskLabels(tasks: Task[], width: number): void {
            let axisLabel: D3.UpdateSelection;
            let taskLineCoordinateX: number = 15;
            let taskLabelsShow = this.viewModel ? this.viewModel.taskLabelsShow : true;
            let taskLabelsColor = this.viewModel ? this.viewModel.taskLabelsColor : Gantt.DefaultValues.TaskLabelColor;
            let taskLabelsFontSize = this.viewModel ? this.viewModel.taskLabelsFontSize : Gantt.DefaultValues.LabelFontSize;

            if (taskLabelsShow) {
                axisLabel = this.lineGroup
                    .selectAll(Selectors.Label.selector)
                    .data(tasks);

                axisLabel
                    .enter()
                    .append("text");

                axisLabel
                    .attr({
                        x: taskLineCoordinateX,
                        y: (task: Task, i: number) => this.getTaskLabelCoordinateY(task.id),
                        fill: taskLabelsColor,
                        "stroke-width": 1
                    })
                    .style("font-size", PixelConverter.fromPoint(taskLabelsFontSize))
                    .text((task) => { return task.name; })
                    .classed(Selectors.Label.class, true);

                axisLabel.call(AxisHelper.LabelLayoutStrategy.clip,
                    width - 20,
                    TextMeasurementService.svgEllipsis);

                axisLabel
                    .append("title")
                    .text((task) => { return task.name; });

                axisLabel
                    .exit()
                    .remove();
            }
            else {
                this.lineGroup
                    .selectAll(Selectors.Label.selector)
                    .remove();
            }
        }

        private getAllTaskSelection(): D3.Selection {
            return this.taskGroup
                .selectAll(Selectors.SingleTask.selector);
        }

        private updateTasks(tasks: Task[]): D3.UpdateSelection {

            let taskSelection: D3.UpdateSelection;

            //init the task selection add bind it to the data
            taskSelection = this.taskGroup
                .selectAll(Selectors.SingleTask.selector)
                .data(tasks);

            //add tasks that not exist in dom yet
            this.addTasksOnDataChanged(taskSelection);
            
            //add or remove task resource
            this.updateTaskResource(taskSelection);
         
            //update the DOM attributes of all tasks 
            this.renderTasks(taskSelection);

            return taskSelection;
        }

        private addTasksOnDataChanged(taskSelection: D3.UpdateSelection) {
            let taskEnterSelection: D3.Selection;      

            //add tasks that not exist in dom yet
            taskEnterSelection = taskSelection
                .enter()
                .append("g");

            //Add the task rect
            taskEnterSelection
                .append("rect")
                .classed(Selectors.TaskRect.class, true);
            
            //add the task progress rect
            taskEnterSelection
                .append("rect")
                .classed(Selectors.TaskProgress.class, true);
                   
            //removing task data not bound to any data
            taskSelection
                .exit()
                .remove();
        }

        private updateTaskResource(taskSelection: D3.Selection) {
            let taskResourceShow = this.viewModel ? this.viewModel.taskResourceShow : true;

            taskSelection.selectAll("text").remove();

            //add text that represents the task resource
            if (taskResourceShow) {
                taskSelection
                    .append("text")
                    .classed(Selectors.TaskResource.class, true);
            }
        }

        /**
        * Update DOM attributes of selected tasks
        * @param taskSelection The task selection to render
        */
        private renderTasks(taskSelection: D3.UpdateSelection) {
            let padding: number = 4;

            taskSelection.classed(Selectors.SingleTask.class, true);

            let taskProgressColor = this.viewModel ? this.viewModel.taskProgressColor : Gantt.DefaultValues.ProgressColor;
            let taskResourceColor = this.viewModel ? this.viewModel.taskResourceColor : Gantt.DefaultValues.TaskResourceColor;
            let taskResourceFontSize: number = this.viewModel ? this.viewModel.taskResourceFontSize : Gantt.DefaultValues.ResourceFontSize;

            taskSelection
                .select(Selectors.TaskRect.selector)
                .attr({
                    x: (task: Task, i: number) => this.timeScale(task.start),
                    y: (task: Task, i: number) => this.getBarYCoordinate(task.id),
                    width: (task: any, i: number) => this.taskDurationToWidth(task),
                    height: () => this.getBarHeight()
                })
                .style("fill", (task: Task) => task.color);

            taskSelection
                .select(Selectors.TaskProgress.selector)
                .attr({
                    x: (task: Task) => this.timeScale(task.start),
                    y: (task: Task) => (this.getBarYCoordinate(task.id) + (this.getBarHeight() / 2) - (Gantt.DefaultValues.ProgressBarHeight / 2)),
                    width: (task: Task) => this.setTaskProgress(task),
                    height: Gantt.DefaultValues.ProgressBarHeight
                })
                .style("fill", taskProgressColor);

            taskSelection
                .select(Selectors.TaskResource.selector)
                .attr({
                    "x": (task: Task) => this.timeScale(task.end) + padding,
                    "y": (task: Task) => (this.getBarYCoordinate(task.id) + (this.getBarHeight() / 2) + padding)
                })
                .text((task: Task) => task.resource)
                .style("fill", taskResourceColor)
                .style("font-size", PixelConverter.fromPoint(taskResourceFontSize));
        }

        private addTaskTooltips(selection: D3.UpdateSelection): void {
            selection.enter();
            TooltipManager.addTooltip(selection, (tooltipEvent: TooltipEvent) => (<Task>tooltipEvent.data).tooltipInfo);
            selection.exit();
        }

        public onClearSelection() {
            this.selectionManager.clear();
        }

        /**
         * Returns the matching Y coordinate for a given task index 
         * @param taskIndex Task Number
         */
        private getTaskLabelCoordinateY(taskIndex: number): number {
            let fontSize: number = +this.getTaskLabelFontSize();
            return (ChartLineHeight * taskIndex) + (20 - (40 - fontSize) / 4);
        }

        /**
         * Set the task progress bar in the gantt
         * @param task All task attributes
         */
        private setTaskProgress(task: Task): number {
            let fraction = task.completion / 1.0,
                y = this.timeScale,
                progress = (y(task.end) - y(task.start)) * fraction;

            return progress;
        }

        /**
         * Set the task progress bar in the gantt
         * @param lineNumber Line number that represents the task number
         */
        private getBarYCoordinate(lineNumber: number): number {
            return (ChartLineHeight * lineNumber) + (PaddingTasks);
        }

        private getBarHeight(): number {
            return ChartLineHeight / 2;
        }

        /**
        * convert task duration to width in the time scale
        * @param task The task to convert
        */
        private taskDurationToWidth(task: Task): number {
            return this.timeScale(task.end) - this.timeScale(task.start);
        }

        /**
        * Create vertical dotted line that represent milestone in the time axis (by default it shows not time)
        * @param tasks All tasks array
        * @param timestamp the milestone to be shown in the time axis (default Date.now())
        */
        private createMilestoneLine(tasks: Task[], timestamp: number = Date.now()): void {
            let chartLineSelection: D3.UpdateSelection,
                lines: Line[] = [{
                    x1: this.timeScale(timestamp),
                    y1: 0,
                    x2: this.timeScale(timestamp),
                    y2: this.getMilestoneLineWidth(tasks.length)
                }];

            chartLineSelection = this.chartGroup
                .selectAll(Selectors.ChartLine.selector)
                .data(lines);

            chartLineSelection
                .enter()
                .append("line");

            chartLineSelection
                .attr({
                    x1: (line: Line) => line.x1,
                    y1: (line: Line) => line.y1,
                    x2: (line: Line) => line.x2,
                    y2: (line: Line) => line.y2
                })
                .classed(Selectors.ChartLine.class, true);

            chartLineSelection
                .exit()
                .remove();
        }

        /** 
        * Returns the minimal start date
        @param tasks All tasks array
        */
        private getTaskMinDate(tasks: Task[]): Date {
            let minDate = tasks[0].start;
            for (let task of tasks) {
                if (task.start < minDate)
                    minDate = task.start;
            }
            return minDate;
        }

        /** Returns the maximal start date
        @param tasks All tasks array
        */
        private getTaskMaxDate(tasks: Task[]): Date {
            let maxDate = tasks[0].end;
            for (let task of tasks) {
                if (task.end > maxDate)
                    maxDate = task.end;
            }
            return maxDate;
        }

        /**
         * set the axis attributes 
         * @param tasks All tasks array
         * @param width Minimal axis width
         * @param height Minimal axis height
         * @param interval The time interval to show
         */
        private setAxisAttributes(tasks: Task[], width: number, height: number, interval: D3.Time.Range): void {
            let t1: Date = this.getTaskMinDate(tasks),
                t2: Date = this.getTaskMaxDate(tasks);
            this.timeScale = this.timeScale.domain([t1, t2]).range([0, width]);

            this.timeAxis = this.timeAxis
                .scale(this.timeScale)
                .tickSize(Gantt.DefaultValues.AxisTickSize)
                .ticks(interval)
                .tickPadding(AxisTickPadding)
                .tickFormat((x) => ValueFormatter.format(x, "MMM d"));
        }

        private updateElementsPositions(viewport: IViewport, margin: IMargin): void {
            let viewModel = this.viewModel;
            let axisYCoordinateMargin = 5;

            this.axisGroup
                .attr("transform", SVGUtil.translate(viewModel.taskLabelsWidth + margin.left, axisYCoordinateMargin))
                .call(this.timeAxis);

            this.chartGroup.attr("transform", SVGUtil.translate(viewModel.taskLabelsWidth + margin.left, margin.top));
            this.lineGroup.attr("transform", SVGUtil.translate(0, margin.top + Gantt.DefaultValues.TaskLineWidth / 2));
            this.labelGroup.attr("transform", SVGUtil.translate(0, margin.top));
        }
       
        /**
         * Returns the width of the now line based on num of tasks
         * @param numOfTasks Number of tasks
         */
        private getMilestoneLineWidth(numOfTasks: number): number {
            return numOfTasks * ChartLineHeight;
        }

        private getTaskLabelFontSize(): number {
            return DataViewObjects.getValue<number>(this.dataView.metadata.objects, GanttChartProps.taskLabels.fontSize, Gantt.DefaultValues.LabelFontSize);
        }
            
        /** 
        * handle "Task Completion" card
        * @param enumeration The instance to be pushed into "Task Completion" card
        * @param objects Dataview objects
        */
        private enumerateTaskCompletion(enumeration: ObjectEnumerationBuilder, objects: DataViewObjects) {
            enumeration.pushInstance({
                selector: null,
                properties: {
                    fill: DataViewObjects.getFillColor(objects, GanttChartProps.taskCompletion.fill, Gantt.DefaultValues.ProgressColor)
                },
                objectName: GanttChartProps.taskCompletion.fill.propertyName
            });
        }
        
        /** 
        * handle "Labels" card
        * @param enumeration The instance to be pushed into "Data Labels" card
        * @param objects Dataview objects
        */
        private enumerateTaskLabels(enumeration: ObjectEnumerationBuilder, objects: DataViewObjects) {
            enumeration.pushInstance({
                selector: null,
                properties: {
                    show: DataViewObjects.getValue<boolean>(objects, GanttChartProps.taskLabels.show, true),
                    fill: DataViewObjects.getFillColor(objects, GanttChartProps.taskLabels.fill, Gantt.DefaultValues.TaskLabelColor),
                    fontSize: DataViewObjects.getValue<number>(objects, GanttChartProps.taskLabels.fontSize, Gantt.DefaultValues.LabelFontSize),
                    width: DataViewObjects.getValue<number>(objects, GanttChartProps.taskLabels.width, Gantt.DefaultValues.TaskLabelWidth),
                },
                objectName: GanttChartProps.taskLabels.show.propertyName
            });
        }
      
        /** 
        * handle "Data Labels" card
        * @param enumeration The instance to be pushed into "Task Resource" card
        * @param objects Dataview objects
        */
        private enumerateDataLabels(enumeration: ObjectEnumerationBuilder, objects: DataViewObjects) {
            enumeration.pushInstance({
                selector: null,
                properties: {
                    show: DataViewObjects.getValue<boolean>(objects, GanttChartProps.taskResource.show, true),
                    fill: DataViewObjects.getFillColor(objects, GanttChartProps.taskResource.fill, Gantt.DefaultValues.TaskResourceColor),
                    fontSize: DataViewObjects.getValue<number>(objects, GanttChartProps.taskResource.fontSize, Gantt.DefaultValues.ResourceFontSize)
                },
                objectName: GanttChartProps.taskResource.show.propertyName
            });
        }        

        /** 
        * handle the property pane options
        * @param objects Dataview enumerate objects
        */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let dataView = this.dataView;
            if (!dataView)
                return;

            let enumeration = new ObjectEnumerationBuilder();

            switch (options.objectName) {
                case 'taskLabels':
                    this.enumerateTaskLabels(enumeration, dataView.metadata.objects);
                    break;
                case 'taskCompletion':
                    this.enumerateTaskCompletion(enumeration, dataView.metadata.objects);
                    break;
                case 'taskResource':
                    this.enumerateDataLabels(enumeration, dataView.metadata.objects);
                    break;
            }
            return enumeration.complete();
        }
    }

    export interface GanttBehaviorOptions {
        clearCatcher: D3.Selection;
        taskSelection: D3.Selection;
        interactivityService: IInteractivityService;
    }

    export class GanttChartBehavior implements IInteractiveBehavior {
        private options: GanttBehaviorOptions;

        public bindEvents(options: GanttBehaviorOptions, selectionHandler: ISelectionHandler) {
            this.options = options;
            let clearCatcher = options.clearCatcher;

            options.taskSelection.on('click', (d: Task) => {
                d3.event.stopPropagation();
                selectionHandler.handleSelection(d, d3.event.ctrlKey);
            });

            clearCatcher.on('click', () => {
                selectionHandler.handleClearSelection();
            });
        }

        public renderSelection(hasSelection: boolean) {
            let options = this.options;
            let ganttMaxOpacity = Gantt.getMaxTaskOpacity();
            let ganttMinOpacity = Gantt.getMinTaskOpacity();

            options.taskSelection.style("opacity", (d: Task) => {
                return hasSelection ? (d.selected ? ganttMaxOpacity : ganttMinOpacity) : ganttMaxOpacity;
            });

        }
    }

    export class GanttChartWarning implements IVisualWarning {
        public get code(): string {
            return "GanttChartWarning";
        }

        public getMessages(resourceProvider: IStringResourceProvider): IVisualErrorMessage {
            let message: string = "This visual requires task value",
                titleKey: string = "",
                detailKey: string = "",
                visualMessage: IVisualErrorMessage;

            visualMessage = {
                message: message,
                title: resourceProvider.get(titleKey),
                detail: resourceProvider.get(detailKey)
            };

            return visualMessage;
        }
    }
}