import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { transform, transformExtent } from 'ol/proj';
import { format, parse } from 'url';
import { getDistance } from 'ol/sphere';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import { asArray, asString } from 'ol/color';

import { get } from 'http';

const DEFAULT_DRONE = 'spark';
const DEFAULT_ZONES_MODE = 'total';
const DEFAULT_COUNTRY = 'US';
const DEFAULT_LEVEL = '1,2,4,7';

// 2020/11
const VALID_DRONES = [
    "mavic-mini", //  Mavic Mini
    "mavic-2-enterprise", //  Mavic 2 Enterprise
    "mavic-2", //  Mavic 2
    "mavic-air", // Mavic Air
    "mavic-air-2", // Mavic Air 2
    "mavic-pro", //  Mavic Pro
    "spark", // Spark
    "phantom-4-pro", //  Phantom 4 Pro
    "phantom-4-advanced", // Phantom 4 Advanced
    "phantom-4", // Phantom 4
    "phantom-4-rtk", //  Phantom 4 RTK
    "phantom-4-multispectral", //  Phantom 4 Multispectral
    "phantom-3-pro", //  Phantom 3 Pro
    "phantom-3-advanced", //  Phantom 3 Advanced
    "phantom-3-standard", //  Phantom 3 Standard
    "phantom-3-4K", //  Phantom 3 4K
    "phantom-3-se", //  Phantom 3 SE
    "inspire-2", //  Inspire 2
    "inspire-1-series", //  Inspire 1 Series
    "m200-series", //  M200 Series
    "m300-series", //  M300 Series
    "m600-series", //  M600 Series
    "m100", //  M100
    "mg1p", //  MG 1S/1A/1P/1P RTK/T10/T16/T20/T30
    "dji-mini-2" //  DJI Mini 2
];


/**
 * OpenLayers DJI Geozone Vector Layer.
 * See [the examples](./examples) for usage.
 * @constructor
 * @param {Object} map Class Map
 * @param {String} url_proxy Proxy 
 * @param {Object} opt_options Control options adding:
 * @param {Number} opt_options.zIndex zIndex of the OpenLayers layer
 * @param {String} opt_options.drone DJI API parameter
 * @param {String} opt_options.zones_mode DJI API parameter
 * @param {String} opt_options.country DJI API parameter
 * @param {String} opt_options.level DJI API parameter
 */
export default class DjiGeozone {

    constructor(map, url_proxy, opt_options = {}) {

        let z_index = opt_options.zIndex || 5;
        this._drone = opt_options.drone || DEFAULT_DRONE;
        this.zones_mode = opt_options.zones_mode || DEFAULT_ZONES_MODE;
        this.country = opt_options.country || DEFAULT_COUNTRY;
        this.level = opt_options.level || DEFAULT_LEVEL;
        this.url_proxy = url_proxy || 'cors-anywhere.herokuapp.com';

        this.map = map;

        this.view = map.getView();

        this.geodata = {};

        this.source = new VectorSource();

        this.layer = new VectorLayer({
            zIndex: z_index,
            name: 'ol-dji-geozone',
            source: this.source,
            style: this.style
        });

        this.projection = this.view.getProjection();

        map.addLayer(this.layer);

        this.addMapEvents();

        this.idRequest = 0;

        this.support_list = ["US", "CA", "MX", "DE", "FR", "GB", "IE", "IT", "ES", "BE", "NL", "LU", "DK", "CH", "PT", "AD", "AE", "CN"];

    }

    style(feature, resolution) {

        // https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color
        const colorWithAlpha = (color, alpha = 1) => {
            const [r, g, b] = Array.from(asArray(color));
            return asString([r, g, b, alpha]);
        }

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
        

        if (geomType === 'Polygon') {

            let color = feature.get('color');
            let height = feature.get('height');

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
                    src: markerIcons[feature.get('shape')],
                    scale: 0.3
                }),
                zIndex: 300
            })
        }

        return style;

    }

    addMapEvents() {

        const handleZoomEnd = () => {

            if (this.currentZoom < 9) {

                if (this.isVisible) {
                    this.layer.setVisible(false);
                    this.isVisible = false;
                }

                return;
            }


            if (!this.isVisible) {
                this.layer.setVisible(true);
                this.isVisible = true;
            } else {
                // If the view is closer, don't do anything, we already had the features
                if (this.currentZoom > this.lastZoom)
                    return;
            }

            this.getData();

        }

        const handleDragEnd = () => {

            if (!this.isVisible) return;

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
                shape: area.shape, // this defines the icon
                radius: area.radius,
                color: area.color,
                country: area.country,
                geometry: new Point([area.lng, area.lat])
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
                            shape: area.shape, // this defines the icon
                            geometry: new Polygon(sub_area.polygon_points)
                        });

                    } else {

                        subFeature = new Feature({
                            radius: sub_area.radius,
                            height: sub_area.height,
                            color: sub_area.color,
                            level: sub_area.level,
                            shape: area.shape, // this defines the icon
                            geometry: new Point([sub_area.lng, sub_area.lat])
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

    // https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map
    getMapRadius(center) {

        let size = this.map.getSize();
        let extent = this.view.calculateExtent(size);
        extent = transformExtent(extent, this.projection, 'EPSG:4326');
        let posSW = [extent[0], extent[1]];
        center = transform(center, this.projection, 'EPSG:4326');
        let centerToSW = getDistance(center, posSW);

        return parseInt(centerToSW);
    }

    getData() {

        let center = this.view.getCenter();
        let center4326 = transform(center, this.projection, 'EPSG:4326');

        let centerLatLng = {
            lat: center4326[1],
            lng: center4326[0]
        }

        let searchRadius = this.getMapRadius(center);

        this.idRequest += 1;

        let request = this.idRequest;

        // Original DJI map same behavior to prevent multiples requests
        setTimeout(() => {
            if (request == this.idRequest) this.getGeoData(centerLatLng, searchRadius)
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
                'level': this.level,
                'lng': lng,
                'lat': lat,
                'search_radius': searchRadius
            }
        }));

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
                    `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }
            if (error) {
                console.error(error.message);
                // Consume response data to free up memory
                res.resume();
                return;
            }

            res.setEncoding('utf8');

            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    console.log(parsedData);
                    let features = this.apiResponseToFeatures(parsedData);
                    this.addFeatures(features);

                } catch (e) {
                    console.error(e);
                }
            });

        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

    }

}