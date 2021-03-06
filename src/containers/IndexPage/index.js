import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as indexActions from '../../actions/indexActions';
import * as cardActions from '../../actions/cardActions';
import * as appActions from '../../actions/appActions';

import moment from 'moment';
import { asyncConnect } from 'redux-async-connect';

if (process.env.BROWSER) {
  require('./index.scss');
}

@asyncConnect([{
  promise: async ({store: {dispatch}}) => {
    await dispatch(indexActions.requestInfo());
    dispatch(appActions.setTitle(''));
    dispatch(appActions.setUrl(''));
    dispatch(appActions.setImage(''));
    dispatch(appActions.setDescription('最完整的遊戲王卡牌查詢網站（組牌、禁卡表、最新消息'));
  }
}])
class IndexPage extends React.Component {
  constructor(){
    super();
    this.renderCardPop = this.renderCardPop.bind(this);
    this.preAddCardData - this.preAddCardData.bind(this);
  }
  componentWillMount(){
    this.props.indexActions.requestInfo()
    this.props.appActions.setTitle('');
  }
  preAddCardData(e){
    this.props.cardActions.checkinList(e)
  }
  renderCardPop(data, index){
    index ++;
    const cardHref = `/card/${data.serial_number}/${data.name}`;
    const name = data.name.length >=6 ? data.name.substring(0,6)+'...':data.name;
    return(
      <li key={index}  onMouseOver={()=>{this.preAddCardData(data.serial_number)}}>
        <Link to={cardHref} >
          <img src={data.image_url}></img>
          <p>{name}</p>
          <span>{index}</span>
        </Link>
      </li>
    )
  }
  renderProductInfo(data, index){
    let {date, url, title} = data;
    date = moment(date).format("YYYY.MM.DD");
    return(
      <tr key={index}>
        <td>{date}</td>
        <td>
          {url? <a href={url}>{title}</a> : title}
        </td>
      </tr>
    )
  }
  renderDeckPop(data, index){
    const {id, name, views,type} = data;
    const href = `/deck/${type}/${id}/${name}`;
 
    return(
      <tr key={index}>
        <td>{views}</td>
        <td>
          <Link to={href}>
            {name}
          </Link>
        </td>
      </tr>
    )
  }
  render(){
    return (
      <div className="index-page" >
        <div className="pop-card">
          <p className="title">熱門卡片<span>(近三天)</span></p>
          <ul>
            {this.props.index.card_pop.map(this.renderCardPop)}
          </ul>
        </div>
        <iframe width="400" height="315" src={this.props.index.video} frameborder="0" allowfullscreen></iframe>
        <div className="news">
          <p className="title">新商品情報</p>
          <table>
            <tbody>
              {this.props.index.product_info.map(this.renderProductInfo)}
            </tbody>
          </table>
        </div>
        <div className="news">
          <p className="title">熱門牌組<span>(近七天)</span></p>
          <table>
            <tbody>
              {this.props.index.deck_pop.map(this.renderDeckPop)}
            </tbody>
          </table>
        </div>


      </div>
    );
  }
}
IndexPage.propTypes ={
  indexActions:PropTypes.object.isRequired,
  cardActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    index: state.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    indexActions: bindActionCreators(indexActions, dispatch),
    cardActions: bindActionCreators(cardActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
