import React, { useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import PropTypes from 'prop-types';
import TrophySVG from '@root/front/svg/trophy.svg';
import { resetGame } from '@root/front/services/api';
import style from './style';
import { useDataContext } from '@contexts/DataContext';
import { useHistory } from 'react-router-dom';
import { usePlayContext } from '@contexts/PlayContext';

const ModalGameOver = ({
  winnerName, winnerIcon: SVGWinnerIcon, winnerScore,
  loserName, loserIcon: SVGLoserIcon, loserScore,
  onInit,
}) => {
  const history = useHistory();
  const { isLoading, setIsLoading } = useDataContext();
  const { setCurrentTurn, setScores } = usePlayContext();

  const [modalInstance, setModalInstance] = useState(null);

  const onPlayAgain = async () => {
    setIsLoading(true);
    const result = await resetGame();
    setIsLoading(false);
    if (result) {
      setCurrentTurn(result.currentTurn);
      setScores(result.scores);
      modalInstance.close();
      history.push('/molkky/game');
    }
  };

  const onModalInit = (instance) => {
    setModalInstance(instance);
    onInit(instance);
  };

  return (
    <Modal
      id="game-over-modal"
      onInit={onModalInit}
      title="GAME OVER"
      styleTitle={{ justifyContent: 'center' }}
      footer={(
        <Button onClick={onPlayAgain} style={style.modalFooterButton} disabled={isLoading}>
          Play Again
        </Button>
      )}
    >
      <div style={style.modalContent}>
        <p className="flow-text" style={style.winnerName}>
          Boo-ya!
          <br />
          {winnerName}
          {' '}
          wins!
        </p>
        <div style={style.winnerIconsContainer}>
          <TrophySVG style={style.trophy} />
          <SVGWinnerIcon style={style.winnerIcon} />
          <p style={style.winnerScore}>{winnerScore}</p>
        </div>
        <p className="flow-text" style={style.looserContainer}>
          Bwah-hah-hah!
          <br />
          <span role="img" aria-label="thumb down">&#128078;</span>
          <SVGLoserIcon style={style.loserIcon} />
          <br />
          {loserName}
          {' '}
          loses with
          {' '}
          {loserScore}
          !
        </p>
      </div>
    </Modal>
  );
};

ModalGameOver.propTypes = {
  winnerName: PropTypes.string.isRequired,
  winnerIcon: PropTypes.func.isRequired,
  winnerScore: PropTypes.number.isRequired,
  loserName: PropTypes.string.isRequired,
  loserIcon: PropTypes.func.isRequired,
  loserScore: PropTypes.number.isRequired,
  onInit: PropTypes.func.isRequired,
};

export default ModalGameOver;
