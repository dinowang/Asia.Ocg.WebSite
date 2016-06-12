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
   this.success = this.success.bind(this);


  }
  onClick(){
    this.props.onClick();
  }
  normal(){
    const lIcon = this.props.lIcon? <Icon name={this.props.lIcon}/> :'';
    const rIcon = this.props.rIcon? <Icon name={this.props.rIcon}/> :'';
    return(
      <div className="button" onClick={this.onClick}>
        {lIcon}
        {this.props.value}
        {rIcon}
      </div>
    );
  }
  loading(){
    return(
      <div className="button loading">
        <Icon name="" spin={true}/>
        讀取中..
        <Icon name="spinner" spin={true}/>
      </div>
    );
  }
  fail(){
    return(
      <div className="button fail">
        <Icon name="" spin={true}/>
        {this.props.state.submitBtnText}
        <Icon name="exclamation"/>
      </div>
    );
  }
  success(){
    return(
      <div className="button success">
        <Icon name="" spin={true}/>
        成功
        <Icon name="check"/>
      </div>
    );
  }

  render() {
    return (
      <div className="btn-component" style={this.props.style}>
        {(() => {
        switch (this.props.state.sumbitBtn) {
        case ButtonStateEnum.None:   return this.normal();
        case ButtonStateEnum.Loading:   return this.loading();
        case ButtonStateEnum.Fail:   return this.fail();
        case ButtonStateEnum.Success:   return this.success();
        }
        })()}
      </div>
    );
  }
}
Button.propTypes = {
  lIcon: PropTypes.string,
  rIcon: PropTypes.string,
  value: PropTypes.string.isRequired,
  style: PropTypes.object,
  state: PropTypes.object,
  onClick: PropTypes.func
};
export default Button;
