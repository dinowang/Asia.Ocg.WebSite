import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import { IndexLink } from 'react-router';
import './index.scss';

const Single = (props) => {
  return (
      <IndexLink  className="single-menu" to={props.href}>
        <Icon name={props.icon}/>
        {props.value}
      </IndexLink>

  );
};

Single.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default Single;
