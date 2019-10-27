import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menu from '@components/Menu';
import StartScreen from '@pages/Molkky/Game/StartScreen';
import PlayScreen from '@pages/Molkky/Game/PlayScreen';

const Game = ({ title }) => (
  <div>
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
  </div>
);

Game.propTypes = {
  title: PropTypes.string,
};

Game.defaultProps = {
  title: null,
};

Game.displayName = 'Game';

export default Game;
