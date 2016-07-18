import { createStore as _createStore, applyMiddleware,compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';


import thunk from 'redux-thunk';

export default function createStore(data) {

 let middleware;
  /* eslint-disable global-require */
  if (process.env.NODE_ENV === 'production') {
    middleware = compose(
    applyMiddleware(thunk)
    )
  } else {
    middleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  }


  // const middleware = [g];

  let finalCreateStore;

  finalCreateStore = middleware(_createStore);

  const store = finalCreateStore(reducer, data)

  return store;
}
