import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
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

class BanFormPage extends React.Component {
  constructor() {
    super();
    this.onDateChange = this.onDateChange.bind(this);
    this.dropValue = this.dropValue.bind(this);
    this.panelOnClick = this.panelOnClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
    this.nameOnChange = this.nameOnChange.bind(this);
    this.onEnableChange = this.onEnableChange.bind(this);

  }
  componentWillMount(){
    let {id} = this.props.params;
    if(id){
      this.props.actions.requestManageBanForm(id);
    }else{
      this.props.actions.fetchInit();
    }
  }
  onDateChange(e){
    this.props.actions.changeBanDate(e);
  }
  onEnableChange(){
    this.props.actions.changeEnable();
  }
  dropValue(e){
    this.props.actions.setBanType(e.key);
  }
  panelOnClick(cardData){
    if(this.props.ban.banform.type >=0){
      this.props.actions.addToList(cardData);
    }
  }
  onClick(){
    this.props.actions.changeBtnType(ButtonStateEnum.Loading);
    if(this.props.ban.banform.id){
      this.props.actions.requestManageUpdateBan();
    }else{
      this.props.actions.requestCreateBan(this.props.nav);
    }
  }
  remove(id){
    this.props.actions.removeItem(id);
  }
  searchOnChange(value){
    value = value.toUpperCase();
    clearTimeout(this.onChangeEvent);
    this.onChangeEvent = setTimeout(()=>{
      this.props.actions.requestSearch(value);
    },500);

  }
  nameOnChange(e){
    this.props.actions.changeName(e.target.value);
  }
  render(){
    const switchStyle = {top:"10px"};
    return (
      <div className="bancreate-page">
        <div className="form">
          <input type="text" placeholder="禁卡表名稱" onChange={this.nameOnChange} value={this.props.ban.banform.name}/>
            <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={this.props.ban.banform.date}
              onChange={this.onDateChange} />
            <DropDown style={{top:'1px'}} getValue={this.dropValue} default={-1} values={[{key:-1,value:'請選擇'},{key:BanTypeEnum.Ban,value:'禁止'},{key:BanTypeEnum.Limit,value:'限制'},{key:BanTypeEnum.PreLimit,value:'準限制'}]}/>
            <SwitchButton onClick={this.onEnableChange} style={switchStyle} checked={this.props.ban.banform.enable}/>
            <Button onClick={this.onClick} style={{float:'right',top:'5px'}} state={this.props.ban} rIcon="floppy-o" value="存擋" fail="fail" success="success"/>

          <hr/>
          <div className="data">
            <BanListText onClick={(e)=>this.remove(e)} data={this.props.ban.banform}/>
          </div>
        </div>
        <div className="search-list">
          <SearchListPanel itemOnClick={this.panelOnClick} onChange={this.searchOnChange} data={this.props.ban.searchForm.list}/>
        </div>
      </div>
    );
  }
}

BanFormPage.propTypes = {
  actions: PropTypes.object.isRequired,
  ban: PropTypes.object.isRequired,
  params: PropTypes.object
};

function mapStateToProps(state) {
  return {
    ban: state.ban,
    nav: browserHistory
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
