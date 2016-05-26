import { createAction } from 'redux-actions';
export const fetchBasic = createAction('fetch basic');
export const requestSearch = (data) => {
  return dispatch => {
    fetch(`http://api.xpg.cards/basicSearch?query=${data}`)
      .then((response)=> {
        return response.json()
    }).then((json)=> {
      dispatch(fetchBasic(json));
    });

  };
}
