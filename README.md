# OpenLayers DjiGeozone
Create a Layer with DJI Geo Zones for an OpenLayer map. Also, add a small Control to the map.

The data is obtained directly from an undocumented DJI [API](https://www-api.dji.com/api/geo/areas). The official DJI Fly Safe Geo Zone Map that use the same data can be found [here](https://www.dji.com/flysafe/geo-map).

Tested with OpenLayers version 5 and 6.

### DISCLAIMER
Now days, DJI doesn't offer any API documentation, so future support and access to the data is uncertain. Further, the API endpoint has CORS restrictions, so all browsers requests must be reverse proxied.

## Examples
- [Basic usage](http://raw.githack.com/GastonZalba/ol-dji-geozone/master/examples/dji-geozone.html)
  - Create an OpenLayers map instance, and pass that map to the DJIGeozone constructor.

## Usage
```js
// Default values
let opt_options = {
    drone: 'spark',
    zonesMode: 'total',
    country: 'US',
    level: [0, 1, 2, 3, 4, 6, 7],
    control: true, // Create or not the control
    targetControl: null // {HTMLElement | string} Optional Element to create the control outside the map
}

// REVERSE PROXY
// If you want a custom implementation, check out the repository (cors-anywhere)[https://github.com/Rob--W/cors-anywhere]
let url_proxy = 'https://cors-anywhere.herokuapp.com'; // You can use the public demo CORS Anywhere for testing

const djiGeozone = new DjiGeozone( map, url_proxy, opt_options);

// Instance methods
// This methods clean the loaded features and fires a new API request.
djiGeozone.setDrone(/* {String} */ 'spark' );
djiGeozone.setLevel( /* {Array} */ [1,2,3,4,6,7] );
djiGeozone.setCountry( /* {String} */ 'US' );

djiGeozone.setControlVisible( /* {Boolean} */ true ); // Show/hide the control

let layer = djiGeozone.getLayer(); // returns the ol/layer/Vector~VectorLayer instance
let source = djiGeozone.getSource(); // returns the ol/source/Vector~VectorSource instance
```
### DJI API - What we know
#### Parameters
- `level`
    - `2` - Restricted Zones: In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.
    - `6` - Altitude Zones: Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.
    - `1` - Authorization Zones: In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.
    - `0` - Warning Zones: In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace.
    - `3` - Enhanced Warning Zones: In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.
    - `4` - Regulatory Restricted Zones: Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison).
    - `7` - Recommended Zones: This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.
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
- `country`
    - `US`
    - `AR`
    - etc ([See the supported list](https://www.dji.com/flysafe/geo-map))
- `lng`
    - Longitude of current the map view
- `lat`
    - Latitude of current the map view
- `zones_mode`
    - `total`
- `search_radius`
    - Radius of the current view of the map

## Changelog
See [CHANGELOG](./CHANGELOG.md) for details of changes in each release.

## Install

### Browser
#### JS

Load `ol-dji-geozone.js` after OpenLayers. Dji Geozone is available as `DjiGeozone`.
```HTML
<script src="https://unpkg.com/ol-dji-geozone@1.0.0"></script>
```

#### CSS
```HTML
<link rel="stylesheet" href="https://unpkg.com/ol-dji-geozone@1.0.0/src/ol-dji-geozone.css" />
```

### Parcel, Webpack etc.
NPM package: [ol-dji-geozone](https://www.npmjs.com/package/ol-dji-geozone).
#### JS

Install the package via `npm`

    npm install ol-dji-geozone --save

#### CSS
The CSS file `ol-dji-geozone.css` can be found in `./node_modules/ol-dji-geozone/src`

## License
MIT (c) Gastón Zalba.