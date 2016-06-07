import { handleActions } from 'redux-actions';
const initialState ={
  "display_tab":0,
  "name": "",
  "image_url": "https://xpgcards.blob.core.windows.net/image/null.jpg",
  "kind": "",
  "level": "",
  "property": "",
  "race": "",
  "attack": null,
  "defence": null,
  "effect": "",
  "serial_number": "",
  "pack":[],
  "list":[]
};
export default handleActions({
  'change tab' (state, action) {
    state.display_tab = action.payload;
  return Object.assign({},state);
  },
  'fetch cardinfo' (state, action){
    let IsExist = state.list.filter(data=>data.serial_number === action.payload.serial_number)
    if(IsExist.length === 0){
      state.list = state.list.concat(action.payload);
    }
    return Object.assign({},state,action.payload);
  }
}, initialState);
