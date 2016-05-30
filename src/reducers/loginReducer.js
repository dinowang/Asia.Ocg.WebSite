import { handleActions } from 'redux-actions';
import LoginStateEnum from '../enums/loginState';
const initialState ={
  "mode": LoginStateEnum.Loging
};
export default handleActions({
  'change mode' (state, action){
    return Object.assign({},state,action.payload);
  }
}, initialState);
