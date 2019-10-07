import express from 'express';
import React from 'react';
import renderTemplate from '../../renderTemplate';
import Hue from '../../front/pages/Hue';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
    const data = {title: 'Philips Hue Remote Controller'};
    res.writeHead( 200, { "Content-Type": "text/html" } );
    res.end(renderTemplate(<Hue {...data} />, 'hue'));
});

module.exports = router;
