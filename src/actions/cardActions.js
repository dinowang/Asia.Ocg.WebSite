import { createAction } from 'redux-actions';
export const changeTab = createAction('change tab');
export const fetchCardInfo = createAction('fetch CardInfo');
export const requestCardInfo = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`http://api.xpg.cards/basicSearch?query=${search.query}&page=${search.current_page}`)
      .then((response)=> {
        return response.json()
    }).then((json)=> {
      dispatch(fetchBasic(json));
    });
  };
}
