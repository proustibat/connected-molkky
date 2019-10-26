import React from 'react';
import get from 'lodash/get';
import Skittle from '@components/Skittle';
import { useDataContext } from '@contexts/DataContext';
import style from './style';

const SkittlesDisplay = () => {
  const data = useDataContext();

  return (
    <div style={style.container}>
      <div style={style.row}>
        <Skittle value={7} position={get(data.find(({ value }) => value === 7) || {}, 'position', null)} />
        <Skittle value={8} position={get(data.find(({ value }) => value === 8) || {}, 'position', null)} />
        <Skittle value={9} position={get(data.find(({ value }) => value === 9) || {}, 'position', null)} />
      </div>
      <div style={style.row}>
        <Skittle value={5} position={get(data.find(({ value }) => value === 5) || {}, 'position', null)} />
        <Skittle value={11} position={get(data.find(({ value }) => value === 11) || {}, 'position', null)} />
        <Skittle value={12} position={get(data.find(({ value }) => value === 12) || {}, 'position', null)} />
        <Skittle value={6} position={get(data.find(({ value }) => value === 6) || {}, 'position', null)} />
      </div>
      <div style={style.row}>
        <Skittle value={3} position={get(data.find(({ value }) => value === 3) || {}, 'position', null)} />
        <Skittle value={10} position={get(data.find(({ value }) => value === 10) || {}, 'position', null)} />
        <Skittle value={4} position={get(data.find(({ value }) => value === 4) || {}, 'position', null)} />
      </div>
      <div style={style.row}>
        <Skittle value={1} position={get(data.find(({ value }) => value === 1) || {}, 'position', null)} />
        <Skittle value={2} position={get(data.find(({ value }) => value === 2) || {}, 'position', null)} />
      </div>
    </div>
  );
};

export default SkittlesDisplay;
