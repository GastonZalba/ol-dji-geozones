import VectorLayer from 'ol/layer/Vector';
import Feature from 'ol/Feature';
import Overlay from 'ol/Overlay';
import { MultiPolygon } from 'ol/geom';
import { Control } from 'ol/control';
import { Extent } from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import Projection from 'ol/proj/Projection';
/**
 * OpenLayers DJI Geozone Layer, display DJI Geo Zones in diferent layerss on the map.
 * Also, add a Control to select the levels and the drone to filter the zones.
 *
 * Properties can either be set by adding extra properties
 * to their options when they are created or via their set method.
 *
 * See [the examples](./examples) for usage.
 *
 * @constructor
 * @param {Object} map Class Map
 * @param {String} url_proxy Proxy
 * @param {Object} opt_options opt_options DjiGeozones options, see  [DjiGeozones Options](#options) for more details.
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
    protected geozoneLevelParams: GeozoneLevelsList;
    protected geozoneTypes: GeozoneTypesList;
    protected dronesList: DroneList;
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
    protected loadingElement: HTMLElement | string;
    protected popupContent: HTMLElement;
    constructor(map: PluggableMap, url_proxy: string, opt_options?: Options);
    init(showControl: boolean, targetControl: string | HTMLElement): void;
    getPointInfoFromClick(evt: MapBrowserEvent, type: 'useApiForPopUp' | 'useFeatures'): Promise<void>;
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
/**
 * **_[interface]_** - Geozone Type allows by the API
 */
interface GeozoneType {
    id: number;
    name: string;
}
/**
 * **_[interface]_** - Parameter with the avalible Geozones types specified when creating a DjiGeozones.
 * By default, this use the sames values of the official API.
 * Also, this this can be useful to allow translations or display customs texts.
 */
interface GeozoneTypesList extends Array<GeozoneType> {
}
/**
 * **_[interface]_** - Drone
 */
interface Drone {
    id: string;
    name: string;
}
/**
 * **_[interface]_** - Parameter specified when creating a DjiGeozones.
 * By default, this use the sames values of the official API.
 * Also, this this can be useful to allow translations or display customs texts.
 */
interface DroneList extends Array<Drone> {
}
/**
 * **_[interface]_** - DjiGeozones levels parameters specified when creating a DjiGeozones
 */
interface GeozoneLevel {
    id: number;
    name: string;
    desc: string;
    color: string;
    zIndex: number;
    markerIcon: string;
    markerCircle: string;
}
/**
 * **_[interface]_** - Parameter specified when creating a DjiGeozones.
 *  Provide the colors, info, icons and more from each level.
 *  By default, this use the sames values of the official API.
 *  Also, this this can be useful to allow translations or display customs texts.
 */
interface GeozoneLevelsList extends Array<GeozoneLevel> {
}
/**
 * **_[interface]_** - DjiGeozones Options specified when creating a DjiGeozones
 *
 * Default values:
 * ```javascript
 * {
 *   drone: 'spark', // See parameter in the DJI API section
 *   zonesMode: 'total', // See parameter in the DJI API section
 *   country: 'US', // See parameter in the DJI API section
 *   levelsToDisplay: [2, 6, 1, 0, 3, 4, 7],
 *   levelsActive: [2, 6, 1, 0, 3, 4, 7],
 *   showControl: true,
 *   targetControl: null,
 *   extent: null,
 *   loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
 * }
 * ```
 */
interface Options {
    drone?: string;
    /**
     * zonesMode to be used in the API request
     */
    zonesMode?: string;
    /**
     * Country identifier to be used in the API request
     */
    country?: string;
    /**
     * Geozone Levels to be shown in the Control
     */
    levelsToDisplay?: Array<number>;
    /**
     * Geozone Levels to be activated in the Control and the API request
     */
    levelsActive?: Array<number>;
    /**
     Controller labels, names, icons and color for each level
     */
    levelParams?: Array<GeozoneLevel>;
    /**
     * Supported drone list
     */
    dronesList?: Array<Drone>;
    /**
     * Supported drone list
     */
    geozoneTypes?: Array<GeozoneType>;
    /**
     * The bounding extent for layer rendering.The layer will not be rendered outside of this extent.
     */
    extent?: Extent;
    /**
     * Display or hide the Open Layers Controller on the map
     */
    showControl?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetControl?: HTMLElement | string;
    /**
     * Loading element to show in the Controllenr and in the PopUps
     */
    loadingElement?: HTMLElement | string;
}
export { Options, Drone, GeozoneType, GeozoneLevel };
