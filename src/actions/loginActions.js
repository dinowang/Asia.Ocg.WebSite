import { createAction } from 'redux-actions';
import StatusCode from '../enums/statusCode';
import {LoginProcessEnum} from '../enums/loginState';
export const changeMode = createAction('change mode');
export const changeProcess = createAction('change process');
export const changeProcessForm = createAction('change processform');
export const setMessage = createAction('set message')
export const fetchRegister = createAction('fetch register');
export const requestRegister = (email,nickname) => {
  return (dispatch) => {
    fetch(
      `http://api.xpg.cards/account/register`,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email: email,
        nickname: nickname})
      })
    .then((response)=> {
      return response.json();
    }).then((json)=> {
      let {status_code} = json;
      if(status_code === StatusCode.registerExist){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(setMessage("帳號已存在"));
      }else if(status_code === StatusCode.registerSuccess)
        dispatch(changeProcessForm({processForm:{
          title: '完成',
          color: 'header grean',
          icon: 'check-circle-o',
          spin: false,
          text: `請至 ${email} 收取確認信件`
        }}));
    }).catch(function(ex) {
      dispatch(changeProcess({process:LoginProcessEnum.None}));
      dispatch(setMessage("網路發生錯誤"));
    });

  };
};
