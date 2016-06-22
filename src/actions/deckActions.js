import { createAction } from 'redux-actions';
import {Host} from './url';
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
export const requestDeckInfo = () => {
  return (dispatch,state) => {
    const {search} = state();
    fetch(`${Host}/deck/info`)
      .then((response)=> {
        return response.json();
    }).then((json)=> {
      dispatch(fetchInfo(json.data));
    });
  };
};

//Member
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
      
      //nav.push(`/banManage/form/${ban.banform.id}`);
    });

  };
};
