import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {Link} from 'react-router';
import { asyncConnect } from 'redux-async-connect';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {
  Icon,
  Button,
  DropDown
} from '../../components';
import * as packActions from '../../actions/packActions';
import * as appActions from '../../actions/appActions';
import ButtonStateEnum from '../../enums/buttonStateEnum';
import PermissionEnum from '../../enums/PermissionEnum';

if (process.env.BROWSER) {
  require('./index.scss');
  require('react-datepicker/dist/react-datepicker.css');
}

@asyncConnect([{
  promise: async ({params,store: {dispatch,getState},location}) => {
    let {group} = params;
    await dispatch(packActions.requestPackList());
    if(group){
      await dispatch(packActions.setPack(group));
    }

    dispatch(appActions.setTitle('卡表區'));
    dispatch(appActions.setDescription('最完整的遊戲王卡表'));
    dispatch(appActions.setImage(''));
    dispatch(appActions.setUrl(location.pathname));
  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PackListPage extends React.Component {
  constructor(){
    super();
    this.renderData = this.renderData.bind(this);
    this.renderList = this.renderList.bind(this);
    this.changePack = this.changePack.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.renderPackItem = this.renderPackItem.bind(this);
    this.renderClass = this.renderClass.bind(this);
    this.renderGroupList = this.renderGroupList.bind(this);
    this.changePackGroupName = this.changePackGroupName.bind(this);
    this.submitPackGroup = this.submitPackGroup.bind(this);
    this.renderListEdit = this.renderListEdit.bind(this);
    this.clickGroupForm = this.clickGroupForm.bind(this);
    this.deletePackGroup = this.deletePackGroup.bind(this);
    this.onChangeNumber = this.onChangeNumber.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.go = this.go.bind(this);
  }
  componentWillMount(){

    this.props.packActions.requestPackList();
    const {group} = this.props.params;
    if(group){
      this.props.packActions.setPack(group);
    }else{
      this.props.packActions.setPack('');
    }
    this.props.appActions.setTitle('卡表區');

  }
  componentWillUpdate(nextProps){
    if(!nextProps.params.group){
      if(nextProps.params.group !== this.props.params.group){
        this.props.packActions.setPack('');
      }
    }
  }
  changePack(name){
    this.props.packActions.setPack(name);
  }
  renderList(data){
    const href = `/pack/${data.value}`
    const key = `${data.value}-list`
    return(
      <li key={key}>
        <Link onClick={()=>this.changePack(data.value)} to={href}>
          <Icon name="link"/>
          {data.value}
        </Link>
      </li>
    )
  }
  clickGroupForm(data){
    const packGroup = {
      id: data.key,
      name:data.value
    }
    this.props.packActions.setPackGroup(packGroup);
  }
  moveUp(key){
    this.props.packActions.setPackUp(key);
    this.props.packActions.requestUpdatePackGroupSort();

  }
  moveDown(key){
    this.props.packActions.setPackDown(key);
    this.props.packActions.requestUpdatePackGroupSort();
  }
  renderListEdit(data){
    const key = `${data.value}-list`
    return(
      <div className="packgroup-edit">
        <Icon name="arrow-up" onClick={()=>this.moveUp(data.key)} />
        <li draggable={true} value={data.key} key={key} onClick={()=>this.clickGroupForm(data)}>
            {data.value}
        </li>
        <Icon name="arrow-down" onClick={()=>this.moveDown(data.key)} />
      </div>
    )
  }
  renderClass(){
    if(this.props.pack.isEdit === true){
      return (
        <tr>
          <th>卡包名稱</th>
          <th style={{width:'15%'}}>卡號</th>
          <th style={{width:'20%'}}>發售日</th>
          <th>分類</th>
          <th style={{width:'10%'}}>別名</th>
        </tr>
      )
    }else{
      return(
        <tr>
          <th>別名</th>
          <th>卡號</th>
          <th>卡包名稱</th>
          <th>發售日</th>
        </tr>
      )
    }
  }
  renderData(data){
    return(
      <div key={data.value}>
        <h1>{data.value}</h1>
          <table>
            <tbody>
              {this.renderClass()}
              {data.items.map((item)=>this.renderPackItem(item,data))}
            </tbody>
          </table>
      </div>
    )
  }
  onDateChange(groupId,data,date){
    data.date =  moment(date).format('YYYY.MM.DD');
    this.props.packActions.editPack({groupId:groupId,data:data});
    const updateData = {
      id:data.id,
      date:data.date
    }
    this.props.packActions.requestUpdatePack(updateData);
  }
  onChangeNumber(groupId,data,e){
    data.number = e.target.value;
    this.props.packActions.editPack({groupId:groupId,data:data});
    const updateData = {
      id:data.id,
      number:data.number
    }
    this.props.packActions.requestUpdatePack(updateData);
  }
  onChangeName(groupId,data,e){
    data.pack_name = e.target.value;
    this.props.packActions.editPack({groupId:groupId,data:data});
    const updateData = {
      id:data.id,
      name:data.pack_name
    }
    this.props.packActions.requestUpdatePack(updateData);
  }
  onDropDwonDate(e,data){
    const updateData = {
      id:data.id,
      pack_group_id:e.key
    }
    this.props.packActions.requestUpdatePack(updateData);
  }
  onChangeNickName(groupId,data,e){
    data.nick_name = e.target.value;
    this.props.packActions.editPack({groupId:groupId,data:data});
    const updateData = {
      id:data.id,
      nick_name:data.nick_name
    }
    this.props.packActions.requestUpdatePack(updateData);
  }
  renderPackItem(data,groupData){
    const showDate = data.date? moment(data.date) :moment();
    const groupId = groupData.key;
    if(this.props.pack.isEdit === true){
      return(
        <tr key={data.id} className="item">
          <td><input onChange={(e)=>this.onChangeName(groupId,data,e)} value={data.pack_name}/></td>
          <td><input onChange={(e)=>this.onChangeNumber(groupId,data,e)} value={data.number}/></td>
          <td><DatePicker
              dateFormat="YYYY/MM/DD"
              selected={showDate}
              onChange={(date)=>this.onDateChange(groupId,data,date)} />
          </td>
          <td>
            <DropDown
              getValue={(e)=>this.onDropDwonDate(e,data)}
              style={{top:'1px',width:"20%"}}
              default={groupId}
              values={this.props.pack.group}/>
          </td>
          <td><input onChange={(e)=>this.onChangeNickName(groupId,data,e)} value={data.nick_name}/></td>
        </tr>
      )
    }else{
      const h1 = `${data.number? data.number :''}${data.nick_name ? `-${data.nick_name}`:''}-${data.pack_name}`
      const g= `/pack/${groupData.value}/${data.id}/${h1}`
      return(
        <tr key={data.pack_name} className="item" onClick={()=>this.go(g)}>

          <td>{data.nick_name}</td>
          <td>{data.number}</td>
          <td className="name">
            <Link to={g}>
              {data.pack_name}
            </Link>
          </td>
          <td>{showDate.format('YYYY.MM.DD')}</td>
        </tr>
      )
    }
  }
  go(href){
    this.props.nav.push(href);
  }
  changeMode(){
    this.props.packActions.setEditMode();
  }
  changePackGroupName(e){
    this.props.packActions.setPackGroupName(e.target.value);
  }
  submitPackGroup(){
    this.props.packActions.changeBtnType(ButtonStateEnum.Loading);
    if(this.props.pack.groupForm.id === 0){
      this.props.packActions.requestCreatePackGroup();
    }else{
      this.props.packActions.requestUpdatePackGroup();
    }
  }
  deletePackGroup(){
    this.props.packActions.requestDeletePackGroup();
  }
  renderGroupList(){
    const {isEdit, groupForm, group} = this.props.pack;
    const buttonValue = groupForm.id === 0 ? '新增' : '更新';
    if(isEdit === true){
      return(
        <ul className="edit">
          <input value={groupForm.name} onChange={this.changePackGroupName} placeholder="分類名稱" style={{width:'90%',textAlign:'center'}}/>
          <Button onClick={this.submitPackGroup}
            style={{display:'inline-block',margin:'10px 2px'}}
            state={this.props.pack}
            lIcon="pencil"
            value={buttonValue}
            fail="fail"
            success="success"/>
          <Button onClick={this.deletePackGroup}
              style={{display:'inline-block',margin:'10px 2px'}}
              state={this.props.pack}
              lIcon="trash"
              value="刪除"
              fail="fail"
              success="success"/>
          {group.map(this.renderListEdit)}
        </ul>
      )
    }else{
      return (
        <ul>
          <Link onClick={()=>this.changePack('')} to='/pack'>
            <Icon name="tasks"/>
            全部
          </Link>
          {this.props.pack.group.map(this.renderList)}
        </ul>
      )
    }
  }
  render(){
    const current_pack = this.props.pack.current_pack;
    const packList = current_pack === ''? this.props.pack.group : this.props.pack.group.filter((data)=>data.value===current_pack);
    const adminStyle = this.props.user.privilege === PermissionEnum.Admin ? {display:'block',float:'right',margin:'5px'}:{display:'none'};

    return (
      <div className="packlist-page">
          <div className="data">
            <Button onClick={this.changeMode}
              style={adminStyle}
              state={{sumbitBtn:ButtonStateEnum.None}}
              lIcon="pencil"
              value="修改"
              fail="fail"
              success="success"/>
            {packList.map(this.renderData)}
          </div>
          <div className="list">
            <h3>分類</h3>
            {this.renderGroupList()}

          </div>
      </div>
    );
  }
}

PackListPage.propTypes ={
  banActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pack: state.pack,
    user: state.user,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    packActions: bindActionCreators(packActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}
