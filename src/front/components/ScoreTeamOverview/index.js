import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import style from './style';

const ScoreTeamOverview = ({
  score, left, team: { icon: IconSVG, name }, isPlaying,
}) => {
  const [scaleClassName, setScaleClassName] = useState('scale-in');
  const [scoreToDisplay, setScoreToDisplay] = useState(score);

  useEffect(() => {
    setScaleClassName('scale-out');
    setTimeout(() => {
      setScoreToDisplay(score);
      setScaleClassName('scale-in');
    }, 250);
  }, [score]);

  return (
    <div className={`card horizontal ${isPlaying && 'z-depth-1'}`} style={{ ...style.container, ...(isPlaying && style.containerHighlighted) }}>
      <div className="card-image valign-wrapper" style={style.cardImage}>
        <IconSVG style={style.icon} />
      </div>
      <div className="card-stacked" style={style.cardStacked}>
        <span className="card-title" style={style.cardTitle}>
          <span style={style.cardTitleName}>{name}</span>
        </span>
        <div className="card-content" style={style.cardContent}>
          <p style={style.cardContentText}>
            <span>
Left:&nbsp;
              <strong>{left}</strong>
            </span>
          </p>
        </div>
      </div>
      <p className={`valign-wrapper scale-transition ${scaleClassName}`} style={style.scoreText}>
        {scoreToDisplay}
      </p>
    </div>
  );
};

ScoreTeamOverview.propTypes = {
  isPlaying: PropTypes.bool,
  score: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
  }).isRequired,
};

ScoreTeamOverview.defaultProps = {
  isPlaying: false,
};

export default ScoreTeamOverview;
