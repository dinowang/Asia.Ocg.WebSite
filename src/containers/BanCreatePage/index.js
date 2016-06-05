import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../actions/banActions';
import SwitchButton from '../../components/switchButton';
import DropDown from '../../components/dropdown';
import Button from '../../components/button';
import ButtonStateEnum from '../../enums/buttonStateEnum';
import SearchListPanel from '../../components/searchListPanel';


import './index.scss';
export const BanCreatePage = (props) => {
  const createBtn =()=>{
    props.actions.changeBtnType(ButtonStateEnum.Loading)
  };
  const onDateChange = (e)=>{
    props.actions.changeDate(e);
  };
  const dropValue = (e)=>{
    console.log('drovalue',e)
  };
  const switchStyle = {top:"10px"};
  return (
    <div className="bancreate-page">
      <div className="form">
        <input type="text" placeholder="禁卡表名稱"/>
          <DatePicker
    dateFormat="YYYY/MM/DD"
    selected={props.ban.banform.date}
    onChange={onDateChange} />
  <DropDown style={{top:'1px'}} getValue={dropValue} default={0} values={[{key:0,value:'請選擇'},{key:1,value:'禁止'},{key:2,value:'限制'},{key:3,value:'準限制'}]}/>
          <SwitchButton style={switchStyle}/>
            <Button style={{float:'right',top:'5px'}} state={props.ban.sumbitBtn} onClick={createBtn} rIcon="floppy-o" value="存擋" fail="fail" success="success"/>

        <hr/>
        <div className="data">

        </div>
      </div>
      <div className="list">
        <SearchListPanel data={props.ban.searchForm.list}/>
      </div>
    </div>
  );
};

BanCreatePage.propTypes = {
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
)(BanCreatePage);
