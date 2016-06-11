import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import {Icon} from "react-fa";
import LinkButton from '../../../../components/linkButton';
import * as actions from '../../../../actions/banActions';
import {Link} from 'react-router';
import moment from 'moment';


import './index.scss';

class BanListPage extends React.Component {
  constructor(){
    super();
    this.renderData = this.renderData.bind(this);
  }
  componentWillMount(){
    this.props.actions.requestManageBanList();
  }
  delete(e){
    this.props.actions.requestManageDeleteBan(e);

  }
  renderData(data, index) {
    const href = `/banManage/Form/${data.id}`
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
  };
  render(){
    return (
      <div className="banlist-page">
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
};

BanListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ban: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    ban: state.ban
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BanListPage);
