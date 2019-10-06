import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import renderTemplate from '../renderTemplate';
import Layout from '../front/components/Layout';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const jsx = ( <Layout /> );
  const reactDom = renderToString(jsx);
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.end( renderTemplate( reactDom, {data: 'YOUPI!'} ) );
});

module.exports = router;
