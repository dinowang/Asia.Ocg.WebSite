import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LinkButton from '../../components/linkButton';
import * as cardActions from '../../actions/cardActions';
import * as appActions from '../../actions/appActions';
import CardInfo from '../../components/cardInfo';
import CardDeck from '../../components/cardDeck';
import CardComment from '../../components/cardComment';
import PermissionEnum from '../../enums/PermissionEnum';
import {Icon} from 'react-fa';
import './index.scss';

class CardPage extends React.Component {
  constructor(){
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount(){
    let {serialNumber} = this.props.params;
    let {cardActions} = this.props;
    cardActions.checkinList(serialNumber);

  }
  changeTab(tab){
    this.props.cardActions.changeTab(tab);
  }
  componentWillUpdate(netState){
    this.props.appActions.setTitle(netState.card.name);
  }
  handleScroll(e){
    const marginBottom = 100;
    const {scrollTop, scrollHeight, clientHeight} = e.target;
    const {loading, display_tab,deck ,comments} = this.props.card;
    if((scrollTop + clientHeight + marginBottom )>= scrollHeight && loading === false){

      if(display_tab === 1 && deck.current_page < deck.total_page){
        this.props.cardActions.setDeckPage(deck.current_page+1);
        this.props.cardActions.setLoading(true);
        this.props.cardActions.requestCardDeck();
      }else if(display_tab === 2 && comments.current_page < comments.total_page){
        this.props.cardActions.setCommentPage(comments.current_page+1);
        this.props.cardActions.setLoading(true);
        this.props.cardActions.requestCardComment();
      }
    }
  }
  render(){
    const { card, cardActions, user } = this.props;
    const editCardHref = `/cardManage/Form/${card.id}`;
    const adminStyle = this.props.user.privilege === PermissionEnum.Admin ? {display:'block'}:{display:'none'};

    return (
      <div className="card" onScroll={this.handleScroll}>
        <h1>{card.name}</h1>
        <div className="content">
          <div className="info">
            <img src={card.image_url}></img>
              <ul>
                <li>價格情報</li>
                <li>
                  準備中
                  <Icon name="check-circle"/>
                  <span className="price">$--</span>
                </li>
              </ul>
              <LinkButton style={adminStyle} value="修改卡片" to={editCardHref} lIcon="pencil-square"/>


          </div>

          <div className="detail">
            <ul className="tab">
              <li>
                <Icon name="list-alt" size="2x"/>
              </li>
              <li className={card.display_tab === 2 ?'active':''} onClick={()=>{this.changeTab(2);}}>留言</li>
              <li className={card.display_tab === 1 ?'active':''} onClick={()=>{this.changeTab(1);}}>牌組</li>
              <li className={card.display_tab === 0 ?'active':''} onClick={()=>{this.changeTab(0);}}>卡片效果</li>
              <div className="clear"></div>
              <div className="box">
                  {(() => {
                switch (card.display_tab) {
                  case 0:   return <CardInfo data={card}/>;
                  case 1:   return <CardDeck data={card} cardActions={cardActions}/>;
                  case 2:   return <CardComment data={card} user={user} actions={cardActions}/>;
                }
                  })()}
              </div>
            </ul>

          </div>
          <div className="other">

          </div>

        </div>
      </div>
    );
  }
}

CardPage.propTypes ={
  card:PropTypes.object.isRequired,
  params:PropTypes.object.isRequired,
  cardActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    card: state.card,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(cardActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPage);
