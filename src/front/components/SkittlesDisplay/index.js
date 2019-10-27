import PropTypes from 'prop-types';
import React from 'react';
import Skittle from '@components/Skittle';
import get from 'lodash/get';
import style from './style';
import { useDataContext } from '@contexts/DataContext';

const SkittlesDisplay = ({ skittleSize, style: customStyle }) => {
  const data = useDataContext();

  return (
    <div style={{ ...style.container, ...customStyle }}>
      <div style={style.row}>
        <Skittle value={7} position={get(data.find(({ value }) => value === 7) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={8} position={get(data.find(({ value }) => value === 8) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={9} position={get(data.find(({ value }) => value === 9) || {}, 'position', null)} size={skittleSize} />
      </div>
      <div style={style.row}>
        <Skittle value={5} position={get(data.find(({ value }) => value === 5) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={11} position={get(data.find(({ value }) => value === 11) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={12} position={get(data.find(({ value }) => value === 12) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={6} position={get(data.find(({ value }) => value === 6) || {}, 'position', null)} size={skittleSize} />
      </div>
      <div style={style.row}>
        <Skittle value={3} position={get(data.find(({ value }) => value === 3) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={10} position={get(data.find(({ value }) => value === 10) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={4} position={get(data.find(({ value }) => value === 4) || {}, 'position', null)} size={skittleSize} />
      </div>
      <div style={style.row}>
        <Skittle value={1} position={get(data.find(({ value }) => value === 1) || {}, 'position', null)} size={skittleSize} />
        <Skittle value={2} position={get(data.find(({ value }) => value === 2) || {}, 'position', null)} size={skittleSize} />
      </div>
    </div>
  );
};

SkittlesDisplay.propTypes = {
  skittleSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
};

SkittlesDisplay.defaultProps = {
  skittleSize: '25%',
  style: {},
};

export default SkittlesDisplay;
