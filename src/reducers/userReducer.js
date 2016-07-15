import { handleActions } from 'redux-actions';
import CookieHelper from '../businessLogic/cookieHelper';
import PermissionEnum from '../enums/PermissionEnum';

const initialState ={
  token: null,
  account:null,
  score: 0,
  nickname: null,
  image_url: null,
  privilege: PermissionEnum.User,
  alldeck:[]
};
export default handleActions({
  'set userdata' (state, action){
    CookieHelper.Set('token',action.payload.token);
    if(!action.payload.image_url){
      action.payload.image_url = 'https://xpgcards.blob.core.windows.net/user-image/user.png';
    }
    return Object.assign({},state,action.payload);
  },'init userdata' (){
    CookieHelper.Set('token',null);
    return Object.assign({},initialState);
  }
}, initialState);
