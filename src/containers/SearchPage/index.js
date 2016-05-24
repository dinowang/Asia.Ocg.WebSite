import React from 'react';
// import SearchRImage from '../../components/searchRImage';
import SearchRText from '../../components/searchRText';
import PageList from '../../components/pageList';
import './index.scss';

export const SearchPage = () => {
  return (
    <div className="search-page">
    <h1>搜尋：DREV-JP001</h1>
    <div className="board">
      <hr/>
        <PageList current={1} total={20} showCount={5}></PageList>
        <PageList current={2} total={20} showCount={5}></PageList>
        <PageList current={3} total={20} showCount={5}></PageList>
        <PageList current={4} total={20} showCount={5}></PageList>
        <PageList current={5} total={20} showCount={5}></PageList>
        <PageList current={6} total={20} showCount={5}></PageList>
        <PageList current={7} total={20} showCount={5}></PageList>
        <PageList current={8} total={20} showCount={5}></PageList>
        <SearchRText></SearchRText>
    </div>
    </div>
  );
};
// <SearchRImage></SearchRImage>
// <SearchRText></SearchRText>
export default SearchPage;
