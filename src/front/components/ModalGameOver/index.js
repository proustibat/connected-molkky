import React, { useState } from 'react';
import Button from '@components/Button';
import Modal from '@components/Modal';
import PropTypes from 'prop-types';
import { resetGame } from '@root/front/services/api';
import { useDataContext } from '@contexts/DataContext';
import { useHistory } from 'react-router-dom';

const ModalGameOver = ({
  winnerName, winnerIcon: SVGWinnerIcon, winnerScore,
  loserName, loserIcon: SVGLoserIcon, loserScore,
  onInit,
}) => {
  const { isLoading, setIsLoading } = useDataContext();
  const history = useHistory();

  const [modalInstance, setModalInstance] = useState(null);

  const onPlayAgain = async () => {
    setIsLoading(true);
    const result = await resetGame();
    setIsLoading(false);
    if (result) {
      modalInstance.close();
    }
  };

  const onModalInit = (instance) => {
    setModalInstance(instance);
    onInit(instance);
  };

  const onModalCloseEnd = () => {
    history.push('/molkky/game');
  };

  return (
    <Modal
      id="game-over-modal"
      onInit={onModalInit}
      onCloseEnd={onModalCloseEnd}
      title="GAME OVER"
      styleTitle={{ justifyContent: 'center' }}
      footer={(
        <Button
          onClick={onPlayAgain}
          style={{ margin: 0 }}
          disabled={isLoading}
        >
          Play Again
        </Button>
      )}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 43px)',
        padding: 0,
        margin: 0,
        justifyContent: 'space-evenly',
      }}
      >
        <p className="flow-text" style={{ textAlign: 'center', margin: 0 }}>
          Boo-ya!
          <br />
          {winnerName}
          {' '}
          wins!
        </p>
        <div style={{ position: 'relative' }}>
          <svg
            style={{
              width: '15rem',
              height: '15rem',
              display: 'block',
              margin: 'auto',
              fill: '#143746',
            }}
            height="48"
            viewBox="0 0 48 48"
            width="48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g data-name="winner" id="winner">
              <path
                style={{ fill: '#0c222b' }}
                d="M14.871,26.048C4.827,26.048.765,15.87.018,10.264A2,2,0,0,1,2,8H12a2,2,0,0,1,0,4H4.469c1.014,3.722,3.906,10.633,11.365,10.007a2,2,0,0,1,.332,3.986Q15.5,26.049,14.871,26.048Z"
              />
              <rect height="4" rx="2" ry="2" width="34" x="7" y="2" />
              <rect style={{ fill: '#0c222b' }} height="4" rx="2" ry="2" width="34" x="7" y="2" />
              <path d="M33.129,26.048q-.633,0-1.295-.055a2,2,0,1,1,.332-3.986c7.5.622,10.37-6.284,11.373-10.007H36a2,2,0,0,1,0-4H46a2,2,0,0,1,1.982,2.264C47.235,15.87,43.172,26.047,33.129,26.048Z" />
              <path style={{ fill: '#0c222b' }} d="M33.129,26.048q-.633,0-1.295-.055a2,2,0,1,1,.332-3.986c7.5.622,10.37-6.284,11.373-10.007H36a2,2,0,0,1,0-4H46a2,2,0,0,1,1.982,2.264C47.235,15.87,43.172,26.047,33.129,26.048Z" />
              <polygon style={{ fill: '#091c23' }} points="28 35 20 35 21 30 27 30 28 35" />
              <path style={{ fill: '#0c222b' }} d="M34,45H14V36a1.027,1.027,0,0,1,1.053-1H32.947A1.027,1.027,0,0,1,34,36Z" />
              <rect style={{ fill: '#ebebeb' }} height="5" width="12" x="18" y="38" />
              <path style={{ fill: '#143746' }} d="M10,6H38a0,0,0,0,1,0,0V17A14,14,0,0,1,24,31h0A14,14,0,0,1,10,17V6a0,0,0,0,1,0,0Z" />
              <rect style={{ fill: '#0c222b' }} height="3" rx="1" ry="1" width="28" x="10" y="45" />
            </g>
          </svg>
          <SVGWinnerIcon
            style={{
              width: '3.5rem',
              marginRight: '0.6rem',
              marginLeft: '0.6rem',
              position: 'absolute',
              top: '5rem',
              left: 'calc(50% - 2.25rem)',
            }}
          />
          <p style={{
            position: 'absolute',
            top: 0,
            left: 'calc(50% - 2rem)',
            color: '#e2e2e2',
            fontSize: '2rem',
            textAlign: 'center',
            width: '4rem',
          }}
          >
            {winnerScore}
          </p>
        </div>
        <p className="flow-text" style={{ textAlign: 'center', margin: 0 }}>
          Bwah-hah-hah!
          <br />
          <span role="img" aria-label="thumb down">&#128078;</span>
          <SVGLoserIcon style={{ width: '2rem', verticalAlign: 'middle' }} />
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
