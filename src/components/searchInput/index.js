import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

const SearchInput = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };
  const handleFocus = ()=>{
    props.onFocus();
  }
  return (
    <div className="search-input">
      <input onFocus={handleFocus} onChange={handleChange} className="search" type="search" placeholder={props.placeholder} value={props.value} />
    </div>
  );
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  value: PropTypes.string
};

export default SearchInput;
