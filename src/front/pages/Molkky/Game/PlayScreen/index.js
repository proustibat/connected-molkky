import React, { useEffect } from 'react';
import { missTarget, scorePoints } from '@root/front/services/api';
import CurrentTurn from '@components/CurrentTurn';
import ScoresOverview from '@components/ScoresOverview';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const PlayScreen = () => {
  const { destroyFakeServer, createFakeServer } = useDataContext();
  const { currentTurn, setCurrentTurn, setScores } = usePlayContext();

  useEffect(() => {
    destroyFakeServer();
    createFakeServer(10, true);
  }, []);

  const updatePlayContext = ({ currentTurn: ct, scores }) => {
    setCurrentTurn(ct);
    setScores(scores);
  };

  const onEditClick = () => {
    console.log('onEditClick');
    destroyFakeServer();
  };
  const onMissTargetClick = async () => {
    const result = await missTarget(currentTurn.isPlaying);
    result && updatePlayContext(result);
  };
  const onValidPoints = (points) => async () => {
    const result = await scorePoints({ team: currentTurn.isPlaying, points });
    result && updatePlayContext(result);
  };

  return (
    <div>
      <CurrentTurn
        onValid={onValidPoints}
        onMiss={onMissTargetClick}
        onEdit={onEditClick}
      />
      <div className="divider" />
      <ScoresOverview />
    </div>
  );
};

export default PlayScreen;
