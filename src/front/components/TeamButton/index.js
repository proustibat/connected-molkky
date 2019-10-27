import PropTypes from 'prop-types';
import React from 'react';
import style from './style';

const TeamButton = ({
  icon: IconSVG, style: customStyle, name, onClick, selected, value,
}) => (
  <button
    className={`z-depth-${selected ? 4 : 1} disableFocus`}
    type="button"
    style={{
      ...style.container,
      ...customStyle,
      ...(selected && style.containerSelected),
    }}
    onClick={() => onClick(value)}
  >
    {name && <p className="flow-text" style={style.name}>{name}</p>}
    <IconSVG style={style.icon} />
  </button>
);

TeamButton.propTypes = {
  icon: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object,
  name: PropTypes.string,
  selected: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

TeamButton.defaultProps = {
  style: {},
  name: null,
  selected: false,
};

export default TeamButton;
