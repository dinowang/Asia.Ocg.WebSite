import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from 'react-fa';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';
import LoginForm from '../../components/loginForm';
import ForgetForm from '../../components/forgetForm';
import RegisterFomr from '../../components/registerForm';
import ResetPwdForm from '../../components/resetpwdForm';

import * as actions from '../../actions/loginActions';
import './index.scss';

class LoginPage extends React.Component {
  componentWillMount(){
    let {code} = this.props.params;
    if(code){
      this.props.actions.changeMode({mode:LoginStateEnum.RegisterSetPassword});
    }else{
      this.props.actions.changeMode({mode:LoginStateEnum.Loging});
    }
  }
  render(){
    const {actions, login} = this.props;
    const {title, text, color, icon, spin} = this.props.login.processForm;
    let boxStyle = this.props.login.process === LoginProcessEnum.None ? 'box': 'box process' ;
    return (
      <div className="login-page">
        <div className={boxStyle}>
            {(() => {
          switch (login.mode) {
            case LoginStateEnum.Loging:   return <LoginForm actions={actions}/>;
            case LoginStateEnum.Forget:   return <ForgetForm actions={actions}/>;
            case LoginStateEnum.Register:   return <RegisterFomr actions={actions} data={login}/>;
            case LoginStateEnum.RegisterSetPassword: return <ResetPwdForm actions={actions}/>;
          }
            })()}
          <div className='process'>
            <div className={color}>
              <h1>
                <Icon name="user"/>
                {title}
              </h1>
            </div>
            <Icon name={icon} spin={spin} size="5x"/>
            <p>{text}</p>
          </div>

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
