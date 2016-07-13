import React, {PropTypes} from 'react';

export default class IconStack extends React.Component {


  render() {
    let {
      className,
      size,
      children,
      ...props
    } = this.props;

    let classNames = ['fa-stack'];

    if (size) {
      classNames.push(`fa-${size}`);
    }

    if (className) {
      classNames.push(className);
    }

    const iconStackClassName = classNames.join(' ');

    return (
      <span {...props} className={iconStackClassName}>
        {children}
      </span>
    );
  }
}
