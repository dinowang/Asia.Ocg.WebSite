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
  },
  edit:{
    detail_form:{
      sumbitBtn:  ButtonStateEnum.None,
      cards:[]

    },
    packMode: true,
    dropdown:{
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
    ,card_form:{
      sumbitBtn:  ButtonStateEnum.None
    },cardsDelete:{
      sumbitBtn:  ButtonStateEnum.None
    },parseImage:{
      sumbitBtn:  ButtonStateEnum.None
    }

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

      // 本地暫存上限五筆
      if(state.list.length > 5){
        state.list.splice(0,1);
      }
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
    state.edit.detail_form =  Object.assign({},initialState.edit.detail_form,action.payload);
    return Object.assign({},state);
  },'set cardProperty' (state, action){
    state.edit.detail_form.property_id = action.payload;
    return Object.assign({},state);
  },'set cardKind' (state, action){
    state.edit.detail_form.kind_id = action.payload;
    return Object.assign({},state);
  },'set cardLevel' (state, action){
    state.edit.detail_form.level_id = action.payload;
    return Object.assign({},state);
  },'set cardRace' (state, action){
    state.edit.detail_form.race_id = action.payload;
    return Object.assign({},state);
  },'set cardPack' (state, action){
    state.edit.card_form.pack_id = action.payload;
    return Object.assign({},state);
  },'set cardPackName' (state, action){
    state.edit.card_form.pack_name = action.payload;
    return Object.assign({},state);
  },'set cardPackMode' (state){
    state.edit.packMode = !state.edit.packMode
    return Object.assign({},state);
  },'set cardType' (state, action){
    state.edit.card_form.type_id = action.payload;
    return Object.assign({},state);
  },'set cardAttack' (state, action){
    state.edit.detail_form.attack = action.payload;
    return Object.assign({},state);
  },'set cardDefence' (state, action){
    state.edit.detail_form.defence = action.payload;
    return Object.assign({},state);
  },'change carddetailbtntype'(state, action){
    state.edit.detail_form.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'set cardName'(state, action){
    state.edit.detail_form.name = action.payload;
    return Object.assign({},state);
  },'set cardEffect'(state, action){
    state.edit.detail_form.effect = action.payload;
    return Object.assign({},state);
  },'set cardSerialNumber'(state, action){
    state.edit.detail_form.serial_number = action.payload;
    return Object.assign({},state);
  },'set cardDetailId'(state, action){
    state.edit.detail_form.id = action.payload;
    return Object.assign({},state);
  },'set cardForm'(state, action){
    state.edit.card_form = Object.assign({},state.edit.card_form,action.payload)
    return Object.assign({},state);
  },'change cardsBtnType'(state, action){
    state.edit.card_form.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'fetch editResultCards'(state, action){
    state.edit.detail_form.cards = action.payload;
    return Object.assign({},state);
  },'set editCardNumber'(state,action){
    state.edit.card_form.number = action.payload;
    return Object.assign({},state);
  },'change deleteCardsBtnType'(state, action){
    state.edit.cardsDelete.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'change parseCardsBtnType'(state, action){
    state.edit.parseImage.sumbitBtn = action.payload;
    return Object.assign({},state);
  },'fetch cardDropdwon' (state,action){
    const init = initialState.edit.dropdown;
    state.edit.dropdown.kinds =  init.kinds.concat(action.payload.kinds);
    state.edit.dropdown.types =  init.types.concat(action.payload.types);
    state.edit.dropdown.propertys =  init.propertys.concat(action.payload.propertys);
    state.edit.dropdown.races =  init.races.concat(action.payload.races);
    state.edit.dropdown.levels =  init.levels.concat(action.payload.levels);
    state.edit.dropdown.packs =  init.packs.concat(action.payload.packs);
    return Object.assign({},state);
  },'init cardEdit'(state){
    state.edit.detail_form = {cards:[],sumbitBtn:  ButtonStateEnum.None};
    state.edit.card_form = {sumbitBtn:  ButtonStateEnum.None};
    return Object.assign({},state);
  }
}, initialState);
