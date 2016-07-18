import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';
import moment from 'moment';

const initialState ={
  current_pack:'all',
  isEdit: false,
  group:[],
  groupForm:{
    id:0,
    name:''
  },
  sumbitBtn:ButtonStateEnum.None
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
  },'set packGroupName'(state,action){
    const g ={
      groupForm:{
        id: state.groupForm.id,
        sumbitBtn:ButtonStateEnum.None,
        name:action.payload
    }}
    return Object.assign({},state,g);
  },'set packGroupBtnType'(state,action){
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'init packGroupForm'(state,action){
    state.groupForm = initialState.groupForm;
    return Object.assign({},state);
  },'set packGroup'(state,action){
    state.groupForm = action.payload;
    return Object.assign({},state);
  },'edit pack'(state,action){
    state.group = state.group.map((data)=>{
      if(data.key === action.payload.groupId){
        data.items = data.items.map((item)=>{
          return item.id === action.payload.data
          ? action.payload.data
          : item;
        })
        return data;
      }else{
        return data;
      }

    })
    return Object.assign({},state);
  }

}, initialState);
