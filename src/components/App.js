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
  constructor(){
    super();
    this.breadScroll = this.breadScroll.bind(this);
  }
  componentWillUpdate(nextProps){
    console.log(nextProps.children === this.props.children)
    if(nextProps.children !== this.props.children){
      this.props.actions.setBreadcrumbsMode(false);
    }

  }
  breadScroll(e){
    const {scrollTop, scrollHeight, clientHeight} = e.target;
    const {breadcrumbsMode} = this.props.app;
    if(scrollTop > 15){
      if(breadcrumbsMode === false){
        this.props.actions.setBreadcrumbsMode(true);
      }
    }else{
        this.props.actions.setBreadcrumbsMode(false);
    }
  }
  render(){
    const {app} = this.props;
    const bareadStyle = app.breadcrumbsMode === true ? 'breadcrumbs hiden' : 'breadcrumbs';
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

        <div className="container" onScroll={this.breadScroll}>
          <Breadcrumbs
            routes={this.props.routes}
            params={this.props.params}
            wrapperClass={bareadStyle}
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
