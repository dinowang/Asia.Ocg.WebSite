import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageList from '../../components/pageList';
import * as actions from '../../actions/searchActions';
import SearchRText from '../../components/searchRText';
import SearchRImage from '../../components/searchRImage';
import './index.scss';

class SearchPage extends React.Component {
  handlePageList(page){
    const {actions,search} = this.props;
    actions.changePage(page);
    actions.requestSearch(search);
  };
  render(){
    const { search, actions } = this.props;
    return (
      <div className="search-page">
        <h1>搜尋：{search.query}</h1>
        <div className="board">
          <div className="sort">
            排列方式：
            <Icon name="picture-o"/>
            <Icon name="th-list"/>
          </div>
          <PageList current={search.current_page} total={search.total_page} showCount={5} onClick={(page)=>this.handlePageList(page)}/>
          <div className="clear"></div>
          <SearchRText data={search.items}/>
          <PageList current={search.current_page} total={search.total_page} showCount={5} onClick={(page)=>this.handlePageList(page)}/>
        </div>
        <div className="other">
          other
        </div>
      </div>
    );
  }
}

SearchPage.propsTypes ={
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
)(SearchPage);
