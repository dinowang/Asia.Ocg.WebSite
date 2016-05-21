import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

const SearchResult = (props) => {
  // const handleChange = (e) => {
  //   props.onChange(e.target.value);
  // };
  let renderLi =()=>{
    return (
      <div className="card-list">
        <img src="http://www.toretoku.jp/images/items/l/104246jbt.jpg?20151210183254"></img>
        <div className="card-info">
          <p>效果分隔士</p>
          <ul>
            <li>同步怪獸</li>
            <li>等級7</li>
            <li>光</li>
            <li>獸族</li>
            <li>2500</li>
            <li>2000</li>
          </ul>
          <span>
            獸族協調+協調以外的怪獸1體以上
這張卡由於對方被破壞的場合，雙方玩家從牌組上將7張卡送入墓地。
          </span>
        </div>
      </div>
    )
  };
  let test = [1,2,3,4,5,6,7,8,9,10];

  return (
    <div className="search-tableR">
      {test.map(renderLi)}
    </div>
  );
};

SearchResult.propTypes = {
  // onChange: PropTypes.func.isRequired,
  // placeholder: PropTypes.string
};

export default SearchResult;
