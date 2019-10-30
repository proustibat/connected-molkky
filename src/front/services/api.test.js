import { missTarget, scorePoints, startGame } from './api';
import { serverResultAfterMiss, serverResultAfterScore, serverResultAfterStart } from '@fixtures/molkky';

describe('api', () => {
  const error = 'mocked error test';
  let toastSpy;

  beforeAll(() => {
    toastSpy = jest.fn();
    global.M = { toast: toastSpy };
  });

  afterEach(() => {
    global.fetch && global.fetch.mockClear();
    global.M && global.M.toast.mockClear();
  });

  afterAll(() => {
    global.fetch.mockRestore();
    delete global.fetch;

    global.M.toast.mockRestore();
    delete global.M.toast;
    delete global.M;
  });

  describe('startGame', () => {
    it('should request the api and return the result', async () => {
      // Given
      const teams = ['cat', 'dog'];
      const playingTeam = teams[0];
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => (serverResultAfterStart),
        }));

      // When
      const result = await startGame({ teams, playingTeam });

      // Then
      expect(result).toBe(serverResultAfterStart);
    });

    it('should catch the error when requesting the api', async () => {
      // Given
      global.fetch = jest.fn().mockRejectedValue(error);

      // When
      const result = await startGame({ teams: {}, playingTeam: null });

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });

    it('should catch the error when response is not 200', async () => {
      // Given
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({ status: 400, statusText: error }));

      // When
      const result = await startGame({ teams: {}, playingTeam: null });

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });
  });

  describe('scorePoints', () => {
    it('should request the api and return the result', async () => {
      // Given
      const team = 'cat';
      const points = 2;
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => (serverResultAfterScore),
        }));

      // When
      const result = await scorePoints({ team, points });

      // Then
      expect(result).toBe(serverResultAfterScore);
    });

    it('should catch the error when requesting the api', async () => {
      // Given
      global.fetch = jest.fn().mockRejectedValue(error);

      // When
      const result = await scorePoints({ team: '', points: 0 });

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });

    it('should catch the error when response is not 200', async () => {
      // Given
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({ status: 400, statusText: error }));

      // When
      const result = await scorePoints({ team: '', points: 0 });

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });
  });

  describe('missTarget', () => {
    it('should request the api and return the result', async () => {
      // Given
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({
          status: 200,
          json: () => (serverResultAfterMiss),
        }));

      // When
      const result = await missTarget('cat');

      // Then
      expect(result).toBe(serverResultAfterMiss);
    });

    it('should catch the error when requesting the api', async () => {
      // Given
      global.fetch = jest.fn().mockRejectedValue(error);

      // When
      const result = await missTarget('qwerty');

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });

    it('should catch the error when response is not 200', async () => {
      // Given
      global.fetch = jest.fn()
        .mockImplementation(() => Promise.resolve({ status: 400, statusText: error }));

      // When
      const result = await missTarget('qwerty');

      // Then
      expect(result).toBeUndefined();
      expect(toastSpy).toHaveBeenCalledTimes(1);
      expect(toastSpy).toHaveBeenLastCalledWith({ html: error, classes: 'red darken-4' });
    });
  });
});
