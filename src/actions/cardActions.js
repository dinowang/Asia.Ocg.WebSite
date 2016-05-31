import { createAction } from 'redux-actions';
export const changeTab = createAction('change tab');
export const fetchCardInfo = createAction('fetch cardinfo');
export const requestCardInfo = (serialNumber) => {
  return (dispatch) => {
    fetch(`http://api.xpg.cards/card?serialNumber=${serialNumber}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardInfo(json.data));
    });
  };
};
