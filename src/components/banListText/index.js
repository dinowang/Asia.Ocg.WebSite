import React from 'react';
import BanTypeEnum from '../../enums/banTypeEnum';
import {Icon} from '../';

if (process.env.BROWSER) {
  require('./index.scss');
}

class BanListText extends React.Component {
  constructor(props){
    super(props)
    this.renderBan = this.renderBan.bind(this);
    this.renderLimit = this.renderLimit.bind(this);
    this.renderPreLimit = this.renderPreLimit.bind(this);
    this.itemClick = this.itemClick.bind(this);

  }
  itemClick(id){
    this.props.onClick(id)
  }
  renderBan(data, index){
    if(data.type === BanTypeEnum.Ban){
      return(
        <li key={index}>
          {data.name}
          <Icon name="close" onClick={()=>this.itemClick(data.id)}/>
        </li>
      );
    }
  }
  renderLimit(data, index){
    if(data.type === BanTypeEnum.Limit){
      return(
        <li key={index}>
          {data.name}
          <Icon name="close" onClick={()=>this.itemClick(data.id)}/>
        </li>
      );
    }
  }
  renderPreLimit(data, index){
    if(data.type === BanTypeEnum.PreLimit){
      return(
        <li key={index}>
          {data.name}
          <Icon name="close" onClick={()=>this.itemClick(data.id)}/>
        </li>
      );
    }
  }
  render(){
    const {data} = this.props;
    return (
      <div className="ban-listtext">
        <div className="list">
          <p>禁止</p>
          <ul>
          {data.list.map(this.renderBan)}
          </ul>
        </div>
        <div className="list">
          <p>限制</p>
          <ul>
          {data.list.map(this.renderLimit)}
          </ul>
        </div>
        <div className="list">
          <p>準限制</p>
          <ul>
          {data.list.map(this.renderPreLimit)}
          </ul>
        </div>
      </div>
    );
  }
}
export default BanListText;
