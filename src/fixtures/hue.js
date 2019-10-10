export const ipaddress = '192.168.1.10';

export const connectData = {
  message: 'Connected to Hue Bridge: 192.168.1.10',
  user: {
    username: 'qwertyuiop',
    clientkey: 'asdfghjkl',
  },
  ipaddress,
};

export const rooms = [
  {
    name: 'chambre',
    lights: [
      '1',
    ],
    state: {
      all_on: false,
      any_on: false,
    },
    action: {
      on: false,
      bri: 1,
      hue: 9621,
      sat: 139,
      effect: 'none',
      xy: [
        0.4434,
        0.4199,
      ],
      ct: 343,
      alert: 'none',
      colormode: 'xy',
    },
  },
  {
    name: 'salon',
    lights: [
      '2',
    ],
    state: {
      all_on: true,
      any_on: true,
    },
    action: {
      on: true,
      bri: 169,
      hue: 8402,
      sat: 140,
      effect: 'none',
      xy: [
        0.4575,
        0.4099,
      ],
      ct: 366,
      alert: 'select',
      colormode: 'xy',
    },
  },
  {
    name: 'salle de bain',
    lights: [
      '3',
    ],
    state: {
      all_on: false,
      any_on: false,
    },
    action: {
      on: false,
      bri: 254,
      hue: 7850,
      sat: 142,
      effect: 'none',
      xy: [
        0.4649,
        0.4056,
      ],
      ct: 379,
      alert: 'none',
      colormode: 'xy',
    },
  },
];

export const lights = [
  {
    state: {
      on: false,
      bri: 1,
      hue: 9621,
      sat: 139,
      effect: 'none',
      xy: [
        0.4434,
        0.4199,
      ],
      ct: 343,
      alert: 'none',
      colormode: 'xy',
      mode: 'homeautomation',
      reachable: true,
    },
    name: 'bedroom-main',
    uniqueid: '00:17:88:01:04:c5:79:0d-0b',
  },
  {
    state: {
      on: true,
      bri: 169,
      hue: 8402,
      sat: 140,
      effect: 'none',
      xy: [
        0.4575,
        0.4099,
      ],
      ct: 366,
      alert: 'select',
      colormode: 'xy',
      mode: 'homeautomation',
      reachable: true,
    },
    name: 'living-room-main',
    uniqueid: '00:17:88:01:04:c5:73:33-0b',
  },
  {
    state: {
      on: false,
      bri: 254,
      hue: 7850,
      sat: 142,
      effect: 'none',
      xy: [
        0.4649,
        0.4056,
      ],
      ct: 379,
      alert: 'none',
      colormode: 'xy',
      mode: 'homeautomation',
      reachable: true,
    },
    name: 'bathroom-main',
    uniqueid: '00:17:88:01:04:34:13:ea-0b',
  },
];
