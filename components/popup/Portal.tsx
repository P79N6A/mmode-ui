import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  container?: HTMLElement;
  children?: ReactNode;
}

export default class Portal extends React.Component<PortalProps> {

  static defaultProps: PortalProps = {
    container: document.body,
  };
  el: Element;

  constructor(props: PortalProps) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    this.props.container!.appendChild(this.el);
  }

  componentWillUnmount() {
    this.props.container!.removeChild(this.el);
  }

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.el) as ReactNode;
  }
}
