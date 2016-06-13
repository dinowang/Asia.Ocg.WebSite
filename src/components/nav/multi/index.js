import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import './index.scss';

const Multi = (props) => {
  let renderli = (data, index) => {
    return (
      <li key={index}>
        <Link to={data.href}>
          <Icon name="dot-circle-o"/>{data.title}
        </Link>
      </li>
    );
  };
  return (
    <div style={props.style} className="multi-menu">
      <input type="checkbox" id="test1" />
      <label htmlFor="test1">
        <Icon name={props.icon}/>
        <span>{props.title}</span>
        <Icon name="arrow-left"/>
      </label>
      <ul>
        {props.values.map(renderli)}
      </ul>
      <div className="border"/>
    </div>
  );
};

Multi.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  values: PropTypes.array
};

export default Multi;
