import React, { useEffect, useState } from 'react';
import Button from '@components/Button';
import SkittlesDisplay from '@components/SkittlesDisplay';
import { calculatePoints } from '@utils/services';
import constants from '@utils/constants';
import get from 'lodash/get';
import style from './style';
import { useDataContext } from '@contexts/DataContext';
import { usePlayContext } from '@contexts/PlayContext';

const CurrentTurn = () => {
  const { teams, currentTurn } = usePlayContext();
  const { positionData, destroyFakeServer } = useDataContext();

  const [points, setPoints] = useState(0);

  const onEditClick = () => {
    console.log('onEditClick');
    destroyFakeServer();
  };
  const onMissTargetClick = () => {
    console.log('onMissTargetClick');
    destroyFakeServer();
  };
  const onValidScoreClick = () => {
    console.log('onValidScoreClick');
    destroyFakeServer();
  };

  useEffect(() => {
    // console.log('useEffect');
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
          <div className="col s6">
            <SkittlesDisplay />
            <Button className="grey lighten-1" onClick={onEditClick} style={style.editBtn}>
              <i className="material-icons center valign-wrapper" style={style.editIcon}>edit</i>
            </Button>
          </div>
          <div className="col s6">
            <div className="row">
              <div className="col s12" style={style.pointsContainer}>
                <span className="z-depth-1" style={style.points}>{points}</span>
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <Button className="red" onClick={onMissTargetClick} style={style.pointsBtn}>
                  <i className="material-icons center valign-wrapper" style={style.pointsBtnIcon}>highlight_off</i>
                </Button>
              </div>
              <div className="col s6">
                <Button className="green" onClick={onValidScoreClick} style={style.pointsBtn}>
                  <i className="material-icons center valign-wrapper" style={style.pointsBtnIcon}>done</i>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentTurn;
