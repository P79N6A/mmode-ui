import React from 'react';
import defaultLocale from '../locale/en_US';
import { Locale } from '../locale';
import { Prefix } from './PropsTypes';

export interface ConfigProviderProps {
  prefixCls?: string;
  locale?: Locale;
  children?: React.ReactNode;
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
};

const ConfigContext = React.createContext({
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => {
    if (customizePrefixCls) return customizePrefixCls;

    return `${Prefix}-${ suffixCls }`;
  },
});

export interface ConfigConsumerProps {
  getLocale: (componentName: string) => Object;
  getPrefixCls: (suffixCls: string, customizePrefixCls?: string) => string;
};

export const ConfigConsumer = ConfigContext.Consumer;

export default class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = Prefix } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${ prefixCls }-${ suffixCls }` : prefixCls;
  };

  getLocale = (componentName: keyof Locale) => {
    const { locale = defaultLocale } = this.props;

    return locale[componentName];
  }

  render() {
    const config = {
      getLocale: this.getLocale,
      getPrefixCls: this.getPrefixCls,
    };

    return (
      <ConfigContext.Provider value={config}>
        {this.props.children}
      </ConfigContext.Provider>
    );
  }
}
