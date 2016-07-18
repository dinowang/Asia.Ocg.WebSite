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


if (process.env.BROWSER) {
  require('./index.scss');
  require('react-datepicker/dist/react-datepicker.css');
}

@asyncConnect([{
  promise: async ({params,store: {dispatch,getState},location}) => {

  }
}])
@connect(mapStateToProps, mapDispatchToProps)
export default class PackPage extends React.Component {
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
  }
  componentWillMount(){

    this.props.packActions.requestPackList();
    const {group} = this.props.params;

    this.props.packActions.setPack(group);
  }
  componentWillUpdate(nextProps){

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
  renderListEdit(data){
    const key = `${data.value}-list`
    return(
      <li key={key} onClick={()=>this.clickGroupForm(data)}>
          {data.value}
      </li>
    )
  }
  renderClass(){
    if(this.props.pack.isEdit === true){
      return (
        <th>分類</th>
      )
    }else{

    }
  }
  renderData(data){
    return(
      <div key={data.value}>
        <h1>{data.value}</h1>
          <table>
            <tbody>
              <tr>
                <th>卡包名稱</th>
                <th>卡號</th>
                <th>發售日</th>
                {this.renderClass()}
              </tr>
              {data.items.map((item)=>this.renderPackItem(item,data.key))}
            </tbody>
          </table>
      </div>
    )
  }
  onDateChange(data,date){
    console.log(data,date,'----')
  }
  renderPackItem(data,groupId){
    const date = moment(data.date);

    if(this.props.pack.isEdit === true){
      return(
        <tr key={data.pack_name} className="item">
          <td><input value={data.pack_name}/></td>
          <td><input value={data.number}/></td>
          <td>  <DatePicker
              dateFormat="YYYY/MM/DD"
              selected={date}
              onChange={(date)=>this.onDateChange(data,date)} />
          </td>
          <td>
            <DropDown
              getValue={this.changeBan}
              style={{top:'1px',width:"20%"}}
              default={groupId}
              values={this.props.pack.group}/>
          </td>
        </tr>
      )
    }else{
      return(
        <tr key={data.pack_name} className="item">
          <td>{data.pack_name}</td>
          <td>{data.number}</td>
          <td>{data.date}</td>
        </tr>
      )
    }
  }
  changeMode(){
    this.props.packActions.setEditMode();
  }
  changePackGroupName(e){
    this.props.packActions.setPackGroupName(e.target.value);
  }
  submitPackGroup(){
    this.props.packActions.changeBtnType(ButtonStateEnum.Loading);
    this.props.packActions.requestCreatePackGroup();
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
          <Link onClick={()=>this.changePack('all')} to='/pack/all'>
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
    const packList = current_pack === 'all'? this.props.pack.group : this.props.pack.group.filter((data)=>data.value===current_pack);
    return (
      <div className="pack-page">
          <div className="data">
            <Button onClick={this.changeMode}
              style={{float:'right',margin:'5px'}}
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

PackPage.propTypes ={
  banActions:PropTypes.object.isRequired,
  appActions:PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pack: state.pack,
    nav: browserHistory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    packActions: bindActionCreators(packActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}
