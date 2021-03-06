import { createAction } from 'redux-actions';
import fetch from 'isomorphic-fetch';
import {Host} from './url';
import ButtonStateEnum from '../enums/buttonStateEnum';
import StatusCode from '../enums/statusCode';
export const fetchCardList = createAction('fetch cardlist');
export const fetchBanList = createAction('fetch banlist');
export const fetchBanForm = createAction('fetch banform');
export const fetchInit = createAction('fetch init');
export const setBanType = createAction('set bantype');
export const addToList = createAction('add tolist');
export const removeItem = createAction('remove banitem');
export const changeBtnType = createAction('change btntype');
export const changeBanErrMsg = createAction('change banerrmsg');
export const changeBanDate = createAction('change bandate');
export const changeName = createAction('change name');
export const changeEnable = createAction('change banenable');
export const fetchUserBanList = createAction('fetch userbanlist');
export const requestSearch = (value) => {
  return (dispatch) => {
    fetch(`${Host}/search/${value}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchCardList(json.data.items));
      }
    });
  };
};
export const requestBan = (id) => {
  return async (dispatch) => {
    await fetch(`${Host}/ban/${id}`)
    .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchBanForm(json.data));
      }
    });
  };
};

export const requestBanList = (id, nav) => {
  return async (dispatch) => {
    await fetch(`${Host}/ban/list`)
    .then((response)=> {
        return response.json();
    }).then( async (json)=> {
      if(json.data){
        await dispatch(fetchUserBanList(json.data));
        if(id){
          await dispatch(requestBan(id));
        }else{
          await dispatch(requestBan(json.data[0].id));
          nav.push(`/ban/${json.data[0].id}/${json.data[0].name}`);
        }
      }
    });
  };
};

// Manage
export const requestCreateBan = (nav) => {
  return (dispatch, state) => {
    const {ban, user} = state();
    fetch(`${Host}/manage/ban`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(ban.banform)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.BanDateExist){
        dispatch(changeBanErrMsg("日期重複"));
        dispatch(changeBtnType(ButtonStateEnum.Fail));
        setTimeout(()=>{
          dispatch(changeBtnType(ButtonStateEnum.None));
        },2500);
      }else if(json.data){
        dispatch(fetchBanForm(json.data));
        dispatch(changeBtnType(ButtonStateEnum.Success));
        setTimeout(()=>{
          dispatch(changeBtnType(ButtonStateEnum.None));
        },1500);
        nav.push(`/banManage/form/${ban.banform.id}`);

      }
    });

  };
};
export const requestManageBanList = () => {
  return (dispatch, state) => {
    const {user} = state();
    fetch(`${Host}/manage/ban`,{headers: {'Token':user.token}})
    .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchBanList(json.data));
      }
    });
  };
};
export const requestManageBanForm = (id) => {
  return (dispatch, state) => {
    const {user} = state();
    fetch(`${Host}/manage/ban/${id}`,{headers: {'Token':user.token}})
    .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchBanForm(json.data));
      }
    });
  };
};
export const requestManageDeleteBan = (id) => {
  return (dispatch, state) => {
    const {user} = state();
    fetch(`${Host}/manage/ban/${id}`,{
        method:'DELETE',
        headers: {'Token': user.token}
      }
    )
    .then((response)=> {
        return response.json();
    })
    .then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(requestManageBanList());
      }else if(json.status_code === StatusCode.NoData){
        alert('NODATA');
        dispatch(requestManageBanList());
      }
    });

  };
};
export const requestManageUpdateBan = () => {
  return (dispatch, state) => {
    const {ban, user} = state();
    fetch(`${Host}/manage/ban`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(ban.banform)
    })
    .then((response)=> {
        return response.json();
    })
    .then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchBanForm(json.data));
        dispatch(changeBtnType(ButtonStateEnum.Success));
        setTimeout(()=>{
          dispatch(changeBtnType(ButtonStateEnum.None));
        },1500);
      }else if(json.status_code === StatusCode.NoData){
        alert('NODATA');
      }
    });

  };
};
