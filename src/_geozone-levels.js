export default [
    {
        "id": 0,
        "name": "Warning Zones",
        "desc": "In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace",
        "color": "#FFCC00",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/6734f5340f66c7be37db48c8889392bf.png",
        "markerCircle": "https://www2.djicdn.com/assets/images/flysafe/geo-system/warning-98a8a2c8d6768e22957488ce962d77c3.png?from=cdnMap"
    },
    {
        "id": 1,
        "name": "Authorization Zones",
        "desc": "In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.",
        "color": "#1088F2",
        "zIndex": 2,
        "markerIcon": "https://www1.djicdn.com/dps/fbbea9e33581907cac182adb4bcd0c94.png",
        "markerCircle": "https://www4.djicdn.com/assets/images/flysafe/geo-system/authorization-878e879982c9555bcaab7bb6bce3c6ca.png?from=cdnMap"
    },
    {
        "id": 2,
        "name": "Restricted Zones",
        "desc": "In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.",
        "color": "#DE4329",
        "zIndex": 3,
        "markerIcon": "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
        "markerCircle": "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    },
    {
        "id": 3,
        "name": "Enhanced Warning Zones",
        "desc": "In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.",
        "color": "#EE8815",
        "zIndex": 2,
        "markerIcon": "https://www1.djicdn.com/dps/df822149e1e6e9e804e177813e044238.png",
        "markerCircle": "https://www4.djicdn.com/assets/images/flysafe/geo-system/enhanced_warning-623fea05bff2f83f3c0ff5a65a41a1df.png?from=cdnMap"
    },
    {
        "id": 4,
        "name": "Regulatory Restricted Zones",
        "desc": "Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)",
        "color": "#37C4DB",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
        "markerCircle": "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    },
    {
        "id": 5,
        "name": "Recommended Zones",
        "desc": "",
        "color": "#00BE00",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
        "markerCircle": "https://www4.djicdn.com/assets/images/flysafe/geo-system/recommended-e92f991d039ae145c9b1c72ad62b26b2.png?from=cdnMap"
    },
    {
        "id": 6,
        "name": "Altitude Zones",
        "desc": "Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.",
        "color": "#979797",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/f5961991d664e130fcf9ad01b1f28043.png",
        "markerCircle": "https://www1.djicdn.com/assets/images/flysafe/geo-system/Oval-34907c1071d63a3f1fffdc739b0943d9.png?from=cdnMap"
    },
    {
        "id": 7,
        "name": "Recommended Zones",
        "desc": "This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.",
        "color": "#00BE00",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/9d922ae5fbd80d3166a844a9e249ceb3.png",
        "markerCircle": "https://www1.djicdn.com/assets/images/flysafe/geo-system/regulations-2dfeef5b11017811dcaa720c86c49406.png?from=cdnMap"
    },
    {
        "id": 8,
        "name": "Approved Zones for Light UAVs(China)",
        "desc": "For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off",
        "color": "#00BE00",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/53b33783709b6ed06bc3afdd21ac2a81.png",
        "markerCircle": "https://www1.djicdn.com/dps/a968914208241c3f6a5a3c64c221b8ff.png"
    },
    {
        "id": 9,
        "name": "Densely Populated Area",
        "desc": "This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)",
        "color": "#DE4329",
        "zIndex": 1,
        "markerIcon": "https://www1.djicdn.com/dps/d47dfe9f089f259631fbed99610b8b5a.png",
        "markerCircle": "https://www5.djicdn.com/assets/images/flysafe/geo-system/restricted-e0ce1467a8df2d07ec6a33cf11f4279e.png?from=cdnMap"
    }
]