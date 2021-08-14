import { i18n } from '../../ol-dji-geozones';

export const en: i18n = {
    labels: {
        djiGeoZones: 'Dji Geo Zones',
        level: 'Level',
        type: 'Type',
        startTime: 'Start Time',
        endTime: 'End Time',
        timeTips: 'Time: 24-hour clock',
        maxAltitude: 'Max. Altitude',
        address: 'Address',
        tips: 'Tips',
        link: 'Link',
        learnMore: 'Learn More',
        helperZoom: 'Zoom in to see the Geo Zones',
        expand: 'Expand',
        collapse: 'Collapse',
        hideGeozones: 'Hide Geo Zones',
        showHide: 'Show/Hide Geo Zones'
    },
    levels: [
        {
            id: 0,
            name: 'Warning Zones',
            desc: 'In these Zones, which may not necessarily appear on the DJI GO map, users will be prompted with a warning message. Example Warning Zone: Class E airspace'
        },
        {
            id: 1,
            name: 'Authorization Zones',
            desc: 'In these Zones, which appear blue in the DJI GO map, users will be prompted with a warning and flight is limited by default. Authorization Zones may be unlocked by authorized users using a DJI verified account.'
        },
        {
            id: 2,
            name: 'Restricted Zones',
            desc: 'In these Zones, which appear red the DJI GO app, users will be prompted with a warning and flight is prevented. If you believe you have the authorization to operate in a Restricted Zone, please contact flysafe@dji.com or Online Unlocking.'
        },
        {
            id: 3,
            name: 'Enhanced Warning Zones',
            desc: 'In these Zones, you will be prompted by GEO at the time of flight to unlock the zone using the same steps as in an Authorization Zone, but you do not require a verified account or an internet connection at the time of your flight.'
        },
        {
            id: 4,
            name: 'Regulatory Restricted Zones',
            desc: 'Due to local regulations and policies, flights are prohibited within the scope of some special areas. (Example：Prison)'
        },
        {
            id: 5,
            name: 'Recommended Zones',
            desc: ''
        },
        {
            id: 6,
            name: 'Altitude Zones',
            desc: 'Altitude zones will appear in gray on the map. Users receive warnings in DJI GO, or DJI GO 4 and flight altitude is limited.'
        },
        {
            id: 7,
            name: 'Recommended Zones',
            desc: 'This area is shown in green on the map. It is recommended that you choose these areas for flight arrangements.'
        },
        {
            id: 8,
            name: 'Approved Zones for Light UAVs(China)',
            desc: 'For Approved Zones, pilots of light UAVs flying at an altitude of 120 m or less are not required to obtain permission to fly. Pilots who are planning to fly medium-sized UAVs in Approved Zones at an altitude higher than 120 m, or in GEO Zones other than Approved Zones, must obtain permission via UTMISS before taking off'
        },
        {
            id: 9,
            name: 'Densely Populated Area',
            desc: 'This area is shown in red on the map. Under normal circumstances, the population of this area is more concentrated, so please do not fly over this area. (Example: Commercial Block)'
        }
    ],
    types: [
        {
            id: 0,
            name: 'Airport'
        },
        {
            id: 1,
            name: 'Special Zone'
        },
        {
            id: 2,
            name: 'Military Zone'
        },
        {
            id: 4,
            name: 'Recommended Zones'
        },
        {
            id: 10,
            name: 'Airport'
        },
        {
            id: 13,
            name: 'Recreational airport'
        },
        {
            id: 14,
            name: 'Recreational airport'
        },
        {
            id: 15,
            name: 'Class B Airspace'
        },
        {
            id: 16,
            name: 'Class C Airspace'
        },
        {
            id: 17,
            name: 'Class D Airspace'
        },
        {
            id: 18,
            name: 'Class E Airspace'
        },
        {
            id: 19,
            name: 'Heliport'
        },
        {
            id: 23,
            name: 'Power plant'
        },
        {
            id: 24,
            name: 'Prison'
        },
        {
            id: 26,
            name: 'Stadium'
        },
        {
            id: 27,
            name: 'Prohibited Airspace'
        },
        {
            id: 28,
            name: 'Restricted Airspace'
        },
        {
            id: 29,
            name: 'Temporary Flight Restriction'
        },
        {
            id: 30,
            name: 'Nuclear Power Plant'
        },
        {
            id: 31,
            name: 'Unpaved Airports'
        },
        {
            id: 32,
            name: 'Special Zones'
        },
        {
            id: 33,
            name: 'Military Zones'
        },
        {
            id: 34,
            name: 'Heliport'
        },
        {
            id: 35,
            name: 'Seaplane Base'
        },
        {
            id: 36,
            name: 'Temporary Flight Restriction'
        },
        {
            id: 39,
            name: 'Approved Zones for Light UAVs'
        },
        {
            id: 41,
            name: 'Regulatory Restricted Zones for Light UAVs'
        }
    ]
};
