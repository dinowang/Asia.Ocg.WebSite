import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import LoginState from '../../enums/loginState';
import './index.scss';

class ResetpPwdFrom extends React.Component {
  changeMode(mode){
    this.props.actions.changeMode({mode:mode});
  }
  render() {
    return (
      <div className="resetpwd-form">
        <div className="header">
          <h1>
            <Icon name="unlock"/>
            設定密碼
          </h1>
        </div>
        <p className="nickname">
          Ch Rick
        </p>
        <div className="input">
          <input type="text" placeholder="*****"></input>
          <Icon name="lock"/>
        </div>
        <div className="btn">
          <Icon name="arrow-right" size="2x"/>
        </div>
      </div>
    );
  }
}
ResetpPwdFrom.propTypes = {
  actions: PropTypes.object.isRequired
};
export default ResetpPwdFrom;
