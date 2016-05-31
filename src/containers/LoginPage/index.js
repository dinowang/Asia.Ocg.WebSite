import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginState from '../../enums/loginState';
import LoginForm from '../../components/loginForm';
import ForgetForm from '../../components/forgetForm';
import RegisterFomr from '../../components/registerForm';

import * as actions from '../../actions/loginActions';
import './index.scss';

class LoginPage extends React.Component {
  componentWillMount(){
    this.props.actions.changeMode({mode:LoginState.Loging});
  }
  render(){
    const {actions, login} = this.props;
    return (
      <div className="login-page">
        <div className="box">

            {(() => {
          switch (login.mode) {
            case LoginState.Loging:   return <LoginForm actions={actions}/>;
            case LoginState.Forget:   return <ForgetForm actions={actions}/>;
            case LoginState.Register:   return <RegisterFomr actions={actions}/>;
          }
            })()}
        </div>
      </div>
    );
  }
}
LoginPage.propTypes ={
  login:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
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
)(LoginPage);
