import Home from '@pages/Home';
import React from 'react';
import express from 'express';
import renderTemplate from '@root/server/renderTemplate';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  const data = { title: 'Welcome TO SSR!' };
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(renderTemplate(<Home {...data} />));
});

module.exports = router;
