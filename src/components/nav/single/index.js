import React, {PropTypes} from 'react';
import {Icon} from 'react-fa'
import './index.scss';

const Single = (props) => {
  return (
    <div className="single-menu">
      <Icon name={props.icon}/>
      {props.value}
    </div>
  );
};

Single.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Single;
