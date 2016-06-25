import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import * as banActions from '../../actions/banActions';
import * as appActions from '../../actions/appActions';
import BanTypeEnum from '../../enums/banTypeEnum';
import './index.scss';

class BanPage extends React.Component {
  constructor(){
    super();
    this.renderBanList = this.renderBanList.bind(this);
  }
  componentWillMount(){
    const {id} = this.props.params;
    this.props.banActions.requestBanList(id,this.props.nav);
  }
  componentWillUpdate(nextProps){
    this.props.appActions.setTitle(`${nextProps.ban.banform.name}-禁卡表`);
  }
  renderData(data){
    const href = `/card/${data.serial_number}/${data.name}`;
    return(
      <Link key={data.serial_number} to={href}>
        <img src={data.image_url}></img>
      </Link>
    );
  }
  changeBan(data){
        this.props.banActions.requestBan(data.id);
  }
  renderBanList(data){
    const href = `/ban/${data.id}`
    return(
      <li key={data.id}>
        <Link onClick={()=>this.changeBan(data)} to={href}>
          <Icon name="link"/>
          {data.name}
          </Link>
      </li>
    )
  }
  render(){
    const ban = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.Ban);
    const limit = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.Limit);
    const preLimit = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.PreLimit);
    return (
      <div className="ban-page">
          <h1>{this.props.ban.banform.name}</h1>
          <div className="data">
            <p className="title red">禁止</p>
            <div className="list">
              {ban.map(this.renderData)}
            </div>
            <p className="title orange">限制</p>
            <div className="list">
              {limit.map(this.renderData)}
            </div>
            <p className="title blue">準限制</p>
            <div className="list">
              {preLimit.map(this.renderData)}
            </div>
          </div>
          <div className="ban-list">
            <h3>其它禁卡表</h3>
            <ul>
              {this.props.ban.userBanList.map(this.renderBanList)}
            </ul>
          </div>

      </div>
    );
  }
}

BanPage.propTypes ={
  banActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ban: state.ban,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    banActions: bindActionCreators(banActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch),

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanPage);
