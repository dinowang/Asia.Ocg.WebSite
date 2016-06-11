import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';
import BanTypeEnum from '../enums/banTypeEnum';

import moment from 'moment';

const initialState ={
  banform :{
    id:0,
    name: '',
    date: moment(),
    type: -1,
    enable:true,
    list:[]
  },
  searchForm:{
    query:'',
    list:[]
  },
  sumbitBtn: ButtonStateEnum.None,
  list:[{
    id: 1,
    name: "Test1",
    date: "2016.01.01",
    enable: true,
    ban: 20,
    limit: 10,
    prelimit: 4
  },{
    id: 2,
    name: "Test2",
    date: "2016.02.02",
    enable: false,
    ban: 30,
    limit: 20,
    prelimit: 8
  }]

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
  'change btntype' (state, action) {
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },
  'change bandate' (state, action) {
    state.banform.date = action.payload;
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
