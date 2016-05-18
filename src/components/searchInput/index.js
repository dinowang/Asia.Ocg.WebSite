import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

const SearchInput = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <div className="search-input">
      <input onChange={handleChange} className="search" type="search" placeholder={props.placeholder} />
      <a href="#">
        <Icon name="search"/>
      </a>
    </div>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

export default SearchInput;
