import express from 'express';
import React from 'react';
import get from 'lodash/get';
import omit from 'lodash/omit';
import renderTemplate from '../../renderTemplate';
import DarkSky from '../../front/pages/DarkSky';
import getWeather from '../../services/getWeather';

const router = express.Router();

router.get('/', async (req, res) => {
    const weather = await getWeather().catch(err => res.status(500).send(`Something broke! ${err}`));
    if(weather) {
        const data = {
            title: 'Weather',
            ...omit(weather, ['currently.icon', 'currently.summary', 'currently.time']),
            time: new Date(get(weather, 'currently.time')),
            icon: get(weather, 'currently.icon'),
            summary: get(weather, 'currently.summary')
        };
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end(renderTemplate(<DarkSky {...data} />, 'darksky'));
    }
});

module.exports = router;
