import { createAction } from 'redux-actions';
import {Host} from './url';
import StatusCode from '../enums/statusCode';
import {LoginProcessEnum, LoginStateEnum} from '../enums/loginState';
import {setUserData} from './userActions';
export const changeMode = createAction('change mode');
export const changeProcess = createAction('change process');
export const changeProcessForm = createAction('change processform');
export const setMessage = createAction('set message');
export const fetchRegister = createAction('fetch register');
export const requestRegister = (email,nickname) => {
  return (dispatch) => {
    fetch(
      `${Host}/account/register`,{
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
      }else if(status_code === StatusCode.Success)
        dispatch(changeProcessForm({processForm:{
          title: '完成',
          color: 'header grean',
          icon: 'check-circle-o',
          spin: false,
          text: `請至 ${email} 收取確認信件`
        }}));
    }).catch(()=>{
      dispatch(changeProcess({process:LoginProcessEnum.None}));
      dispatch(setMessage("網路發生錯誤"));
    });

  };
};
export const requestCheckCode = (code) => {
  return (dispatch) => {
    fetch(
      `${Host}/check/register_code/${code}`)
    .then((response)=> {
      return response.json();
    }).then((json)=> {
      let {status_code} = json;
      if(status_code === StatusCode.Success){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
      }else if(status_code === StatusCode.registerCodeExpired){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(changeMode({mode:LoginStateEnum.ReSendEmail}));
        dispatch(setMessage("驗證已過期，輸入 Email 寄發確認信件。"));
      }else  if(status_code === StatusCode.registerCodeFail){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(changeMode({mode:LoginStateEnum.Loging}));
      }
    }).catch(()=> {
      dispatch(changeProcess({process:LoginProcessEnum.None}));
      dispatch(setMessage("網路發生錯誤"));
    });

  };
};
export const requestRegSetPwd = (register_code, password) => {
  return (dispatch) => {
    fetch(
      `${Host}/account/setpassword`,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        register_code: register_code,
        password: password
        })
      })
    .then((response)=> {return response.json();})
    .then((json)=> {
      let {status_code} = json;
      if(status_code === StatusCode.Success){
        dispatch(changeProcessForm({processForm:{
          title: '完成',
          color: 'header grean',
          icon: 'check-circle-o',
          spin: false,
          text: `您現在可以登入了唷！`
        }}));
        dispatch(setMessage(''));
      }else if(status_code === StatusCode.registerCodeFail){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(changeMode({mode:LoginStateEnum.ReSendEmail}));
        dispatch(setMessage("驗證已過期，輸入 Email 寄發確認信件。"));
      }else  if(status_code === StatusCode.registerCodeFail){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(changeMode({mode:LoginStateEnum.Loging}));
      }
    })
    .catch(()=> {
      dispatch(changeProcess({process:LoginProcessEnum.None}));
      dispatch(setMessage("網路發生錯誤"));
    });

  };
};
export const requestLogin = (account, password) => {
  return (dispatch) => {
    //
    fetch(
      `${Host}/account/login`,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        account: account,
        password: password
        })
      })
    .then((response)=> {return response.json();})
    .then((json)=> {
      let {status_code,data} = json;
      if(status_code === StatusCode.Success){
        dispatch(changeProcessForm({processForm:{
          title: '登入成功',
          color: 'header grean',
          icon: 'check-circle-o',
          spin: false,
          text: ``
        }}));
        dispatch(setUserData(data));
        dispatch(setMessage(""));
      }else if(status_code === StatusCode.unRegister){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(setMessage("帳號尚未註冊"));
      }else  if(status_code === StatusCode.loginFail){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(setMessage("帳號或密碼失敗"));
      }else  if(status_code === StatusCode.unCheckEMail){
        dispatch(changeProcess({process:LoginProcessEnum.None}));
        dispatch(setMessage("請至信箱收取認證信"));
      }
    })
    .catch(()=> {
      dispatch(changeProcess({process:LoginProcessEnum.None}));
      dispatch(setMessage("網路發生錯誤"));
    });

  };
};
