import { createAction } from 'redux-actions';
export const fetchCardList = createAction('fetch cardlist');
export const setBanType = createAction('set bantype');
export const addToList = createAction('add tolist')
export const requestSearch = (value) => {
  return (dispatch) => {
    fetch(`http://api.xpg.cards/search/${value}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardList(json.data.items));
    });
  };
};
