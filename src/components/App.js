import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Header from './header';
import Nav from './nav';
import * as actions from '../actions/loginActions';

const App = (props) => {
  return (
    <div>
      <Header actions={props.actions}/>
      <Nav/>
      <div className="container">
        {props.children}
      </div>
    </div>
  );
};

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
