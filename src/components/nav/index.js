import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
      this.props.actions.requestSearch(this.props.search);
    },500);
  };
  render() {
    let t= [1,2,3];
    return (
      <div className="nav">
        <div className="user">
        <img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12717366_1140077189343966_8221115824378901544_n.jpg?oh=382682b03755dbaf37ae830c64c668bc&oe=57A0F709"/>
          <div className="info">
            <p>Ch Rick</p>
            <p>
              <Icon name="usd"/>10000
            </p>
          </div>
        </div>
        <SearchInput onChange={(value)=>this.searchOnChange(value)} placeholder="卡號、卡片名稱"  />
        <Single value="牌組區" icon="list" href="/deck"/>
        <Single value="禁卡表" icon="ban" href="/ban"/>
        <Single value="進階搜尋" icon="search-plus" href="/search"/>
        <Multi icon="ban" title="Test" values={t}/>
        <Single value="進階搜尋" icon="search-plus" href="/search" />
        <Single value="積分換商品" icon="search-plus" href="/search" />


      </div>
    );
  }
}



Nav.propsTypes ={
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
)(Nav);
