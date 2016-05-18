import React from 'react';
import {Icon} from 'react-fa'
import './index.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
      <div className="logo">AsiaCard</div>
        <div className="info-bar">
          <Icon name="bars" size="2x" />
        </div>
      </div>
    );
  }
}



export default Header;
