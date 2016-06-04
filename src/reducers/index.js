import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';
import deck from './deckReducer';
import ban from './banReducer';


const rootReducer = combineReducers({
  search,
  card,
  user,
  login,
  deck,
  ban
});

export default rootReducer;
