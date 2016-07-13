import React from 'react';
import {Link} from 'react-router';
import {Icon} from '../';


if (process.env.BROWSER) {
  require('./index.scss');
}

export const LinkButton = (props) => {
  return (
      <Link style={props.style} className="link-button" to={props.to}>
        <Icon name={props.lIcon? props.lIcon :''}/>
        {props.value}
        <Icon name={props.rIcon? props.rIcon : ''}/>
      </Link>
  );
};

LinkButton.propTypes ={
};

export default LinkButton;
