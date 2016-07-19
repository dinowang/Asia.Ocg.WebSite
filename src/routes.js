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
    <Route path="/" component={App}>
      <IndexRoute component={IndexPage}/>
      <Route path="login" component={LoginPage}/>

      // 卡片
      <Route path="card/:serialNumber" component={CardPage}/>
      <Route path="card/:serialNumber/:name" component={CardPage}/>

      // 牌組
      <Route path="deck/:deck_type" component={DeckPage}/>
      <Route path="deck/:deck_type/:page" component={DeckPage}/>
      // 禁卡表
      <Route path="ban/:id" component={BanPage}/>
      <Route path="ban" component={BanPage}/>
      // 搜尋
      <Route path="search/:query" component={SearchPage}/>
      <Route path="search/:query/:page" component={SearchPage}/>
      // 註冊設定密碼
      <Route path="register/setpassword/:code" component={LoginPage}/>
      // 卡表
      <Route path="packlist/:group" component={PackListPage}/>
      <Route path="pack/:id" component={PackPage}/>


      //------ 會員功能
      // 牌組
      <Route path="deckdetail/edit/:id" component={DeckEditPage}/>
      <Route path="deckdetail/edit/" component={DeckEditPage}/>
      <Route path="deckdetail/:id/:name" component={DeckDetail}/>
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
