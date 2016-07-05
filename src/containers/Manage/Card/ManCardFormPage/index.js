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
    this.changePack = this.changePack.bind(this);
    this.changeType = this.changeType.bind(this);
    this.saveCardDetail = this.saveCardDetail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeEffect = this.changeEffect.bind(this);
    this.changeSerialNumber = this.changeSerialNumber.bind(this);
    this.renderCards = this.renderCards.bind(this);
    this.saveCards = this.saveCards.bind(this);
    this.changeCardNumber = this.changeCardNumber.bind(this);
    this.deleteCards = this.deleteCards.bind(this);
    this.getImage = this.getImage.bind(this);
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
  changePack(e){
    this.props.cardActions.setPack(e.key);
  }
  changeType(e){
    this.props.cardActions.setType(e.key);
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
  saveCards(){
    this.props.cardActions.changeCardsBtnType(ButtonStateEnum.Loading);
    if(this.props.card.edit.card_form.id){
      this.props.cardActions.requestUpdateCards();
    }else{
      this.props.cardActions.requestCreateCards();
    }
  }

  changeName(e){
    this.props.cardActions.setName(e.target.value);
  }
  changeCardNumber(e){
    this.props.cardActions.setCardNumber(e.target.value);
  }
  changeEffect(e){
    this.props.cardActions.setEffect(e.target.value);
  }
  changeSerialNumber(e){
    this.props.cardActions.setSerialNumber(e.target.value);
  }
  selectCards(e){
    this.props.cardActions.setCardForm(e);
  }
  renderCards(data){
    let typeName = this.props.card.edit.types.filter(type => type.key === data.type_id)[0];
    if(typeName){
      typeName= typeName.value
    }
    return(
      <li key={data.id} onClick={()=>this.selectCards(data)}>
          <img src={data.image_url}/>
          <span className="type">{typeName}</span>
          <p>{data.number}</p>
          <p><Icon name='cloud-upload' size='2x'/></p>
      </li>
    )
  }
  deleteCards(){
    this.props.cardActions.changeCardsDeleteBtnType(ButtonStateEnum.Loading);
    this.props.cardActions.requestDeleteCards();
  }
  getImage(){
    this.props.cardActions.changeCardsParseBtnType(ButtonStateEnum.Loading);
    this.props.cardActions.requestGetImage();
  }
  render(){
    const {edit} = this.props.card;
    const propValue = edit.property_id ? edit.property_id : -1;
    const kindValue = edit.kind_id ? edit.kind_id : -1;
    const levelValue = edit.level_id ? edit.level_id : -1;
    const raceValue = edit.race_id ? edit.race_id : -1;
    const typeValue = edit.card_form.type_id ? edit.card_form.type_id  : -1;
    const packValue = edit.card_form.pack_id ? edit.card_form.pack_id  : -1;
    const showDeleteSty = edit.card_form.id ? {}:{display:'none'};

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
            {edit.cards.map(this.renderCards)}
          </ul>
        </div>
        <div className="edit-cards">
          <input onChange={this.changeCardNumber} className="name input" placeholder="卡號" value={edit.card_form.number} />
            <img src={edit.card_form.image_url}/>
          <DropDown
            getValue={this.changePack}
            style={{width:'100%'}}
            default={packValue}
            values={edit.packs}/>
          <DropDown
            getValue={this.changeType}
            style={{width:'50%'}}
            default={typeValue}
            values={edit.types}/>
          <div>
            <Button
                onClick={this.getImage}
                style={{float:'left'}}
                state={this.props.card.edit.parseImage}
                lIcon="bug"
                value="搜索"
                fail="fail"
                success="success"/>
            <Button
                onClick={this.deleteCards}
                style={{textAlign:'center'},showDeleteSty}
                state={this.props.card.edit.cardsDelete}
                rIcon="trash"
                value="刪除"
                normalSty={{backgroundColor:'red'}}
                fail="fail"
                success="success"/>
            <Button
                onClick={this.saveCards}
                style={{float:'right'}}
                state={this.props.card.edit.card_form}
                rIcon="floppy-o"
                value="存擋"
                fail="fail"
                success="success"/>
          </div>

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
