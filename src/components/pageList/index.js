import React, {PropTypes} from 'react';
import {Icon} from 'react-fa';
import {Link} from 'react-router';

import './index.scss';
class PageList extends React.Component {
  click(page){
    this.props.onClick(page);
  }
  render(){
    const {totalPage, current, showCount, query, url, hideText} = this.props;
    const li = [];
    let count = 0;
    let start =0;
    if(current>Math.floor(showCount/2)){
      start = current-(Math.floor(showCount/2));
    }

    for (let i=start; i <=current; i++) {
      if(i===0)
        continue;
      const href = `${url}${query}/${i}`;
      li.push(<Link activeClassName="active" to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
      count++;
    }

    for (let i=current+1; i <=totalPage; i++) {
      if(count>=showCount)
        break;
      if(i===0)
        continue;
      const href = `${url}${query}/${i}`;
      li.push(<Link activeClassName="active" to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
      count++;
    }
    if(count < showCount){
      for (let i = current-Math.floor(showCount/2)-1; i >0; i--) {
        if(count>=showCount)
          break;
          const href = `${url}${query}/${i}`;
          li.splice(0,0,<Link to={href} key={i} onClick={()=>this.click(i)}>{i}</Link>);
          count++;
      }
    }
    const prevStyle = current-1 <=0 ? 'disabled' : null;
    const nextStyle = current+1 >totalPage ? 'disabled' : null;
    const prevHref =  prevStyle ? `${url}${query}/${current}`:`${url}${query}/${current-1}`;
    const nextHref = nextStyle ? `${url}${query}/${current}`: `${url}${query}/${current+1}`;
    const spanStyle = hideText ? {display:'none'} :{};
    return(
      <div className="page-list">
          <span style={spanStyle}>{this.props.totalCount} 筆,共 {this.props.totalPage} 頁</span>
        <ul>
          <Link to={prevHref} className={prevStyle} onClick={prevStyle===null?()=>this.click(current-1):null}><Icon name="angle-double-left"/></Link>
          {li}
          <Link to={nextHref} className={nextStyle} onClick={nextStyle===null?()=>this.click(this.props.current+1):null}><Icon name="angle-double-right"/></Link>
        </ul>
      </div>
    );
  }
}
PageList.propTypes = {
  current: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  showCount: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  totalCount: PropTypes.number,
  query: PropTypes.string.isRequired
};

export default PageList;
