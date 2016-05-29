import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import CardPack from '../cardPack'
import './index.scss';

class CardInfo extends React.Component {
  render() {
    const {kind, level, property, race, attack, defence, effect, serial_number, pack} = this.props.data;
    return (
      <div className="card-info">
        <table>
          <tbody>
            <tr>
              <td>{kind}<span>種類</span></td>
              <td>{level}<span>等級</span></td>
              <td>{property}<span>屬性</span></td>
              <td>{race}<span>種族</span></td>
              <td>{attack}<span>攻擊力</span></td>
              <td>{defence}<span>守備力</span></td>
              <td>{serial_number}<span>序號</span></td>
            </tr>

          </tbody>
        </table>
        <div className="effect" dangerouslySetInnerHTML={{__html: effect}}>
        </div>
        <CardPack data={pack}/>
      </div>
    );
  }
}
CardInfo.propTypes = {
  data: PropTypes.object.isRequired
};
export default CardInfo;
