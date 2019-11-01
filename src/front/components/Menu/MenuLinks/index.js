import React, { useState } from 'react';
import { simulateThrow, startFakeSkittles, stopFakeSkittles } from '@root/front/services/api';
import Button from '@components/Button';
import PropTypes from 'prop-types';

const MenuLinks = ({ id, className, style }) => {
  const [isFakeServerRunning, setIsFakerServerRunning] = useState(false);

  const onFakeServerLink = async () => {
    const result = await (isFakeServerRunning ? stopFakeSkittles() : startFakeSkittles());
    if (result) {
      setIsFakerServerRunning(result.mock.skittles);
    }
  };

  return (
    <ul id={id} className={className} style={style}>
      <li><Button className="btn btn-small red lighten-2" onClick={onFakeServerLink}>{`${isFakeServerRunning ? 'Stop' : 'Start'} fake server`}</Button></li>
      <li><Button className="btn btn-small red lighten-2" onClick={simulateThrow}>Simulate a throw</Button></li>
    </ul>
  );
};

MenuLinks.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

MenuLinks.defaultProps = {
  id: '',
  className: '',
  style: {},
};

export default MenuLinks;
