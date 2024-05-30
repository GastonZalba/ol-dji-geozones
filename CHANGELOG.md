# Changelog

## v1.0.0
* Module created

## v1.0.1
* Added a js minified version, fixed some typos in readme and corrected definition file.

## v1.0.2
* Added a css minified version and fixed some examples.

## v1.0.3
* Added ES module version.

## v1.0.4
* Fixed attribute "files" inside package.json

## v1.0.5
* Extent property added dynamically to prevent strange bug in some occasions.

## v1.0.6
* Fixed package.json

## v1.0.7
* Fixed some bugs
* Added methods to show or hide geoZones and the map Control

## v1.0.8
* Improved css

## v1.0.9
* Updated proxyUrl on examples and README
* Added 'https://' to API url's to facilitate uses of proxys
* Added 'full' and 'compact' panels versions.
* Show the loading indicator also in collapsed mode.

## v1.0.10
* Added Visibility toggle

## v1.0.11
* Initialize layers and events only if it's visible. Otherwise, the initialization is deferred
* Show alert when geoZones are forced to be displayed but the view is to large
* Improved css in loading spinner

## v1.0.12
* Fixed loading spinner showing late

## v1.0.13
* Now a custom alert function can be used
* Some refactoring to improve default values readibility

## v1.0.14-15
* Fixed minor bug within loading indicator

## v1.0.16
* Added new drones
* Improved language support
* Icon property crossOrigin setted to 'anonymous'

## v1.0.17
* Minor fixes, improved some comments

## v1.0.18
* Fixed bug when no opt_options are present
* npm audt fix

## v1.0.19
* Improved typescript and rollup configuration
* Added "watch" script
* Updated dependencies
* Added Source Maps

## v2.0.0
* Refactored code: class extends ol.control.Control (breaking changes)
* Updated dependencies
* Added new dji models
* Converted css to scss
* Removed unnecesary examples

## v2.0.1
* Ol7 compatibility
* Updated CDNs in examples
* Added new drones

## v2.0.2
* Fixed unnecesary request when the geozones are hidden and the map is dragged
* Fix outdated terser with "overrides"

## v2.1.0
* Added "error" event
* Added new drones
* Removed "browser" attribute from package.json
* Added "type" module attribute to package.json
* Removed index.js
* Updated dependencies

## v2.1.1
* Improved rollup and ts configs

## v2.2.0
* Added `buffer` option to increase the search area
* Added ".js" extension on imports to work better with webpack 5 default's config
* Lib is builded with es2017 target (downgraded from esnext)
* Removed babel deps
* Added header to dist files

## v2.2.1
* Improved error handling and listeners cleaning afterwards
* Added type support to the customized `ErrorEvent`
* Fixed potential bug displaying incorrect loading state
* Added style `pointer-events: none` to control icon img
* Added version on README examples urls

## v2.2.2
* Added new drones
* Added attrbiute `showGeozoneIcons` to display/hide geozone icons
* Fixed bug on geozones returning 99 as `type` in some drones
* Minimal addition to the README
* Updated to Ol8

## v2.2.3
* Updated dev dependencies and removed babel

## v2.2.4
* Added option `encodeURIRequest`

## v2.3.0
* Updated to Ol9 (types)
* Updated drone list
* Force css style in the drone select to be 100% width
* Updated dependencies

