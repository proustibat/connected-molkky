import CurrentGame from '@root/CurrentGame';
import express from 'express';
import middleware from '@root/middleware';

const router = express.Router();

router.post('/start', middleware.checkConditionsToStartGame, async (req, res) => {
  const { body: { teams, playingTeam } } = req;
  // eslint-disable-next-line no-new
  new CurrentGame({ teams, playingTeam });
  res.json({
    scores: CurrentGame.instance.scores,
    currentTurn: CurrentGame.instance.currentTurn,
  }).end();
});

router.post('/score', middleware.checkGameStarted, middleware.checkTeam, middleware.checkPoints, async (req, res) => {
  const { body: { team, points } } = req;
  const currentGame = CurrentGame.instance;
  currentGame.addPoints({ team, points });
  res.json({
    scores: CurrentGame.instance.scores,
    currentTurn: CurrentGame.instance.currentTurn,
  }).end();
});

router.post('/miss', middleware.checkGameStarted, middleware.checkTeam, async (req, res) => {
  const currentGame = CurrentGame.instance;
  currentGame.missTurn();
  res.json({
    scores: CurrentGame.instance.scores,
    currentTurn: CurrentGame.instance.currentTurn,
  }).end();
});


module.exports = router;
