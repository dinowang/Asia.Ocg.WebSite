import React from 'react';
import DeckList from '../../components/deckList';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import * as actions from '../../actions/deckActions';
import './index.scss';


export const DeckPage = (props) => {
  const test = (e)=>{
    // console.log('test',e.target.value);
    props.actions.changeType(e.target.value);
  }
  const renderNav = (data)=>{
    const href = `/deck/${data.name}`;
    return(
      <Link onClick={test} key={data.id} to={href} activeClassName="active" value={data.id}>{data.name}</Link>
    )
  };
  return (
    <div className="deck-page">
      <div className="list">
        <ul className="deck-nav">
          {props.deck.deck_type.map(renderNav)}
        </ul>
        <DeckList deck={props.deck}/>
      </div>
      <div className="other">
        other
      </div>
    </div>
  );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckPage);
