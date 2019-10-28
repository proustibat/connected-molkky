import React, { useEffect } from 'react';
import CurrentTurn from '@components/CurrentTurn';
import ScoresOverview from '@components/ScoresOverview';
import { useDataContext } from '@contexts/DataContext';

const PlayScreen = () => {
  const { destroyFakeServer, createFakeServer } = useDataContext();

  useEffect(() => {
    destroyFakeServer();
    createFakeServer(10, true);
  }, []);

  return (
    <div>
      <ScoresOverview />
      <div className="divider" />
      <CurrentTurn />
    </div>
  );
};

export default PlayScreen;
