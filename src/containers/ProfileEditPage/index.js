import React,{PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import * as searchActions from '../../actions/searchActions';
import './index.scss';

class ProfileEditPage extends React.Component {
  render(){
    return (
      <div className="profile-edit">

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}

ProfileEditPage.propTypes = {
  params: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditPage);
