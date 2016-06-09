import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class SearchListPanel extends React.Component {
  constructor(props) {
   super(props);
   this.onChange = this.onChange.bind(this);
   this.renderList = this.renderList.bind(this);
  }
  liOnClick(value){
    // console.log('add',value)
    this.props.itemOnClick(value);
  }
  renderList(data,key){
    const href = data.image_url? data.image_url:'https://xpgcards.blob.core.windows.net/image/null.jpg'
    return(
      <li key={key} onClick={()=>this.liOnClick(data)}>
        <img src={href}></img>
        <span>{data.name}</span>
      </li>
    )
  }
  onChange(e){
    this.props.onChange(e.target.value);
  }
  render(){
    return (
        <div className="searchlist-panel">
          <input type="text" placeholder="卡號、卡片名稱" onChange={this.onChange}/>
          <ul>
          {this.props.data.map(this.renderList)}
          </ul>
        </div>
    );
  }
};

SearchListPanel.propTypes ={
};

export default SearchListPanel;
