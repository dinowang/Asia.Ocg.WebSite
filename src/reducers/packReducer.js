import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';
import moment from 'moment';

const initialState ={
  current_pack:'all',
  isEdit: false,
  group:[],
  groupForm:{
    sumbitBtn:ButtonStateEnum.None
  }
};
export default handleActions({
  'set pack' (state, action){
    state.current_pack = action.payload;
    return Object.assign({},state);
  },'set editMode' (state){
    state.isEdit = !state.isEdit;
    return Object.assign({},state);
  },'fetch packList' (state,action){
    state.group = action.payload;
    return Object.assign({},state);
  }
}, initialState);
