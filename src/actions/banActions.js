import { createAction } from 'redux-actions';
export const fetchCardList = createAction('fetch cardlist');
export const changeBtnType = createAction('change btntype');
export const changeDate = createAction('change date');
export const requestSearch = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`http://api.xpg.cards/search/${search.query}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardList(json.data));
    });
  };
};
