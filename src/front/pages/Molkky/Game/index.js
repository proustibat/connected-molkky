import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import CatSVG from '@root/front/svg/cat.svg';
import { DataContextProvider } from '@root/front/contexts/DataContext';
import DogSVG from '@root/front/svg/dog.svg';
import LoadingBar from '@components/LoadingBar';
import Menu from '@components/Menu';
import { PlayContextProvider } from '@root/front/contexts/PlayContext';
import PlayScreen from '@pages/Molkky/Game/PlayScreen';
import PropTypes from 'prop-types';
import StartScreen from '@pages/Molkky/Game/StartScreen';
import socketIOClient from 'socket.io-client';
import style from './style';

const Game = ({ title }) => {
  const [positionData, setPositionData] = useState([]);
  const [teams, setTeams] = useState({
    cat: { name: 'Team Cat', icon: CatSVG },
    dog: { name: 'Team Dog', icon: DogSVG },
  });
  const [scores, setScores] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const socket = socketIOClient('localhost:8888');
    socket.on('UPDATE', (data) => {
      setPositionData(Object.entries(data)
        .map(([, { position = null, value }]) => ({ position, value })));
    });
  }, []);

  return (
    <div>
      <DataContextProvider value={{ positionData, setIsLoading, isLoading }}>
        <PlayContextProvider value={{
          teams, scores, currentTurn, setTeams, setScores, setCurrentTurn,
        }}
        >
          <Menu title={title} />
          {isLoading && (
          <LoadingBar
            style={style.loadingBar}
            progressBarStyle={style.loadingBarProgress}
          />
          )}
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
