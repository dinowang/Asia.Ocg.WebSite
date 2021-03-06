import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { browserHistory } from 'react-router';
import {
  Icon,
  Button,
  DropDown
} from '../../components';
import CardHelper from '../../businessLogic/cardHelper';
import {bindActionCreators} from 'redux';
import {DeckDetailTypeEnum,DeckModeEnum} from '../../enums/DeckEnum';
import PermissionEnum from '../../enums/PermissionEnum';
import ButtonStateEnum from '../../enums/buttonStateEnum'
import * as actions from '../../actions/deckActions';
import * as appActions from '../../actions/appActions';

if (process.env.BROWSER) {
  require('./index.scss');
}

@connect(mapStateToProps, mapDispatchToProps)
export default class DeckEditPage extends React.Component {
  constructor(){
    super();
    this.changeName = this.changeName.bind(this);
    this.changeKind = this.changeKind.bind(this);
    this.changeBan = this.changeBan.bind(this);
    this.changeType = this.changeType.bind(this);
    this.renderSearchReult = this.renderSearchReult.bind(this);
    this.listOnDragStart = this.listOnDragStart.bind(this);
    this.onDragEnterArea = this.onDragEnterArea.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.renderPreAdd = this.renderPreAdd.bind(this);
    this.renderDeckCard = this.renderDeckCard.bind(this);
    this.onMoveStart = this.onMoveStart.bind(this);
    this.onMoveEnter = this.onMoveEnter.bind(this);
    this.onMoveEnd = this.onMoveEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.trash = this.trash.bind(this);
    this.triggerCollapse = this.triggerCollapse.bind(this);
    this.changeKintdDislay = this.changeKintdDislay.bind(this);
    this.changeKindName = this.changeKindName.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
  }
  componentWillMount(){
    this.props.actions.setEditMode(true);
    let {id} = this.props.params;
    if(id){
      this.props.actions.setDeckMode(DeckModeEnum.Edit);
      this.props.actions.setDeckFormId(id);

      this.props.appActions.requestGetInfo(
        [this.props.actions.requestDeckInfo,this.props.actions.requestDeckEditDetail]
      );
    }else{
      this.props.appActions.requestGetInfo(
        [this.props.actions.requestDeckInfo]
      );
    }
  }
  componentWillUnmount(){
    this.props.actions.setEditMode(false);
    this.props.actions.initDeckForm();
  }
  changeName(e){
    this.props.actions.changeDeckName(e.target.value);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
  }
  changeKind(e){
    if(e){
      this.props.actions.changeDeckKind(e.key);
      this.props.actions.changeBtnType(ButtonStateEnum.None);
    }
  }
  changeBan(e){
    this.props.actions.changeDeckBan(e.key);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
  }
  changeType(e){
    this.props.actions.changeDeckType(e.key);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
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
    this.props.actions.changeBtnType(ButtonStateEnum.None);
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
  onMoveEnd(){
    if(this.props.deck.on_move_array){
      this.props.actions.move();
      this.props.actions.removeAllPreItem();
      this.props.actions.removeDeckItem();
      this.props.actions.setOnMoveArray(null);
      this.props.actions.changeBtnType(ButtonStateEnum.None);
    }
  }
  trash(e){
    this.props.actions.setDragItem(e.target.value.data);
    this.props.actions.removeDeckItem();

  }
  renderDeckCard(data,index){

    const href = data.image_url? data.image_url :'https://xpgcards.blob.core.windows.net/image/null.jpg';
    const style = data.pre ? {opacity:.5} : {};
    return(
      <div key={data.sort} style={{display:'inline-block'}} >

      <img
        style={style}
        draggable={true}
        value={{data:data,index:index}}
        onDragStart={this.onMoveStart}
        onDragEnter={this.onMoveEnter}
        onDragEnd={this.onMoveEnd}
        onDoubleClick={this.trash}
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
  onClick(){
    this.props.actions.changeBtnType(ButtonStateEnum.Loading);
    if(this.props.deck.deckform.id){
      this.props.actions.requestUpdateDeck(this.props.nav);
    }else{
      this.props.actions.requestCreateDeck(this.props.nav);
    }
  }
  triggerCollapse(e){

    this.props.actions.setCollapse(e.target.value);
  }
  changeKintdDislay(){
    this.props.actions.changeKindMode();
    this.props.actions.changeKindName('');
  }
  changeKindName(e){
    this.props.actions.changeKindName(e.target.value);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
  }
  changeDescription(e){
    this.props.actions.changeDescription(e.target.value);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
  }
  render(){
    const {deck, search} = this.props;
    const adminStyle = this.props.user.privilege === PermissionEnum.Admin ? {display:'inline'}:{display:'none'};
    const monster = CardHelper.Monster(this.props.deck.deckform.main_list);
    const magic = CardHelper.filter(this.props.deck.deckform.main_list,'魔');
    const trap = CardHelper.filter(this.props.deck.deckform.main_list,'罠');
    let lastDate = '';
    if(deck.deckform.last_editdate){
      lastDate = moment(deck.deckform.last_editdate).format("YYYY.MM.DD HH:mm");
    }

    let kind_default = -1;
    let ban_default = -1;
    let type_default = -1;
    if(this.props.deck.deckform.kind_id !== 0){
      kind_default = this.props.deck.deckform.kind_id;
    }
    if(this.props.deck.deckform.ban_id !== 0){
      ban_default = this.props.deck.deckform.ban_id;
    }
    if(this.props.deck.deckform.type_id !== 0){
      type_default = this.props.deck.deckform.type_id;
    }
    return (
      <div className="deck-detailedit" style={{paddingBottom:'200px',paddingTop:'5px'}}>
        <input className="name" value={deck.deckform.name} onChange={this.changeName} placeholder="牌組名稱"/>
        <div className="deck">
          <div className="func-bar">
            <Button onClick={this.onClick} style={{float:'right',top:'5px'}} state={this.props.deck} rIcon="floppy-o" value={this.props.deck.mode} fail="fail" success="success"/>


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
          <div className="main description">
            <div className="title green">描述：</div>
            <textarea onChange={this.changeDescription} value={deck.deckform.description? deck.deckform.description :''} placeholder="限制1000字以內(非必填)"/>
          </div>

        </div>
      <div className="deck-info">
        <div className="info green">
          <h2>如何使用</h2>
          <div className={deck.collapse.use ? 'col close':'col open'}>
            <Icon value="use" onClick={this.triggerCollapse} name={deck.collapse.use? 'plus-square-o' : 'minus-square-o'} size="2x"/>
            <p>加入卡片：<span>左上側 "搜尋框" 輸入</span></p>
            <p>刪除卡片：<span>雙擊卡片</span></p>
            <p>移動卡片：<span>拖曳卡片</span></p>
          </div>
        </div>
        <div className="info">
          <h2>牌組資訊</h2>
            <div className={deck.collapse.info ? 'col close':'col open'}>
              <Icon value="info" onClick={this.triggerCollapse} name={deck.collapse.info? 'plus-square-o' : 'minus-square-o'} size="2x"/>
              <span>禁卡表：</span>
              <DropDown
                getValue={this.changeBan}
                style={{top:'1px',width:"20%",marginTop:'10px'}}
                default={ban_default}
                values={deck.ban}/>
              <br/>

              <span style={adminStyle}>分類：</span>
              <DropDown
                getValue={this.changeType}
                style={{top:'1px',width:"70%",marginTop:'10px'}}
                default={type_default}
                values={deck.type}/>
              <br/>


              <span className="kind-p">種類：</span>
              <DropDown
                getValue={this.changeKind}
                style={deck.kindMode?{top:'1px',width:"73%",marginTop:'10px'} :{display:'none'}}
                default={kind_default}
                values={deck.kind}/>
              <input onChange={this.changeKindName} style={deck.kindMode ? {display:'none'}: {}} className="kind" value={deck.deckform.kind_name}/>
              <span className="other" onClick={this.changeKintdDislay}>其他種類</span>
              <br/>


              <p>怪獸：<span>{monster.mCount} 枚 / {monster.tCount}種類</span></p>
              <p>魔法：<span>{magic.mCount} 枚 / {magic.tCount}種類</span></p>
              <p>陷阱：<span>{trap.mCount} 枚 / {trap.tCount}種類</span></p>

              <p>最後更新日：<span>{lastDate}</span></p>
              </div>
          </div>
      </div>
      <div className="card-list">
        <p>直接拖曳以下 "卡片" 至以上 主牌組、額外牌組、備牌區域</p>
        {search.items.map(this.renderSearchReult)}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deck: state.deck,
    search: state.search,
    user: state.user,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

DeckEditPage.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};
