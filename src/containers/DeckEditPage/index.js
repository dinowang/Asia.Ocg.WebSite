import React,{PropTypes} from 'react';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';
import DropDown from '../../components/dropdown';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';

class DeckEditPage extends React.Component {
  render(){
    return (
      <div className="deck-detailedit">
        <input className="name" value="混沌帝龍2入り銀河眼"/>
        <div className="deck">
          <div className="main">
            <div className="title blue">主牌組：40</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>

          </div>
          <div className="main extra">
            <div className="title orange">額外牌組：15</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
          </div>
          <div className="main extra">
            <div className="title red">備牌：15</div>
            <img src="https://xpgcards.blob.core.windows.net/image/null.jpg"></img>
          </div>
        </div>
      <div className="deck-info">
        <div className="info">
          <h2>牌組資訊</h2>
          <p>分類
            <DropDown
              style={{top:'1px',width:"70%"}}
              default={-1}
              values={[{
                key:-1,value:'請選擇'},{
                key:2,value:'禁止'},{
                key:3,value:'限制'},{
                key:4,value:'限制'},{
                key:5,value:'限制'},{
                key:6,value:'限制'},{
                key:7,value:'限制'},{
                key:8,value:'限制'},{
                key:9,value:'限制'},{
                key:10,value:'限制'},{
                key:11,value:'限制'},{
                key:12,value:'限制'},{
                key:13,value:'限制'},{
                key:14,value:'限制'},{
                key:15,value:'限制'},{
                key:16,value:'限制'},{
                key:17,value:'限制'},{

                key:18,value:'準限制'}]}/>
          </p>

          <p>怪獸：<span>19枚 / 9種類</span></p>
          <p>魔法：<span>19枚 / 9種類</span></p>
          <p>陷阱：<span>19枚 / 9種類</span></p>

          <p>適用禁卡表：<span>2016.06</span></p>
          <p>最後更新日：<span>2016.06.01</span></p>
          <p>點閱率：<span>100</span></p>
          <p>留言數：<span>10</span></p>
        </div>
        <div className="info green">
          <h2>玩家資訊</h2>
          <p>暱稱：<span>Ch Rick</span></p>
          <p>牌組數：<span>20</span></p>

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

DeckEditPage.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckEditPage);
