import React from 'react';
import PropTypes from 'prop-types';

const SVGCircle = ({
  width, height, strokeWidth, strokeColor, fillColor, text, textStyle, textColor,
}) => (
  <svg width={width} height={height} viewBox="-25 -25 400 400">
    <circle stroke={strokeColor} cx="175" cy="175" r="175" strokeWidth={strokeWidth} fill={fillColor} />
    {text && (
      <text style={textStyle} fill={textColor} x={175} y={175} textAnchor="middle" dominantBaseline="central">
        {text}
      </text>
    )}
  </svg>
);

SVGCircle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  strokeWidth: PropTypes.number,
  strokeColor: PropTypes.string,
  fillColor: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textStyle: PropTypes.object,
  textColor: PropTypes.string,
};

SVGCircle.defaultProps = {
  width: 70,
  height: 70,
  strokeWidth: 25,
  strokeColor: '#000',
  fillColor: '#ebebeb',
  text: null,
  textStyle: {
    fontSize: 175,
  },
  textColor: '#000',
};

export default SVGCircle;
