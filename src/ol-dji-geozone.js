import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { transform, transformExtent } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { format, parse } from 'url';
import { getDistance } from 'ol/sphere';
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
 * @param {Object} opt_options Control options adding:
 * @param {Number} opt_options.zIndex zIndex of the OpenLayers layer
 * @param {String} opt_options.drone DJI API parameter
 * @param {String} opt_options.zones_mode DJI API parameter
 * @param {String} opt_options.country DJI API parameter
 * @param {String} opt_options.level DJI API parameter
 */
export default class DjiGeozone {

    constructor(map, opt_options = {}) {

        let z_index = opt_options.zIndex ? opt_options.zIndex : 5;
        this.drone = opt_options.drone ? opt_options.drone : DEFAULT_DRONE;
        this.zones_mode = opt_options.zones_mode ? opt_options.zones_mode : DEFAULT_ZONES_MODE;
        this.country = opt_options.country ? opt_options.country : DEFAULT_COUNTRY;
        this.level = opt_options.level ? opt_options.level : DEFAULT_LEVEL;

        this.map = map;

        this.view = map.getView();

        this.geodata = {};

        this.source = new VectorSource();

        this.layer = new VectorLayer({
            zIndex: z_index,
            name: 'ol-dji-geozone',
            source: this.source
        });

        this.projection = this.view.getProjection();

        map.addLayer(this.layer);

        this.addMapEvents();

        this.idRequest = 0;

    }

    addMapEvents() {

        const handleZoomEnd = () => {

            if (this.currentZoom < 8) {

                if (this.isVisible)
                    this.layer.setVisible(false);

                return;
            }


            if (!this.isVisible)
                this.layer.setVisible(true);

            // If the view is closer, don't do anything, we already had the features
            if (this.currentZoom > this.lastZoom)
                return;

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

        this.layer.on('change:visible', _ => this.isVisible = this.layer.getVisible());
    }


    apiResponseToGeojson(json) {
        return json;
    }

    addFeatures(geojson) {
        this.source.addFeatures(new GeoJSON().readFeatures(geojson));
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
        if (this.isValidDrone(drone))
            this.drone = drone;
        else
            console.error('Drone not supported');
    }

    get drone() {
        return this.drone;
    }

    static isValidDrone(drone) {
        return VALID_DRONES.includes(drone);
    }

    async getGeoData({ lng, lat }, searchRadius) {

        const requestUrl = parse(format({
            protocol: 'https',
            hostname: 'www-api.dji.com',
            pathname: '/api/geo/areas',
            query: {
                'drone': this.drone,
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
                    this.geodata = this.apiResponseToGeojson(parsedData);

                } catch (e) {
                    console.error(e.message);
                }
            });

        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });

    }

}