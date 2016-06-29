import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import moment from 'moment';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Button from '../../components/button';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';
import CardHelper from '../../businessLogic/cardHelper';
import ButtonStateEnum from '../../enums/buttonStateEnum';
import UserComment from '../../components/userComment';
import BanTypeEnum from '../../enums/BanTypeEnum';
import * as deckActions from '../../actions/deckActions';
import * as appActions from '../../actions/appActions';
import './index.scss';

class DeckDetail extends React.Component {
  constructor(){
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.submitComment  = this.submitComment.bind(this);
  }
  componentWillMount(){
    const {id} = this.props.params;
    const {deckActions, appActions, user} = this.props;
    if(id){
      deckActions.setDeckDetailId(id)
      if(user.account){
        deckActions.requestDeckDetail();
      }else{
        appActions.requestGetInfo([],[deckActions.requestDeckDetail]);
      }
    }
  }
  componentWillUnmount(){
    const {deckActions} = this.props;
    deckActions.initDetail();
    deckActions.changeBtnType(ButtonStateEnum.None);
  }
  renderDeckCard(data,index){
    const href = `/card/${data.serial_number}/${data.name}`
    let banStyle = '';
    if(data.ban_type === BanTypeEnum.Ban){
      banStyle = 'ban-type ban';
    }else if(data.ban_type === BanTypeEnum.Limit){
      banStyle = 'ban-type limit';
    }else if(data.ban_type === BanTypeEnum.PreLimit){
      banStyle = 'ban-type prelimit';
    }
    return(
      <div className="card" key={data.sort}>
        <Link  to={href}>
          <div className={banStyle}></div>
          <img
          draggable={false}
          value={{data:data,index:index}}
          src={data.image_url}></img>
        </Link>

      </div>
    );
  }
  handleScroll(e){
    const marginBottom = 100;
    const {scrollTop, scrollHeight, clientHeight} = e.target;
    const {loading, detail} = this.props.deck;
    if((scrollTop + clientHeight + marginBottom )>= scrollHeight && loading === false){
      if(detail.comments.current_page < detail.comments.total_page){
        this.props.deckActions.setDeckPage(detail.comments.current_page+1);
        this.props.deckActions.setDeckCommentLoading(true);
        this.props.deckActions.requestDeckComment();
      }
    }
  }
  submitComment(){
    const {deckActions} = this.props;

    deckActions.changeBtnType(ButtonStateEnum.Loading);
    deckActions.requestCreateDeckComment();
  }
  renderSubmitButton(){
    if(this.props.user.account){
      return(
        <Button onClick={this.submitComment}
          style={{float:'right',margin:'5px 0'}}
          state={this.props.deck}
          rIcon="floppy-o"
          value="新增留言"
          fail="fail"
          success="success"/>
      )
    }else{
      return(
        <LinkButton style={{float:'right'}} value="新增留言" to='/login'/>
      )
    }
  }
  onChangeComment(e){
    const {deckActions} = this.props;
    deckActions.setDeckComment(e.target.value);
    deckActions.changeBtnType(ButtonStateEnum.None);
  }
  render(){
    const {id, name, kind, ban, main_list, extra_list, preparation_list, owner,views, last_editdate,description,comments} = this.props.deck.detail;

    const monster = CardHelper.Monster(main_list);
    const magic = CardHelper.filter(main_list,'魔');
    const trap = CardHelper.filter(main_list,'罠');
    const editHref = `/deckdetail/edit/${id}`
    const ownerStyle =  owner.current_user? {}:{display:'none'};
    const loadingStyle = this.props.deck.loading ? {}:{display:'none'};
    let lastDate = '';
    if(last_editdate){
      lastDate = moment(last_editdate).format("YYYY.MM.DD");
    }
    return (
      <div className="deck-detail" onScroll={this.handleScroll}>
        <h1>{name}</h1>
        <div className="deck">
          <div className="func-bar">
            <LinkButton style={ownerStyle} value="進入編輯模式" to={editHref}/>
          </div>
          <div className="main">
            <div className="title blue">主牌組：{main_list.length}</div>
              <div style={loadingStyle} className="spinner" ><img src="https://xpgcards.blob.core.windows.net/image/null.jpg"/></div>

              {main_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra">
            <div className="title orange">額外牌組：{extra_list.length}</div>
              <div style={loadingStyle} className="spinner" ><img src="https://xpgcards.blob.core.windows.net/image/null.jpg"/></div>
              {extra_list.map(this.renderDeckCard)}
          </div>
          <div className="main extra">
            <div className="title red">備牌：{preparation_list.length}</div>
              <div style={loadingStyle} className="spinner" ><img src="https://xpgcards.blob.core.windows.net/image/null.jpg"/></div>
              {preparation_list.map(this.renderDeckCard)}
          </div>
          <div className="main half left">
            <div className="title green">描述</div>
            {description}
          </div>
          <div className="main half right">
            <div className="title green">玩家留言:<span>{this.props.deck.detail.comments.total_count}</span></div>
            <textarea value={this.props.deck.comment} onChange={this.onChangeComment} placeholder="留言內容" />
            {this.renderSubmitButton()}
            <div className="clear"></div>
            <UserComment list={comments.items} loading={this.props.deck.detail.comments.loading} />
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

          <p>最後更新日：<span>{lastDate}</span></p>
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
    deck: state.deck,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deckActions: bindActionCreators(deckActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

DeckDetail.propTypes ={
  deckActions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
