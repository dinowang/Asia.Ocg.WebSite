import React,{PropTypes}from 'react';
import './index.scss';
import {Icon} from 'react-fa';

class DropDown extends React.Component {
  constructor(props) {
   super(props);
   this.show = this.show.bind(this);
   this.hide = this.hide.bind(this);
   this.select = this.select.bind(this);
   let defaultValue  = this.props.values.filter(data=>data.key === this.props.default);
   this.state = {
     isShow : 'none',
     defaultValue:defaultValue[0]
   }

   console.log('-----',defaultValue[0])
  }
  show(){
    this.setState({isShow:'block'})
  }
  hide(){
    this.setState({isShow:'none'})
  }
  select(e){
    let defaultValue  = this.props.values.filter(data=>data.key === e.target.value);
    this.setState({isShow:'none',defaultValue:defaultValue[0]});
    this.props.getValue(defaultValue[0]);
  }

  render(){
    const isShow = {display:this.state.isShow};
    // let defaultValue  = this.props.values.filter(data=>data.key === this.props.default);
    //
    // if(defaultValue[0])
    //   defaultValue = defaultValue[0].value;

    return (
        <div className="dropdown" style={this.props.style}>
        <Icon name="angle-down" size="2x"/>
          <div className="default" onClick={this.show}>{this.state.defaultValue.value}</div>
          <div className="all" style={isShow} onMouseOver={this.show} onMouseLeave={this.hide}>
            <ul>
            {this.props.values.map((data)=>{return <li key={data.key} onClick={this.select} value={data.key}>{data.value}</li>})}
            </ul>
          </div>
        </div>
    );
  }
};

DropDown.propTypes ={
  style: PropTypes.object,
  default: PropTypes.number.isRequired,
  getValue: PropTypes.func,
  values:PropTypes.array.isRequired,
};

export default DropDown;
