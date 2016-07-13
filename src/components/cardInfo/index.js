import React, {PropTypes} from 'react';
import {CardPack} from '../';

if (process.env.BROWSER) {
  require('./index.scss');
}

class CardInfo extends React.Component {
  render() {
    const {kind, level, property, race, attack, defence, effect, serial_number, pack} = this.props.data;
    return (
      <div className="card-info">
        <table>
          <tbody>
            <tr>
              <td>{kind}<span>種類</span></td>
              <td className={level? '':'none'}>{level}<span>等級</span></td>
              <td className={property? '':'none'}>{property}<span>屬性</span></td>
              <td className={race? '':'none'}>{race}<span>種族</span></td>
              <td className={attack? '':'none'}>{attack}<span>攻擊力</span></td>
              <td className={defence? '':'none'}>{defence}<span>守備力</span></td>
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
