import { handleActions } from 'redux-actions';
const initialState ={
  edit_mode: false,
  current_type:0,
  deckform:{
    name:"test",
    kind_id:0,
    ban_id:0,
    main_list:[{
      image_url:"https://xpgcards.blob.core.windows.net/image/null.jpg",
      serial_number:"123",
      card_detail_id:1,
      sort:0
    }],
    extra_list:[],
    preparation_list:[]
  },
  deck_kind:[{
    key:-1,
    value:"請選擇"
  },{
    key:1,
    value:"大法師"
  },{
    key:2,
    value:"大法師2"
  }],
  ban_list:[{
    key:-1,
    value:"請選擇"
  },{
    key:1,
    value:"2016.06",
  },{
    key:2,
    value:"2016.09"
  }],
  deck_type:[
    {
      id: 1,
      name: "最新上傳"
    },{
      id: 2,
      name: "日本牌組"
    },{
      id: 3,
      name: "玩家分享"
    }],
  deck_list:[{
    id: 1,
    name: "test",
    main_count: 10,
    extra_count: 20,
    preparation_count: 15,
    deck_kind: "DD",
    deck_ben: "16.4"
  },{
    id: 2,
    name: "test",
    main_count: 10,
    extra_count: 20,
    preparation_count: 15,
    deck_kind: "DD",
    deck_ben: "16.4"
  }]
};
export default handleActions({
  'change type' (state, action) {
    state.current_type = action.payload;
  return Object.assign({},state);
  },'change deckname' (state, action) {
    state.deckform.name = action.payload;
    return Object.assign({},state);
  },'change deckkind' (state, action) {
    state.deckform.kind_id = action.payload;
    return Object.assign({},state);
  }
}, initialState);
