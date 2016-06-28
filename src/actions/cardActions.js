import { createAction } from 'redux-actions';
import {Host} from './url';
import ButtonStateEnum from '../enums/buttonStateEnum';
import StatusCode from '../enums/statusCode';
export const changeTab = createAction('change tab');
export const fetchCardInfo = createAction('fetch cardinfo');
export const fetchCardComment = createAction('fetch cardcomment');
export const fetchCardDeck = createAction('fetch carddeck');
export const setDeckPage = createAction('set deckpage');
export const setCommentPage = createAction('set cardcommentpage');
export const setLoading = createAction('set loading');
export const setComment = createAction('set comment');
export const changeBtnType = createAction('change cardcommentbtnstyle');
export const initComment = createAction('init cardcomment');
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
export const requestCardComment = () => {
  return (dispatch,state) => {
    const {card} = state();
    fetch(`${Host}/card/comment/${card.serial_number}/${card.comments.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchCardComment(json.data));
      dispatch(setLoading(false));
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

//Member

export const requestCreateCardComment= () => {
  return (dispatch, state) => {
    const {card, user} = state();
    fetch(`${Host}/card/comment`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify({
        card_serialnumber: card.serial_number,
        content: card.comment
      })
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(initComment());
        dispatch(requestCardComment());
        dispatch(setComment(''));
        dispatch(changeBtnType(ButtonStateEnum.Success));
        return true;
      }else if(json.status_code === StatusCode.DeckKindIsNull){
        // dispatch(changeBanErrMsg("請選擇種類"));
      }else if(json.status_code === StatusCode.DeckNameIsNull){
        // dispatch(changeBanErrMsg("請填寫牌組名稱"));
      }
      dispatch(changeBtnType(ButtonStateEnum.Fail));
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },2500);
    });


  };
};
