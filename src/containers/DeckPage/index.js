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
    let {deck_type, page} = this.props.params;
    if(deck_type){
      this.props.actions.changeType(deck_type);
      this.props.actions.requestDeckTypePage(parseInt(page));
    }
  }
  renderNav(data){
    const href = `/deck/${data.name}/${data.current_page}`;
    const style = this.props.deck.current_type === data.name ? 'active' :'';
    return(
      <Link className={style} onClick={this.changeType} key={data.id} to={href} value={data.name}>{data.name}</Link>
    );
  };
  render(){
    const listData =  this.props.deck.deck_type.filter(data=>data.name === this.props.deck.current_type)[0];
    const createDeckHref = this.props.user.account ? '/deckdetail/edit/' :'/login';
    return (
      <div className="deck-page">
        <div className="list">
          <ul className="deck-nav">
            {this.props.deck.deck_type.map(this.renderNav)}
            <li>
              <LinkButton style={{margin:"10px",height:"40px",lineHeight:"23px"}} value="新增牌組" to={createDeckHref}/>
            </li>
          </ul>
          <DeckList deck={listData} actions={this.props.actions}/>
        </div>
        <div className="other">
          <p className="title">
            我的牌組
          </p>

        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    deck: state.deck,
    user: state.user
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
