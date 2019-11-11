import CurrentGame from '@root/server/CurrentGame';
import middleware from './middleware';

const {
  checkConditionsToStartGame, checkGameStarted, checkTeam, checkPoints,
} = middleware;

describe('middlewares', () => {
  let res;
  let next;

  beforeAll(() => {
    res = { writeHead: jest.fn(), end: jest.fn() };
    next = jest.fn();
  });

  afterEach(() => {
    res.writeHead.mockClear();
    res.end.mockClear();
    next.mockClear();
    CurrentGame.instance = null;
  });

  afterAll(() => {
    res.writeHead.mockRestore();
    res.end.mockRestore();
    next.mockRestore();
  });

  describe('checkConditionsToStartGame', () => {
    it('should return next if conditions are ok', () => {
      // Given
      const req = { body: { teams: ['cat', 'dog'], playingTeam: 'cat' } };

      // When
      checkConditionsToStartGame(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should send an error if there is a game in progress', () => {
      // Given
      // eslint-disable-next-line no-new
      new CurrentGame({ teams: ['qwerty', 'asdfgh'] });
      const req = { body: { teams: ['cat', 'dog'], playingTeam: 'cat' } };

      // When
      checkConditionsToStartGame(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'A game has already been started!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if there is no playing team in body', () => {
      // Given
      const req = { body: { teams: ['cat', 'dog'] } };

      // When
      checkConditionsToStartGame(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'Bad request: need to know which team plays first',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if the is playing name is not one of the teams names', () => {
      // Given
      const req = { body: { teams: ['cat', 'dog'], playingTeam: 'qwerty' } };

      // When
      checkConditionsToStartGame(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'The playing team should be one of the provided team!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if there is no team in body', () => {
      // Given
      const req = { body: { playingTeam: 'cat' } };

      // When
      checkConditionsToStartGame(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'Bad request: need 2 teams!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkGameStarted', () => {
    it('should return next if a game exists', () => {
      // Given
      // eslint-disable-next-line no-new
      new CurrentGame({ teams: ['qwerty', 'asdfgh'] });

      // When
      checkGameStarted({}, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should send an error if no game exists', () => {
      // When
      checkGameStarted({}, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'No game has been created!',
        { 'content-type': 'text/plain' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkTeam', () => {
    const teams = ['qwerty', 'asdfgh'];
    const playingTeam = teams[0];

    beforeEach(() => {
      // eslint-disable-next-line no-new
      new CurrentGame({ teams, playingTeam });
    });

    afterEach(() => {
      CurrentGame.instance = null;
    });

    it('should return next if the team in body is the right', () => {
      // Given
      const req = { body: { team: playingTeam } };

      // When
      checkTeam(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should send an error if the team defined in body is not the team that should play', () => {
      // Given
      const req = { body: { team: teams[1] } };

      // When
      checkTeam(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        `Not the ${req.body.team}'s turn!`,
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if the team defined in body doesn\'t exist', () => {
      // Given
      const req = { body: { team: 'zxcvbnm' } };

      // When
      checkTeam(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'The team does not exist!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if there is no team in body', () => {
      // Given
      const req = { body: {} };

      // When
      checkTeam(req, res, next);

      // Then
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'Bad request: need the team name!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });
  });

  describe('checkPoints', () => {
    it('should return next if the body has points number', () => {
      // Given
      const req = { body: { points: 12 } };

      // Then
      checkPoints(req, res, next);

      // When
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('should send an error if the points in body is not a number', () => {
      // Given
      const req = { body: { points: '12' } };

      // Then
      checkPoints(req, res, next);

      // When
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'Bad request: points should be a number!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });

    it('should send an error if the body has no points', () => {
      // Given
      const req = { body: {} };

      // Then
      checkPoints(req, res, next);

      // When
      expect(next).toHaveBeenCalledTimes(0);
      expect(res.writeHead).toHaveBeenCalledTimes(1);
      expect(res.writeHead).toHaveBeenLastCalledWith(
        400,
        'Bad request: need points!',
        { 'content-type': 'application/json' },
      );
      expect(res.end).toHaveBeenCalledTimes(1);
    });
  });
});
