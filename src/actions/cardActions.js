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
export const changeBtnType = createAction('change cardcommentbtnstyle');
export const changeCardsBtnType = createAction('change cardsBtnType');
export const setCardForm = createAction('set cardForm')
export const setPack = createAction('set cardPack');
export const setType = createAction('set cardType');
export const setCardNumber = createAction('set editCardNumber');
export const fetchCards = createAction('fetch editResultCards');
export const changeCardsDeleteBtnType = createAction('change deleteCardsBtnType');
export const changeCardsParseBtnType = createAction('change parseCardsBtnType');
export const fetchDropDwon = createAction('fetch cardDropdwon');
export const initCardEdit = createAction('init cardEdit');

export const checkinList = (serialNumber)=>{
  return async (dispatch, state) => {
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
      await dispatch(requestCardInfo(serialNumber));
    }
  };
};
export const requestCardInfo = (serialNumber) => {
  return async (dispatch) => {
    await fetch(`${Host}/card/${serialNumber}`)
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
export const requestCardDropDown = () => {
  return (dispatch, state) => {
    const {card,user} = state();
    fetch(`${Host}/card/dropdown`,{
      method:'GET',
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
        dispatch(fetchDropDwon(json.data));
        if(card.edit.detail_form.id){
          dispatch(requestCardEdit());
        }
      }
    });
  };
};

export const requestCardEdit = () => {
  return (dispatch, state) => {
    const {card,user} = state();
    fetch(`${Host}/card/edit/${card.edit.detail_form.id}`,{
      method:'GET',
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

export const requestCreateCardDetail = (nav) => {
  return (dispatch, state) => {
    let {card,user} = state();
    fetch(`${Host}/card/edit`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(card.edit.detail_form)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(changeCardDetailBtnType(ButtonStateEnum.Success));
        dispatch(fetchCardEdit(json.data));
        nav.push(`/cardManage/Form/${json.data.id}`);
      }else{
        dispatch(changeCardDetailBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardDetailBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};
export const requestUpdateCardDetail = () => {
  return (dispatch, state) => {
    let {card,user} = state();
    fetch(`${Host}/card/edit`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(card.edit.detail_form)
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
export const requestUpdateCards = () => {
  return (dispatch, state) => {
    let {card,user} = state();
    fetch(`${Host}/card/cards`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(card.edit.card_form)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchCards(json.data));
        dispatch(changeCardsBtnType(ButtonStateEnum.Success));
      }else{
        dispatch(changeCardsBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardsBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};
export const requestCreateCards= () => {
  return (dispatch, state) => {
    let {card,user} = state();
    let postData = Object.assign({}, card.edit.card_form,{detail_id:card.edit.detail_form.id});
    fetch(`${Host}/card/cards`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(postData)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchCards(json.data.cards));
        dispatch(setCardForm(json.data.card_form));
        dispatch(changeCardsBtnType(ButtonStateEnum.Success));
      }else{
        dispatch(changeCardsBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardsBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};
export const requestDeleteCards= () => {
  return (dispatch, state) => {
    let {card,user} = state();
    fetch(`${Host}/card/cards/${card.edit.card_form.id}`,{
      method:'DELETE',
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
        dispatch(fetchCards(json.data));
        dispatch(setCardForm({image_url:'',number:''}));
        dispatch(changeCardsDeleteBtnType(ButtonStateEnum.Success));
      }else{
        dispatch(changeCardsDeleteBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardsDeleteBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};

export const requestGetImage = () => {
  return (dispatch, state) => {
    let {card,user} = state();
    fetch(`${Host}/card/getimage/${card.edit.card_form.id}`
      ,{headers: {'Token':user.token}})
    .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchCards(json.data.cards));
        dispatch(setCardForm(json.data.card_form));
        dispatch(changeCardsParseBtnType(ButtonStateEnum.Success));
      }else{
        dispatch(changeCardsParseBtnType(ButtonStateEnum.Fail));
      }
      setTimeout(()=>{
        dispatch(changeCardsParseBtnType(ButtonStateEnum.None));
      },2500);
    });
  };
};
