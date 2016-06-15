import React,{PropTypes} from 'react';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';
import DropDown from '../../components/dropdown';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DeckDetailTypeEnum from '../../enums/DeckDetailTypeEnum';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';

class DeckEditPage extends React.Component {
  constructor(){
    super();
    this.changeName = this.changeName.bind(this);
    this.changeKind = this.changeKind.bind(this);
    this.changeBan = this.changeBan.bind(this);
    this.renderSearchReult = this.renderSearchReult.bind(this);
    this.listOnDragStart = this.listOnDragStart.bind(this);
    this.onDragEnterArea = this.onDragEnterArea.bind(this);
    this.onDragLevalClearArea = this.onDragLevalClearArea.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  changeName(e){
    this.props.actions.changeDeckName(e.target.value);
  }
  changeKind(e){
    this.props.actions.changeDeckKind(e.key);
  }
  changeBan(e){
    this.props.actions.changeDeckBan(e.key);
  }
  listOnDragStart(e){
    this.onDragLevalClearArea();
    this.props.actions.setDragItem(e.target.value);
    // console.log('listOnDragStart',e.target.value)
  }
  onDragLevalClearArea(){
    this.props.actions.clearArea();
  }
  onDragEnd(){
    this.props.actions.setToList();
  }
  onDragEnterArea(e){
    this.props.actions.setDragArea(e);
  }
  renderSearchReult(data){
    return(
      <img onDragEnd={this.onDragEnd} key={data.card_detail_id} value={data.card_detail_id} onDragStart={this.listOnDragStart} src={data.image_url}></img>
    );
  }
  renderDeckCard(){
    return(
      <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
    );
  }
  render(){
    const {deck} = this.props;
    return (
      <div className="deck-detailedit">
        <input className="name" value={deck.deckform.name} onChange={this.changeName}/>
        <div className="deck">
          <div className="func-bar">
            <LinkButton value="存擋" to="/deckdetail/1/test"/>
          </div>
          <div className="main" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Main)}>
            <div className="title blue">主牌組：{deck.deckform.main_list.length}</div>
            {deck.deckform.main_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Extra)}>
            <div className="title orange">額外牌組：{deck.deckform.extra_list.length}</div>
              {deck.deckform.extra_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Preparation)}>
            <div className="title red">備牌：{deck.deckform.preparation_list.length}</div>
              {deck.deckform.preparation_list.map(this.renderDeckCard)}
          </div>
        </div>
      <div className="deck-info">
        <div className="info">
          <h2>牌組資訊</h2>
          <p>分類
            <DropDown
              getValue={this.changeKind}
              style={{top:'1px',width:"70%"}}
              default={-1}
              values={deck.deck_kind}/>
          </p>
          <p>禁卡表：<DropDown
            getValue={this.changeBan}
            style={{top:'1px',width:"20%"}}
            default={-1}
            values={deck.ban_list}/></p>

          <p>怪獸：<span>19枚 / 9種類</span></p>
          <p>魔法：<span>19枚 / 9種類</span></p>
          <p>陷阱：<span>19枚 / 9種類</span></p>

          <p>最後更新日：<span>2016.06.01</span></p>
          <p>點閱率：<span>100</span></p>
          <p>留言數：<span>10</span></p>
        </div>
        <div className="info green">
          <h2>玩家資訊</h2>
          <p>暱稱：<span>Ch Rick</span></p>
          <p>牌組數：<span>20</span></p>

        </div>
      </div>
      <div className="card-list">
        <p>直接拖曳以下 "卡片" 至以上 主牌組、額外牌組、備牌區域</p>
        {deck.search_result.map(this.renderSearchReult)}
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

DeckEditPage.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckEditPage);
