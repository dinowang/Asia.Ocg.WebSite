import { handleActions } from 'redux-actions';
import {LoginStateEnum, LoginProcessEnum} from '../enums/loginState';

const initialState ={
  mode: LoginStateEnum.Loging,
  process: LoginProcessEnum.None,
  message: '',
  processForm: {
    title: '',
    color: 'header',
    icon: '',
    spin: false,
    text:''
  },
  register:{
    email:'',
    nickname:''
  }
};
export default handleActions({
  'change mode' (state, action){
    state.process = LoginProcessEnum.None;
    state.message = '';
    return Object.assign({},state,action.payload);
  },
  'change process' (state, action){
    return Object.assign({},state,action.payload);
  },
  'change processform' (state,action){
    return Object.assign({},state,action.payload);
  },
  'set message' (state,action){
    state.message = action.payload;
    return Object.assign({},state);
  }
}, initialState);
