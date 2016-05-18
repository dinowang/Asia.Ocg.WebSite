import React, {PropTypes} from 'react';
import {Icon} from 'react-fa'
import './index.scss';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
      <div className="logo">亞洲卡片王</div>
        <div className="info-bar">
          <Icon name="bars" />
        </div>
      </div>
    );
  }
}



export default Header;
