import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {Icon} from 'react-fa';
import * as banActions from '../../actions/banActions';
import * as appActions from '../../actions/appActions';
import BanTypeEnum from '../../enums/banTypeEnum';
import './index.scss';

class BanPage extends React.Component {
  componentWillMount(){
    this.props.appActions.setTitle('____禁卡表');
    const {id} = this.props.params;
    this.props.banActions.requestBan(id);
  }
  renderData(data){
    const href = `/card/${data.serial_number}/${data.name}`;
    return(
      <Link key={data.serial_number} to={href}>
        <img src={data.image_url}></img>
      </Link>
    );
  }
  render(){
    const ban = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.Ban);
    const limit = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.Limit);
    const preLimit = this.props.ban.banform.list.filter(data => data.type === BanTypeEnum.PreLimit);
    return (
      <div className="ban-page">
          <h1>2016.04 適用</h1>
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
              <li><Link to="/1"><Icon name="link"/>2016.06</Link></li>
              <li><Link to="/1"><Icon name="link"/>2016.06</Link></li>
              <li><Link to="/1"><Icon name="link"/>2016.06</Link></li>

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
    ban: state.ban
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
