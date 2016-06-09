import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';
import BanTypeEnum from '../enums/banTypeEnum';

import moment from 'moment';

const initialState ={
  banform :{
    name: 'tes',
    date: moment(),
    type: -1,
    enable:true,
    list:[]
  },
  searchForm:{
    query:'',
    list:[]
  },
  sumbitBtn: ButtonStateEnum.None

};
export default handleActions({
  'fetch cardlist' (state, action) {
    state.searchForm.list = action.payload;
    return Object.assign({},state);
  },
  'set bantype' (state, action) {
    state.banform.type = action.payload;
    return Object.assign({},state);
  },
  'add tolist' (state, action) {
    action.payload.type = state.banform.type;
    let IsExist = state.banform.list.filter(data=>data.serial_number === action.payload.serial_number)
    if(IsExist.length ===0){
      state.banform.list.push(action.payload);
    }
    return Object.assign({},state);
  }
}, initialState);
