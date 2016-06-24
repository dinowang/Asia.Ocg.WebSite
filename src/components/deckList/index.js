import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import PageList from '../pageList';
import moment from 'moment';

import './index.scss';
class DeckList extends React.Component{
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
    );
  }
  handlePageList(page){
    this.props.actions.requestDeckTypePage(page);
  }
  render(){
    let list = [];
    if(this.props.deck){
      list = this.props.deck.list;
      return(
        <div className="deck-list">
          <PageList
            url="/deck/"
            query={this.props.deck.name}
            current={this.props.deck.current_page}
            totalPage={this.props.deck.total_page}
            totalCount={this.props.deck.total_count}
            showCount={5}
            onClick={(page)=>this.handlePageList(page)}/>
          <table>
            <tbody>
              <tr>
                <th>牌組名稱</th>
                <th colSpan="3">張數</th>
                <th>分類</th>
                <th>禁卡</th>
              </tr>
              {list.map(this.renderData)}
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div></div>
    )
  }
}
DeckList.propTypes = {
  deck:PropTypes.object
};

export default DeckList;
