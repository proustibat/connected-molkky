import express from 'express';
import React from 'react';
import Hue from '@pages/Hue';
import renderTemplate from '@root/renderTemplate';

const router = express.Router();

/* GET hue page. */
router.get('/', (req, res) => {
  const data = { title: 'Philips Hue Remote Controller' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Hue {...data} />));
});

module.exports = router;
