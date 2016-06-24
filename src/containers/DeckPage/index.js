import React,{PropTypes} from 'react';
import DeckList from '../../components/deckList';
import LinkButton from '../../components/linkButton';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';

class DeckPage extends React.Component {
  constructor(){
    super();
    this.changeType = this.changeType.bind(this);
    this.renderNav = this.renderNav.bind(this);
  }

  changeType(e){
    this.props.actions.changeType(e.target.value);
  };
  componentWillMount(){
    this.props.actions.requestDeckList();
    let {deck_type} = this.props.params;
    if(deck_type){
      this.props.actions.changeType(deck_type);
    }
  }
  renderNav(data){
    const href = `/deck/${data.name}`;
    return(
      <Link onClick={this.changeType} key={data.id} to={href} activeClassName="active" value={data.name}>{data.name}</Link>
    );
  };
  render(){
    const listData =  this.props.deck.deck_type.filter(data=>data.name === this.props.deck.current_type)[0];
    return (
      <div className="deck-page">
        <div className="list">
          <ul className="deck-nav">
            {this.props.deck.deck_type.map(this.renderNav)}
            <li>
              <LinkButton style={{margin:"10px",height:"40px",lineHeight:"23px"}} value="新增牌組" to="/deckdetail/edit/"/>
            </li>
          </ul>
          <DeckList deck={listData}/>
        </div>
        <div className="other">
          other
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

DeckPage.propTypes ={
  actions:PropTypes.object.isRequired,
  deck:PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckPage);
