import { createAction } from 'redux-actions';
import {setUserData} from './userActions';
export const requestGetInfo = (token) => {
  return (dispatch,state) => {
    fetch(`http://api.xpg.cards/account/getinfo`,{
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
      }
    });
  };
};
