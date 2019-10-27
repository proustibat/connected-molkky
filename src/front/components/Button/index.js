import PropTypes from 'prop-types';
import React from 'react';

const Button = ({
  onClick, children, disabled, size, style,
}) => (
  <button
    type="button"
    className={`waves-effect waves-light z-depth-2 btn ${size} ${disabled ? 'disabled' : ''}`}
    onClick={onClick}
    style={style}
  >
    {children}
  </button>
);


Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['btn-large', 'btn-small', '']),
  style: PropTypes.object,
};

Button.defaultProps = {
  disabled: false,
  size: 'btn-large',
  style: {},
};

export default Button;
