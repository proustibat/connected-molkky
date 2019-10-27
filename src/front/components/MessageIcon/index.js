import PropTypes from 'prop-types';
import React from 'react';
import constants from '@utils/constants';
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
  type: PropTypes.oneOf(Object.values(constants.MESSAGE_TYPE)).isRequired,
};

export default MessageIcon;
