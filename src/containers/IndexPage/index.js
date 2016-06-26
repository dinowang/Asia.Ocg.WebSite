import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-fa';
import * as indexActions from '../../actions/indexActions';
import * as cardActions from '../../actions/cardActions';
import moment from 'moment';

import './index.scss';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.renderCardPop = this.renderCardPop.bind(this);
    this.preAddCardData - this.preAddCardData.bind(this);
  }
  componentWillMount(){
    this.props.indexActions.requestInfo();
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
    const {guid, name, views} = data;
    const href = `/deckdetail/${guid}/${name}`;

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
      <div className="index-page">
        <div className="pop-card">
          <p className="title">熱門卡片<span>(近三天)</span></p>
          <ul>
            {this.props.index.card_pop.map(this.renderCardPop)}
          </ul>
        </div>
        <iframe width="400" height="315" src="https://www.youtube.com/embed/5rEt5xQji5w" frameborder="0" allowfullscreen></iframe>
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
    cardActions: bindActionCreators(cardActions, dispatch)

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);



// <div className="pop">
//   <p className="title">本日人氣</p>
//   <img src="https://xpgcards.blob.core.windows.net/card-image/15AX/JPM07/aeb575ba-d5af-45a8-a7ac-54f7af1eafdd200X282.jpg"/>
// </div>
