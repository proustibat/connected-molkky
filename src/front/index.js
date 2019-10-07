import React from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';

const app = document.getElementById( 'root' );

ReactDOM.hydrate( <Home {...window.__INITIAL_PROPS__} />, app );
