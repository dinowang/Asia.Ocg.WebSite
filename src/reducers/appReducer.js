import { handleActions } from 'redux-actions';
const initialState ={
  title: 'AsiaCards(亞洲卡片王)',
  suffix: ' - AsiaCards(亞洲卡片王)'
};
export default handleActions({
  'set title' (state, action) {
    state.title = action.payload + initialState.suffix;
  return Object.assign({},state);
  }
}, initialState);
