import React, {PropTypes} from 'react';

if (process.env.BROWSER) {
  require('./index.scss');
}

class CardPack extends React.Component {
  renderTable(data, index){
    let tr = data.items.map((items,index)=>{
      return (
        <tr key={index}>
          <td>{items.card_number}</td>
          <td>{items.name}</td>
        </tr>
      );
    });
    return(
      <table key={index}>
        <tbody>
          <tr>
            <th colSpan="2">{data.type}</th>
          </tr>
          {tr}
        </tbody>
      </table>
    );
  }
  render() {
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
