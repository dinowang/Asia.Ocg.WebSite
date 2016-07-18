import { createAction } from 'redux-actions';
import {Host} from './url';
import fetch from 'isomorphic-fetch';
import ButtonStateEnum from '../enums/buttonStateEnum';
import StatusCode from '../enums/statusCode';
export const setPack = createAction('set pack');
export const setEditMode = createAction('set editMode');
export const fetchPackList = createAction('fetch packList');
export const setPackGroupName = createAction('set packGroupName');
export const setPackGroup  = createAction('set packGroup');
export const changeBtnType = createAction('set packGroupBtnType');
export const initPackGroupFrom = createAction('init packGroupForm');
export const requestPackList = (value) => {
  return (dispatch) => {
    fetch(`${Host}/pack/list`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data){
        dispatch(fetchPackList(json.data));
      }
    });
  };
};
export const requestCreatePackGroup = () => {
  return (dispatch, state) => {
    const {pack, user} = state();
    fetch(`${Host}/pack/group`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(pack.groupForm)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.IsExist){
        dispatch(changeBtnType(ButtonStateEnum.Fail))
      }else if(json.data){
        dispatch(fetchPackList(json.data));
        dispatch(initPackGroupFrom());
        dispatch(changeBtnType(ButtonStateEnum.Success))
      }
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },1500);
    });

  };
};
export const requestDeletePackGroup = () => {
  return (dispatch, state) => {
    const  {pack, user} = state();
    fetch(`${Host}/pack/group/${pack.groupForm.id}`,{
      method:'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      }
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.NoData){
        dispatch(changeBtnType(ButtonStateEnum.Fail))
      }else if(json.data){
        dispatch(fetchPackList(json.data));
        dispatch(initPackGroupFrom());
        dispatch(changeBtnType(ButtonStateEnum.Success))
      }
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },1500);
    });

  };
};
