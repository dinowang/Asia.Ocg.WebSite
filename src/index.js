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
import { ReduxAsyncConnect, asyncConnect, reducer as reduxAsyncConnect } from 'redux-async-connect'

import createStore from './store/create';
const store = createStore(window.__data);

const gaPageView =()=> {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

render(
  <Provider store={store} key="provider">
      <Router
        routes={routes()}
        
        history={browserHistory}
        onUpdate={gaPageView}
        >
      </Router>
  </Provider>, document.getElementById('app')
);
