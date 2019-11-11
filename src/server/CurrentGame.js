import config from '@root/gameConfig';

export default class CurrentGame {
  static instance;

  constructor({ teams, playingTeam }) {
    if (!CurrentGame.instance) {
      CurrentGame.instance = this;

      this._scores = teams.reduce((acc, team) => {
        acc[team] = { score: 0, left: config.END_SCORE };
        return acc;
      }, {});
      this._currentTurn = {
        isPlaying: playingTeam,
        remain: config.MAX_TRIES,
      };

      this._setWinner = ({ team } = { team: null }) => {
        if (team) {
          this._currentTurn.wining = team;
        } else {
          const orderedTeams = Object.entries(this._scores).sort((a, b) => {
            const scoreA = a[1].score;
            const scoreB = b[1].score;
            let comparison = 0;
            if (scoreA < scoreB) {
              comparison = 1;
            } else if (scoreA > scoreB) {
              comparison = -1;
            }
            return comparison;
          });

          const [wining] = orderedTeams[0][1].score === orderedTeams[1][1].score
            ? [null]
            : orderedTeams[0];
          this._currentTurn.wining = wining;
        }
      };

      this._toggleTurn = () => {
        this._currentTurn.isPlaying = Object
          .keys(this._scores)
          .find((teamName) => teamName !== this._currentTurn.isPlaying);
        this._currentTurn.remain = config.MAX_TRIES;
      };

      this._setOver = () => {
        this.currentTurn.over = true;
        this._currentTurn.losing = Object.keys(this._scores)
          .find((team) => team !== this._currentTurn.wining);
      };
    }

    return CurrentGame.instance;
  }

  addPoints = ({ team, points }) => {
    this._scores[team].score = this._scores[team].score + points;

    if (this._scores[team].score > config.END_SCORE) {
      this._scores[team].score = config.LEVEL_POINTS;
    }

    this._scores[team].left = config.END_SCORE - this._scores[team].score;

    this._setWinner();

    if (this._scores[team].score === config.END_SCORE) {
      this._setOver();
    } else {
      this._toggleTurn();
    }
  };

  missTurn = () => {
    this._currentTurn.remain = this._currentTurn.remain - 1;
    if (this._currentTurn.remain === 0) {
      this._setWinner({
        team: Object
          .keys(this._scores)
          .find((teamName) => teamName !== this._currentTurn.isPlaying),
      });
      this._setOver();
    }
  };

  reset = () => {
    CurrentGame.instance = null;
    this._scores = null;
    this._currentTurn = null;
  };

  get scores() {
    return this._scores;
  }

  get currentTurn() {
    return this._currentTurn;
  }
}
