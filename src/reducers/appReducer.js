import { handleActions } from 'redux-actions';
const initialState ={
  title: '',
  breadcrumbsMode:false,
  meta:[{
    name: "description",
    content: "最完整的遊戲王卡牌查詢網站（組牌、禁卡表、最新消息）"
  },{
    name: "og:title",
    content: ""
  },{
    name: "og:url",
    content: ""
  },{
    name: "og:image",
    content: ""
  },{
    name: "og:description",
    content: "最完整的遊戲王卡牌查詢網站（組牌、禁卡表、最新消息）"
  }]
};
export default handleActions({
  'set title' (state, action) {
    state.title = action.payload;
    state.meta.map((data)=>{
      if(data.name === 'og:title'){
        if(action.payload){
          data.content = action.payload;
        }else{
          data.content = 'AsiaCards(亞洲卡片王)';
        }
      }
      return data;
    })
    return Object.assign({},state);
  },'set webDescription'(state, action){
    state.meta.map((data)=>{
      if(data.name === 'description' || data.name ==='og:description'){
        data.content = action.payload;
      }
      return data;
    })

    return Object.assign({},state);
  },'set webUrl'(state, action){
    state.meta.map((data)=>{
      if(data.name === 'og:url'){
          data.content = `https://asia.xpg.cards${action.payload}`;
      }
      return data;
    })
    return Object.assign({},state);
  },'set webImage'(state, action){
    state.meta.map((data)=>{
      if(data.name === 'og:image'){
          data.content = action.payload;
      }
      return data;
    })
    return Object.assign({},state);
  },'set breadcrumbsMode'(state, action){
    state.breadcrumbsMode = action.payload;
    return Object.assign({},state);
  }

}, initialState);
