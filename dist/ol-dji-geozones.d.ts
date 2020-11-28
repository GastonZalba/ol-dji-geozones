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
    protected language: string;
    protected labelsLang: any;
    protected levelsLang: Array<LevelLang>;
    protected typesLang: Array<TypeLang>;
    protected drone: string;
    protected zonesMode: string;
    protected country: string;
    protected levelsToDisplay: Array<number>;
    protected levelsActive: Array<number>;
    protected extent: Extent;
    protected urlProxy: string;
    protected useApiForPopUp: boolean;
    protected levelsParamsList: Array<LevelParams>;
    protected dronesToDisplay: Array<Drone>;
    protected map: PluggableMap;
    protected view: View;
    protected overlay: Overlay;
    protected currentZoom: number;
    protected lastZoom: number;
    protected control: Control;
    protected projection: Projection;
    protected isVisible: boolean;
    protected clickEvent: 'singleclick' | 'dblclick';
    private moveendEvtKey;
    private clickEvtKey;
    protected vectorLayers: Array<VectorLayer>;
    protected divControl: HTMLElement;
    protected areaDownloaded: MultiPolygon;
    protected loadingElement: string;
    protected popupContent: HTMLElement;
    constructor(map: PluggableMap, opt_options?: Options);
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
     * @param typeApiRequest
     * @param latLng
     * @private
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
     * @private
     */
    getGeozoneTypes(): Array<TypeLang>;
    /**
     *
     * @param id
     * @private
     */
    getGeozoneTypeById(id?: number): TypeLang;
    /**
     * Gets a list with all the supported Drones
     * @private
     */
    getDrones(): Array<Drone>;
    setDrone(drone: string, refresh?: boolean): void;
    /**
     * Get the parameters from all the levels
     * @private
     */
    getLevelsParams(): Array<LevelParams>;
    /**
     * Get the level parameters, like color, icon, and description
     * @param id
     * @private
     */
    getLevelParamsById(id?: number): LevelParams;
    getLevelById(id?: number): {
        id: number;
        desc: string;
        name: string;
        color: string;
        zIndex: number;
        markerIcon: string;
        markerCircle: string;
    };
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
 * **_[interface]_** - DjiGeozones levels text for translations or customs texts
 * @private
 */
interface LevelLang {
    id: number;
    desc: string;
    name: string;
}
/**
 * **_[interface]_** - Geozone Types
 * @private
 */
interface TypeLang {
    id: number;
    name: string;
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
 *   targetControl: null,
 *   extent: null,
 *   loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
 * }
 * ```
 */
interface Options {
    /**
     * Url/endpoint from a Reverse Proxy to avoid CORS restrictions
     */
    urlProxy: string;
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
     * Display or hide the panel controller on the map
     */
    showPanel?: boolean;
    /**
     * Specify a target if you want the control to be rendered outside of the map's viewport.
     */
    targetPanel?: HTMLElement | string;
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
     */
    language?: 'en' | 'es';
}
export { Options, Drone };
