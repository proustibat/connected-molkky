import PropTypes from 'prop-types';
import React from 'react';
import Skycons from 'react-skycons';
import constants from '@utils/constants';
import defaultStyle from './style';
import invert from 'lodash/invert';

const { DARK_SKY_ICONS } = constants;

const DarkSkyIcon = ({
  icon, color, autoplay, style,
}) => (
  <Skycons
    color={color}
    icon={invert(DARK_SKY_ICONS)[icon]}
    autoplay={autoplay}
    style={{ ...defaultStyle.icon, ...style }}
  />
);

DarkSkyIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string,
  autoplay: PropTypes.bool,
  style: PropTypes.object,
};

DarkSkyIcon.defaultProps = {
  color: 'black',
  autoplay: true,
  style: {},
};

export default DarkSkyIcon;
