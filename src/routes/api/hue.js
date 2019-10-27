import { SECRET_TOKEN } from '@root/config';
import express from 'express';
import get from 'lodash/get';
import hasIn from 'lodash/hasIn';
import jwt from 'jsonwebtoken';
import middleware from '@root/middleware';
import nodeHueApi from 'node-hue-api';
import omit from 'lodash/omit';

const router = express.Router();
const { v3 } = nodeHueApi;
const { discovery } = v3;
const hueApi = v3.api;
const appName = 'node-hue-prstbt';
const deviceName = 'node-local-server';

/* GET hue/discover api. */
router.get('/discover', async (req, res) => {
  const discoveryResults = await discovery.nupnpSearch();
  if (discoveryResults.length === 0) {
    const error = 'Failed to resolve any Hue Bridges';
    return res.json({ error });
  }
  return res.json({ ipaddress: discoveryResults[0].ipaddress });
});

/* GET hue/connect api. */
router.post('/connect', middleware.checkConnectToken, async (req, res) => {
  const formatError = (err) => {
    let error;
    if (err.getHueErrorType && err.getHueErrorType() === 101) {
      error = 'The Link button on the bridge was not pressed. Please press the Link button and try again.';
    } else {
      error = `Unexpected Error: ${err.message}`;
    }
    return error;
  };

  let user;
  const ipaddress = get(req, 'body.ipaddress', null);

  const ipaddressToken = get(req, 'decoded.ipaddress', null);

  if (!ipaddress) {
    const message = 'Bad request: ipaddress missing!';
    res.writeHead(400, message, { 'content-type': 'text/plain' });
    res.end(message);
  } else if (ipaddressToken && ipaddress !== ipaddressToken) {
    const message = 'Bad request: you provide an ip address that does not match with your token';
    res.writeHead(400, message, { 'content-type': 'text/plain' });
    res.end(message);
  } else {
    // Create an unauthenticated instance of the Hue API
    const unauthenticatedApi = await hueApi.create(ipaddress)
      .catch((err) => {
        const error = formatError(err);
        res.writeHead(400, error, { 'content-type': 'text/plain' });
        res.end(error);
      });

    if (unauthenticatedApi) {
      // Check if username is in request params
      user = get(req, 'decoded.user', null);

      // TODO: check with the api if user exist

      // Create a new user
      if (!user) {
        console.log('CREATE USER');
        user = await unauthenticatedApi.users.createUser(appName, deviceName)
          .then((response) => response)
          .catch((err) => {
            const error = formatError(err);
            res.writeHead(400, error, { 'content-type': 'text/plain' });
            res.end(error);
          });
      }


      if (user) {
        let token;
        try {
          token = await jwt.sign({ user, ipaddress }, SECRET_TOKEN, { expiresIn: '24h' });
        } catch (e) {
          const error = formatError(e);
          res.writeHead(400, error, { 'content-type': 'text/plain' });
          res.end(error);
        }
        console.log('CONNECT ', user);
        // Create a new API instance that is authenticated with the user
        await hueApi.create(ipaddress, user.username)
          .then(async (authenticatedApi) => {
            // Do something with the authenticated user/api
            const bridgeConfig = await authenticatedApi.configuration.get();
            const message = `Connected to Hue Bridge: ${bridgeConfig.ipaddress}`;
            res.json({
              message, user, ipaddress, token,
            }).end();
          })
          .catch((err) => {
            const error = formatError(err);
            res.writeHead(400, error, { 'content-type': 'text/plain' });
            res.end(error);
          });
      }
    }
  }
});

/* GET hue/configuration api. */
router.get('/configuration', middleware.checkHueToken, async (req, res) => {
  const complete = hasIn(req, 'query.complete');
  const user = get(req, 'decoded.user', null);
  const ipaddress = get(req, 'decoded.ipaddress', null);

  await hueApi.create(ipaddress, user.username)
    .then((api) => api.configuration[complete ? 'getAll' : 'get']())
    .then((config) => {
      res.json(omit(config, [
        'swupdate', 'swupdate2', 'replacesbridgeid', 'backup', 'starterkitid', 'whitelist',
      ])).end();
    })
    .catch((err) => {
      const error = `Error when getting configuration: ${err}`;
      res.status(400).send(error).end();
    });
});

/* GET hue/lights api. */
router.get('/lights', middleware.checkHueToken, async (req, res) => {
  const user = get(req, 'decoded.user', null);
  const ipaddress = get(req, 'decoded.ipaddress', null);
  await hueApi.create(ipaddress, user.username)
    .then((api) => api.lights.getAll())
    .then((lights) => {
      res
        .json(lights
          // eslint-disable-next-line no-underscore-dangle
          .map((light) => light._rawData)
          .map((_rawData) => omit(_rawData, [
            'swupdate', 'capabilities', 'config', 'swversion',
            'swconfigid', 'manufacturername', 'modelid',
            'type', 'productname', 'productid',
          ])))
        .end();
    })
    .catch((err) => {
      const error = `Error when getting lights: ${err}`;
      res.writeHead(400, error, { 'content-type': 'text/plain' });
      res.end(error);
    });
});

/* GET hue/rooms api. */
router.get('/rooms', middleware.checkHueToken, async (req, res) => {
  const user = get(req, 'decoded.user', null);
  const ipaddress = get(req, 'decoded.ipaddress', null);
  await hueApi.create(ipaddress, user.username)
    .then((api) => api.groups.getAll())
    .then((groups) => {
      res
        .json(groups
          .filter((group) => get(group, 'type') === 'Room')
          // eslint-disable-next-line no-underscore-dangle
          .map((group) => omit(group._rawData, [
            'sensors', 'class', 'recycle', 'type',
          ])))
        .end();
    })
    .catch((err) => {
      const error = `Error when getting rooms: ${err}`;
      res.writeHead(400, error, { 'content-type': 'text/plain' });
      res.end(error);
    });
});


module.exports = router;
