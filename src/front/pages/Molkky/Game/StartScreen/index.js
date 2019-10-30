import React, { useState } from 'react';
import Button from '@components/Button';
import PositionChecker from '@components/PositionChecker';
import TeamButton from '@components/TeamButton';
import { startGame } from '@root/front/services/api';
import { useHistory } from 'react-router-dom';
import { usePlayContext } from '@contexts/PlayContext';

const StartScreen = () => {
  const history = useHistory();

  const { teams, setCurrentTurn, setScores } = usePlayContext();

  const [startReady, setStartReady] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(Object.entries(teams)[0][0]);

  const onTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  const onStartClick = async () => {
    const result = await startGame({ teams: Object.keys(teams), playingTeam: selectedTeam });
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
