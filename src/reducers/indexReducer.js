import { handleActions } from 'redux-actions';
const initialState ={
  card_pop:[]
};
export default handleActions({
  'fetch indexinfo' (state, action) {
  return Object.assign({},state,action.payload);
  }
}, initialState);
