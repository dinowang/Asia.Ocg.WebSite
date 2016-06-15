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
  constructor(){
    super();
    this.changeName = this.changeName.bind(this);
  }
  changeName(e){
    this.props.actions.changeDeckName(e.target.value);
  }
  render(){
    const {deck} = this.props;
    deck.deck_kind.splice(0,0,{key:-1,value:"請選擇"});
    deck.ban_list.splice(0,0,{key:-1,value:"請選擇"});

    return (
      <div className="deck-detailedit">
        <input className="name" value={deck.deckform.name} onChange={this.changeName}/>
        <div className="deck">
          <div className="func-bar">
            <LinkButton value="存擋" to="/deckdetail/1/test"/>
          </div>
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
              values={deck.deck_kind}/>
          </p>
          <p>禁卡表：<DropDown
            style={{top:'1px',width:"20%"}}
            default={-1}
            values={deck.ban_list}/></p>

          <p>怪獸：<span>19枚 / 9種類</span></p>
          <p>魔法：<span>19枚 / 9種類</span></p>
          <p>陷阱：<span>19枚 / 9種類</span></p>

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
      <div className="card-list">
        <p>直接拖曳以下 "卡片" 至以上 主牌組、額外牌組、備牌區域</p>
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
