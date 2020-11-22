(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/Overlay'), require('ol/proj'), require('ol/sphere'), require('ol/geom'), require('ol/style'), require('ol/control'), require('ol/color'), require('ol/geom/Polygon'), require('ol/extent')) :
    typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/Overlay', 'ol/proj', 'ol/sphere', 'ol/geom', 'ol/style', 'ol/control', 'ol/color', 'ol/geom/Polygon', 'ol/extent'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozone = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.Overlay, global.ol.proj, global.ol.sphere, global.ol.geom, global.ol.style, global.ol.control, global.ol.color, global.ol.geom.Polygon, global.ol.extent));
}(this, (function (VectorLayer, VectorSource, Feature, Overlay, proj, sphere, geom, style, control, color, Polygon, extent) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var VectorLayer__default = /*#__PURE__*/_interopDefaultLegacy(VectorLayer);
    var VectorSource__default = /*#__PURE__*/_interopDefaultLegacy(VectorSource);
    var Feature__default = /*#__PURE__*/_interopDefaultLegacy(Feature);
    var Overlay__default = /*#__PURE__*/_interopDefaultLegacy(Overlay);

    var levelParams = {
    	"0": {
    	name: "Warning Zones",
    	desc: "In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace",
    	color: "#FFCC00",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png",
    	markerCircle: "https://www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap"
    },
    	"1": {
    	name: "Authorization Zones",
    	desc: "In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.",
    	color: "#1088F2",
    	zIndex: 2,
    	markerIcon: "https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png",
    	markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap"
    },
    	"2": {
    	name: "Restricted Zones",
    	desc: "In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.",
    	color: "#DE4329",
    	zIndex: 3,
    	markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
    	markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    },
    	"3": {
    	name: "Enhanced Warning Zones",
    	desc: "In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.",
    	color: "#EE8815",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png",
    	markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap"
    },
    	"4": {
    	name: "Regulatory Restricted Zones",
    	desc: "Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)",
    	color: "#37C4DB",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    	markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    },
    	"5": {
    	name: "Recommended Zones",
    	color: "#00BE00",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    	markerCircle: "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    },
    	"6": {
    	name: "Altitude Zones",
    	desc: "Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.",
    	color: "#979797",
    	zIndex: 2,
    	markerIcon: "https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png",
    	markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap"
    },
    	"7": {
    	name: "Recommended Zones",
    	desc: "This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.",
    	color: "#00BE00",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
    	markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
    },
    	"8": {
    	name: "Approved Zones for Light UAVs(China)",
    	desc: "For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off",
    	color: "#00BE00",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
    	markerCircle: "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
    },
    	"9": {
    	name: "Densely Populated Area",
    	desc: "This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)",
    	color: "#DE4329",
    	zIndex: 1,
    	markerIcon: "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
    	markerCircle: "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    }
    };

    var droneList = [
    	{
    		value: "mavic-mini",
    		name: "Mavic Mini"
    	},
    	{
    		value: "mavic-2-enterprise",
    		name: "Mavic 2 Enterprise"
    	},
    	{
    		value: "mavic-2",
    		name: "Mavic 2"
    	},
    	{
    		value: "mavic-air",
    		name: "Mavic Air"
    	},
    	{
    		value: "mavic-air-2",
    		name: "Mavic Air 2"
    	},
    	{
    		value: "mavic-pro",
    		name: "Mavic Pro"
    	},
    	{
    		value: "spark",
    		name: "Spark"
    	},
    	{
    		value: "phantom-4-pro",
    		name: "Phantom 4 Pro"
    	},
    	{
    		value: "phantom-4-advanced",
    		name: "Phantom 4 Advanced"
    	},
    	{
    		value: "phantom-4",
    		name: "Phantom 4"
    	},
    	{
    		value: "phantom-4-rtk",
    		name: "Phantom 4 RTK"
    	},
    	{
    		value: "phantom-4-multispectral",
    		name: "Phantom 4 Multispectral"
    	},
    	{
    		value: "phantom-3-pro",
    		name: "Phantom 3 Pro"
    	},
    	{
    		value: "phantom-3-advanced",
    		name: "Phantom 3 Advanced"
    	},
    	{
    		value: "phantom-3-standard",
    		name: "Phantom 3 Standard"
    	},
    	{
    		value: "phantom-3-4K",
    		name: "Phantom 3 4K"
    	},
    	{
    		value: "phantom-3-se",
    		name: "Phantom 3 SE"
    	},
    	{
    		value: "inspire-2",
    		name: "Inspire 2"
    	},
    	{
    		value: "inspire-1-series",
    		name: "Inspire 1 Series"
    	},
    	{
    		value: "m200-series",
    		name: "M200 Series"
    	},
    	{
    		value: "m300-series",
    		name: "M300 Series"
    	},
    	{
    		value: "m600-series",
    		name: "M600 Series"
    	},
    	{
    		value: "m100",
    		name: "M100"
    	},
    	{
    		value: "mg1p",
    		name: "MG 1S/1A/1P/1P RTK/T10/T16/T20/T30"
    	},
    	{
    		value: "dji-mini-2",
    		name: "DJI Mini 2"
    	}
    ];

    var typeList = {
    	"0": {
    	name: "Airport"
    },
    	"1": {
    	name: "Special Zone"
    },
    	"2": {
    	name: "Military Zone"
    },
    	"4": {
    	name: "Recommended Zones"
    },
    	"10": {
    	name: "Airport"
    },
    	"13": {
    	name: "Recreational airport"
    },
    	"14": {
    	name: "Recreational airport"
    },
    	"15": {
    	name: "Class B Airspace"
    },
    	"16": {
    	name: "Class C Airspace"
    },
    	"17": {
    	name: "Class D Airspace"
    },
    	"18": {
    	name: "Class E Airspace"
    },
    	"19": {
    	name: "Heliport"
    },
    	"23": {
    	name: "Power plant"
    },
    	"24": {
    	name: "Prison"
    },
    	"26": {
    	name: "Stadium"
    },
    	"27": {
    	name: "Prohibited Airspace"
    },
    	"28": {
    	name: "Restricted Airspace"
    },
    	"29": {
    	name: "Temporary Flight Restriction"
    },
    	"30": {
    	name: "Nuclear Power Plant"
    },
    	"31": {
    	name: "Unpaved Airports"
    },
    	"32": {
    	name: "Special Zones"
    },
    	"33": {
    	name: "Military Zones"
    },
    	"34": {
    	name: "Heliport"
    },
    	"35": {
    	name: "Seaplane Base"
    },
    	"36": {
    	name: "Temporary Flight Restriction"
    },
    	"39": {
    	name: "Approved Zones for Light UAVs"
    },
    	"41": {
    	name: "Regulatory Restricted Zones for Light UAVs"
    }
    };

    const API_AREAS_ENDPOINT = 'www-api.dji.com/api/geo/areas';
    const API_INFO_ENDPOINT = 'www-api.dji.com/api/geo/point-info';
    const MIN_ZOOM = 9; // > 9 breaks the API

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
     * @param {Array} opt_options.levelsActivated DJI API parameter
     * @param {Array} opt_options.levelParams Controller labels, names, icons and color for each level
     * @param {Boolean} opt_options.control Add Open Layers Controller to the map
     * @param {HTMLElement | string} opt_options.targetControl // Specify a target if you want the control to be rendered outside of the map's viewport.
     */

    class DjiGeozone {
      constructor(map, url_proxy, opt_options = {}) {
        // API PARAMETERS
        this.drone = opt_options.drone || 'spark';
        this.zones_mode = opt_options.zonesMode || 'total';
        this.country = opt_options.country || 'US';
        this.levelsToDisplay = opt_options.levelsToDisplay || [2, 6, 1, 0, 3, 4, 7];
        this.levelsActivated = opt_options.levelsActivated || [2, 6, 1, 0, 3, 4, 7];
        this.levelParams = !opt_options.levelParams ? levelParams : { ...levelParams,
          ...opt_options.levelParams
        };
        this.apiLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // request all the levels, we filter later to by pass some api problems

        this.url_proxy = url_proxy;
        this.useInfoApi = false; // MAP 

        let addControl = 'control' in opt_options ? opt_options.control : true;
        let targetControl = opt_options.targetControl || null;
        this.map = map;
        this.view = map.getView();
        this.projection = this.view.getProjection();
        this.isVisible = this.view.getZoom() < MIN_ZOOM;
        this.layers = [];
        this.divControl = null;
        this.idAreasRequest = 0;
        this.idInfoRequest = 0;
        this.areaDownloaded = null;
        this.loadingElement = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';
        this.createLayer();
        this.addMapEvents();
        this.createPopUpOverlay();
        if (addControl) this.addMapControl(targetControl);
      }

      createLayer() {
        const styleFunction = feature => {
          let geomType = feature.getGeometry().getType();
          let style$1;
          let level = feature.get('level');

          if (geomType === 'Polygon' || geomType === 'Circle') {
            let color = feature.get('color');
            style$1 = new style.Style({
              fill: new style.Fill({
                color: colorWithAlpha(color, 0.3)
              }),
              stroke: new style.Stroke({
                color: color,
                width: 1
              }),
              zIndex: this.levelParams[level].zIndex
            });
          } else if (geomType === 'Point') {
            style$1 = new style.Style({
              image: new style.Icon({
                src: this.levelParams[level].markerIcon,
                scale: 0.35,
                anchor: [0.5, 0.9]
              }),
              zIndex: this.levelParams[level].zIndex * 2
            });
          }

          return style$1;
        }; // this.source = new VectorSource({
        //     attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
        // });
        // this.layers = new VectorLayer({
        //     zIndex: 99,
        //     name: `ol-dji-geozone`,
        //     source: this.source,
        //     style: styleFunction
        // });
        // this.map.addLayer(this.layers);


        this.apiLevels.forEach(level => {
          let layer = new VectorLayer__default['default']({
            zIndex: this.levelParams[level].zIndex * 2,
            name: 'ol-dji-geozone',
            level: level,
            visible: this.levelsActivated.includes(level) ? true : false,
            source: new VectorSource__default['default']({
              attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
            }),
            style: styleFunction
          });
          this.map.addLayer(layer);
          this.layers.push(layer);
        });
      }
      /**
       * 
       * @param {HTMLElement | string} targetControl 
       */


      addMapControl(targetControl) {
        /**
          * Show or hides the control
          * @param {Boolean} visible 
          */
        this.setControlVisible = visible => {
          if (visible) this.divControl.classList.addClass('ol-dji-geozone--ctrl-hidden');else this.divControl.classList.removeClass('ol-dji-geozone--ctrl-hidden');
        };

        const createDroneSelector = _ => {
          const handleChange = ({
            target
          }) => {
            this.drone = target.value || target.options[target.selectedIndex].value;
            this.getInfoFromView(
            /* clear = */
            true);
          };

          let droneSelector = document.createElement('div');
          droneSelector.className = 'ol-dji-geozone--drone-selector';
          let select = document.createElement('select');
          select.onchange = handleChange;
          if (!this.isVisible) select.setAttribute('disabled', 'disabled');
          let options = '';
          droneList.forEach(drone => {
            let selected = this.drone === drone.value ? 'selected' : '';
            options += `<option value="${drone.value}" ${selected}>${drone.name}</option>`;
          });
          select.innerHTML = options;
          droneSelector.append(select);
          return droneSelector;
        };

        const createLevelSelector = _ => {
          const handleClick = ({
            target
          }) => {
            let value = Number(target.value);
            let bool;

            if (target.checked === true) {
              this.levelsActivated = [...this.levelsActivated, value];
              bool = true;
            } else {
              let index = this.levelsActivated.indexOf(value);

              if (index !== -1) {
                this.levelsActivated.splice(index, 1);
              }

              bool = false;
            }

            let layer = this.getLayerByLevel(value);
            layer.setVisible(bool);
          };

          const createLegend = color => {
            let span = document.createElement('span');
            span.className = 'ol-dji-geozone--mark';
            span.style.border = `1px ${color} solid`;
            span.style.backgroundColor = colorWithAlpha(color, 0.4);
            return span;
          };

          const createLabel = (label, name, color) => {
            let labelEl = document.createElement('label');
            labelEl.htmlFor = name;
            labelEl.append(createLegend(color));
            labelEl.append(label);
            return labelEl;
          };

          const createCheckbox = (name, value, disabled) => {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = name;
            checkbox.id = name;
            checkbox.value = value;
            checkbox.onclick = handleClick;
            if (this.levelsActivated.indexOf(value) !== -1) checkbox.checked = 'checked';
            if (disabled) checkbox.disabled = 'disabled';
            return checkbox;
          };

          const createLevelItem = (value, {
            name,
            desc,
            color
          }) => {
            let disabled = !this.isVisible;
            let id = 'level' + value;
            let divContainer = document.createElement('div');
            divContainer.className = `ol-dji-geozone--item-ctl ol-dji-geozone--item-ctl-${value}`;
            divContainer.title = desc;
            divContainer.setAttribute('data-level', value);
            divContainer.append(createCheckbox(id, value, disabled));
            divContainer.append(createLabel(name, id, color));
            return divContainer;
          };

          let levelSelector = document.createElement('div');
          levelSelector.className = 'ol-dji-geozone--level-selector';
          this.levelsToDisplay.forEach(lev => {
            let level = createLevelItem(lev, this.levelParams[lev]);
            levelSelector.append(level);
          });
          return levelSelector;
        };

        let divControl = document.createElement('div');
        divControl.className = 'ol-dji-geozone ol-control ol-dji-geozone--ctrl-disabled';
        divControl.innerHTML = `
        <div>
            <h3>DJI Geo Zone</h3>
            <span class="ol-dji-geozone--loading">
                ${this.loadingElement}
            </span>
            <span class="ol-dji-geozone--advice">(Zoom in)</span>
        </div>`;
        let droneSelector = createDroneSelector();
        divControl.append(droneSelector);
        let levelSelector = createLevelSelector();
        divControl.append(levelSelector);
        this.divControl = divControl;
        let options = {
          element: divControl
        };

        if (targetControl) {
          options.target = target;
        }

        this.control = new control.Control(options);
        this.map.addControl(this.control);
      }

      createPopUpOverlay() {
        const popupContainer = document.createElement('div');
        popupContainer.id = 'ol-dji-geozone--popup';
        popupContainer.className = 'ol-popup ol-dji-geozone--ol-popup';
        this.popupContent = document.createElement('div');
        this.popupContent.id = 'ol-dji-geozone--popup-content';
        this.popupContent.className = 'ol-dji-geozone--ol-popup-content';
        let popupCloser = document.createElement('a');
        popupCloser.id = 'ol-dji-geozone--popup-closer';
        popupCloser.className = 'ol-dji-geozone--ol-popup-closer';
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
      }

      addMapEvents() {
        /**
         * Enable or disable the inputs and the select in the control
         * @param {Boolean} enabled 
         */
        const setControlEnabled = enabled => {
          const changeState = array => {
            array.forEach(el => {
              if (enabled) el.removeAttribute('disabled');else el.disabled = 'disabled';
            });
          };

          if (enabled) this.divControl.classList.remove('ol-dji-geozone--ctrl-disabled');else this.divControl.classList.add('ol-dji-geozone--ctrl-disabled');
          changeState(this.divControl.querySelectorAll('input'));
          changeState(this.divControl.querySelectorAll('select'));
        };

        const handleZoomEnd = _ => {
          const setVisible = bool => {
            this.layers.forEach(layer => {
              if (!bool) {
                layer.setVisible(bool);
              } else if (bool && this.levelsActivated.includes(layer.get('level'))) {
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

        const handleDragEnd = _ => {
          if (!this.isVisible) return;
          this.getInfoFromView();
        };

        const clickHandler = evt => this.getPointInfoFromClick(evt);

        this.map.on('moveend', _ => {
          this.currentZoom = this.view.getZoom();
          if (this.currentZoom !== this.lastZoom) handleZoomEnd();else handleDragEnd();
          this.lastZoom = this.currentZoom;
        });
        this.map.on('singleclick', clickHandler);
      }

      clearFeatures() {
        this.layers.forEach(layer => {
          layer.getSource().clear();
        });
      }

      getFeatureById(id) {
        let feature;

        for (let layer of this.layers) {
          feature = layer.getSource().getFeatureById(id);
          if (feature) break;
        }

        return feature;
      }

      getLayerByLevel(level) {
        let find;

        for (let layer of this.layers) {
          if (layer.get('level') != undefined && layer.get('level') == level) {
            find = layer;
            break;
          }
        }
        return find;
      }

      addFeatures(features) {
        features.forEach(feature => {
          let level = feature.get('level');
          let layer = this.getLayerByLevel(level);
          layer.getSource().addFeature(feature);
        });
      }

      showGeozoneDataInPopUp(geozonesData, coordinates) {
        const parseDataToHtml = ({
          name,
          level,
          type,
          height,
          description,
          begin_at,
          end_at,
          address,
          url
        }) => {
          return `
            <div class="ol-dji-geozone--item">
                <div class="ol-dji-geozone--marker">
                    <img src="${levelParams[level].markerCircle}">
                </div>
                <div class="ol-dji-geozone--main">
                <h3 class="ol-dji-geozone--title">${name}</h3>
                    <p class="level">Level: ${levelParams[level].name}</p>
                    <p class="type">Type: ${typeList[type].name}</p>
                    ${begin_at ? `<p class="start_time">End Time: ${begin_at}</p>` : ''}
                    ${end_at ? `<p class="end_time">End Time: ${end_at}</p><p class="time_tips">Time: 24-hour clock</p>` : ''}         
                    ${height ? `<p class="height">Max. Altitude (m): ${height}</p>` : ''} 
                    ${address ? `<p class="address">Address: ${address}</p>` : ''}
                    ${description ? `<p class="desc">Tips: ${description}</p>` : ''}
                    ${url ? `<p class="url">Link: <a href="${url}">Learn More</a></p>` : ''}
                </div>
            </div> `;
        };

        let html = [];
        let preventDuplicates = [];
        geozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];
        geozonesData.forEach(geozoneProps => {
          let htmlItem = parseDataToHtml(geozoneProps); // The oficial DJI map show duplicates, but we don't want that

          if (preventDuplicates.indexOf(htmlItem) === -1) {
            preventDuplicates.push(htmlItem);
            html.push(htmlItem);
          }
        });
        this.popupContent.innerHTML = html.join('<hr>');
        this.overlay.setPosition(coordinates);
      }

      async getPointInfoFromClick(evt) {
        let infoKeys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description'];

        const getInfoFromApiLatLng = async coordinate => {
          // Prevent multiples requests
          this.idInfoRequest += 1;
          let request = this.idInfoRequest;
          return new Promise((resolve, reject) => {
            setTimeout(async _ => {
              if (request !== this.idInfoRequest) return;
              let center4326 = proj.transform(coordinate, this.projection, 'EPSG:4326');
              let clickLatLng = {
                lat: center4326[1],
                lng: center4326[0]
              };
              let apiJson = await this.getApiGeoData('info', clickLatLng);
              let areas = apiJson.areas;
              if (!areas.length) resolve(false);
              let featuresProps = [];

              for (let area of areas) {
                featuresProps.push(area);
              }

              resolve(featuresProps);
            }, 100);
          });
        };

        const getInfoFromFeatures = features => {
          let featuresProps = [];
          features.forEach(feature => {
            let props = {};
            infoKeys.forEach(key => props[key] = feature.get(key));
            featuresProps.push(props);
          });
          return featuresProps;
        };

        try {
          if (!this.isVisible) {
            this.overlay.setPosition(undefined);
            return;
          }

          let opt_options = {
            layerFilter: layer => layer.get('name') === 'ol-dji-geozone'
          };
          let data; // Call the API  to download the information

          if (this.useInfoApi) {
            if (this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {
              this.popupContent.innerHTML = this.loadingElement;
              this.overlay.setPosition(evt.coordinate);
              data = await getInfoFromApiLatLng(evt.coordinate);
            } // Use the previously downloaded features information

          } else {
            let features = this.map.getFeaturesAtPixel(evt.pixel, opt_options);
            data = getInfoFromFeatures(features);
          }

          if (data && data.length) this.showGeozoneDataInPopUp(data, evt.coordinate);else this.overlay.setPosition(undefined);
        } catch (err) {
          console.log(err);
        }
      }

      getInfoFromView(clear = false) {
        /**
         * The level parameter returned by the API is wrong, so wee need to fixed using the color
         * @param {*} feature 
         */
        const fixLevelValue = feature => {
          let color = feature.get('color');
          let level = Object.keys(this.levelParams).find(key => this.levelParams[key].color === color);
          feature.set('level', level);
          return feature;
        };

        const apiResponseToFeatures = djiJson => {
          let areas = djiJson.areas;
          if (!areas || !areas.length) return false;
          let features = [];

          for (let area of areas) {
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
              lat: area.lat
            }; // Only a few of "areas" come with polygons

            if (area.polygon_points) {
              let featureExtra = new Feature__default['default']({ ...featureProps,
                geometry: new geom.Polygon(area.polygon_points).transform('EPSG:4326', this.projection)
              });
              featureExtra.setId(area.area_id + "_poly");
              features.push(fixLevelValue(featureExtra));
            }

            let feature = new Feature__default['default']({ ...featureProps,
              geometry: new geom.Point([area.lng, area.lat]).transform('EPSG:4326', this.projection)
            });
            features.push(fixLevelValue(feature)); // Store the id to avoid duplicates

            feature.setId(area.area_id);

            if (area.sub_areas) {
              area.sub_areas.forEach(sub_area => {
                let subFeature;

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
                    geometry: new geom.Polygon(sub_area.polygon_points).transform('EPSG:4326', this.projection)
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
                    geometry: new geom.Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', this.projection)
                  });
                }

                subFeature.setId(sub_area.area_id);
                features.push(fixLevelValue(subFeature));
              });
            }
          }

          return features;
        };

        const showLoading = bool => {
          if (bool) this.divControl.classList.add('ol-dji-geozone--isLoading');else this.divControl.classList.remove('ol-dji-geozone--isLoading');
        }; // Prevent multiples requests


        this.idAreasRequest += 1;
        let request = this.idAreasRequest; // Original DJI map same behavior to prevent multiples requests

        setTimeout(async _ => {
          if (request !== this.idAreasRequest) return;

          try {
            showLoading(true);
            let center = this.view.getCenter();
            let center4326 = proj.transform(center, this.projection, 'EPSG:4326');
            let viewLatLng = {
              lat: center4326[1],
              lng: center4326[0]
            };

            if (clear) {
              this.areaDownloaded = null; // Remove area already downloaded
            }

            let data = await this.getApiGeoData('areas', viewLatLng);
            if (!data) throw new Error();
            if (clear) this.clearFeatures();
            let features = apiResponseToFeatures(data);
            this.addFeatures(features);
            showLoading(false); // console.log(data);
          } catch (err) {
            if (err.message) console.error(err);
            showLoading(false);
          }
        }, 300);
      }

      async getApiGeoData(typeApiRequest, latLng) {
        const apiRequest = async (type, {
          lng,
          lat
        }, searchRadius) => {
          let api_endpoint = type === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT; // If not proxy is passed, make a direct request
          // Maybe in the future the api will has updated CORS restrictions

          let url = new URL(this.url_proxy ? this.url_proxy + api_endpoint : 'https://' + api_endpoint);
          let queryObj = {
            'drone': this.drone,
            'zones_mode': this.zones_mode,
            'country': this.country,
            'level': this.apiLevels,
            'lng': lng,
            'lat': lat,
            'search_radius': searchRadius
          };
          Object.keys(queryObj).forEach(key => url.searchParams.append(key, queryObj[key]));
          let response = await fetch(url);
          if (!response.ok) throw new Error("HTTP-Error: " + response.status);
          return await response.json();
        };

        const getPointInfo = async (latLng, searchRadius) => {
          let data = await apiRequest('info', latLng, searchRadius);
          return data;
        };

        const getAreas = async (centerLatLng, searchRadius) => {
          let extent$1 = this.view.calculateExtent();
          let polygon = Polygon.fromExtent(extent$1);

          if (this.areaDownloaded) {
            if (this.areaDownloaded.intersectsCoordinate(extent.getCenter(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getBottomLeft(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getTopRight(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getBottomRight(extent$1)) && this.areaDownloaded.intersectsCoordinate(extent.getTopLeft(extent$1))) {
              // whe already have the data, do nothing
              return;
            }
          } else {
            this.areaDownloaded = new geom.MultiPolygon({});
          }

          this.areaDownloaded.appendPolygon(polygon);
          let data = await apiRequest('areas', centerLatLng, searchRadius);
          return data;
        }; // adapted from https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map


        const getMapRadius = ({
          lng,
          lat
        }) => {
          let center = [lng, lat];
          let size = this.map.getSize();
          let extent = this.view.calculateExtent(size);
          extent = proj.transformExtent(extent, this.projection, 'EPSG:4326');
          let posSW = [extent[0], extent[1]];
          let centerToSW = sphere.getDistance(center, posSW);
          return parseInt(centerToSW);
        };

        if (!this.isVisible) return;
        let searchRadius = getMapRadius(latLng);
        let data;

        if (typeApiRequest === 'areas') {
          data = await getAreas(latLng, searchRadius);
        } else {
          data = await getPointInfo(latLng, searchRadius);
        }

        return data;
      }

    } // https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color

    function colorWithAlpha(color$1, alpha = 1) {
      const [r, g, b] = Array.from(color.asArray(color$1));
      return color.asString([r, g, b, alpha]);
    }

    return DjiGeozone;

})));
