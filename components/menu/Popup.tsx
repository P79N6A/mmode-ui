import _ from 'lodash';
import React, { ReactElement } from 'react';
import Popup from '../popup';
import InlineMenu from './Inline';
import { BaseMenuProps } from './PropsTypes';

export default class PopupMenu extends React.Component<BaseMenuProps> {
  state = {
    open: false,
  };

  onOpenChange = (open?: boolean) => {
    if (_.isUndefined(open)) {
      open = !this.state.open;
    }

    this.setState({ open });
  }

  onItemClick = (row: number, col: number) => {
    const { onSelect } = this.props;

    this.onOpenChange(false);

    if (_.isFunction(onSelect)) {
      onSelect(row, col);
    }
  }

  render() {
    const { children, items, horizontal } = this.props;
    const child = React.Children.only(children);

    return (
      <React.Fragment>
        {React.Children.map(child, (c: ReactElement<any>) => {
          return React.cloneElement(c, {
            ...c.props,
            onClick: (e: React.MouseEvent) => {
              if (c.props.onClick) {
                c.props.onClick(e);
              }
              this.onOpenChange();
            },
          })
        })}
        <Popup
          visible={this.state.open}
          onVisibleChange={this.onOpenChange}
          footer={horizontal ? null : void 0}
        >
          <InlineMenu
            horizontal={horizontal}
            items={items}
            onSelect={this.onItemClick}
          />
        </Popup>
      </React.Fragment >
    );
  }
}
