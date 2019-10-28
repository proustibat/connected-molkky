import React from 'react';
import ScoreTeamOverview from '@components/ScoreTeamOverview';
import get from 'lodash/get';
import style from './style';
import { usePlayContext } from '@contexts/PlayContext';


const ScoresOverview = () => {
  const { teams, scores, currentTurn } = usePlayContext();

  return (
    <div className="section" style={style.container}>
      <div className="container">
        <h1>Scores Overview</h1>
        {
          Object.keys(scores).map((id) => (
            <ScoreTeamOverview
              key={id}
              team={teams[id]}
              score={get(scores, `${id}.total`, 0)}
              left={get(scores, `${id}.left`, 0)}
              wining={currentTurn.wining === id}
              isPlaying={currentTurn.isPlaying === id}
            />
          ))
        }
      </div>
    </div>
  );
};

export default ScoresOverview;
