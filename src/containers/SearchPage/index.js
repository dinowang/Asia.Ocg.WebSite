import React from 'react';
import SearchTableR from '../../components/searchTableR';
import './index.scss';

export const SearchPage = () => {
  return (
    <div className="search-page">
    <h1>搜尋：DREV-JP001</h1>
    <div className="board">
    <SearchTableR></SearchTableR>
    </div>
    </div>
  );
};
export default SearchPage;
