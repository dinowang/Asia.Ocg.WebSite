import { handleActions } from 'redux-actions';
const initialState ={
  card_pop: [],
  product_info: [],
  deck_pop:[{
    views: 20,
    name: 'エスポワールゲーム 第4章 ～The Lottery～',
    guid:'guid'
  }]
};
export default handleActions({
  'fetch indexinfo' (state, action) {
  return Object.assign({},state,action.payload);
  }
}, initialState);
