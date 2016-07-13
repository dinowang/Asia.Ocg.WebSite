import { createAction } from 'redux-actions';
import {Host} from './url';
export const fetchBasic = createAction('fetch basic');
export const inputSearch = createAction('input search');
export const changePage = createAction('change page');
export const setLoading = createAction('set loading');
export const changeSearchMode = createAction('change searchmode');
export const requestSearch = () => {
  return async (dispatch,state) => {
    dispatch(setLoading(true));
    const {search} = state();
    await fetch(`${Host}/search/${search.query}?page=${search.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchBasic(json.data));
      dispatch(setLoading(false));
    });
  };
};
