import { handleActions } from 'redux-actions';
import DeckDetailTypeEnum from '../enums/DeckDetailTypeEnum';
const initialState ={
  edit_mode: false,
  current_type:0,
  on_drag_item:{},
  on_drag_area: DeckDetailTypeEnum.None,
  deckform:{
    name:"test",
    kind_id:0,
    ban_id:0,
    main_list:[],
    extra_list:[],
    preparation_list:[]
  },
  search_result:[{
    image_url:"http://ocg.xpg.tw/card_img/SD25-JP031.jpg",
    serial_number:"123",
    card_detail_id:2,
    sort:0
  },{
    image_url:"http://ocg.xpg.tw/card_img/SD25-JP001.jpg",
    serial_number:"123",
    card_detail_id:3,
    sort:0
  },{
    image_url:"http://ocg.xpg.tw/card_img/BE01-JP207.jpg",
    serial_number:"123",
    card_detail_id:4,
    sort:0
  }],
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
  },'change deckban' (state, action) {
    state.deckform.ban_id = action.payload;
    return Object.assign({},state);
  },'set dragitem' (state, action) {
    const g = state.search_result.filter(data =>
      data.card_detail_id === action.payload
    )
    state.on_drag_item = g[0];
    return Object.assign({},state);
  },'set dragarea' (state, action) {
    state.on_drag_area = action.payload;
    return Object.assign({},state);
  },'clear dragarea' (state) {
    state.on_drag_area = DeckDetailTypeEnum.None;
    return Object.assign({},state);
  },'set todecklist' (state) {
    if(state.on_drag_area !== DeckDetailTypeEnum){
      switch (state.on_drag_area) {
        case DeckDetailTypeEnum.Main:
          state.deckform.main_list.push(state.on_drag_item);
          break;
        case DeckDetailTypeEnum.Extra:
          state.deckform.extra_list.push(state.on_drag_item);
          break;
        case DeckDetailTypeEnum.Preparation:
          state.deckform.preparation_list.push(state.on_drag_item);
          break;
        default:

      }
    }
    console.log('todecklist');
    return Object.assign({},state);
  }
}, initialState);
