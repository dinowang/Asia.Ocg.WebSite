import { createAction } from 'redux-actions';
import {Host} from './url';
export const changeTab = createAction('change tab');
export const fetchCardInfo = createAction('fetch cardinfo');
export const fetchCardComment = createAction('fetch cardcomment');
export const fetchCardDeck = createAction('fetch carddeck');
export const setDeckPage = createAction('set deckpage');
export const setLoading = createAction('set loading');
export const checkinList = (serialNumber)=>{
  return (dispatch, state) => {
    const {card} = state();
    let value ;
    card.list.map((data)=>{
      if(data.serial_number === serialNumber){
        value = data;
      }
    });
    if(value){
      dispatch(fetchCardInfo(value));

    }else{
      dispatch(requestCardInfo(serialNumber));
    }
  };
};
export const requestCardInfo = (serialNumber) => {
  return (dispatch) => {
    fetch(`${Host}/card/${serialNumber}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardInfo(json.data));
    });
  };
};
export const requestCardComment = (serialNumber) => {
  return (dispatch) => {
    fetch(`${Host}/card/comment/${serialNumber}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardComment(json.data));
    });
  };
};
export const requestCardDeck = () => {
  return (dispatch,state) => {
    const {card} = state();
    fetch(`${Host}/card/decklist/${card.serial_number}/${card.deck.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardDeck(json.data));
      dispatch(setLoading(false));
    });
  };
};
