import React from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class CardInfo extends React.Component {
  render() {
    return (
      <div className="card-info">
        <table>
          <tbody>
            <tr>
              <th>種類</th>
              <th>等級</th>
              <th>屬性</th>
              <th>種族</th>
              <th>攻擊力</th>
              <th>守備力</th>
              <th>密碼</th>
            </tr>
            <tr>
              <td>效果怪獸</td>
              <td>等級3</td>
              <td>闇</td>
              <td>惡魔族</td>
              <td>1000</td>
              <td>600</td>
              <td>10802915</td>
            </tr>

          </tbody>
        </table>
        <div className="effect">
          這張卡召喚成功時，可以從我方手牌或是牌組特殊召喚1隻等級3的惡魔族怪獸。
用這個效果特殊召喚的怪獸效果無效化，不能作為同步素材。　
        </div>
      </div>
    );
  }
}
export default CardInfo;
