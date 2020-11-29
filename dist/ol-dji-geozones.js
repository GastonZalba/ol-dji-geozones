(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('ol/layer/Vector'), require('ol/source/Vector'), require('ol/Feature'), require('ol/Overlay'), require('ol/proj'), require('ol/sphere'), require('ol/geom'), require('ol/style'), require('ol/control'), require('ol/color'), require('ol/geom/Polygon'), require('ol/extent'), require('ol/Observable')) :
    typeof define === 'function' && define.amd ? define(['ol/layer/Vector', 'ol/source/Vector', 'ol/Feature', 'ol/Overlay', 'ol/proj', 'ol/sphere', 'ol/geom', 'ol/style', 'ol/control', 'ol/color', 'ol/geom/Polygon', 'ol/extent', 'ol/Observable'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.DjiGeozones = factory(global.ol.layer.Vector, global.ol.source.Vector, global.ol.Feature, global.ol.Overlay, global.ol.proj, global.ol.sphere, global.ol.geom, global.ol.style, global.ol.control, global.ol.color, global.ol.geom.Polygon, global.ol.extent, global.ol.Observable));
}(this, (function (VectorLayer, VectorSource, Feature, Overlay, proj, sphere, geom, style, control, color, Polygon, extent, Observable) { 'use strict';

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

    var en = {
      "labels": {
        "djiGeoZones": "Zonas Geo DJI",
        "level": "Nivel",
        "type": "Tipo",
        "startTime": "Horario de apertura",
        "endTime": "Horario de cierre",
        "timeTips": "Sistema horario: 24 horas",
        "maxAltitude": "Altitud máxima",
        "address": "Dirección",
        "tips": "Consejos",
        "link": "Enlace",
        "learnMore": "Leer más",
        "helperZoom": "Acérquese para ver las Zonas Geo",
        "expand": "Expandir",
        "collapse": "Colapsar"
      },
      "levels": [{
        "id": 0,
        "name": "Zonas de advertencia",
        "desc": "En estas Zonas, que pueden no aparecer necesariamente en el mapa DJI GO, los usuarios recibirán un mensaje de advertencia. Ejemplo de zona de advertencia: espacio aéreo de clase E"
      }, {
        "id": 1,
        "name": "Zonas de autorización",
        "desc": "En estas Zonas, que aparecen en azul en el mapa DJI GO, los usuarios recibirán una advertencia y el vuelo está limitado por defecto. Las zonas de autorización pueden ser desbloqueadas por usuarios autorizados mediante una cuenta verificada por DJI."
      }, {
        "id": 2,
        "name": "Zonas restringidas",
        "desc": "En estas Zonas, que aparecen en rojo en la aplicación DJI GO, los usuarios recibirán una advertencia y se impedirá el vuelo. Si cree que tiene la autorización para operar en una Zona restringida, comuníquese con flysafe@dji.com o Desbloqueo en línea."
      }, {
        "id": 3,
        "name": "Zonas de advertencia ampliadas",
        "desc": "En estas Zonas, GEO le pedirá en el momento del vuelo que desbloquee la zona siguiendo los mismos pasos que en una Zona de autorización, pero no necesita una cuenta verificada o una conexión a Internet en el momento de su vuelo."
      }, {
        "id": 4,
        "name": "Zonas reglamentarias restringidas",
        "desc": "Debido a las regulaciones y políticas locales, los vuelos están prohibidos dentro del alcance de algunas áreas especiales. (Ejemplo: prisión)"
      }, {
        "id": 5,
        "name": "Zonas recomendadas",
        "desc": ""
      }, {
        "id": 6,
        "name": "Zonas de altiutud",
        "desc": "Las zonas de altitud aparecerán en gris en el mapa. Los usuarios reciben advertencias en DJI GO o DJI GO 4 y la altitud de vuelo es limitada."
      }, {
        "id": 7,
        "name": "Zonas recomendadas",
        "desc": "Esta área se muestra en verde en el mapa. Se recomienda que elija estas áreas para los arreglos de vuelo."
      }, {
        "id": 8,
        "name": "Zonas aprobadas para VANTs livianos (China)",
        "desc": "Para las zonas aprobadas, los pilotos de vehículos aéreos no tripulados ligeros que vuelan a una altitud de 120 mo menos no están obligados a obtener permiso para volar. Los pilotos que planean volar UAV de tamaño mediano en Zonas Aprobadas a una altitud superior a 120 m, o en Zonas GEO distintas de las Zonas Aprobadas, deben obtener permiso a través de UTMISS antes de despegar."
      }, {
        "id": 9,
        "name": "Áreas densamente pobladas",
        "desc": "Esta área se muestra en rojo en el mapa. En circunstancias normales, la población de esta zona está más concentrada, así que no sobrevuele esta zona. (Ejemplo: bloque comercial)"
      }],
      "types": [{
        "id": 0,
        "name": "Aeropuerto"
      }, {
        "id": 1,
        "name": "Zona especial"
      }, {
        "id": 2,
        "name": "Zona Militar"
      }, {
        "id": 4,
        "name": "Zona recomendada"
      }, {
        "id": 10,
        "name": "Aeropuerto"
      }, {
        "id": 13,
        "name": "Aeropuerto recreacional"
      }, {
        "id": 14,
        "name": "Aeropuerto recreacional"
      }, {
        "id": 15,
        "name": "Espacio aéreo clase B"
      }, {
        "id": 16,
        "name": "Espacio aéreo clase C"
      }, {
        "id": 17,
        "name": "Espacio aéreo clase D"
      }, {
        "id": 18,
        "name": "Espacio aéreo clase E"
      }, {
        "id": 19,
        "name": "Helipuerto"
      }, {
        "id": 23,
        "name": "Planta de energía"
      }, {
        "id": 24,
        "name": "Prisión"
      }, {
        "id": 26,
        "name": "Estadio"
      }, {
        "id": 27,
        "name": "Espacio aéreo prohibido"
      }, {
        "id": 28,
        "name": "Espacio aéreo restringido"
      }, {
        "id": 29,
        "name": "Restricción de vuelo temporal"
      }, {
        "id": 30,
        "name": "Planta de energía nuclear"
      }, {
        "id": 31,
        "name": "Aeropuertos sin pavimentar"
      }, {
        "id": 32,
        "name": "Zonas especiales"
      }, {
        "id": 33,
        "name": "Zonas militares"
      }, {
        "id": 34,
        "name": "Helipuerto"
      }, {
        "id": 35,
        "name": "Base de hidroaviones"
      }, {
        "id": 36,
        "name": "Restricción de vuelo temporal"
      }, {
        "id": 39,
        "name": "Zonas aprobadas para VANTs livianos"
      }, {
        "id": 41,
        "name": "Zonas reglamentarias restringidas para VANTs livianos"
      }]
    };

    var es = {
      "labels": {
        "djiGeoZones": "Dji Geo Zones",
        "level": "Level",
        "type": "Type",
        "startTime": "Start Time",
        "endTime": "End Time",
        "timeTips": "Time: 24-hour clock",
        "maxAltitude": "Max. Altitude",
        "address": "Address",
        "tips": "Tips",
        "link": "Link",
        "learnMore": "Learn More",
        "helperZoom": "Zoom in to see the Geo Zones",
        "expand": "Expand",
        "collapse": "Collapse"
      },
      "levels": [{
        "id": 0,
        "name": "Warning Zones",
        "desc": "In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace"
      }, {
        "id": 1,
        "name": "Authorization Zones",
        "desc": "In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account."
      }, {
        "id": 2,
        "name": "Restricted Zones",
        "desc": "In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking."
      }, {
        "id": 3,
        "name": "Enhanced Warning Zones",
        "desc": "In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight."
      }, {
        "id": 4,
        "name": "Regulatory Restricted Zones",
        "desc": "Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)"
      }, {
        "id": 5,
        "name": "Recommended Zones",
        "desc": ""
      }, {
        "id": 6,
        "name": "Altitude Zones",
        "desc": "Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited."
      }, {
        "id": 7,
        "name": "Recommended Zones",
        "desc": "This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements."
      }, {
        "id": 8,
        "name": "Approved Zones for Light UAVs(China)",
        "desc": "For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off"
      }, {
        "id": 9,
        "name": "Densely Populated Area",
        "desc": "This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)"
      }],
      "types": [{
        "id": 0,
        "name": "Airport"
      }, {
        "id": 1,
        "name": "Special Zone"
      }, {
        "id": 2,
        "name": "Military Zone"
      }, {
        "id": 4,
        "name": "Recommended Zones"
      }, {
        "id": 10,
        "name": "Airport"
      }, {
        "id": 13,
        "name": "Recreational airport"
      }, {
        "id": 14,
        "name": "Recreational airport"
      }, {
        "id": 15,
        "name": "Class B Airspace"
      }, {
        "id": 16,
        "name": "Class C Airspace"
      }, {
        "id": 17,
        "name": "Class D Airspace"
      }, {
        "id": 18,
        "name": "Class E Airspace"
      }, {
        "id": 19,
        "name": "Heliport"
      }, {
        "id": 23,
        "name": "Power plant"
      }, {
        "id": 24,
        "name": "Prison"
      }, {
        "id": 26,
        "name": "Stadium"
      }, {
        "id": 27,
        "name": "Prohibited Airspace"
      }, {
        "id": 28,
        "name": "Restricted Airspace"
      }, {
        "id": 29,
        "name": "Temporary Flight Restriction"
      }, {
        "id": 30,
        "name": "Nuclear Power Plant"
      }, {
        "id": 31,
        "name": "Unpaved Airports"
      }, {
        "id": 32,
        "name": "Special Zones"
      }, {
        "id": 33,
        "name": "Military Zones"
      }, {
        "id": 34,
        "name": "Heliport"
      }, {
        "id": 35,
        "name": "Seaplane Base"
      }, {
        "id": 36,
        "name": "Temporary Flight Restriction"
      }, {
        "id": 39,
        "name": "Approved Zones for Light UAVs"
      }, {
        "id": 41,
        "name": "Regulatory Restricted Zones for Light UAVs"
      }]
    };

    var languages = /*#__PURE__*/Object.freeze({
        __proto__: null,
        en: en,
        es: es
    });

    const img = "data:image/svg+xml,%3csvg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 280.18 280.18'%3e%3cdefs%3e%3cstyle%3e.cls-1%7bfill:%23ffce00%3bfill-opacity:0.68%3bstroke:%23ffce00%3b%7d.cls-1%2c.cls-3%2c.cls-5%2c.cls-6%7bstroke-miterlimit:10%3bstroke-width:0.75px%3b%7d.cls-2%7bfill:%23ff7900%3bfill-opacity:0.46%3b%7d.cls-3%7bfill:%231072d6%3bfill-opacity:0.57%3bstroke:%231072d6%3b%7d.cls-4%7bopacity:0.63%3b%7d.cls-5%7bfill:%23bcbcbc%3bstroke:%23666%3b%7d.cls-6%7bfill:%23fc3424%3bfill-opacity:0.4%3bstroke:%23fc3424%3b%7d%3c/style%3e%3c/defs%3e%3cpath class='cls-1' d='M109.79%2c109.23c-44.68%2c44.68-40.36%2c121.45%2c9.66%2c171.47S246.24%2c335%2c290.92%2c290.36s40.36-121.46-9.65-171.48S154.48%2c64.54%2c109.79%2c109.23ZM270.56%2c270c-34.64%2c34.64-94.15%2c31.29-132.92-7.48s-42.12-98.28-7.48-132.92%2c94.14-31.29%2c132.92%2c7.48S305.2%2c235.36%2c270.56%2c270Z' transform='translate(-59.88 -59.29)'/%3e%3cpath class='cls-2' d='M130.16%2c129.59c-34.64%2c34.64-31.29%2c94.15%2c7.48%2c132.92s98.28%2c42.12%2c132.92%2c7.48%2c31.29-94.14-7.48-132.92S164.79%2c95%2c130.16%2c129.59Zm118%2c118c-24%2c24-64.91%2c22.14-91.29-4.23S128.56%2c176.07%2c152.6%2c152s64.91-22.14%2c91.28%2c4.24S272.15%2c223.51%2c248.12%2c247.55Z' transform='translate(-59.88 -59.29)'/%3e%3cellipse class='cls-3' cx='200.36' cy='199.79' rx='61.55' ry='67.54' transform='translate(-142.47 140.9) rotate(-45)'/%3e%3cg id='Layer_3' data-name='Layer 3'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='166.25 180 236.66 279.6 236.75 279.51 279.51 236.75 279.6 236.66 180 166.25 166.25 180'/%3e%3cpolygon class='cls-5' points='113.92 100.18 43.51 0.58 43.43 0.67 0.67 43.43 0.58 43.51 100.18 113.92 113.92 100.18'/%3e%3c/g%3e%3cpolygon class='cls-6' points='180 113.92 166.25 100.18 140.09 126.34 113.92 100.18 100.18 113.92 126.34 140.09 100.18 166.25 113.92 180 140.09 153.84 166.25 180 180 166.25 153.84 140.09 180 113.92'/%3e%3c/g%3e%3cg id='Layer_3_copy' data-name='Layer 3 copy'%3e%3cg class='cls-4'%3e%3cpolygon class='cls-5' points='100.18 166.25 0.58 236.66 0.67 236.75 43.43 279.51 43.51 279.6 113.92 180 100.18 166.25'/%3e%3cpolygon class='cls-5' points='180 113.92 279.6 43.51 279.51 43.43 236.75 0.67 236.66 0.58 166.25 100.18 180 113.92'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

    const img$1 = "data:image/svg+xml,%3c!-- Generated by IcoMoon.io --%3e%3csvg version='1.1' xmlns='http://www.w3.org/2000/svg' width='768' height='768' viewBox='0 0 768 768'%3e%3ctitle%3e%3c/title%3e%3cg id='icomoon-ignore'%3e%3c/g%3e%3cpath d='M352.5 288v-64.5h63v64.5h-63zM384 640.5q105 0 180.75-75.75t75.75-180.75-75.75-180.75-180.75-75.75-180.75 75.75-75.75 180.75 75.75 180.75 180.75 75.75zM384 64.5q132 0 225.75 93.75t93.75 225.75-93.75 225.75-225.75 93.75-225.75-93.75-93.75-225.75 93.75-225.75 225.75-93.75zM352.5 544.5v-192h63v192h-63z'%3e%3c/path%3e%3c/svg%3e";

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
      constructor(map, opt_options) {
        var options = Object.assign({}, opt_options); // LANGUAGE SUPPORT

        this.i18n = options.i18n || languages[options.language || 'en']; // API PARAMETERS

        this.drone = options.drone || 'spark';
        this.zonesMode = options.zonesMode || 'total';
        this.country = options.country || 'US';
        this.levelsToDisplay = options.levelsToDisplay || [2, 6, 1, 0, 3, 4, 7];
        this.levelsActive = options.levelsActive || [2, 6, 1, 0, 3, 4, 7];
        this.levelsParamsList = levelsParams; // If not provided, we use all the available drones
        // This can be passed to use translations.

        this.dronesToDisplay = options.dronesToDisplay || dronesList;
        this.extent = options.extent || null; // Add slash on the end if not present

        this.urlProxy = options.urlProxy.replace(/\/?$/, '/');
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

          var createButtonCollapser = () => {
            var buttonCollapse = document.createElement('button');
            buttonCollapse.className = 'ol-dji-geozones--collapse';
            buttonCollapse.title = this.i18n.labels.collapse;

            buttonCollapse.onclick = () => divControl.classList.add('ol-dji-geozones--collapsed');

            return buttonCollapse;
          };

          var divControl = document.createElement('div');
          divControl.className = 'ol-dji-geozones ol-control ol-dji-geozones--ctrl-disabled';
          divControl.innerHTML = "\n            <header>\n                <h3>".concat(this.i18n.labels.djiGeoZones, "</h3>\n                <span class=\"ol-dji-geozones--loading\">\n                    ").concat(this.loadingElement, "\n                </span>\n            </header>\n            <main>\n                <section class=\"ol-dji-geozones--selectors\"></section>\n                <section>\n                    <div class=\"ol-dji-geozones--logo\" title=\"").concat(this.i18n.labels.expand, "\"><img src=\"").concat(img, "\"/></div>\n                    <span class=\"ol-dji-geozones--advice\">").concat(this.i18n.labels.helperZoom, "</span>\n                </section>\n            </main>\n            ");
          var droneSelector = createDroneSelector();
          divControl.querySelector('.ol-dji-geozones--selectors').append(droneSelector);
          var levelSelector = createLevelSelector();
          divControl.querySelector('.ol-dji-geozones--selectors').append(levelSelector);
          var buttonCollapse = createButtonCollapser();
          divControl.querySelector('header').append(buttonCollapse);
          var logo = divControl.querySelector('.ol-dji-geozones--logo');

          logo.onclick = () => divControl.classList.remove('ol-dji-geozones--collapsed');

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

          this.moveendEvtKey = this.map.on('moveend', () => {
            this.currentZoom = this.view.getZoom();
            if (this.currentZoom !== this.lastZoom) handleZoomEnd();else handleDragEnd();
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
              var evtKey;

              var showPopUp = () => {
                infoTooltip.style.position = 'fixed';
                infoTooltip.style.top = iconTooltip.getBoundingClientRect().top + 'px';
                infoTooltip.classList.add('ol-dji-geozones--active-tooltip');
                evtKey = this.map.once('movestart', () => closePopUp());
              };

              var closePopUp = () => {
                infoTooltip.classList.remove('ol-dji-geozones--active-tooltip');
                Observable.unByKey(evtKey);
              };

              var infoTooltip = document.createElement('span');
              infoTooltip.className = 'ol-dji-geozones--info';
              infoTooltip.innerHTML = "<span class=\"ol-dji-geozones--info-text\">".concat(levelParams.desc, "</span><span class=\"ol-dji-geozones--info-back\"></span>");
              infoTooltip.setAttribute('style', "--level-color: ".concat(levelParams.color));
              var iconTooltip = document.createElement('span');
              iconTooltip.className = 'ol-dji-geozones--icon';
              iconTooltip.innerHTML = "<img src=\"".concat(img$1, "\">");

              iconTooltip.onmouseover = () => showPopUp();

              iconTooltip.onclick = () => showPopUp();

              iconTooltip.onmouseout = () => closePopUp();

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
              var lbl = this.i18n.labels;
              var html = "\n                    <div class=\"ol-dji-geozones--marker\">\n                        <img src=\"".concat(levelParams.markerCircle, "\">\n                    </div>\n                    <div class=\"ol-dji-geozones--main\">\n                        <h3 class=\"ol-dji-geozones--title\">").concat(name, "</h3>\n                        <p class=\"ol-dji-geozones--level\">").concat(lbl.level, ": ").concat(levelParams.name, " </p>\n                        <p class=\"ol-dji-geozones--type\">").concat(lbl.type, ": ").concat(this.getGeozoneTypeById(type).name, "</p>\n                        ").concat(begin_at ? "<p class=\"ol-dji-geozones--start_time\">".concat(lbl.startTime, ": ").concat(begin_at, "</p>") : '', "\n                        ").concat(end_at ? "<p class=\"ol-dji-geozones--end_time\">".concat(lbl.endTime, ": ").concat(end_at, "</p><p class=\"ol-dji-geozones--time_tips\">").concat(lbl.timeTips, "</p>") : '', "         \n                        ").concat(height ? "<p class=\"ol-dji-geozones--height\">".concat(lbl.maxAltitude, " (m): ").concat(height, "</p>") : '', " \n                        ").concat(address ? "<p class=\"ol-dji-geozones--address\">".concat(lbl.address, ": ").concat(address, "</p>") : '', "\n                        ").concat(description ? "<p class=\"ol-dji-geozones--desc\">".concat(lbl.tips, ": ").concat(description, "</p>") : '', "\n                        ").concat(url ? "<p class=\"ol-dji-geozones--url\">".concat(lbl.link, ": <a href=\"").concat(url, "\">").concat(lbl.learnMore, "</a></p>") : '', "\n                </div>");
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
       * @param typeApiRequest
       * @param latLng
       * @private
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

              var url = new URL(this.urlProxy ? this.urlProxy + api_endpoint : api_endpoint);
              var queryObj = {
                drone: this.drone,
                zones_mode: this.zonesMode,
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
       * Show or hides the control panel
       * @param visible
       */


      setPanelVisible(visible) {
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
       *
       * @param id
       * @private
       */


      getGeozoneTypeById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.i18n.types.find(el => el.id == id);
      }
      /**
       * Gets a list with all the supported Drones
       * @private
       */


      getDrones() {
        return this.dronesToDisplay;
      }
      /**
       * Set the drone parameter for the api request.
       * @param drone
       * @param refresh If true, refresh the view making a new api request
       */


      setDrone(drone) {
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
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


      setCountry(country) {
        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        this.country = country;

        if (refresh) {
          this.getInfoFromView();
        }
      }
      /**
       * Get the parameters from all the levels
       * @private
       */


      getLevelsParams() {
        return this.levelsParamsList;
      }
      /**
       * Get the level parameters, like color, icon, and description
       * @param id
       * @private
       */


      getLevelParamsById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        return this.levelsParamsList.find(lev => lev.id == id);
      }
      /**
       * Get all the parameters from a level and the i18n texts
       * @param id
       */


      getLevelById() {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var params = this.levelsParamsList.find(lev => lev.id == id);
        var texts = this.i18n.levels.find(lev => lev.id == id);
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
       * Removes the control, layers and events from the map
       */


      destroy() {
        this.map.removeControl(this.control);
        this.getLayers().forEach(layer => {
          this.map.removeLayer(layer);
        });
        Observable.unByKey(this.clickEvtKey);
        Observable.unByKey(this.moveendEvtKey);
      }
      /**
       *  **_[static]_** - Generate an RGBA color from an hexadecimal
       *
       * Adapted from https://stackoverflow.com/questions/28004153
       * @param color Hexadeciaml color
       * @param alpha Opacity
       * @private
       */


      static colorWithAlpha(color$1) {
        var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var [r, g, b] = Array.from(color.asArray(color$1));
        return color.asString([r, g, b, alpha]);
      }

    }

    return DjiGeozones;

})));
