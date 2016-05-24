import React from 'react';
import SearchRImage from '../../components/searchRImage';
import {Icon} from 'react-fa';
import SearchRText from '../../components/searchRText';
import PageList from '../../components/pageList';
import './index.scss';

export const SearchPage = () => {
  return (
    <div className="search-page">
    <h1>搜尋：DREV-JP001</h1>
    <div className="board">
      <div className="sort">
        排列方式：
        <Icon name="picture-o"/>
        <Icon name="th-list"/>
      </div>
      <PageList current={1} total={20} showCount={5}></PageList>
      <div className="clear"></div>
      <SearchRImage></SearchRImage>
      <PageList current={1} total={20} showCount={5}></PageList>
    </div>
    <div className="other">
      other
    </div>
    </div>
  );
};
// <SearchRImage></SearchRImage>
// <SearchRText></SearchRText>
export default SearchPage;
