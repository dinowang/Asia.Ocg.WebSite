import React from 'react';
import SearchRImage from '../../components/searchRImage';
import SearchRText from '../../components/searchRText';
import './index.scss';

export const SearchPage = () => {
  return (
    <div className="search-page">
    <h1>搜尋：DREV-JP001</h1>
    <div className="board">
      <hr/>
        <SearchRText></SearchRText>

    </div>
    </div>
  );
};
// <SearchRImage></SearchRImage>
// <SearchRText></SearchRText>
export default SearchPage;
