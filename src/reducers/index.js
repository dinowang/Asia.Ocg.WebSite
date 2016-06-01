import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';
import deck from './deckReducer';

const rootReducer = combineReducers({
  search,
  card,
  user,
  login,
  deck
});

export default rootReducer;
