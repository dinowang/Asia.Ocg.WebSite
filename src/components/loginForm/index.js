import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import EmailInput from '../emailInput';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';
import './index.scss';

class LoginForm extends React.Component {
  constructor(){
    super();
    this.login = this.login.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  componentDidMount(){
    this.refs.account.refs.email.focus();
  }
  changeMode(mode){
    this.props.actions.changeMode({mode:mode});
  }
  login(){
    const account = this.refs.account.value();
    const password = this.refs.password.value;
    const {actions} = this.props;
    if(this.refs.account.isEmail() && password){
      actions.changeProcessForm({processForm:{
        title: '登入中...',
        color: 'header orange',
        icon: 'spinner',
        spin: true
      }});
      actions.changeProcess({process:LoginProcessEnum.Processing});
      actions.requestLogin(account,password)
    }
  }
  onKeyPress(e){
    if(e.key === 'Enter'){
      this.login();
    }
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
        <EmailInput ref="account" />
        <div className="input">
          <input type="password" placeholder="password" ref="password" onKeyPress={this.onKeyPress} />
          <Icon name="lock"/>
        </div>
        <p className="message">{this.props.data.message}</p>
        <div className="btn" onClick={this.login}>
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
