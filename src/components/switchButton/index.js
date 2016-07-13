import React from 'react';

if (process.env.BROWSER) {
  require('./index.scss');
}

class SwitchButton extends React.Component {
  constructor(){
    super()
    this.onChange = this.onChange.bind(this);
  }
  onChange(){
    this.props.onClick();
  }
  render(){
    return (
        <label onChange={this.onChange} className="switch-buttton" style={this.props.style}>
          <input checked={!this.props.checked} ref="checkbox" type="checkbox" className="checkbox"/>
          <div className="switch">
            <div className="btn"></div>
          </div>
        </label>
    );
  }
}

SwitchButton.propTypes ={
};

export default SwitchButton;
