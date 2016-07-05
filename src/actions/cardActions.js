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
export const fetchCardEdit = createAction('fetch cardedit');
export const setProperty = createAction('set cardProperty');
export const setKind = createAction('set cardKind');
export const setLevel = createAction('set cardLevel');
export const setRace = createAction('set cardRace');
export const setAttack = createAction('set cardAttack');
export const setDefence = createAction('set cardDefence');
export const setName = createAction('set cardName');
export const setEffect = createAction('set cardEffect');
export const setSerialNumber = createAction('set cardSerialNumber');
export const setCardDetailId = createAction('set cardDetailId')
export const changeCardDetailBtnType = createAction('change carddetailbtntype');
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
      }
      dispatch(changeBtnType(ButtonStateEnum.Fail));
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },2500);
    });


  };
};

//Management
export const requestCardEdit = () => {
  return (dispatch, state) => {
    const {card,user} = state();
    fetch(`${Host}/card/edit/${card.edit.id}`,{
      method:'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      }
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchCardEdit(json.data));
      }
    });
  };
};
export const requestUpdateCardDetail = () => {
  return (dispatch, state) => {
    const {card,user} = state();
    fetch(`${Host}/card/edit`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(card.edit)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(changeCardDetailBtnType(ButtonStateEnum.Success));
      }else{
        dispatch(changeCardDetailBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardDetailBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};
