import React from 'react';
import ReactDOM from 'react-dom';
import Hue from './pages/Hue';

const app = document.getElementById( 'root' );

ReactDOM.hydrate( <Hue {...window.__INITIAL_PROPS__} />, app );
