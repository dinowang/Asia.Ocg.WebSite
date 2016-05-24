import React from 'react';
import {Icon} from 'react-fa';
import SearchInput from '../searchInput';
import Single from './single';
import Multi from './multi';
import './index.scss';

class Nav extends React.Component {
  test(value){
    console.log(value);
  }
  render() {
    let t= [1,2,3];
    return (
      <div className="nav">
        <div className="user">
        <img src="https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-1/p320x320/12717366_1140077189343966_8221115824378901544_n.jpg?oh=382682b03755dbaf37ae830c64c668bc&oe=57A0F709"/>
          <div className="info">
            <p>Ch Rick</p>
            <p>
              <Icon name="usd"/>10000
            </p>
          </div>
        </div>
        <SearchInput onChange={this.test} placeholder="卡號、卡片名稱"  />
        <Single value="牌組區" icon="list" href="/deck"/>
        <Single value="禁卡表" icon="ban" href="/ban"/>
        <Single value="進階搜尋" icon="search-plus" href="/search"/>
        <Multi icon="ban" title="Test" values={t}/>
        <Single value="進階搜尋" icon="search-plus" href="/search" />
        <Single value="積分換商品" icon="search-plus" href="/search" />


      </div>
    );
  }
}



export default Nav;
