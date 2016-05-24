import React from 'react';
import './index.scss';

const SearchRText = () => {
  let renderLi = (data, index)=>{
    return(
      <tr key={index}>
        <td>效果分隔士</td>
        <td>同步怪獸</td>
        <td>等級7</td>
        <td>光</td>
        <td>獸族</td>
        <td>2500</td>
        <td>2500</td>

      </tr>
    );
  }
  let test = [1,2,3,4,5,6,7,8,9,10]
  return (
    <div className="search-RText">
      <table>
        <tbody>
          {test.map(renderLi)}
        </tbody>
      </table>
    </div>
  );
};

SearchRText.propTypes = {
};

export default SearchRText;
