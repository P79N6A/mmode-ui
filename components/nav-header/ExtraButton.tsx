import _ from 'lodash';
import React, { ReactNode } from 'react';
import Menu, { MenuProps } from '../menu';
import { Prefix } from '../config-provider/PropsTypes';

export interface ExtraButtonProps {
  text?: ReactNode;
  icon?: ReactNode;
  menu?: MenuProps;
  prefixCls?: string;
  onClick?: (e: React.MouseEvent) => void;
};

export default class ExtraButton extends React.Component<ExtraButtonProps> {
  static defaultProps = {
    text: '',
    onClick: () => { },
  };

  onClick = (e: React.MouseEvent) => {
    if (_.isFunction(this.props.onClick)) {
      this.props.onClick!(e);
    }
  }

  render() {
    const { text = '', icon, menu, prefixCls } = this.props;
    const btnCls = `${ prefixCls }-button`;
    const Icon = <a className={btnCls} onClick={this.onClick} >{icon}</a>;
    const Button = (
      <a className={`${ Prefix }-button ${ btnCls }`} onClick={this.onClick} >
        {text}
      </a>
    );
    const btn = icon ? Icon : Button;

    if (!menu) return btn;

    return <Menu {...menu}>{btn}</Menu>;
  }
}
