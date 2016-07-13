import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {
  Icon,
  LinkButton
} from "../../../../components";
import * as appActions from '../../../../actions/appActions';

if (process.env.BROWSER) {
  require('./index.scss');
}

class ManCardListPage extends React.Component {
  constructor(){
    super();
  }
  renderData(data, index){
    const href = `/banManage/form/${data.id}`

    return (
        <tr key={index}>
          <td>{data.name}</td>
          <td className="group">
            <Link to={href}>
              <Icon name="pencil"/>
            </Link>
          </td>

        </tr>
    )
  }
  render(){
    return (
      <div className="maincardlist-page">
        <div className="fun-bar">
          <LinkButton value="新增" to="/banManage/form" lIcon="plus-square-o"/>
        </div>
        <div className="list">
          <table>
            <tbody>
              <tr>
                <th>卡片名稱</th>
                <th></th>
              </tr>
              {this.props.search.items.map(this.renderData)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ManCardListPage.propTypes = {
  search: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    search: state.search
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManCardListPage);
