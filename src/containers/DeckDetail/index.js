import React,{PropTypes} from 'react';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';
import CardHelper from '../../businessLogic/cardHelper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';

class DeckDetail extends React.Component {
  componentWillMount(){
    let {guid} = this.props.params;
    if(guid){
      this.props.actions.requestDeckDetail(guid);
    }
  }
  renderDeckCard(data,index){
    return(
      <div key={data.sort} style={{display:'inline-block'}}>
      <img
        draggable={false}
        value={{data:data,index:index}}
        src={data.image_url}/>
      </div>
    );
  }
  render(){
    const {id, name, kind, ban, main_list, extra_list, preparation_list, owner,views} = this.props.deck.detail;

    const monster = CardHelper.Monster(main_list);
    const magic = CardHelper.filter(main_list,'魔');
    const trap = CardHelper.filter(main_list,'罠');
    const editHref = `/deckdetail/edit/${id}`
    return (
      <div className="deck-detail">
        <h1>{name}</h1>


        <div className="deck">
          <div className="func-bar">
            <LinkButton value="進入編輯模式" to={editHref}/>
          </div>
          <div className="main">
            <div className="title blue">主牌組：{main_list.length}</div>
              {main_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra">
            <div className="title orange">額外牌組：{extra_list.length}</div>
              {extra_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra">
            <div className="title red">備牌：{preparation_list.length}</div>
              {preparation_list.map(this.renderDeckCard)}

          </div>
        </div>
      <div className="deck-info">
        <div className="info">
          <h2>牌組資訊</h2>
          <p>分類：<span>{kind}</span></p>
          <p>適用禁卡表：<span>{ban.name}</span></p>
          <p>怪獸：<span>{monster.mCount} 枚 / {monster.tCount}種類</span></p>
          <p>魔法：<span>{magic.mCount} 枚 / {magic.tCount}種類</span></p>
          <p>陷阱：<span>{trap.mCount} 枚 / {trap.tCount}種類</span></p>

          <p>最後更新日：<span>2016.06.01</span></p>
          <p>點閱率：<span>{views}</span></p>
          
        </div>
        <div className="info green">
          <h2>玩家資訊</h2>
          <p>暱稱：<span>{owner.name}</span></p>
        </div>
      </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    deck: state.deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

DeckDetail.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
