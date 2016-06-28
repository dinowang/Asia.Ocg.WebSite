import React from 'react';
import moment from 'moment';
import {Icon} from 'react-fa';
import './index.scss';

class UserComment extends React.Component {
  constructor(props){
    super(props)

  }

  renderComment(data, index){

    const date = moment(data.time).lang('zh-tw').fromNow();
    return(
      <li key={index}>
        <div className="avtor">
          <img src={data.image_url}></img>
          <p>{data.nickname}</p>
        </div>
        <span className="message">
          {data.content}
        </span>
        <div className="fnc-bar">
          <ul>
            <li className="date">
              {date}
            </li>
          </ul>
        </div>
        <div className="clear"></div>
      </li>
    );
  }

  render() {
    const {list,loading} = this.props;
    const loadingStyle = loading  ? {}:{display:'none'};

    return (
      <div className="user-comment">
        <ul>
          {list.map(this.renderComment)}
        </ul>
        <div style={{textAlign:'center'}}>
          <Icon style={loadingStyle} style={loadingStyle} name="spinner" spin={true} size="2x"/>
        </div>
      </div>
    );
  }
}
export default UserComment;
