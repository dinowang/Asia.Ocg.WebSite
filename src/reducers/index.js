import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';
import deck from './deckReducer';
import ban from './banReducer';
import app from './appReducer';


const rootReducer = combineReducers({
  search,
  card,
  user,
  login,
  deck,
  ban,
  app
});

export default rootReducer;
