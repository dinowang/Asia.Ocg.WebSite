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
    this.props.itemOnClick(value);
  }
  renderList(data,key){
    return(
      <li key={key} onClick={()=>this.liOnClick(data)}>
        <img src={data.href}></img>
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
