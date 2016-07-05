import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DatePicker from 'react-datepicker';
import {Icon} from "react-fa";
import {Link} from 'react-router';
import moment from 'moment';
import Button from '../../../../components/button';
import * as appActions from '../../../../actions/appActions';
import * as cardActions from '../../../../actions/cardActions';
import DropDown from '../../../../components/dropdown';
import ButtonStateEnum from '../../../../enums/buttonStateEnum';
import './index.scss';

class ManCardFormPage extends React.Component {
  constructor(){
    super();
    this.changeProperty = this.changeProperty.bind(this);
    this.changeKind = this.changeKind.bind(this);
    this.changeLevel = this.changeLevel.bind(this);
    this.changeRace = this.changeRace.bind(this);
    this.changeAttack = this.changeAttack.bind(this);
    this.changeDefence = this.changeDefence.bind(this);
    this.saveCardDetail = this.saveCardDetail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEffect = this.changeEffect.bind(this);
    this.changeSerialNumber = this.changeSerialNumber.bind(this);
  }
  componentWillMount(){
    let {id} = this.props.params;
    let {cardActions} = this.props;
    cardActions.setCardDetailId(id);
    if(this.props.user.token){
      cardActions.requestCardEdit();
    }else{
      this.props.appActions.requestGetInfo([cardActions.requestCardEdit]);
    }
  }
  changeKind(e){
    this.props.cardActions.setKind(e.key);
  }
  changeProperty(e){
    this.props.cardActions.setProperty(e.key);
  }
  changeLevel(e){
    this.props.cardActions.setLevel(e.key);
  }
  changeRace(e){
    this.props.cardActions.setRace(e.key);
  }
  changeAttack(e){
    this.props.cardActions.setAttack(e.target.value);
  }
  changeDefence(e){
    this.props.cardActions.setDefence(e.target.value);
  }
  saveCardDetail(){
    this.props.cardActions.changeCardDetailBtnType(ButtonStateEnum.Loading);
    if(this.props.card.edit.serial_number){
      this.props.cardActions.requestUpdateCardDetail();
    }else{
      // this.props.actions.requestCreateBan(this.props.nav);
    }
  }
  changeName(e){
    this.props.cardActions.setName(e.target.value);
  }
  changeEffect(e){
    this.props.cardActions.setEffect(e.target.value);
  }
  changeSerialNumber(e){
    this.props.cardActions.setSerialNumber(e.target.value);
  }
  render(){
    const {edit} = this.props.card;
    let propValue = edit.property_id ? edit.property_id : -1;
    let kindValue = edit.kind_id ? edit.kind_id : -1;
    let levelValue = edit.level_id ? edit.level_id : -1;
    let raceValue = edit.race_id ? edit.race_id : -1;
    let isMonsterStyle = propValue >= 8 ? {display:'none'} :{};
    return (
      <div className="mancardform-page">
        <input onChange={this.changeName} className="name" placeholder="卡片名稱" value={edit.name} />
        <textarea  onChange={this.changeEffect} className="effect" placeholder="卡片效果" value={edit.effect} />
        <div className="drop-info">
          <input onChange={this.changeSerialNumber} className="name input" placeholder="卡片名稱" value={edit.serial_number} />
          <div className="col">
            <span>屬性</span>
            <DropDown
              getValue={this.changeProperty}
              style={{width:'65%'}}
              default={propValue}
              values={edit.propertys}/>
          </div>
          <div className="col">
            <span>種類</span>
            <DropDown
              getValue={this.changeKind}
              style={{width:'65%'}}
              default={kindValue}
              values={edit.kinds}/>
          </div>
          <div className="col" style={isMonsterStyle}>
            <span>等級</span>
            <DropDown
              getValue={this.changeLevel}
              style={{width:'65%'}}
              default={levelValue}
              values={edit.levels}/>
          </div>
          <div className="col" style={isMonsterStyle}>
            <span>種族</span>
            <DropDown
              getValue={this.changeRace}
              style={{width:'65%'}}
              default={raceValue}
              values={edit.races}/>
          </div>
          <input style={isMonsterStyle} onChange={this.changeAttack} className="name input" placeholder="攻擊力" value={edit.attack} />
          <input style={isMonsterStyle} onChange={this.changeDefence} className="name input" placeholder="守備力" value={edit.defence} />
          <Button
            onClick={this.saveCardDetail}
            style={{float:'right',top:'5px'}}
            state={this.props.card.edit}
            rIcon="floppy-o"
            value="存擋"
            fail="fail"
            success="success"/>


        </div>
        <div className="card-image">
          <ul>
            <li>
              <img src=""/>
              <p><Icon name='cloud-upload' size='2x'/></p>
            </li>
            <li>
              <img src=""/>
              <p><Icon name='cloud-upload' size='2x'/></p>
            </li>
          </ul>
        </div>
        <div className="edit-cards">
          <DropDown
            getValue={this.changeKind}
            style={{width:'100%'}}
            default={-1}
            values={edit.packs}/>
            <DropDown
              getValue={this.changeKind}
              style={{width:'100%'}}
              default={-1}
              values={edit.types}/>
        </div>
      </div>
    );
  }
};

ManCardFormPage.propTypes = {
  search: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    search: state.search,
    card: state.card,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
    cardActions: bindActionCreators(cardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManCardFormPage);
