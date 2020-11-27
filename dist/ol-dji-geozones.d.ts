/**
 * OpenLayers DJI Geozone Layer.
 * See [the examples](./examples) for usage.
 * @constructor
 * @param {Object} map Class Map
 * @param {String} url_proxy Proxy
 * @param {Object} opt_options Control options adding:
 * @param {String} opt_options.drone DJI API parameter
 * @param {String} opt_options.zonesMode DJI API parameter
 * @param {String} opt_options.country DJI API parameter
 * @param {Array} opt_options.levelsToDisplay DJI API parameter
 * @param {Array} opt_options.levelsActive DJI API parameter
 * @param {Array} opt_options.levelParams Controller labels, names, icons and color for each level
 * @param {Array} opt_options.extent The bounding extent for layer rendering. The layer will not be rendered outside of this extent.
 * @param {Boolean} opt_options.control Add Open Layers Controller to the map
 * @param {HTMLElement | string} opt_options.targetControl // Specify a target if you want the control to be rendered outside of the map's viewport.
 */
export default class DjiGeozones {
    constructor(map: any, url_proxy: any, opt_options?: {});
    drone: any;
    zones_mode: any;
    country: any;
    levelsToDisplay: any;
    levelsActive: any;
    levelParams: any;
    extent: any;
    url_proxy: any;
    useApiForPopUp: boolean;
    map: any;
    view: any;
    projection: any;
    isVisible: boolean;
    vectorLayers: any[];
    divControl: HTMLDivElement;
    areaDownloaded: MultiPolygon;
    initiated: boolean;
    init(addControl: any, targetControl: any): void;
    popupContent: HTMLDivElement;
    overlay: Overlay;
    control: Control;
    currentZoom: any;
    lastZoom: any;
    getPointInfoFromClick(evt: any, type: any): Promise<void>;
    getInfoFromView(clear?: boolean): void;
    /**
     * Controller for the API rquests.
     * @param {String} typeApiRequest
     * @param {Array} latLng
     */
    getApiGeoData(typeApiRequest: string, latLng: any[]): Promise<any>;
    /**
     * Show or hides the control
     * @param {Boolean} visible
     */
    setControlVisible(visible: boolean): void;
    clearFeatures(): void;
    getFeatureById(id: any): any;
    /**
     *
     * @param {Integer} level
     */
    getLayerByLevel(level: any): any;
    /**
     *
     * @param {Array | Integer} levels
     * @param {Boolean} refresh
     */
    setLevels(levels: any[] | any, refresh?: boolean): void;
    /**
     *
     * @param {Array | Integer} levels
     * @param {Boolean} refresh
     */
    addLevels(levels: any[] | any, refresh?: boolean): void;
    /**
     *
     * @param {Array | Integer} levels
     * @param {Boolean} refresh
     */
    removeLevels(levels: any[] | any, refresh?: boolean): void;
    getLayers(): any[];
}
import { MultiPolygon } from "ol/geom";
import Overlay from "ol/Overlay";
import { Control } from "ol/control";
