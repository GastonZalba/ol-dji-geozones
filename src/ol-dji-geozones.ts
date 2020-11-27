import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature, { FeatureLike } from 'ol/Feature';
import Overlay from 'ol/Overlay';
import { transform, transformExtent } from 'ol/proj';
import { getDistance } from 'ol/sphere';
import { Polygon, MultiPolygon, Point, Circle } from 'ol/geom';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { Control } from 'ol/control';
import { asArray, asString } from 'ol/color';
import { fromExtent } from 'ol/geom/Polygon';
import { getTopRight, getTopLeft, getBottomRight, getCenter, getBottomLeft, Extent } from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Projection from 'ol/proj/Projection';

import geozoneLevels from './_geozone-levels.json';
import geozoneTypes from './_geozone-types.json';
import dronesList from './_drones-list.json';


/**
 * @protected
 */
const API_AREAS_ENDPOINT = 'www-api.dji.com/api/geo/areas';
const API_INFO_ENDPOINT = 'www-api.dji.com/api/geo/point-info';
const API_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] // request all the levels, we filter later to avoid some api problems
const MIN_ZOOM = 9; // < 9 breaks the API

/**
 * OpenLayers DJI Geozone Layer.
 * See [the examples](./examples) for usage.
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

    protected geozoneLevelParams: Array<GeozoneLevel>;
    protected geozoneTypes: Array<GeozoneType>;
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
    protected initiated: boolean;

    protected loadingElement: string;

    protected popupContent: HTMLElement;

    constructor(map: PluggableMap, url_proxy: string, opt_options?: Options) {

        const options = { ...opt_options };

        // API PARAMETERS
        this.drone = options.drone || 'spark';
        this.zones_mode = options.zonesMode || 'total';
        this.country = options.country || 'US';
        this.levelsToDisplay = options.levelsToDisplay || [2, 6, 1, 0, 3, 4, 7];
        this.levelsActive = options.levelsActive || [2, 6, 1, 0, 3, 4, 7];

        // Get the colors, info, icons and more from each level
        this.geozoneLevelParams = (!options.levelParams) ? geozoneLevels : { ...geozoneLevels, ...options.levelParams };
        this.dronesList = options.dronesList || dronesList;
        this.geozoneTypes = options.geozoneTypes || geozoneTypes;

        this.extent = options.extent || null;

        this.url_proxy = url_proxy;

        this.loadingElement = options.loadingElement || '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

        // By default, we use the properties features to show in the popup. 
        // The official DJI map, makes an extra request to another API to get the data. I don't understand why.
        // It's more slow and requieres extra requests to an already downloaded data...
        // Either way, this extra API calls are supported if you want.
        this.useApiForPopUp = false;

        // MAP 
        const showControl = ('showControl' in options) ? options.showControl : true;
        const targetControl = options.targetControl || null;

        this.map = map;
        this.view = map.getView();
        this.projection = this.view.getProjection();
        this.isVisible = (this.view.getZoom() < MIN_ZOOM);

        this.vectorLayers = [];
        this.divControl = null;
        this.areaDownloaded = null;
        this.initiated = false;

        this.init(showControl, targetControl);

    }

    init(showControl: boolean, targetControl: string | HTMLElement): void {

        const createVectorLayers = () => {

            const styleFunction = (feature: Feature) => {

                const geomType = feature.getGeometry().getType();
                const level = feature.get('level');
                const levelParams = this.getLevelParamsById(level);
                let style: Style;

                if (geomType === 'Polygon' || geomType === 'Circle') {

                    const color = feature.get('color');

                    style = new Style({
                        fill: new Fill({
                            color: colorWithAlpha(color, 0.3)
                        }),
                        stroke: new Stroke({
                            color: color,
                            width: 1
                        }),
                        zIndex: levelParams.zIndex
                    })

                } else if (geomType === 'Point') {
                    style = new Style({
                        image: new Icon({
                            src: levelParams.markerIcon,
                            scale: 0.35,
                            anchor: [0.5, 0.9]
                        }),
                        zIndex: levelParams.zIndex * 2
                    })
                }

                return style;

            }

            API_LEVELS.forEach(level => {

                const layer = new VectorLayer({
                    zIndex: this.getLevelParamsById(level).zIndex * 2,
                    visible: this.levelsActive.includes(level) ? true : false,
                    source: new VectorSource({
                        attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
                    }),
                    style: styleFunction,
                    extent: this.extent
                });

                layer.set('name', 'ol-dji-geozones');
                layer.set('level', level);

                this.map.addLayer(layer);
                this.vectorLayers.push(layer);

            })

        }

        const createPopUpOverlay = () => {

            const popupContainer = document.createElement('div');
            popupContainer.id = 'ol-dji-geozones--popup';
            popupContainer.className = 'ol-popup ol-dji-geozones--ol-popup';

            this.popupContent = document.createElement('div');
            this.popupContent.id = 'ol-dji-geozones--popup-content';
            this.popupContent.className = 'ol-dji-geozones--ol-popup-content'

            const popupCloser = document.createElement('a');
            popupCloser.id = 'ol-dji-geozones--popup-closer';
            popupCloser.className = 'ol-dji-geozones--ol-popup-closer';
            popupCloser.href = '#';
            popupCloser.onclick = _ => {
                this.overlay.setPosition(undefined);
                popupCloser.blur();
                return false;
            };

            popupContainer.append(popupCloser);
            popupContainer.append(this.popupContent);

            this.overlay = new Overlay({
                element: popupContainer,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250,
                }
            });

            this.map.addOverlay(this.overlay);
        }

        /**
         * 
         */
        const addMapControl = (targetControl: HTMLElement | string) => {

            const createDroneSelector = (): HTMLDivElement => {

                const handleChange = ({ target }) => {
                    this.drone = (target.value || target.options[target.selectedIndex].value);
                    this.getInfoFromView(/* clear = */ true);
                }

                const droneSelector = document.createElement('div');
                droneSelector.className = 'ol-dji-geozones--drone-selector';

                const select = document.createElement('select');
                select.onchange = handleChange;

                if (!this.isVisible) select.setAttribute('disabled', 'disabled');

                let options = '';

                this.getDrones().forEach((drone: Drone) => {
                    const selected = (this.drone === drone.id) ? 'selected' : '';
                    options += `<option value="${drone.id}" ${selected}>${drone.name}</option>`
                })

                select.innerHTML = options;

                droneSelector.append(select);

                return droneSelector;

            }

            const createLevelSelector = (): HTMLDivElement => {

                const handleClick = ({ target }) => {

                    const level = target.value;

                    if (target.checked) {
                        this.addLevels(level);
                    } else {
                        this.removeLevels(level);
                    }

                }

                const createLegend = (color: string): HTMLSpanElement => {
                    const span = document.createElement('span');
                    span.className = 'ol-dji-geozones--mark'
                    span.style.border = `1px ${color} solid`;
                    span.style.backgroundColor = colorWithAlpha(color, 0.4);

                    return span;
                }

                const createLabel = (label: string, name: string, color: string) => {
                    const labelEl = document.createElement('label');
                    labelEl.htmlFor = name;
                    labelEl.append(createLegend(color));
                    labelEl.append(label);

                    return labelEl;
                }

                const createCheckbox = (name: string, value: number, disabled: boolean): HTMLInputElement => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = name;
                    checkbox.id = name;
                    checkbox.value = String(value);

                    checkbox.onclick = handleClick;

                    if (this.levelsActive.indexOf(value) !== -1)
                        checkbox.checked = true;

                    if (disabled)
                        checkbox.disabled = true;

                    return checkbox;
                }

                const createLevelItem = (value: number, { name, desc, color }): HTMLDivElement => {

                    const disabled = !this.isVisible;
                    const id = 'level' + value;

                    const divContainer = document.createElement('div');
                    divContainer.className = `ol-dji-geozones--item-ctl ol-dji-geozones--item-ctl-${value}`;
                    divContainer.title = desc;
                    divContainer.setAttribute('data-level', String(value));
                    divContainer.append(createCheckbox(id, value, disabled));
                    divContainer.append(createLabel(name, id, color));

                    return divContainer;
                }

                const levelSelector = document.createElement('div');
                levelSelector.className = 'ol-dji-geozones--level-selector';

                this.levelsToDisplay.forEach(lev => {
                    const level = createLevelItem(lev, this.getLevelParamsById(lev));
                    levelSelector.append(level);
                })

                return levelSelector;

            }

            const divControl = document.createElement('div');
            divControl.className = 'ol-dji-geozones ol-control ol-dji-geozones--ctrl-disabled';
            divControl.innerHTML = `
            <div>
                <h3>DJI Geo Zones</h3>
                <span class="ol-dji-geozones--loading">
                    ${this.loadingElement}
                </span>
                <span class="ol-dji-geozones--advice">(Zoom in)</span>
            </div>`;

            const droneSelector = createDroneSelector();
            divControl.append(droneSelector);

            const levelSelector = createLevelSelector();
            divControl.append(levelSelector);

            this.divControl = divControl;

            const options = {
                element: divControl,
                target: null
            };

            if (targetControl) {
                options.target = targetControl;
            }

            this.control = new Control(options)

            this.map.addControl(this.control);

        }

        const addMapEvents = (): void => {

            /**
             * Enable or disable the inputs and the select in the control
             */
            const setControlEnabled = (enabled: boolean): void => {

                const changeState = (array: NodeListOf<HTMLInputElement | HTMLSelectElement>) => {
                    array.forEach(el => {

                        if (enabled) {
                            el.removeAttribute('disabled');
                        } else {
                            el.disabled = true;
                        }

                    });
                }

                if (enabled) {
                    this.divControl.classList.remove('ol-dji-geozones--ctrl-disabled');
                } else {
                    this.divControl.classList.add('ol-dji-geozones--ctrl-disabled');
                }

                const inputs: NodeListOf<HTMLInputElement> = this.divControl.querySelectorAll('input');
                changeState(inputs);

                const selects: NodeListOf<HTMLSelectElement> = this.divControl.querySelectorAll('select');
                changeState(selects);

            }

            const handleZoomEnd = (): void => {

                const setVisible = (bool: boolean): void => {
                    this.vectorLayers.forEach(layer => {

                        if (!bool) {
                            layer.setVisible(bool)
                        } else if (bool && this.levelsActive.includes(layer.get('level'))) {
                            layer.setVisible(bool);
                        }

                    })
                }

                if (this.currentZoom < MIN_ZOOM) {

                    // Hide the layer and disable the control
                    if (this.isVisible) {
                        setVisible(false);
                        this.isVisible = false;
                        setControlEnabled(false);
                    }

                } else {

                    // Show the layers and enable the control
                    if (!this.isVisible) {
                        setVisible(true);
                        this.isVisible = true;
                        setControlEnabled(true);
                    } else {
                        // If the view is closer, don't do anything, we already had the features
                        if (this.currentZoom > this.lastZoom)
                            return;
                    }

                    this.getInfoFromView();
                }

            }

            const handleDragEnd = (): void => {
                if (!this.isVisible) return;
                this.getInfoFromView();
            }

            const clickHandler = (evt: MapBrowserEvent): void => {
                const type = (this.useApiForPopUp) ? 'useApiForPopUp' : 'useFeatures';
                this.getPointInfoFromClick(evt, type);
            }

            this.map.on('moveend', (): void => {

                this.currentZoom = this.view.getZoom();

                if (this.currentZoom !== this.lastZoom)
                    handleZoomEnd();
                else
                    handleDragEnd();

                this.lastZoom = this.currentZoom;

            });

            this.map.on('singleclick', clickHandler);

        }

        if (this.initiated) return;

        this.initiated = true;

        createVectorLayers();
        createPopUpOverlay();
        addMapEvents();

        if (showControl)
            addMapControl(targetControl);

    }

    async getPointInfoFromClick(evt: MapBrowserEvent, type: string): Promise<void> {

        const infoKeys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description'];
        let idInfoRequest = 0;

        const getInfoFromApiLatLng = async (coordinate: Coordinate): Promise<Array<Object> | boolean> => {

            // Prevent multiples requests
            idInfoRequest += 1;
            const request = idInfoRequest;

            return new Promise((resolve) => {

                setTimeout(async () => {

                    if (request !== idInfoRequest) return;

                    const center4326 = transform(coordinate, this.projection, 'EPSG:4326');

                    const clickLatLng = {
                        lat: center4326[1],
                        lng: center4326[0]
                    }

                    const apiJson = await this.getApiGeoData('info', clickLatLng);

                    const areas = apiJson.areas;

                    if (!areas.length) resolve(false);

                    const featuresProps = [];

                    for (const area of areas) {
                        featuresProps.push(area);
                    }

                    resolve(featuresProps);

                }, 100);


            })


        }

        const getInfoFromFeatures = (features: Array<FeatureLike>): Array<Object> => {

            const featuresProps = [];

            features.forEach(feature => {

                const props = {};

                infoKeys.forEach(key => props[key] = feature.get(key));

                featuresProps.push(props);

            })

            return featuresProps;

        }

        const showGeozoneDataInPopUp = (geozonesData: Object | Array<any>, coordinates: Coordinate) => {

            const parseDataToHtml = ({ name, level, type, height, description, begin_at, end_at, address, url }) => {

                const levelParams = this.getLevelParamsById(level);

                return `
                <div class="ol-dji-geozones--item">
                    <div class="ol-dji-geozones--marker">
                        <img src="${levelParams.markerCircle}">
                    </div>
                    <div class="ol-dji-geozones--main">
                    <h3 class="ol-dji-geozones--title">${name}</h3>
                        <p class="level">Level: ${levelParams.name}</p>
                        <p class="type">Type: ${this.getGeozoneTypeById(type).name}</p>
                        ${(begin_at) ? `<p class="start_time">End Time: ${begin_at}</p>` : ''}
                        ${(end_at) ? `<p class="end_time">End Time: ${end_at}</p><p class="time_tips">Time: 24-hour clock</p>` : ''}         
                        ${(height) ? `<p class="height">Max. Altitude (m): ${height}</p>` : ''} 
                        ${(address) ? `<p class="address">Address: ${address}</p>` : ''}
                        ${(description) ? `<p class="desc">Tips: ${description}</p>` : ''}
                        ${(url) ? `<p class="url">Link: <a href="${url}">Learn More</a></p>` : ''}
                    </div>
                </div> `;

            }

            const html = [];
            const preventDuplicates = [];

            const arrGeozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];

            arrGeozonesData.forEach(geozoneProps => {

                const htmlItem = parseDataToHtml(geozoneProps);
                // The oficial DJI map show duplicates, but we don't want that
                if (preventDuplicates.indexOf(htmlItem) === -1) {
                    preventDuplicates.push(htmlItem);
                    html.push(htmlItem);
                }
            })

            this.popupContent.innerHTML = html.join('<hr>');

            this.overlay.setPosition(coordinates);

        }


        try {

            if (!this.isVisible) {
                this.overlay.setPosition(undefined);
                return;
            }

            const opt_options = {
                layerFilter: (layer: VectorLayer) => layer.get('name') === 'ol-dji-geozones'
            };

            let data;

            // Call the API  to download the information
            if (type === 'useApiForPopUp') {

                if (this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {

                    this.popupContent.innerHTML = this.loadingElement;
                    this.overlay.setPosition(evt.coordinate);

                    data = await getInfoFromApiLatLng(evt.coordinate);

                }

                // Use the previously downloaded features information
            } else {

                const features = this.map.getFeaturesAtPixel(evt.pixel, opt_options);

                data = getInfoFromFeatures(features);

            }

            if (data && data.length) showGeozoneDataInPopUp(data, evt.coordinate);
            else this.overlay.setPosition(undefined);


        } catch (err) {
            console.log(err);
        }

    }

    getInfoFromView(clear = false): void {

        let idAreasRequest = 0;

        /**
         * The level parameter returned by the API is wrong, so wee need to fixed using the color
         * @param {*} feature 
         */
        const fixLevelValue = (feature: Feature) => {
            const color = feature.get('color');
            const level = Object.keys(this.geozoneLevelParams).find(key => this.geozoneLevelParams[key].color === color);
            feature.set('level', level);
            return feature;
        }

        /**
         * Parse the json response of the API an create Open Layers features.
         * @param {JSON} djiJson 
         */
        const apiResponseToFeatures = (djiJson) => {

            const areas = djiJson.areas;

            if (!areas || !areas.length) return false;

            const features = [];

            for (const area of areas) {

                // If the feature already exists, continue
                if (this.getFeatureById(area.area_id)) {
                    continue;
                }

                const featureProps = {
                    address: area.address,
                    begin_at: area.begin_at,
                    color: area.color,
                    city: area.city,
                    country: area.country,
                    data_source: area.data_source,
                    description: area.description,
                    end_at: area.end_at,
                    height: area.height,
                    level: area.level,
                    name: area.name,
                    radius: area.radius,
                    shape: area.shape,
                    type: area.type,
                    url: area.url,
                    lng: area.lng,
                    lat: area.lat,
                }

                // Only a few of "areas" come with polygons
                if (area.polygon_points) {

                    const featureExtra = new Feature({
                        ...featureProps,
                        geometry:
                            new Polygon(
                                area.polygon_points
                            ).transform('EPSG:4326', this.projection)
                    });

                    featureExtra.setId(area.area_id + "_poly");

                    features.push(fixLevelValue(featureExtra));

                }

                const feature = new Feature({
                    ...featureProps,
                    geometry: new Point([area.lng, area.lat]).transform('EPSG:4326', this.projection)
                });

                // Store the id to avoid duplicates
                feature.setId(area.area_id);
                features.push(fixLevelValue(feature));

                if (area.sub_areas) {

                    area.sub_areas.forEach(sub_area => {

                        let subFeature;

                        if (sub_area.polygon_points) {

                            subFeature = new Feature({
                                color: sub_area.color,
                                height: sub_area.height,
                                level: sub_area.level,
                                name: area.name,
                                radius: sub_area.radius,
                                shape: sub_area.shape,
                                type: area.type,
                                lng: sub_area.lng,
                                lat: sub_area.lat,
                                geometry:
                                    new Polygon(
                                        sub_area.polygon_points
                                    ).transform('EPSG:4326', this.projection)
                            });

                        } else {

                            subFeature = new Feature({
                                color: sub_area.color,
                                height: sub_area.height,
                                level: sub_area.level,
                                name: area.name,
                                radius: sub_area.radius,
                                shape: sub_area.shape,
                                type: area.type,
                                lng: sub_area.lng,
                                lat: sub_area.lat,
                                geometry:
                                    new Circle(
                                        [sub_area.lng, sub_area.lat],
                                        sub_area.radius / 100000
                                    ).transform('EPSG:4326', this.projection)
                            });

                        }

                        subFeature.setId(sub_area.area_id);
                        features.push(fixLevelValue(subFeature));

                    })
                }


            }

            return features;
        }

        const addFeaturesToEachLevel = features => {

            if (!features) return;

            features.forEach(feature => {
                const level = feature.get('level');
                const layer = this.getLayerByLevel(level);
                layer.getSource().addFeature(feature);
            })
        }

        /**
         * Show/hide the loading in the control
         * @param {Boolean} bool 
         */
        const showLoading = bool => {

            if (!this.divControl) return;

            if (bool)
                this.divControl.classList.add('ol-dji-geozones--isLoading');
            else
                this.divControl.classList.remove('ol-dji-geozones--isLoading');

        }

        // Prevent multiples requests
        idAreasRequest += 1;
        const request = idAreasRequest;

        // Original DJI map same behavior to prevent multiples requests
        setTimeout(async () => {

            if (request !== idAreasRequest) return;

            try {

                showLoading(true);

                const center = this.view.getCenter();
                const center4326 = transform(center, this.projection, 'EPSG:4326');

                const viewLatLng = {
                    lat: center4326[1],
                    lng: center4326[0]
                }

                if (clear) {
                    this.areaDownloaded = null; // Remove area already downloaded
                }

                const data = await this.getApiGeoData('areas', viewLatLng);

                if (!data) throw new Error();

                if (clear) this.clearFeatures();

                const features = apiResponseToFeatures(data);

                addFeaturesToEachLevel(features);

                showLoading(false);

                // console.log(data);

            } catch (err) {

                if (err.message)
                    console.error(err);

                showLoading(false);
            }

        }, 300);


    }

    /**
     * Controller for the API rquests.
     */
    async getApiGeoData(typeApiRequest: 'areas' | 'info', latLng: { lat: number, lng: number }): Promise<any> {

        const apiRequest = async (typeApiRequest: 'areas' | 'info', { lng, lat }, searchRadius: number) => {

            const api_endpoint = (typeApiRequest === 'areas') ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT;

            // If not proxy is passed, make a direct request
            // Maybe in the future the api will has updated CORS restrictions
            const url = new URL((this.url_proxy) ? this.url_proxy + api_endpoint : 'https://' + api_endpoint);

            const queryObj = {
                'drone': this.drone,
                'zones_mode': this.zones_mode,
                'country': this.country,
                'level': API_LEVELS,
                'lng': lng,
                'lat': lat,
                'search_radius': searchRadius
            }

            Object.keys(queryObj).forEach(key => url.searchParams.append(key, queryObj[key]))

            const response = await fetch(url.toString());

            if (!response.ok) throw new Error("HTTP-Error: " + response.status);

            return await response.json();

        }

        const getPointInfo = async (latLng: { lat: number, lng: number }, searchRadius: number) => {

            const data = await apiRequest('info', latLng, searchRadius);
            return data;

        }

        const getAreas = async (centerLatLng: { lat: number, lng: number }, searchRadius: number) => {

            const extent = this.view.calculateExtent();
            const polygon = fromExtent(extent);

            if (this.areaDownloaded) {

                if (this.areaDownloaded.intersectsCoordinate(getCenter(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getBottomLeft(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getTopRight(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getBottomRight(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getTopLeft(extent))) {
                    // whe already have the data, do nothing
                    return;
                }

                this.areaDownloaded.appendPolygon(polygon);

            } else {
                this.areaDownloaded = new MultiPolygon([polygon.getCoordinates()]);
            }

            const data = await apiRequest('areas', centerLatLng, searchRadius);

            return data;

        }

        // adapted from https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map
        const getMapRadius = ({ lng, lat }): number => {
            const center = [lng, lat];
            const size = this.map.getSize();
            let extent = this.view.calculateExtent(size);
            extent = transformExtent(extent, this.projection, 'EPSG:4326');
            const posSW = [extent[0], extent[1]];
            const centerToSW = getDistance(center, posSW);
            return parseInt(String(centerToSW));
        }

        if (!this.isVisible) return;

        const searchRadius = getMapRadius(latLng);
        let data;

        if (typeApiRequest === 'areas') {
            data = await getAreas(latLng, searchRadius);
        } else {
            data = await getPointInfo(latLng, searchRadius);
        }

        return data;

    }

    /**
     * Show or hides the control
     */
    setControlVisible(visible: boolean): void {
        if (visible) {
            this.divControl.classList.add('ol-dji-geozones--ctrl-hidden');
        } else {
            this.divControl.classList.remove('ol-dji-geozones--ctrl-hidden');
        }
    }

    clearFeatures(): void {
        this.vectorLayers.forEach(layer => {
            layer.getSource().clear();
        })
    }

    getFeatureById(id: string): Feature {
        let feature: Feature;
        for (const layer of this.vectorLayers) {
            feature = layer.getSource().getFeatureById(id);
            if (feature) break;
        }
        return feature;
    }

    setLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = arrLevels;

        if (refresh) {

            this.levelsToDisplay.forEach(lev => {
                const layer = this.getLayerByLevel(lev);

                if (arrLevels.includes(lev)) {
                    layer.setVisible(true);
                } else {
                    layer.setVisible(false);
                }

            })

        }
    }

    addLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = [...this.levelsActive, ...arrLevels];

        if (refresh) {
            arrLevels.forEach(lev => {
                const layer = this.getLayerByLevel(lev);
                layer.setVisible(true);
            })
        }

    }

    removeLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = this.levelsActive.filter(x => !arrLevels.includes(x));

        if (refresh) {
            arrLevels.forEach(lev => {
                const layer = this.getLayerByLevel(lev);
                layer.setVisible(false);
            })
        }
    }

    getLayers(): Array<VectorLayer> {
        return this.vectorLayers;
    }

    getLayerByLevel(level: number): VectorLayer {
        let find: VectorLayer;
        for (const layer of this.vectorLayers) {
            if (layer.get('level') != undefined && layer.get('level') == level) {
                find = layer;
                break;
            }
        }
        return find;
    }

    getLevelsParams(): Array<GeozoneLevel> {
        return this.geozoneLevelParams;
    }

    getLevelParamsById(id: number = null): GeozoneLevel {
        return this.geozoneLevelParams.find((lev: GeozoneLevel) => lev.id == id);
    }

    getGeozoneTypes(): Array<GeozoneType> {
        return geozoneTypes;
    }

    getGeozoneTypeById(id: number = null): GeozoneType {
        return geozoneTypes.find((el: GeozoneType) => el.id == id);
    }

    getDroneById(id: string): Drone {
        return this.dronesList.find((el: Drone) => el.id == id);
    }

    getDrones(): Array<Drone> {
        return this.dronesList;
    }
}

// https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color
function colorWithAlpha(color: string, alpha = 1): string {
    const [r, g, b] = Array.from(asArray(color));
    return asString([r, g, b, alpha]);
}

/**
 * **_[interface]_** - Geozone Type allows by the API
 */
interface GeozoneType {
    id: number;
    name: string;
}

/**
 * **_[interface]_** - Drone
 */
interface Drone {
    id: string;
    name: string;
}

interface DroneList extends Array<Drone>{};


/**
 * **_[interface]_** - DjiGeozones Options specified when creating a DjiGeozones
 */
interface GeozoneLevel {
    id: number;
    name: string;
    desc: string | undefined;
    color: string;
    zIndex: number;
    markerIcon: string;
    markerCircle: string;
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
 *   showControl: true, // Create or not the control
 *   targetControl: null, // Specify a target if you want the control to be rendered outside of the map's viewport
 *   extent: null,
 *   loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>'
 * }
 * ```
 */
interface Options {

    /*
     * Drone id
     */
    drone?: string;
    /**
     * 
     */
    zonesMode?: string;
    /**
     * 
     */
    country?: string;
    /**
     * 
     */
    levelsToDisplay?: Array<number>;
    /**
     * 
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
     * Add Open Layers Controller to the map
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

export {
    Options,
    Drone,
    GeozoneType,
    GeozoneLevel
};