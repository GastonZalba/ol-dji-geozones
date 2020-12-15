import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import { MultiPolygon } from 'ol/geom';
import { Control } from 'ol/control';
import { Extent } from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import Projection from 'ol/proj/Projection';
import { EventsKey } from 'ol/events';
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
    protected _drone: string;
    protected _zonesMode: string;
    protected _country: string;
    protected _paramsLevels: Array<LevelParams>;
    protected _displayLevels: Array<number>;
    protected _activeLevels: Array<number>;
    protected _i18n: i18n;
    protected _extent: Extent;
    protected _urlProxy: string;
    protected _useApiForPopUp: boolean;
    protected _isVisible: boolean;
    protected _currentZoom: number;
    protected _lastZoom: number;
    protected _moveendEvtKey: EventsKey;
    protected _clickEvtKey: EventsKey | Array<EventsKey>;
    protected _layers: Array<VectorLayer>;
    protected _dronesToDisplay: Array<Drone>;
    protected _areaDownloaded: MultiPolygon;
    protected _loadingElement: string;
    protected theme: string;
    clickEvent: 'singleclick' | 'dblclick';
    divControl: HTMLElement;
    popupContent: HTMLElement;
    map: PluggableMap;
    view: View;
    projection: Projection;
    overlay: Overlay;
    control: Control;
    constructor(map: PluggableMap, opt_options?: Options);
    init(createPanel: boolean, startCollapsed: boolean, targetControl: string | HTMLElement): void;
    /**
     *
     * @param evt
     * @param type
     * @protected
     */
    getPointInfoFromClick(evt: MapBrowserEvent, type: 'useApiForPopUp' | 'useFeaturesForPopUp'): Promise<void>;
    /**
     *
     * @param clear
     * @protected
     */
    getInfoFromView(clear?: boolean): void;
    /**
     * Controller for the API rquests.
     * @param typeApiRequest
     * @param latLng
     * @protected
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
     * @protected
     */
    getGeozoneTypeById(id?: number): i18n['types'][0];
    /**
     * Getter for the list with all the supported Drones
     * @protected
     */
    get dronesToDisplay(): Array<Drone>;
    /**
     * Setter for API parameter `drone`. Triggers an API request
     * @param drone
     */
    set drone(drone: string);
    /**
     * Getter for Api parameter drone
     */
    get drone(): string;
    /**
     * Setter for API parameter `zonesMode`. Triggers an API request
     * @param zonesMode
     */
    set zonesMode(zonesMode: string);
    /**
     * Getter for API parameter `zonesMode`
     */
    get zonesMode(): string;
    /**
     * Setter for API parameter `country`. Triggers an API request
     * @param country
     */
    set country(country: string);
    /**
     * Getter for API parameter `country`
     */
    get country(): string;
    /**
     * Get the level parameters, like color, icon, and description
     * @param id
     * @protected
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
     * @protected
     */
    static colorWithAlpha(color: string, alpha?: number): string;
}
/**
 * **_[interface]_** - Dji Api Response
 * @protected
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
 * @protected
 */
interface DjiApiResponse {
    areas: Array<DjiApiResponseArea>;
}
/**
 * **_[interface]_** - Drone
 * @protected
 */
interface Drone {
    id: string;
    label: string;
}
/**
 * **_[interface]_** - DjiGeozones levels parameters specified when creating a DjiGeozones
 * Provide the colors, icons and more from each level.
 * @protected
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
 * @protected
 */
interface LevelLang {
    id: number;
    name: string;
    desc: string;
}
/**
 * **_[interface]_** - DjiGeozones levels parameters and trasnlations specified when creating a DjiGeozones
 * @protected
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
 *   createPanel: true,
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
    displayLevels?: Array<number>;
    /**
     * Geozone Levels to be actived by default in the Control and API request
     */
    activeLevels?: Array<number>;
    /**
     * Use a custom drone list to show in the select.
     * See [drone](#drone-2) for the complete list.
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
    createPanel?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetPanel?: HTMLElement | string;
    /**
     * Whether panel is minimized when created. Defaults to false.
     */
    startCollapsed?: false;
    /**
     * Loading element to be shown in the Controller when loading API data
     */
    loadingElement?: string;
    /**
     * Type of Click event to activate the PopUp
     */
    clickEvent?: 'singleclick' | 'dblclick';
    /**
     * Color theme of the Control Panel
     */
    theme?: 'light' | 'dark';
    /**
     * Language to be used in the Controller panel and PopUp. This doesn't affects the API requests.
     * If i18n is set, this will be ignored.
     */
    language?: 'en' | 'es';
    /**
     * Add custom translations. If this is provided, language will be ignored.
     */
    i18n?: i18n;
}
export { Options, Drone, i18n };
