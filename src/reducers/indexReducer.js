import { handleActions } from 'redux-actions';
const initialState ={
  card_pop: [],
  product_info: [{
    date: '2016.06.24',
    name: '	千年の記憶（アニメコンプリートガイド）',
    url:''
  },{
    date: '2016.06.24',
    name: '	千年の記憶（アニメコンプリートガイド）',
    url:'http://google.com.tw'
  },{
    date: '2016.06.24',
    name: '	千年の記憶（アニメコンプリートガイド）',
    url:'http://google.com.tw'
  },{
    date: '2016.06.24',
    name: '	千年の記憶（アニメコンプリートガイド）',
    url:'http://google.com.tw'
  },{
    date: '2016.06.24',
    name: '	千年の記憶（アニメコンプリートガイド）',
    url:'http://google.com.tw'
  }],
  deck_pop:[{
    views: 20,
    name: 'エスポワールゲーム 第4章 ～The Lottery～',
    guid:'guid'
  }]
};
export default handleActions({
  'fetch indexinfo' (state, action) {
  return Object.assign({},state,action.payload);
  }
}, initialState);
