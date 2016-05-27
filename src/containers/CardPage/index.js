import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class CardPage extends React.Component {
  render(){
    const { search, actions } = this.props;
    return (
      <div className="card">
        div
      </div>
    );
  }
}

CardPage.propsTypes ={
  search:PropTypes.object
};

function mapStateToProps(state) {
  return {
    search: state.search
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
)(CardPage);
