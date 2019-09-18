import React from 'react';
import PopoverMenu from './Popover';
import PopupMenu from './Popup';
import { BaseMenuProps } from './PropsTypes';
import './style/index.less';

export interface MenuProps extends BaseMenuProps {
  mode: 'popover' | 'popup';
}

export default class Menu extends React.Component<MenuProps> {
  render() {
    const { mode, children, ...rest } = this.props;

    if ('popover' === mode) {
      return <PopoverMenu {...rest}>{children}</PopoverMenu>;
    }

    return <PopupMenu {...rest}>{children}</PopupMenu>;
  }
}
