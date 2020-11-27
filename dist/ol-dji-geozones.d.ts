import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import { MultiPolygon } from 'ol/geom';
import { Control } from 'ol/control';
import { Extent } from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import Projection from 'ol/proj/Projection';
/**
 * OpenLayers DJI Geozone, creates multiples VectorLayers to
 * display interactives DJI Geo Zones on the map, requesting the
 * data on the fly to an DJI API.
 *
 * Also, add a Control to select levels of interest and drone to filter the results.
 *
 * @constructor
 * @param map Instance of the created map
 * @param url_proxy Proxy's url to avoid CORS protection in the API.
 * @param opt_options DjiGeozones options, see [DjiGeozones Options](#options) for more details.
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
    protected loadingElement: string;
    protected popupContent: HTMLElement;
    constructor(map: PluggableMap, url_proxy: string, opt_options?: Options);
    init(showPanel: boolean, targetControl: string | HTMLElement): void;
    /**
     *
     * @param evt
     * @param type
     * @private
     */
    getPointInfoFromClick(evt: MapBrowserEvent, type: 'useApiForPopUp' | 'useFeaturesForPopUp'): Promise<void>;
    /**
     *
     * @param clear
     * @private
     */
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
     * @param visible
     */
    setControlVisible(visible: boolean): void;
    /**
     * Get all the layers
     */
    getLayers(): Array<VectorLayer>;
    /**
     * Get the layer acordding the level
     * @param level
     */
    getLayerByLevel(level: number): VectorLayer;
    /**
     * Get the parameters from all the levels
     */
    getLevelsParams(): GeozoneTypesList;
    /**
     * Get the level parameters, like color, icon, and description
     * @param id
     */
    getLevelParamsById(id?: number): GeozoneLevel;
    /**
     * Replace the active levels with this values
     *
     * @param levels
     * @param refresh If true, refresh the view and show the levels
     */
    setLevels(levels: Array<number> | number, refresh?: boolean): void;
    /**
     * Add the level/s to the view
     * @param levels
     * @param refresh If true, refresh the view and show the actived levels
     */
    addLevels(levels: Array<number> | number, refresh?: boolean): void;
    /**
     * Remove the level/s from the view
     *
     * @param levels
     * @param refresh If true, refresh the view and show the actived levels
     */
    removeLevels(levels: Array<number> | number, refresh?: boolean): void;
    /**
     *
     */
    getGeozoneTypes(): GeozoneTypesList;
    /**
     *
     * @param id
     */
    getGeozoneTypeById(id?: number): GeozoneType;
    /**
     * Get a list with all the supported Drones
     */
    getDrones(): DroneList;
    /**
     *  **_[static]_** - Generate an RGBA color from an hexadecimal
     *
     * Adapted from https://stackoverflow.com/questions/28004153
     * @param color Hexadeciaml color
     * @param alpha Opacity
     */
    static colorWithAlpha(color: string, alpha?: number): string;
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
declare type GeozoneTypesList = Array<GeozoneType>;
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
declare type DroneList = Array<Drone>;
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
declare type GeozoneLevelsList = Array<GeozoneLevel>;
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
 *   showPanel: true,
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
     * The bounding extent for layer rendering.
     * The layers will not be rendered outside of this extent.
     */
    extent?: Extent;
    /**
     * Display or hide the panel controller on the map
     */
    showPanel?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetPanel?: HTMLElement | string;
    /**
     * Loading element to show in the Controllenr and in the PopUps
     */
    loadingElement?: string;
}
export { Options, DroneList, Drone, GeozoneTypesList, GeozoneType, GeozoneLevel, GeozoneLevelsList };
