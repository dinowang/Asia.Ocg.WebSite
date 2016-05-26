import { createAction } from 'redux-actions';
export const fetchBasic = createAction('fetch basic');
export const inputSearch = createAction('input search');
export const changePage = createAction('change page');
export const requestSearch = (state) => {
  return dispatch => {
    fetch(`http://api.xpg.cards/basicSearch?query=${state.query}&page=${state.current_page}`)
      .then((response)=> {
        return response.json()
    }).then((json)=> {
      dispatch(fetchBasic(json));
    });
  };
}
