import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Icon} from "react-fa";
import LinkButton from '../../../../components/linkButton';
import * as banActions from '../../../../actions/banActions';
import * as appActions from '../../../../actions/appActions';
import {Link} from 'react-router';
import moment from 'moment';


import './index.scss';

class ManBanListPage extends React.Component {
  constructor(){
    super();
    this.renderData = this.renderData.bind(this);
  }
  componentWillMount(){
    if(this.props.user.token){
      this.props.banActions.requestManageBanList();
    }else{
      this.props.appActions.requestGetInfo([this.props.banActions.requestManageBanList]);
    }
  }
  delete(e){
    this.props.banActions.requestManageDeleteBan(e);
  }
  renderData(data, index) {
    const href = `/banManage/form/${data.id}`
    const enableStyle = data.enable ? {backgroundColor:'#00a65a'} :{backgroundColor:'#dd4b39'};
    const date = moment(data.date).format("YYYY.MM.DD");
    return (
      <tr key={index}>
        <td>{data.name}</td>
        <td>{date}</td>
        <td style={enableStyle}>{data.enable}</td>
        <td>{data.ban}</td>
        <td>{data.limit}</td>
        <td>{data.prelimit}</td>
        <td className="group">
          <Link to={href}>
            <Icon name="pencil"/>
          </Link>
          <Icon onClick={()=>this.delete(data.id)} name="trash-o"/>
        </td>

      </tr>
    )
  }
  render(){
    return (
      <div className="manbanlist-page">
        <div className="fun-bar">
          <LinkButton value="新增" to="/banManage/form" lIcon="plus-square-o"/>
        </div>
        <div className="list">
          <table>
            <tbody>
              <tr>
                <th>顯示名稱</th>
                <th>禁卡表日期</th>
                <th>狀態</th>
                <th>限制</th>
                <th>禁止</th>
                <th>準限制</th>
                <th></th>
              </tr>
              {this.props.ban.list.map(this.renderData)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ManBanListPage.propTypes = {
  banActions: PropTypes.object.isRequired,
  ban: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ban: state.ban,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    banActions: bindActionCreators(banActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManBanListPage);
