import React, { useState } from 'react';
import { missTarget, scorePoints } from '@root/front/services/api';
import CurrentTurn from '@components/CurrentTurn';
import ModalEdit from '@components/ModalEdit';
import ScoresOverview from '@components/ScoresOverview';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const PlayScreen = () => {
  const { isLoading, setIsLoading } = useDataContext();
  const { currentTurn, setCurrentTurn, setScores } = usePlayContext();

  const [openModal, setOpenModal] = useState(false);

  const updatePlayContext = ({ currentTurn: ct, scores }) => {
    setCurrentTurn(ct);
    setScores(scores);
  };

  const onMissTargetClick = async () => {
    setIsLoading(true);
    const result = await missTarget(currentTurn.isPlaying);
    setIsLoading(false);
    result && updatePlayContext(result);
  };

  const onValidPoints = async (points) => {
    setIsLoading(true);
    const result = await scorePoints({ team: currentTurn.isPlaying, points });
    setIsLoading(false);
    result && updatePlayContext(result);
  };

  const onEditClick = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

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
      <ModalEdit
        openModal={openModal}
        onClose={onCloseModal}
        onModalValid={onValidPoints}
      />
    </div>
  );
};

export default PlayScreen;
