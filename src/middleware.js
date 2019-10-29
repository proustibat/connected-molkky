import CurrentGame from '@root/CurrentGame';
import { SECRET_TOKEN } from '@root/config';
import jwt from 'jsonwebtoken';

// TODO: refactor these methods

const checkHueToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    return jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        const message = 'Token is not valid';
        res.writeHead(400, message, { 'content-type': 'text/plain' });
        res.end(message);
        return false;
      }
      req.decoded = decoded;
      return next();
    });
  }
  const message = 'Auth token is not supplied';
  res.writeHead(400, message, { 'content-type': 'text/plain' });
  res.end(message);
  return false;
};

const checkConnectToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    return jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        const message = 'Token is not valid';
        res.writeHead(400, message, { 'content-type': 'text/plain' });
        res.end(message);
        return false;
      }
      req.decoded = decoded;

      return next();
    });
  }
  return next();
};

const checkConditionsToStartGame = (req, res, next) => {
  const { body } = req;
  const { teams, playingTeam } = body;
  let error = null;

  if (CurrentGame.instance) {
    error = 'A game has already been started!';
  } else if (!teams || teams.length !== 2) {
    error = 'Bad request: need 2 teams!';
  } else if (!playingTeam) {
    error = 'Bad request: need to know which team plays first';
  } else if (!teams.includes(playingTeam)) {
    error = 'The playing team should be one of the provided team!';
  }

  if (error) {
    res.writeHead(400, 'Bad Request', { 'content-type': 'text/plain' });
    res.end(error);
    return false;
  }

  return next();
};

const checkGameHasStarted = (req, res, next) => {
  const currentGame = CurrentGame.instance;

  if (!currentGame) {
    const message = 'No game has been created!';
    res.writeHead(400, message, { 'content-type': 'text/plain' });
    res.end(message);
    return false;
  }
  return next();
};

const checkTeam = (req, res, next) => {
  const { body } = req;
  const { team } = body;
  const currentGame = CurrentGame.instance;
  let error = null;

  if (!team) {
    error = 'Bad request: need the team name!';
  } else if (!currentGame.scores[team]) {
    error = 'The team does not exist!';
  } else if (currentGame.currentTurn.isPlaying !== team) {
    error = `Not the ${team}'s turn!`;
  }

  if (error) {
    res.writeHead(400, 'Bad Request', { 'content-type': 'text/plain' });
    res.end(error);
    return false;
  }

  return next();
};

const checkPoints = (req, res, next) => {
  const { body } = req;
  const { points } = body;
  let error = null;

  if (!points) {
    error = 'Bad request: need points!';
  } else if (typeof points !== 'number') {
    error = 'Bad request: points should be a number!';
  }

  if (error) {
    res.writeHead(400, 'Bad Request', { 'content-type': 'text/plain' });
    res.end(error);
    return false;
  }

  return next();
};

module.exports = {
  checkHueToken,
  checkConnectToken,
  checkGameStarted: checkGameHasStarted,
  checkTeam,
  checkPoints,
  checkConditionsToStartGame,
};
