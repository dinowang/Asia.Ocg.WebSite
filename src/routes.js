import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import IndexPage from './containers/IndexPage';
import DeckPage from './containers/DeckPage';
import SearchPage from './containers/SearchPage';
import CardPage from './containers/CardPage';
import LoginPage from './containers/LoginPage';
import BanPage from './containers/BanPage';
import DeckDetail from './containers/DeckDetail';
import DeckEditPage from './containers/DeckEditPage';


//
import BanFormPage from './containers/Manage/Ban/BanFormPage';
import ManBanListPage from './containers/Manage/Ban/ManBanListPage';
import ManCardListPage from './containers/Manage/Card/ManCardListPage';
import ManCardFormPage from './containers/Manage/Card/ManCardFormPage';



import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage}/>
    <Route path="deck/:deck_type" component={DeckPage}/>
    <Route path="deck/:deck_type/:page" component={DeckPage}/>

    <Route path="ban/:id" component={BanPage}/>
    <Route path="ban" component={BanPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="search/:query" component={SearchPage}/>
    <Route path="search/:query/:page" component={SearchPage}/>
    <Route path="card/:serialNumber" component={CardPage}/>
    <Route path="card/:serialNumber/:name" component={CardPage}/>
    <Route path="register/setpassword/:code" component={LoginPage}/>

    // Member
    <Route path="deckdetail/edit/:id" component={DeckEditPage}/>
    <Route path="deckdetail/edit/" component={DeckEditPage}/>
    <Route path="deckdetail/:id/:name" component={DeckDetail}/>

    // ManageMent
    <Route path="banManage/Form" component={BanFormPage}/>
    <Route path="banManage/Form/:id" component={BanFormPage}/>
    <Route path="banManage/List" component={ManBanListPage}/>

    <Route path="cardManage/List" component={ManCardListPage}/>
    <Route path="cardManage/Form/:id" component={ManCardFormPage}/>







    <Route path="*" component={NotFoundPage}/>
  </Route>
);
