import React, {PropTypes} from 'react';
import {Link} from 'react-router';

if (process.env.BROWSER) {
  require('./index.scss');
}

const SearchRImage = (props) => {
  const preFetch = (e) =>{
    props.actions.checkinList(e);
  }
  let renderLi =(item, index)=>{
    let {name, image_url, serial_number} = item;
    const href = `/card/${serial_number}/${name}`;
    return (
      <Link to={href} onMouseOver={()=>{preFetch(serial_number)}}><img src={image_url}></img></Link>
    );
  };

  return (
    <div className="search-RImage">
      {props.data.map(renderLi)}
    </div>
  );
};

SearchRImage.propTypes = {
  data:PropTypes.array.isRequired
};

export default SearchRImage;
