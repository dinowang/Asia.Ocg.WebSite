import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import ButtonStateEnum from '../../enums/buttonStateEnum';
import './index.scss';

class Button extends React.Component {
  constructor(props) {
   super(props);
   this.onClick = this.onClick.bind(this);
   this.loading = this.loading.bind(this);
   this.fail = this.fail.bind(this);

  }
  onClick(){
    this.props.onClick();
  }
  normal(){
    return(
      <div className="button" onClick={this.onClick}>
        <Icon name={this.props.lIcon}/>
        {this.props.value}
        <Icon name={this.props.rIcon}/>
      </div>
    )
  }
  loading(){
    return(
      <div className="button loading">
        <Icon name="" spin={true}/>
        讀取中..
        <Icon name="spinner" spin={true}/>
      </div>
    )
  }
  fail(){
    return(
      <div className="button fail">
        <Icon name="" spin={true}/>
        失敗
        <Icon name="exclamation"/>
      </div>
    )
  }

  render() {
    console.log(this.props.state)
    return (
      <div>
        {(() => {
        switch (this.props.state) {
        case ButtonStateEnum.None:   return this.normal();
        case ButtonStateEnum.Loading:   return this.loading();
        case ButtonStateEnum.Fail:   return this.fail();
        }
        })()}
      </div>
    );
  }
}
// Button.propTypes = {
//
// };
export default Button;
