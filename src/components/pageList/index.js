import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import { IndexLink, Link } from 'react-router';

import './index.scss';
class PageList extends React.Component {
  click(page){
    this.props.onClick(page);
  };
  render(){
    const {total, current, showCount,query} = this.props;
    const li = [];
    let count = 0;
    let start =0;
    if(current>Math.floor(showCount/2)){
      start = current-(Math.floor(showCount/2));
    }

    for (let i=start; i <=current; i++) {
      if(i===0)
        continue;
      const href = `/search/${query}/${i}`;
      const style = current === i ? 'active':'';
      li.push(<Link className={style} to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
      count++;
    }

    for (let i=current+1; i <=total; i++) {
      if(count>=showCount)
        break;
      if(i===0)
        continue;
      const href = `/search/${query}/${i}`;
      const style = current === i ? 'active':'';
      li.push(<Link className={style} to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
      count++;
    }
    if(count < showCount){
      for (let i = current-Math.floor(showCount/2)-1; i >0; i--) {
        if(count>=showCount)
          break;
          const href = `/search/${query}/${i}`;
          li.splice(0,0,<Link to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
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
