(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/Overlay'), require('ol/proj'), require('ol/sphere'), require('ol/geom'), require('ol/style'), require('ol/control'), require('ol/color'), require('ol/geom/Polygon'), require('ol/extent')) :
    typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/Overlay', 'ol/proj', 'ol/sphere', 'ol/geom', 'ol/style', 'ol/control', 'ol/color', 'ol/geom/Polygon', 'ol/extent'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozones = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.Overlay, global.ol.proj, global.ol.sphere, global.ol.geom, global.ol.style, global.ol.control, global.ol.color, global.ol.geom.Polygon, global.ol.extent));
}(this, (function (VectorLayer, VectorSource, Feature, Overlay, proj, sphere, geom, style, control, color, Polygon, extent) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var VectorLayer__default = /*#__PURE__*/_interopDefaultLegacy(VectorLayer);
    var VectorSource__default = /*#__PURE__*/_interopDefaultLegacy(VectorSource);
    var Feature__default = /*#__PURE__*/_interopDefaultLegacy(Feature);
    var Overlay__default = /*#__PURE__*/_interopDefaultLegacy(Overlay);

    var levelsParams = [
    	{
    		id: 0,
    		color: "#FFCC00",
    		zIndex: 1,
    		markerIcon: "https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png",
    		markerCircle: "https://www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap"
    	},
    	{
    		id: 1,
    		color: "#1088F2",
    		zIndex: 3,
    		markerIcon: "https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png",
    		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap"
    	},
    	{
    		id: 2,
    		color: "#DE4329",
    		zIndex: 5,
    		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
    		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    	},
    	{
    		id: 3,
    		color: "#EE8815",
    		zIndex: 2,
    		markerIcon: "https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png",
    		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap"
    	},
    	{
    		id: 4,
    		color: "#37C4DB",
    		zIndex: 1,
    		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    	},
    	{
    		id: 5,
    		color: "#00BE00",
    		zIndex: 1,
    		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    		markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    	},
    	{
    		id: 6,
    		color: "#979797",
    		zIndex: 0,
    		markerIcon: "https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png",
    		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap"
    	},
    	{
    		id: 7,
    		color: "#00BE00",
    		zIndex: 1,
    		markerIcon: "https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
    		markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
    	},
    	{
    		id: 8,
    		color: "#00BE00",
    		zIndex: 1,
    		markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    		markerCircle: "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
    	},
    	{
    		id: 9,
    		color: "#DE4329",
    		zIndex: 5,
    		markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
    		markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    	}
    ];

    var dronesList = [
    	{
    		id: "mavic-mini",
    		name: "Mavic Mini"
    	},
    	{
    		id: "mavic-2-enterprise",
    		name: "Mavic 2 Enterprise"
    	},
    	{
    		id: "mavic-2",
    		name: "Mavic 2"
    	},
    	{
    		id: "mavic-air",
    		name: "Mavic Air"
    	},
    	{
    		id: "mavic-air-2",
    		name: "Mavic Air 2"
    	},
    	{
    		id: "mavic-pro",
    		name: "Mavic Pro"
    	},
    	{
    		id: "spark",
    		name: "Spark"
    	},
    	{
    		id: "phantom-4-pro",
    		name: "Phantom 4 Pro"
    	},
    	{
    		id: "phantom-4-advanced",
    		name: "Phantom 4 Advanced"
    	},
    	{
    		id: "phantom-4",
    		name: "Phantom 4"
    	},
    	{
    		id: "phantom-4-rtk",
    		name: "Phantom 4 RTK"
    	},
    	{
    		id: "phantom-4-multispectral",
    		name: "Phantom 4 Multispectral"
    	},
    	{
    		id: "phantom-3-pro",
    		name: "Phantom 3 Pro"
    	},
    	{
    		id: "phantom-3-advanced",
    		name: "Phantom 3 Advanced"
    	},
    	{
    		id: "phantom-3-standard",
    		name: "Phantom 3 Standard"
    	},
    	{
    		id: "phantom-3-4K",
    		name: "Phantom 3 4K"
    	},
    	{
    		id: "phantom-3-se",
    		name: "Phantom 3 SE"
    	},
    	{
    		id: "inspire-2",
    		name: "Inspire 2"
    	},
    	{
    		id: "inspire-1-series",
    		name: "Inspire 1 Series"
    	},
    	{
    		id: "m200-series",
    		name: "M200 Series"
    	},
    	{
    		id: "m300-series",
    		name: "M300 Series"
    	},
    	{
    		id: "m600-series",
    		name: "M600 Series"
    	},
    	{
    		id: "m100",
    		name: "M100"
    	},
    	{
    		id: "mg1p",
    		name: "MG 1S/1A/1P/1P RTK/T10/T16/T20/T30"
    	},
    	{
    		id: "dji-mini-2",
    		name: "DJI Mini 2"
    	}
    ];

    var es = {
    	levels: [
    		{
    			id: 0,
    			name: "Warning Zones",
    			desc: "In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace"
    		},
    		{
    			id: 1,
    			name: "Authorization Zones",
    			desc: "In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account."
    		},
    		{
    			id: 2,
    			name: "Restricted Zones",
    			desc: "In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking."
    		},
    		{
    			id: 3,
    			name: "Enhanced Warning Zones",
    			desc: "In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight."
    		},
    		{
    			id: 4,
    			name: "Regulatory Restricted Zones",
    			desc: "Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)"
    		},
    		{
    			id: 5,
    			name: "Recommended Zones",
    			desc: ""
    		},
    		{
    			id: 6,
    			name: "Altitude Zones",
    			desc: "Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited."
    		},
    		{
    			id: 7,
    			name: "Recommended Zones",
    			desc: "This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements."
    		},
    		{
    			id: 8,
    			name: "Approved Zones for Light UAVs(China)",
    			desc: "For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off"
    		},
    		{
    			id: 9,
    			name: "Densely Populated Area",
    			desc: "This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)"
    		}
    	],
    	types: [
    		{
    			id: 0,
    			name: "Aeropuerto"
    		},
    		{
    			id: 1,
    			name: "Zona especial"
    		},
    		{
    			id: 2,
    			name: "Zona Militar"
    		},
    		{
    			id: 4,
    			name: "Zona recomendada"
    		},
    		{
    			id: 10,
    			name: "Aeropuerto"
    		},
    		{
    			id: 13,
    			name: "Aeropuerto recreacional"
    		},
    		{
    			id: 14,
    			name: "Aeropuerto recreacional"
    		},
    		{
    			id: 15,
    			name: "Espacio aéreo clase B"
    		},
    		{
    			id: 16,
    			name: "Espacio aéreo clase C"
    		},
    		{
    			id: 17,
    			name: "Espacio aéreo clase D"
    		},
    		{
    			id: 18,
    			name: "Espacio aéreo clase E"
    		},
    		{
    			id: 19,
    			name: "Helipuerto"
    		},
    		{
    			id: 23,
    			name: "Planta de energía"
    		},
    		{
    			id: 24,
    			name: "Prisión"
    		},
    		{
    			id: 26,
    			name: "Estadio"
    		},
    		{
    			id: 27,
    			name: "Espacio aéreo prohibido"
    		},
    		{
    			id: 28,
    			name: "Espacio aéreo restringido"
    		},
    		{
    			id: 29,
    			name: "Restricción temporal de vuelo"
    		},
    		{
    			id: 30,
    			name: "Planta de energía nuclear"
    		},
    		{
    			id: 31,
    			name: "Unpaved Airports"
    		},
    		{
    			id: 32,
    			name: "Zonas especiales"
    		},
    		{
    			id: 33,
    			name: "Zonas militares"
    		},
    		{
    			id: 34,
    			name: "Helipuerto"
    		},
    		{
    			id: 35,
    			name: "Seaplane Base"
    		},
    		{
    			id: 36,
    			name: "Temporary Flight Restriction"
    		},
    		{
    			id: 39,
    			name: "Approved Zones for Light UAVs"
    		},
    		{
    			id: 41,
    			name: "Regulatory Restricted Zones for Light UAVs"
    		}
    	]
    };
    var en = {
    	levels: [
    		{
    			id: 0,
    			name: "Warning Zones",
    			desc: "In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace"
    		},
    		{
    			id: 1,
    			name: "Authorization Zones",
    			desc: "In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account."
    		},
    		{
    			id: 2,
    			name: "Restricted Zones",
    			desc: "In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking."
    		},
    		{
    			id: 3,
    			name: "Enhanced Warning Zones",
    			desc: "In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight."
    		},
    		{
    			id: 4,
    			name: "Regulatory Restricted Zones",
    			desc: "Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)"
    		},
    		{
    			id: 5,
    			name: "Recommended Zones",
    			desc: ""
    		},
    		{
    			id: 6,
    			name: "Altitude Zones",
    			desc: "Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited."
    		},
    		{
    			id: 7,
    			name: "Recommended Zones",
    			desc: "This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements."
    		},
    		{
    			id: 8,
    			name: "Approved Zones for Light UAVs(China)",
    			desc: "For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off"
    		},
    		{
    			id: 9,
    			name: "Densely Populated Area",
    			desc: "This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)"
    		}
    	],
    	types: [
    		{
    			id: 0,
    			name: "Airport"
    		},
    		{
    			id: 1,
    			name: "Special Zone"
    		},
    		{
    			id: 2,
    			name: "Military Zone"
    		},
    		{
    			id: 4,
    			name: "Recommended Zones"
    		},
    		{
    			id: 10,
    			name: "Airport"
    		},
    		{
    			id: 13,
    			name: "Recreational airport"
    		},
    		{
    			id: 14,
    			name: "Recreational airport"
    		},
    		{
    			id: 15,
    			name: "Class B Airspace"
    		},
    		{
    			id: 16,
    			name: "Class C Airspace"
    		},
    		{
    			id: 17,
    			name: "Class D Airspace"
    		},
    		{
    			id: 18,
    			name: "Class E Airspace"
    		},
    		{
    			id: 19,
    			name: "Heliport"
    		},
    		{
    			id: 23,
    			name: "Power plant"
    		},
    		{
    			id: 24,
    			name: "Prison"
    		},
    		{
    			id: 26,
    			name: "Stadium"
    		},
    		{
    			id: 27,
    			name: "Prohibited Airspace"
    		},
    		{
    			id: 28,
    			name: "Restricted Airspace"
    		},
    		{
    			id: 29,
    			name: "Temporary Flight Restriction"
    		},
    		{
    			id: 30,
    			name: "Nuclear Power Plant"
    		},
    		{
    			id: 31,
    			name: "Unpaved Airports"
    		},
    		{
    			id: 32,
    			name: "Special Zones"
    		},
    		{
    			id: 33,
    			name: "Military Zones"
    		},
    		{
    			id: 34,
    			name: "Heliport"
    		},
    		{
    			id: 35,
    			name: "Seaplane Base"
    		},
    		{
    			id: 36,
    			name: "Temporary Flight Restriction"
    		},
    		{
    			id: 39,
    			name: "Approved Zones for Light UAVs"
    		},
    		{
    			id: 41,
    			name: "Regulatory Restricted Zones for Light UAVs"
    		}
    	]
    };
    var languages = {
    	es: es,
    	en: en
    };

    var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }

      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }

        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }

        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    /**
     * @protected
     */

    var API_AREAS_ENDPOINT = 'www-api.dji.com/api/geo/areas';
    var API_INFO_ENDPOINT = 'www-api.dji.com/api/geo/point-info';
    var API_LEVELS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // request all the levels, we filter later to avoid some api problems

    var MIN_ZOOM = 9; // < 9 breaks the API

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

    class DjiGeozones {
      constructor(map, url_proxy, opt_options) {
        var options = Object.assign({}, opt_options);
        this.language = options.language || 'en'; // API PARAMETERS

        this.drone = options.drone || 'spark';
        this.zones_mode = options.zonesMode || 'total';
        this.country = options.country || 'US';
        this.levelsToDisplay = options.levelsToDisplay || [2, 6, 1, 0, 3, 4, 7];
        this.levelsActive = options.levelsActive || [2, 6, 1, 0, 3, 4, 7];
        this.levelsTextsList = options.levelsTexts || languages[this.language].levels;
        this.levelsParamsList = !options.levelParams ? levelsParams : Object.assign(Object.assign({}, levelsParams), options.levelParams); // If not provided, we use all the available drones
        // This can be passed to use translations.

        this.dronesList = options.dronesList || dronesList; // If not provided, use the default types values.
        // This can be passed to use translations.

        this.typesTextsList = options.typesTexts || languages[this.language].types;
        this.extent = options.extent || null; // Add slash on the end if not present

        this.url_proxy = url_proxy.replace(/\/?$/, '/');
        this.loadingElement = options.loadingElement || '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        this.clickEvent = options.clickEvent || 'singleclick'; // By default, we use the properties features to show in the popup.
        // The official DJI map, makes an extra request to another API to get the data. I don't understand why.
        // It's more slow and requieres extra requests to an already downloaded data...
        // Either way, this extra API calls are supported if you want.

        this.useApiForPopUp = false; // MAP

        var showPanel = 'showPanel' in options ? options.showPanel : true;
        var targetPanel = options.targetPanel || null;
        this.map = map;
        this.view = map.getView();
        this.projection = this.view.getProjection();
        this.isVisible = this.view.getZoom() < MIN_ZOOM;
        this.vectorLayers = [];
        this.divControl = null;
        this.areaDownloaded = null;
        this.init(showPanel, targetPanel);
      }

      init(showPanel, targetControl) {
        /**
         * Create and add a Vector Layer for each level
         * @private
         */
        var createVectorLayers = () => {
          /**
           * Create the style of each layer acoording to the geometry,
           * level, and color obtained from the API
           *
           * @param feature
           * @private
           */
          var styleFunction = feature => {
            var geomType = feature.getGeometry().getType();
            var level = feature.get('level');
            var levelParams = this.getLevelParamsById(level);
            var style$1;

            if (geomType === 'Polygon' || geomType === 'Circle') {
              var color = feature.get('color');
              style$1 = new style.Style({
                fill: new style.Fill({
                  color: DjiGeozones.colorWithAlpha(color, 0.3)
                }),
                stroke: new style.Stroke({
                  color: color,
                  width: 1
                }),
                zIndex: levelParams.zIndex
              });
            } else if (geomType === 'Point') {
              style$1 = new style.Style({
                image: new style.Icon({
                  src: levelParams.markerIcon,
                  scale: 0.35,
                  anchor: [0.5, 0.9]
                }),
                zIndex: levelParams.zIndex * 2
              });
            }

            return style$1;
          };

          API_LEVELS.forEach(level => {
            var layer = new VectorLayer__default['default']({
              zIndex: this.getLevelParamsById(level).zIndex * 2,
              visible: this.levelsActive.includes(level) ? true : false,
              source: new VectorSource__default['default']({
                attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
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


        var createPopUpOverlay = () => {
          var popupContainer = document.createElement('div');
          popupContainer.id = 'ol-dji-geozones--popup';
          popupContainer.className = 'ol-popup ol-dji-geozones--ol-popup';
          this.popupContent = document.createElement('div');
          this.popupContent.id = 'ol-dji-geozones--popup-content';
          this.popupContent.className = 'ol-dji-geozones--ol-popup-content';
          var popupCloser = document.createElement('a');
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
          this.overlay = new Overlay__default['default']({
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


        var addMapControl = targetPanel => {
          var createDroneSelector = () => {
            var handleChange = (_ref) => {
              var {
                target
              } = _ref;
              this.drone = target.value || target.options[target.selectedIndex].value;
              this.getInfoFromView(
              /* clear = */
              true);
            };

            var droneSelector = document.createElement('div');
            droneSelector.className = 'ol-dji-geozones--drone-selector';
            var select = document.createElement('select');
            select.onchange = handleChange;
            if (!this.isVisible) select.setAttribute('disabled', 'disabled');
            var options = '';
            this.getDrones().forEach(drone => {
              var selected = this.drone === drone.id ? 'selected' : '';
              options += "<option value=\"".concat(drone.id, "\" ").concat(selected, ">").concat(drone.name, "</option>");
            });
            select.innerHTML = options;
            droneSelector.append(select);
            return droneSelector;
          };

          var createLevelSelector = () => {
            var handleClick = (_ref2) => {
              var {
                target
              } = _ref2;
              var level = Number(target.value);

              if (target.checked) {
                this.addLevels(level);
              } else {
                this.removeLevels(level);
              }
            };

            var createLegend = color => {
              var span = document.createElement('span');
              span.className = 'ol-dji-geozones--mark';
              span.style.border = "1px ".concat(color, " solid");
              span.style.backgroundColor = DjiGeozones.colorWithAlpha(color, 0.4);
              return span;
            };

            var createLabel = (label, name, color) => {
              var labelEl = document.createElement('label');
              labelEl.htmlFor = name;
              labelEl.append(createLegend(color));
              labelEl.append(label);
              return labelEl;
            };

            var createCheckbox = (name, value, disabled) => {
              var checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.name = name;
              checkbox.id = name;
              checkbox.value = String(value);
              checkbox.onclick = handleClick;
              if (this.levelsActive.indexOf(value) !== -1) checkbox.checked = true;
              if (disabled) checkbox.disabled = true;
              return checkbox;
            };

            var createLevelItem = (value, _ref3) => {
              var {
                name,
                desc,
                color
              } = _ref3;
              var disabled = !this.isVisible;
              var id = 'level' + value;
              var divContainer = document.createElement('div');
              divContainer.className = "ol-dji-geozones--item-ctl ol-dji-geozones--item-ctl-".concat(value);
              divContainer.title = desc; // divContainer.setAttribute('style', `--level-color: ${color}`);
              // divContainer.setAttribute('data-geotooltip', desc);

              divContainer.setAttribute('data-level', String(value));
              divContainer.append(createCheckbox(id, value, disabled));
              divContainer.append(createLabel(name, id, color));
              return divContainer;
            };

            var levelSelector = document.createElement('div');
            levelSelector.className = 'ol-dji-geozones--level-selector';
            this.levelsToDisplay.forEach(lev => {
              var level = createLevelItem(lev, this.getLevelById(lev));
              levelSelector.append(level);
            });
            return levelSelector;
          };

          var divControl = document.createElement('div');
          divControl.className = 'ol-dji-geozones ol-control ol-dji-geozones--ctrl-disabled';
          divControl.innerHTML = "\n            <div>\n                <h3>DJI Geo Zones</h3>\n                <span class=\"ol-dji-geozones--loading\">\n                    ".concat(this.loadingElement, "\n                </span>\n                <span class=\"ol-dji-geozones--advice\">(Zoom in)</span>\n            </div>");
          var droneSelector = createDroneSelector();
          divControl.append(droneSelector);
          var levelSelector = createLevelSelector();
          divControl.append(levelSelector);
          this.divControl = divControl;
          var options = {
            element: divControl,
            target: null
          };

          if (targetPanel) {
            options.target = targetPanel;
          }

          this.control = new control.Control(options);
          this.map.addControl(this.control);
        };
        /**
         * @private
         */


        var addMapEvents = () => {
          /**
           * Enable or disable the inputs and the select in the control
           * @private
           */
          var setControlEnabled = enabled => {
            if (!this.divControl) return;

            var changeState = array => {
              array.forEach(el => {
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

            var inputs = this.divControl.querySelectorAll('input');
            changeState(inputs);
            var selects = this.divControl.querySelectorAll('select');
            changeState(selects);
          };

          var handleZoomEnd = () => {
            var setVisible = bool => {
              this.vectorLayers.forEach(layer => {
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

          var handleDragEnd = () => {
            if (!this.isVisible) return;
            this.getInfoFromView();
          };

          var clickHandler = evt => {
            var type = this.useApiForPopUp ? 'useApiForPopUp' : 'useFeaturesForPopUp';
            this.getPointInfoFromClick(evt, type);
          };

          this.map.on('moveend', () => {
            this.currentZoom = this.view.getZoom();
            if (this.currentZoom !== this.lastZoom) handleZoomEnd();else handleDragEnd();
            this.lastZoom = this.currentZoom;
          });
          this.map.on(this.clickEvent, clickHandler);
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


      getPointInfoFromClick(evt, type) {
        return __awaiter(this, void 0, void 0, function* () {
          var infoKeys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description'];
          var idInfoRequest = 0;

          var getInfoFromApiLatLng = coordinate => __awaiter(this, void 0, void 0, function* () {
            // Prevent multiples requests
            idInfoRequest += 1;
            var request = idInfoRequest;
            return new Promise(resolve => {
              setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (request !== idInfoRequest) return;
                var center4326 = proj.transform(coordinate, this.projection, 'EPSG:4326');
                var clickLatLng = {
                  lat: center4326[1],
                  lng: center4326[0]
                };
                var apiJson = yield this.getApiGeoData('info', clickLatLng);
                var areas = apiJson.areas;
                if (!areas.length) resolve(false);
                var featuresProps = [];

                for (var area of areas) {
                  featuresProps.push(area);
                }

                resolve(featuresProps);
              }), 100);
            });
          });
          /**
           *
           * @param features
           * @private
           */


          var getInfoFromFeatures = features => {
            var featuresProps = [];
            features.forEach(feature => {
              var props = {};
              infoKeys.forEach(key => props[key] = feature.get(key));
              featuresProps.push(props);
            });
            return featuresProps;
          };

          var showGeozoneDataInPopUp = (geozonesData, coordinates) => {
            var createTooltip = levelParams => {
              var svg = "\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"768\" height=\"768\" viewBox=\"0 0 768 768\">\n                <path d=\"M352.5 288v-64.5h63v64.5h-63zM384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM352.5 544.5v-192h63v192h-63z\"></path>\n                </svg>";
              var infoTooltip = document.createElement('span');
              infoTooltip.className = 'ol-dji-geozones--info';
              infoTooltip.innerHTML = levelParams.desc;
              infoTooltip.setAttribute('style', "--level-color: ".concat(levelParams.color));
              var iconTooltip = document.createElement('span');
              iconTooltip.className = 'ol-dji-geozones--icon';
              iconTooltip.innerHTML = svg;

              iconTooltip.onmouseover = () => {
                infoTooltip.style.position = 'fixed';
                infoTooltip.style.top = iconTooltip.getBoundingClientRect().top + 'px';
                infoTooltip.classList.add('ol-dji-geozones--active-tooltip');
              };

              iconTooltip.onmouseout = () => {
                infoTooltip.classList.remove('ol-dji-geozones--active-tooltip');
              };

              var container = document.createElement('div');
              container.className = 'ol-dji-geozones--tooltip';
              container.append(iconTooltip);
              container.append(infoTooltip);
              return container;
            };

            var parseDataToHtml = (_ref4) => {
              var {
                name,
                level,
                type,
                height,
                description,
                begin_at,
                end_at,
                address,
                url
              } = _ref4;
              var levelParams = this.getLevelById(level);
              var html = "\n                    <div class=\"ol-dji-geozones--marker\">\n                        <img src=\"".concat(levelParams.markerCircle, "\">\n                    </div>\n                    <div class=\"ol-dji-geozones--main\">\n                        <h3 class=\"ol-dji-geozones--title\">").concat(name, "</h3>\n                        <p class=\"ol-dji-geozones--level\">Level: ").concat(levelParams.name, " </p>\n                        <p class=\"ol-dji-geozones--type\">Type: ").concat(this.getGeozoneTypeById(type).name, "</p>\n                        ").concat(begin_at ? "<p class=\"ol-dji-geozones--start_time\">End Time: ".concat(begin_at, "</p>") : '', "\n                        ").concat(end_at ? "<p class=\"ol-dji-geozones--end_time\">End Time: ".concat(end_at, "</p><p class=\"ol-dji-geozones--time_tips\">Time: 24-hour clock</p>") : '', "         \n                        ").concat(height ? "<p class=\"ol-dji-geozones--height\">Max. Altitude (m): ".concat(height, "</p>") : '', " \n                        ").concat(address ? "<p class=\"ol-dji-geozones--address\">Address: ".concat(address, "</p>") : '', "\n                        ").concat(description ? "<p class=\"ol-dji-geozones--desc\">Tips: ".concat(description, "</p>") : '', "\n                        ").concat(url ? "<p class=\"ol-dji-geozones--url\">Link: <a href=\"".concat(url, "\">Learn More</a></p>") : '', "\n                </div>");
              var item = document.createElement('div');
              item.className = 'ol-dji-geozones--item';
              item.innerHTML = html;
              item.querySelector('.ol-dji-geozones--level').append(createTooltip(levelParams));
              return item;
            };

            var preventDuplicates = [];
            var arrGeozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];
            this.popupContent.innerHTML = '';
            arrGeozonesData.forEach(geozoneProps => {
              var element = parseDataToHtml(geozoneProps); // The oficial DJI map show duplicates, but we don't want that

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

            var opt_options = {
              layerFilter: layer => layer.get('name') === 'ol-dji-geozones'
            };
            var data; // Call the API  to download the information

            if (type === 'useApiForPopUp') {
              if (this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {
                this.popupContent.innerHTML = this.loadingElement.toString();
                this.overlay.setPosition(evt.coordinate);
                data = yield getInfoFromApiLatLng(evt.coordinate);
              } // Use the previously downloaded features information

            } else {
              var features = this.map.getFeaturesAtPixel(evt.pixel, opt_options);
              data = getInfoFromFeatures(features);
            }

            if (data && data.length) showGeozoneDataInPopUp(data, evt.coordinate);else this.overlay.setPosition(undefined);
          } catch (err) {
            console.log(err);
          }
        });
      }
      /**
       *
       * @param clear
       * @private
       */


      getInfoFromView() {
        var _this = this;

        var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var idAreasRequest = 0;
        /**
         * The level parameter returned by the API is wrong, so wee need to fixed using the color
         * @param feature
         * @private
         */

        var fixLevelValue = feature => {
          var color = feature.get('color');
          var level = Object.keys(this.levelsParamsList).find(key => this.levelsParamsList[key].color === color);
          feature.set('level', level);
          return feature;
        };
        /**
         * Parse the json response of the API an create Open Layers features.
         * @param djiJson
         * @private
         */


        var apiResponseToFeatures = djiJson => {
          /**
           *
           * @param id
           * @private
           */
          var getFeatureById = id => {
            var feature;

            for (var layer of this.vectorLayers) {
              feature = layer.getSource().getFeatureById(id);
              if (feature) break;
            }

            return feature;
          };

          var areas = djiJson.areas;
          if (!areas || !areas.length) return false;
          var features = [];

          var _loop = function _loop(area) {
            // If the feature already exists, continue
            if (getFeatureById(area.area_id)) {
              return "continue";
            }

            var featureProps = {
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
            }; // Only a few of "areas" come with polygons

            if (area.polygon_points) {
              var featureExtra = new Feature__default['default'](Object.assign(Object.assign({}, featureProps), {
                geometry: new geom.Polygon(area.polygon_points).transform('EPSG:4326', _this.projection)
              }));
              featureExtra.setId(area.area_id + '_poly');
              features.push(fixLevelValue(featureExtra));
            }

            var feature = new Feature__default['default'](Object.assign(Object.assign({}, featureProps), {
              geometry: new geom.Point([area.lng, area.lat]).transform('EPSG:4326', _this.projection)
            })); // Store the id to avoid duplicates

            feature.setId(area.area_id);
            features.push(fixLevelValue(feature));

            if (area.sub_areas) {
              area.sub_areas.forEach(sub_area => {
                var subFeature;

                if (sub_area.polygon_points) {
                  subFeature = new Feature__default['default']({
                    color: sub_area.color,
                    height: sub_area.height,
                    level: sub_area.level,
                    name: area.name,
                    radius: sub_area.radius,
                    shape: sub_area.shape,
                    type: area.type,
                    lng: sub_area.lng,
                    lat: sub_area.lat,
                    geometry: new geom.Polygon(sub_area.polygon_points).transform('EPSG:4326', _this.projection)
                  });
                } else {
                  subFeature = new Feature__default['default']({
                    color: sub_area.color,
                    height: sub_area.height,
                    level: sub_area.level,
                    name: area.name,
                    radius: sub_area.radius,
                    shape: sub_area.shape,
                    type: area.type,
                    lng: sub_area.lng,
                    lat: sub_area.lat,
                    geometry: new geom.Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', _this.projection)
                  });
                }

                subFeature.setId(sub_area.area_id);
                features.push(fixLevelValue(subFeature));
              });
            }
          };

          for (var area of areas) {
            var _ret = _loop(area);

            if (_ret === "continue") continue;
          }

          return features;
        };
        /**
         *
         * @param features
         * @private
         */


        var addFeaturesToEachLevel = features => {
          if (!features) return;
          features.forEach(feature => {
            var level = feature.get('level');
            var layer = this.getLayerByLevel(level);
            layer.getSource().addFeature(feature);
          });
        };
        /**
         * Show/hide the loading in the control
         * @param {Boolean} bool
         * @private
         */


        var showLoading = bool => {
          if (!this.divControl) return;
          if (bool) this.divControl.classList.add('ol-dji-geozones--isLoading');else this.divControl.classList.remove('ol-dji-geozones--isLoading');
        };
        /**
         * Clear all the elements in the Dji Geozones layers
         * @private
         */


        var clearFeatures = () => {
          this.vectorLayers.forEach(layer => {
            layer.getSource().clear();
          });
        }; // Prevent multiples requests


        idAreasRequest += 1;
        var request = idAreasRequest; // Original DJI map same behavior to prevent multiples requests

        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
          if (request !== idAreasRequest) return;

          try {
            showLoading(true);
            var center = this.view.getCenter();
            var center4326 = proj.transform(center, this.projection, 'EPSG:4326');
            var viewLatLng = {
              lat: center4326[1],
              lng: center4326[0]
            };

            if (clear) {
              this.areaDownloaded = null; // Remove area already downloaded
            }

            var data = yield this.getApiGeoData('areas', viewLatLng);
            if (!data) throw new Error();
            if (clear) clearFeatures();
            var features = apiResponseToFeatures(data);
            addFeaturesToEachLevel(features);
            showLoading(false); // console.log(data);
          } catch (err) {
            if (err.message) console.error(err);
            showLoading(false);
          }
        }), 300);
      }
      /**
       * Controller for the API rquests.
       */


      getApiGeoData(typeApiRequest, latLng) {
        return __awaiter(this, void 0, void 0, function* () {
          var apiRequest = (typeApiRequest, _ref5, searchRadius) => {
            var {
              lng,
              lat
            } = _ref5;
            return __awaiter(this, void 0, void 0, function* () {
              var api_endpoint = typeApiRequest === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT; // If not proxy is passed, make a direct request
              // Maybe in the future the api will has updated CORS restrictions

              var url = new URL(this.url_proxy ? this.url_proxy + api_endpoint : api_endpoint);
              var queryObj = {
                drone: this.drone,
                zones_mode: this.zones_mode,
                country: this.country,
                level: API_LEVELS,
                lng: lng,
                lat: lat,
                search_radius: searchRadius
              };
              Object.keys(queryObj).forEach(key => url.searchParams.append(key, queryObj[key]));
              var response = yield fetch(url.toString());
              if (!response.ok) throw new Error('HTTP-Error: ' + response.status);
              return yield response.json();
            });
          };

          var getPointInfo = (latLng, searchRadius) => __awaiter(this, void 0, void 0, function* () {
            var data = yield apiRequest('info', latLng, searchRadius);
            return data;
          });

          var getAreas = (centerLatLng, searchRadius) => __awaiter(this, void 0, void 0, function* () {
            var extent$1 = this.view.calculateExtent();
            var polygon = Polygon.fromExtent(extent$1);

            if (this.areaDownloaded) {
              if (this.areaDownloaded.intersectsCoordinate(extent.getCenter(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getBottomLeft(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getTopRight(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getBottomRight(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getTopLeft(extent$1))) {
                // whe already have the data, do nothing
                return;
              }

              this.areaDownloaded.appendPolygon(polygon);
            } else {
              this.areaDownloaded = new geom.MultiPolygon([polygon.getCoordinates()]);
            }

            var data = yield apiRequest('areas', centerLatLng, searchRadius);
            return data;
          });

          var getMapRadius = (_ref6) => {
            var {
              lng,
              lat
            } = _ref6;
            var center = [lng, lat];
            var size = this.map.getSize();
            var extent = this.view.calculateExtent(size);
            extent = proj.transformExtent(extent, this.projection, 'EPSG:4326');
            var posSW = [extent[0], extent[1]];
            var centerToSW = sphere.getDistance(center, posSW);
            return parseInt(String(centerToSW));
          };

          if (!this.isVisible) return;
          var searchRadius = getMapRadius(latLng);
          var data;

          if (typeApiRequest === 'areas') {
            data = yield getAreas(latLng, searchRadius);
          } else {
            data = yield getPointInfo(latLng, searchRadius);
          }

          return data;
        });
      }
      /**
       * Show or hides the control
       * @param visible
       */


      setControlVisible(visible) {
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


      getLayers() {
        return this.vectorLayers;
      }
      /**
       * Get the layer acordding the level
       * @param level
       */


      getLayerByLevel(level) {
        var find;

        for (var layer of this.vectorLayers) {
          if (layer.get('level') != undefined && layer.get('level') == level) {
            find = layer;
            break;
          }
        }

        return find;
      }
      /**
       * Get the parameters from all the levels
       */


      getLevelsParams() {
        return this.levelsParamsList;
      }
      /**
       * Get the level parameters, like color, icon, and description
       * @param id
       */


      getLevelParamsById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.levelsParamsList.find(lev => lev.id == id);
      }

      getLevelById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var params = this.levelsParamsList.find(lev => lev.id == id);
        var texts = this.levelsTextsList.find(lev => lev.id == id);
        return Object.assign(Object.assign({}, params), texts);
      }
      /**
       * Replace the active levels with this values
       *
       * @param levels
       * @param refresh If true, refresh the view and show the levels
       */


      setLevels(levels) {
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = arrLevels;

        if (refresh) {
          this.levelsToDisplay.forEach(lev => {
            var layer = this.getLayerByLevel(lev);

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


      addLevels(levels) {
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = [...this.levelsActive, ...arrLevels];

        if (refresh) {
          arrLevels.forEach(lev => {
            var layer = this.getLayerByLevel(lev);
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


      removeLevels(levels) {
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var arrLevels = !Array.isArray(levels) ? [levels] : levels;
        this.levelsActive = this.levelsActive.filter(x => !arrLevels.includes(x));

        if (refresh) {
          arrLevels.forEach(lev => {
            var layer = this.getLayerByLevel(lev);
            layer.setVisible(false);
          });
        }
      }
      /**
       *
       */


      getGeozoneTypes() {
        return this.typesTextsList;
      }
      /**
       *
       * @param id
       */


      getGeozoneTypeById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.typesTextsList.find(el => el.id == id);
      }
      /**
       * Get a list with all the supported Drones
       */


      getDrones() {
        return this.dronesList;
      }
      /**
       *  **_[static]_** - Generate an RGBA color from an hexadecimal
       *
       * Adapted from https://stackoverflow.com/questions/28004153
       * @param color Hexadeciaml color
       * @param alpha Opacity
       */


      static colorWithAlpha(color$1) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var [r, g, b] = Array.from(color.asArray(color$1));
        return color.asString([r, g, b, alpha]);
      }

    }

    return DjiGeozones;

})));
