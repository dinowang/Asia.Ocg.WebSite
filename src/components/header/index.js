import React from 'react';
import {Icon} from 'react-fa';
import { Link } from 'react-router';

import './index.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="logo">AsiaCard</div>
        <div className="info-bar">
          <Icon name="bars" size="2x" />
          <div className="right-bar">
            <Link to="/login">
              <Icon name="sign-in"/>
              登入
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
