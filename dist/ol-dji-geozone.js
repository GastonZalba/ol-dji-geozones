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

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

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
  	zIndex: 1,
  	markerIcon: "https://www3.djicdn.com/assets/images/flysafe/geo-system/dark-green-marker-a45d865ea1fb9df5346ad5b06084d9ba.png?from=cdnMap",
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
  	markerIcon: "'https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
  	markerCircle: "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
  },
  	"8": {
  	zIndex: 1,
  	markerIcon: "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
  	markerCircle: "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
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

  var API_AREAS_ENDPOINT = 'www-api.dji.com/api/geo/areas';
  var API_INFO_ENDPOINT = 'www-api.dji.com/api/geo/point-info';
  var MIN_ZOOM = 9; // >= 9 or breaks the API

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
    constructor(map, url_proxy) {
      var opt_options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      // API PARAMETERS
      this.drone = opt_options.drone || 'spark';
      this.zones_mode = opt_options.zonesMode || 'total';
      this.country = opt_options.country || 'US';
      this.level = opt_options.level || [0, 1, 2, 3, 4, 6, 7];
      this.levelParams = !opt_options.levelParams ? levelParams : _objectSpread2(_objectSpread2({}, levelParams), opt_options.levelParams);
      this.url_proxy = url_proxy; // MAP 

      var addControl = 'control' in opt_options ? opt_options.control : true;
      var targetControl = opt_options.targetControl || null;
      this.map = map;
      this.view = map.getView();
      this.projection = this.view.getProjection();
      this.isVisible = this.view.getZoom() < MIN_ZOOM;
      this.source = null;
      this.layer = null;
      this.divControl = null;
      this.idAreasRequest = 0;
      this.idInfoRequest = 0;
      this.areaDownloaded = null;
      this.createLayer();
      this.addMapEvents();
      this.createPopUpOverlay();
      if (addControl) this.addMapControl(targetControl);
    }

    createLayer() {
      var styleFunction = feature => {
        var geomType = feature.getGeometry().getType();
        var style$1;

        if (geomType === 'Polygon' || geomType === 'Circle') {
          var color = feature.get('color');
          style$1 = new style.Style({
            fill: new style.Fill({
              color: colorWithAlpha(color, 0.3)
            }),
            stroke: new style.Stroke({
              color: color,
              width: 1
            }),
            zIndex: this.levelParams[feature.get('level')].zIndex
          });
        } else if (geomType === 'Point') {
          style$1 = new style.Style({
            image: new style.Icon({
              src: this.levelParams[feature.get('level')].markerIcon,
              scale: 0.35,
              anchor: [0.5, 0.9]
            }),
            zIndex: this.levelParams[feature.get('level')].zIndex * 2
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

      var createDroneSelector = _ => {
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
        droneSelector.className = 'ol-dji-geozone--drone-selector';
        var select = document.createElement('select');
        select.onchange = handleChange;
        var disabled = !this.isVisible ? 'disabled' : '';
        var options = '';
        droneList.forEach(drone => {
          var selected = this.drone === drone.value ? 'selected' : '';
          options += "<option value=\"".concat(drone.value, "\" ").concat(selected, " ").concat(disabled, ">").concat(drone.name, "</option>");
        });
        select.innerHTML = options;
        droneSelector.append(select);
        return droneSelector;
      };

      var createLevelSelector = _ => {
        var handleClick = (_ref2) => {
          var {
            target
          } = _ref2;
          var value = Number(target.value);

          if (target.checked === true) {
            this.level = [...this.level, value];
          } else {
            var index = this.level.indexOf(value);

            if (index !== -1) {
              this.level.splice(index, 1);
            }
          }

          this.getInfoFromView(
          /* clear = */
          true);
        };

        var createLegend = color => {
          var span = document.createElement('span');
          span.className = 'ol-dji-geozone--mark';
          span.style.border = "1px ".concat(color, " solid");
          span.style.backgroundColor = colorWithAlpha(color, 0.4);
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
          checkbox.value = value;
          checkbox.onclick = handleClick;
          if (this.level.indexOf(value) !== -1) checkbox.checked = 'checked';
          if (disabled) checkbox.disabled = 'disabled';
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
          divContainer.className = "ol-dji-geozone--item-ctl ol-dji-geozone--item-ctl-".concat(value);
          divContainer.title = desc;
          divContainer.setAttribute('data-level', value);
          divContainer.append(createCheckbox(id, value, disabled));
          divContainer.append(createLabel(name, id, color));
          return divContainer;
        }; // Same DJI order


        var level2 = createLevelItem(2, this.levelParams[2]);
        var level6 = createLevelItem(6, this.levelParams[6]);
        var level1 = createLevelItem(1, this.levelParams[1]);
        var level0 = createLevelItem(0, this.levelParams[0]);
        var level3 = createLevelItem(3, this.levelParams[3]);
        var level4 = createLevelItem(4, this.levelParams[4]);
        var level7 = createLevelItem(7, this.levelParams[7]);
        var levelSelector = document.createElement('div');
        levelSelector.className = 'ol-dji-geozone--level-selector'; // Same DJI order

        levelSelector.append(level2);
        levelSelector.append(level6);
        levelSelector.append(level1);
        levelSelector.append(level0);
        levelSelector.append(level3);
        levelSelector.append(level4);
        levelSelector.append(level7);
        return levelSelector;
      };

      var divControl = document.createElement('div');
      divControl.className = 'ol-dji-geozone ol-control ol-dji-geozone--ctrl-disabled';
      divControl.innerHTML = "\n        <div>\n            <h3>DJI Geo Zone</h3>\n            <span class=\"ol-dji-geozone--loading\">\n                <div class=\"lds-ellipsis\"><div></div><div></div><div></div><div></div></div>\n            </span>\n            <span class=\"ol-dji-geozone--advice\">(Zoom in)</span>\n        </div>";
      var droneSelector = createDroneSelector();
      divControl.append(droneSelector);
      var levelSelector = createLevelSelector();
      divControl.append(levelSelector);
      this.divControl = divControl;
      var options = {
        element: divControl
      };

      if (targetControl) {
        options.target = target;
      }

      this.control = new control.Control(options);
      this.map.addControl(this.control);
    }

    createPopUpOverlay() {
      var popupContainer = document.createElement('div');
      popupContainer.id = 'ol-dji-geozone--popup';
      popupContainer.className = 'ol-popup ol-dji-geozone--ol-popup';
      this.popupContent = document.createElement('div');
      this.popupContent.id = 'ol-dji-geozone--popup-content';
      this.popupContent.className = 'ol-dji-geozone--ol-popup-content';
      var popupCloser = document.createElement('a');
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
      var setControlEnabled = enabled => {
        var changeState = array => {
          array.forEach(el => {
            if (enabled) el.removeAttribute('disabled');else el.disabled = 'disabled';
          });
        };

        if (enabled) this.divControl.classList.remove('ol-dji-geozone--ctrl-disabled');else this.divControl.classList.add('ol-dji-geozone--ctrl-disabled');
        changeState(this.divControl.querySelectorAll('input'));
        changeState(this.divControl.querySelectorAll('select'));
      };

      var handleZoomEnd = _ => {
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

          this.getInfoFromView();
        }
      };

      var handleDragEnd = _ => {
        this.getInfoFromView();
      };

      var clickHandler = evt => this.getPointInfoFromClick(evt);

      this.map.on('moveend', _ => {
        this.currentZoom = this.view.getZoom();
        if (this.currentZoom !== this.lastZoom) handleZoomEnd();else handleDragEnd();
        this.lastZoom = this.currentZoom;
      });
      this.map.on('singleclick', clickHandler);
    }

    showGeozoneDataInPopUp(geozonesData, coordinates) {
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
        return "\n            <div class=\"ol-dji-geozone--item\">\n                <div class=\"ol-dji-geozone--marker\">\n                    <img src=\"".concat(levelParams[level].markerCircle, "\">\n                </div>\n                <div class=\"ol-dji-geozone--main\">\n                <h3 class=\"ol-dji-geozone--title\">").concat(name, "</h3>\n                    <p class=\"level\">Level: ").concat(levelParams[level].name, "</p>\n                    <p class=\"type\">Type: ").concat(typeList[type].name, "</p>\n                    ").concat(begin_at ? "<p class=\"start_time\">End Time: ".concat(begin_at, "</p>") : '', "\n                    ").concat(end_at ? "<p class=\"end_time\">End Time: ".concat(end_at, "</p><p class=\"time_tips\">Time: 24-hour clock</p>") : '', "         \n                    ").concat(height ? "<p class=\"height\">Max. Altitude (m): ".concat(height, "</p>") : '', " \n                    ").concat(address ? "<p class=\"address\">Address: ".concat(address, "</p>") : '', "\n                    ").concat(description ? "<p class=\"desc\">Tips: ".concat(description, "</p>") : '', "\n                    ").concat(url ? "<p class=\"url\">Link: <a href=\"".concat(url, "\">Learn More</a></p>") : '', "\n                </div>\n            </div> ");
      };

      var html = [];
      var preventDuplicates = [];
      geozonesData = Array.isArray(geozonesData) ? geozonesData : [geozonesData];
      geozonesData.forEach(geozoneProps => {
        var dataString = JSON.stringify(geozoneProps); // The oficial DJI map show duplicates, but we don't want that

        if (preventDuplicates.indexOf(dataString) === -1) {
          preventDuplicates.push(dataString);
          html.push(parseDataToHtml(geozoneProps));
          console.log(geozoneProps);
        }
      });
      this.popupContent.innerHTML = html.join('<hr>');
      this.overlay.setPosition(coordinates);
    }

    getPointInfoFromClick(evt) {
      var _this = this;

      return _asyncToGenerator(function* () {
        var getInfoFromApiLatLng = /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(function* (coordinate) {
            // Prevent multiples requests
            _this.idInfoRequest += 1;
            var request = _this.idInfoRequest;
            setTimeout( /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator(function* (_) {
                if (request !== _this.idInfoRequest) return;
                var center4326 = proj.transform(coordinate, _this.projection, 'EPSG:4326');
                var clickLatLng = {
                  lat: center4326[1],
                  lng: center4326[0]
                };
                var apiJson = yield _this.getApiGeoData('info', clickLatLng);
                var areas = apiJson.areas;
                if (!areas.length) return false;
                var featuresProps = [];

                for (var area of areas) {
                  featuresProps.push(area);
                }

                return featuresProps;
              });

              return function (_x2) {
                return _ref6.apply(this, arguments);
              };
            }(), 100);
          });

          return function getInfoFromApiLatLng(_x) {
            return _ref5.apply(this, arguments);
          };
        }();

        var getInfoFromFeatures = features => {
          var featuresProps = [];
          features.forEach(feature => {
            var keys = ['name', 'level', 'type', 'height', 'shape', 'start_at', 'end_at', 'url', 'address', 'description']; // Point markers has duplicated data

            if (feature.getGeometry().getType() !== 'Point') {
              var props = {};
              keys.forEach(key => props[key] = feature.get(key));
              featuresProps.push(props);
            }
          });
          return featuresProps;
        };

        try {
          if (!_this.isVisible) return;
          var useApi = false;
          var opt_options = {
            layerFilter: layer => layer === _this.layer
          };
          var data; // Call the API  to download the information

          if (useApi) {
            if (_this.map.hasFeatureAtPixel(evt.pixel, opt_options)) {
              data = yield getInfoFromApiLatLng(evt.coordinate);
            } // Use the previously downloaded features information

          } else {
            var features = _this.map.getFeaturesAtPixel(evt.pixel, opt_options);

            data = getInfoFromFeatures(features);
          }

          if (data.length) _this.showGeozoneDataInPopUp(data, evt.coordinate);else _this.overlay.setPosition(undefined);
        } catch (err) {
          console.log(err);
        }
      })();
    }

    getInfoFromView() {
      var _this2 = this;

      var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var apiResponseToFeatures = djiJson => {
        var areas = djiJson.areas;
        if (!areas || !areas.length) return false;
        var features = [];

        var _loop = function _loop(area) {
          // If the feature already exists, continue
          if (_this2.source.getFeatureById(area.area_id)) {
            return "continue";
          }

          var feature = new Feature__default['default']({
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
            geometry: new geom.Point([area.lng, area.lat]).transform('EPSG:4326', _this2.projection)
          }); // Store the id to avoid duplicates

          feature.setId(area.area_id);

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
                  geometry: new geom.Polygon(sub_area.polygon_points).transform('EPSG:4326', _this2.projection)
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
                  geometry: new geom.Circle([sub_area.lng, sub_area.lat], sub_area.radius / 100000).transform('EPSG:4326', _this2.projection)
                });
              }

              subFeature.setId(sub_area.area_id);
              features.push(subFeature);
            });
          }

          features.push(feature);
        };

        for (var area of areas) {
          var _ret = _loop(area);

          if (_ret === "continue") continue;
        }

        return features;
      };

      var showLoading = bool => {
        if (bool) this.divControl.classList.add('ol-dji-geozone--isLoading');else this.divControl.classList.remove('ol-dji-geozone--isLoading');
      }; // Prevent multiples requests


      this.idAreasRequest += 1;
      var request = this.idAreasRequest; // Original DJI map same behavior to prevent multiples requests

      setTimeout( /*#__PURE__*/function () {
        var _ref7 = _asyncToGenerator(function* (_) {
          if (request !== _this2.idAreasRequest) return;

          try {
            showLoading(true);

            var center = _this2.view.getCenter();

            var center4326 = proj.transform(center, _this2.projection, 'EPSG:4326');
            var viewLatLng = {
              lat: center4326[1],
              lng: center4326[0]
            };

            if (clear) {
              _this2.areaDownloaded = null; // Remove area already downloaded
            }

            var data = yield _this2.getApiGeoData('areas', viewLatLng);

            if (clear) {
              _this2.source.clear(); // Remove features on layer

            }

            var features = apiResponseToFeatures(data);

            _this2.source.addFeatures(features);

            showLoading(false); // console.log(data);
            // console.log(features);
          } catch (err) {
            console.error(err);
            showLoading(false);
          }
        });

        return function (_x3) {
          return _ref7.apply(this, arguments);
        };
      }(), 300);
    }

    getApiGeoData(typeApiRequest, latLng) {
      var _this3 = this;

      return _asyncToGenerator(function* () {
        var apiRequest = /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator(function* (type, _ref8, searchRadius) {
            var {
              lng,
              lat
            } = _ref8;
            var api_endpoint = type === 'areas' ? API_AREAS_ENDPOINT : API_INFO_ENDPOINT; // If not proxy is passed, make a direct request
            // Maybe in the future the api will has updated CORS restrictions

            var url = new URL(_this3.url_proxy ? _this3.url_proxy + api_endpoint : 'https://' + api_endpoint);
            var queryObj = {
              'drone': _this3.drone,
              'zones_mode': _this3.zones_mode,
              'country': _this3.country,
              'level': _this3.level,
              'lng': lng,
              'lat': lat,
              'search_radius': searchRadius
            };
            Object.keys(queryObj).forEach(key => url.searchParams.append(key, queryObj[key]));
            var response = yield fetch(url);
            if (!response.ok) throw new Error("HTTP-Error: " + response.status);
            return yield response.json();
          });

          return function apiRequest(_x4, _x5, _x6) {
            return _ref9.apply(this, arguments);
          };
        }();

        var getPointInfo = /*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(function* (latLng, searchRadius) {
            var data = yield apiRequest('info', latLng, searchRadius);
            return data;
          });

          return function getPointInfo(_x7, _x8) {
            return _ref10.apply(this, arguments);
          };
        }();

        var getAreas = /*#__PURE__*/function () {
          var _ref11 = _asyncToGenerator(function* (centerLatLng, searchRadius) {
            var extent$1 = _this3.view.calculateExtent();

            var polygon = Polygon.fromExtent(extent$1);

            if (_this3.areaDownloaded) {
              if (_this3.areaDownloaded.intersectsCoordinate(extent.getCenter(extent$1)) && _this3.areaDownloaded.intersectsCoordinate(extent.getBottomLeft(extent$1)) && _this3.areaDownloaded.intersectsCoordinate(extent.getTopRight(extent$1)) && _this3.areaDownloaded.intersectsCoordinate(extent.getBottomRight(extent$1)) && _this3.areaDownloaded.intersectsCoordinate(extent.getTopLeft(extent$1))) {
                // whe already have the data, do nothing
                return;
              }
            } else {
              _this3.areaDownloaded = new geom.MultiPolygon({});
            }

            _this3.areaDownloaded.appendPolygon(polygon);

            var data = yield apiRequest('areas', centerLatLng, searchRadius);
            return data;
          });

          return function getAreas(_x9, _x10) {
            return _ref11.apply(this, arguments);
          };
        }(); // adapted from https://stackoverflow.com/questions/44575654/get-radius-of-the-displayed-openlayers-map


        var getMapRadius = (_ref12) => {
          var {
            lng,
            lat
          } = _ref12;
          var center = [lng, lat];

          var size = _this3.map.getSize();

          var extent = _this3.view.calculateExtent(size);

          extent = proj.transformExtent(extent, _this3.projection, 'EPSG:4326');
          var posSW = [extent[0], extent[1]];
          var centerToSW = sphere.getDistance(center, posSW);
          return parseInt(centerToSW);
        };

        if (!_this3.isVisible) return;
        var searchRadius = getMapRadius(latLng);
        var data;

        if (typeApiRequest === 'areas') {
          data = yield getAreas(latLng, searchRadius);
        } else {
          data = yield getPointInfo(latLng, searchRadius);
        }

        return data;
      })();
    }

  } // https://stackoverflow.com/questions/28004153/setting-vector-feature-fill-opacity-when-you-have-a-hexadecimal-color

  function colorWithAlpha(color$1) {
    var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var [r, g, b] = Array.from(color.asArray(color$1));
    return color.asString([r, g, b, alpha]);
  }

  return DjiGeozone;

})));
