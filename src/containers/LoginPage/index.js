import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { asyncConnect } from 'redux-async-connect';
import {LoginStateEnum, LoginProcessEnum} from '../../enums/loginState';
import * as actions from '../../actions/loginActions';
import {
  Icon,
  LoginForm,
  ForgetForm,
  RegisterForm,
  SetPwdForm,
  ReSendEmailForm
} from '../../components';

if (process.env.BROWSER) {
  require('./index.scss');
}
@asyncConnect([{
  promise: async ({params,store: {dispatch}}) => {
    let {code} = params;
    if(code){
      dispatch(actions.changeMode({mode:LoginStateEnum.RegisterSetPassword}));
    }else{
      dispatch(actions.changeMode({mode:LoginStateEnum.Loging}));
    }
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class LoginPage extends React.Component {
  componentWillMount(){
    let {code} = this.props.params;
    const {actions} = this.props;
    if(code){
      actions.changeMode({mode:LoginStateEnum.RegisterSetPassword});
    }
  }
  render(){
    const {actions, login} = this.props;
    const {title, text, color, icon, spin} = this.props.login.processForm;
    let boxStyle = this.props.login.process === LoginProcessEnum.None ? 'box': 'box process' ;
    return (
      <div className="login-page">
        <div className={boxStyle}>
            {(() => {
          switch (login.mode) {
            case LoginStateEnum.Loging:   return <LoginForm actions={actions} data={login}/>;
            case LoginStateEnum.Forget:   return <ForgetForm actions={actions}/>;
            case LoginStateEnum.Register:   return <RegisterForm actions={actions} data={login}/>;
            case LoginStateEnum.RegisterSetPassword: return <SetPwdForm actions={actions} data={login} code={this.props.params.code}/>;
            case LoginStateEnum.ReSendEmail: return <ReSendEmailForm actions={actions} data={login}/>;
          }
            })()}
          <div className="process">
            <div className={color}>
              <h1>
                <Icon name="user"/>
                {title}
              </h1>
            </div>
            <Icon name={icon} spin={spin} size="5x"/>
            <p>{text}</p>
          </div>

        </div>
      </div>
    );
  }
}
LoginPage.propTypes ={
  login:PropTypes.object.isRequired,
  actions:PropTypes.object.isRequired,
  params:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
