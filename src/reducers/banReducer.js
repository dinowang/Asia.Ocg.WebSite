import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';
import moment from 'moment';

const initialState ={
  banform :{
    name:'tes',
    date:moment(),
    enable:true,
    list:[{
      type:0,
      name:'',
      image:''
    }]
  },
  searchForm:{
    query:'',
    list:[
      {
        name:'',
        image_url:''
      }
    ]
  },
  sumbitBtn: ButtonStateEnum.None

};
export default handleActions({
  'fetch cardlist' (state, action) {
    return Object.assign({},state,action.payload);
  },
  'change btntype' (state, action) {
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },
  'change date' (state, action) {
    state.banform.date = action.payload;
    return Object.assign({},state);
  }
}, initialState);
