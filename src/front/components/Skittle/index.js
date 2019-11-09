import React, { useEffect, useState } from 'react';
import { POSITION } from '@utils/constants';
import PropTypes from 'prop-types';
import SVGCircle from '@components/SVGCircle';

const Skittle = ({
  position, value, size, onClick,
}) => {
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

  const onClickSkittle = () => {
    onClick && onClick(value);
  };

  return (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      style={{ width: size, height: size }}
      onClick={onClickSkittle}
    >
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
  onClick: PropTypes.func,
};

Skittle.defaultProps = {
  position: null,
  size: undefined,
  onClick: null,
};

export default Skittle;
