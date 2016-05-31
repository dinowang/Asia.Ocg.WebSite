import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/searchActions';
import SearchInput from '../searchInput';
import Single from './single';
import Multi from './multi';
import './index.scss';

class Nav extends React.Component {

  searchOnChange(value){
    value = value.toUpperCase();
    this.props.actions.inputSearch({
      query: value,
      current_page:
    1});

    clearTimeout(this.onChangeEvent);
    this.onChangeEvent = setTimeout(()=>{
      this.props.actions.requestSearch();
      this.handleInputFoucs();
    },500);
  }
  handleInputFoucs(){
    if(this.props.search.query){
      this.props.nav.push(`/search/${this.props.search.query}/${this.props.search.current_page}`);
    }
  }
  render() {
    let t= [1,2,3];
    const {user} = this.props;
    const userStyle = user.token? 'user':'hide';
    return (
      <div className="nav">
        <div className={userStyle}>
          <img src={user.image_url}/>
          <div className="info">
            <p>{user.nickname}</p>
            <p>
              <Icon name="usd"/>{user.score}
            </p>
          </div>
        </div>
        <SearchInput value={this.props.search.query} onFocus={()=>this.handleInputFoucs()} onChange={(value)=>this.searchOnChange(value)} placeholder="卡號、卡片名稱"  />
        <Single value="牌組區" icon="list" href="/deck"/>
        <Single value="禁卡表" icon="ban" href="/ban"/>
        <Single value="進階搜尋" icon="search-plus" href="/card"/>
        <Multi icon="ban" title="Test" values={t}/>
        <Single value="進階搜尋" icon="search-plus" href="/ban" />
        <Single value="積分換商品" icon="search-plus" href="/ban" />


      </div>
    );
  }
}



Nav.propTypes ={
  search:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  nav:PropTypes.object.isRequired,
  user:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    search: state.search,
    user: state.user,
    nav : browserHistory
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
)(Nav);
