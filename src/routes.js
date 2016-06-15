import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import DeckPage from './containers/DeckPage';
import BanListPage from './containers/BanListPage';
import SearchPage from './containers/SearchPage';
import CardPage from './containers/CardPage';
import LoginPage from './containers/LoginPage';
import BanPage from './containers/BanPage';
import DeckDetail from './containers/DeckDetail';
import DeckEditPage from './containers/DeckEditPage';


//
import BanFormPage from './containers/Manage/Ban/BanFormPage';
import ManBanListPage from './containers/Manage/Ban/ManBanListPage';


import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}/>
    <Route path="deck/:deck_type" component={DeckPage}/>
    <Route path="ban/:id" component={BanPage}/>
    <Route path="banlist" component={BanListPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="search/:query" component={SearchPage}/>
    <Route path="search/:query/:page" component={SearchPage}/>
    <Route path="card/:serialNumber" component={CardPage}/>
    <Route path="card/:serialNumber/:name" component={CardPage}/>
    <Route path="register/setpassword/:code" component={LoginPage}/>

    //
    <Route path="deckdetail/edit/:id" component={DeckEditPage}/>
    <Route path="deckdetail/:id/:name" component={DeckDetail}/>





    // ManageMent
    <Route path="banManage/Form" component={BanFormPage}/>
    <Route path="banManage/Form/:id" component={BanFormPage}/>
    <Route path="banManage/List" component={ManBanListPage}/>







    <Route path="*" component={NotFoundPage}/>
  </Route>
);
