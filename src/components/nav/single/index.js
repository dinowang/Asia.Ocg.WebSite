import React, {PropTypes} from 'react';
import {Icon} from '../../icon/index';

import { Link } from 'react-router';
if (process.env.BROWSER) {
  require('./index.scss');
}

const Single = (props) => {
  return (
      <Link  className="single-menu" to={props.href} activeClassName="active">
        <Icon name={props.icon}/>
        {props.title}
      </Link>

  );
};

Single.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired
};

export default Single;
