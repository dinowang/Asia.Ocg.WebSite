import React from 'react';
import {Icon} from 'react-fa';
import CardPack from '../cardPack'
import './index.scss';

class CardInfo extends React.Component {
  render() {
    return (
      <div className="card-info">
        <table>
          <tbody>
            <tr>
              <td>效果怪獸<span>種類</span></td>
              <td>等級3<span>等級</span></td>
              <td>闇<span>屬性</span></td>
              <td>惡魔族<span>種族</span></td>
              <td>1000<span>攻擊力</span></td>
              <td>600<span>守備力</span></td>
              <td>10802915<span>序號</span></td>
            </tr>

          </tbody>
        </table>
        <div className="effect">
          這張卡召喚成功時，可以從我方手牌或是牌組特殊召喚1隻等級3的惡魔族怪獸。
用這個效果特殊召喚的怪獸效果無效化，不能作為同步素材。　
        </div>
        <CardPack/>
      </div>
    );
  }
}
export default CardInfo;
