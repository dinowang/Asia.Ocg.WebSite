import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  search,
  card,
  user,
  login
});

export default rootReducer;
