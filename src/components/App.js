import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Nav from './nav';
import * as actions from '../actions/appActions';
import CookieHelper from '../businessLogic/cookieHelper';

class App extends React.Component{
  componentWillMount(){
    this.props.actions.requestGetInfo(CookieHelper.Get('session'));
  }
  render(){
    const {props} = this;
    return(
      <div>
        <Header/>
        <Nav/>
        <div className="container">
          {props.children}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element,
  actions: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    login: state.login,
    actions:PropTypes.object.isRequired
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
)(App);
