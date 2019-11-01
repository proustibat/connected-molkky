import constants from '@utils/constants';

export const dataAllUpright = [
  { value: 12, position: constants.POSITION.UPRIGHT },
  { value: 34, position: constants.POSITION.UPRIGHT },
  { value: 56, position: constants.POSITION.UPRIGHT },
];

export const dataWithKnockedOverAndNull = [
  { value: 1, position: null },
  { value: 2, position: constants.POSITION.KNOCKED_OVER },
  { value: 3, position: constants.POSITION.UPRIGHT },
  { value: 4, position: constants.POSITION.KNOCKED_OVER },
  { value: 5, position: null },
  { value: 6, position: null },
  { value: 7, position: constants.POSITION.UPRIGHT },
  { value: 8, position: constants.POSITION.UPRIGHT },
  { value: 9, position: constants.POSITION.UPRIGHT },
  { value: 10, position: constants.POSITION.UPRIGHT },
  { value: 11, position: constants.POSITION.UPRIGHT },
  { value: 12, position: constants.POSITION.UPRIGHT },
];

export const dataWithValue4 = [
  { value: 1, position: constants.POSITION.UPRIGHT },
  { value: 2, position: constants.POSITION.UPRIGHT },
  { value: 3, position: constants.POSITION.UPRIGHT },
  { value: 4, position: constants.POSITION.KNOCKED_OVER },
  { value: 5, position: constants.POSITION.UPRIGHT },
  { value: 6, position: constants.POSITION.UPRIGHT },
  { value: 7, position: constants.POSITION.UPRIGHT },
  { value: 8, position: constants.POSITION.UPRIGHT },
  { value: 9, position: constants.POSITION.UPRIGHT },
  { value: 10, position: constants.POSITION.UPRIGHT },
  { value: 11, position: constants.POSITION.UPRIGHT },
  { value: 12, position: constants.POSITION.UPRIGHT },
];

export const dataFromSocketUPDATE = {
  '123qwe123': {
    battery: 99,
    position: constants.POSITION.UPRIGHT,
  },
  '456rty789': {
    battery: 43,
    position: constants.POSITION.KNOCKED_OVER,
  },
  '102ajd647': {
    battery: 11,
  },
};

export const serverResultAfterStart = {
  scores: {
    cat: {
      score: 0,
      left: 50,
    },
    dog: {
      score: 0,
      left: 50,
    },
  },
  currentTurn: {
    isPlaying: 'cat',
    remain: 3,
  },
};

export const serverResultAfterScore = {
  scores: {
    cat: {
      score: 0,
      left: 50,
    },
    dog: {
      score: 2,
      left: 48,
    },
  },
  currentTurn: {
    isPlaying: 'dog',
    remain: 3,
    wining: 'dog',
  },
};

export const serverResultAfterMiss = {
  scores: {
    cat: {
      score: 0,
      left: 50,
    },
    dog: {
      score: 2,
      left: 48,
    },
  },
  currentTurn: {
    isPlaying: 'cat',
    remain: 2,
    wining: 'dog',
  },
};

export const serverResultAfterStartFakeServer = { mock: { skittles: true } };
export const serverResultAfterStopFakeServer = { mock: { skittles: true } };
export const serverResultAfterSimulateRandom = {
  mock: {
    simulatedThrow: [
      {
        value: 1,
        position: 'KNOCKED_OVER',
      },
      {
        value: 2,
        position: 'UPRIGHT',
      },
      {
        value: 3,
        position: 'KNOCKED_OVER',
      },
      {
        value: 4,
        position: 'KNOCKED_OVER',
      },
      {
        value: 5,
        position: 'KNOCKED_OVER',
      },
      {
        value: 6,
        position: 'UPRIGHT',
      },
      {
        value: 7,
        position: 'UPRIGHT',
      },
      {
        value: 8,
        position: 'UPRIGHT',
      },
      {
        value: 9,
        position: 'KNOCKED_OVER',
      },
      {
        value: 10,
        position: 'UPRIGHT',
      },
      {
        value: 11,
        position: 'UPRIGHT',
      },
      {
        value: 12,
        position: 'UPRIGHT',
      },
    ],
  },
};
