import config from '@root/gameConfig';

export default class CurrentGame {
  static instance;

  constructor({ teams, playingTeam }) {
    if (!CurrentGame.instance) {
      CurrentGame.instance = this;
    }
    this._scores = teams.reduce((acc, team) => {
      acc[team] = { score: 0, left: config.END_SCORE };
      return acc;
    }, {});
    this._currentTurn = {
      isPlaying: playingTeam,
      remain: config.MAX_TRIES,
    };

    this._toggleTurn = () => {
      this._currentTurn.isPlaying = Object
        .keys(this._scores)
        .find((teamName) => teamName !== this._currentTurn.isPlaying);
      this._currentTurn.remain = config.MAX_TRIES;
    };

    return CurrentGame.instance;
  }

  addPoints({ team, points }) {
    this._scores[team].score = this._scores[team].score + points;

    if (this._scores[team].score > config.END_SCORE) {
      this._scores[team].score = config.LEVEL_POINTS;
    }

    this._scores[team].left = config.END_SCORE - this._scores[team].score;

    if (this._scores[team].score !== config.END_SCORE) {
      this._toggleTurn();
    } else {
      this._currentTurn = { over: true };
    }
  }

  missTurn() {
    this._currentTurn.remain = this._currentTurn.remain - 1;
    if (this._currentTurn.remain === 0) {
      this._currentTurn = { over: true };
    }
  }

  get scores() {
    return this._scores;
  }

  get currentTurn() {
    return this._currentTurn;
  }
}
