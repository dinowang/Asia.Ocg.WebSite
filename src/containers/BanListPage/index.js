import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as banActions from '../../actions/banActions';
import * as appActions from '../../actions/appActions';

import {Icon} from 'react-fa';
import './index.scss';

class BanListPage extends React.Component {
  componentWillMount(){
    this.props.appActions.setTitle('禁卡表列表');
  }
  render(){
    return (
      <div className="banlist-page">
        banList
      </div>
    );
  }
}

BanListPage.propTypes ={
  banActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    card: state.card
  };
}

function mapDispatchToProps(dispatch) {
  return {
    banActions: bindActionCreators(banActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanListPage);
