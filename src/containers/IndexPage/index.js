import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-fa';
import * as indexActions from '../../actions/indexActions';
import * as cardActions from '../../actions/cardActions';


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
    // console.log('mouseOver',e)
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
  render(){
    return (
      <div className="index-page">
        <div className="pop-card">
          <p className="title">熱門卡片</p>
          <ul>
            {this.props.index.card_pop.map(this.renderCardPop)}
          </ul>
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
