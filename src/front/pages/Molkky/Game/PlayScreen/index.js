import { missTarget, scorePoints } from '@root/front/services/api';
import CurrentTurn from '@components/CurrentTurn';
import React from 'react';
import ScoresOverview from '@components/ScoresOverview';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const PlayScreen = () => {
  const { isLoading, setIsLoading } = useDataContext();
  const { currentTurn, setCurrentTurn, setScores } = usePlayContext();

  const updatePlayContext = ({ currentTurn: ct, scores }) => {
    setCurrentTurn(ct);
    setScores(scores);
  };

  const onEditClick = () => {
    console.log('onEditClick');
  };

  const onMissTargetClick = async () => {
    setIsLoading(true);
    const result = await missTarget(currentTurn.isPlaying);
    setIsLoading(false);
    result && updatePlayContext(result);
  };
  const onValidPoints = (points) => async () => {
    setIsLoading(true);
    const result = await scorePoints({ team: currentTurn.isPlaying, points });
    setIsLoading(false);
    result && updatePlayContext(result);
  };

  return (
    <div>
      <CurrentTurn
        onValid={onValidPoints}
        onMiss={onMissTargetClick}
        onEdit={onEditClick}
        disabled={isLoading}
      />
      <div className="divider" />
      <ScoresOverview />
    </div>
  );
};

export default PlayScreen;
