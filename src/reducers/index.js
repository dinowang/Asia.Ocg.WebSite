import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';
import user from './userReducer';




const rootReducer = combineReducers({
  search,
  card,
  user
});

export default rootReducer;
