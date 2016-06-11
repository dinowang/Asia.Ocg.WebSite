import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import {Icon} from "react-fa";
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../../../actions/banActions';
import {Link} from 'react-router';

import './index.scss';

export const BanListPage = (props) => {
  const renderData = (data, index) => {
    const href = `/banManage/Form/${data.id}`
    const enableStyle = data.enable ? {backgroundColor:'#00a65a'} :{backgroundColor:'#dd4b39'};
    return (
      <tr key={index}>
        <td>{data.name}</td>
        <td>{data.date}</td>
        <td style={enableStyle}>{data.enable}</td>
        <td>{data.ban}</td>
        <td>{data.limit}</td>
        <td>{data.prelimit}</td>
        <td className="group">
          <Link to={href}>
            <Icon name="pencil"/>
          </Link>
          <Icon name="trash-o"/>
        </td>

      </tr>
    )
  };
  return (
    <div className="banlist-page">
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
            {props.ban.list.map(renderData)}

          </tbody>
        </table>
      </div>
    </div>
  );
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
