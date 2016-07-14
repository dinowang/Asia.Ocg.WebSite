import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
import reducer from '../reducers';


import thunk from 'redux-thunk';

export default function createStore(data) {
  const middleware = [thunk];

  let finalCreateStore;

  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const store = finalCreateStore(reducer, data)

  return store;
}
