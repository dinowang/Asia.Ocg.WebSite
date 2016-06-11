import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import './index.scss';


export const LinkButton = (props) => {
  return (
      <Link className="link-button" to={props.to}>
        <Icon name={props.lIcon? props.lIcon :''}/>
        {props.value}
        <Icon name={props.rIcon? props.rIcon : ''}/>
      </Link>
  );
};

LinkButton.propTypes ={
};

export default LinkButton;
