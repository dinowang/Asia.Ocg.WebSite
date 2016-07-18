import { createAction } from 'redux-actions';
import {Host} from './url';
import fetch from 'isomorphic-fetch';
export const setPack = createAction('set pack');
export const setEditMode = createAction('set editMode');
export const fetchPackList = createAction('fetch packList');

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
