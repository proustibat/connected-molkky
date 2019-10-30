import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import PropTypes from 'prop-types';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { calculatePoints } from '@utils';
import constants from '@utils/constants';
import get from 'lodash/get';
import style from './style';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const CurrentTurn = ({ onValid, onMiss, onEdit }) => {
  const { teams, currentTurn } = usePlayContext();
  const { positionData } = useDataContext();

  const [points, setPoints] = useState(0);

  useEffect(() => {
    const knockedSkittles = positionData
      .filter((data) => data.position === constants.POSITION.KNOCKED_OVER);
    setPoints(calculatePoints(knockedSkittles));
  }, [positionData]);

  return (
    <div className="section">
      <div className="container" style={style.container}>
        <h1 style={style.title}>
          <span>Current Turn:&nbsp;</span>
          <span style={style.titleIconContainer}>
            {
              Object
                .entries(teams)
                .map(([value, { icon: Icon }]) => (value === currentTurn.isPlaying
                  ? <Icon style={style.titleIcon} key={value} />
                  : null))
            }
            <span>{get(teams, `${currentTurn.isPlaying}.name`)}</span>
          </span>
        </h1>
        <div className="row" style={style.content}>
          <div className="col s7">
            <SkittlesDisplay />
          </div>
          <div className="col s5">
            <div className="col s12" style={style.pointsContainer}>
              <span id="points" className="z-depth-1" style={style.points}>{points}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s4">
            <Button className="btn btn-floating grey lighten-1" onClick={onEdit} style={style.editBtn}>
              <i className="material-icons center valign-wrapper" style={style.editIcon}>edit</i>
            </Button>
          </div>
          <div className="col s4">
            <Button className="btn btn-floating red" onClick={onMiss} style={style.pointsBtn}>
              <i className="material-icons center valign-wrapper" style={style.pointsBtnIcon}>highlight_off</i>
            </Button>
          </div>
          <div className="col s4">
            <Button className="btn btn-floating green" onClick={onValid(points)} style={style.pointsBtn}>
              <i className="material-icons center valign-wrapper" style={style.pointsBtnIcon}>done</i>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentTurn.propTypes = {
  onValid: PropTypes.func.isRequired,
  onMiss: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CurrentTurn;
