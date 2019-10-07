import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import renderTemplate from '../../renderTemplate';
import DarkSky from '../../front/pages/DarkSky';

const router = express.Router();

router.get('/', (req, res) => {
    const data = {title: 'Darksky'};
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end( renderTemplate( renderToString(<DarkSky {...data} />),  data, 'darksky') );
});

module.exports = router;
