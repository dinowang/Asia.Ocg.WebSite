import { handleActions } from 'redux-actions';

const initialState ={
    "query":"",
    "current_page":1,
    "total_page":0,
    "total_count": null,
    "items":[
    ]
};
export default handleActions({
  'fetch basic' (state, action) {
  return Object.assign({},state,action.payload);
  },
  'input search' (state, action){
    return Object.assign({},state,action.payload);
  },
  'change page' (state, action){
    console.log('changePage')
    state.current_page = action.payload;
    return Object.assign({},state);
  }
}, initialState);
