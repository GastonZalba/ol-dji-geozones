import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
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
    private _drone;
    private _zonesMode;
    private _country;
    private _levelsParams;
    private _levelsToDisplay;
    private _activeLevels;
    private _i18n;
    private _extent;
    private _urlProxy;
    private _useApiForPopUp;
    private _isVisible;
    private _currentZoom;
    private _lastZoom;
    private _moveendEvtKey;
    private _clickEvtKey;
    private _layers;
    private _dronesToDisplay;
    private _areaDownloaded;
    private _loadingElement;
    clickEvent: 'singleclick' | 'dblclick';
    divControl: HTMLElement;
    popupContent: HTMLElement;
    map: PluggableMap;
    view: View;
    projection: Projection;
    overlay: Overlay;
    control: Control;
    constructor(map: PluggableMap, opt_options?: Options);
    init(showPanel: boolean, startCollapsed: boolean, targetControl: string | HTMLElement): void;
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
     * @param typeApiRequest
     * @param latLng
     * @private
     */
    getApiGeoData(typeApiRequest: 'areas' | 'info', latLng: {
        lat: number;
        lng: number;
    }): Promise<DjiApiResponse>;
    /**
     * Show or hides the control panel
     * @param visible
     */
    setPanelVisible(visible: boolean): void;
    /**
     * Collapse/expand the control panel
     * @param collapsed
     */
    setPanelCollapsed(collapsed: boolean): void;
    /**
     * Get all the layers
     */
    get layers(): Array<VectorLayer>;
    /**
     * Get the layer acordding the level
     * @param level
     */
    getLayerByLevel(level: number): VectorLayer;
    /**
     * Get the geozone type (airport, heliport, etc) by id
     * @param id
     * @private
     */
    getGeozoneTypeById(id?: number): i18n["types"][0];
    /**
     * Gets a list with all the supported Drones
     * @private
     */
    get dronesToDisplay(): Array<Drone>;
    /**
     * Set the drone parameter for the api request.
     * @param drone
     */
    set drone(drone: string);
    /**
     * Get Api parameter drone parameter
     */
    get drone(): string;
    /**
     * Set the zonesMode parameter for the api request.
     * @param drone
     */
    set zonesMode(zonesMode: string);
    /**
     * Get Api parameter ZonesMode
     */
    get zonesMode(): string;
    /**
     * Set the drone parameter for the api request.
     * @param country
     */
    set country(country: string);
    /**
     * Get Api parameter Country
     */
    get country(): string;
    /**
     * Get the level parameters, like color, icon, and description
     * @param id
     * @private
     */
    getLevelParamsById(id?: number): LevelParams;
    /**
     * Get all the parameters from a level and the i18n texts
     * @param id
     */
    getLevelById(id?: number): Level;
    /**
     * Replace the active levels with this values and refresh the view
     * @param levels
     */
    set activeLevels(levels: Array<number>);
    get activeLevels(): Array<number>;
    /**
     * Add the level/s to the view
     * @param levels
     * @param refresh If true, refresh the view and show the active levels
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
     * Removes the control, layers and events from the map
     */
    destroy(): void;
    /**
     *  **_[static]_** - Generate an RGBA color from an hexadecimal
     *
     * Adapted from https://stackoverflow.com/questions/28004153
     * @param color Hexadeciaml color
     * @param alpha Opacity
     * @private
     */
    static colorWithAlpha(color: string, alpha?: number): string;
}
/**
 * **_[interface]_** - Dji Api Response
 * @private
 */
interface DjiApiResponseArea {
    name: string;
    level: number;
    type: number;
    height: number;
    description: string;
    begin_at: string;
    end_at: string;
    address: string;
    url: string;
    [key: string]: unknown;
    color: string;
}
/**
 * **_[interface]_** - Dji Api Response
 * @private
 */
interface DjiApiResponse {
    areas: Array<DjiApiResponseArea>;
}
/**
 * **_[interface]_** - Drone
 * @private
 */
interface Drone {
    id: string;
    name: string;
}
/**
 * **_[interface]_** - DjiGeozones levels parameters specified when creating a DjiGeozones
 * Provide the colors, icons and more from each level.
 * @private
 */
interface LevelParams {
    id: number;
    color: string;
    zIndex: number;
    markerIcon: string;
    markerCircle: string;
}
/**
 * **_[interface]_** - DjiGeozones levels translations specified when creating a DjiGeozones
 * @private
 */
interface LevelLang {
    id: number;
    name: string;
    desc: string;
}
/**
 * **_[interface]_** - DjiGeozones levels parameters and trasnlations specified when creating a DjiGeozones
 * @private
 */
interface Level extends LevelParams, LevelLang {
}
/**
 * **_[interface]_** - Custom Language specified when creating a DjiGeozones
 */
interface i18n {
    labels: {
        djiGeoZones: string;
        level: string;
        type: string;
        startTime: string;
        endTime: string;
        timeTips: string;
        maxAltitude: string;
        address: string;
        tips: string;
        link: string;
        learnMore: string;
        helperZoom: string;
        expand: string;
        collapse: string;
    };
    levels: LevelLang[];
    types: {
        id: number;
        name: string;
    }[];
}
/**
 * **_[interface]_** - DjiGeozones Options specified when creating a DjiGeozones instance
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
 *   targetPanel: null,
 *   extent: null,
 *   loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
 *   clickEvent: 'singleclick',
 *   language: 'en',
 *   i18n: null
 * }
 * ```
 */
interface Options {
    /**
     * Url/endpoint from a Reverse Proxy to avoid CORS restrictions
     */
    urlProxy?: string;
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
     * Geozone Levels to be shown in the control panel
     */
    levelsToDisplay?: Array<number>;
    /**
     * Geozone Levels to be actived by default in the Control and API request
     */
    levelsActive?: Array<number>;
    /**
     * Use a custom drone list to show in the select
     */
    dronesToDisplay?: Array<Drone>;
    /**
     * The bounding extent for layer rendering.
     * The layers will not be rendered outside of this extent.
     */
    extent?: Extent;
    /**
     * Display or hide the control panel on the map
     */
    showPanel?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetPanel?: HTMLElement | string;
    /**
     * Whether panel is minimized when created. Defaults to false.
     */
    startCollapsed?: false;
    /**
     * Loading element to be shown in the Controller on loading API data
     */
    loadingElement?: string;
    /**
     * Type of Click event to activate the PopUp
     */
    clickEvent?: 'singleclick' | 'dblclick';
    /**
     * Language to be used in the Controller panel and PopUp. This doesn't affects the API requests
     * If i18n is set, this will be ignored.
     */
    language?: 'en' | 'es';
    /**
     * Add custom translations. If this is provided, language will be ignored.
     */
    i18n?: i18n;
}
export { Options, Drone, i18n };
