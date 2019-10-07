import React from 'react';
import ReactDOM from 'react-dom';
import DarkSky from './pages/DarkSky';

const app = document.getElementById( 'root' );

ReactDOM.hydrate( <DarkSky {...window.__INITIAL_PROPS__} />, app );
