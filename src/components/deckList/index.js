import React,{PropTypes} from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import {PageList} from '../';

if (process.env.BROWSER) {
  require('./index.scss');
}

class DeckList extends React.Component{
  constructor(){
    super();
    this.renderData = this.renderData.bind(this);
  }
  renderData(data){
    const {id, name, main_count, extra_count, preparation_count, deck_kind, deck_ben} = data;
    const href = `/deck/${this.props.deck.name}/${id}/${name}`;
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
            hideText={true}
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
          <PageList
            url="/deck/"
            query={this.props.deck.name}
            current={this.props.deck.current_page}
            totalPage={this.props.deck.total_page}
            totalCount={this.props.deck.total_count}
            showCount={5}
            hideText={true}
            onClick={(page)=>this.handlePageList(page)}/>
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
