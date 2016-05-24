import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import './index.scss';
class PageList extends React.Component {

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
      li.push(<li key={i} className={style}><a href={href}>{i}</a></li>);
      count++;
    }

    for (let i=current+1; i <=total; i++) {
      if(count>=showCount)
        break;
      if(i===0)
        continue;
      const href = `#${i}`;
      const style = current === i ? 'active':'';
      li.push(<li key={i} className={style}><a href={href}>{i}</a></li>);
      count++

    }
    if(count < showCount){
      for (let i = current-Math.floor(showCount/2)-1; i >0; i--) {
        if(count>=showCount)
          break;
        const href = `#${i}`;
        li.splice(0,0,<li key={i+'c'}><a href={href}>{i}</a></li>);
        count++;

      }
    }





    return(
      <div className="page-list">
        <ul>
          <li><a href="#"><Icon name="angle-double-left"/></a></li>
          {li}

          <li><a href="#"><Icon name="angle-double-right"/></a></li>

        </ul>
      </div>
    )
  }
}
PageList.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  showCount: PropTypes.number
};

export default PageList;
