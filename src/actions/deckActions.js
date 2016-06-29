import { createAction } from 'redux-actions';
import {Host} from './url';
import ButtonStateEnum from '../enums/buttonStateEnum';
import {DeckModeEnum} from '../enums/DeckEnum';
import StatusCode from '../enums/statusCode';
export const changeType = createAction('change type');
export const setEditMode = createAction('set editmode');
export const changeDeckName = createAction('change deckname');
export const changeDeckKind = createAction('change deckkind');
export const changeDeckBan = createAction('change deckban');
export const changeDeckType = createAction('change decktype');
export const setDragItem = createAction('set dragitem');
export const setDragArea = createAction('set dragarea');
export const clearArea = createAction('clear dragarea');
export const setToList = createAction('set todecklist');
export const removeDeckItem = createAction('remove deckitem')
export const clearOnDragItem = createAction('clear ondrawitem')
export const changeDragMode = createAction('set dragmode');
export const removeAllPreItem = createAction('remove allpreitem');
export const preMove = createAction('pre move');
export const move = createAction('move');
export const setOnMoveArray = createAction('set onmovearray');
export const setDeckMode  = createAction('set deckmode');
export const fetchInfo  = createAction('fetch deckinfo');
export const changeBtnType = createAction('change deckbtntype');
export const changeBanErrMsg = createAction('change deckerrmsg');
export const setDeckFormId = createAction('set deckformid');
export const fetchDeck = createAction('fetch deck');
export const fetchDeckDetail = createAction('fetch deckdetail');
export const fetchDeckComment = createAction('fetch deckComment');
export const setDeckDetailId = createAction('set deckdetailid');
export const fetchDeckList = createAction('fetch deckList');
export const changeDeckTypePage = createAction('change decktypepage');
export const fetchDeckTypePage = createAction('fetch decktypepage');
export const initDetail = createAction('init detail');
export const initDeckForm = createAction('init deckform');
export const setLoading = createAction('set deckdetailloading');
export const setDeckCommentLoading = createAction('set deckcommentloading');
export const changeKindMode = createAction('change deckkindmode');
export const changeKindName = createAction('change deckkindname');
export const changeDescription = createAction('change deckdesc');
export const setCollapse = createAction('set deckcollapse');
export const setDeckPage = createAction('set deckcommentpage');
export const setDeckComment = createAction('set deckcomment');
export const initDeckComments = createAction('init deckcomments');

export const requestDeckList = () => {
  return (dispatch) => {
    fetch(`${Host}/deck/list/`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchDeckList(json.data));
      }
    });
  };
};

export const requestDeckComment = () => {
  return (dispatch,state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck/comment/${deck.detail.id}/${deck.detail.comments.current_page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchDeckComment(json.data));
        dispatch(setDeckCommentLoading(false));
      }
    });
  };
};

export const requestDeckDetail = () => {
  return (dispatch,state) => {
    const {deck, user} = state();
    dispatch(setLoading(true));

    fetch(`${Host}/deck/detail/${deck.detail.id}`,{
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
        dispatch(fetchDeckDetail(json.data));
        dispatch(requestDeckComment());
      }
      dispatch(setLoading(false));
    });
  };
};

export const requestDeckTypePage = (page) => {
  return (dispatch,state) => {
    const {deck} = state();
    fetch(`${Host}/deck/${deck.current_type}/${page}`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchDeckTypePage(json.data));
        dispatch(changeDeckTypePage(page));

      }
    });
  };
};

//Member
export const requestDeckInfo = () => {
  return (dispatch, state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck/editinfo`,{
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
      dispatch(fetchInfo(json.data));
    });
  };
};

export const requestDeckEditDetail = () => {
  return (dispatch, state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck/edit/${deck.deckform.id}`,{
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
        dispatch(fetchDeck(json.data));
      }
    });
  };
};

export const requestCreateDeck= (nav) => {
  return (dispatch, state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(deck.deckform)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchDeck(json.data));
        if(deck.kindMode === false){
          dispatch(changeKindMode());
        }
        dispatch(changeBtnType(ButtonStateEnum.Success));
        dispatch(setDeckMode(DeckModeEnum.Edit));
        nav.push(`/deckdetail/edit/${deck.deckform.id}`);
        return true;
      }else if(json.status_code === StatusCode.DeckKindIsNull){
        dispatch(changeBanErrMsg("請選擇種類"));
      }else if(json.status_code === StatusCode.DeckNameIsNull){
        dispatch(changeBanErrMsg("請填寫牌組名稱"));
      }else if(json.status_code === StatusCode.DeckBanIsNull){
        dispatch(changeBanErrMsg("請選擇禁卡表"));
      }else if(json.status_code === StatusCode.DeckNameLimit){
        dispatch(changeBanErrMsg("牌組名稱不能超過20個字"));
      }else if(json.status_code === StatusCode.DeckDescriptonLimit){
        dispatch(changeBanErrMsg("敘述文字不能超過1000個字"));
      }else if(json.status_code === StatusCode.DeckTypeIsNull){
        dispatch(changeBanErrMsg("請選擇類型"));
      }
      dispatch(changeBtnType(ButtonStateEnum.Fail));
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },2500);
    });

  };
};

export const requestUpdateDeck= (nav) => {
  return (dispatch, state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck`,{
      method:'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify(deck.deckform)
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(fetchDeck(json.data));
        if(deck.kindMode === false){
          dispatch(changeKindMode());
        }
        dispatch(changeBtnType(ButtonStateEnum.Success));
        dispatch(setDeckMode(DeckModeEnum.Edit));
        nav.push(`/deckdetail/edit/${deck.deckform.id}`);
        return true;
      }else if(json.status_code === StatusCode.DeckKindIsNull){
        dispatch(changeBanErrMsg("請選擇種類"));
      }else if(json.status_code === StatusCode.DeckNameIsNull){
        dispatch(changeBanErrMsg("請填寫牌組名稱"));
      }else if(json.status_code === StatusCode.DeckBanIsNull){
        dispatch(changeBanErrMsg("請選擇禁卡表"));
      }else if(json.status_code === StatusCode.DeckNameLimit){
        dispatch(changeBanErrMsg("牌組名稱不能超過20個字"));
      }else if(json.status_code === StatusCode.DeckDescriptonLimit){
        dispatch(changeBanErrMsg("敘述文字不能超過1000個字"));
      }else if(json.status_code === StatusCode.DeckTypeIsNull){
        dispatch(changeBanErrMsg("請選擇類型"));
      }else if(json.status_code === StatusCode.DeckNoUpdateData){
        dispatch(changeBanErrMsg("查無可更新資料"));
      }
      dispatch(changeBtnType(ButtonStateEnum.Fail));
      setTimeout(()=>{
        dispatch(changeBtnType(ButtonStateEnum.None));
      },2500);
    });

  };
};

export const requestCreateDeckComment= () => {
  return (dispatch, state) => {
    const {deck, user} = state();
    fetch(`${Host}/deck/comment`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Token': user.token
      },
      body: JSON.stringify({
        deck_id: deck.detail.id,
        content: deck.detail.comment
      })
    })
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      if(json.status_code === StatusCode.Success){
        dispatch(initDeckComments());
        dispatch(requestDeckComment());
        dispatch(setDeckComment(''));
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
