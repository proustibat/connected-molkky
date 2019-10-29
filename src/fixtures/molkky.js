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
