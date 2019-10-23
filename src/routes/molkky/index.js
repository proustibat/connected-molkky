import express from 'express';
import React from 'react';
import renderTemplate from '../../renderTemplate';
import Molkky from '../../front/pages/Molkky';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
  const data = { title: 'Molkky' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Molkky {...data} />));
});


module.exports = router;
