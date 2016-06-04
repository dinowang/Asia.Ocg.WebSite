import React,{PropTypes}from 'react';
import './index.scss';


export const SwitchButton = (props) => {
  return (
      <label className="switch-buttton" style={props.style}>
        <input type="checkbox" className="checkbox"/>
        <div className="switch">
          <div className="btn"></div>
        </div>
      </label>
  );
};

SwitchButton.propTypes ={
  // style:PropTypes.s
};

export default SwitchButton;
