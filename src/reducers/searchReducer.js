import { handleActions } from 'redux-actions';

const initialState ={
    "total_page":20,
    "items":[
      {
        "name": "效果分隔士",
        "image_url": "http://www.toretoku.jp/images/items/l/104246jbt.jpg?20151210183254",
        "kind": "同步怪獸",
        "level": "等級7",
        "property": "光",
        "race": "獸族",
        "attack": 2500,
        "defence": 1700,
        "effect": "獸族協調+協調以外的怪獸1體以上 這張卡由於對方被破壞的場合，雙方玩家從牌組上將7張卡送入墓地。",
        "serial_number": "12345678"
      },
      {
        "name": "效果分隔士2",
        "image_url": "http://www.toretoku.jp/images/items/l/104246jbt.jpg?20151210183254",
        "kind": "同步怪獸",
        "level": "等級7",
        "property": "光",
        "race": "獸族",
        "attack": 2500,
        "defence": 1700,
        "effect": "獸族協調+協調以外的怪獸1體以上 這張卡由於對方被破壞的場合，雙方玩家從牌組上將7張卡送入墓地。",
        "serial_number": "12345678"
      }
    ]
};
export default handleActions({
  'fetch basic' (state, action) {
  return action.payload;
  }
}, initialState);
