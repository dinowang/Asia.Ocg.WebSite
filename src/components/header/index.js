import React from 'react';
import Icon from '../icon';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as loginActions from '../../actions/loginActions';

if (process.env.BROWSER) {
  require('./index.scss');
}

class Header extends React.Component {
  constructor(){
    super();
    this.changeMode = this.changeMode.bind(this);
    this.clickLogout = this.clickLogout.bind(this);

  }
  async changeMode(){
    await this.props.nav.push('/login')
    this.props.loginActions.changeMode({mode:0});
  }
  clickLogout(){
    this.props.loginActions.requestLogout();
  }
  renderLogin(){
    return(
      <div className="login">
        <a onClick={this.changeMode}>
          <Icon name="sign-in"/>
          登入
        </a>
      </div>
    )
  }
  renderInfoBar(){
    const image_url = this.props.user.image_url;
    return(
      <div className="user-bar noselect">
        <img src={image_url}/>
        <span>{this.props.user.account}</span>
        <div className="user-menu noselect">
          <ul>
            <li onClick={this.clickLogout}>
              登出
              <Icon name="sign-out"/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  render() {
    const rightBar = this.props.user.account? this.renderInfoBar() : this.renderLogin();
    return (
      <div className="header">
        <div className="logo"><Link to="/">AsiaCards</Link></div>
        <div className="info-bar">
          <Icon name="bars" size="2x" />
          <div className="right-bar">
            {rightBar}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    nav:browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
