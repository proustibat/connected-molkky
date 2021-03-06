import { MESSAGE_TYPE } from '@utils/constants';
import PropTypes from 'prop-types';
import React from 'react';
import style from './style';

const MessageIcon = ({ type, children }) => (
  <p style={style.container}>
    <i className="small material-icons" style={style.computeStyle(type).icon}>{type}</i>
    <span style={style.computeStyle(type).text}>
      {children}
    </span>
  </p>
);

MessageIcon.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(Object.values(MESSAGE_TYPE)).isRequired,
};

export default MessageIcon;
