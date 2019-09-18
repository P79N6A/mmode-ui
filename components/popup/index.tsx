import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Portal from './Portal';
import './style/index.less';

export interface PopupProps {
  container?: HTMLElement;
  mask?: boolean;
  visible: boolean;
  className?: string;
  onVisibleChange?: (visible: boolean) => void;
  children?: ReactNode;
  footer?: ReactNode;
}

export default class Popup extends React.Component<PopupProps> {
  static defaultProps = {
    mask: true,
    visible: false,
    onVisibleChange: () => { },
  };

  hidePopup = () => {
    this.onVisibleChange(false);
  }

  onVisibleChange = (visible: boolean) => {
    this.setState({ visible });
    this.props.onVisibleChange!(visible);
  }

  componentWillReceiveProps(nextProps: PopupProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  renderPopup = (props: ConfigConsumerProps) => {
    const prefixCls = props.getPrefixCls('popup');
    const {
      mask, visible, children,
      className = '',
      footer = (
        <div
          className={`${prefixCls}-cancel-btn`}
          onClick={this.hidePopup}
        >
          取消
        </div>
      ),
    } = this.props;

    if (!visible) return null;

    return (
      <div className={classNames(`${ prefixCls } ${ className }`, { 'no-footer': !footer })}>
        {!mask ? null : <div className={`${ prefixCls }-mask`} onClick={this.hidePopup} />}
        <div className={`${ prefixCls }-main`}>
          <div className={`${ prefixCls }-content`}>{children}</div>
          <div className={`${ prefixCls }-footer`}>{footer}</div>
        </div>
      </div>
    );
  }

  render() {
    const { container } = this.props;

    return (
      <Portal container={container}>
        <ConfigConsumer>{this.renderPopup}</ConfigConsumer>
      </Portal>
    );
  }
}
