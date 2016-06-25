import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

import './index.scss';

class CardDeck extends React.Component {
  componentWillMount(){
    this.props.cardActions.requestCardDeck();
  }
  renderData(data){
    const {id, guid, name, main_count, extra_count, preparation_count, deck_kind, deck_ben} = data;
    const href = `/deckdetail/${guid}/${name}`;
    const date = moment(deck_ben).format("YYYY.MM");
    return(
      <tr key={id}>
        <td className="text-left">
          <Link to={href}>
            {name}
          </Link>
        </td>
        <td >{main_count}</td>
        <td>{extra_count}</td>
        <td>{preparation_count}</td>
        <td>{deck_kind}</td>
        <td>{date}</td>
      </tr>
    )
  }
  render() {

    return (
      <div className="card-deck">
        <table>
          <tbody>
            <tr>
              <th>牌組名稱</th>
              <th colSpan="3">張數</th>
              <th>分類</th>
              <th>禁卡</th>
            </tr>
            {this.props.data.deck.items.map(this.renderData)}
          </tbody>
        </table>
      </div>
    );
  }
}
export default CardDeck;
