import React from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SearchRText from '../../components/searchRText';
import PageList from '../../components/pageList';
import * as actions from '../../actions/searchActions';
import SearchRImage from '../../components/searchRImage';
import './index.scss';

class SearchPage extends React.Component {
  render(){
    const { search, actions } = this.props;
    return (
      <div className="search-page">
        <h1>搜尋：DREV-JP001</h1>
        <div className="board">
          <div className="sort">
            排列方式：
            <Icon name="picture-o"/>
            <Icon name="th-list"/>
          </div>
          <PageList current={1} total={search.total_page} showCount={5}></PageList>
          <div className="clear"></div>
          <SearchRImage data={search.items}></SearchRImage>
          <PageList current={1} total={search.total_page} showCount={5}></PageList>
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
)(SearchPage);
