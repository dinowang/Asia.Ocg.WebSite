import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import * as actions from '../../../../actions/banActions';
import SwitchButton from '../../../../components/switchButton';
import DropDown from '../../../../components/dropdown';
import Button from '../../../../components/button';
import ButtonStateEnum from '../../../../enums/buttonStateEnum';
import SearchListPanel from '../../../../components/searchListPanel';
import BanListText from '../../../../components/banlistText';
import BanTypeEnum from '../../../../enums/banTypeEnum';

import './index.scss';

export const BanFormPage = (props) => {
  const createBtn =()=>{
  };
  const onDateChange = (e)=>{
    props.actions.changeBanDate(e);
  };
  const dropValue = (e)=>{
    props.actions.setBanType(e.key);
  };
  const panelOnClick = (cardData)=>{
    if(props.ban.banform.type >=0){
      props.actions.addToList(cardData);
    }
  };
  const save = ()=>{
    props.actions.changeBtnType(ButtonStateEnum.Loading)

    props.actions.requestCreateBan();
  };
  let onChangeEvent;
  const searchOnChange = (value)=>{
    value = value.toUpperCase();
    clearTimeout(onChangeEvent);
    onChangeEvent = setTimeout(()=>{
      props.actions.requestSearch(value);
    },500);

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
  <DropDown style={{top:'1px'}} getValue={dropValue} default={-1} values={[{key:-1,value:'請選擇'},{key:BanTypeEnum.Ban,value:'禁止'},{key:BanTypeEnum.Limit,value:'限制'},{key:BanTypeEnum.PreLimit,value:'準限制'}]}/>
          <SwitchButton style={switchStyle}/>
          <Button onClick={save} style={{float:'right',top:'5px'}} state={props.ban.sumbitBtn} rIcon="floppy-o" value="存擋" fail="fail" success="success"/>

        <hr/>
        <div className="data">
          <BanListText data={props.ban.banform}/>
        </div>
      </div>
      <div className="search-list">
        <SearchListPanel itemOnClick={panelOnClick} onChange={searchOnChange} data={props.ban.searchForm.list}/>
      </div>
    </div>
  );
};

BanFormPage.propTypes = {
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
)(BanFormPage);
