import React,{PropTypes} from 'react';
import {
  Icon,
  EmailInput
} from '../';
import {LoginStateEnum} from '../../enums/loginState';

if (process.env.BROWSER) {
  require('./index.scss');
}

class ResendEmailForm extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     btnStyle:'btn disable'
   }
  }
  componentWillUnmount(){
    this.props.actions.setMessage('');
  }
  render() {
    const {data} = this.props;
    return (
      <div className="resendEmail-form" onChange={this.test}>
        <div className="header">
          <h1>
            <Icon name="user"/>
            重寄確認信
          </h1>
        </div>
        <EmailInput ref="email"/>
        <span style={{color:'red'}}>{data.message}</span>
        <div className={this.state.btnStyle} onClick={this.submit} >
          <Icon name="user-plus" size="2x"/>
        </div>
        <span className="left" onClick={()=>this.changeMode(LoginStateEnum.Loging)}>登入</span>
      </div>
    );
  }
}
ResendEmailForm.propTypes = {
  actions: PropTypes.object.isRequired
};
export default ResendEmailForm;
