import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CatSVG from '@root/front/svg/cat.svg';
import { DataContextProvider } from '@root/front/contexts/DataContext';
import DogSVG from '@root/front/svg/dog.svg';
import Menu from '@components/Menu';
import { PlayContextProvider } from '@root/front/contexts/PlayContext';
import PlayScreen from '@pages/Molkky/Game/PlayScreen';
import PropTypes from 'prop-types';
import StartScreen from '@pages/Molkky/Game/StartScreen';
import { getRandomPositionData } from '@utils/services';


const Game = ({ title }) => {
  const [positionData, setPositionData] = useState([]);
  const [refreshDataTimer, setRefreshDataTimer] = useState(null);
  const [serverIsRunning, setServerIsRunning] = useState(false);
  const [teams, setTeams] = useState({
    cat: {
      name: 'Team Cat',
      icon: CatSVG,
    },
    dog: {
      name: 'Team Dog',
      icon: DogSVG,
    },
  });
  const [scores, setScores] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(null);

  const createFakeServer = (scale = 100, noNull = false) => {
    console.log('Game: createFakeServer ', serverIsRunning);
    // Get random data for skittles
    const timer = setInterval(() => {
      console.log('refresh fake data');
      setPositionData(getRandomPositionData(scale, noNull));
    }, 3000);
    setServerIsRunning(true);
    setRefreshDataTimer(timer);
  };

  const destroyFakeServer = () => {
    console.log('Game: destroyFakeServer ', serverIsRunning);
    clearInterval(refreshDataTimer);
    setRefreshDataTimer(null);
    setServerIsRunning(false);
  };

  useEffect(() => {
    createFakeServer();
  }, []);

  return (
    <div>
      <DataContextProvider value={{
        positionData, createFakeServer, destroyFakeServer, serverIsRunning,
      }}
      >
        <PlayContextProvider value={{
          teams, scores, currentTurn, setTeams, setScores, setCurrentTurn,
        }}
        >
          <Menu title={title} />
          <Switch>
            <Route
              exact
              path="/molkky/game"
              component={StartScreen}
            />
            <Route
              exact
              path="/molkky/game/play"
              component={PlayScreen}
            />
          </Switch>
        </PlayContextProvider>
      </DataContextProvider>
    </div>
  );
};

Game.propTypes = {
  title: PropTypes.string,
};

Game.defaultProps = {
  title: null,
};

Game.displayName = 'Game';

export default Game;
