import { createAction } from 'redux-actions';
import {Host} from './url';
export const fetchBasic = createAction('fetch basic');
export const inputSearch = createAction('input search');
export const changePage = createAction('change page');
export const changeSearchMode = createAction('change searchmode');
export const requestSearch = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`${Host}/search/${search.query}?page=${search.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchBasic(json.data));
    });
  };
};
