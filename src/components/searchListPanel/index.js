import React,{PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class SearchListPanel extends React.Component {
  constructor(props) {
   super(props);
  }
  test(data,key){
    const href = data.image_url? data.image_url:'https://xpgcards.blob.core.windows.net/image/null.jpg'
    return(
      <li key={key}>
        <img src={href}></img>
        <span>神盛惠心反射</span>
      </li>
    )
  }
  render(){
    return (
        <div className="searchlist-panel">
          <input type="text" placeholder="卡號、卡片名稱"/>
          <ul>
          {this.props.data.map(this.test)}
          </ul>
        </div>
    );
  }
};

SearchListPanel.propTypes ={
};

export default SearchListPanel;
