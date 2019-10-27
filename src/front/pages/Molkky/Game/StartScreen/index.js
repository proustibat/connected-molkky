import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@components/Button';
import PositionChecker from '@components/PositionChecker';
import TeamButton from '@components/TeamButton';
import { DataContextProvider } from '@root/front/contexts/DataContext';
import CatSVG from '@root/front/svg/cat.svg';
import DogSVG from '@root/front/svg/dog.svg';
import { getRandomPositionData } from '@utils/services';

const StartScreen = () => {
  const history = useHistory();
  const [positionData, setPositionData] = useState([]);
  const [startReady, setStartReady] = useState(false);
  const [refreshDataTimer, setRefreshDataTimer] = useState(null);
  const [selectedTeam, setSelectedTeam] = useState('cat');


  const createFakeServer = () => {
    // Get random data for skittles
    const timer = setInterval(() => {
      setPositionData(getRandomPositionData());
    }, 3000);
    setRefreshDataTimer(timer);
  };

  const destroyFakeServer = () => {
    clearInterval(refreshDataTimer);
    setRefreshDataTimer(null);
  };

  useEffect(() => {
    createFakeServer();
  }, []);

  const onStartClick = () => {
    destroyFakeServer();
    history.push('/molkky/game/play');
  };

  const onPositionReadyChange = (value) => {
    setStartReady(value);
  };

  const onTeamSelect = (team) => {
    setSelectedTeam(team);
  };


  return (
    <DataContextProvider value={positionData}>
      <div className="section">
        <div className="container">
          <h1>Players</h1>
          <p className="flow-text">Which team plays first?</p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TeamButton icon={CatSVG} style={{ marginRight: '2rem' }} name="Team Cat" value="cat" onClick={onTeamSelect} selected={selectedTeam === 'cat'} />
            <TeamButton icon={DogSVG} style={{ marginLeft: '2rem' }} name="Team Dog" value="dog" onClick={onTeamSelect} selected={selectedTeam === 'dog'} />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <h1>Playground</h1>
          <PositionChecker
            onReadyChange={onPositionReadyChange}
          />
          <Button
            onClick={onStartClick}
            disabled={!startReady}
          >
            Play
          </Button>
        </div>
      </div>
    </DataContextProvider>
  );
};

export default StartScreen;
