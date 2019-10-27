import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SVGCircle from '@components/SVGCircle';
import constants from '@utils/constants';

const { POSITION } = constants;

const Skittle = ({ position, value, size }) => {
  const initialColors = {
    textColor: '#0944ff',
    strokeColor: '#0944ff',
    fillColor: '#d7ffff',
  };
  const lightColor = '#ebebeb';
  const darkColor = '#282828';

  const [textColor, setTextColor] = useState(initialColors.textColor);
  const [strokeColor, setStrokeColor] = useState(initialColors.strokeColor);
  const [fillColor, setFillColor] = useState(initialColors.fillColor);

  useEffect(() => {
    if (position) {
      setTextColor(position === POSITION.UPRIGHT ? darkColor : lightColor);
      setStrokeColor(position === POSITION.UPRIGHT ? darkColor : lightColor);
      setFillColor(position === POSITION.UPRIGHT ? lightColor : darkColor);
    } else {
      setTextColor(initialColors.textColor);
      setStrokeColor(initialColors.strokeColor);
      setFillColor(initialColors.fillColor);
    }
  }, [position]);

  return (
    <div style={{ width: size, height: size }}>
      <SVGCircle
        text={value}
        textColor={textColor}
        strokeColor={strokeColor}
        fillColor={fillColor}
        width="100%"
        height="100%"
      />
    </div>
  );
};

Skittle.propTypes = {
  position: PropTypes.oneOf(Object.values(POSITION)),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Skittle.defaultProps = {
  position: null,
  size: undefined,
};

export default Skittle;
