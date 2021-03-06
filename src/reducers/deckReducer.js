import { handleActions } from 'redux-actions';
import {DeckDetailTypeEnum,DeckModeEnum} from '../enums/DeckEnum';
import ButtonStateEnum from '../enums/buttonStateEnum';
const initialState ={
  collapse:{
    use:true,
    info:false,
    kind:true
  },
  preview:{
  },
  kindMode: true,
  loading:false,
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
    kind_name:'',
    description:'',
    ban_id:0,
    type_id:0,
    main_list:[],
    extra_list:[],
    preparation_list:[]
  },
  detail:{
    id: 0,
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
    views:0,
    comment:'',
    comments:{
      loading:false,
      current_page:1,
      items:[]
    },
    owner:{
      name:'',
      current_user: false
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
  },'remove deckitem' (state) {
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
  },'clear ondrawitem'(state){
    state.on_drag_item = {};
    return Object.assign({},state);
  },'set dragmode'(state,action){
    state.add_mode = action.payload;
    return Object.assign({},state);
  },'remove allpreitem'(state){
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
  },'move'(state){
    switch (state.on_move_array.data.type) {
      case DeckDetailTypeEnum.Main:
        state.deckform.main_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false,type:1}));
        break;
      case DeckDetailTypeEnum.Extra:
        state.deckform.extra_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false,type:2}));
        break;
      case DeckDetailTypeEnum.Preparation:
        state.deckform.preparation_list.splice(state.on_move_array.index+1,0,Object.assign({},state.on_drag_item,{sort:Math.random(),pre:false,type:3}));

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
    state.kind = action.payload.kind;

    action.payload.main_list = action.payload.main_list.map(data=>{
      data.pre = false;
      return data;
    });
    action.payload.extra_list = action.payload.extra_list.map(data=>{
      data.pre = false;
      return data;
    });
    action.payload.preparation_list = action.payload.preparation_list.map(data=>{
      data.pre = false;
      return data;
    });

    state.deckform = action.payload;
    return Object.assign({},state);
  },'change deckerrmsg' (state, action) {
    state.submitBtnText = action.payload;
    return Object.assign({},state);
  },'fetch deckdetail' (state, action) {
    state.detail = Object.assign({},state.detail,action.payload);
    return Object.assign({},state);
  },'fetch deckList' (state, action) {
    state.deck_type = action.payload;
    return Object.assign({},state);
  },'set deckformid' (state, action) {
    state.deckform.id = action.payload;
    return Object.assign({},state);
  },'change decktypepage' (state, action){
    state.deck_type.map(data=>{
      if(data.name == state.current_type){
        data.current_page = action.payload;
      }
    });
    return Object.assign({},state);
  },'fetch decktypepage' (state, action){
    state.deck_type.map(data=>{
      if(data.name == state.current_type){
        data.list = action.payload;
      }
    });
    return Object.assign({},state);
  },'set deckdetailid' (state, action){
    state.detail.id = action.payload;
    return Object.assign({},state);
  },'init detail' (state){
    state.detail = initialState.detail;
    return Object.assign({},state);
  },'init deckform' (state){
    state.deckform = initialState.deckform;
    state.kind = initialState.kind;

    return Object.assign({},state);
  },'set deckdetailloading' (state,action){
    state.loading = action.payload;
    return Object.assign({},state);
  },'set deckcollapse' (state,action){
    switch (action.payload) {
      case 'use':
      state.collapse.use = !state.collapse.use
        break;
      case 'info':
      state.collapse.info = !state.collapse.info
        break;
      case 'kind':
      state.collapse.kind = !state.collapse.kind
        break;
      default:

    }
    return Object.assign({},state);
  },'change deckkindmode' (state){
    state.kindMode = !state.kindMode;
    return Object.assign({},state);
  },'change deckkindname' (state,action){
    state.deckform.kind_name = action.payload;
    return Object.assign({},state);
  },'change deckdesc'(state,action){
    state.deckform.description = action.payload;
    return Object.assign({},state)
  },'fetch deckComment' (state,action){

    action.payload.items = state.detail.comments.items.concat(action.payload.items);
    state.detail.comments = Object.assign({},state.detail.comments,action.payload);

    return Object.assign({},state);
  },'set deckcommentpage'(state, action){
    state.detail.comments.current_page = action.payload;
    return Object.assign({},state);
  },'set deckcommentloading'(state,action){
    state.detail.comments.loading = action.payload;
    return Object.assign({},state);
  },'set deckcomment' (state,action){
    state.detail.comment = action.payload;
    return Object.assign({},state);
  },'init deckcomments' (state){
    state.detail.comments = initialState.detail.comments;
    return Object.assign({},state);
  },'set deckItemPreview'(state,action){
    state.preview = action.payload;
    return Object.assign({},state);
  }

}, initialState);
