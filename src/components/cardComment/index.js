import React from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class CardComment extends React.Component {
  constructor(props){
    super(props)
    this.renderComment = this.renderComment.bind(this);
  }
  componentWillMount(){
    this.props.actions.requestCardComment(this.props.data.serial_number);
  }
  renderComment(data, index){
    return(
      <li key={index}>
        <div className="info">
          <img src={data.image_url}></img>
          <p>{data.nickname}</p>
        </div>
        <span>
          {data.content}
        </span>
        <div className="fnc-bar">
          <ul>
            <li className="date">
              {data.time}
            </li>
          </ul>
        </div>
      </li>
    );
  }
  render() {
    return (
      <div className="card-comment">
        <ul>
          {this.props.data.comment.items.map(this.renderComment)}
        </ul>
      </div>
    );
  }
}
export default CardComment;
