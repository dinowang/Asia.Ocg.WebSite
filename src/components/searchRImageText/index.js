import React, {PropTypes} from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('./index.scss');
}

const SearchRImageText = (props) => {
  const preFetch = (e) =>{
    props.actions.checkinList(e);
  }
  let renderLi =(item, index)=>{
    let {name, image_url, kind, level, property, race, attack, defence, effect, serial_number} = item;
    const href = `/card/${serial_number}/${name}`;
    return (
      <div className="card-list" key={index}>
        <Link to={href} onMouseOver={()=>{preFetch(serial_number)}}><img src={image_url}></img></Link>
        <div className="card-info" >
        <Link onMouseOver={()=>{preFetch(serial_number)}} to={href}>{name}</Link>
          <ul>
            <li>{kind}</li>
            <li>{level}</li>
            <li>{property}</li>
            <li>{race}</li>
            <li className="number">{attack}</li>
            <li className="number">{defence}</li>
          </ul>
          <span dangerouslySetInnerHTML={{__html: effect}}>

          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="search-RImageText">
      {props.data.map(renderLi)}
    </div>
  );
};

SearchRImageText.propTypes = {
  data:PropTypes.array.isRequired
};

export default SearchRImageText;
