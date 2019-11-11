import CurrentGame from '@root/server/CurrentGame';
import express from 'express';
import middleware from '@root/server/middleware';

const router = express.Router();

router.post('/start', middleware.checkConditionsToStartGame, async (req, res) => {
  const { body: { teams, playingTeam } } = req;
  // eslint-disable-next-line no-new
  const currentGame = new CurrentGame({ teams, playingTeam });
  res.json({
    scores: currentGame.scores,
    currentTurn: currentGame.currentTurn,
  }).end();
});

router.post('/score', middleware.checkGameStarted, middleware.checkTeam, middleware.checkPoints, async (req, res) => {
  const { body: { team, points } } = req;
  const currentGame = CurrentGame.instance;
  currentGame.addPoints({ team, points });
  res.json({
    scores: currentGame.scores,
    currentTurn: currentGame.currentTurn,
  }).end();
});

router.post('/miss', middleware.checkGameStarted, middleware.checkTeam, async (req, res) => {
  const currentGame = CurrentGame.instance;
  currentGame.missTurn();
  res.json({
    scores: currentGame.scores,
    currentTurn: currentGame.currentTurn,
  }).end();
});

router.post('/reset', async (req, res) => {
  const currentGame = CurrentGame.instance;
  currentGame.reset();
  res.json({
    scores: null,
    currentTurn: null,
  }).end();
});


module.exports = router;
