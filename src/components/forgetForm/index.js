import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import {LoginStateEnum} from '../../enums/loginState';
import './index.scss';

class ForgetForm extends React.Component {
  changeMode(mode){
    this.props.actions.changeMode({mode:mode});
  }
  render() {
    return (
      <div className="forget-form">
        <div className="header">
          <h1>
            <Icon name="unlock"/>
            忘記密碼
          </h1>
        </div>
        <div className="input">
          <input type="text" placeholder="Email"></input>
          <Icon name="envelope"/>
        </div>
        <div className="btn">
          <Icon name="envelope" size="2x"/>
        </div>
        <span className="right" onClick={()=>this.changeMode(LoginStateEnum.Loging)}>註冊</span>
      </div>
    );
  }
}
ForgetForm.propTypes = {
  actions: PropTypes.object.isRequired
};
export default ForgetForm;
