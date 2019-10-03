const express = require('express');
const get = require('lodash/get');
const hasIn = require('lodash/hasIn');
const omit = require('lodash/omit');
const router = express.Router();

const v3 = require('node-hue-api').v3;
const discovery = v3.discovery;
const hueApi = v3.api;
const appName = 'node-hue-prstbt';
const deviceName = 'node-local-server';

/* GET hue/discover api. */
router.get('/discover', async (req, res) => {
    const discoveryResults = await discovery.nupnpSearch();
    if (discoveryResults.length === 0) {
        const error = 'Failed to resolve any Hue Bridges';
        console.error(error);
        return res.json({error});
    } else {
        return res.json({ipaddress: discoveryResults[0].ipaddress});
    }
});

/* GET hue/connect api. */
router.post('/connect', async(req, res) => {
    const formatError = err => {
        let error;
        if (err.getHueErrorType && err.getHueErrorType() === 101) {
            error = 'The Link button on the bridge was not pressed. Please press the Link button and try again.';
            console.error(error);
        } else {
            error = `Unexpected Error: ${err.message}`;
            console.error(error);
        }
        console.error(error);
        return error;
    };
    let user;

    const ipaddress = get(req, 'body.ipaddress', null);
    if(!ipaddress) {
        const error = 'ipAddress param missing';
        console.error(error);
        res.status(400).send(error).end();
    }
    else {
        // Create an unauthenticated instance of the Hue API
        const unauthenticatedApi = await hueApi.create(ipaddress)
            .catch(err => {
                const error = formatError(err);
                res.status(400).send(error).end();
            });

        if(unauthenticatedApi) {
            // Check if username is in request params
            user = get(req, 'body.user', null);
            // TODO: check with the api if user exist

            // Create a new user
            if(!user) {
                user = await unauthenticatedApi.users.createUser(appName, deviceName)
                    .then(response => {
                        console.log('*******************************************************************************\n');
                        console.log('User has been created on the Hue Bridge. The following username can be used to\n' +
                            'authenticate with the Bridge and provide full local access to the Hue Bridge.\n' +
                            'YOU SHOULD TREAT THIS LIKE A PASSWORD\n');
                        console.log(`Hue Bridge User: ${response.username}`);
                        console.log('*******************************************************************************\n');
                        return response;
                    })
                    .catch(err => {
                        const error = formatError(err);
                        res.status(400).send(error).end();
                    });
            }

            if(user) {
                // Create a new API instance that is authenticated with the user
                await hueApi.create(ipaddress, user.username)
                    .then(async authenticatedApi => {
                        // Do something with the authenticated user/api
                        const bridgeConfig = await authenticatedApi.configuration.get();
                        const message = `Connected to Hue Bridge: ${bridgeConfig.ipaddress}`;
                        console.log(message);
                        res.json({message, user, ipaddress}).end();
                    })
                    .catch(err => {
                        const error = formatError(err);
                        res.status(400).send(error).end();
                    });
            }
        }
    }
});

/* GET hue/configuration api. */
router.get('/configuration', async (req, res) => {
    const username = get(req, 'query.username', null);
    const ipaddress = get(req, 'query.ipaddress', null);
    const complete = hasIn(req, 'query.complete');
    if(!username || !ipaddress) {
        const error = 'Params missing: needs username and ipaddress';
        console.error(error);
        res.status(400).send(error).end();
    }
    else {
        await hueApi.create(ipaddress, username)
            .then(api => api.configuration[complete ? 'getAll' : 'get']())
            .then(config => {
                res.json(omit(config, [
                    'swupdate', 'swupdate2', 'replacesbridgeid', 'backup', 'starterkitid', 'whitelist'
                ])).end();
            })
            .catch(err => {
                const error = `Error when getting configuration: ${err}`;
                res.status(400).send(error).end();
            });
    }
});

/* GET hue/lights api. */
router.get('/lights', async (req, res) => {
    const username = get(req, 'query.username', null);
    const ipaddress = get(req, 'query.ipaddress', null);
    if(!username || !ipaddress) {
        const error = 'Params missing: needs username and ipaddress';
        console.error(error);
        res.status(400).send(error).end();
    }
    else {
        await hueApi.create(ipaddress, username)
            .then(api => api.lights.getAll())
            .then(lights => {
                res
                    .json(lights
                        .map(light => light._rawData)
                        .map(_rawData => omit(_rawData, [
                            'swupdate', 'capabilities', 'config', 'swversion',
                            'swconfigid', 'manufacturername', 'productid', 'modelid',
                            'type', 'productname'
                        ]))
                    )
                    .end();
            })
            .catch(err => {
                const error = `Error when getting lights: ${err}`;
                res.status(400).send(error).end();
            });
    }
});

/* GET hue/rooms api. */
router.get('/rooms', async (req, res) => {
    const username = get(req, 'query.username', null);
    const ipaddress = get(req, 'query.ipaddress', null);
    if(!username || !ipaddress) {
        const error = 'Params missing: needs username and ipaddress';
        console.error(error);
        res.status(400).send(error).end();
    }
    else {
        await hueApi.create(ipaddress, username)
            .then(api => api.groups.getAll())
            .then(groups => {
                res
                    .json(groups
                        .filter(group => get(group, 'type') === 'Room')
                        .map(group => omit(group._rawData, [
                            'sensors', 'class', 'recycle', 'type'
                        ]))
                    )
                    .end();
            })
            .catch(err => {
                const error = `Error when getting rooms: ${err}`;
                res.status(400).send(error).end();
            });
    }
});


module.exports = router;