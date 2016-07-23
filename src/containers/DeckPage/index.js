import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {DeckList, LinkButton} from '../../components';
import { asyncConnect } from 'redux-async-connect';
import * as actions from '../../actions/deckActions';
import * as appActions from '../../actions/appActions';


if (process.env.BROWSER) {
  require('./index.scss');
}

@asyncConnect([{
  promise: async ({params,store: {dispatch},location}) => {
    await dispatch(actions.requestDeckList());

    const {deck_type, page} = params;
    if(deck_type){
      await dispatch(actions.changeType(deck_type));
      await dispatch(actions.requestDeckTypePage(parseInt(page)));
      dispatch(appActions.setTitle(`${deck_type}-牌組區`));
    }
    dispatch(appActions.setDescription(`牌組分享區`));
    dispatch(appActions.setImage(''));
    dispatch(appActions.setUrl(location.pathname));
  }
}])
class DeckPage extends React.Component {
  constructor(){
    super();
    this.changeType = this.changeType.bind(this);
    this.renderNav = this.renderNav.bind(this);
  }

  changeType(value){

    this.props.actions.changeType(value);
    this.props.actions.requestDeckTypePage(parseInt(1));
    setTimeout(()=>{
      this.props.appActions.setTitle(`${value}-牌組區`);
    })
  }
  componentWillMount(){
    this.props.actions.requestDeckList();
    let {deck_type, page} = this.props.params;
    if(deck_type){
      this.props.actions.changeType(deck_type);
      this.props.actions.requestDeckTypePage(parseInt(page));
      this.props.appActions.setTitle(`${deck_type}-牌組區`);

    }
  }
  renderNav(data){
    const href = `/deck/${data.name}/${data.current_page}`;
    const style = this.props.deck.current_type === data.name ? 'active' :'';
    return(
      <Link className={style} onClick={()=>this.changeType(data.name)} key={data.id} to={href}>{data.name}</Link>
    );
  }
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
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deck: state.deck,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    appActions :bindActionCreators(appActions, dispatch)
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
