import express from 'express';

import { getRandomPositionData } from '@services/mocks';

const router = express.Router();

let timer;

router.post('/skittles/start', async (req, res) => {
  const io = req.app.get('socketio');
  timer = setInterval(() => {
    io.emit('UPDATE', getRandomPositionData());
  }, 3000);
  res.json({ mock: { skittles: true } }).end();
});

router.post('/skittles/stop', async (req, res) => {
  clearInterval(timer);
  res.json({ mock: { skittles: false } }).end();
});

router.post('/skittles/simulate-throw', async (req, res) => {
  if (timer) {
    clearInterval(timer);
  }
  const io = req.app.get('socketio');
  const simulatedThrow = getRandomPositionData(10, true);
  io.emit('UPDATE', simulatedThrow);
  res.json({ mock: { simulatedThrow, skittles: false } }).end();
});


module.exports = router;
