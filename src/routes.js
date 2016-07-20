import React from 'react';
import { Route, IndexRoute } from 'react-router';

import {
  App,
  NotFoundPage
} from './components';
import {
  IndexPage,
  LoginPage,
  DeckPage,
  BanPage,
  SearchPage,
  DeckDetail,
  DeckEditPage,
  BanFormPage,
  ManBanListPage,
  ManCardListPage,
  ManCardFormPage,
  CardPage,
  PackListPage,
  PackPage
} from './containers';

export default (store) => {


  return (
    <Route path="/" name="首頁" component={App}>
      <IndexRoute name="首頁" component={IndexPage}/>
      <Route name="登入" path="login" component={LoginPage}/>


      // 搜尋
      <Route path="search/:query" component={SearchPage}/>
      <Route path="search/:page/:query" component={SearchPage}/>

      // 卡片
      <Route path="/card/:serialNumber" component={CardPage}/>
      <Route path="/card/:serialNumber/:name" component={CardPage}/>

      // 牌組
      <Route name="牌組列表" path="deck/:deck_type">
        <IndexRoute component={DeckPage}/>
        <Route path=":page" component={DeckPage}/>
        <Route path=":id/:name" component={DeckDetail}/>
      </Route>

      // 禁卡表
      <Route name="禁卡表" path="ban" component={BanPage}>
        <Route path=":id/:date" component={BanPage}/>
      </Route>

      // 註冊設定密碼
      <Route path="register/setpassword/:code" component={LoginPage}/>

      // 卡表
      <Route name="卡表區" path="pack" >
        <IndexRoute component={PackListPage}/>
          <Route path=":group" >
            <IndexRoute component={PackListPage}/>
            <Route path=":id/:name" component={PackPage}/>
          </Route>
      </Route>


      //------ 會員功能
      // 牌組
      <Route  path="deckdetail/edit/:id" component={DeckEditPage}/>
      <Route name="新增牌組" path="deckdetail/edit/" component={DeckEditPage}/>


      // 管理功能
      <Route path="banManage/Form" component={BanFormPage}/>
      <Route path="banManage/Form/:id" component={BanFormPage}/>
      <Route path="banManage/List" component={ManBanListPage}/>

      <Route path="cardManage/List" component={ManCardListPage}/>
      <Route path="cardManage/Form/:id" component={ManCardFormPage}/>
      <Route path="cardManage/Form/" component={ManCardFormPage}/>

      <Route path="*" component={NotFoundPage}/>

    </Route>
  );
};
