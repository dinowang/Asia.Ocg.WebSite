import { handleActions } from 'redux-actions';
const initialState ={
  "token": null,
  "account":null,
  "score": 0,
  "nickname": null,
  "image_url": null
};
export default handleActions({
  'set userdata' (state, action){
    return Object.assign({},state,action.payload);
  }
}, initialState);
