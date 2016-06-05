import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';

import EmailHelper from '../../businessLogic/emailHelper';
import './index.scss';

class RegisterForm extends React.Component {
  constructor(props,refs) {
   super(props,refs);
   this.submit = this.submit.bind(this);
   this.nicknameonChange = this.nicknameonChange.bind(this);
   this.emailonChange = this.emailonChange.bind(this);
   this.test = this.test.bind(this);
   this.state = {
     btnStyle:'btn disable',
     emailStyle:'',
     nicknameStyle:''
   }
  }
  changeMode(mode) {
    this.props.actions.changeMode({mode:mode});
  }
  submit() {
    // this.props.actions.changeProcess({process:LoginProcessEnum.Processing});
    // this.props.actions.changeProcessForm({processForm:{
    //   text: '處理中...',
    //   color: 'header orange',
    //   icon: 'spinner',
    //   spin: true,
    // }});
    //
    // setTimeout(()=>{
    //   this.props.actions.changeProcess({process:LoginProcessEnum.Success});
    //   this.props.actions.changeProcessForm({processForm:{
    //     text: '完成',
    //     color: 'header grean',
    //     icon: 'check-circle-o',
    //     spin: false,
    //   }});
    // },2000);
    //
    // setTimeout(()=>{
    //   this.props.actions.changeProcess({process:LoginProcessEnum.None});
    //
    //
    // },4000);

    const {email, nickname} = this.refs;
    const {actions} = this.props;
    if( this.emailonChange() && this.nicknameonChange()){
      actions.setMessage('');
      actions.requestRegister(email.value,nickname.value);
      actions.changeProcess({process:LoginProcessEnum.Processing});
      actions.changeProcessForm({processForm:{
        title: '處理中...',
        color: 'header orange',
        icon: 'spinner',
        spin: true,
      }});
    }else{
      // this
      // this.props.actions
      this.props.actions.setMessage('信箱與暱稱必填');
    }
  }
  test(){
    if(this.emailonChange() && this.nicknameonChange()){
      this.setState({btnStyle:'btn'})
    }
    else{
      this.setState({btnStyle:'btn disable'})
    }
  }
  emailonChange(){
    if(EmailHelper.validateEmail(this.refs.email.value)){
      this.setState({emailStyle:'success'})
      return true;
    }else{
      this.setState({emailStyle:'error'})
      return false;
    }

  }
  nicknameonChange(){
    if(this.refs.nickname.value){
      this.setState({nicknameStyle:'success'})
      return true;
    }else{
      this.setState({nicknameStyle:'error'})
      return false;
    }
  }
  // render() {
  //   return (
  //     <div className="register-form" onChange={this.test}>
  //       <div className="header">
  //         <h1>
  //           <Icon name="user"/>
  //           註冊
  //         </h1>
  //       </div>
  //       <Icon name="spinner" spin={true} size="4x"/>
  //     </div>
  //   );
  // }
  render() {
    const {data} = this.props;
    return (
      <div className="register-form" onChange={this.test}>
        <div className="header">
          <h1>
            <Icon name="user"/>
            註冊
          </h1>
        </div>
        <div className="input ">
          <input onChange={this.emailonChange} className={this.state.emailStyle} type="text" placeholder="Email" ref="email"></input>
          <Icon name="envelope"/>
        </div>
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
  actions: PropTypes.object.isRequired
};
export default RegisterForm;
