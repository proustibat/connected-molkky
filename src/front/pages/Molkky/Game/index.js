import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PositionChecker from '@components/PositionChecker';
import { DataContextProvider } from '@root/front/contexts/DataContext';
import { getRandomPosition } from '@utils/services';
import Menu from '@components/Menu';

const Game = ({ title }) => {
  const [positionData, setPositionData] = useState([]);

  useEffect(() => {
    // Get random data for skittles
    setPositionData(Array.from({ length: 12 }, (_, i) => ({
      value: i + 1,
      position: getRandomPosition(),
    })));
  }, []);

  return (
    <DataContextProvider value={positionData}>
      <Menu title={title} />
      <div className="section no-pad-bot">
        <div className="container">
          <PositionChecker />
        </div>
      </div>
    </DataContextProvider>
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
