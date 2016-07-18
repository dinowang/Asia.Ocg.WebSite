import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import thunk from 'redux-thunk';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';
import deck from './deckReducer';
import ban from './banReducer';
import app from './appReducer';
import index from './indexReducer'
import pack from './packReducer'

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
  index,
  pack
});

// export default rootReducer;
