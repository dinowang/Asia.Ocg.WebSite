import { handleActions } from 'redux-actions';
const initialState ={
    loading: false,
    query:"",
    display_mode: 0,
    current_page:1,
    total_page:0,
    total_count: null,
    items:[
    ]
};
export default handleActions({
  'fetch basic' (state, action) {
  return Object.assign({},state,action.payload);
  },
  'input search' (state, action){
    state.query = action.payload.toUpperCase().trim();
    return Object.assign({},state);
  },
  'change page' (state, action){
    state.current_page = action.payload;
    return Object.assign({},state);
  },
  'change searchmode'(state, action){
    state.display_mode = action.payload;
    return Object.assign({},state);
  },
  'set loading'(state, action){
    state.loading = action.payload;
    return Object.assign({},state);
  }
}, initialState);
