import React from 'react';
import {Icon} from 'react-fa';
import moment from 'moment';
import Button from '../button';
import ButtonStateEnum from '../../enums/buttonStateEnum';
import LinkButton from '../linkButton';
import './index.scss';

class CardComment extends React.Component {
  constructor(props){
    super(props)
    this.renderComment = this.renderComment.bind(this);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.submitComment  = this.submitComment.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
  }
  componentWillMount(){
    this.props.actions.setLoading(true);
    this.props.actions.requestCardComment();
  }
  componentWillUnmount(){
    this.props.actions.changeBtnType(ButtonStateEnum.None);
    this.props.actions.initComment();
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
  submitComment(){
    this.props.actions.changeBtnType(ButtonStateEnum.Loading);
    this.props.actions.requestCreateCardComment();
  }
  onChangeComment(e){
    this.props.actions.setComment(e.target.value);
    this.props.actions.changeBtnType(ButtonStateEnum.None);
  }
  renderSubmitButton(){
    if(this.props.user.account){
      return(
        <Button onClick={this.submitComment}
          style={{float:'right'}}
          state={this.props.data}
          rIcon="floppy-o"
          value="新增留言"
          fail="fail"
          success="success"/>
      )
    }else{
      return(
        <LinkButton style={{float:'right'}} value="新增留言" to='/login'/>
      )
    }
  }
  render() {
    const loadingStyle = this.props.data.loading  ? {}:{display:'none'};

    return (
      <div className="card-comment">
        <textarea value={this.props.data.comment} onChange={this.onChangeComment} placeholder="留言內容" />
        {this.renderSubmitButton()}
        <div className="clear"></div>
        <ul>
          {this.props.data.comments.items.map(this.renderComment)}
        </ul>
        <div style={{textAlign:'center'}}>
          <Icon style={loadingStyle} style={loadingStyle} name="spinner" spin={true} size="2x"/>
        </div>
      </div>
    );
  }
}
export default CardComment;
