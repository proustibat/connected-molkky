import React from 'react';
import defaultStyle from './style.js';

const LoadingBar = () => (
    <div style={defaultStyle.container}>
        <div className="progress teal darken-4" style={defaultStyle.progressBar}>
            <div className="indeterminate"/>
        </div>
    </div>
);

export default LoadingBar;