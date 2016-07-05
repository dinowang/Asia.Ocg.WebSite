import { handleActions } from 'redux-actions';
import ButtonStateEnum from '../enums/buttonStateEnum';

const initialState ={
  display_tab:0,
  name: "",
  image_url: "https://xpgcards.blob.core.windows.net/image/null.jpg",
  kind: "",
  level: "",
  property: "",
  race: "",
  attack: null,
  defence: null,
  effect: "",
  serial_number: "",
  pack:[],
  list:[],
  comments:{
    current_page:1,
    items:[]
  },
  comment:'',
  loading:false,
  sumbitBtn:  ButtonStateEnum.None,
  deck:{
    current_page:1,
    total_page:0,
    total_count:0,
    items:[]
  },edit:{
    serial_number:'',
    sumbitBtn:  ButtonStateEnum.None,
    kinds:[{
      key:-1,
      value:'請選擇'
    }],
    levels:[{
      key:-1,
      value:'請選擇'
    }],
    propertys:[{
      key:-1,
      value:'請選擇'
    }],
    races:[{
      key:-1,
      value:'請選擇'
    }],
    packs:[{
      key:-1,
      value:'請選擇'
    }],
    types:[{
      key:-1,
      value:'請選擇'
    }]
  }

};
export default handleActions({
  'change tab' (state, action) {
    state.display_tab = action.payload;
  return Object.assign({},state);
  },'fetch cardinfo' (state, action){
    let IsExist = state.list.filter(data=>data.serial_number === action.payload.serial_number);
    if(IsExist.length === 0){
      state.list = state.list.concat(action.payload);
    }
    return Object.assign({},state,action.payload);
  },'fetch cardcomment' (state, action) {
    action.payload.items = state.comments.items.concat(action.payload.items);
    state.comments = Object.assign({},state.comments,action.payload);
    return Object.assign({},state);
  },'fetch carddeck' (state, action){
    state.deck.total_page = action.payload.total_page;
    state.deck.total_count = action.payload.total_count;
    state.deck.items = state.deck.items.concat(action.payload.items);

    return Object.assign({},state);
  },'set deckpage' (state, action){
    state.deck.current_page = action.payload;
    return Object.assign({},state);
  },'set cardcommentpage' (state, action){
    state.comments.current_page = action.payload;
    return Object.assign({},state);
  },'set loading' (state, action){
    state.loading = action.payload;
    return Object.assign({},state);
  },'set comment' (state,action){
    state.comment = action.payload;
    return Object.assign({},state);
  },'change cardcommentbtnstyle' (state,action){
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'init cardcomment' (state){
    state.comments = initialState.comments;
    return Object.assign({},state);
  },'set editserialnumber'(state, action){
    state.edit.serial_number = action.payload;
    return Object.assign({},state);
  },'fetch cardedit' (state,action){
    state.edit = Object.assign({},state.edit,action.payload);
    return Object.assign({},state);
  },'set cardProperty' (state, action){
    state.edit.property_id = action.payload;
    return Object.assign({},state);
  },'set cardKind' (state, action){
    state.edit.kind_id = action.payload;
    return Object.assign({},state);
  },'set cardLevel' (state, action){
    state.edit.level_id = action.payload;
    return Object.assign({},state);
  }
}, initialState);
