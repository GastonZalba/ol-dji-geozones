# OpenLayers DjiGeozones
Create a Layer with DJI Geo Zones for an OpenLayer map. Also, add a Control to the map.

The data is obtained directly from an undocumented DJI [API](https://www-api.dji.com/api/geo/areas). The official DJI Fly Safe Geo Zone Map that use the same data can be found [here](https://www.dji.com/flysafe/geo-map).

Tested with OpenLayers version 5 and 6.

### DISCLAIMER
Now days, DJI doesn't offer any API documentation, so future support and access to the data is uncertain. Further, the API endpoint has CORS restrictions, so all browsers requests must be reverse proxied.

## Examples
- [Basic usage](http://raw.githack.com/GastonZalba/ol-dji-geozones/master/examples/dji-geozones.html)
  - Create an OpenLayers map instance, and pass that map to the DJIGeozones constructor.

## Usage
```js
// Default values
let opt_options = {
    drone: 'spark', // {string} See drone parameter in the DJI API section
    zonesMode: 'total', // {string}
    country: 'US', // {string} See country parameter in the DJI API section
    levelsToDisplay: [2, 6, 1, 0, 3, 4, 7], // {array} Order is kept in the Control
    levelsActivated: [2, 6, 1, 0, 3, 4, 7], // {array}
    control: true, // {boolean} Create or not the control
    targetControl: null // {HTMLElement | string} Specify a target if you want the control to be rendered outside of the map's viewport.
}

// REVERSE PROXY
// If you want a custom implementation, check out the repository (cors-anywhere)[https://github.com/Rob--W/cors-anywhere]
let url_proxy = 'https://cors-anywhere.herokuapp.com'; // You can use the public demo CORS Anywhere for testing

const djiGeozones = new DjiGeozones( map, url_proxy, opt_options);

// Instance methods
// This methods clean the loaded features and fires a new API request.
djiGeozones.setDrone(/* {String} */ 'spark' );
djiGeozones.setLevel( /* {Array} */ [1,2,3,4,6,7] );
djiGeozones.setCountry( /* {String} */ 'US' );

djiGeozones.setControlVisible( /* {Boolean} */ true ); // Show/hide the control

let layer = djiGeozones.getLayer(); // returns the ol/layer/Vector~VectorLayer instance
let source = djiGeozones.getSource(); // returns the ol/source/Vector~VectorSource instance
```
## [DJI API](https://www-api.dji.com/api/geo/areas) - What we know
### Problems
The data returned by the API has some problems/strange behaviors:
- The elements in *level 6* (Altitude Zones, grey color) are returning from the api with *level 2* in the properties (Restricted Zones, red color), and the elements in *level 4* (Regulatory Restricted Zones, light blue color) with *level 7* (Recommended Zones, green color). This makes very messy the frontend, and make it impossible to filter these levels accordingly in each request. To avoid this problem, this module functions completely different from the official map: performss the API requests including all *levels*, distributing the results in differents layers according to each level.

### Required parameters
- `level`
    - `2` - Restricted Zones: In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking. **Default value if not provided**
    - `6` - Altitude Zones: Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.
    - `1` - Authorization Zones: In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.
    - `0` - Warning Zones: In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace.
    - `3` - Enhanced Warning Zones: In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.
    - `9` - Densely Populated Area: This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block). **NOT SUPPORTED - This level exists in the oficial Geo Zone Map, but this data is not provided by the api. On the other hand, now days this level is apparently valid only for Japan and China**
    - `4` - Regulatory Restricted Zones: Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison).
    - `7` - Recommended Zones: This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.
    - `8` - Approved Zones for Light UAVs(China): For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off. **Only valid for China**
    - `5` - Recommended Zones (2)  **Apparently this level is only valid for Japan**

- `drone`
    - `mavic-mini` (Mavic Mini)
    - `mavic-2-enterprise` (Mavic 2 Enterprise)
    - `mavic-2` (Mavic 2)
    - `mavic-air` (Mavic Air)
    - `mavic-air-2` (Mavic Air 2)
    - `mavic-pro` (Mavic Pro)
    - `spark` (Spark)
    - `phantom-4-pro` (Phantom 4 Pro)
    - `phantom-4-advanced` (Phantom 4 Advanced)
    - `phantom-4` (Phantom 4)
    - `phantom-4-rtk` (Phantom 4 RTK)
    - `phantom-4-multispectral` (Phantom 4 Multispectral)
    - `phantom-3-pro` (Phantom 3 Pro
    - `phantom-3-advanced` (Phantom 3 Advanced)
    - `phantom-3-standard` (Phantom 3 Standard)
    - `phantom-3-4K` (Phantom 3 4K)
    - `phantom-3-se` (Phantom 3 SE)
    - `inspire-2` (Inspire 2)
    - `inspire-1-series` (Inspire 1 Series)
    - `m200-series` (M200 Series)
    - `m300-series` (M300 Series)
    - `m600-series` (M600 Series)
    - `m100` (M100)
    - `mg1p` (MG 1S/1A/1P/1P RTK/T10/T16/T20/T30)
    - `dji-mini-2` (DJI Mini 2)
- `country` *Apparently doesn't affects the response of the api*
    - `US`
    - `AR`
    - *etc* ([See the supported list](https://www.dji.com/flysafe/geo-map))
- `lng`
    - *Center point Longitude*
- `lat`
    - *Center point Latitude*
- `zones_mode`
    - `total`
    - *¿maybe accepts anothers values?*
- `search_radius`
    - *Radius of the current view of the map*

## Changelog
See [CHANGELOG](./CHANGELOG.md) for details of changes in each release.

## Install

### Browser
#### JS

Load `ol-dji-geozones.js` after OpenLayers. Dji Geozone is available as `DjiGeozones`.
```HTML
<script src="https://unpkg.com/ol-dji-geozones@1.0.0"></script>
```

#### CSS
```HTML
<link rel="stylesheet" href="https://unpkg.com/ol-dji-geozones@1.0.0/src/ol-dji-geozones.css" />
```

### Parcel, Webpack etc.
NPM package: [ol-dji-geozones](https://www.npmjs.com/package/ol-dji-geozones).
#### JS

Install the package via `npm`

    npm install ol-dji-geozones --save

#### CSS
The CSS file `ol-dji-geozones.css` can be found in `./node_modules/ol-dji-geozones/src`

## License
MIT (c) Gastón Zalba.