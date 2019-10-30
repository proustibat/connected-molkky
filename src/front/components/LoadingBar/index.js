import PropTypes from 'prop-types';
import React from 'react';
import defaultStyle from './style';

const LoadingBar = ({ style, progressBarStyle }) => (
  <div style={{ ...defaultStyle.container, ...style }}>
    <div className="progress teal darken-4" style={{ ...defaultStyle.progressBar, ...progressBarStyle }}>
      <div className="indeterminate" />
    </div>
  </div>
);

LoadingBar.propTypes = {
  style: PropTypes.object,
  progressBarStyle: PropTypes.object,
};

LoadingBar.defaultProps = {
  style: {},
  progressBarStyle: {},
};

export default LoadingBar;
