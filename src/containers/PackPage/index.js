import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import { asyncConnect } from 'redux-async-connect';

import {
  Icon,
} from '../../components';
import * as packActions from '../../actions/packActions';
import * as appActions from '../../actions/appActions';

if (process.env.BROWSER) {
  require('./index.scss');
  require('react-datepicker/dist/react-datepicker.css');
}

@asyncConnect([{
  promise: async ({params,store: {dispatch,getState},location}) => {

  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PackPage extends React.Component {
  constructor(){
    super();

  }
  componentWillMount(){
    let {id} = this.props.params;
    if(id){
      this.props.packActions.requestPack(id)
    }

  }
  renderCards(data){
    const toHref = `/card/${data.serial_number}/${data.card_name}`
    return (
      <Link to={toHref}>
        <img src={data.image_url}/>
        <p>{data.card_number}</p>
      </Link>
    )
  }

  render(){
    const {pack} = this.props.pack;
    return (
      <div className="pack-page">
        <h1>{pack.pack_name}</h1>
        <div className="list">
          {pack.cards.map(this.renderCards)}
        </div>

      </div>
    );
  }
}

PackPage.propTypes ={
  banActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pack: state.pack,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    packActions: bindActionCreators(packActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}
