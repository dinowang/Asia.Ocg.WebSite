import { combineReducers,createStore, applyMiddleware  } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';
import deck from './deckReducer';
import ban from './banReducer';
import app from './appReducer';
import index from './indexReducer'
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import thunk from 'redux-thunk';
// import { createStore, applyMiddleware } from 'redux';

export default combineReducers({
  routing:routerReducer,
  reduxAsyncConnect,
  search,
  card,
  user,
  login,
  deck,
  ban,
  app,
  index
});

// export default rootReducer;
