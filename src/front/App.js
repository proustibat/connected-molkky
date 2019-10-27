import { BrowserRouter } from 'react-router-dom';
import Darksky from '@pages/Darksky';
import Game from '@pages/Molkky/Game';
import Home from '@pages/Home';
import Hue from '@pages/Hue';
import Molkky from '@pages/Molkky';
import React from 'react';
import ReactDOM from 'react-dom';
import find from 'lodash/find';

export default class App {
  constructor() {
    this.routeComponentMapper = [{
      isMatching: (pathname) => pathname === '/',
      component: Home,
    }, {
      isMatching: (pathname) => pathname === '/darksky',
      component: Darksky,
    }, {
      isMatching: (pathname) => pathname === '/hue',
      component: Hue,
    }, {
      isMatching: (pathname) => pathname === '/molkky',
      component: Molkky,
    }, {
      isMatching: (pathname) => pathname === '/molkky/game',
      component: Game,
    }, {
      isMatching: () => true,
      component: null,
    }];
    return this;
  }

    init = () => {
      const PageComponent = find(
        this.routeComponentMapper,
        (route) => route.isMatching(global.location.pathname),
      ).component;
      if (PageComponent) {
        ReactDOM.hydrate(<BrowserRouter><PageComponent {...window.__INITIAL_PROPS__} /></BrowserRouter>, document.getElementById('root'));
      } else {
        const { M: MaterializeCSS } = window;
        MaterializeCSS && MaterializeCSS.toast({ html: 'Client file request failed! This page could not work well ¯\\_(ツ)_/¯', classes: 'red darken-4', displayLength: 5000 });
      }
      return this;
    }
}
