import express from 'express';
import React from 'react';
import Molkky from '@pages/Molkky';
import StartScreen from '@pages/Molkky/StartScreen';
import renderTemplate from '@root/renderTemplate';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
  const data = { title: 'Molkky' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Molkky {...data} />));
});

router.get('/game', (req, res) => {
  const data = { title: 'Molkky StartScreen' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<StartScreen {...data} />));
});


module.exports = router;
