import Game from '@pages/Molkky/Game';
import Molkky from '@pages/Molkky';
import React from 'react';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import renderTemplate from '@root/renderTemplate';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
  const data = { title: 'Molkky' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Molkky {...data} />));
});

router.get(['/game', '/game/play'], (req, res) => {
  const context = {};
  const data = { title: 'Molkky Game' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(
    <StaticRouter location={req.url} context={context} {...data}>
      <Game {...data} />
    </StaticRouter>,
  ));
});


module.exports = router;
