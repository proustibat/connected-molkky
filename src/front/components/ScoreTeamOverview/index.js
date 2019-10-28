import PropTypes from 'prop-types';
import React from 'react';
import style from './style';

const ScoreTeamOverview = ({
  score, left, wining, team: { icon: IconSVG, name }, isPlaying,
}) => (
  <div className={`card horizontal ${isPlaying && 'z-depth-4'}`} style={{ ...style.container, ...(isPlaying && style.containerHighlighted) }}>
    <div className="card-image valign-wrapper" style={style.cardImage}>
      <IconSVG style={style.icon} />
    </div>
    <div className="card-stacked" style={style.cardStacked}>
      <span className="card-title" style={style.cardTitle}>
        <span style={style.cardTitleName}>{name}</span>
        {wining && <i style={style.cardTitleWinIcon} className="material-icons">grade</i>}
      </span>
      <div className="card-content" style={style.cardContent}>
        <p className="flow-text" style={style.cardContentText}>
          <span style={style.scoreText}>
Score:&nbsp;
            <strong>{score}</strong>
          </span>
          <span>
Left:&nbsp;
            <strong>{left}</strong>
          </span>
        </p>
      </div>
    </div>
  </div>
);

ScoreTeamOverview.propTypes = {
  wining: PropTypes.bool,
  isPlaying: PropTypes.bool,
  score: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.func.isRequired,
  }).isRequired,
};

ScoreTeamOverview.defaultProps = {
  wining: false,
  isPlaying: false,
};

export default ScoreTeamOverview;
