import React from 'react';
import {Icon} from '../';

import EmailHelper from '../../businessLogic/emailHelper';

if (process.env.BROWSER) {
  require('./index.scss');
}

class EmailInput extends React.Component {
  constructor(props, refs){
    super(props, refs);
    this.onChange = this.onChange.bind(this);
    this.isEmail = this.isEmail.bind(this);
    this.value = this.value.bind(this);
    this.state = {
      emailStyle: ''
    };
  }
  onChange(){
    if(this.isEmail()){
      this.setState({emailStyle:'success'});
      return true;
    }else{
      this.setState({emailStyle:'error'});
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
    return (
      <div className="email-input">
        <input onChange={this.onChange} className={this.state.emailStyle} type="text" placeholder="Email" ref="email"></input>
        <Icon name="envelope"/>
      </div>
    );
  }
}
export default EmailInput;
