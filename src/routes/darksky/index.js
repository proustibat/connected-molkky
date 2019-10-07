import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import renderTemplate from '../../renderTemplate';
import DarkSky from '../../front/pages/DarkSky';
import getWeather from '../../services/getWeather';

const router = express.Router();

router.get('/', async (req, res) => {
    const weather = await getWeather().catch(err => res.status(500).send(`Something broke! ${err}`));
    if(weather) {
        const data = {title: 'Weather', ...weather};
        res.writeHead( 200, { "Content-Type": "text/html" } );
        res.end( renderTemplate( renderToString(<DarkSky {...data} />),  data, 'darksky') );
    }
});

module.exports = router;
