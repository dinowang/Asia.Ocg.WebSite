import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import { Link } from 'react-router';

import './index.scss';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(){
    this.props.actions.changeMode({mode:0});

  }
  render() {
    return (
      <div className="header">
        <div className="logo">AsiaCards</div>
        <div className="info-bar">
          <Icon name="bars" size="2x" />
          <div className="right-bar">
            <Link to="/login" onClick={this.changeMode}>
              <Icon name="sign-in"/>
              登入
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
Header.propTypes = {
  actions: PropTypes.object.isRequired
};

export default Header;
