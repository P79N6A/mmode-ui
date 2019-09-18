import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Prefix } from '../config-provider/PropsTypes';

export interface MenuItemProps {
  index: number,
  icon?: ReactNode;
  children?: ReactNode;
  onClick?: (e: React.MouseEvent, index: number) => void
}

export default class MenuItem extends React.Component<MenuItemProps> {
  onClick = (e: React.MouseEvent) => {
    const { index, onClick } = this.props;

    if (_.isFunction(onClick)) {
      onClick(e, index);
    }
  }

  render() {
    const { icon, children } = this.props;
    const prefixCls = `${ Prefix }-menu-item`;

    return (
      <div className={prefixCls} onClick={this.onClick}>
        <span className={`${ prefixCls }-icon`}>{icon}</span>
        <span className={`${ prefixCls }-content`}>{children}</span>
      </div>
    );
  }
}
