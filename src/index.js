/* eslint-disable import/default */

import React from 'react';
import ReactGA from 'react-ga';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.

const store = configureStore();

const gaPageView =()=> {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} onUpdate={gaPageView} />
  </Provider>, document.getElementById('app')
);
