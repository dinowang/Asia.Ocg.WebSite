import React,{PropTypes} from 'react';
import {
  Icon,
  EmailInput
} from '../';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';

if (process.env.BROWSER) {
  require('./index.scss');
}

class RegisterForm extends React.Component {
  constructor(props,refs) {
   super(props,refs);
   this.submit = this.submit.bind(this);
   this.nicknameonChange = this.nicknameonChange.bind(this);
   this.onChange = this.onChange.bind(this);
   this.state = {
     btnStyle:'btn disable',
     nicknameStyle:''
   };
  }
  componentDidMount(){
    this.refs.email.refs.email.focus();
  }
  changeMode(mode) {
    this.props.actions.changeMode({mode:mode});
  }
  submit() {
    const {email, nickname} = this.refs;
    const {actions} = this.props;
    if( this.refs.email.isEmail() && this.nicknameonChange()){
      actions.setMessage('');
      actions.requestRegister(email.value(),nickname.value);
      actions.changeProcess({process:LoginProcessEnum.Processing});
      actions.changeProcessForm({processForm:{
        title: '處理中...',
        color: 'header orange',
        icon: 'spinner',
        spin: true
      }});
    }else{
      this.props.actions.setMessage('信箱與暱稱必填');
    }
  }
  onChange(){
    if(this.refs.email.isEmail() && this.nicknameonChange()){
      this.setState({btnStyle:'btn'});
    }
    else{
      this.setState({btnStyle:'btn disable'});
    }
  }
  nicknameonChange(){
    if(this.refs.nickname.value){
      this.setState({nicknameStyle:'success'});
      return true;
    }else{
      this.setState({nicknameStyle:'error'});
      return false;
    }
  }
  render() {
    const {data} = this.props;
    return (
      <div className="register-form" onChange={this.onChange}>
        <div className="header">
          <h1>
            <Icon name="user"/>
            註冊
          </h1>
        </div>
        <EmailInput ref="email" />
        <div className="input">
          <input onChange={this.nicknameonChange} className={this.state.nicknameStyle} type="text" placeholder="暱稱" ref="nickname"></input>
          <Icon name="pencil"/>
        </div>
        <span style={{color:'red'}}>{data.message}</span>
        <div className={this.state.btnStyle} onClick={this.submit} >
          <Icon name="user-plus" size="2x"/>
        </div>
        <span className="left" onClick={()=>this.changeMode(LoginStateEnum.Loging)}>登入</span>
      </div>
    );
  }
}
RegisterForm.propTypes = {
  actions: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};
export default RegisterForm;
