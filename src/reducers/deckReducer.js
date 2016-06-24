import { handleActions } from 'redux-actions';
import {DeckDetailTypeEnum,DeckModeEnum} from '../enums/DeckEnum';
import ButtonStateEnum from '../enums/buttonStateEnum';

const initialState ={
  edit_mode: false,
  add_mode: true,
  mode : DeckModeEnum.Create,
  current_type:'玩家分享',
  on_drag_item:{},
  on_move_array:null,
  move_enter:0,
  on_drag_area: DeckDetailTypeEnum.None,
  sumbitBtn:  ButtonStateEnum.None,
  submitBtnText:'',
  deckform:{
    id: 0,
    name:'',
    kind_id:0,
    ban_id:0,
    type_id:0,
    main_list:[],
    extra_list:[],
    preparation_list:[]
  },
  detail:{
    name:'',
    kind:'',
    ban:{
      name:'',
      detail:[]
    },
    main_list:[],
    extra_list:[],
    preparation_list:[],
    last_editdate:'',
    views:2,
    comment:'',
    owner:{
      name:''
    }
  },
  kind:[{
    key:-1,
    value:"請選擇"
  }],
  ban:[{
    key:-1,
    value:"請選擇"
  }],
  type:[{
    key:-1,
    value:"請選擇"
  }],
  deck_type:[]
};
export default handleActions({
  'change type' (state, action) {
    state.current_type = action.payload;
    return Object.assign({},state);
  },'set editmode' (state, action) {
    state.edit_mode = action.payload;
    return Object.assign({},state);
  },'set deckmode' (state, action) {
    state.mode = action.payload;
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
  },'change decktype' (state, action) {
    state.deckform.type_id = action.payload;
    return Object.assign({},state);
  },'set dragitem' (state, action) {
    state.on_drag_item = action.payload;
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
        state.deckform.main_list.push(Object.assign({},state.on_drag_item,{
          type: DeckDetailTypeEnum.Main,
          sort: Math.random(),//state.deckform.main_list.length + 1,
          pre: false
        }));
          break;
        case DeckDetailTypeEnum.Extra:
          state.deckform.extra_list.push(Object.assign({},state.on_drag_item,{
            type: DeckDetailTypeEnum.Extra,
            sort:Math.random(),// state.deckform.extra_list.length +1,
            pre: false
          }));
          break;
        case DeckDetailTypeEnum.Preparation:
          state.deckform.preparation_list.push(Object.assign({},state.on_drag_item,{
            type: DeckDetailTypeEnum.Preparation,
            sort:Math.random(), //state.deckform.preparation_list.length +1,
            pre: false
          }));
          break;
      }
    }
    return Object.assign({},state);
  },'remove deckitem' (state,action) {
    switch (state.on_drag_item.type) {
      case DeckDetailTypeEnum.Main:
        state.deckform.main_list = state.deckform.main_list.filter(data=>
          data.sort !== state.on_drag_item.sort
        )
        break;
      case DeckDetailTypeEnum.Extra:
        state.deckform.extra_list = state.deckform.extra_list.filter(data=>
          data.sort !== state.on_drag_item.sort
        )
        break;
      case DeckDetailTypeEnum.Preparation:
        state.deckform.preparation_list = state.deckform.preparation_list.filter(data=>
          data.sort !== state.on_drag_item.sort
        )
        break;
    }
    return Object.assign({},state);
  },'clear ondrawitem'(state,action){
    state.on_drag_item = {};
    return Object.assign({},state);
  },'set dragmode'(state,action){
    state.add_mode = action.payload;
    return Object.assign({},state);
  },'remove allpreitem'(state,action){
    state.deckform.main_list = state.deckform.main_list.filter(data=>
      data.pre === false
    )
    state.deckform.extra_list = state.deckform.extra_list.filter(data=>
      data.pre === false
    )
    state.deckform.preparation_list = state.deckform.preparation_list.filter(data=>
      data.pre === false
    )
    return Object.assign({},state);
  },'pre move'(state,action){
    switch (state.on_drag_item.type) {
      case DeckDetailTypeEnum.Main:
        state.deckform.main_list.splice(action.payload.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:true}));
        break;
      case DeckDetailTypeEnum.Extra:
        state.deckform.extra_list.splice(action.payload.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:true}));
        break;
      case DeckDetailTypeEnum.Preparation:
        state.deckform.preparation_list.splice(action.payload.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:true}));
        break;
    }
    return Object.assign({},state);
  },'set onmovearray'(state,action){
    state.on_move_array = action.payload;
    return Object.assign({},state);
  },'move'(state,action){
    switch (state.on_move_array.data.type) {
      case DeckDetailTypeEnum.Main:
        state.deckform.main_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false}));
        break;
      case DeckDetailTypeEnum.Extra:
        state.deckform.extra_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false}));
        break;
      case DeckDetailTypeEnum.Preparation:
        state.deckform.preparation_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false}));

        break;
    }
    state.deckform.main_list.map((data)=>{
      data.sort = Math.random();
    })
    state.deckform.extra_list.map((data)=>{
      data.sort = Math.random();
    })
    state.deckform.preparation_list.map((data)=>{
      data.sort = Math.random();
    })
    return Object.assign({},state);
  },'fetch deckinfo'(state,action){
    const {kind, ban, type} = initialState;
    state.kind = kind.concat(action.payload.kind)
    state.type = type.concat(action.payload.type)
    state.ban = ban.concat(action.payload.ban)
    return Object.assign({},state);
  },'change deckbtntype' (state, action) {
    state.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'fetch deck' (state, action) {
    state.deckform = action.payload;
    return Object.assign({},state);
  },'change deckerrmsg' (state, action) {
    state.submitBtnText = action.payload;
    return Object.assign({},state);
  },'fetch deckdetail' (state, action) {
    state.detail = action.payload;
    return Object.assign({},state);
  },'fetch deckList' (state, action) {
    state.deck_type = action.payload;
    return Object.assign({},state);
  },'set deckformid' (state, action) {
    state.deckform.id = action.payload;
    return Object.assign({},state);
  }

}, initialState);
