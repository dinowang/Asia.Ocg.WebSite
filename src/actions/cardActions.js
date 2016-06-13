import { createAction } from 'redux-actions';
import {Host} from './url';
export const changeTab = createAction('change tab');
export const fetchCardInfo = createAction('fetch cardinfo');
export const fetchCardComment = createAction("fetch cardcomment");
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
