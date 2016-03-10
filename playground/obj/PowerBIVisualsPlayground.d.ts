/// <reference path="../../Typedefs/jquery/jquery.d.ts" />
/// <reference path="../../Typedefs/d3/d3.d.ts" />
/// <reference path="../../VisualsCommon/obj/VisualsCommon.d.ts" />
/// <reference path="../../VisualsData/obj/VisualsData.d.ts" />
/// <reference path="../../Visuals/obj/Visuals.d.ts" />
declare module powerbi.visuals.sampleDataViews {
    interface ISampleDataViews {
        name: string;
        displayName: string;
        visuals: string[];
    }
    class SampleDataViews implements ISampleDataViews {
        name: string;
        displayName: string;
        visuals: string[];
        getName(): string;
        getDisplayName(): string;
        hasPlugin(pluginName: string): boolean;
        getRandomValue(min: number, max: number): number;
        randomElement(arr: any[]): any;
    }
    interface ISampleDataViewsMethods extends ISampleDataViews {
        getDataViews(): DataView[];
        randomize(): void;
        getRandomValue(min: number, max: number): number;
        randomElement(arr: any[]): any;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class CarLogosData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private categoryValues;
        private carImages;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class DistrictSalesData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class FileStorageData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class ImageData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleImages;
        private sampleIndex;
        private sampleData;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class ProfitLossData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class RichtextData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleSingleData;
        private sampleTextStyle;
        getDataViews(): DataView[];
        private buildParagraphsDataView(paragraphs);
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SalesByCountryData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        private sampleSingleData;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SalesByDayOfWeekData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData1;
        private sampleMin1;
        private sampleMax1;
        private sampleData2;
        private sampleMin2;
        private sampleMax2;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class ServicesByUsers extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        private sampleSingleData;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleAreaRangeData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        private categoryValues;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    import DataView = powerbi.DataView;
    class SimpleDotPlotData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private categoryValues;
        private sampleValues;
        private sampleValueMin;
        private sampleValueMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleTimelineData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleFunnelData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleGaugeData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private sampleMin;
        private sampleMax;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleMatrixData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleTableData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class TeamScoreData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class ProductSalesByDate extends SampleDataViews implements ISampleDataViewsMethods {
        private static seriesCount;
        private static valueCount;
        name: string;
        displayName: string;
        visuals: string[];
        private sampleData;
        private dates;
        constructor();
        getDataViews(): DataView[];
        randomize(): void;
        private generateColumnMetadata(n);
        private generateDates(n);
        private randomDate(start, end);
        private generateColumns(dataViewMetadata, n);
        private generateData(n, m);
        private generateSeries(n);
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleTreeData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    import DataView = powerbi.DataView;
    class SimpleHistogramData extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private minValue;
        private maxValue;
        private minLength;
        private maxLength;
        private sampleData;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleDataByCountries extends SampleDataViews implements ISampleDataViewsMethods {
        name: string;
        displayName: string;
        visuals: string[];
        private minValue;
        private maxValue;
        private sampleData;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleDataViews {
    class SimpleCountriesData extends SampleDataViews implements ISampleDataViewsMethods {
        private quantityAngles;
        name: string;
        displayName: string;
        visuals: string[];
        countries: string[];
        private fieldExpr;
        getDataViews(): DataView[];
        randomize(): void;
    }
}
declare module powerbi.visuals.sampleData {
    import sampleDataViews = powerbi.visuals.sampleDataViews;
    class SampleData {
        private static data;
        /**
         * Returns sample data view for a visualization element specified.
         */
        static getSamplesByPluginName(pluginName: string): sampleDataViews.SimpleMatrixData[];
        /**
         * Returns sampleDataView Instance for a visualization element specified.
         */
        static getDataViewsBySampleName(sampleName: string): sampleDataViews.SimpleMatrixData;
    }
}
interface JQuery {
    resizable(options: any): JQuery;
}
declare module powerbi.visuals {
    interface IHost {
        name: string;
        resizable: boolean;
        interactive: boolean;
        container: JQuery;
        renderingScale: number;
        visual?: IVisual;
        renderingViewport?: IViewport;
    }
    class HostControls {
        private dataViewsSelect;
        /** Represents sample data views used by visualization elements.*/
        private sampleDataViews;
        private animation_duration;
        private suppressAnimations;
        private suppressAnimationsElement;
        private animationDurationElement;
        private hosts;
        private minWidth;
        private maxWidth;
        private minHeight;
        private maxHeight;
        private resetInteractiveVisual;
        constructor(parent: JQuery, resetInteractiveVisualDelegate: (IHost) => void);
        setHosts(hosts: IHost[]): void;
        private onResize(container);
        getContainerSize(host: IHost): IViewport;
        private randomize();
        private onChangeDuration();
        private onChangeSuppressAnimations();
        update(): void;
        updateHost(host: IHost): void;
        onPluginChange(pluginName: string): void;
        private onChangeDataViewSelection(sampleName);
        private findHostByContainerElement(container);
    }
}
interface JQuery {
    /** Demonstrates how Power BI visual creation could be implemented as jQuery plugin */
    visual(plugin: Object, dataView?: Object): JQuery;
}
declare enum PlaygroundViewType {
    WebView = 0,
    MobilePortraitView = 1,
    MobileLandscapeView = 2,
}
declare module powerbi.visuals {
    /**
     * Demonstrates Power BI visualization elements and the way to embed them in standalone web page.
     */
    class Playground {
        private static disabledVisuals;
        private static mobileInteractiveVisuals;
        private static webTileRenderScale;
        private static mobileDashboardTileRenderScale;
        private static mobileInFocusTileRenderScale;
        /** Represents sample data view used by visualization elements. */
        private static webPluginService;
        private static mobilePluginService;
        private static currentVisualPlugin;
        private static viewType;
        private static hostControls;
        private static hosts;
        private static webViewTab;
        private static mobileViewTab;
        private static webContainer;
        private static mobilePortraitDashboardContainer;
        private static mobilePortraitInFocusContainer;
        private static mobileLandscapeDashboardContainer;
        private static mobileLandscapeInFocusContainer;
        private static webContainers;
        private static mobilePortraitContainers;
        private static mobileLandscapeContainers;
        private static visualsSelectElement;
        private static mobileOrientationOptionsElement;
        private static mobileOrientationPortraitRadioButton;
        private static mobileOrientationLandscapeRadioButton;
        private static optionsCapabilitiesElement;
        private static interactionsEnabledCheckbox;
        private static visualStyle;
        /** Performs sample app initialization.*/
        static initialize(): void;
        private static initVisual(host);
        private static shouldCreateInteractiveVisual(host);
        private static populateVisualTypeSelect();
        private static onVisualTypeSelection(pluginName);
        private static createVisualPlugin(pluginName);
        private static getPluginService();
        private static updateVisuals();
        private static updateVisual(host);
        private static isMobileView(viewType);
        private static initializeView(viewType);
        private static updateView(viewType);
        private static getVisualElementInContainer(container);
        private static unhighlightTabs();
        private static highlightTab(tabElement);
        private static resetOrientationRadioButtons();
        private static hideAllContainers();
        private static clearAllVisuals();
        private static isInteractiveMode();
    }
}
