import React, { ReactNode } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import ExtraButton, { ExtraButtonProps } from './ExtraButton';

export interface NavHeaderProps {
  title: ReactNode,
  subTitle?: ReactNode,
  rightContent?: ReactNode,
  extraBtns?: ExtraButtonProps[],
  onClick: (event: React.MouseEvent) => void
}

export default class NavHeader extends React.Component<NavHeaderProps, any> {
  static defaultProps = {
    title: '',
  }

  renderNavHeader = (props: ConfigConsumerProps) => {
    const { title, subTitle, rightContent, extraBtns = [], onClick } = this.props;
    const prefixCls = props.getPrefixCls('nav-header');

    return (
      <div className={prefixCls} onClick={onClick}>
        <div className={`${ prefixCls }-title`}>{title}</div>
        <div className={`${ prefixCls }-subtitle`}>{subTitle}</div>
        <div className={`${ prefixCls }-right`} onClick={e => e.stopPropagation()}>
          {rightContent ? rightContent :
            extraBtns.map((btn, i) => (
              <ExtraButton prefixCls={prefixCls} key={i} {...btn} />
            ))
          }
        </div>
      </div>
    );
  }

  render() {
    return <ConfigConsumer>{this.renderNavHeader}</ConfigConsumer>;
  }
}
