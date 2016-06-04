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
        image:''
      }
    ]
  },
  sumbitBtn: ButtonStateEnum.None

};
export default handleActions({
  'search card' (state, action) {
    // state.display_tab = action.payload;
  return Object.assign({},state);
  },
  'change btntype' (state, action) {
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },
  'change date' (state, action) {
    state.banform.date = action.payload;
    console.log('date');
    return Object.assign({},state);
  }
}, initialState);
