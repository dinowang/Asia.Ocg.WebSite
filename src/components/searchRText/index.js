import React, {PropTypes} from 'react';
import './index.scss';

const SearchRText = (props) => {
  let renderLi = (item, index)=>{
    const {name, kind, level, property, race, attack, defence} = item;

    return(
      <tr key={index}>
        <td>{name}</td>
        <td>{kind}</td>
        <td>{level}</td>
        <td>{property}</td>
        <td>{race}</td>
        <td>{attack}</td>
        <td>{defence}</td>

      </tr>
    );
  };
  return (
    <div className="search-RText">
      <table>
        <tbody>
          {props.data.map(renderLi)}
        </tbody>
      </table>
    </div>
  );
};

SearchRText.propTypes = {
  data:PropTypes.array.isRequired
};

export default SearchRText;
