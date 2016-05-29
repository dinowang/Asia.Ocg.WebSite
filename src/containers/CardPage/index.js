import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/searchActions';
import CardInfo from '../../components/cardInfo';
import {Icon} from 'react-fa';
import './index.scss';

class CardPage extends React.Component {
  render(){
    const { search, actions } = this.props;
    return (
      <div className="card">
        <h1>一角獸的使魔</h1>
        <div className="content">
          <div className="info">
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
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
            <ul>
              <li>
                <Icon name="list-alt" size="2x"/>
              </li>
              <li>留言</li>
              <li>牌組</li>
              <li>卡包分類</li>
              <li className="active">卡片效果</li>
            </ul>
            <div className="clear"></div>
            <div className="box">
              <CardInfo/>

            </div>
          </div>
          <div className="other">
            test
          </div>
        </div>
      </div>
    );
  }
}

CardPage.propsTypes ={
  search:PropTypes.object
};

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardPage);
