import React from 'react';
import PropTypes from 'prop-types';

const Button = ({onClick, children, disabled=false}) => (
    <button
        className={`waves-effect waves-light btn btn-large ${disabled && 'disabled'}`}
        onClick={onClick}>
        {children}
    </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  disabled: PropTypes.bool
};

export default Button;