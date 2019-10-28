import { calculatePoints, getRandomPosition, getRandomPositionData } from './services';
import constants from '@utils/constants';
import hasIn from 'lodash/hasIn';

describe('utils', () => {
  describe('getRandomPosition', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });

    it('should return the upright position', () => {
      // Given
      jest.spyOn(Math, 'floor').mockReturnValue(3);

      // When
      const position = getRandomPosition();

      // Then
      expect(position).toBe(constants.POSITION.UPRIGHT);
    });

    it('should return the knocked over position', () => {
      // Given
      jest.spyOn(Math, 'floor').mockReturnValue(2);

      // When
      const position = getRandomPosition();

      // Then
      expect(position).toBe(constants.POSITION.KNOCKED_OVER);
    });

    it('should return a null position', () => {
      // Given
      jest.spyOn(Math, 'floor').mockReturnValue(0);

      // When
      const position = getRandomPosition();

      // Then
      expect(position).toBeNull();
    });

    it('should not return a null position', () => {
      // Given
      jest.spyOn(Math, 'floor').mockReturnValue(0);

      // When
      const position = getRandomPosition(null, true);

      // Then
      expect(position).not.toBeNull();
      expect(position).toBe(constants.POSITION.UPRIGHT);
    });
  });

  describe('getRandomPositionData', () => {
    it('should return a valid fake data array', () => {
      // Given / When
      const result = getRandomPositionData();

      // Then
      expect(result).toHaveLength(12);
      expect(result.map(({ value }) => value))
        .toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      expect(result.every((r) => hasIn(r, 'position'))).toBeTruthy();
    });
  });

  describe('calculatePoints', () => {
    it('should count number of knocked over skittles', () => {
      // Given / When
      const points = calculatePoints([{ value: 3 }, { value: 4 }]);

      // Then
      expect(points).toBe(2);
    });

    it('should return the skittle value', () => {
      // Given / When
      const points = calculatePoints([{ value: 3 }]);

      // Then
      expect(points).toBe(3);
    });
  });
});
