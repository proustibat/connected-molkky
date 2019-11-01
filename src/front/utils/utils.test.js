import { calculatePoints } from './index';

describe('utils', () => {
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
