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
    this.onDragEnd = this.onDragEnd.bind(this);
    this.renderPreAdd = this.renderPreAdd.bind(this);
    this.renderDeckCard = this.renderDeckCard.bind(this);
    this.onMoveStart = this.onMoveStart.bind(this);
    this.onMoveEnter = this.onMoveEnter.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);

  }
  componentWillMount(){
    this.props.actions.setDeckMode(true);
  }
  componentWillUnmount(){
    this.props.actions.setDeckMode(false);
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
    const g = this.props.search.items.filter(data =>
      data.id === e.target.value
    )
    this.props.actions.setDragItem(g[0]);
    this.props.actions.changeDragMode(true);
  }
  onDragEnd(){
    this.props.actions.setToList();
    this.props.actions.clearArea();
    this.props.actions.clearOnDragItem();

  }
  onDragEnterArea(e){
    if(this.props.deck.add_mode === true){
      this.props.actions.setDragArea(e);

    }
  }
  renderSearchReult(data){
    const href = data.image_url? data.image_url :'https://xpgcards.blob.core.windows.net/image/null.jpg';
    return(
      <img
        key={data.id}
        draggable={true}
        value={data.id}
        onDragStart={this.listOnDragStart}
        onDragEnd={this.onDragEnd}
        src={href}/>
    );
  }
  onMoveStart(e){
    this.props.actions.clearArea();
    this.props.actions.changeDragMode(false)
    this.props.actions.setDragItem(e.target.value.data);
  }
  onMoveEnter(e){
    const card = e.target.value.data;
    if(card !== this.props.deck.on_drag_item && card.pre === false){
      this.props.actions.removeAllPreItem();
      this.props.actions.setOnMoveArray(e.target.value);
      this.props.actions.preMove(e.target.value);
    }
  }
  onMoveEnd(e){
    if(this.props.deck.on_move_array){
      this.props.actions.move();
      this.props.actions.removeAllPreItem();
      this.props.actions.removeDeckItem();
      this.props.actions.setOnMoveArray(null);
    }
  }
  renderDeckCard(data,index){

    const href = data.image_url? data.image_url :'https://xpgcards.blob.core.windows.net/image/null.jpg';
    const style = data.pre ? {opacity:.5} : {};
    return(
      <div key={data.sort} style={{display:'inline-block'}}>

      <img
        style={style}
        draggable={true}
        value={{data:data,index:index}}
        onDragStart={this.onMoveStart}
        onDragEnter={this.onMoveEnter}
        onDragEnd={this.onMoveEnd}
        src={href}/>
      </div>
    );
  }
  renderPreAdd(type){
    if(type === this.props.deck.on_drag_area && this.props.deck.add_mode){
      const href = this.props.deck.on_drag_item.image_url? this.props.deck.on_drag_item.image_url :'https://xpgcards.blob.core.windows.net/image/null.jpg';
      return (
        <img draggable={true}  className="card-preadd" src={href}/>
      )
    }else{
      return null;
    }
  }
  render(){
    const {deck, search} = this.props;
    return (
      <div className="deck-detailedit">
        <input className="name" value={deck.deckform.name} onChange={this.changeName}/>
        <div className="deck">
          <div className="func-bar">
            <LinkButton value="存擋" to="/deckdetail/1/test"/>
          </div>
          <div className="main" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Main)}>
            <div className="title blue">主牌組：{deck.deckform.main_list.length}</div>
            <div className="deck-empty">
              {deck.deckform.main_list.map(this.renderDeckCard)}
              {this.renderPreAdd(DeckDetailTypeEnum.Main)}
            </div>
          </div>
          <div className="main extra" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Extra)}>
            <div className="title orange">額外牌組：{deck.deckform.extra_list.length}</div>
            <div className="deck-empty">
              {deck.deckform.extra_list.map(this.renderDeckCard)}
              {this.renderPreAdd(DeckDetailTypeEnum.Extra)}

            </div>
          </div>
          <div className="main extra" onDragEnter={()=>this.onDragEnterArea(DeckDetailTypeEnum.Preparation)}>
            <div className="title red">備牌：{deck.deckform.preparation_list.length}</div>
            <div className="deck-empty">
              {deck.deckform.preparation_list.map(this.renderDeckCard)}
              {this.renderPreAdd(DeckDetailTypeEnum.Preparation)}

            </div>
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
        {search.items.map(this.renderSearchReult)}

      </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    deck: state.deck,
    search: state.search
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
