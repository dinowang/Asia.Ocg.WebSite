import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';
class PageList extends React.Component {
  click(page){
    this.props.onClick(page);
  };
  render(){
    const {total, current, showCount} = this.props;
    const li = [];
    let count = 0;
    let start =0;
    if(current>Math.floor(showCount/2)){
      start = current-(Math.floor(showCount/2));
    }

    for (let i=start; i <=current; i++) {
      if(i===0)
        continue;
      const href = `#${i}`;
      const style = current === i ? 'active':'';
      li.push(<li key={i} className={style} onClick={()=>this.click(i)}>{i}</li>);
      count++;
    }

    for (let i=current+1; i <=total; i++) {
      if(count>=showCount)
        break;
      if(i===0)
        continue;
      const href = `#${i}`;
      const style = current === i ? 'active':'';
      li.push(<li key={i} className={style} onClick={()=>this.click(i)}>{i}</li>);
      count++;
    }
    if(count < showCount){
      for (let i = current-Math.floor(showCount/2)-1; i >0; i--) {
        if(count>=showCount)
          break;
        const href = `#${i}`;
        li.splice(0,0,<li key={i+'c'} onClick={()=>this.click(i)}>{i}</li>);
        count++;

      }
    }
    const prevStyle = current-1 <=0 ? 'disabled' : '';
    const nextStyle = current+1 >total ? 'disabled' : '';

    return(
      <div className="page-list">
        <ul>
          <li className={prevStyle} onClick={prevStyle===''?()=>this.click(current-1):''}><Icon name="angle-double-left"/></li>
          {li}
          <li className={nextStyle} onClick={nextStyle===''?()=>this.click(this.props.current+1):''}><Icon name="angle-double-right"/></li>
        </ul>
      </div>
    );
  }
}
PageList.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showCount: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default PageList;
