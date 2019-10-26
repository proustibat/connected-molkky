import React from 'react';
import kebabCase from 'lodash/kebabCase';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { useDataContext } from '@contexts/DataContext';
import constants from '@utils/constants';
import Button from '@components/Button';
import MessageIcon from '@components/MessageIcon';

const PositionChecker = () => {
  const data = useDataContext();

  const onStartClick = () => {
    // TODO
  };

  const renderWarning = (message, positionType) => data
    .some(({ position }) => position === positionType) && (
    <>
      <MessageIcon type={constants.MESSAGE_TYPE.WARNING}>
        {message}
      </MessageIcon>
      <ul className="collection">
        {
          data
            .filter(({ position }) => position === positionType)
            .map(({ value }) => <li key={`${kebabCase(positionType || 'missing')}-${value}`} className="collection-item">{value}</li>)
        }
      </ul>
    </>
  );

  const renderError = () => data.length === 0 && (
    <MessageIcon type={constants.MESSAGE_TYPE.ERROR}>
      Oops! Please move the pins to detect them!
    </MessageIcon>
  );

  return (
    <>
      <p className="flow-text">Be sure pins are placed as follows then start the game</p>
      <SkittlesDisplay />
      <Button
        disabled={
          data.length === 0
          || !(data.every(({ position }) => position === constants.POSITION.UPRIGHT))
        }
        style={{ marginBottom: '1rem' }}
        onClick={onStartClick}
      >
        Start
      </Button>
      {renderWarning('Please stand up the following pins:', constants.POSITION.KNOCKED_OVER)}
      {renderWarning('All pins are not detected, try to move the missing pins:', null)}
      {renderError()}
    </>
  );
};

export default PositionChecker;
