import constants from '@utils/constants';

export const getRandomPosition = (scale = 100, noNull = false) => {
  const randomValue = Math.floor(Math.random() * Math.floor(scale));
  const conditions = [{
    predicate: (value) => value >= 3,
    position: constants.POSITION.UPRIGHT,
  }, {
    predicate: (value) => value < 3 && value !== 0,
    position: constants.POSITION.KNOCKED_OVER,
  }, {
    predicate: () => true,
    position: noNull ? constants.POSITION.UPRIGHT : null,
  }];
  return conditions.find((condition) => condition.predicate(randomValue)).position;
};

export const getRandomPositionData = (scale = 100, noNull = false) => Array.from(
  { length: 12 },
  (_, i) => ({
    value: i + 1,
    position: getRandomPosition(scale, noNull),
  }),
);
