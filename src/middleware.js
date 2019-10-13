import jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from './config';

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

module.exports = {
  checkHueToken,
  checkConnectToken,
};
