import { Link, useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { resetGame, startGame } from '@root/front/services/api';
import Button from '@components/Button';
import PositionChecker from '@components/PositionChecker';
import TeamButton from '@components/TeamButton';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const StartScreen = () => {
  const history = useHistory();

  const {
    teams, currentTurn, setCurrentTurn, scores, setScores,
  } = usePlayContext();
  const { setIsLoading } = useDataContext();

  const [startReady, setStartReady] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(Object.entries(teams)[0][0]);

  const onTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const onStartClick = (restart = false) => async () => {
    setIsLoading(true);
    const result = restart
      ? await resetGame()
      : await startGame({ teams: Object.keys(teams), playingTeam: selectedTeam });
    setIsLoading(false);
    if (result) {
      setCurrentTurn(result.currentTurn);
      setScores(result.scores);
      history.push('/molkky/game/play');
    }
  };

  return (!currentTurn && !scores) ? (
    <>
      <div className="section">
        <div className="container">
          <h1>Players</h1>
          <p className="flow-text">Which team plays first?</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
              Object.entries(teams).map(([value, { icon, name }], i) => (
                <TeamButton
                  key={value}
                  icon={icon}
                  style={(i % 2 === 0) ? { marginRight: '2rem' } : { marginLeft: '2rem' }}
                  name={name}
                  value={value}
                  onClick={onTeamSelect}
                  selected={selectedTeam === value}
                />
              ))
            }
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="section">
        <div className="container">
          <h1>Playground</h1>
          <PositionChecker onReadyChange={setStartReady} />
          <Button onClick={onStartClick()} disabled={!startReady}>Play</Button>
        </div>
      </div>
    </>
  ) : (
    <div className="section">
      <div className="container">
        <h1>A game has already been started!</h1>
        <p>Do you want to continue the same or restart a new one ?</p>
        <Link className="waves-effect waves-light z-depth-1 btn" to="/molkky/game/play">Continue the current game</Link>
        <Button onClick={onStartClick(true)}>Start a new game</Button>
      </div>
    </div>
  );
};

export default StartScreen;
