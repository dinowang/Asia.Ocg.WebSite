import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Helmet from "react-helmet";
import Header from './header';
import Nav from './nav';
import * as actions from '../actions/appActions';
import { asyncConnect } from 'redux-async-connect';
import Breadcrumbs from 'react-breadcrumbs';


@asyncConnect([{
  promise: async ({store: {dispatch}}) => {
    await dispatch(actions.requestGetInfo());
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends React.Component {
  componentWillMount(){
    this.props.actions.requestGetInfo();
  }
  render(){
    const {app} = this.props;
    return(
      <div>
        <Helmet
          title={app.title}
          titleTemplate="%s - AsiaCards(亞洲卡片王)"
          defaultTitle="AsiaCards(亞洲卡片王)"
          meta={app.meta}
          />
        <Header/>
        <Nav/>

        <div className="container">
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
            />
          {this.props.children}

        </div>

      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    login: state.login,
    app: state.app,
    actions:PropTypes.object.isRequired
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}
