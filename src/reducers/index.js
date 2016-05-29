import { combineReducers } from 'redux';
import search from './searchReducer';
import card from './cardReducer';



const rootReducer = combineReducers({
  search,
  card
});

export default rootReducer;
