import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { Prefix } from '../config-provider/PropsTypes';
import Item from './Item';
import { BaseMenuProps, MenuItem } from './PropsTypes';

const InlineMenuItem = ({ item, i, onClick }) => (
  <Item key={i} index={i} icon={item.icon} onClick={onClick} >
    {item.label}
  </Item>
);
const Group = ({ group, onClick }) => (
  <div className={`${ Prefix }-menu-group`}>
    {group.map((item, row: number) => {
      if (!item) return <div key={row} />;

      return (
        <InlineMenuItem
          key={row}
          i={row}
          item={item}
          onClick={(_e: React.MouseEvent, col: number) => onClick(col)}
        />
      );
    })}
  </div>
);

export interface InlineMenuProps extends BaseMenuProps {
  row?: number;
  col?: number;
};

export interface InlineMenuStates {
  size: number
};

export default class InlineMenu extends React.Component<InlineMenuProps, InlineMenuStates> {
  static defaultProps: InlineMenuProps = {
    col: 4,
    items: [],
  };

  constructor(props: InlineMenuProps) {
    super(props);

    this.state = {
      size: this.calcSize(props),
    }
  }

  calcSize(props: InlineMenuProps): number {
    const { items, row, col } = props;

    if (_.isUndefined(row)) return 1;

    return Math.ceil(items.length / (row * col!));
  }

  parseToGroups(): MenuItem[][] {
    const { size } = this.state;
    const { items, col } = this.props;
    const len = items.length;
    const groups: MenuItem[][] = [];

    if (!col) return [[]];

    if (1 === size) {
      items.forEach((item, i) => {
        const index = Math.floor(i / col);
        const last = len - 1 === i;

        if (0 === i % col) {
          groups.push([item]);
        } else {
          groups[index].push(item);
        }

        // 需要补全group缺少的item，用于占位(样式需要)
        if (last && i % col < col - 1) {
          const lack = col - 1 - i % col;

          groups[index].push(...Array(lack).fill(''));
        }
      });
    }

    return groups;
  }

  onSelect = (row: number, col: number) => {
    const { onSelect, horizontal } = this.props;

    if (!_.isFunction(onSelect)) return;

    if (!horizontal) {
      return onSelect(col);
    }

    onSelect(row!, col);
  }

  renderItems() {
    const groups = this.parseToGroups();

    return groups.map((group, row) => (
      <Group key={row} group={group} onClick={(col: number) => this.onSelect(row, col)} />
    ));
  }

  renderMenu = (props: ConfigConsumerProps) => {
    const { getPrefixCls } = props;
    const prefixCls = getPrefixCls('menu');
    const { horizontal } = this.props;

    return (
      <div className={classNames(prefixCls, { horizontal })}>
        {this.renderItems()}
      </div>
    );
  }

  render() {
    return <ConfigConsumer>{this.renderMenu}</ConfigConsumer>;
  }
}
