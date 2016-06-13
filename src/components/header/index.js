import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import * as userActions from '../../actions/userActions';
import * as loginActions from '../../actions/loginActions';



import './index.scss';

class Header extends React.Component {
  constructor(){
    super();
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(){
    this.props.loginActions.changeMode({mode:0});
  }
  renderLogin(){
    return(
      <div className="login">
        <Link to="/login" onClick={this.changeMode}>
          <Icon name="sign-in"/>
          登入
        </Link>
      </div>
    )
  }
  renderInfoBar(){
    const image_url = this.props.user.image_url;
    return(
      <div className="user-bar">
        <img src={image_url}/>
        <span>{this.props.user.account}</span>
      </div>
    )
  }
  render() {
    const rightBar = this.props.user.account? this.renderInfoBar() : this.renderLogin();
    return (
      <div className="header">
        <div className="logo">AsiaCards</div>
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
    user: state.user
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



//
// <div className="user-bar">
//   <img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12717366_1140077189343966_8221115824378901544_n.jpg?oh=382682b03755dbaf37ae830c64c668bc&oe=57A0F709"/>
//   <span>mr.sunboss@gmail.com</span>
// </div>
