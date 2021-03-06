import React, {PropTypes} from 'react';
import {Icon} from '../icon';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../actions/searchActions';
import PermissionEnum from '../../enums/PermissionEnum';
import SearchInput from '../searchInput';
import Single from './single';
import Multi from './multi';

if (process.env.BROWSER) {
  require('./index.scss');
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Nav extends React.Component {

  searchOnChange(value){
    value = value.toUpperCase();
    this.props.actions.inputSearch(value);
    this.props.actions.changePage(1);

    clearTimeout(this.onChangeEvent);
    this.onChangeEvent = setTimeout(()=>{
      this.props.actions.requestSearch();
      this.handleInputFoucs();
    },500);
  }
  handleInputFoucs(){
    if(this.props.deck.edit_mode === false){
      if(this.props.search.query){
        this.props.nav.push(`/search/${this.props.search.current_page}/${this.props.search.query}`);
      }
    }

  }
  render() {
    const {user} = this.props;
    const userStyle = user.account? 'user':'hide';
    const manageList = [{
        title:'禁卡表',
        href:'/banManage/List'
    },{
        title:'影片管理',
        href:'/banManage/List'
    },{
        title:'新商品情報',
        href:'/banManage/List'
    },{
        title:'會員管理',
        href:'/banManage/List'
    },{
        title:'新增卡片',
        href:'/cardManage/Form/'
    },{
        title:'卡包',
        href:'/cardManage/Form/'
    }];
    const adminStyle = this.props.user.privilege === PermissionEnum.Admin ? {display:'block'}:{display:'none'};
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
       <Single title="首頁" icon="home" href="/"/>
       <Single title="牌組區" icon="list" href="/deck/日本牌組/1"/>
       <Single title="禁卡表" icon="ban" href="/ban"/>
       <Single title="卡表區" icon="building-o" href="/pack"/>

       <Multi style={adminStyle} title="管理功能" icon="search-plus" values={manageList}/>



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
    deck: state.deck,
    nav : browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
