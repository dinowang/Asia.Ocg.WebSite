import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';

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
  submitBtnText:'',
  list:[]

};
export default handleActions({
  // 重置表單
  'fetch init' (state) {
    state.banform = initialState.banform;
    return Object.assign({},state);
  },
  // 讀取搜尋卡片列表
  'fetch cardlist' (state, action) {
    state.searchForm.list = action.payload;
    return Object.assign({},state);
  },
  // 設定禁卡類型
  'set bantype' (state, action) {
    state.banform.type = action.payload;
    return Object.assign({},state);
  },
  // 設定按鈕狀態
  'change btntype' (state, action) {
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },
  // 設定按鈕錯誤文字
  'change banerrmsg' (state, action) {
    state.submitBtnText = action.payload;
    return Object.assign({},state);
  },
  // 更改禁卡表日期
  'change bandate' (state, action) {
    state.banform.date = action.payload;
    return Object.assign({},state);
  },
  // 更改禁卡表名稱
  'change name' (state, action) {
    state.banform.name = action.payload;
    return Object.assign({},state);
  },
  // 加入至禁卡表表單
  'add tolist' (state, action) {
    action.payload.type = state.banform.type;
    let IsExist = state.banform.list.filter(data=>data.serial_number === action.payload.serial_number);
    if(IsExist.length ===0){
      state.banform.list.push(action.payload);
    }
    return Object.assign({},state);
  },
  // 讀取禁卡表列表
  'fetch banlist' (state, action) {
    state.list = action.payload;
    return Object.assign({},state);
  },
  // 讀取禁卡表單
  'fetch banform' (state, action) {

    action.payload.date = moment(action.payload.date);
    state.banform = Object.assign({},state.banform,action.payload);
    return Object.assign({},state);
  }
}, initialState);
