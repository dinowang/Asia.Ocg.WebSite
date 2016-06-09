import React from 'react';
import BanTypeEnum from '../../enums/banTypeEnum';
import './index.scss'
class BanListText extends React.Component {
  renderBan(data, index){
    if(data.type === BanTypeEnum.Ban){
      return(
        <li key={index}>{data.name}</li>
      )
    }
  }
  renderLimit(data, index){
    if(data.type === BanTypeEnum.Limit){
      return(
        <li key={index}>{data.name}</li>
      )
    }
  }
  renderPreLimit(data, index){
    if(data.type === BanTypeEnum.PreLimit){
      return(
        <li key={index}>{data.name}</li>
      )
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
};
export default BanListText;
