import { handleActions } from 'redux-actions';
import CookieHelper from '../businessLogic/cookieHelper';

const initialState ={
  "token": null,
  "account":null,
  "score": 0,
  "nickname": null,
  "image_url": null
};
export default handleActions({
  'set userdata' (state, action){
    CookieHelper.Set('session',action.payload.token)
    return Object.assign({},state,action.payload);
  }
}, initialState);
