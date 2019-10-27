import constants from '@utils/constants';

// eslint-disable-next-line import/prefer-default-export
export const getRandomPosition = () => {
  const randomValue = Math.floor(Math.random() * Math.floor(100));
  const conditions = [{
    predicate: (value) => value >= 3,
    position: constants.POSITION.UPRIGHT,
  }, {
    predicate: (value) => value < 3 && value !== 0,
    position: constants.POSITION.KNOCKED_OVER,
  }, {
    predicate: () => true,
    position: null,
  }];
  return conditions.find((condition) => condition.predicate(randomValue)).position;
};

export const getRandomPositionData = () => Array.from({ length: 12 }, (_, i) => ({
  value: i + 1,
  position: getRandomPosition(),
}));
