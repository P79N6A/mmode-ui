import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Popover } from 'weaver-mobile';
import { Prefix } from '../config-provider/PropsTypes';
import { BaseMenuProps } from './PropsTypes';

const { Item } = Popover;

export default class PopoverMenu extends React.Component<BaseMenuProps> {
  state = {
    visible: false,
  };

  onVisibleChange = (visible: boolean) => {
    this.setState({ visible });
  }

  onSelect = (_node: ReactNode, index: number) => {
    const { onSelect } = this.props;

    this.setState({ visible: false });

    if (_.isFunction(onSelect)) {
      onSelect(index);
    }
  }

  render() {
    const {
      items,
      children,
    } = this.props;
    const Items = items.map(item => (
      <Item
        icon={item.icon}
        className={`${Prefix}-popover-menu-item`}
      >
        {item.label}
      </Item>
    ));

    return (
      <Popover
        mask={false}
        overlay={Items}
        visible={this.state.visible}
        onSelect={this.onSelect}
        onVisibleChange={this.onVisibleChange}
      >
        {children}
      </Popover>
    );
  }
}
