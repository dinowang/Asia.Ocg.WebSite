import { createAction } from 'redux-actions';
import {Host} from './url';
export const fetchIndexInfo = createAction('fetch indexinfo');
export const requestInfo = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`${Host}/index/info`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchIndexInfo(json.data));
    });
  };
};
