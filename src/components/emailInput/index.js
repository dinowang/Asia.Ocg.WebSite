import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';

import EmailHelper from '../../businessLogic/emailHelper';
import './index.scss';

class EmailInput extends React.Component {
  constructor(props, refs){
    super(props, refs);
    this.onChange = this.onChange.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.value = this.value.bind(this);
    this.state = {
      emailStyle: ''
    }
  }
  onChange(){
    if(this.isEmail()){
      this.setState({emailStyle:'success'})
      return true;
    }else{
      this.setState({emailStyle:'error'})
      return false;
    }
  }
  isEmail(){
    return EmailHelper.validateEmail(this.refs.email.value);
  }
  value(){
    return this.refs.email.value;
  }
  render(){
    const {data} = this.props;
    return (
      <div className="email-input">
        <input onChange={this.onChange} className={this.state.emailStyle} type="text" placeholder="Email" ref="email"></input>
        <Icon name="envelope"/>
      </div>
    );
  }
}
EmailInput.propTypes = {
};
export default EmailInput;
