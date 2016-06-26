import { handleActions } from 'redux-actions';
const initialState ={
  card_pop: [],
  product_info: [],
  deck_pop:[],
  video:''
};
export default handleActions({
  'fetch indexinfo' (state, action) {
  return Object.assign({},state,action.payload);
  }
}, initialState);
