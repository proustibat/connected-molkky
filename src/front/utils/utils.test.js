import constants from '@utils/constants';
import { getRandomPosition } from './services';

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
  });
});
