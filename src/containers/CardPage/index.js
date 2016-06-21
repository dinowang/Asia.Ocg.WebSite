import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cardActions from '../../actions/cardActions';
import * as appActions from '../../actions/appActions';
import CardInfo from '../../components/cardInfo';
import CardDeck from '../../components/cardDeck';
import CardComment from '../../components/cardComment';
import {Icon} from 'react-fa';
import './index.scss';

class CardPage extends React.Component {
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
  render(){
    const { card, cardActions } = this.props;
    return (
      <div className="card">
        <h1>{card.name}</h1>
        <div className="content">
          <div className="info">
            <img src={card.image_url}></img>
              <ul>
                <li>價格情報</li>
                <li>
                  卡司魔
                  <Icon name="check-circle"/>
                  <span className="price">$30</span>
                </li>
                <li>
                  卡司魔
                  <span className="price">$30</span>
                </li>
                <li>
                  露天

                </li>

              </ul>

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
                  case 1:   return <CardDeck/>;
                  case 2:   return <CardComment data={card} actions={cardActions}/>;
                }
                  })()}
              </div>
            </ul>

          </div>
          <div className="other">
            test
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
    card: state.card
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cardActions: bindActionCreators(cardActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPage);
