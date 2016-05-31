import { handleActions } from 'redux-actions';
const initialState ={
  "token":null,
  "account":"test@gmail.com",
  "score": 50,
  "nickname":"Ch Rick",
  "image_url":"https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12717366_1140077189343966_8221115824378901544_n.jpg?oh=382682b03755dbaf37ae830c64c668bc&oe=57A0F709"
};
export default handleActions({
  'fetch cardinfo' (state, action){
    return Object.assign({},state,action.payload);
  }
}, initialState);
