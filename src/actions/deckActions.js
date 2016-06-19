import { createAction } from 'redux-actions';
export const changeType = createAction('change type');
export const setDeckMode = createAction('set deckmode');
export const changeDeckName = createAction('change deckname');
export const changeDeckKind = createAction('change deckkind');
export const changeDeckBan = createAction('change deckban');
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
