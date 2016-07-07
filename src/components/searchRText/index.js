import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './index.scss';

const SearchRText = (props) => {
  const preFetch = (e) =>{
    props.actions.checkinList(e);
  }
  let renderLi = (item, index)=>{
    const {name, kind, level, property, race, attack, defence, serial_number} = item;
    const href = `/card/${serial_number}/${name}`;

    return(
      <tr key={index} onMouseOver={()=>{preFetch(serial_number)}}>
        <td><Link to={href}>{name}</Link></td>
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
