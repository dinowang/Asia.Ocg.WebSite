import React,{PropTypes} from 'react';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';

class DeckDetail extends React.Component {
  render(){
    return (
      <div className="deck-detail">
        <h1>混沌帝龍入り銀河眼</h1>

        <div className="deck">
          <div className="func-bar">
            <LinkButton value="進入編輯模式" to="/deckdetail/edit/1"/>
          </div>
          <div className="main">
            <div className="title blue">主牌組：40</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>

          </div>
          <div className="main extra">
            <div className="title orange">額外牌組：15</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
          </div>
          <div className="main extra">
            <div className="title red">備牌：15</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
          </div>
        </div>
      <div className="deck-info">
        <div className="info">
          <h2>牌組資訊</h2>
          <p>分類：<span>大法師</span></p>
          <p>適用禁卡表：<span>2016.06</span></p>
          <p>怪獸：<span>19枚 / 9種類</span></p>
          <p>魔法：<span>19枚 / 9種類</span></p>
          <p>陷阱：<span>19枚 / 9種類</span></p>

          <p>最後更新日：<span>2016.06.01</span></p>
          <p>點閱率：<span>100</span></p>
          <p>留言數：<span>10</span></p>
        </div>
        <div className="info green">
          <h2>玩家資訊</h2>
        </div>
      </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    deck: state.deck
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

DeckDetail.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
