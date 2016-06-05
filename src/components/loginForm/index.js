import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import {LoginStateEnum} from '../../enums/loginState';
import './index.scss';

class LoginForm extends React.Component {
  changeMode(mode){
    console.log('test',mode,LoginStateEnum.Forget);
    this.props.actions.changeMode({mode:mode});
  }
  render() {
    return (
      <div className="login-form">
        <div className="header">
          <h1>
            <Icon name="sign-in"/>
            登入
          </h1>
        </div>
        <div className="input">
          <input type="text" placeholder="Email"></input>
          <Icon name="envelope"/>
        </div>
        <div className="input">
          <input type="password" placeholder="password"></input>
          <Icon name="lock"/>
        </div>
        <div className="btn">
          <Icon name="arrow-right" size="2x"/>
        </div>
        <span className="left" onClick={()=>this.changeMode(LoginStateEnum.Forget)}>忘記密碼</span>
        <span className="right" onClick={()=>this.changeMode(LoginStateEnum.Register)}>註冊</span>
      </div>
    );
  }
}
LoginForm.propTypes = {
  actions: PropTypes.object.isRequired
};
export default LoginForm;
