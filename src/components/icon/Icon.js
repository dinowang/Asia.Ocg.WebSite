import React from 'react';

export default class Icon extends React.Component {
  render() {
    let {
      Component,
      name, size, rotate, flip, spin, fixedWidth, stack, inverse,
      pulse, className, ...props
    } = this.props;
    let classNames = `fa fa-${name}`;
    if (size) {
      classNames = `${classNames} fa-${size}`;
    }
    if (rotate) {
      classNames = `${classNames} fa-rotate-${rotate}`;
    }
    if (flip) {
      classNames = `${classNames} fa-flip-${flip}`;
    }
    if (fixedWidth) {
      classNames = `${classNames} fa-fw`;
    }
    if (spin) {
      classNames = `${classNames} fa-spin`;
    }
    if (pulse) {
      classNames = `${classNames} fa-pulse`;
    }

    if (stack) {
      classNames = `${classNames} fa-stack-${stack}`;
    }
    if (inverse) {
      classNames = `${classNames} fa-inverse`;
    }

    if (className) {
      classNames = `${classNames} ${className}`;
    }
    return <span {...props} className={classNames} />;
  }
}
