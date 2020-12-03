import { Lang } from '../../ol-dji-geozones';

export const es: Lang = {
  labels: {
    djiGeoZones: 'Zonas Geo DJI',
    level: 'Nivel',
    type: 'Tipo',
    startTime: 'Horario de apertura',
    endTime: 'Horario de cierre',
    timeTips: 'Sistema horario: 24 horas',
    maxAltitude: 'Altitud máxima',
    address: 'Dirección',
    tips: 'Consejos',
    link: 'Enlace',
    learnMore: 'Leer más',
    helperZoom: 'Acérquese para ver las Zonas Geo',
    expand: 'Expandir',
    collapse: 'Colapsar'
  },
  levels: [
    {
      id: 0,
      name: 'Zonas de advertencia',
      desc:
        'En estas Zonas, que pueden no aparecer necesariamente en el mapa DJI GO, los usuarios recibirán un mensaje de advertencia. Ejemplo de zona de advertencia: espacio aéreo de clase E'
    },
    {
      id: 1,
      name: 'Zonas de autorización',
      desc:
        'En estas Zonas, que aparecen en azul en el mapa DJI GO, los usuarios recibirán una advertencia y el vuelo está limitado por defecto. Las zonas de autorización pueden ser desbloqueadas por usuarios autorizados mediante una cuenta verificada por DJI.'
    },
    {
      id: 2,
      name: 'Zonas restringidas',
      desc:
        'En estas Zonas, que aparecen en rojo en la aplicación DJI GO, los usuarios recibirán una advertencia y se impedirá el vuelo. Si cree que tiene la autorización para operar en una Zona restringida, comuníquese con flysafe@dji.com o Desbloqueo en línea.'
    },
    {
      id: 3,
      name: 'Zonas de advertencia ampliadas',
      desc:
        'En estas Zonas, GEO le pedirá en el momento del vuelo que desbloquee la zona siguiendo los mismos pasos que en una Zona de autorización, pero no necesita una cuenta verificada o una conexión a Internet en el momento de su vuelo.'
    },
    {
      id: 4,
      name: 'Zonas reglamentarias restringidas',
      desc:
        'Debido a las regulaciones y políticas locales, los vuelos están prohibidos dentro del alcance de algunas áreas especiales. (Ejemplo: prisión)'
    },
    {
      id: 5,
      name: 'Zonas recomendadas',
      desc: ''
    },
    {
      id: 6,
      name: 'Zonas de altiutud',
      desc:
        'Las zonas de altitud aparecerán en gris en el mapa. Los usuarios reciben advertencias en DJI GO o DJI GO 4 y la altitud de vuelo es limitada.'
    },
    {
      id: 7,
      name: 'Zonas recomendadas',
      desc:
        'Esta área se muestra en verde en el mapa. Se recomienda que elija estas áreas para los arreglos de vuelo.'
    },
    {
      id: 8,
      name: 'Zonas aprobadas para VANTs livianos (China)',
      desc:
        'Para las zonas aprobadas, los pilotos de vehículos aéreos no tripulados ligeros que vuelan a una altitud de 120 mo menos no están obligados a obtener permiso para volar. Los pilotos que planean volar UAV de tamaño mediano en Zonas Aprobadas a una altitud superior a 120 m, o en Zonas GEO distintas de las Zonas Aprobadas, deben obtener permiso a través de UTMISS antes de despegar.'
    },
    {
      id: 9,
      name: 'Áreas densamente pobladas',
      desc:
        'Esta área se muestra en rojo en el mapa. En circunstancias normales, la población de esta zona está más concentrada, así que no sobrevuele esta zona. (Ejemplo: bloque comercial)'
    }
  ],
  types: [
    {
      id: 0,
      name: 'Aeropuerto'
    },
    {
      id: 1,
      name: 'Zona especial'
    },
    {
      id: 2,
      name: 'Zona Militar'
    },
    {
      id: 4,
      name: 'Zona recomendada'
    },
    {
      id: 10,
      name: 'Aeropuerto'
    },
    {
      id: 13,
      name: 'Aeropuerto recreacional'
    },
    {
      id: 14,
      name: 'Aeropuerto recreacional'
    },
    {
      id: 15,
      name: 'Espacio aéreo clase B'
    },
    {
      id: 16,
      name: 'Espacio aéreo clase C'
    },
    {
      id: 17,
      name: 'Espacio aéreo clase D'
    },
    {
      id: 18,
      name: 'Espacio aéreo clase E'
    },
    {
      id: 19,
      name: 'Helipuerto'
    },
    {
      id: 23,
      name: 'Planta de energía'
    },
    {
      id: 24,
      name: 'Prisión'
    },
    {
      id: 26,
      name: 'Estadio'
    },
    {
      id: 27,
      name: 'Espacio aéreo prohibido'
    },
    {
      id: 28,
      name: 'Espacio aéreo restringido'
    },
    {
      id: 29,
      name: 'Restricción de vuelo temporal'
    },
    {
      id: 30,
      name: 'Planta de energía nuclear'
    },
    {
      id: 31,
      name: 'Aeropuertos sin pavimentar'
    },
    {
      id: 32,
      name: 'Zonas especiales'
    },
    {
      id: 33,
      name: 'Zonas militares'
    },
    {
      id: 34,
      name: 'Helipuerto'
    },
    {
      id: 35,
      name: 'Base de hidroaviones'
    },
    {
      id: 36,
      name: 'Restricción de vuelo temporal'
    },
    {
      id: 39,
      name: 'Zonas aprobadas para VANTs livianos'
    },
    {
      id: 41,
      name: 'Zonas reglamentarias restringidas para VANTs livianos'
    }
  ]
};
