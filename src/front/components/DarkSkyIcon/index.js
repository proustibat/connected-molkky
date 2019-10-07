import React from 'react';
import PropTypes from 'prop-types';
import Skycons from 'react-skycons';
import invert from 'lodash/invert';
import {DARK_SKY_ICONS} from '../../utils/constants';
import style from './style';

const DarkSkyIcon = ({icon, color, autoplay, iconStyle}) => (
    <Skycons
        color={color}
        icon={invert(DARK_SKY_ICONS)[icon]}
        autoplay={autoplay}
        style={{...style.icon, ...iconStyle}}
    />
);

DarkSkyIcon.propTypes = {
    icon: PropTypes.string.isRequired,
    color: PropTypes.string,
    autoplay: PropTypes.bool,
    iconStyle: PropTypes.object
};

DarkSkyIcon.defaultProps = {
    color: 'black',
    autoplay: true
};

export default DarkSkyIcon;