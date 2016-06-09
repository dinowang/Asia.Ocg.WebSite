import { handleActions } from 'redux-actions';
const initialState ={
  title:'AsiaCards(亞洲卡片王)'
};
export default handleActions({
  'set title' (state, action) {
    state.title = action.payload;
  return Object.assign({},state);
  }
}, initialState);
