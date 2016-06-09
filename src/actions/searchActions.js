import { createAction } from 'redux-actions';
export const fetchBasic = createAction('fetch basic');
export const inputSearch = createAction('input search');
export const changePage = createAction('change page');
export const changeSearchMode = createAction('change searchmode');
export const requestSearch = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`http://api.xpg.cards/search/${search.query}?page=${search.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchBasic(json.data));
    });
  };
};
