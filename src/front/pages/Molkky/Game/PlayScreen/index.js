import React, { useState } from 'react';
import { missTarget, scorePoints } from '@root/front/services/api';
import CurrentTurn from '@components/CurrentTurn';
import ModalEdit from '@components/ModalEdit';
import ModalGameOver from '@components/ModalGameOver';
import ScoresOverview from '@components/ScoresOverview';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const PlayScreen = () => {
  const { isLoading, setIsLoading } = useDataContext();
  const {
    currentTurn, setCurrentTurn, setScores, teams, scores,
  } = usePlayContext();

  const [openModal, setOpenModal] = useState(false);
  // const [gameOverModalInstance, setGameOverModal] = useState(null);

  const updatePlayContext = ({ currentTurn: ct, scores: sc }) => {
    setCurrentTurn(ct);
    setScores(sc);
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
  const onCloseEditModal = () => setOpenModal(false);

  const onGameOverModalInit = (instance) => instance.open();

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
        onClose={onCloseEditModal}
        onModalValid={onValidPoints}
      />
      {currentTurn.over
        && (
          <ModalGameOver
            onInit={onGameOverModalInit}
            winnerIcon={teams[currentTurn.wining].icon}
            winnerName={teams[currentTurn.wining].name}
            winnerScore={scores[currentTurn.wining].score}
            loserIcon={teams[currentTurn.losing].icon}
            loserName={teams[currentTurn.losing].name}
            loserScore={scores[currentTurn.losing].score}
          />
        )}
    </div>
  );
};

export default PlayScreen;
