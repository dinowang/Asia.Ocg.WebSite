import { handleActions } from 'redux-actions';
const initialState ={
  "current_type":0,
  "deck_type":[
    {
      "id": 1,
      "name": "最新上傳"
    },{
      "id": 2,
      "name": "日本牌組"
    },{
      "id": 3,
      "name": "玩家分享"
    }],
  "deck_list":[{
    "id": 1,
    "name": "test",
    "main_count": 10,
    "extra_count": 20,
    "preparation_count": 15,
    "deck_kind": "DD",
    "deck_ben": "16.4"
  }]
};
export default handleActions({
  'change type' (state, action) {
    state.current_type = action.payload;
    console.log(action.payload);
  return Object.assign({},state);
  }
}, initialState);
