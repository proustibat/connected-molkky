import PropTypes from 'prop-types';
import React from 'react';

const Button = ({
  onClick, children, disabled, size, style, className,
}) => (
  <button
    type="button"
    className={`waves-effect waves-light z-depth-1 btn ${size}${disabled ? ' disabled' : ''}${className ? ` ${className}` : ''}`}
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
  className: PropTypes.string,
};

Button.defaultProps = {
  disabled: false,
  size: 'btn-large',
  style: {},
  className: '',
};

Button.displayName = 'Button';

export default Button;
