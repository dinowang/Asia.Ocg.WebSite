import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';

class CardPack extends React.Component {
  renderItem(){
    return(
      <tr>
        <td>【補充包】(GS06)黃金系列2014	</td>
        <td>GS06-JP010</td>
      </tr>
    )
  };
  renderTable(data, index){
    let tr = data.items.map((items,index)=>{
      return (
        <tr key={index}>
          <td>{items.name}</td>
          <td>{items.card_number}</td>
        </tr>
      )
    })
    return(
      <table key={index}>
        <tbody>
          <tr>
            <th colSpan="2">{data.type}</th>
          </tr>
          {tr}
        </tbody>
      </table>
    )
  };
  render() {
    console.log(this.props.data,'data')
    return (
      <div className="card-pack">
        {this.props.data.map(this.renderTable)}
      </div>
    );
  }
}
CardPack.propTypes = {
  data: PropTypes.array.isRequired
};
export default CardPack;

// <table>
//   <tbody>
//     <tr>
//       <th colSpan="2">普卡</th>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//   </tbody>
// </table>
// <table>
//   <tbody>
//     <tr>
//       <th colSpan="2">金閃</th>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//     <tr>
//       <td>【補充包】(GS06)黃金系列2014	</td>
//       <td>GS06-JP010</td>
//     </tr>
//   </tbody>
// </table>
