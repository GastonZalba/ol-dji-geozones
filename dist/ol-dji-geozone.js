(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/proj'), require('ol/sphere'), require('ol/geom'), require('ol/style'), require('ol/control'), require('ol/color')) :
    typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/proj', 'ol/sphere', 'ol/geom', 'ol/style', 'ol/control', 'ol/color'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozone = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.proj, global.ol.sphere, global.ol.geom, global.ol.style, global.ol.control, global.ol.color));
}(this, (function (VectorLayer, VectorSource, Feature, proj, sphere, geom, style, control, color) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var VectorLayer__default = /*#__PURE__*/_interopDefaultLegacy(VectorLayer);
    var VectorSource__default = /*#__PURE__*/_interopDefaultLegacy(VectorSource);
    var Feature__default = /*#__PURE__*/_interopDefaultLegacy(Feature);

    var levelParams = {"0":{name:"Warning Zones",desc:"In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace",color:"#FFCC00",icon:"https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png"},"1":{name:"Authorization Zones",desc:"In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.",color:"#1088F2",icon:"https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png"},"2":{name:"Restricted Zones",desc:"In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.",color:"#DE4329",icon:"https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png"},"3":{name:"Enhanced Warning Zones",desc:"In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.",color:"#EE8815",icon:"https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png"},"4":{name:"Regulatory Restricted Zones",desc:"Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)",color:"#37C4DB",icon:"https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png"},"5":{icon:"//www3.djicdn.com/assets/images/flysafe/geo-system/dark-green-marker-a45d865ea1fb9df5346ad5b06084d9ba.png?from=cdnMap"},"6":{name:"Altitude Zones",desc:"Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.",color:"#979797",icon:"https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png"},"7":{name:"Recommended Zones",desc:"This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.",color:"#00BE00",icon:"'https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png"},"8":{icon:"https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png"}};

    var droneList = [{value:"mavic-mini",name:"Mavic Mini"},{value:"mavic-2-enterprise",name:"Mavic 2 Enterprise"},{value:"mavic-2",name:"Mavic 2"},{value:"mavic-air",name:"Mavic Air"},{value:"mavic-air-2",name:"Mavic Air 2"},{value:"mavic-pro",name:"Mavic Pro"},{value:"spark",name:"Spark"},{value:"phantom-4-pro",name:"Phantom 4 Pro"},{value:"phantom-4-advanced",name:"Phantom 4 Advanced"},{value:"phantom-4",name:"Phantom 4"},{value:"phantom-4-rtk",name:"Phantom 4 RTK"},{value:"phantom-4-multispectral",name:"Phantom 4 Multispectral"},{value:"phantom-3-pro",name:"Phantom 3 Pro"},{value:"phantom-3-advanced",name:"Phantom 3 Advanced"},{value:"phantom-3-standard",name:"Phantom 3 Standard"},{value:"phantom-3-4K",name:"Phantom 3 4K"},{value:"phantom-3-se",name:"Phantom 3 SE"},{value:"inspire-2",name:"Inspire 2"},{value:"inspire-1-series",name:"Inspire 1 Series"},{value:"m200-series",name:"M200 Series"},{value:"m300-series",name:"M300 Series"},{value:"m600-series",name:"M600 Series"},{value:"m100",name:"M100"},{value:"mg1p",name:"MG 1S/1A/1P/1P RTK/T10/T16/T20/T30"},{value:"dji-mini-2",name:"DJI Mini 2"}];

    const API_ENDPOINT = 'www-api.dji.com/api/geo/areas';
    const MIN_ZOOM = 9; // >= 9 or breaks the API

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
     * @param {Array} opt_options.level DJI API parameter
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
        this.level = opt_options.level || [0, 1, 2, 3, 4, 6, 7];
        this.levelParams = !opt_options.levelParams ? levelParams : { ...levelParams,
          ...opt_options.levelParams
        };
        this.url_proxy = url_proxy; // MAP 

        let addControl = 'control' in opt_options ? opt_options.control : true;
        let targetControl = opt_options.targetControl || null;
        this.map = map;
        this.view = map.getView();
        this.projection = this.view.getProjection();
        this.isVisible = this.view.getZoom() < MIN_ZOOM;
        this.source = null;
        this.layer = null;
        this.divControl = null;
        this.idRequest = 0;
        this.createLayer();
        this.addMapEvents();
        if (addControl) this.addMapControl(targetControl);
      }

      createLayer() {
        const styleFunction = feature => {
          let geomType = feature.getGeometry().getType();
          let style$1;

          if (geomType === 'Polygon' || geomType === 'Circle') {
            let height = feature.get('height');
            let color = feature.get('color');
            style$1 = new style.Style({
              fill: new style.Fill({
                color: colorWithAlpha(color, 0.3)
              }),
              stroke: new style.Stroke({
                color: color,
                width: 1
              }),
              zIndex: height
            });
          } else if (geomType === 'Point') {
            style$1 = new style.Style({
              image: new style.Icon({
                src: this.levelParams[feature.get('level')].icon,
                scale: 0.35,
                anchor: [0.5, 0.9]
              }),
              zIndex: 300
            });
          }

          return style$1;
        };

        this.source = new VectorSource__default['default']({
          attributions: '<a href="https://www.dji.com/flysafe/geo-map" rel="nofollow noopener noreferrer" target="_blank">DJI GeoZoneMap</a>'
        });
        this.layer = new VectorLayer__default['default']({
          zIndex: 99,
          name: 'ol-dji-geozone',
          source: this.source,
          style: styleFunction
        });
        this.map.addLayer(this.layer);
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
            this.getGeoData(
            /* clear = */
            true);
          };

          let droneSelector = document.createElement('div');
          droneSelector.className = 'ol-dji-geozone--drone-selector';
          let select = document.createElement('select');
          select.onchange = handleChange;
          let disabled = !this.isVisible ? 'disabled' : '';
          let options = '';
          droneList.forEach(drone => {
            let selected = this.drone === drone.value ? 'selected' : '';
            options += `<option value="${drone.value}" ${selected} ${disabled}>${drone.name}</option>`;
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

            if (target.checked === true) {
              this.level = [...this.level, value];
            } else {
              let index = this.level.indexOf(value);

              if (index !== -1) {
                this.level.splice(index, 1);
              }
            }

            this.getGeoData(
            /* clear = */
            true);
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
            if (this.level.indexOf(value) !== -1) checkbox.checked = 'checked';
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
            divContainer.className = `ol-dji-geozone--item ol-dji-geozone--item-${value}`;
            divContainer.title = desc;
            divContainer.setAttribute('data-level', value);
            divContainer.append(createCheckbox(id, value, disabled));
            divContainer.append(createLabel(name, id, color));
            return divContainer;
          }; // Use the same DJI order


          let level2 = createLevelItem(2, this.levelParams[2]);
          let level6 = createLevelItem(6, this.levelParams[6]);
          let level1 = createLevelItem(1, this.levelParams[1]);
          let level0 = createLevelItem(0, this.levelParams[0]);
          let level3 = createLevelItem(3, this.levelParams[3]);
          let level4 = createLevelItem(4, this.levelParams[4]);
          let level7 = createLevelItem(7, this.levelParams[7]);
          let levelSelector = document.createElement('div');
          levelSelector.className = 'ol-dji-geozone--level-selector'; // Use the same DJI order

          levelSelector.append(level2);
          levelSelector.append(level6);
          levelSelector.append(level1);
          levelSelector.append(level0);
          levelSelector.append(level3);
          levelSelector.append(level4);
          levelSelector.append(level7);
          return levelSelector;
        };

        let divControl = document.createElement('div');
        divControl.className = 'ol-dji-geozone ol-control';
        divControl.innerHTML = `<div><h3>DJI Geo Zone</h3></div>`;
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
          if (this.currentZoom < MIN_ZOOM) {
            // Hide the layer and disable the control
            if (this.isVisible) {
              this.layer.setVisible(false);
              this.isVisible = false;
              setControlEnabled(false);
            }
          } else {
            // Show the layers and enable the control
            if (!this.isVisible) {
              this.layer.setVisible(true);
              this.isVisible = true;
              setControlEnabled(true);
            } else {
              // If the view is closer, don't do anything, we already had the features
              if (this.currentZoom > this.lastZoom) return;
            }

            this.getGeoData();
          }
        };

        const handleDragEnd = _ => {
          this.getGeoData();
        };

        this.map.on('moveend', _ => {
          this.currentZoom = this.view.getZoom();
          if (this.currentZoom !== this.lastZoom) handleZoomEnd();else handleDragEnd();
          this.lastZoom = this.currentZoom;
        });
      }

      getGeoData(clear = false) {
        // adapted from https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map
        const getMapRadius = center => {
          let size = this.map.getSize();
          let extent = this.view.calculateExtent(size);
          extent = proj.transformExtent(extent, this.projection, 'EPSG:4326');
          let posSW = [extent[0], extent[1]];
          center = proj.transform(center, this.projection, 'EPSG:4326');
          let centerToSW = sphere.getDistance(center, posSW);
          return parseInt(centerToSW);
        };

        const apiRequest = async ({
          lng,
          lat
        }, searchRadius) => {
          // If not proxy is passed, make a direct request
          // Maybe in the future the api will has updated CORS restrictions
          let url = new URL(this.url_proxy ? this.url_proxy + API_ENDPOINT : 'https://' + API_ENDPOINT);
          let queryObj = {
            'drone': this.drone,
            'zones_mode': this.zones_mode,
            'country': this.country,
            'level': this.level,
            'lng': lng,
            'lat': lat,
            'search_radius': searchRadius
          };
          Object.keys(queryObj).forEach(key => url.searchParams.append(key, queryObj[key]));
          let response = await fetch(url);
          if (!response.ok) throw new Error("HTTP-Error: " + response.status);
          return await response.json();
        };

        const apiResponseToFeatures = djiJson => {
          let areas = djiJson.areas;
          let features = [];
          if (!areas.length) return false;

          for (let area of areas) {
            // If the feature already exists, continue
            if (this.source.getFeatureById(area.area_id)) {
              continue;
            }

            const feature = new Feature__default['default']({
              name: area.name,
              shape: area.shape,
              level: area.level,
              radius: area.radius,
              color: area.color,
              country: area.country,
              geometry: new geom.Point([area.lng, area.lat]).transform('EPSG:4326', this.projection)
            }); // Store the id to avoid duplicates

            feature.setId(area.area_id);

            if (area.sub_areas) {
              area.sub_areas.forEach(sub_area => {
                let subFeature;

                if (sub_area.polygon_points) {
                  subFeature = new Feature__default['default']({
                    radius: sub_area.radius,
                    height: sub_area.height,
                    color: sub_area.color,
                    level: sub_area.level,
                    shape: sub_area.shape,
                    geometry: new geom.Polygon(sub_area.polygon_points).transform('EPSG:4326', this.projection)
                  });
                } else {
                  subFeature = new Feature__default['default']({
                    radius: sub_area.radius,
                    height: sub_area.height,
                    color: sub_area.color,
                    level: sub_area.level,
                    shape: sub_area.shape,
                    geometry: new geom.Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', this.projection)
                  });
                }

                subFeature.setId(sub_area.area_id);
                features.push(subFeature);
              });
            }

            features.push(feature);
          }

          return features;
        };

        if (!this.isVisible) return;
        let center = this.view.getCenter();
        let center4326 = proj.transform(center, this.projection, 'EPSG:4326');
        let centerLatLng = {
          lat: center4326[1],
          lng: center4326[0]
        };
        let searchRadius = getMapRadius(center); // Prevent multiples requests

        this.idRequest += 1;
        let request = this.idRequest; // Original DJI map same behavior to prevent multiples requests

        setTimeout(async _ => {
          if (request == this.idRequest) {
            try {
              let data = await apiRequest(centerLatLng, searchRadius);
              if (clear) this.source.clear();
              let features = apiResponseToFeatures(data);
              this.source.addFeatures(features); // console.log(data);
              // console.log(features);
            } catch (err) {
              console.error(err);
            }
          }
        }, 800);
      }

    } // https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color

    function colorWithAlpha(color$1, alpha = 1) {
      const [r, g, b] = Array.from(color.asArray(color$1));
      return color.asString([r, g, b, alpha]);
    }

    return DjiGeozone;

})));
