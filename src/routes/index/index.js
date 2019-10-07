import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import renderTemplate from '../../renderTemplate';
import Home from '../../front/pages/Home';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const data = {title: 'Welcome TO SSR!'};
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( renderTemplate( renderToString(<Home {...data} />),  data, 'index') );
});

module.exports = router;
