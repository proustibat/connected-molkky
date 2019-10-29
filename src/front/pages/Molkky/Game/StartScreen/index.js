import React, { useState } from 'react';
import Button from '@components/Button';
import PositionChecker from '@components/PositionChecker';
import TeamButton from '@components/TeamButton';
import get from 'lodash/get';
import { useDataContext } from '@contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { usePlayContext } from '@contexts/PlayContext';

const StartScreen = () => {
  const history = useHistory();

  const { destroyFakeServer } = useDataContext();
  const { teams, setCurrentTurn, setScores } = usePlayContext();

  const [startReady, setStartReady] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(Object.entries(teams)[0][0]);

  const toastError = (error) => {
    get(window, 'M.toast', () => {})({ html: error, classes: 'red darken-4' });
  };

  const createGame = async () => fetch('/api/molkky/start', {
    method: 'post',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ teams: Object.keys(teams), playingTeam: selectedTeam }),
  })
    .then((response) => (response.status === 200
      ? response.json()
      : Promise.reject(response.statusText)))
    .catch(toastError);

  const onTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const onStartClick = async () => {
    destroyFakeServer();
    const result = await createGame();
    if (result) {
      const { scores, currentTurn } = result;
      setCurrentTurn(currentTurn);
      setScores(scores);
      history.push('/molkky/game/play');
    }
  };

  return (
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
          <Button
            onClick={onStartClick}
            disabled={!startReady}
          >
            Play
          </Button>
        </div>
      </div>
    </>
  );
};

export default StartScreen;
