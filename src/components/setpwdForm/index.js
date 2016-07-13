import React,{PropTypes} from 'react';
import {Icon} from '../';
import {LoginProcessEnum} from '../../enums/loginState'

if (process.env.BROWSER) {
  require('./index.scss');
}
class SetPwdForm extends React.Component {
  constructor(){
    super();
    this.submit = this.submit.bind(this);
  }
  componentWillMount(){
    const {actions, code} = this.props;
    actions.changeProcess({process:LoginProcessEnum.Processing});
    actions.changeProcessForm({processForm:{
      title: '驗證中...',
      color: 'header orange',
      icon: 'spinner',
      spin: true
    }});
    actions.requestCheckCode(code);
  }
  changeMode(mode){
    this.props.actions.changeMode({mode:mode});
  }
  submit(){
    const password = this.refs.password.value;
    const {actions} = this.props;
    if(password){
      actions.changeProcess({process:LoginProcessEnum.Processing});
      actions.requestRegSetPwd(this.props.code, password);
    }else{
      actions.setMessage('請輸入密碼');
    }
  }
  render() {
    return (
      <div className="setpwd-form">
        <div className="header">
          <h1>
            <Icon name="unlock"/>
            設定密碼
          </h1>
        </div>
        <div className="input">
          <input type="password" placeholder="*****" ref="password"></input>
          <Icon name="lock"/>
        </div>
        <p className="message">
          {this.props.data.message}
        </p>
        <div className="btn" onClick={this.submit}>
          <Icon name="arrow-right" size="2x"/>
        </div>
      </div>
    );
  }
}
SetPwdForm.propTypes = {
  actions: PropTypes.object.isRequired,
  code: PropTypes.string.isRequired
};
export default SetPwdForm;
