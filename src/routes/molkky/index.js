import express from 'express';
import React from 'react';
import Molkky from '@pages/Molkky';
import Game from '@pages/Molkky/Game';
import renderTemplate from '@root/renderTemplate';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
  const data = { title: 'Molkky' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Molkky {...data} />));
});

router.get('/game', (req, res) => {
  const data = { title: 'Molkky Game' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Game {...data} />));
});


module.exports = router;
