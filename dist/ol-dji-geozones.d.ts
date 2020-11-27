import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import { MultiPolygon } from 'ol/geom';
import { Control } from 'ol/control';
import { Extent } from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import Projection from 'ol/proj/Projection';
/**
 * OpenLayers DJI Geozone Layer.
 * See [the examples](./examples) for usage.
 * @constructor
 * @param {Object} map Class Map
 * @param {String} url_proxy Proxy
 * @param {Object} opt_options Control options
 */
export default class DjiGeozones {
    protected drone: string;
    protected zones_mode: string;
    protected country: string;
    protected levelsToDisplay: Array<number>;
    protected levelsActive: Array<number>;
    protected extent: Extent;
    protected url_proxy: string;
    protected useApiForPopUp: boolean;
    protected geozoneLevelParams: Array<GeozoneLevel>;
    protected geozoneTypes: Array<GeozoneType>;
    protected dronesList: Array<Drone>;
    protected map: PluggableMap;
    protected view: View;
    protected overlay: Overlay;
    protected currentZoom: number;
    protected lastZoom: number;
    protected control: Control;
    protected projection: Projection;
    protected isVisible: boolean;
    protected vectorLayers: Array<VectorLayer>;
    protected divControl: HTMLElement;
    protected areaDownloaded: MultiPolygon;
    protected initiated: boolean;
    protected loadingElement: string;
    protected popupContent: HTMLElement;
    constructor(map: PluggableMap, url_proxy: string, opt_options?: Options);
    init(showControl: boolean, targetControl: string | HTMLElement): void;
    getPointInfoFromClick(evt: MapBrowserEvent, type: string): Promise<void>;
    getInfoFromView(clear?: boolean): void;
    /**
     * Controller for the API rquests.
     */
    getApiGeoData(typeApiRequest: 'areas' | 'info', latLng: {
        lat: number;
        lng: number;
    }): Promise<any>;
    /**
     * Show or hides the control
     */
    setControlVisible(visible: boolean): void;
    clearFeatures(): void;
    getFeatureById(id: string): Feature;
    setLevels(levels: Array<number> | number, refresh?: boolean): void;
    addLevels(levels: Array<number> | number, refresh?: boolean): void;
    removeLevels(levels: Array<number> | number, refresh?: boolean): void;
    getLayers(): Array<VectorLayer>;
    getLayerByLevel(level: number): VectorLayer;
    getLevelsParams(): Array<GeozoneLevel>;
    getLevelParamsById(id?: number): GeozoneLevel;
    getGeozoneTypes(): Array<GeozoneType>;
    getGeozoneTypeById(id?: number): GeozoneType;
    getDroneById(id: string): Drone;
    getDrones(): Array<Drone>;
}
interface GeozoneType {
    id: number;
    name: string;
}
interface Drone {
    id: string;
    name: string;
}
interface GeozoneLevel {
    id: number;
    name: string;
    desc: string | undefined;
    color: string;
    zIndex: number;
    markerIcon: string;
    markerCircle: string;
}
interface Options {
    drone?: string;
    zonesMode?: string;
    country?: string;
    levelsToDisplay?: Array<number>;
    levelsActive?: Array<number>;
    /**
     Controller labels, names, icons and color for each level
     */
    levelParams?: Array<GeozoneLevel>;
    dronesList?: Array<Drone>;
    geozoneTypes?: Array<GeozoneType>;
    /**
     * The bounding extent for layer rendering.The layer will not be rendered outside of this extent.
     */
    extent?: Extent;
    /**
     * Add Open Layers Controller to the map
     */
    showControl?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetControl?: HTMLElement | string;
    loadingElement?: string;
}
export {};
