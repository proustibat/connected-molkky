import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PositionChecker from '@components/PositionChecker';
import { DataContextProvider } from '@root/front/contexts/DataContext';
import { getRandomPositionData } from '@utils/services';
import Button from '@components/Button';
import Menu from '@components/Menu';

const StartScreen = ({ title }) => {
  const [positionData, setPositionData] = useState([]);
  const [startReady, setStartReady] = useState(false);

  useEffect(() => {
    // Get random data for skittles
    setInterval(() => {
      setPositionData(getRandomPositionData());
    }, 3000);
  }, []);

  const onPositionReadyChange = (value) => {
    setStartReady(value);
  };

  const onStartClick = () => {
    console.log('START');
  };

  return (
    <DataContextProvider value={positionData}>
      <Menu title={title} />
      <div className="section no-pad-bot">
        <div className="container">
          <PositionChecker
            onReadyChange={onPositionReadyChange}
          />
          <Button onClick={onStartClick} disabled={!startReady}>Play</Button>
        </div>
      </div>
    </DataContextProvider>
  );
};

StartScreen.propTypes = {
  title: PropTypes.string,
};

StartScreen.defaultProps = {
  title: null,
};

StartScreen.displayName = 'StartScreen';

export default StartScreen;
