import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skittle from '@components/Skittle';
import cloneDeep from 'lodash/cloneDeep';
import constants from '@utils/constants';
import get from 'lodash/get';
import style from './style';
import { useDataContext } from '@contexts/DataContext';

const SkittlesDisplay = ({
  skittleSize, style: customStyle, className, editMode, onChange, skittles,
}) => {
  const [positionData, setPositionData] = useState(Array.from({ length: 12 },
    (position = constants.POSITION.UPRIGHT, value) => ({ value: value + 1, position })));

  const { positionData: data } = editMode
    ? { positionData }
    : useDataContext();

  useEffect(() => {
    if (editMode) {
      setPositionData(skittles);
      onChange(skittles);
    }
  }, [skittles]);

  const onClickSkittle = (value) => {
    const positionDataClone = cloneDeep(positionData);
    const indexToChange = positionDataClone.findIndex((item) => item.value === value);
    positionDataClone[indexToChange] = {
      value,
      position: positionDataClone[indexToChange].position === constants.POSITION.KNOCKED_OVER
        ? constants.POSITION.UPRIGHT
        : constants.POSITION.KNOCKED_OVER,
    };
    setPositionData(positionDataClone);
    onChange(positionDataClone);
  };

  return (
    <div className={className} style={{ ...style.container, ...customStyle }}>
      <div style={style.row}>
        {[7, 8, 9].map((v) => (
          <Skittle key={v} onClick={editMode ? onClickSkittle : null} style={editMode && style.hover} value={v} position={get(data.find(({ value }) => value === v) || {}, 'position', null)} size={skittleSize} />
        ))}
      </div>
      <div style={style.row}>
        {[5, 11, 12, 6].map((v) => (
          <Skittle key={v} onClick={editMode ? onClickSkittle : null} style={editMode && style.hover} value={v} position={get(data.find(({ value }) => value === v) || {}, 'position', null)} size={skittleSize} />
        ))}
      </div>
      <div style={style.row}>
        {[3, 10, 4].map((v) => (
          <Skittle key={v} onClick={editMode ? onClickSkittle : null} style={editMode && style.hover} value={v} position={get(data.find(({ value }) => value === v) || {}, 'position', null)} size={skittleSize} />
        ))}
      </div>
      <div style={style.row}>
        {[1, 2].map((v) => (
          <Skittle key={v} onClick={editMode ? onClickSkittle : null} style={editMode && style.hover} value={v} position={get(data.find(({ value }) => value === v) || {}, 'position', null)} size={skittleSize} />
        ))}
      </div>
    </div>
  );
};

SkittlesDisplay.propTypes = {
  skittleSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  className: PropTypes.string,
  editMode: PropTypes.bool,
  onChange: PropTypes.func,
  skittles: PropTypes.array,
};

SkittlesDisplay.defaultProps = {
  skittleSize: '25%',
  style: {},
  className: '',
  editMode: false,
  onChange: () => {},
  skittles: [],
};

export default SkittlesDisplay;
