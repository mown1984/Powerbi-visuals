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
    import ClassAndSelector = jsCommon.CssConstants.ClassAndSelector;
    import createClassAndSelector = jsCommon.CssConstants.createClassAndSelector;
    import SelectionManager = utility.SelectionManager;
    import PixelConverter = jsCommon.PixelConverter;

    export enum GranularityType {
        year,
        quarter,
        month,
        day
    }

    export interface GranularityName {
        granularityType: GranularityType;
        name: string;
    }

    export interface DefaultTimelineMargins {
        LeftMargin: number;
        RightMargin: number;
        TopMargin: number;
        BottomMargin: number;
        CellWidth: number;
        CellHeight: number;
        StartXpoint: number;
        StartYpoint: number;
        ElementWidth: number;
    }

    export interface DefaultTimelineProperties {
        DefaultLabelsShow: boolean;
        TimeLineDefaultTextSize: number;
        TimeLineDefaultCellColor: string;
        TimeLineDefaultCellColorOut: string;
        TimeLineDefaultTimeRangeShow: boolean;
        DefaultTimeRangeColor: string;
        DefaultLabelColor: string;
        DefaultGranularity: GranularityType;
    }

    export interface TimelineSelectors {
        TimelineVisual: ClassAndSelector;
        SelectionRangeContainer: ClassAndSelector;
        LowerTextCell: ClassAndSelector;
        UpperTextCell: ClassAndSelector;
        UpperTextArea: ClassAndSelector;
        LowerTextArea: ClassAndSelector;
        RangeTextArea: ClassAndSelector;
        CellsArea: ClassAndSelector;
        CursorsArea: ClassAndSelector;
        MainArea: ClassAndSelector;
        SelectionCursor: ClassAndSelector;
        Cell: ClassAndSelector;
        CellRect: ClassAndSelector;
        VertLine: ClassAndSelector;
        TimelineSlicer: ClassAndSelector;
        PeriodSlicerGranularities: ClassAndSelector;
        PeriodSlicerSelection: ClassAndSelector;
        PeriodSlicerSelectionRect: ClassAndSelector;
        PeriodSlicerRect: ClassAndSelector;
    }

    const SelectedCellColorProp: DataViewObjectPropertyIdentifier = { objectName: 'cells', propertyName: 'fillSelected' };
    const UnselectedCellColorProp: DataViewObjectPropertyIdentifier = { objectName: 'cells', propertyName: 'fillUnselected' };
    const TimeRangeColorProp: DataViewObjectPropertyIdentifier = { objectName: 'rangeHeader', propertyName: 'fontColor' };
    const TimeRangeSizeProp: DataViewObjectPropertyIdentifier = { objectName: 'rangeHeader', propertyName: 'textSize' };
    const TimeRangeShowProp: DataViewObjectPropertyIdentifier = { objectName: 'rangeHeader', propertyName: 'show' };
    const LabelsColorProp: DataViewObjectPropertyIdentifier = { objectName: 'labels', propertyName: 'fontColor' };
    const LabelsSizeProp: DataViewObjectPropertyIdentifier = { objectName: 'labels', propertyName: 'textSize' };
    const LabelsShowProp: DataViewObjectPropertyIdentifier = { objectName: 'labels', propertyName: 'show' };
    const GranularityNames: GranularityName[] = [
        {
            granularityType: GranularityType.year,
            name: "year"
        }, {
            granularityType: GranularityType.quarter,
            name: "quarter"
        }, {
            granularityType: GranularityType.month,
            name: "month"
        }, {
            granularityType: GranularityType.day,
            name: "day"
        }];

    export interface Granularity {
        getType(): GranularityType;
        getEnumType(): GranularityType;
        splitDate(date: Date): any[];
        getDatePeriods(): DatePeriod[];
        prefixDisplay(date: Date): string;
        getLabel(date: Date): string;
        isFirst(date: Date): boolean;
        resetDatePeriods(): void;
    }

    export class DayGranularity implements Granularity {
        private static datePeriods: DatePeriod[] = [];
        public getType(): GranularityType {
            return GranularityType.day;
        }

        public resetDatePeriods(): void {
            DayGranularity.datePeriods = [];
        }

        public getEnumType() {
            return GranularityType.day;
        }

        splitDate(date: Date) {
            return [Utils.shortMonthName(date), date.getDate(), date.getFullYear()];
        }

        getDatePeriods() {
            return DayGranularity.datePeriods;
        }

        prefixDisplay(date: Date) {
            return Utils.shortMonthName(date) + ' ' + date.getFullYear();
        }

        getLabel(date: Date): string {
            return date.getDate().toString();
        }

        isFirst(date: Date): boolean {
            return date.getDate() === 1;
        }
    }

    export class MonthGranularity implements Granularity {
        private static datePeriods: DatePeriod[] = [];
        public getType(): GranularityType {
            return GranularityType.month;
        }

        public resetDatePeriods(): void {
            MonthGranularity.datePeriods = [];
        }

        public getEnumType() {
            return GranularityType.month;
        }

        splitDate(date: Date) {
            return [Utils.shortMonthName(date), date.getFullYear()];
        }

        getDatePeriods() {
            return MonthGranularity.datePeriods;
        }

        prefixDisplay(date: Date) {
            return date.getFullYear().toString();
        }

        getLabel(date: Date): string {
            return Utils.shortMonthName(date);
        }

        isFirst(date: Date): boolean {
            return date.getMonth() === 0;
        }
    }

    export class QuarterGranularity implements Granularity {
        private static datePeriods: DatePeriod[] = [];
        public getType(): GranularityType {
            return GranularityType.quarter;
        }

        public resetDatePeriods(): void {
            QuarterGranularity.datePeriods = [];
        }

        public getEnumType() {
            return GranularityType.quarter;
        }

        splitDate(date: Date) {
            return [Utils.quarterText(date), date.getFullYear()];
        }

        getDatePeriods() {
            return QuarterGranularity.datePeriods;
        }

        prefixDisplay(date: Date) {
            return date.getFullYear().toString();
        }

        getLabel(date: Date): string {
            return Utils.quarterText(date);
        }

        isFirst(date: Date): boolean {
            return date.getMonth() === 0;
        }
    }

    export class YearGranularity implements Granularity {
        private static datePeriods: DatePeriod[] = [];
        public getType(): GranularityType {
            return GranularityType.year;
        }

        public resetDatePeriods(): void {
            YearGranularity.datePeriods = [];
        }

        public getEnumType() {
            return GranularityType.year;
        }

        splitDate(date: Date) {
            return [date.getFullYear()];
        }

        getDatePeriods() {
            return YearGranularity.datePeriods;
        }

        prefixDisplay(date: Date) {
            return "";
        }

        getLabel(date: Date): string {
            return date.getFullYear().toString();
        }

        isFirst(date: Date): boolean {
            return false;
        }
    }

    export class TimelineGranularityData {
        private dates: Date[];
        private granularities: Granularity[];
        private endingDate: Date;

		/**
		 * Returns the date of the next day 
		 * @param date The previous date
		 */
        private static nextDay(date: Date): Date {
            let nextDay: Date = new Date(date.getTime());
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay;
        }

		/**
		* Returns an array of dates with all the days between the start date and the end date
		*/
        private setDatesRange(startDate: Date, endDate: Date): void {
            this.dates = [];
            let date: Date = startDate;
            while (date <= endDate) {
                this.dates.push(date);
                date = TimelineGranularityData.nextDay(date);
            }
        }

        constructor(startDate: Date, endDate: Date) {
            this.granularities = [];
            this.setDatesRange(startDate, endDate);
            let lastDate: Date = this.dates[this.dates.length - 1];
            this.endingDate = TimelineGranularityData.nextDay(lastDate);
        }

		/**
		* Adds the new date into the given datePeriods array
		* If the date corresponds to the last date period, given the current granularity,
		* it will be added to that date period. Otherwise, a new date period will be added to the array.
		* i.e. using Month granularity, Feb 2 2015 corresponds to Feb 3 2015.
		* It is assumed that the given date does not correspond to previous date periods, other than the last date period
		*/
        public static addDate(granularity: Granularity, date: Date): void {
            let datePeriods: DatePeriod[] = granularity.getDatePeriods();
            let newIdentifierArray: any[] = granularity.splitDate(date);
            let lastDatePeriod: DatePeriod = datePeriods[datePeriods.length - 1];
            if (datePeriods.length === 0 || !_.isEqual(lastDatePeriod.identifierArray, newIdentifierArray)) {
                if (datePeriods.length > 0)
                    lastDatePeriod.endDate = date;
                datePeriods.push({
                    identifierArray: newIdentifierArray,
                    startDate: date,
                    endDate: date,
                    isFirst: granularity.isFirst(date),
                    fraction: 1,
                    index: datePeriods.length
                });
            }
            else
                lastDatePeriod.endDate = date;
        }

		/**
		 * Adds a new granularity to the array of granularities.
		 * Resets the new granularity, adds all dates to it, and then edits the last date period with the ending date.
		 * @param granularity The new granularity to be added
		 */
        public addGranularity(granularity: Granularity): void {
            granularity.resetDatePeriods();
            this.dates.forEach(x => TimelineGranularityData.addDate(granularity, x));
            Utils.setNewEndDate(granularity, this.endingDate);
            this.granularities.push(granularity);
        }

		/**
		 * Returns a specific granularity from the array of granularities
		 * @param index The index of the requested granularity
		 */
        public getGranularity(index: number): Granularity {
            return this.granularities[index];
        }
    }

    export class Utils {
		/**
		 * Returns the date of the start of the selection
		 * @param timelineData The TimelineData which contains all the date periods
		 */
        public static getStartSelectionDate(timelineData: TimelineData): Date {
            return timelineData.currentGranularity.getDatePeriods()[timelineData.selectionStartIndex].startDate;
        }

		/**
		 * Returns the date of the end of the selection
		 * @param timelineData The TimelineData which contains all the date periods
		 */
        public static getEndSelectionDate(timelineData: TimelineData): Date {
            return timelineData.currentGranularity.getDatePeriods()[timelineData.selectionEndIndex].endDate;
        }

		/**
		 * Returns the date period of the end of the selection
		 * @param timelineData The TimelineData which contains all the date periods
		 */
        public static getEndSelectionPeriod(timelineData: TimelineData): DatePeriod {
            return timelineData.currentGranularity.getDatePeriods()[timelineData.selectionEndIndex];
        }

		/**
		 * Returns the color of a cell, depending on whether its date period is between the selected date periods
		 * @param d The TimelineDataPoint of the cell
		 * @param timelineData The TimelineData with the selected date periods
		 * @param timelineFormat The TimelineFormat with the chosen colors
		 */
        public static getCellColor(d: TimelineDatapoint, timelineData: TimelineData, cellFormat: CellFormat): string {
            let inSelectedPeriods: boolean = d.datePeriod.startDate >= Utils.getStartSelectionDate(timelineData) && d.datePeriod.endDate <= Utils.getEndSelectionDate(timelineData);
            return inSelectedPeriods ? cellFormat.colorInProperty : cellFormat.colorOutProperty;
        }

		/**
		 * Returns a value of a label, either from the metadata, or from a default value
		 * @param defaultValue The default value to be returned if label was not found it metadata
		 * @param dataView The DataView which contains the metadata
		 * @param ObjectName The name of the requested label
		 * @param valueName The name of the requested value
		 */

        public static getObjectValue<T>(defaultValue: T, dataView: DataView, ObjectName: string, valueName: string): T {
            if (dataView && dataView.metadata && dataView.metadata.objects) {
                let object = dataView.metadata.objects[ObjectName];
                if (object)
                    return <T>object[valueName];
            }
            return defaultValue;
        }

		/**
		 * Returns the granularity type of the given granularity name
		 * @param granularityName The name of the granularity
		 */
        public static getGranularityType(granularityName: string): GranularityType {
            let index: number = _.findIndex(GranularityNames, x => x.name === granularityName);
            return GranularityNames[index].granularityType;
        }
		 
		/**
		 * Returns the name of the granularity type
		 * @param granularity The type of granularity
		 */
        public static getGranularityName(granularity: GranularityType): string {
            let index: number = _.findIndex(GranularityNames, x => x.granularityType === granularity);
            return GranularityNames[index].name;
        }

		/**
		 * Splits the date periods of the current granularity, in case the stard and end of the selection is in between a date period.
		 * i.e. for a quarter granularity and a selection between Feb 6 and Dec 23, the date periods for Q1 and Q4 will be split accordingly
		 * @param timelineData The TimelineData that contains the date periods
		 * @param startDate The starting date of the selection
		 * @param endDate The ending date of the selection
		 */
        public static separateSelection(timelineData: TimelineData, startDate: Date, endDate: Date): void {
            let datePeriods: DatePeriod[] = timelineData.currentGranularity.getDatePeriods();
            let startDateIndex: number = _.findIndex(datePeriods, x => startDate < x.endDate);
            let endDateIndex: number = _.findIndex(datePeriods, x => endDate <= x.endDate);
            timelineData.selectionStartIndex = startDateIndex;
            timelineData.selectionEndIndex = endDateIndex;
            let startRatio: number = Utils.getDateRatio(datePeriods[startDateIndex], startDate, true);
            let endRatio: number = Utils.getDateRatio(datePeriods[endDateIndex], endDate, false);
            if (endRatio > 0)
                Utils.splitPeriod(datePeriods, endDateIndex, endRatio, endDate);
            if (startRatio > 0) {
                let startFration: number = datePeriods[startDateIndex].fraction - startRatio;
                Utils.splitPeriod(datePeriods, startDateIndex, startFration, startDate);
                timelineData.selectionStartIndex++;
                timelineData.selectionEndIndex++;
            }
        }

		/**
		 * Splits a given period into two periods.
		 * The new period is added after the index of the old one, while the old one is simply updated.
		 * @param datePeriods The DatePeriods that contain the date period to be split
		 * @param index The index of the date priod to be split
		 * @param newFraction The fraction value of the new date period
		 * @param newDate The date in which the date period is split
		 */
        public static splitPeriod(datePeriods: DatePeriod[], index: number, newFraction: number, newDate: Date): void {
            let oldDatePeriod: DatePeriod = datePeriods[index];
            oldDatePeriod.fraction -= newFraction;
            let newDateObject: DatePeriod = {
                identifierArray: oldDatePeriod.identifierArray,
                startDate: newDate,
                endDate: oldDatePeriod.endDate,
                isFirst: false,
                fraction: newFraction,
                index: oldDatePeriod.index + oldDatePeriod.fraction
            };
            oldDatePeriod.endDate = newDate;
            datePeriods.splice(index + 1, 0, newDateObject);
        }

		/**
		 * Returns the ratio of the given date compared to the whole date period.
		 * The ratio is calculated either from the start or the end of the date period.
		 * i.e. the ratio of Feb 7 2016 compared to the month of Feb 2016,
		 * is 0.2142 from the start of the month, or 0.7857 from the end of the month.
		 * @param datePeriod The date period that contain the specified date
		 * @param date The date
		 * @param fromStart Whether to calculater the ratio from the start of the date period.
		 */
        public static getDateRatio(datePeriod: DatePeriod, date: Date, fromStart: boolean): number {
            let dateDifference: number = fromStart ? date.getTime() - datePeriod.startDate.getTime() : datePeriod.endDate.getTime() - date.getTime();
            let periodDifference: number = datePeriod.endDate.getTime() - datePeriod.startDate.getTime();
            return periodDifference === 0 ? 0 : dateDifference / periodDifference;
        }
		     
		/**
		 * Returns the date's quarter name (e.g. Q1, Q2, Q3, Q4)
		 * @param date A date 
		 */
        public static quarterText(date: Date): string {
            return 'Q' + Math.floor(date.getMonth() / 3 + 1);
        }
		            
		/**
		* Returns the time range text, depending on the given granularity (e.g. "Feb 3 2014 - Apr 5 2015", "Q1 2014 - Q2 2015")
		*/
        public static timeRangeText(timelineData: TimelineData): string {
            let startSelectionDateArray: any[] = timelineData.currentGranularity.splitDate(Utils.getStartSelectionDate(timelineData));
            let endSelectionDateArray: any[] = timelineData.currentGranularity.splitDate(Utils.getEndSelectionPeriod(timelineData).startDate);
            return startSelectionDateArray.join(' ') + ' - ' + endSelectionDateArray.join(' ');
        }

		/**
		* Returns the short month name of the given date (e.g. Jan, Feb, Mar)
		*/
        public static shortMonthName(date: Date): string {
            return date.toString().split(' ')[1];
        }

		/**
		 * Combines the first two partial date periods, into a single date period.
		 * Returns whether a partial date period was found.
		 * i.e. combines "Feb 1 2016 - Feb 5 2016" with "Feb 5 2016 - Feb 29 2016" into "Feb 1 2016 - Feb 29 2016"
		 * @param datePeriods The list of date periods
		 */
        public static unseparateSelection(datePeriods: DatePeriod[]): boolean {
            let separationIndex: number = _.findIndex(datePeriods, x => x.fraction < 1);
            if (separationIndex >= 0) {
                datePeriods[separationIndex].endDate = datePeriods[separationIndex + 1].endDate;
                datePeriods[separationIndex].fraction += datePeriods[separationIndex + 1].fraction;
                datePeriods.splice(separationIndex + 1, 1);
                return true;
            }
            return false;
        }

        public static addDay(date: Date): Date {
            let newDate: Date = new Date(date.valueOf());
            newDate.setDate(newDate.getDate() + 1);
            return newDate;
        }

		/**
		* Returns an array of dates with all the days between the start date and the end date
		*/
        public static getDatesRange(startDate: Date, endDate: Date): Date[] {
            let dates: Date[] = [];
            for (let day: Date = startDate; day <= endDate; day = Utils.addDay(day))
                dates.push(day);
            return dates;
        }

        public static setNewEndDate(granularity: Granularity, date: Date): void {
            let datePeriods: DatePeriod[] = granularity.getDatePeriods();
            datePeriods[datePeriods.length - 1].endDate = date;
        }
    }

    export interface TimeLineProperties {
        leftMargin: number;
        rightMargin: number;
        topMargin: number;
        bottomMargin: number;
        textYPosition: number;
        startXpoint: number;
        startYpoint: number;
        elementWidth: number;
        element: any;
        cellWidth: number;
        cellHeight: number;
        cellsYPosition: number;
    }

    export interface TimelineFormat {
        cellFormat?: CellFormat;
        rangeTextFormat?: LabelFormat;
        labelFormat?: LabelFormat;
    }

    export interface LabelFormat {
        showProperty: boolean;
        sizeProperty: number;
        colorProperty: string;
    }

    export interface CellFormat {
        colorInProperty: string;
        colorOutProperty: string;
    }

    export interface TimelineData {
        dragging?: boolean;
        categorySourceName?: string;
        columnIdentity?: powerbi.data.SQExpr;
        timelineDatapoints?: TimelineDatapoint[];
        elementsCount?: number;
        selectionStartIndex?: number;
        selectionEndIndex?: number;
        cursorDataPoints?: CursorDatapoint[];
        currentGranularity?: Granularity;
    }

    export interface DatePeriod {
        identifierArray: any[];
        startDate: Date;
        endDate: Date;
        isFirst: boolean;
        fraction: number;
        index: number;
    }

    export interface CursorDatapoint {
        cursorIndex: number;
        dx: number;
    }

    export interface TimelineDatapoint {
        label: string;
        index: number;
        datePeriod: DatePeriod;
    }

    export class Timeline implements IVisual {
        private requiresNoUpdate: boolean = false;
        private timeLineProperties: TimeLineProperties;
        private timelineFormat: TimelineFormat;
        private timelineData: TimelineData;
        private timelineGranularityData: TimelineGranularityData;
        private hostServices: IVisualHostServices;
        private svg: D3.Selection;
        private timelineDiv: D3.Selection;
        private body: D3.Selection;
        private rangeText: D3.Selection;
        private mainGroupElement: D3.Selection;
        private upperLabelsElement: D3.Selection;
        private lowerLabelsElement: D3.Selection;
        private cellsElement: D3.Selection;
        private cursorGroupElement: D3.Selection;
        private selectorContainer: D3.Selection;
        private options: VisualUpdateOptions;
        private periodSlicerRect: D3.Selection;
        private selectedText: D3.Selection;
        private selector = ['Y', 'Q', 'M', 'D'];
        private currentlyMouseOverElement;
        private currentlyMouseOverElementIndex: number;
        private initialized: boolean;
        private selectionManager: SelectionManager;
        private clearCatcher: D3.Selection;
        private dataView: DataView;
        public static capabilities: VisualCapabilities = {
            dataRoles: [{
                name: 'Time',
                kind: powerbi.VisualDataRoleKind.Grouping,
                displayName: 'Time',
            }],
            dataViewMappings: [{
                conditions: [
                    { 'Time': { max: 1 } }
                ],
                categorical: {
                    categories: {
                        for: { in: 'Time' },
                        dataReductionAlgorithm: { sample: {} }
                    },
                    values: {
                        select: []
                    },
                }
            }],
            objects: {
                general: {
                    displayName: 'General',
                    properties: {
                        formatString: {
                            type: {
                                formatting: {
                                    formatString: true
                                }
                            },
                        },
                        selected: {
                            type: { bool: true }
                        },
                        filter: {
                            type: { filter: {} },
                            rule: {
                                output: {
                                    property: 'selected',
                                    selector: ['Time'],
                                }
                            }
                        },
                    },
                },
                rangeHeader: {
                    displayName: 'Range Header',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        fontColor: {
                            displayName: 'Font color',
                            type: { fill: { solid: { color: true } } }
                        },
                        textSize: {
                            displayName: 'Text Size',
                            type: { numeric: true }
                        }
                    }
                },
                cells: {
                    displayName: 'Cells',
                    properties: {
                        fillSelected: {
                            displayName: 'Selected cell color',
                            type: { fill: { solid: { color: true } } }
                        },
                        fillUnselected: {
                            displayName: 'Unselected cell color',
                            type: { fill: { solid: { color: true } } }
                        }
                    }
                },
                labels: {
                    displayName: 'Labels',
                    properties: {
                        show: {
                            displayName: 'Show',
                            type: { bool: true }
                        },
                        fontColor: {
                            displayName: 'Font color',
                            type: { fill: { solid: { color: true } } }
                        },
                        textSize: {
                            displayName: 'Text Size',
                            type: { numeric: true }
                        }
                    }
                }
            }
        };

        private timelineMargins: DefaultTimelineMargins =
        {
            LeftMargin: 15,
            RightMargin: 15,
            TopMargin: 15,
            BottomMargin: 10,
            CellWidth: 40,
            CellHeight: 25,
            StartXpoint: 10,
            StartYpoint: 20,
            ElementWidth: 30
        };

        private defaultTimelineProperties: DefaultTimelineProperties =
        {
            DefaultLabelsShow: true,
            TimeLineDefaultTextSize: 9,
            TimeLineDefaultCellColor: "#ADD8E6",
            TimeLineDefaultCellColorOut: "#A4C7F2",
            TimeLineDefaultTimeRangeShow: true,
            DefaultTimeRangeColor: "#777777",
            DefaultLabelColor: "#777777",
            DefaultGranularity: GranularityType.month
        };

        private timelineSelector: TimelineSelectors =
        {
            TimelineVisual: createClassAndSelector('Timeline'),
            SelectionRangeContainer: createClassAndSelector('selectionRangeContainer'),
            LowerTextCell: createClassAndSelector('lowerTextCell'),
            UpperTextCell: createClassAndSelector('upperTextCell'),
            UpperTextArea: createClassAndSelector('upperTextArea'),
            LowerTextArea: createClassAndSelector('lowerTextArea'),
            RangeTextArea: createClassAndSelector('rangeTextArea'),
            CellsArea: createClassAndSelector('cellsArea'),
            CursorsArea: createClassAndSelector('cursorsArea'),
            MainArea: createClassAndSelector('mainArea'),
            SelectionCursor: createClassAndSelector('selectionCursor'),
            Cell: createClassAndSelector('cell'),
            CellRect: createClassAndSelector('cellRect'),
            VertLine: createClassAndSelector('timelineVertLine'),
            TimelineSlicer: createClassAndSelector('timelineSlicer'),
            PeriodSlicerGranularities: createClassAndSelector('periodSlicerGranularities'),
            PeriodSlicerSelection: createClassAndSelector('periodSlicerSelection'),
            PeriodSlicerSelectionRect: createClassAndSelector('periodSlicerSelectionRect'),
            PeriodSlicerRect: createClassAndSelector('periodSlicerRect')
        };

		/**
		 * Changes the current granularity depending on the given granularity type
		 * Separates the new granularity's date periods which contain the start/end selection
		 * Unseparates the date periods of the previous granularity.
		 * @param granularity The new granularity type
		 */
        public changeGranularity(granularity: GranularityType, startDate: Date, endDate: Date): void {
            if (Utils.unseparateSelection(this.timelineData.currentGranularity.getDatePeriods())) // if no date period fractions were found, do not search again
                Utils.unseparateSelection(this.timelineData.currentGranularity.getDatePeriods());
            this.timelineData.currentGranularity = this.timelineGranularityData.getGranularity(granularity);
            Utils.separateSelection(this.timelineData, startDate, endDate);
        }

        public init(options: VisualInitOptions): void {
            this.hostServices = options.host;
            this.initialized = false;
            let element = options.element;
            this.selectionManager = new SelectionManager({ hostServices: options.host });

            this.timeLineProperties = {
                element: element,
                textYPosition: 40 + PixelConverter.fromPointToPixel(50),
                cellsYPosition: this.timelineMargins.TopMargin * 3 + PixelConverter.fromPointToPixel(50),
                topMargin: this.timelineMargins.TopMargin,
                bottomMargin: this.timelineMargins.BottomMargin,
                leftMargin: this.timelineMargins.LeftMargin,
                startXpoint: this.timelineMargins.StartXpoint,
                startYpoint: this.timelineMargins.StartYpoint,
                cellWidth: this.timelineMargins.CellWidth,
                cellHeight: this.timelineMargins.CellHeight,
                elementWidth: this.timelineMargins.ElementWidth,
                rightMargin: this.timelineMargins.RightMargin
            };

            this.body = d3.select(element.get(0));
            this.timelineDiv = this.body.append('div');
            this.svg = this.timelineDiv.append('svg').attr('width', PixelConverter.toString(options.viewport.width)).classed(this.timelineSelector.TimelineVisual.class, true);
            this.clearCatcher = appendClearCatcher(this.svg);
            this.clearCatcher.data([this]).on("click", (timeline: Timeline) => timeline.clear());

            this.rangeText = this.svg.append('g').classed(this.timelineSelector.RangeTextArea.class, true).append('text');
            this.mainGroupElement = this.svg.append('g').classed(this.timelineSelector.MainArea.class, true);
            this.upperLabelsElement = this.mainGroupElement.append('g').classed(this.timelineSelector.UpperTextArea.class, true);
            this.lowerLabelsElement = this.mainGroupElement.append('g').classed(this.timelineSelector.LowerTextArea.class, true);
            this.cellsElement = this.mainGroupElement.append('g').classed(this.timelineSelector.CellsArea.class, true);
            this.cursorGroupElement = this.svg.append('g').classed(this.timelineSelector.CursorsArea.class, true);
            this.drawGranular(this.timeLineProperties);
        }

        private clear(): void {
            this.selectionManager.clear();

            if (this.timelineData) {
                this.timelineData.selectionStartIndex = 0;
                this.timelineData.selectionEndIndex = this.timelineData.currentGranularity.getDatePeriods().length - 1;
                Timeline.updateCursors(this.timelineData, this.timeLineProperties.cellWidth);
                this.fillCells(this.timelineFormat.cellFormat);
                this.renderCursors(this.timelineData, this.timelineFormat, this.timeLineProperties.cellHeight, this.timeLineProperties.cellsYPosition);
                this.renderTimeRangeText(this.timelineData, this.timelineFormat.rangeTextFormat);
                this.setSelection(this.timelineData);
            }
        }

        private drawGranular(timeLineProperties: TimeLineProperties): void {
            this.selectorContainer = this.svg.append('g').classed(this.timelineSelector.TimelineSlicer.class, true);
            let dragPeriodRectState: boolean = false;
            let startXpoint = timeLineProperties.startXpoint;
            let startYpoint = timeLineProperties.startYpoint;
            let elementWidth = timeLineProperties.elementWidth;
            this.selectorContainer.on('mouseleave', d => dragPeriodRectState = false);
            let fillRect = this.selectorContainer.append('rect');
            let selectorPeriods = this.selector;
            fillRect.attr({
                height: PixelConverter.toString(1),
                x: PixelConverter.toString(startXpoint),
                y: PixelConverter.toString(startYpoint + 2),
                width: PixelConverter.toString((selectorPeriods.length - 1) * elementWidth)
            });

            let fillVertLine = this.selectorContainer.selectAll("vertLines")
                .data(selectorPeriods).enter().append('rect');
            fillVertLine
                .classed(this.timelineSelector.VertLine.class, true)
                .attr({
                    x: (d, index) => PixelConverter.toString(startXpoint + index * elementWidth),
                    y: PixelConverter.toString(startYpoint),
                    width: PixelConverter.toString(2),
                    height: PixelConverter.toString(3)
                })
                .style({ 'cursor': 'pointer' });

            let text = this.selectorContainer.selectAll(this.timelineSelector.PeriodSlicerGranularities.selector)
                .data(selectorPeriods)
                .enter()
                .append("text")
                .classed(this.timelineSelector.PeriodSlicerGranularities.class, true);
            //Add SVG Text Element Attributes
            let textLabels: any;
            textLabels = text.text((d) => d)
                .attr({
                    x: (d, index) => PixelConverter.toString(startXpoint - 3 + index * elementWidth),
                    y: PixelConverter.toString(startYpoint - 3)
                });
            this.selectedText = this.selectorContainer.append("text").classed(this.timelineSelector.PeriodSlicerSelection.class, true);
            this.selectedText.text(Utils.getGranularityName(this.defaultTimelineProperties.DefaultGranularity))
                .attr({
                    x: PixelConverter.toString(startXpoint + 35),
                    y: PixelConverter.toString(startYpoint + 17),
                });
            let selRects = this.selectorContainer.selectAll(this.timelineSelector.PeriodSlicerSelectionRect.selector)
                .data(selectorPeriods).enter().append('rect').classed(this.timelineSelector.PeriodSlicerSelectionRect.class, true);
            selRects.attr({
                x: (d, index) => PixelConverter.toString(startXpoint - elementWidth / 2 + index * elementWidth),
                y: PixelConverter.toString(3),
                width: PixelConverter.toString(elementWidth),
                height: PixelConverter.toString(23)
            })
                .style({ 'cursor': 'pointer' })
                .on('mousedown', (d, index) => {
                    this.selectPeriod(index);
                    dragPeriodRectState = true;
                })
                .on('mouseup', d => dragPeriodRectState = false)
                .on("mouseover", (d, index) => {
                    if (dragPeriodRectState) {
                        this.selectPeriod(index);
                    }
                });

            let dragPeriodRect = d3.behavior.drag()
                .on("dragstart", function (e, b) {
                    dragPeriodRectState = true;
                })
                .on("dragend", function (e, b) {
                    dragPeriodRectState = false;
                });

            this.periodSlicerRect = this.selectorContainer
                .append('rect').classed(this.timelineSelector.PeriodSlicerRect.class, true)
                .attr({
                    x: PixelConverter.toString(startXpoint - 6 + this.defaultTimelineProperties.DefaultGranularity * elementWidth),
                    y: PixelConverter.toString(startYpoint - 16),
                    rx: PixelConverter.toString(4),
                    width: PixelConverter.toString(15),
                    height: PixelConverter.toString(23)
                })
                .on('mouseup', d => dragPeriodRectState = false);
            this.periodSlicerRect.call(dragPeriodRect);
        }

        public redrawPeriod(granularity: GranularityType): void {
            let dx = this.timelineMargins.StartXpoint + granularity * this.timelineMargins.ElementWidth;
            this.periodSlicerRect.transition().attr("x", PixelConverter.toString(dx - 7));
            this.selectedText.text(Utils.getGranularityName(granularity));
            let startDate: Date = Utils.getStartSelectionDate(this.timelineData);
            let endDate: Date = Utils.getEndSelectionDate(this.timelineData);
            this.changeGranularity(granularity, startDate, endDate);
        }

        public update(options: VisualUpdateOptions): void {
            if (this.requiresNoUpdate) {
                this.requiresNoUpdate = false;
                return;
            }
            this.options = options;
            if (!options.dataViews || !options.dataViews[0]) return;
            let dataView = options.dataViews[0];
            this.dataView = dataView;

            if (!dataView.categorical
                || !dataView.metadata
                || !dataView.categorical.categories
                || dataView.categorical.categories.length !== 1
                || !dataView.categorical.categories[0].values
                || dataView.categorical.categories[0].values.length === 0
                || _.any(dataView.categorical.categories[0].values, (x) => !x.getTime)) {
                this.clearData();
                return;
            }

            let timesLine: Date[] = dataView.categorical.categories[0].values;

            let startDate = timesLine.reduce((prev, curr) => (curr < prev) ? curr : prev, timesLine[0]);
            let endDate = timesLine.reduce((prev, curr) => (curr > prev) ? curr : prev, timesLine[0]);
            let newGranularity: GranularityType = this.defaultTimelineProperties.DefaultGranularity;

            if (this.initialized) { // Check if timeline actually has been changed
                let daysPeriods = this.timelineGranularityData.getGranularity(GranularityType.day).getDatePeriods();
                let prevStartDate = daysPeriods[0].startDate;
                let prevEndDate = daysPeriods[daysPeriods.length - 1].startDate;
                let changedSelection = startDate.getTime() !== prevStartDate.getTime() || endDate.getTime() !== prevEndDate.getTime();
                newGranularity = this.timelineData.currentGranularity.getType();
                if (changedSelection)
                    this.changeGranularity(newGranularity, startDate, endDate);
                this.timelineFormat = Timeline.fillTimelineFormat(options.dataViews[0].metadata.objects, this.defaultTimelineProperties);
            }
            else {
                this.timelineGranularityData = new TimelineGranularityData(startDate, endDate);
                this.timelineData = {
                    elementsCount: 0,
                    timelineDatapoints: [],
                    cursorDataPoints: new Array<CursorDatapoint>()
                };
            }

            this.timelineFormat = Timeline.converter(this.timelineData, this.timeLineProperties, this.defaultTimelineProperties, this.timelineGranularityData, options.dataViews[0], this.initialized, newGranularity);
            this.render(this.timelineData, this.timelineFormat, this.timeLineProperties, options);
            this.initialized = true;
        }

        public selectPeriod(periodNameIndex): void {
            this.redrawPeriod(periodNameIndex);
            this.requiresNoUpdate = false;
            this.update(this.options);
        }

        private static isDataNotMatch(dataView): boolean {
            if (dataView.categorical.categories.length <= 0 ||
                dataView.categorical.categories[0] === undefined ||
                dataView.categorical.categories[0].identityFields === undefined ||
                dataView.categorical.categories[0].identityFields.length <= 0)
                return true;
            return false;
        }

        public static converter(timelineData: TimelineData, timeLineProperties: TimeLineProperties, defaultTimelineProperties: DefaultTimelineProperties, timelineGranularityData: TimelineGranularityData, dataView: DataView, initialized: boolean, granularityType: GranularityType): TimelineFormat {
            if (!initialized) {
                timelineGranularityData.addGranularity(new YearGranularity());
                timelineGranularityData.addGranularity(new QuarterGranularity());
                timelineGranularityData.addGranularity(new MonthGranularity());
                timelineGranularityData.addGranularity(new DayGranularity());
                timelineData.currentGranularity = timelineGranularityData.getGranularity(granularityType);
                timelineData.cursorDataPoints.push({ dx: 0, cursorIndex: 0 });
                timelineData.cursorDataPoints.push({ dx: 0, cursorIndex: 1 });
                timelineData.selectionStartIndex = 0;
                timelineData.selectionEndIndex = timelineData.currentGranularity.getDatePeriods().length - 1;
            }

            timelineData.categorySourceName = dataView.categorical.categories[0].source.displayName;
            timelineData.columnIdentity = <powerbi.data.SQExpr>dataView.categorical.categories[0].identityFields[0];

            if (this.isDataNotMatch(dataView))
                return;

            let timelineElements: DatePeriod[] = timelineData.currentGranularity.getDatePeriods();
            timelineData.elementsCount = timelineElements.length;
            timelineData.timelineDatapoints = [];

            for (let elment of timelineElements) {
                let currentTimePeriod = elment;
                let datapoint: TimelineDatapoint = {
                    label: timelineData.currentGranularity.getLabel(currentTimePeriod.startDate),
                    index: currentTimePeriod.index,
                    datePeriod: currentTimePeriod
                };
                timelineData.timelineDatapoints.push(datapoint);
            };

            let timelineFormat = Timeline.fillTimelineFormat(dataView.metadata.objects, defaultTimelineProperties);
            Timeline.updateCursors(timelineData, timeLineProperties.cellWidth);
            return timelineFormat;
        }

        private render(timelineData: TimelineData, timelineFormat: TimelineFormat, timeLineProperties: TimeLineProperties, options: VisualUpdateOptions): void {
            this.renderTimeRangeText(timelineData, timelineFormat.rangeTextFormat);
            let timelineDatapointsCount = timelineData.timelineDatapoints;
            let svgWidth = timeLineProperties.leftMargin + timeLineProperties.cellWidth * timelineDatapointsCount.length + timeLineProperties.rightMargin;

            if (options.viewport.width > svgWidth)
                svgWidth = options.viewport.width;

            this.timelineDiv.attr({
                height: options.viewport.height,
                width: options.viewport.width,
                'drag-resize-disabled': true
            }).style({
                'overflow-x': 'auto',
                'overflow-y': 'auto'
            });

            this.svg.attr({
                height: options.viewport.height - this.timelineMargins.TopMargin,
                width: svgWidth,
            });

            let labelSize = PixelConverter.fromPointToPixel(timelineFormat.labelFormat.sizeProperty);
            let translateString: string = SVGUtil.translate(timeLineProperties.leftMargin, timeLineProperties.topMargin);
            this.mainGroupElement.attr('transform', translateString);
            this.selectorContainer.attr('transform', translateString);
            this.cursorGroupElement.attr('transform', translateString);

            let upperTextFunc = (d: TimelineDatapoint) => timelineData.currentGranularity.prefixDisplay(d.datePeriod.startDate);
            let lowerTextFunc = (d: TimelineDatapoint) => d.label;
            let upperTextData = timelineData.timelineDatapoints.filter((d: TimelineDatapoint) => d.datePeriod.isFirst);
            let lowerTextData = timelineData.timelineDatapoints.filter((d: TimelineDatapoint) => d.index % 1 === 0);
            this.renderCellLabels(upperTextData, timelineFormat.labelFormat, timeLineProperties.textYPosition - labelSize * 1.2, this.timelineSelector.UpperTextCell, upperTextFunc, this.upperLabelsElement, this.timeLineProperties.cellWidth);
            this.renderCellLabels(lowerTextData, timelineFormat.labelFormat, timeLineProperties.textYPosition, this.timelineSelector.LowerTextCell, lowerTextFunc, this.lowerLabelsElement, this.timeLineProperties.cellWidth);
            this.renderCells(timelineData, timelineFormat, timeLineProperties, options.suppressAnimations);
            this.renderCursors(timelineData, timelineFormat, timeLineProperties.cellHeight, timeLineProperties.cellsYPosition);
        }

        private clearData(): void {
            this.mainGroupElement.selectAll(this.timelineSelector.CellRect.selector).remove();
            this.mainGroupElement.selectAll(this.timelineSelector.UpperTextCell.selector).remove();
            this.mainGroupElement.selectAll(this.timelineSelector.LowerTextCell.selector).remove();
            this.rangeText.text("");
            this.cursorGroupElement.selectAll(this.timelineSelector.SelectionCursor.selector).remove();
        }

        private static updateCursors(timelineData: TimelineData, cellWidth: number): void {
            let startDate: DatePeriod = timelineData.timelineDatapoints[timelineData.selectionStartIndex].datePeriod;
            timelineData.cursorDataPoints[0].dx = startDate.index * cellWidth;
            let endDate: DatePeriod = timelineData.timelineDatapoints[timelineData.selectionEndIndex].datePeriod;
            timelineData.cursorDataPoints[1].dx = (endDate.index + endDate.fraction) * cellWidth;
        }

        private static fillTimelineFormat(objects: any, timelineProperties: DefaultTimelineProperties): TimelineFormat {
            let timelineFormat: TimelineFormat =
                {
                    rangeTextFormat: {
                        showProperty: DataViewObjects.getValue<boolean>(objects, TimeRangeShowProp, timelineProperties.TimeLineDefaultTimeRangeShow),
                        colorProperty: DataViewObjects.getFillColor(objects, TimeRangeColorProp, timelineProperties.DefaultTimeRangeColor),
                        sizeProperty: DataViewObjects.getValue<number>(objects, TimeRangeSizeProp, timelineProperties.TimeLineDefaultTextSize)
                    },

                    cellFormat: {
                        colorInProperty: DataViewObjects.getFillColor(objects, SelectedCellColorProp, timelineProperties.TimeLineDefaultCellColor),
                        colorOutProperty: DataViewObjects.getFillColor(objects, UnselectedCellColorProp, timelineProperties.TimeLineDefaultCellColorOut)
                    },

                    labelFormat: {
                        showProperty: DataViewObjects.getValue<boolean>(objects, LabelsShowProp, timelineProperties.DefaultLabelsShow),
                        colorProperty: DataViewObjects.getFillColor(objects, LabelsColorProp, timelineProperties.DefaultLabelColor),
                        sizeProperty: DataViewObjects.getValue<number>(objects, LabelsSizeProp, timelineProperties.TimeLineDefaultTextSize)
                    }
                };
            return timelineFormat;
        }

        public fillCells(cellFormat: CellFormat): void {
            let dataPoints = this.timelineData.timelineDatapoints;
            let cellSelection = this.mainGroupElement.selectAll(this.timelineSelector.CellRect.selector).data(dataPoints);
            cellSelection.attr('fill', d => Utils.getCellColor(d, this.timelineData, cellFormat));
        }

        public cellMouseOver(datapoint, index: number): void {
            this.currentlyMouseOverElement = datapoint;
            this.currentlyMouseOverElementIndex = index;
        }

        public renderCells(timelineData: TimelineData, timelineFormat: TimelineFormat, timeLineProperties: TimeLineProperties, suppressAnimations: any): void {
            let duration = suppressAnimations ? 0 : AnimatorCommon.MinervaAnimationDuration;
            let allDataPoints = timelineData.timelineDatapoints;
            let totalX = 0;
            let cellsSelection = this.cellsElement.selectAll(this.timelineSelector.CellRect.selector).data(allDataPoints);
            cellsSelection.enter().append('rect').classed(this.timelineSelector.CellRect.class, true);
            cellsSelection.transition().duration(duration)
                .attr({
                    height: PixelConverter.toString(timeLineProperties.cellHeight),
                    width: (d: TimelineDatapoint) => PixelConverter.toString(d.datePeriod.fraction * timeLineProperties.cellWidth),
                    x: (d: TimelineDatapoint) => {
                        let value = totalX;
                        totalX += d.datePeriod.fraction * timeLineProperties.cellWidth;
                        return PixelConverter.toString(value);
                    },
                    y: PixelConverter.toString(timeLineProperties.cellsYPosition),
                    id: (d: TimelineDatapoint) => d.index
                });

            cellsSelection.on('click', (d: TimelineDatapoint, index: number) => {
                d3.event.preventDefault();
                let width = timeLineProperties.cellWidth;
                let cursorDataPoints = this.timelineData.cursorDataPoints;
                let keyEvent: any = d3.event;
                if (keyEvent.altKey || keyEvent.shiftKey) {
                    if (this.timelineData.selectionEndIndex < index) {
                        cursorDataPoints[1].dx = (d.datePeriod.index + d.datePeriod.fraction) * width;
                        timelineData.selectionEndIndex = index;
                    }
                    else {
                        cursorDataPoints[0].dx = d.datePeriod.index * width;
                        timelineData.selectionStartIndex = index;
                    }
                } else {
                    timelineData.selectionStartIndex = index;
                    timelineData.selectionEndIndex = index;
                    cursorDataPoints[0].dx = d.datePeriod.index * width;
                    cursorDataPoints[1].dx = (d.datePeriod.index + d.datePeriod.fraction) * width;
                }

                this.fillCells(timelineFormat.cellFormat);
                this.renderCursors(timelineData, timelineFormat, timeLineProperties.cellHeight, timeLineProperties.cellsYPosition);
                this.renderTimeRangeText(timelineData, timelineFormat.rangeTextFormat);
                this.setSelection(timelineData);
            });

            cellsSelection.on("mouseover", (d, index) => { this.cellMouseOver(d, index); });
            this.fillCells(timelineFormat.cellFormat);
            cellsSelection.exit().remove();
        }

        public dragstarted(d, that: Timeline): void {
            that.timelineData.dragging = true;
        }

        public dragged(d, that: Timeline): void {
            if (that.timelineData.dragging === true) {
                let xScale = 1;
                let width = that.timeLineProperties.cellWidth;
                let container = d3.select(that.timelineSelector.TimelineVisual.selector);

                if (container) {
                    let transform = container.style("transform");
                    if (transform !== undefined && transform !== 'none') {
                        let str = transform.split("(")[1];
                        xScale = Number(str.split(", ")[0]);
                    }
                }

                let exactDataPoint: TimelineDatapoint = that.currentlyMouseOverElement;

                if (d.cursorIndex === 0 && that.currentlyMouseOverElementIndex <= that.timelineData.selectionEndIndex) {
                    that.timelineData.selectionStartIndex = that.currentlyMouseOverElementIndex;
                    that.timelineData.cursorDataPoints[0].dx = exactDataPoint.datePeriod.index * width;
                }

                if (d.cursorIndex === 1 && that.currentlyMouseOverElementIndex >= that.timelineData.selectionStartIndex) {
                    that.timelineData.selectionEndIndex = that.currentlyMouseOverElementIndex;
                    that.timelineData.cursorDataPoints[1].dx = (exactDataPoint.datePeriod.index + exactDataPoint.datePeriod.fraction) * width;
                }

                that.fillCells(that.timelineFormat.cellFormat);
                that.renderCursors(that.timelineData, that.timelineFormat, that.timeLineProperties.cellHeight, that.timeLineProperties.cellsYPosition);
                that.renderTimeRangeText(that.timelineData, that.timelineFormat.rangeTextFormat);
            }
        }

        public dragended(d, that): void {
            this.setSelection(that.timelineData);
        }

        private drag = d3.behavior.drag()
            .origin(function (d) {
                return d;
            })
            .on("dragstart", (d) => { this.dragstarted(d, this); })
            .on("drag", (d) => { this.dragged(d, this); })
            .on("dragend", (d) => { this.dragended(d, this); });

        public renderCursors(timelineData: TimelineData, timelineFormat: TimelineFormat, cellHeight: number, cellsYPosition: number): D3.UpdateSelection {
            let cursorSelection = this.cursorGroupElement.selectAll(this.timelineSelector.SelectionCursor.selector).data(timelineData.cursorDataPoints);
            cursorSelection.enter().append('path').classed(this.timelineSelector.SelectionCursor.class, true)
                .attr({
                    d: d3.svg.arc()
                        .innerRadius(0)
                        .outerRadius(cellHeight / 2)
                        .startAngle(d=> d.cursorIndex * Math.PI + Math.PI) //converting from degs to radians
                        .endAngle(d=> d.cursorIndex * Math.PI + 2 * Math.PI)
                });
            cursorSelection.attr("transform", d => SVGUtil.translate(d.dx, cellHeight / 2 + cellsYPosition))
                .call(this.drag);
            cursorSelection.exit().remove();
            return cursorSelection;
        }

        public renderCellLabels(dataPoints: TimelineDatapoint[], labelFormat: LabelFormat, textYPosition: number, identifier: ClassAndSelector, textFunc: (d: TimelineDatapoint) => string, selection: D3.Selection, maxSize: number): void {
            if (labelFormat.showProperty) {
                let textCellSelection = selection.selectAll(identifier.selector).data(dataPoints);
                textCellSelection.enter().append('text').classed(identifier.class, true);
                textCellSelection.text((d: TimelineDatapoint) => {
                    let labelFormattedTextOptions: LabelFormattedTextOptions = {
                        label: textFunc(d),
                        maxWidth: maxSize,
                        fontSize: labelFormat.sizeProperty
                    };
                    return dataLabelUtils.getLabelFormattedText(labelFormattedTextOptions);
                })
                    .style('font-size', PixelConverter.fromPoint(labelFormat.sizeProperty))
                    .attr({
                        x: (d: TimelineDatapoint) => (d.datePeriod.index + 0.5) * this.timelineMargins.CellWidth,
                        y: textYPosition,
                        fill: labelFormat.colorProperty
                    })
                    .append('title').text(textFunc);
                textCellSelection.exit().remove();
            }
            else {
                selection.selectAll(identifier.selector).remove();
            }
        }

        public renderTimeRangeText(timelineData: TimelineData, timeRangeFormat: LabelFormat): void {
            if (timeRangeFormat.showProperty) {
                let timeRangeText = Utils.timeRangeText(timelineData);
                this.rangeText.classed(this.timelineSelector.SelectionRangeContainer.class, true);
                this.rangeText.attr({
                    x: 150,
                    y: 40,
                    fill: timeRangeFormat.colorProperty
                })
                    .style({
                        'font-size': PixelConverter.fromPoint(timeRangeFormat.sizeProperty)
                    }).text(timeRangeText)
                    .append('title').text(timeRangeText);;
            }
            else
                this.rangeText.text("");
        }

        public setSelection(timelineData: TimelineData): void {
            this.requiresNoUpdate = true;
            let lower: data.SQConstantExpr = powerbi.data.SQExprBuilder.dateTime(Utils.getStartSelectionDate(timelineData));
            let upper: data.SQConstantExpr = powerbi.data.SQExprBuilder.dateTime(new Date(Utils.getEndSelectionDate(timelineData).getTime() - 1));
            let filterExpr = powerbi.data.SQExprBuilder.between(timelineData.columnIdentity, lower, upper);
            let filter = powerbi.data.SemanticFilter.fromSQExpr(filterExpr);
            let objects: VisualObjectInstancesToPersist = {
                merge: [
                    <VisualObjectInstance>{
                        objectName: "general",
                        selector: undefined,
                        properties: {
                            "filter": filter,
                        }
                    }
                ]
            };
            this.hostServices.persistProperties(objects);
            this.hostServices.onSelect({ data: [] });
        }

        // This function retruns the values to be displayed in the property pane for each object.
        // Usually it is a bind pass of what the property pane gave you, but sometimes you may want to do
        // validation and return other values/defaults 
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            let enumeration = new ObjectEnumerationBuilder();
            switch (options.objectName) {
                case 'rangeHeader':
                    this.enumerateRangeHeader(enumeration, this.dataView);
                    break;
                case 'cells':
                    this.enumerateCells(enumeration, this.dataView);
                    break;
                case 'labels':
                    this.enumerateLabels(enumeration, this.dataView);
                    break;
            }
            return enumeration.complete();
        }

        public enumerateRangeHeader(enumeration: ObjectEnumerationBuilder, dataview: DataView): void {
            let objects = dataview && dataview.metadata ? dataview.metadata.objects : undefined;
            enumeration.pushInstance({
                objectName: 'rangeHeader',
                displayName: 'Selection Color',
                selector: null,
                properties: {
                    show: DataViewObjects.getValue<boolean>(objects, TimeRangeShowProp, this.defaultTimelineProperties.TimeLineDefaultTimeRangeShow),
                    fontColor: DataViewObjects.getFillColor(objects, TimeRangeColorProp, this.defaultTimelineProperties.DefaultTimeRangeColor),
                    textSize: DataViewObjects.getValue<number>(objects, TimeRangeSizeProp, this.defaultTimelineProperties.TimeLineDefaultTextSize)
                }
            });
        }

        public enumerateCells(enumeration: ObjectEnumerationBuilder, dataview: DataView): void {
            let objects = dataview && dataview.metadata ? dataview.metadata.objects : undefined;
            enumeration.pushInstance({
                objectName: 'cells',
                selector: null,
                properties: {
                    fillSelected: DataViewObjects.getFillColor(objects, SelectedCellColorProp, this.defaultTimelineProperties.TimeLineDefaultCellColor),
                    fillUnselected: DataViewObjects.getFillColor(objects, UnselectedCellColorProp, this.defaultTimelineProperties.TimeLineDefaultCellColorOut)
                }
            });
        }

        public enumerateLabels(enumeration: ObjectEnumerationBuilder, dataview: DataView): void {
            let objects = dataview && dataview.metadata ? dataview.metadata.objects : undefined;
            enumeration.pushInstance({
                objectName: 'labels',
                selector: null,
                properties: {
                    show: DataViewObjects.getValue<boolean>(objects, LabelsShowProp, this.defaultTimelineProperties.DefaultLabelsShow),
                    fontColor: DataViewObjects.getFillColor(objects, LabelsColorProp, this.defaultTimelineProperties.DefaultLabelColor),
                    textSize: DataViewObjects.getValue<number>(objects, LabelsSizeProp, this.defaultTimelineProperties.TimeLineDefaultTextSize)
                }
            });
        }
    }
}