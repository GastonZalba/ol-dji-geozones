import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import MultiPolygon from 'ol/geom/MultiPolygon.js';
import Geometry from 'ol/geom/Geometry.js';
import BaseEvent from 'ol/events/Event.js';
import Control from 'ol/control/Control.js';
import { Extent } from 'ol/extent.js';
import MapBrowserEvent from 'ol/MapBrowserEvent.js';
import Map from 'ol/Map.js';
import { EventsKey } from 'ol/events.js';
import { CombinedOnSignature, EventTypes, OnSignature } from 'ol/Observable.js';
import { ObjectEvent } from 'ol/Object.js';
import { Types as ObjectEventTypes } from 'ol/ObjectEventType.js';
import './assets/scss/ol-dji-geozones.scss';
/**
 * OpenLayers Dji Geozones, creates multiples VectorLayers to
 * display interactives DJI Geo Zones on the map, requesting the
 * data on the fly to an DJI API.
 *
 * Also, add a Control to select levels of interest and drone to filter the results.
 * @fires init
 * @fires error
 * @constructor
 * @extends {ol/control/Control~Control}
 * @param opt_options DjiGeozones options, see [DjiGeozones Options](#options) for more details.
 */
export default class DjiGeozones extends Control {
    protected _options: Options;
    protected _i18n: i18n;
    protected _paramsLevels: Array<LevelParams>;
    protected _useApiForPopUp: boolean;
    protected _isVisible: boolean;
    protected _hideGeozones: boolean;
    protected _currentZoom: number;
    protected _lastZoom: number;
    protected _initialized: boolean;
    protected _listeners: boolean;
    protected _moveendEvtKey: EventsKey | Array<EventsKey>;
    protected _clickEvtKey: EventsKey | Array<EventsKey>;
    protected _layers: Array<VectorLayer<VectorSource<Geometry>>>;
    protected _areaDownloaded: MultiPolygon;
    protected _featuresIdList: Set<string>;
    divControl: HTMLElement;
    popupContent: HTMLElement;
    private _map;
    private _view;
    private _projection;
    private _overlay;
    on: OnSignature<'change', BaseEvent, EventsKey> & OnSignature<'error', ErrorEvent, EventsKey> & OnSignature<ObjectEventTypes, ObjectEvent, EventsKey> & CombinedOnSignature<ObjectEventTypes | EventTypes, EventsKey>;
    once: OnSignature<'change', BaseEvent, EventsKey> & OnSignature<'error', ErrorEvent, EventsKey> & OnSignature<ObjectEventTypes, ObjectEvent, EventsKey> & CombinedOnSignature<ObjectEventTypes | EventTypes, EventsKey>;
    un: OnSignature<'change', BaseEvent, void> & OnSignature<'error', ErrorEvent, EventsKey> & OnSignature<ObjectEventTypes, ObjectEvent, void> & CombinedOnSignature<ObjectEventTypes | EventTypes, void>;
    constructor(opt_options?: Options);
    /**
     * Remove the control from its current map and attach it to the new map.
     * Pass null to just remove the control from the current map.
     * @param map
     * @public
     */
    setMap(map: Map): void;
    /**
     * Initialize the layers and events.
     * This function is called once only if the control is activated.
     *
     * @fires init
     * @private
     */
    _initialize(): void;
    /**
     * Create a control panel in the map
     *
     * @param createPanel
     * @param startCollapsed
     * @private
     */
    _createPanel(createPanel: boolean | string, startCollapsed: boolean): void;
    /**
     * @private
     */
    _setLayersVisible(bool: boolean): void;
    /**
     * Enable or disable the inputs and the select in the control
     * @private
     */
    _setControlEnabled(enabled: boolean): void;
    /**
     *
     * @param evt
     * @param type
     * @protected
     */
    _getPointInfoFromClick(evt: MapBrowserEvent<UIEvent>, type: 'useApiForPopUp' | 'useFeaturesForPopUp'): Promise<void>;
    /**
     *
     * @param clear
     * @protected
     */
    _getInfoFromView(clear?: boolean): void;
    _onError: (err: ErrorEvent) => void;
    /**
     * Controller for the API rquests.
     * @param typeApiRequest
     * @param latLng
     * @protected
     */
    _getApiGeoData(typeApiRequest: 'areas' | 'info', latLng: {
        lat: number;
        lng: number;
    }): Promise<DjiApiResponse>;
    /**
     * Show/hide the loading in the control
     * @param {Boolean} bool
     * @protected
     */
    _showLoading(bool: boolean): void;
    /**
     * Show or hides the control panel
     * @param visible
     * @public
     */
    setPanelVisible(visible: boolean): void;
    /**
     * Collapse/expand the control panel
     * @param collapsed
     * @public
     */
    setPanelCollapsed(collapsed: boolean): void;
    /**
     * Get all the layers
     * @public
     */
    get layers(): Array<VectorLayer<VectorSource<Geometry>>>;
    /**
     * Get the layer acordding the level
     * @param level
     * @public
     */
    getLayerByLevel(level: number): VectorLayer<VectorSource<Geometry>>;
    /**
     * Get the geozone type (airport, heliport, etc) by id
     * @param id
     * @protected
     */
    _getGeozoneTypeById(id?: number): i18n['types'][0];
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
     * @public
     */
    get drone(): string;
    /**
     * Setter for API parameter `zonesMode`. Triggers an API request
     * @param zonesMode
     * @public
     */
    set zonesMode(zonesMode: string);
    /**
     * Getter for API parameter `zonesMode`
     * @public
     */
    get zonesMode(): string;
    /**
     * Setter for API parameter `country`. Triggers an API request
     * @param country
     * @public
     */
    set country(country: string);
    /**
     * Getter for API parameter `country`
     * @public
     */
    get country(): string;
    /**
     * Get the level parameters, like color, icon, and description
     * @param id
     * @protected
     */
    _getLevelParamsById(id?: number): LevelParams;
    /**
     * Get all the parameters from a level and the i18n texts
     * @param id
     * @public
     */
    getLevelById(id?: number): Level;
    /**
     * Replace the active levels with this values and refresh the view
     * @param levels
     * @public
     */
    set activeLevels(levels: Array<number>);
    get activeLevels(): Array<number>;
    /**
     * Add the level/s to the view
     * @param levels
     * @param refresh If true, refresh the view and show the active levels
     * @public
     */
    addLevels(levels: Array<number> | number, refresh?: boolean): void;
    /**
     * Remove the level/s from the view
     *
     * @param levels
     * @param refresh If true, refresh the view and show the actived levels
     * @public
     */
    removeLevels(levels: Array<number> | number, refresh?: boolean): void;
    /**
     * Removes the control, layers, overlays and events from the map
     * @public
     */
    destroy(): void;
    /**
     * Hide the geoZones and the Control
     * @public
     */
    hide(): void;
    /**
     * Show the geoZones and the Control
     * @public
     */
    show(): void;
    /**
     * @protected
     */
    _removeListeners(): void;
    /**
     * @protected
     */
    _addListeners(): void;
    /**
     * Function to display messages to the user
     *
     * @param msg
     * @private
     */
    _alert(msg: string): void;
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
 * Custom Event to pass error in the dispatchEvent
 */
declare class ErrorEvent extends BaseEvent {
    message: Error['message'];
    stack: Error['stack'];
    constructor(error: Error);
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
export interface Drone {
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
export interface i18n {
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
        hideGeozones: string;
        showHide: string;
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
 *   urlProxy: '',
 *   buffer: 10000, // meters
 *   drone: 'spark', // See parameter in the DJI API section
 *   zonesMode: 'total', // See parameter in the DJI API section
 *   country: 'US', // See parameter in the DJI API section
 *   showGeozoneIcons: true, // Display geozones icons
 *   displayLevels: [2, 6, 1, 0, 3, 4, 7],
 *   activeLevels: [2, 6, 1, 0, 3, 4, 7],
 *   createPanel: 'full',
 *   targetPanel: null,
 *   startCollapsed: true,
 *   startActive: true,
 *   dronesToDisplay: null,
 *   extent: null,
 *   loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
 *   clickEvent: 'singleclick',
 *   theme: 'light',
 *   language: 'en',
 *   i18n: {...} // Translations according to selected language
 *   alert: alert // Default browser alert function
 * }
 * ```
 */
export interface Options {
    /**
     * Url/endpoint from a Reverse Proxy to avoid CORS restrictions
     */
    urlProxy?: string;
    /**
     * Current map radius is increased by the provided value (in meters) and used to request the areas.
     * Very useful for the highest zoom levels, to allow geozones near by being displayed.
     * A value of 0 will only search geozones (the centroid of these) that are inside the current view extent.
     */
    buffer?: number;
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
     * Display geozones icons
     */
    showGeozoneIcons?: boolean;
    /**
     * Geozone Levels to be shown in the control panel
     */
    displayLevels?: Array<number>;
    /**
     * Geozone Levels to be actived by default in the Control and API request
     */
    activeLevels?: Array<number>;
    /**
     * Use a custom drone list to show in the select. If not provided, we use all the available drones
     * See [drone](#drone-2) for the complete list.
     */
    dronesToDisplay?: Array<Drone>;
    /**
     * The bounding extent for layer rendering.
     * The layers will not be rendered outside of this extent.
     */
    extent?: Extent;
    /**
     * Create or not a control panel on the map
     * - 'full' displays each level as a layer, with the possibility to activate or deactivate each one,
     * color legends and a drone switcher.
     * - 'compact' it's a simple toggler button to enable/disable the geoZones.
     * - use false to disable the panel
     */
    createPanel?: boolean | 'full' | 'compact';
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    target?: HTMLElement | string;
    /**
     * Whether panel is minimized when created.
     */
    startCollapsed?: boolean;
    /**
     * Show GeoZones on initialize
     */
    startActive?: boolean;
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
     * Add custom translations
     */
    i18n?: i18n;
    /**
     * Custom alert function to display messages
     */
    alert?(msg: string): void;
}
export {};
//# sourceMappingURL=ol-dji-geozones.d.ts.map