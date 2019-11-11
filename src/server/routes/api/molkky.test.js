import CurrentGame from '@root/server/CurrentGame';
import middleware from '@root/server/middleware';
import request from 'supertest';

jest.mock('@root/server/CurrentGame');

describe('Molkky Endpoints', () => {
  let checkConditionsToStartGameSpy;
  let checkGameStartedSpy;
  let checkTeamSpy;
  let checkPointsSpy;
  let molkkyApp;

  beforeEach(() => {
    checkConditionsToStartGameSpy = jest
      .spyOn(middleware, 'checkConditionsToStartGame')
      .mockImplementation((req, res, next) => next());

    checkGameStartedSpy = jest
      .spyOn(middleware, 'checkGameStarted')
      .mockImplementation((req, res, next) => next());

    checkTeamSpy = jest
      .spyOn(middleware, 'checkTeam')
      .mockImplementation((req, res, next) => next());

    checkPointsSpy = jest
      .spyOn(middleware, 'checkPoints')
      .mockImplementation((req, res, next) => next());

    // eslint-disable-next-line global-require
    molkkyApp = require('@root/server/app');
  });

  afterAll(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  it('should handle /api/molkky/start endpoint', async () => {
    // Given
    CurrentGame.prototype.scores = { cat: { score: 0, left: 50 }, dog: { score: 0, left: 50 } };
    CurrentGame.prototype.currentTurn = { isPlaying: 'dog', remain: 3 };

    // When
    const superTest = await request(molkkyApp)
      .post('/api/molkky/start')
      .send({ teams: ['cat', 'dog'], playingTeam: 'dog' });

    // Then
    expect(checkConditionsToStartGameSpy).toHaveBeenCalledTimes(1);

    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.body).toMatchObject({
      scores: CurrentGame.prototype.scores,
      currentTurn: CurrentGame.prototype.currentTurn,
    });
  });

  it('should handle /api/molkky/score endpoint', async () => {
    // Given
    CurrentGame.instance = {
      addPoints: jest.fn(),
      scores: { cat: { score: 0, left: 50 }, dog: { score: 2, left: 48 } },
      currentTurn: { isPlaying: 'cat', remain: 3, wining: 'dog' },
    };

    // When
    const superTest = await request(molkkyApp)
      .post('/api/molkky/score')
      .send({ team: 'dog', points: 2 });

    // Then
    expect(checkTeamSpy).toHaveBeenCalledTimes(1);
    expect(checkGameStartedSpy).toHaveBeenCalledTimes(1);
    expect(checkPointsSpy).toHaveBeenCalledTimes(1);
    expect(CurrentGame.instance.addPoints).toHaveBeenCalledTimes(1);
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.body).toMatchObject({
      scores: CurrentGame.instance.scores,
      currentTurn: CurrentGame.instance.currentTurn,
    });
  });

  it('should handle /api/molkky/miss endpoint', async () => {
    // Given
    CurrentGame.instance = {
      missTurn: jest.fn(),
      scores: { cat: { score: 0, left: 50 }, dog: { score: 2, left: 48 } },
      currentTurn: { isPlaying: 'cat', remain: 2, wining: 'dog' },
    };

    // When
    const superTest = await request(molkkyApp)
      .post('/api/molkky/miss')
      .send({ team: 'cat' });

    // Then
    expect(checkGameStartedSpy).toHaveBeenCalledTimes(1);
    expect(CurrentGame.instance.missTurn).toHaveBeenCalledTimes(1);
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.body).toMatchObject({
      scores: CurrentGame.instance.scores,
      currentTurn: CurrentGame.instance.currentTurn,
    });
  });

  it('should handle /api/molkky/reset endpoint', async () => {
    // Given
    CurrentGame.instance = {
      reset: jest.fn(),
      scores: null,
      currentTurn: null,
    };

    // When
    const superTest = await request(molkkyApp)
      .post('/api/molkky/reset');

    // Then
    expect(superTest.res.statusCode).toEqual(200);
    expect(superTest.body).toMatchObject({
      scores: CurrentGame.instance.scores,
      currentTurn: CurrentGame.instance.currentTurn,
    });
  });
});
