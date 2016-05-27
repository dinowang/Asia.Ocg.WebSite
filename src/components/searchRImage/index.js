import React, {PropTypes}from 'react';
import './index.scss';

const SearchRImage = (props) => {
  let renderLi =(item, index)=>{
    let {name, image_url, kind, level, property, race, attack, defence, effect} = item;
    image_url = image_url ? image_url :"https://xpgcards.blob.core.windows.net/image/null.jpg";
    return (
      <div className="card-list" key={index}>
        <img src={image_url}></img>
        <div className="card-info">
          <p>{name}</p>
          <ul>
            <li>{kind}</li>
            <li>{level}</li>
            <li>{property}</li>
            <li>{race}</li>
            <li>{attack}</li>
            <li>{defence}</li>
          </ul>
          <span dangerouslySetInnerHTML={{__html: effect}}>

          </span>
        </div>
      </div>
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
