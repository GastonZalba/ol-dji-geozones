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
import {
    getTopRight,
    getTopLeft,
    getBottomRight,
    getCenter,
    getBottomLeft,
    Extent
} from 'ol/extent';
import { MapBrowserEvent, PluggableMap, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import Projection from 'ol/proj/Projection';
import { EventsKey } from 'ol/events';
import { unByKey } from 'ol/Observable';

// Import configuration values
import levelsParams from './_levels-params.json';
import dronesList from './_drones.json';

import * as languages from './assets/i18n/index';

// Images
import geozoneSvg from './assets/images/geozone.svg';
import infoSvg from './assets/images/info.svg';
import { brotliDecompressSync } from 'zlib';


/**
 * @protected
 */
const API_AREAS_ENDPOINT = 'www-api.dji.com/api/geo/areas';
const API_INFO_ENDPOINT = 'www-api.dji.com/api/geo/point-info';
const API_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // request all the levels, we filter later to avoid some api problems
const MIN_ZOOM = 9; // < 9 breaks the API

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

    protected i18n: Lang;

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

    protected clickEvent: 'singleclick' | 'dblclick'

    private moveendEvtKey: EventsKey;
    private clickEvtKey: EventsKey | Array<EventsKey>;

    protected vectorLayers: Array<VectorLayer>;
    protected divControl: HTMLElement;
    protected areaDownloaded: MultiPolygon;

    protected loadingElement: string;

    protected popupContent: HTMLElement;

    constructor(map: PluggableMap, opt_options?: Options) {
        const options = { ...opt_options };

        // LANGUAGE SUPPORT
        this.i18n = (options.i18n) || languages[options.language || 'en'];

        // API PARAMETERS
        this.drone = options.drone || 'spark';
        this.zonesMode = options.zonesMode || 'total';
        this.country = options.country || 'US';

        this.levelsToDisplay = options.levelsToDisplay || [2, 6, 1, 0, 3, 4, 7];
        this.levelsActive = options.levelsActive || [2, 6, 1, 0, 3, 4, 7];
        this.levelsParamsList = levelsParams;

        // If not provided, we use all the available drones
        // This can be passed to use translations.
        this.dronesToDisplay = options.dronesToDisplay || dronesList;

        this.extent = options.extent || null;

        // Add slash on the end if not present
        this.urlProxy = options.urlProxy.replace(/\/?$/, '/');

        this.loadingElement =
            options.loadingElement ||
            '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

        this.clickEvent = options.clickEvent || 'singleclick';

        // By default, we use the properties features to show in the popup.
        // The official DJI map, makes an extra request to another API to get the data. I don't understand why.
        // It's more slow and requieres extra requests to an already downloaded data...
        // Either way, this extra API calls are supported if you want.
        this.useApiForPopUp = false;

        // MAP
        const showPanel = 'showPanel' in options ? options.showPanel : true;
        const targetPanel = options.targetPanel || null;

        this.map = map;
        this.view = map.getView();
        this.projection = this.view.getProjection();
        this.isVisible = this.view.getZoom() < MIN_ZOOM;

        this.vectorLayers = [];
        this.divControl = null;
        this.areaDownloaded = null;

        this.init(showPanel, targetPanel);
    }

    init(showPanel: boolean, targetControl: string | HTMLElement): void {
        /**
         * Create and add a Vector Layer for each level
         * @private
         */
        const createVectorLayers = () => {
            /**
             * Create the style of each layer acoording to the geometry,
             * level, and color obtained from the API
             *
             * @param feature
             * @private
             */
            const styleFunction = (feature: Feature) => {
                const geomType = feature.getGeometry().getType();
                const level = feature.get('level');
                const levelParams = this.getLevelParamsById(level);
                let style: Style;

                if (geomType === 'Polygon' || geomType === 'Circle') {
                    const color = feature.get('color');

                    style = new Style({
                        fill: new Fill({
                            color: DjiGeozones.colorWithAlpha(color, 0.3)
                        }),
                        stroke: new Stroke({
                            color: color,
                            width: 1
                        }),
                        zIndex: levelParams.zIndex
                    });
                } else if (geomType === 'Point') {
                    style = new Style({
                        image: new Icon({
                            src: levelParams.markerIcon,
                            scale: 0.35,
                            anchor: [0.5, 0.9]
                        }),
                        zIndex: levelParams.zIndex * 2
                    });
                }

                return style;
            };

            API_LEVELS.forEach((level) => {
                const layer = new VectorLayer({
                    zIndex: this.getLevelParamsById(level).zIndex * 2,
                    visible: this.levelsActive.includes(level) ? true : false,
                    source: new VectorSource({
                        attributions:
                            '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
                    }),
                    style: styleFunction,
                    extent: this.extent
                });

                layer.set('name', 'ol-dji-geozones');
                layer.set('level', level);

                this.map.addLayer(layer);
                this.vectorLayers.push(layer);
            });
        };

        /**
         * Create the PopUp element and add it to an Overlay
         * @private
         */
        const createPopUpOverlay = () => {
            const popupContainer = document.createElement('div');
            popupContainer.id = 'ol-dji-geozones--popup';
            popupContainer.className = 'ol-popup ol-dji-geozones--ol-popup';

            this.popupContent = document.createElement('div');
            this.popupContent.id = 'ol-dji-geozones--popup-content';
            this.popupContent.className = 'ol-dji-geozones--ol-popup-content';

            const popupCloser = document.createElement('a');
            popupCloser.id = 'ol-dji-geozones--popup-closer';
            popupCloser.className = 'ol-dji-geozones--ol-popup-closer';
            popupCloser.href = '#';
            popupCloser.onclick = () => {
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
                    duration: 250
                }
            });

            this.map.addOverlay(this.overlay);
        };

        /**
         * Add panel controller to the viewport map.
         * @param targetPanel If provided, the panel wil be rendered outside the viewport
         * @private
         */
        const addMapControl = (targetPanel: HTMLElement | string) => {

            const createDroneSelector = (): HTMLDivElement => {
                const handleChange = ({ target }) => {
                    this.drone =
                        target.value || target.options[target.selectedIndex].value;
                    this.getInfoFromView(/* clear = */ true);
                };

                const droneSelector = document.createElement('div');
                droneSelector.className = 'ol-dji-geozones--drone-selector';

                const select = document.createElement('select');
                select.onchange = handleChange;

                if (!this.isVisible) select.setAttribute('disabled', 'disabled');

                let options = '';

                this.getDrones().forEach((drone: Drone) => {
                    const selected = this.drone === drone.id ? 'selected' : '';
                    options += `<option value="${drone.id}" ${selected}>${drone.name}</option>`;
                });

                select.innerHTML = options;

                droneSelector.append(select);

                return droneSelector;
            };

            const createLevelSelector = (): HTMLDivElement => {
                const handleClick = ({ target }) => {
                    const level = Number(target.value);

                    if (target.checked) {
                        this.addLevels(level);
                    } else {
                        this.removeLevels(level);
                    }
                };

                const createLegend = (color: string): HTMLSpanElement => {
                    const span = document.createElement('span');
                    span.className = 'ol-dji-geozones--mark';
                    span.style.border = `1px ${color} solid`;
                    span.style.backgroundColor = DjiGeozones.colorWithAlpha(color, 0.4);
                    return span;
                };

                const createLabel = (label: string, name: string, color: string) => {
                    const labelEl = document.createElement('label');
                    labelEl.htmlFor = name;
                    labelEl.append(createLegend(color));
                    labelEl.append(label);

                    return labelEl;
                };

                const createCheckbox = (
                    name: string,
                    value: number,
                    disabled: boolean
                ): HTMLInputElement => {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.name = name;
                    checkbox.id = name;
                    checkbox.value = String(value);

                    checkbox.onclick = handleClick;

                    if (this.levelsActive.indexOf(value) !== -1) checkbox.checked = true;

                    if (disabled) checkbox.disabled = true;

                    return checkbox;
                };

                const createLevelItem = (
                    value: number,
                    { name, desc, color }
                ): HTMLDivElement => {
                    const disabled = !this.isVisible;
                    const id = 'level' + value;

                    const divContainer = document.createElement('div');
                    divContainer.className = `ol-dji-geozones--item-ctl ol-dji-geozones--item-ctl-${value}`;
                    divContainer.title = desc;
                    // divContainer.setAttribute('style', `--level-color: ${color}`);
                    // divContainer.setAttribute('data-geotooltip', desc);
                    divContainer.setAttribute('data-level', String(value));
                    divContainer.append(createCheckbox(id, value, disabled));
                    divContainer.append(createLabel(name, id, color));

                    return divContainer;
                };

                const levelSelector = document.createElement('div');
                levelSelector.className = 'ol-dji-geozones--level-selector';

                this.levelsToDisplay.forEach((lev) => {
                    const level = createLevelItem(lev, this.getLevelById(lev));
                    levelSelector.append(level);
                });

                return levelSelector;
            };

            const createButtonCollapser = (): HTMLButtonElement => {
                const buttonCollapse = document.createElement('button');
                buttonCollapse.className = 'ol-dji-geozones--collapse';
                buttonCollapse.title = this.i18n.labels.collapse;
                buttonCollapse.onclick = () => divControl.classList.add('ol-dji-geozones--collapsed');
                return buttonCollapse;
            }

            const divControl = document.createElement('div');

            divControl.className =
                'ol-dji-geozones ol-control ol-dji-geozones--ctrl-disabled';

            divControl.innerHTML = `
            <header>
                <h3>${this.i18n.labels.djiGeoZones}</h3>
                <span class="ol-dji-geozones--loading">
                    ${this.loadingElement}
                </span>
            </header>
            <main>
                <section class="ol-dji-geozones--selectors"></section>
                <section>
                    <div class="ol-dji-geozones--logo" title="${this.i18n.labels.expand}"><img src="${geozoneSvg}"/></div>
                    <span class="ol-dji-geozones--advice">${this.i18n.labels.helperZoom}</span>
                </section>
            </main>
            `;

            const droneSelector = createDroneSelector();
            divControl.querySelector('.ol-dji-geozones--selectors').append(droneSelector);

            const levelSelector = createLevelSelector();
            divControl.querySelector('.ol-dji-geozones--selectors').append(levelSelector);

            const buttonCollapse = createButtonCollapser();
            divControl.querySelector('header').append(buttonCollapse);

            const logo: HTMLDivElement = divControl.querySelector('.ol-dji-geozones--logo');
            logo.onclick = () => divControl.classList.remove('ol-dji-geozones--collapsed');


            this.divControl = divControl;

            const options = {
                element: divControl,
                target: null
            };

            if (targetPanel) {
                options.target = targetPanel;
            }

            this.control = new Control(options);

            this.map.addControl(this.control);
        };

        /**
         * @private
         */
        const addMapEvents = (): void => {
            /**
             * Enable or disable the inputs and the select in the control
             * @private
             */
            const setControlEnabled = (enabled: boolean): void => {

                if (!this.divControl) return;

                const changeState = (
                    array: NodeListOf<HTMLInputElement | HTMLSelectElement>
                ) => {
                    array.forEach((el) => {
                        if (enabled) {
                            el.removeAttribute('disabled');
                        } else {
                            el.disabled = true;
                        }
                    });
                };

                if (enabled) {
                    this.divControl.classList.remove('ol-dji-geozones--ctrl-disabled');
                } else {
                    this.divControl.classList.add('ol-dji-geozones--ctrl-disabled');
                }

                const inputs: NodeListOf<HTMLInputElement> = this.divControl.querySelectorAll(
                    'input'
                );
                changeState(inputs);

                const selects: NodeListOf<HTMLSelectElement> = this.divControl.querySelectorAll(
                    'select'
                );
                changeState(selects);
            };

            const handleZoomEnd = (): void => {
                const setVisible = (bool: boolean): void => {
                    this.vectorLayers.forEach((layer) => {
                        if (!bool) {
                            layer.setVisible(bool);
                        } else if (bool && this.levelsActive.includes(layer.get('level'))) {
                            layer.setVisible(bool);
                        }
                    });
                };

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
                        if (this.currentZoom > this.lastZoom) return;
                    }

                    this.getInfoFromView();
                }
            };

            const handleDragEnd = (): void => {
                if (!this.isVisible) return;
                this.getInfoFromView();
            };

            const clickHandler = (evt: MapBrowserEvent): void => {
                const type = this.useApiForPopUp
                    ? 'useApiForPopUp'
                    : 'useFeaturesForPopUp';

                this.getPointInfoFromClick(evt, type);
            };

            this.moveendEvtKey = this.map.on('moveend', (): void => {
                this.currentZoom = this.view.getZoom();

                if (this.currentZoom !== this.lastZoom) handleZoomEnd();
                else handleDragEnd();

                this.lastZoom = this.currentZoom;
            });

            this.clickEvtKey = this.map.on(this.clickEvent, clickHandler);
        };

        createVectorLayers();
        createPopUpOverlay();
        addMapEvents();

        if (showPanel) addMapControl(targetControl);
    }

    /**
     *
     * @param evt
     * @param type
     * @private
     */
    async getPointInfoFromClick(
        evt: MapBrowserEvent,
        type: 'useApiForPopUp' | 'useFeaturesForPopUp'
    ): Promise<void> {
        const infoKeys = [
            'name',
            'level',
            'type',
            'height',
            'shape',
            'start_at',
            'end_at',
            'url',
            'address',
            'description'
        ];
        let idInfoRequest = 0;

        const getInfoFromApiLatLng = async (
            coordinate: Coordinate
        ): Promise<Array<Object> | boolean> => {
            // Prevent multiples requests
            idInfoRequest += 1;
            const request = idInfoRequest;

            return new Promise((resolve) => {
                setTimeout(async () => {
                    if (request !== idInfoRequest) return;

                    const center4326 = transform(
                        coordinate,
                        this.projection,
                        'EPSG:4326'
                    );

                    const clickLatLng = {
                        lat: center4326[1],
                        lng: center4326[0]
                    };

                    const apiJson = await this.getApiGeoData('info', clickLatLng);

                    const areas = apiJson.areas;

                    if (!areas.length) resolve(false);

                    const featuresProps = [];

                    for (const area of areas) {
                        featuresProps.push(area);
                    }

                    resolve(featuresProps);
                }, 100);
            });
        };

        /**
         *
         * @param features
         * @private
         */
        const getInfoFromFeatures = (
            features: Array<FeatureLike>
        ): Array<Object> => {
            const featuresProps = [];

            features.forEach((feature) => {
                const props = {};

                infoKeys.forEach((key) => (props[key] = feature.get(key)));

                featuresProps.push(props);
            });

            return featuresProps;
        };

        const showGeozoneDataInPopUp = (
            geozonesData: Object | Array<any>,
            coordinates: Coordinate
        ) => {

            const createTooltip = (level) => {

                const getPos = (el: HTMLElement) => {
                    return el.getBoundingClientRect();
                }

                let evtKey: EventsKey;

                const showPopUp = () => {
                    infoTooltip.style.position = 'fixed';

                    let position = getPos(iconTooltip);
                    infoTooltip.style.top = position.top + 'px';
                    infoTooltip.style.left = position.left + 'px';
                    infoTooltip.classList.add('ol-dji-geozones--active-tooltip');
                    evtKey = this.map.once('movestart', () => closePopUp());
                    document.body.append(infoTooltip);
                }

                const closePopUp = () => {
                    infoTooltip.classList.remove('ol-dji-geozones--active-tooltip');
                    unByKey(evtKey);
                    container.append(infoTooltip);
                }

                const infoTooltip = document.createElement('span');
                infoTooltip.className = 'ol-dji-geozones--info';
                infoTooltip.innerHTML = `<span class="ol-dji-geozones--info-text">${level.desc}</span><span class="ol-dji-geozones--info-back"></span>`;
                infoTooltip.setAttribute('style', `--level-color: ${level.color}`);

                const iconTooltip = document.createElement('span');
                iconTooltip.className = 'ol-dji-geozones--icon';
                iconTooltip.innerHTML = `<img src="${infoSvg}">`;

                iconTooltip.onmouseover = () => showPopUp();
                iconTooltip.onclick = () => showPopUp();
                iconTooltip.onmouseout = () => closePopUp();

                const container = document.createElement('div');
                container.className = 'ol-dji-geozones--tooltip';
                container.append(iconTooltip)
                container.append(infoTooltip)
                return container;
            }

            const parseDataToHtml = (responseApi: DjiApiResponse): HTMLDivElement => {

                const {
                    name,
                    level,
                    type,
                    height,
                    description,
                    begin_at,
                    end_at,
                    address,
                    url
                } = responseApi;

                const levelValues = this.getLevelById(level);
                const lbl = this.i18n.labels;

                const html = `
                    <div class="ol-dji-geozones--marker">
                        <img src="${levelValues.markerCircle}">
                    </div>
                    <div class="ol-dji-geozones--main">
                        <h3 class="ol-dji-geozones--title">${name}</h3>
                        <p class="ol-dji-geozones--level">${lbl.level}: ${levelValues.name} </p>
                        <p class="ol-dji-geozones--type">${lbl.type}: ${this.getGeozoneTypeById(type).name}</p>
                        ${begin_at
                        ? `<p class="ol-dji-geozones--start_time">${lbl.startTime}: ${begin_at}</p>`
                        : ''
                    }
                        ${end_at
                        ? `<p class="ol-dji-geozones--end_time">${lbl.endTime}: ${end_at}</p><p class="ol-dji-geozones--time_tips">${lbl.timeTips}</p>`
                        : ''
                    }         
                        ${height
                        ? `<p class="ol-dji-geozones--height">${lbl.maxAltitude} (m): ${height}</p>`
                        : ''
                    } 
                        ${address
                        ? `<p class="ol-dji-geozones--address">${lbl.address}: ${address}</p>`
                        : ''
                    }
                        ${description
                        ? `<p class="ol-dji-geozones--desc">${lbl.tips}: ${description}</p>`
                        : ''
                    }
                        ${url
                        ? `<p class="ol-dji-geozones--url">${lbl.link}: <a href="${url}">${lbl.learnMore}</a></p>`
                        : ''
                    }
                </div>`;

                let item = document.createElement('div');
                item.className = 'ol-dji-geozones--item';
                item.innerHTML = html;

                item.querySelector('.ol-dji-geozones--level').append(createTooltip(levelValues));

                return item;

            };

            const preventDuplicates = [];

            const arrGeozonesData = Array.isArray(geozonesData)
                ? geozonesData
                : [geozonesData];

            this.popupContent.innerHTML = '';

            arrGeozonesData.forEach((geozoneProps) => {
                const element = parseDataToHtml(geozoneProps);
                // The oficial DJI map show duplicates, but we don't want that
                if (preventDuplicates.indexOf(element.innerHTML) === -1) {
                    preventDuplicates.push(element.innerHTML);
                    this.popupContent.append(element);
                    this.popupContent.append(document.createElement('HR'));
                }
            });


            this.overlay.setPosition(coordinates);
        };

        try {
            if (!this.isVisible) {
                this.overlay.setPosition(undefined);
                return;
            }

            const opt_options = {
                layerFilter: (layer: VectorLayer) =>
                    layer.get('name') === 'ol-dji-geozones'
            };

            let data;

            // Call the API  to download the information
            if (type === 'useApiForPopUp') {
                if (this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {
                    this.popupContent.innerHTML = this.loadingElement.toString();
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

    /**
     *
     * @param clear
     * @private
     */
    getInfoFromView(clear = false): void {
        let idAreasRequest = 0;

        /**
         * The level parameter returned by the API is wrong, so wee need to fixed using the color
         * @param feature
         * @private
         */
        const fixLevelValue = (feature: Feature) => {
            const color = feature.get('color');
            const level = Object.keys(this.levelsParamsList).find(
                (key) => this.levelsParamsList[key].color === color
            );
            feature.set('level', level);
            return feature;
        };

        /**
         * Parse the json response of the API an create Open Layers features.
         * @param djiJson
         * @private
         */
        const apiResponseToFeatures = (djiJson) => {
            /**
             *
             * @param id
             * @private
             */
            const getFeatureById = (id: string): Feature => {
                let feature: Feature;
                for (const layer of this.vectorLayers) {
                    feature = layer.getSource().getFeatureById(id);
                    if (feature) break;
                }
                return feature;
            };

            const areas = djiJson.areas;

            if (!areas || !areas.length) return false;

            const features = [];

            for (const area of areas) {
                // If the feature already exists, continue
                if (getFeatureById(area.area_id)) {
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
                    lat: area.lat
                };

                // Only a few of "areas" come with polygons
                if (area.polygon_points) {
                    const featureExtra = new Feature({
                        ...featureProps,
                        geometry: new Polygon(area.polygon_points).transform(
                            'EPSG:4326',
                            this.projection
                        )
                    });

                    featureExtra.setId(area.area_id + '_poly');

                    features.push(fixLevelValue(featureExtra));
                }

                const feature = new Feature({
                    ...featureProps,
                    geometry: new Point([area.lng, area.lat]).transform(
                        'EPSG:4326',
                        this.projection
                    )
                });

                // Store the id to avoid duplicates
                feature.setId(area.area_id);
                features.push(fixLevelValue(feature));

                if (area.sub_areas) {
                    area.sub_areas.forEach((sub_area) => {
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
                                geometry: new Polygon(sub_area.polygon_points).transform(
                                    'EPSG:4326',
                                    this.projection
                                )
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
                                geometry: new Circle(
                                    [sub_area.lng, sub_area.lat],
                                    sub_area.radius / 100000
                                ).transform('EPSG:4326', this.projection)
                            });
                        }

                        subFeature.setId(sub_area.area_id);
                        features.push(fixLevelValue(subFeature));
                    });
                }
            }

            return features;
        };

        /**
         *
         * @param features
         * @private
         */
        const addFeaturesToEachLevel = (features) => {
            if (!features) return;

            features.forEach((feature) => {
                const level = feature.get('level');
                const layer = this.getLayerByLevel(level);
                layer.getSource().addFeature(feature);
            });
        };

        /**
         * Show/hide the loading in the control
         * @param {Boolean} bool
         * @private
         */
        const showLoading = (bool) => {
            if (!this.divControl) return;

            if (bool) this.divControl.classList.add('ol-dji-geozones--isLoading');
            else this.divControl.classList.remove('ol-dji-geozones--isLoading');
        };

        /**
         * Clear all the elements in the Dji Geozones layers
         * @private
         */
        const clearFeatures = (): void => {
            this.vectorLayers.forEach((layer) => {
                layer.getSource().clear();
            });
        };

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
                };

                if (clear) {
                    this.areaDownloaded = null; // Remove area already downloaded
                }

                const data = await this.getApiGeoData('areas', viewLatLng);

                if (!data) throw new Error();

                if (clear) clearFeatures();

                const features = apiResponseToFeatures(data);

                addFeaturesToEachLevel(features);

                showLoading(false);

                // console.log(data);
            } catch (err) {
                if (err.message) console.error(err);
                showLoading(false);
            }
        }, 300);
    }

    /**
     * Controller for the API rquests.
     * @param typeApiRequest 
     * @param latLng 
     * @private
     */
    async getApiGeoData(
        typeApiRequest: 'areas' | 'info',
        latLng: { lat: number; lng: number }
    ): Promise<any> {

        const apiRequest = async (
            typeApiRequest: 'areas' | 'info',
            { lng, lat },
            searchRadius: number
        ) => {

            const api_endpoint =
                typeApiRequest === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT;

            // If not proxy is passed, make a direct request
            // Maybe in the future the api will has updated CORS restrictions
            const url = new URL(
                this.urlProxy
                    ? this.urlProxy + api_endpoint
                    : api_endpoint
            );

            const queryObj: DjiApiArguments = {
                drone: this.drone,
                zones_mode: this.zonesMode,
                country: this.country,
                level: API_LEVELS,
                lng: lng,
                lat: lat,
                search_radius: searchRadius
            };

            Object.keys(queryObj).forEach((key) =>
                url.searchParams.append(key, queryObj[key])
            );

            const response = await fetch(url.toString());

            if (!response.ok) throw new Error('HTTP-Error: ' + response.status);

            return await response.json();
        };

        const getPointInfo = async (
            latLng: { lat: number; lng: number },
            searchRadius: number
        ) => {
            const data = await apiRequest('info', latLng, searchRadius);
            return data;
        };

        const getAreas = async (
            centerLatLng: { lat: number; lng: number },
            searchRadius: number
        ) => {
            const extent = this.view.calculateExtent();
            const polygon = fromExtent(extent);

            if (this.areaDownloaded) {
                if (
                    this.areaDownloaded.intersectsCoordinate(getCenter(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getBottomLeft(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getTopRight(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getBottomRight(extent)) &&
                    this.areaDownloaded.intersectsCoordinate(getTopLeft(extent))
                ) {
                    // whe already have the data, do nothing
                    return;
                }

                this.areaDownloaded.appendPolygon(polygon);
            } else {
                this.areaDownloaded = new MultiPolygon([polygon.getCoordinates()]);
            }

            const data = await apiRequest('areas', centerLatLng, searchRadius);

            return data;
        };

        const getMapRadius = ({ lng, lat }): number => {
            const center = [lng, lat];
            const size = this.map.getSize();
            let extent = this.view.calculateExtent(size);
            extent = transformExtent(extent, this.projection, 'EPSG:4326');
            const posSW = [extent[0], extent[1]];
            const centerToSW = getDistance(center, posSW);
            return parseInt(String(centerToSW));
        };

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
     * Show or hides the control panel
     * @param visible
     */
    setPanelVisible(visible: boolean): void {
        if (!this.divControl) {
            return;
        }

        if (visible) {
            this.divControl.classList.add('ol-dji-geozones--ctrl-hidden');
        } else {
            this.divControl.classList.remove('ol-dji-geozones--ctrl-hidden');
        }
    }

    /**
     * Get all the layers
     */
    getLayers(): Array<VectorLayer> {
        return this.vectorLayers;
    }

    /**
     * Get the layer acordding the level
     * @param level
     */
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

    /**
     *
     * @param id
     * @private
     */
    getGeozoneTypeById(id: number = null) {
        return this.i18n.types.find((el) => el.id == id);
    }

    /**
     * Gets a list with all the supported Drones
     * @private
     */
    getDrones(): Array<Drone> {
        return this.dronesToDisplay;
    }

    /**
     * Set the drone parameter for the api request.
     * @param drone 
     * @param refresh If true, refresh the view making a new api request
     */
    setDrone(drone: string, refresh = true): void {
        this.drone = drone;
        if (refresh) {
            this.getInfoFromView();
        }
    }

    /**
     * Set the drone parameter for the api request.
     * @param country 
     * @param refresh If true, refresh the view making a new api request
     */
    setCountry(country: string, refresh = true): void {
        this.country = country;
        if (refresh) {
            this.getInfoFromView();
        }
    }
    /**
     * Get the parameters from all the levels
     * @private
     */
    getLevelsParams(): Array<LevelParams> {
        return this.levelsParamsList;
    }

    /**
     * Get the level parameters, like color, icon, and description 
     * @param id
     * @private
     */
    getLevelParamsById(id: number = null): LevelParams {
        return this.levelsParamsList.find((lev: LevelParams) => lev.id == id);
    }

    /**
     * Get all the parameters from a level and the i18n texts
     * @param id 
     */
    getLevelById(id: number = null) {
        let params = this.levelsParamsList.find((lev: LevelParams) => lev.id == id);
        let texts = this.i18n.levels.find((lev) => lev.id == id);
        return { ...params, ...texts };
    }

    /**
     * Replace the active levels with this values
     * 
     * @param levels
     * @param refresh If true, refresh the view and show the levels
     */
    setLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = arrLevels;

        if (refresh) {
            this.levelsToDisplay.forEach((lev) => {
                const layer = this.getLayerByLevel(lev);
                if (arrLevels.includes(lev)) {
                    layer.setVisible(true);
                } else {
                    layer.setVisible(false);
                }
            });
        }
    }

    /**
     * Add the level/s to the view
     * @param levels
     * @param refresh If true, refresh the view and show the actived levels
     */
    addLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = [...this.levelsActive, ...arrLevels];

        if (refresh) {
            arrLevels.forEach((lev) => {
                const layer = this.getLayerByLevel(lev);
                layer.setVisible(true);
            });
        }
    }

    /**
     * Remove the level/s from the view
     * 
     * @param levels 
     * @param refresh If true, refresh the view and show the actived levels
     */
    removeLevels(levels: Array<number> | number, refresh = true): void {
        const arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = this.levelsActive.filter((x) => !arrLevels.includes(x));

        if (refresh) {
            arrLevels.forEach((lev) => {
                const layer = this.getLayerByLevel(lev);
                layer.setVisible(false);
            });
        }
    }

    /**
     * Removes the control, layers and events from the map
     */
    destroy() {
        this.map.removeControl(this.control);
        this.getLayers().forEach(layer => {
            this.map.removeLayer(layer);
        })
        unByKey(this.clickEvtKey);
        unByKey(this.moveendEvtKey);
    }

    /**
     *  **_[static]_** - Generate an RGBA color from an hexadecimal
     * 
     * Adapted from https://stackoverflow.com/questions/28004153
     * @param color Hexadeciaml color
     * @param alpha Opacity
     * @private
     */
    static colorWithAlpha(color: string, alpha = 1): string {
        const [r, g, b] = Array.from(asArray(color));
        return asString([r, g, b, alpha]);
    }

}
/**
 * **_[interface]_** - Dji Api Response
 * @private
 */
interface DjiApiResponse {
    name: string;
    level: number;
    type: number;
    height: number;
    description: string;
    begin_at: string;
    end_at: string;
    address: string;
    url: string;
    [key: string]: any;
    color: string;
}
/**
 * **_[interface]_** - Dji Api Parameters
 *
 */
interface DjiApiArguments {
    /**
     * - `0` - Warning Zones
     * - `1` - Authorization Zones
     * - `2` - Restricted Zones
     * - `3` - Enhanced Warning Zones
     * - `4` - Regulatory Restricted Zones
     * - `5` - Recommended Zones (2) **Apparently this level is only valid for Japan**
     * - `6` - Altitude Zones
     * - `7` - Recommended Zones
     * - `8` - Approved Zones for Light UAVs(China) **Only valid for China**
     * - `9` - Densely Populated Area **NOT SUPPORTED - This level exists in the oficial Geo Zone Map, but this data is not provided by the api. On the other hand, now days this level is apparently valid only for Japan and China**
     */
    level: Array<number>;

    /**
     * - `mavic-mini` (Mavic Mini)
     * - `mavic-2-enterprise` (Mavic 2 Enterprise)
     * - `mavic-2` (Mavic 2)
     * - `mavic-air` (Mavic Air)
     * - `mavic-air-2` (Mavic Air 2)
     * - `mavic-pro` (Mavic Pro)
     * - `spark` (Spark)
     * - `phantom-4-pro` (Phantom 4 Pro)
     * - `phantom-4-advanced` (Phantom 4 Advanced)
     * - `phantom-4` (Phantom 4)
     * - `phantom-4-rtk` (Phantom 4 RTK)
     * - `phantom-4-multispectral` (Phantom 4 Multispectral)
     * - `phantom-3-pro` (Phantom 3 Pro
     * - `phantom-3-advanced` (Phantom 3 Advanced)
     * - `phantom-3-standard` (Phantom 3 Standard)
     * - `phantom-3-4K` (Phantom 3 4K)
     * - `phantom-3-se` (Phantom 3 SE)
     * - `inspire-2` (Inspire 2)
     * - `inspire-1-series` (Inspire 1 Series)
     * - `m200-series` (M200 Series)
     * - `m300-series` (M300 Series)
     * - `m600-series` (M600 Series)
     * - `m100` (M100)
     * - `mg1p` (MG 1S/1A/1P/1P RTK/T10/T16/T20/T30)
     * - `dji-mini-2` (DJI Mini 2)
     */
    drone: string;

    /**
     * Apparently doesn't affects the response of the api
     * - `US`
     * - `AR`
     * - _etc_ ([See the supported list](https://www.dji.com/flysafe/geo-map))
     */
    country: string;

    /**
     * Apparently only accepts 'total'
     */
    zones_mode: string;

    /**
     * Map View center point Longitude
     */
    lng: number;

    /**
     * Map View center point Latitude
     */
    lat: number;

    /**
     * Radius of the current view of the map
     */
    search_radius: number;
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
 * **_[interface]_** - Custom Language specified when creating a DjiGeozones
 */
interface Lang {
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
    },
    levels: {
        id: number;
        name: string;
        desc: string;
    }[],
    types: {
        id: number;
        name: string;
    }[]
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
    urlProxy?: string,
    /*
     * Drone id to be used as default in the API request
     */
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
    language?: 'en' | 'es'
    /**
     * Add custom translations. If this is provided, language will be ignored.
     */
    i18n?: Lang
}

export {
    Options,
    Drone,
    Lang
};
