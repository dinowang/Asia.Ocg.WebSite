import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-fa';
import * as indexActions from '../../actions/indexActions';

import './index.scss';

class IndexPage extends React.Component {
  constructor(){
    super();
    this.renderCardPop = this.renderCardPop.bind(this);
  }
  componentWillMount(){
    console.log('test');
    this.props.indexActions.requestInfo();
  }
  renderCardPop(data, index){
    index ++;
    return(
      <li>
        <img src={data.image_url}></img>
        <p>{data.name}</p>
        <span>{index}</span>
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
  indexActions:PropTypes.object.isRequired
};

// <ul>
//   <li>
//     <img src="https://xpgcards.blob.core.windows.net/card-image/15AX/JP000/5fceacac-981b-4fb2-8ab1-8d071c7d7078200X282.jpg"></img>
//     <p>青眼究級龍</p>
//     <span>1</span>
//   </li>
// </ul>
function mapStateToProps(state) {
  return {
    index: state.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    indexActions: bindActionCreators(indexActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexPage);
