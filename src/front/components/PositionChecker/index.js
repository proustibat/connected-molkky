import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import kebabCase from 'lodash/kebabCase';
import noop from 'lodash/noop';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { useDataContext } from '@contexts/DataContext';
import constants from '@utils/constants';
import MessageIcon from '@components/MessageIcon';

const PositionChecker = ({ onReadyChange }) => {
  const data = useDataContext();


  useEffect(() => {
    onReadyChange(
      data.length !== 0
      && data.every(({ position }) => position === constants.POSITION.UPRIGHT),
    );
  }, [data]);

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
      <SkittlesDisplay style={{ margin: '0 auto 2rem auto', width: '60%' }} />
      {renderWarning('Please stand up the following pins:', constants.POSITION.KNOCKED_OVER)}
      {renderWarning('All pins are not detected, try to move the missing pins:', null)}
      {renderError()}
    </>
  );
};

PositionChecker.propTypes = {
  onReadyChange: PropTypes.func,
};

PositionChecker.defaultProps = {
  onReadyChange: noop,
};

export default PositionChecker;
