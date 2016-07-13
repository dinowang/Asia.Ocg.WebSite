import { createAction } from 'redux-actions';
import {Host} from './url';
import { setUserData } from './userActions';
import CookieHelper from '../businessLogic/cookieHelper';
import fetch from 'isomorphic-fetch';
export const setTitle = createAction('set title');
export const setUrl = createAction('set webUrl');
export const setDescription = createAction('set webDescription');
export const setImage = createAction('set webImage');
export const requestGetInfo = (funcs = [],errFuncs = []) => {
  const token = CookieHelper.Get('token');
  return async (dispatch) => {
    await fetch(`${Host}/account/getinfo`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      Token: token})
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.data !== null) {
        dispatch(setUserData(json.data));
        funcs.map(func=>func());
      }
      errFuncs.map(func=>func());
    });
  };
};
