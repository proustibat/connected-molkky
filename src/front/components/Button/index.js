import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, disabled = false }) => (
  <button
    type="button"
    className={`waves-effect waves-light btn btn-large ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
