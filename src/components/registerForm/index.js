import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import LoginState from '../../enums/loginState';
import './index.scss';

class RegisterForm extends React.Component {
  changeMode(mode){
    this.props.actions.changeMode({mode:mode});
  }
  render() {
    return (
      <div className="register-form">
        <div className="header">
          <h1>
            <Icon name="user"/>
            註冊
          </h1>
        </div>
        <div className="input">
          <input type="text" placeholder="Email"></input>
          <Icon name="envelope"/>
        </div>
        <div className="input">
          <input type="text" placeholder="暱稱"></input>
          <Icon name="pencil"/>
        </div>
        <div className="login-btn">
          <Icon name="user-plus" size="2x"/>
        </div>
        <span className="left" onClick={()=>this.changeMode(LoginState.Loging)}>登入</span>
      </div>
    );
  }
}
RegisterForm.propTypes = {
  actions: PropTypes.object.isRequired
};
export default RegisterForm;
