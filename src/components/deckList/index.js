import React,{PropTypes} from 'react';
import './index.scss';
class DeckList extends React.Component{
  renderData(data){
    const {id, name, main_count, extra_count, preparation_count, deck_kind, deck_ben} = data;
    return(
      <tr key={id}>
        <td>{name}</td>
        <td>{main_count}</td>
        <td>{extra_count}</td>
        <td>{preparation_count}</td>
        <td>{deck_kind}</td>
        <td>{deck_ben}</td>
      </tr>
    );
  }
  render(){
    // console.log(this.props,'deck')
    const {deck_list} = this.props.deck;
    return(
      <div className="deck-list">
        <table>
          <tbody>
            <tr>
              <th>牌組名稱</th>
              <th colSpan="3">張數</th>
              <th>分類</th>
              <th>禁卡</th>
            </tr>
            {deck_list.map(this.renderData)}
          </tbody>
        </table>
      </div>
    );
  }
}
DeckList.propTypes = {
  deck:PropTypes.object.isRequired
};

export default DeckList;
