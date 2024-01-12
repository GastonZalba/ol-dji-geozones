# OpenLayers DjiGeozones

<p align="center">
    <a href="https://www.npmjs.com/package/ol-dji-geozones">
        <img src="https://img.shields.io/npm/v/ol-dji-geozones.svg" alt="npm version">
    </a>
    <a href="https://img.shields.io/npm/dm/ol-dji-geozones">
        <img alt="npm" src="https://img.shields.io/npm/dm/ol-dji-geozones">
    </a>
    <a href="https://github.com/gastonzalba/ol-dji-geozones/blob/master/LICENSE">
        <img src="https://img.shields.io/npm/l/ol-dji-geozones.svg" alt="license">
    </a>
</p>

Displays DJI Geo Zones on an OpenLayers map. Also, you can add a Control Panel with map legends and selectors to change the drone and the levels to be shown.

The data is obtained directly from an undocumented DJI [API](https://www-api.dji.com/api/geo/areas). The official DJI Fly Safe Geo Zone Map that use the same data can be found [here](https://www.dji.com/flysafe/geo-map), and more information [here](https://www.dji.com/flysafe/introduction).

Tested with OpenLayers version 5, 6, 7 and 8.

### DISCLAIMER

Nowadays, DJI doesn't offer any API documentation, so future support and access to the data is uncertain. Furthermore, the API endpoint has CORS restrictions and the header `Content-Security-Policy:
frame-ancestors 'self' http://*.dji.com https://*.dji.com`, so all browsers requests must be proxied.

<img src="screenshots/example-1.jpg" alt="Light mode">
<img src="screenshots/example-2.jpg" alt="Dark mode">

## Examples

All the examples are configured using a free Proxy. If you notice some lag or slow performance, try one of your own.

-   Basic usage: create an OpenLayers map instance, and pass that map and options to the DjiGeozones constructor.
    -   [Full Panel](https://raw.githack.com/GastonZalba/ol-dji-geozones/v2.2.3/examples/basic.html)
    -   [Compact Panel](https://raw.githack.com/GastonZalba/ol-dji-geozones/v2.2.3/examples/basic_compact.html)

## Usage

```js
// Default options
let opt_options = {
    urlProxy: '',
    buffer: 10000, // to increase search zone (in meters)
    drone: 'spark', // See drone parameter in the DJI API section
    zonesMode: 'total', // See drone parameter in the DJI API section
    country: 'US', // See country parameter in the DJI API section
    showGeozoneIcons: true, // Display geozones icons
    displayLevels: [2, 6, 1, 0, 3, 4, 7], // Order is kept in the Control Panel
    activeLevels: [2, 6, 1, 0, 3, 4, 7],
    createPanel: 'full', // Create or not the control
    targetPanel: null, // Specify a target if you want the control to be rendered outside of the map's viewport.
    startCollapsed: false,
    startActive: true,
    dronesToDisplay: [], // By default, an array with all the drones
    extent: null,
    loadingElement:
        '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
    clickEvent: 'singleclick',
    language: 'en',
    i18n: {}, // Create customized languages/texts. See i18n folder
    alert: null
};

// SETTING A REVERSE PROXY TO AVOID CORS
// For testing, you can run `chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security` to
// launch a Google Chrome instance with CORS disabled.
// This example uses allOrigins (https://github.com/gnuns/allOrigins), a free and open source javascript proxy.
// For production, deploy a custom instance or use yor own proxy.
opt_options.urlProxy = 'https://api.allorigins.win/raw?url=';

const djiGeozones = new DjiGeozones(opt_options);

map.addControl(djiGeozones); // or djiGeozones.setMap(map)
```

### Methods

```js
// Instance methods
// This methods clean the loaded features and fires a new API request.
djiGeozones.drone = 'spark';
djiGeozones.country = 'US'; // At the moment, this doesn't seem to affect the api response
djiGeozones.zonesMode = 'total';

djiGeozones.activeLevels = [1, 2, 3, 4, 6, 7]; // Set custom level values
djiGeozones.addLevels(5);
djiGeozones.removeLevels(7);

djiGeozones.setPanelVisible(true); // Show/hide the control panel
djiGeozones.setPanelCollapsed(true); // Collapse/expand the control panel

djiGeozones.hide(); // Hide the GeoZones and the map Control
djiGeozones.show(); // Show the GeoZones and the map Control

let layers = djiGeozones.layers; // array of ol/layer/Vector~VectorLayer instances
let layer = djiGeozones.getLayerByLevel(7); // returns an ol/layer/Vector~VectorLayer instance with the specefic level
```

### Events

```js
djiGeozones.once(`init`, () => console.log('Library is loaded'));
djiGeozones.on(`error`, () => console.log('An error ocurred'));
```

## [DJI API](https://www-api.dji.com/api/geo/areas) - What we know

### Some considerations

-   The API doesn't accepts requests in large zoom levels (<9) aka search_radius, so the Geozones in the map are disabled in these zoom scales to manage this beahaivor.

-   The data returned by the API has some problems/strange behaviors:

    -   The elements in _level 6_ (Altitude Zones, grey color) are returning from the api with _level 2_ in the properties (Restricted Zones, red color), and the elements in _level 4_ (Regulatory Restricted Zones, light blue color) with _level 7_ (Recommended Zones, green color).
        This makes very messy the frontend, and make it impossible to filter these levels accordingly in each request. To avoid this problem, this module functions completely different from the official map: performs the API requests including all _levels_, distributing the results in differents layers according to each level, and filtering that manipulating the layers visibility (not by the API request).

-   See [DjiApi API](#DjiApi) for parameters and details.

## Changelog

See [CHANGELOG](./CHANGELOG.md) for details of changes in each release.

## Install

### Browser

#### JS

Load `ol-dji-geozones.js` after OpenLayers. Dji Geozones is available as `DjiGeozones`.

```HTML
<script src="https://unpkg.com/ol-dji-geozones@2.2.3"></script>
```

#### CSS

```HTML
<link rel="stylesheet" href="https://unpkg.com/ol-dji-geozones@2.2.3/dist/ol-dji-geozones.min.css" />
```

### Parcel, Webpack, etc.

NPM package: [ol-dji-geozones](https://www.npmjs.com/package/ol-dji-geozones).

Install the package via `npm`

    npm install ol-dji-geozones

#### JS

```js
import DjiGeozones from 'ol-dji-geozones';
```

#### CSS

```js
// css
import 'ol-dji-geozones/lib/css/ol-dji-geozones.css';
// or scss
import 'ol-dji-geozones/lib/scss/ol-dji-geozones.scss';
```

##### TypeScript type definition

TypeScript types are shipped with the project in the dist directory and should be automatically used in a TypeScript project. Interfaces are provided for DjiGeozones Options.

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [DjiGeozones](#djigeozones)
    -   [Parameters](#parameters)
    -   [setMap](#setmap)
        -   [Parameters](#parameters-1)
    -   [setPanelVisible](#setpanelvisible)
        -   [Parameters](#parameters-2)
    -   [setPanelCollapsed](#setpanelcollapsed)
        -   [Parameters](#parameters-3)
    -   [layers](#layers)
    -   [getLayerByLevel](#getlayerbylevel)
        -   [Parameters](#parameters-4)
    -   [drone](#drone)
        -   [Parameters](#parameters-5)
    -   [drone](#drone-1)
    -   [zonesMode](#zonesmode)
        -   [Parameters](#parameters-6)
    -   [zonesMode](#zonesmode-1)
    -   [country](#country)
        -   [Parameters](#parameters-7)
    -   [country](#country-1)
    -   [getLevelById](#getlevelbyid)
        -   [Parameters](#parameters-8)
    -   [activeLevels](#activelevels)
        -   [Parameters](#parameters-9)
    -   [addLevels](#addlevels)
        -   [Parameters](#parameters-10)
    -   [removeLevels](#removelevels)
        -   [Parameters](#parameters-11)
    -   [destroy](#destroy)
    -   [hide](#hide)
    -   [show](#show)
-   [ErrorEvent](#errorevent)
    -   [Parameters](#parameters-12)
-   [deepObjectAssign](#deepobjectassign)
    -   [Parameters](#parameters-13)
-   [ApiReqArguments](#apireqarguments)
    -   [level](#level)
    -   [drone](#drone-2)
    -   [country](#country-2)
    -   [zones_mode](#zones_mode)
    -   [lng](#lng)
    -   [lat](#lat)
    -   [search_radius](#search_radius)
-   [i18n](#i18n)
-   [Options](#options)
    -   [urlProxy](#urlproxy)
    -   [encodeURIRequest](#encodeurirequest)
    -   [buffer](#buffer)
    -   [zonesMode](#zonesmode-2)
    -   [country](#country-3)
    -   [showGeozoneIcons](#showgeozoneicons)
    -   [displayLevels](#displaylevels)
    -   [activeLevels](#activelevels-1)
    -   [dronesToDisplay](#dronestodisplay)
    -   [extent](#extent)
    -   [createPanel](#createpanel)
    -   [target](#target)
    -   [startCollapsed](#startcollapsed)
    -   [startActive](#startactive)
    -   [loadingElement](#loadingelement)
    -   [clickEvent](#clickevent)
    -   [theme](#theme)
    -   [language](#language)
    -   [i18n](#i18n-1)
    -   [alert](#alert)
        -   [Parameters](#parameters-14)

### DjiGeozones

**Extends ol/control/Control~Control**

OpenLayers Dji Geozones, creates multiples VectorLayers to
display interactives DJI Geo Zones on the map, requesting the
data on the fly to an DJI API.

Also, add a Control to select levels of interest and drone to filter the results.

#### Parameters

-   `opt_options` **[Options](#options)?** DjiGeozones options, see [DjiGeozones Options](#options) for more details.

#### setMap

Remove the control from its current map and attach it to the new map.
Pass null to just remove the control from the current map.

##### Parameters

-   `map` **[Map](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)**&#x20;

Returns **void**&#x20;

#### setPanelVisible

Show or hides the control panel

##### Parameters

-   `visible` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;

Returns **void**&#x20;

#### setPanelCollapsed

Collapse/expand the control panel

##### Parameters

-   `collapsed` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)**&#x20;

Returns **void**&#x20;

#### layers

Get all the layers

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<VectorLayer\<VectorSource\<Geometry>>>

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<VectorLayer\<VectorSource\<Geometry>>>**&#x20;

#### getLayerByLevel

Get the layer acordding the level

##### Parameters

-   `level` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)**&#x20;

Returns **VectorLayer\<VectorSource\<Geometry>>**&#x20;

#### drone

Setter for API parameter `drone`. Triggers an API request

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Parameters

-   `drone` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### drone

Getter for Api parameter drone

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### zonesMode

Setter for API parameter `zonesMode`. Triggers an API request

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Parameters

-   `zonesMode` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### zonesMode

Getter for API parameter `zonesMode`

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### country

Setter for API parameter `country`. Triggers an API request

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

##### Parameters

-   `country` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### country

Getter for API parameter `country`

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

Returns **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

#### getLevelById

Get all the parameters from a level and the i18n texts

##### Parameters

-   `id` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** (optional, default `null`)

Returns **Level**&#x20;

#### activeLevels

Replace the active levels with this values and refresh the view

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

##### Parameters

-   `levels` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>**&#x20;

#### addLevels

Add the level/s to the view

##### Parameters

-   `levels` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))**&#x20;
-   `refresh` If true, refresh the view and show the active levels (optional, default `true`)

Returns **void**&#x20;

#### removeLevels

Remove the level/s from the view

##### Parameters

-   `levels` **([Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)> | [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number))**&#x20;
-   `refresh` If true, refresh the view and show the actived levels (optional, default `true`)

Returns **void**&#x20;

#### destroy

Removes the control, layers, overlays and events from the map

Returns **void**&#x20;

#### hide

Hide the geoZones and the Control

Returns **void**&#x20;

#### show

Show the geoZones and the Control

Returns **void**&#x20;

### ErrorEvent

**Extends BaseEvent**

Custom Event to pass error in the dispatchEvent

#### Parameters

-   `error` **[Error](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Error)**&#x20;

### deepObjectAssign

#### Parameters

-   `target` &#x20;
-   `sources` **...any**&#x20;

### ApiReqArguments

**_\[interface]_** - Dji Api Parameters for requests

#### level

-   `0` - Warning Zones
-   `1` - Authorization Zones
-   `2` - Restricted Zones
-   `3` - Enhanced Warning Zones
-   `4` - Regulatory Restricted Zones
-   `5` - Recommended Zones (2) **Apparently this level is only valid for Japan**
-   `6` - Altitude Zones
-   `7` - Recommended Zones
-   `8` - Approved Zones for Light UAVs(China) **Only valid for China**
-   `9` - Densely Populated Area **NOT SUPPORTED - This level exists in the oficial Geo Zone Map, but this data is not provided by the api. On the other hand, now days this level is apparently valid only for Japan and China**

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

#### drone

-   `dji-mavic-3` (Mavic 3)
-   `dji-mini-se` (Mavic Mini SE)
-   `dji-air-2s` (Air 2s)
-   `dji-fpv` (FPV)
-   `mavic-mini-2` (Mavic Mini 2)
-   `mavic-mini` (Mavic Mini)
-   `mavic-2-enterprise` (Mavic 2 Enterprise)
-   `mavic-2` (Mavic 2)
-   `mavic-air` (Mavic Air)
-   `mavic-air-2` (Mavic Air 2)
-   `mavic-pro` (Mavic Pro)
-   `spark` (Spark)
-   `phantom-4-pro` (Phantom 4 Pro)
-   `phantom-4-advanced` (Phantom 4 Advanced)
-   `phantom-4` (Phantom 4)
-   `phantom-4-rtk` (Phantom 4 RTK)
-   `phantom-4-multispectral` (Phantom 4 Multispectral)
-   `phantom-3-pro` (Phantom 3 Pro
-   `phantom-3-advanced` (Phantom 3 Advanced)
-   `phantom-3-standard` (Phantom 3 Standard)
-   `phantom-3-4K` (Phantom 3 4K)
-   `phantom-3-se` (Phantom 3 SE)
-   `inspire-2` (Inspire 2)
-   `inspire-1-series` (Inspire 1 Series)
-   `m200-series` (M200 Series)
-   `m300-series` (M300 Series)
-   `m600-series` (M600 Series)
-   `m100` (M100)
-   `mg1p` (MG 1S/1A/1P/1P RTK/T10/T16/T20/T30)
-   `dji-mini-2` (DJI Mini 2)

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### country

Apparently doesn't affects the response of the api

-   `US`
-   `AR`
-   _etc_ ([See the supported list](https://www.dji.com/flysafe/geo-map))

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### zones_mode

Apparently only accepts 'total'

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### lng

Map View center point Longitude

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### lat

Map View center point Latitude

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### search_radius

Radius of the current view of the map

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

### i18n

**_\[interface]_** - Custom Language specified when creating a DjiGeozones

### Options

**_\[interface]_** - DjiGeozones Options specified when creating a DjiGeozones instance

Default values:

```javascript
{
  urlProxy: '',
  encodeURIRequest: true,
  buffer: 10000, // meters
  drone: 'spark', // See parameter in the DJI API section
  zonesMode: 'total', // See parameter in the DJI API section
  country: 'US', // See parameter in the DJI API section
  showGeozoneIcons: true, // Display geozones icons
  displayLevels: [2, 6, 1, 0, 3, 4, 7],
  activeLevels: [2, 6, 1, 0, 3, 4, 7],
  createPanel: 'full',
  targetPanel: null,
  startCollapsed: true,
  startActive: true,
  dronesToDisplay: null,
  extent: null,
  loadingElement: '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>',
  clickEvent: 'singleclick',
  theme: 'light',
  language: 'en',
  i18n: {...} // Translations according to selected language
  alert: alert // Default browser alert function
}
```

#### urlProxy

Url/endpoint from a Reverse Proxy to avoid CORS restrictions

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### encodeURIRequest

To encode or not the outgoing request (depending on proxy)

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### buffer

Current map radius is increased by the provided value (in meters) and used to request the areas.
Very useful for the highest zoom levels, to allow geozones near by being displayed.
A value of 0 will only search geozones (the centroid of these) that are inside the current view extent.

Type: [number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)

#### zonesMode

zonesMode to be used in the API request

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### country

Country identifier to be used in the API request

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### showGeozoneIcons

Display geozones icons

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### displayLevels

Geozone Levels to be shown in the control panel

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

#### activeLevels

Geozone Levels to be actived by default in the Control and API request

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>

#### dronesToDisplay

Use a custom drone list to show in the select. If not provided, we use all the available drones
See [drone](#drone-2) for the complete list.

Type: [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<Drone>

#### extent

The bounding extent for layer rendering.
The layers will not be rendered outside of this extent.

Type: Extent

#### createPanel

Create or not a control panel on the map

-   'full' displays each level as a layer, with the possibility to activate or deactivate each one,
    color legends and a drone switcher.
-   'compact' it's a simple toggler button to enable/disable the geoZones.
-   use false to disable the panel

Type: ([boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `"full"` | `"compact"`)

#### target

Specify a target if you want the control to be rendered outside of the map's viewport.

Type: ([HTMLElement](https://developer.mozilla.org/docs/Web/HTML/Element) | [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String))

#### startCollapsed

Whether panel is minimized when created.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### startActive

Show GeoZones on initialize

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

#### loadingElement

Loading element to be shown in the Controller when loading API data

Type: [string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

#### clickEvent

Type of Click event to activate the PopUp

Type: (`"singleclick"` | `"dblclick"`)

#### theme

Color theme of the Control Panel

Type: (`"light"` | `"dark"`)

#### language

Language to be used in the Controller panel and PopUp. This doesn't affects the API requests.
If i18n is set, this will be ignored.

Type: (`"en"` | `"es"`)

#### i18n

Add custom translations

Type: [i18n](#i18n)

#### alert

Custom alert function to display messages

##### Parameters

-   `msg` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**&#x20;

Returns **void**&#x20;

## TODO

-   Add test to check inexpected changes on the API response.
-   Add customizable proxy function
-   Improve scss (add variables)
-   Add more events

## License

MIT (c) Gastón Zalba.
