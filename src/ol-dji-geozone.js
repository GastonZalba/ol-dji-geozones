import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { transform, transformExtent } from 'ol/proj';
import { format, parse } from 'url';
import { getDistance } from 'ol/sphere';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import { Control } from 'ol/control';

import { get } from 'http';
import { colorWithAlpha } from './utils';

const MIN_ZOOM = 9; // lower zoom breaks the api

/**
 * OpenLayers DJI Geozone Layer.
 * See [the examples](./examples) for usage.
 * @constructor
 * @param {Object} map Class Map
 * @param {String} url_proxy Proxy 
 * @param {Object} opt_options Control options adding:
 * @param {Number} opt_options.zIndex zIndex of the OpenLayers layer
 * @param {String} opt_options.drone DJI API parameter
 * @param {String} opt_options.zonesMode DJI API parameter
 * @param {String} opt_options.country DJI API parameter
 * @param {Array} opt_options.level DJI API parameter
 * @param {Boolean} opt_options.addControl Add Open Layers Controller to the map
 */
export default class DjiGeozone {

    constructor(map, url_proxy, opt_options = {}) {

        // API PARAMETERS
        let z_index = opt_options.zIndex || 5;
        this._drone = opt_options.drone || 'spark';
        this.zones_mode = opt_options.zonesMode || 'total';
        this.country = opt_options.country || 'US';
        this.level = opt_options.level || [0, 1, 2, 3, 4, 6, 7];

        // MAP 
        let addControl = ('controller' in opt_options) ? opt_options.addControl : true;
        let targetControl = opt_options.targetControl || '';

        this.url_proxy = url_proxy || 'cors-anywhere.herokuapp.com';

        this.map = map;

        this.view = map.getView();

        this.isVisible = (this.view.getZoom() < MIN_ZOOM);

        this.geodata = {};

        this.source = new VectorSource({
            attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
        });

        this.layer = new VectorLayer({
            zIndex: z_index,
            name: 'ol-dji-geozone',
            source: this.source,
            style: this.style
        });

        map.addLayer(this.layer);

        this.projection = this.view.getProjection();

        if (addControl) this.addMapControl(targetControl);

        this.addMapEvents();

        this.idRequest = 0;

    }

    cleanFeatures() {
        this.source.clear();
    }

    setControlEnabled(enabled) {

        const changeState = (array) => {
            array.forEach(el => {
                if (enabled) {
                    el.removeAttribute('disabled');
                } else {
                    el.disabled = 'disabled';
                }
            });
        }

        changeState(this.divControl.querySelectorAll('input'));
        changeState(this.divControl.querySelectorAll('select'));

    }

    createDroneSelector() {

        const handleChange = ({ target }) => {
            this._drone = (target.value || target.options[target.selectedIndex].value);
            this.getData(/* clear = */ true);
        }

        // 2020/11
        const dronesList = [
            { value: "mavic-mini", name: "Mavic Mini" },
            { value: "mavic-2-enterprise", name: "Mavic 2 Enterprise" },
            { value: "mavic-2", name: "Mavic 2" },
            { value: "mavic-air", name: "Mavic Air" },
            { value: "mavic-air-2", name: "Mavic Air 2" },
            { value: "mavic-pro", name: "Mavic Pro" },
            { value: "spark", name: "Spark" },
            { value: "phantom-4-pro", name: "Phantom 4 Pro" },
            { value: "phantom-4-advanced", name: "Phantom 4 Advanced" },
            { value: "phantom-4", name: "Phantom 4" },
            { value: "phantom-4-rtk", name: "Phantom 4 RTK" },
            { value: "phantom-4-multispectral", name: "Phantom 4 Multispectral" },
            { value: "phantom-3-pro", name: "Phantom 3 Pro" },
            { value: "phantom-3-advanced", name: "Phantom 3 Advanced" },
            { value: "phantom-3-standard", name: "Phantom 3 Standard" },
            { value: "phantom-3-4K", name: "Phantom 3 4K" },
            { value: "phantom-3-se", name: "Phantom 3 SE" },
            { value: "inspire-2", name: "Inspire 2" },
            { value: "inspire-1-series", name: "Inspire 1 Series" },
            { value: "m200-series", name: "M200 Series" },
            { value: "m300-series", name: "M300 Series" },
            { value: "m600-series", name: "M600 Series" },
            { value: "m100", name: "M100" },
            { value: "mg1p", name: "MG 1S/1A/1P/1P RTK/T10/T16/T20/T30" },
            { value: "dji-mini-2", name: "DJI Mini 2" }
        ];

        let droneSelector = document.createElement('div');
        droneSelector.className = 'ol-dji-geozone--drone-selector';

        let select = document.createElement('select');

        if (!this.isVisible)
            select = 'disabled';

        select.onchange = handleChange;

        let options = '';
        dronesList.forEach(drone => {
            let selected = (this._drone === drone.value) ? 'selected' : '';
            options += `<option value=${drone.value} ${selected}>${drone.name}</option>`
        })

        select.innerHTML = options;

        droneSelector.append(select);

        return droneSelector;

    }

    createLevelSelector() {
        const handleClick = ({ target }) => {

            let value = Number(target.value);

            if (target.checked == true) {
                this.level = [...this.level, value];
            } else {
                let index = this.level.indexOf(value);
                if (index !== -1) {
                    this.level.splice(index, 1);
                }
            }

            this.getData(/* clear = */ true);
        }

        const createLegend = (color) => {
            let span = document.createElement('span');
            span.className = 'ol-dji-geozone--mark'
            span.style.border = `1px ${color} solid`;
            span.style.backgroundColor = colorWithAlpha(color, 0.4);
            return span;
        }

        const createLabel = (label, name) => {
            let labelEl = document.createElement('label');
            labelEl.htmlFor = name;
            labelEl.innerHTML = label;
            return labelEl;
        }

        const createButton = (name, value, disabled) => {
            let btn = document.createElement('input');
            btn.type = 'checkbox';
            btn.name = name;
            btn.id = name;
            btn.value = value;

            btn.onclick = handleClick;

            if (this.level.indexOf(value) !== -1)
                btn.checked = 'checked';

            if (disabled)
                btn.disabled = 'disabled';

            return btn;
        }

        const createLevelItem = (value, label, title, color) => {

            let disabled = !this.isVisible;

            let name = 'level' + value;
            let divContainer = document.createElement('div');
            divContainer.className = `ol-dji-geozone--item ol-dji-geozone--item-${value}`;
            divContainer.title = title;
            divContainer.setAttribute('data-level', value);
            divContainer.append(createButton(name, value, disabled));
            divContainer.append(createLegend(color));
            divContainer.append(createLabel(label, name));

            return divContainer;
        }

        let level2 = createLevelItem(2, 'Restricted Zones', 'In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.', '#DE4329');
        let level6 = createLevelItem(6, 'Altitude Zones', 'Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.', '#979797');
        let level1 = createLevelItem(1, 'Authorization Zones', 'In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.', '#1088F2');
        let level0 = createLevelItem(0, 'Warning Zones', ' In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace', '#FFCC00');
        let level3 = createLevelItem(3, 'Enhanced Warning Zones', ' In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.', '#EE8815');

        let level4 = createLevelItem(4, 'Regulatory Restricted Zones', ' Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example： Prison)', '#37C4DB');
        let level7 = createLevelItem(7, 'Recommended Zones', 'This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.', '#00BE00');

        let levelSelector = document.createElement('div');
        levelSelector.className = 'ol-dji-geozone--level-selector';

        levelSelector.append(level2);
        levelSelector.append(level6);
        levelSelector.append(level1);

        levelSelector.append(level0);
        levelSelector.append(level3);
        levelSelector.append(level4);
        levelSelector.append(level7);

        return levelSelector;

    }

    addMapControl(targetControl) {

        let divControl = document.createElement('div');
        divControl.className = 'ol-dji-geozone ol-control';
        divControl.innerHTML = `<div><h3>DJI Geozone</h3></div>`;

        let droneSelector = this.createDroneSelector();
        divControl.append(droneSelector);

        let levelSelector = this.createLevelSelector();
        divControl.append(levelSelector);

        this.divControl = divControl;

        let options = {
            element: divControl
        };

        if (targetControl) {
            options.target = target;
        }

        this.control = new Control(options)

        this.map.addControl(this.control);

    }

    style(feature, resolution) {

        const markerIcons = {
            '0': 'https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png',
            '1': 'https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png',
            '2': 'https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png',
            '3': 'https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png',
            '4': 'https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png',
            '5': '//www3.djicdn.com/assets/images/flysafe/geo-system/dark-green-marker-a45d865ea1fb9df5346ad5b06084d9ba.png?from=cdnMap', // level5 也是推荐区
            '6': 'https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png', // level 6为前端定义的限高区level
            '7': 'https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png',
            '8': 'https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png',
        };

        const markerCircles = {
            '0': '//www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap',
            '1': '//www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap',
            '2': '//www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap',
            '3': '//www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap',
            '4': '//www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap',
            '5': '//www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap',
            '6': '//www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap', // level 6为前端定义的限高区level
            '7': '//www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap',
            '8': 'https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png'
        };

        let geomType = feature.getGeometry().getType();

        let style;

        if (geomType === 'Polygon' || geomType === 'Circle') {

            let height = feature.get('height');
            let color = feature.get('color');

            style = new Style({
                fill: new Fill({
                    color: colorWithAlpha(color, 0.3)
                }),
                stroke: new Stroke({
                    color: color,
                    width: 1
                }),
                zIndex: height
            })

        } else if (geomType === 'Point') {
            style = new Style({
                image: new Icon({
                    src: markerIcons[feature.get('level')],
                    scale: 0.35,
                    anchor: [0.5, 0.9]
                }),
                zIndex: 300
            })
        }

        return style;

    }

    addMapEvents() {

        const handleZoomEnd = () => {

            if (this.currentZoom < MIN_ZOOM) {

                if (this.isVisible) {
                    this.layer.setVisible(false);
                    this.isVisible = false;
                    this.setControlEnabled(false);
                }

            } else {

                if (!this.isVisible) {
                    this.layer.setVisible(true);
                    this.isVisible = true;
                    this.setControlEnabled(true);
                } else {
                    // If the view is closer, don't do anything, we already had the features
                    if (this.currentZoom > this.lastZoom)
                        return;
                }

                this.getData();
            }

        }

        const handleDragEnd = () => {

            this.getData();

        }

        this.map.on('moveend', () => {

            this.currentZoom = this.view.getZoom();

            if (this.currentZoom !== this.lastZoom)
                handleZoomEnd();
            else
                handleDragEnd();

            this.lastZoom = this.currentZoom;

        });

    }


    apiResponseToFeatures(djiJson) {

        let areas = djiJson.areas;
        let features = [];

        if (!areas.length) return false;

        for (let area of areas) {

            if (this.source.getFeatureById(area.area_id)) {
                continue;
            }

            const feature = new Feature({
                name: area.name,
                shape: area.shape,
                level: area.level,
                radius: area.radius,
                color: area.color,
                country: area.country,
                geometry: new Point([area.lng, area.lat]).transform('EPSG:4326', this.projection)
            });

            feature.setId(area.area_id)

            if (area.sub_areas) {
                area.sub_areas.forEach(sub_area => {

                    let subFeature;

                    if (sub_area.polygon_points) {

                        subFeature = new Feature({
                            radius: sub_area.radius,
                            height: sub_area.height,
                            color: sub_area.color,
                            level: sub_area.level,
                            shape: sub_area.shape,
                            geometry: new Polygon(sub_area.polygon_points).transform('EPSG:4326', this.projection)
                        });


                    } else {

                        subFeature = new Feature({
                            radius: sub_area.radius,
                            height: sub_area.height,
                            color: sub_area.color,
                            level: sub_area.level,
                            shape: sub_area.shape,
                            geometry: new Circle(
                                [sub_area.lng, sub_area.lat],
                                sub_area.radius / 100000
                            ).transform('EPSG:4326', this.projection)
                        });

                    }

                    subFeature.setId(sub_area.area_id);
                    features.push(subFeature);

                })
            }

            features.push(feature);

        }

        return features;
    }

    addFeatures(features) {
        this.source.addFeatures(features);
    }

    // adapted from https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map
    getMapRadius(center) {
        let size = this.map.getSize();
        let extent = this.view.calculateExtent(size);
        extent = transformExtent(extent, this.projection, 'EPSG:4326');
        let posSW = [extent[0], extent[1]];
        center = transform(center, this.projection, 'EPSG:4326');
        let centerToSW = getDistance(center, posSW);

        return parseInt(centerToSW);
    }

    getData(clear = false) {

        if (!this.isVisible) return;

        let center = this.view.getCenter();
        let center4326 = transform(center, this.projection, 'EPSG:4326');

        let centerLatLng = {
            lat: center4326[1],
            lng: center4326[0]
        }

        let searchRadius = this.getMapRadius(center);

        // Prevent multiples requests
        this.idRequest += 1;
        let request = this.idRequest;

        // Original DJI map same behavior to prevent multiples requests
        setTimeout(async () => {

            if (request == this.idRequest) {
                try {
                    let data = await this.getGeoData(centerLatLng, searchRadius);
                    console.log(data);
                    if (clear) this.cleanFeatures();
                    let features = this.apiResponseToFeatures(data);
                    this.addFeatures(features);
                } catch (err) {
                    console.error(`Got error: ${e.message} `);
                }
            }

        }, 800);

    }

    set drone(drone) {
        if (DjiGeozone.isValidDrone(drone))
            this._drone = drone;
        else
            console.error('Drone not supported');
    }

    get drone() {
        return this._drone;
    }

    static isValidDrone(drone) {
        return VALID_DRONES.includes(drone);
    }

    async getGeoData({ lng, lat }, searchRadius) {

        const requestUrl = parse(format({
            protocol: 'https',
            hostname: this.url_proxy,
            pathname: '/www-api.dji.com/api/geo/areas',
            query: {
                'drone': this._drone,
                'zones_mode': this.zones_mode,
                'country': this.country,
                'level': this.level.join(),
                'lng': lng,
                'lat': lat,
                'search_radius': searchRadius
            }
        }));

        return new Promise((resolve, reject) => {

            get({
                hostname: requestUrl.hostname,
                path: requestUrl.path,
            }, (res) => {

                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                let error;
                // Any 2xx status code signals a successful response but
                // here we're only checking for 200.
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode} `);
                } else if (!/^application\/json/.test(contentType)) {
                    error = new Error('Invalid content-type.\n' +
                        `Expected application / json but received ${contentType} `);
                }

                if (error) {
                    // Consume response data to free up memory
                    res.resume();
                    reject(error);
                }

                res.setEncoding('utf8');

                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);
                        resolve(parsedData);
                    } catch (err) {
                        reject(err);
                    }
                });

            }).on('error', (err) => {
                reject(err);
            });
        })
    }

}