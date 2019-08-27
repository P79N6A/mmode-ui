import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'bisheng/router';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { Row, Col, Icon, AutoComplete, Input } from 'antd';
import * as utils from '../../../../utils';

const { Option } = AutoComplete;
const searchEngine = 'Google';
const searchLink = 'https://www.google.com/#q=site:mobile.ant.design+';

export default class Header extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
  }

  state = {
    inputValue: '',
  };

  componentDidMount() {
    const { searchInput } = this;
    /* eslint-disable global-require */
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 83 && event.target === document.body) {
        searchInput.focus();
      }
    });
    /* eslint-enable global-require */
  }

  handleSearch = (value) => {
    if (value === searchEngine) {
      window.location.href = `${searchLink}${this.state.inputValue}`;
      return;
    }

    const { intl, router } = this.context;
    this.setState({
      inputValue: '',
    }, () => {
      router.push({ pathname: utils.getLocalizedPathname(`${value}/`, intl.locale === 'zh-CN') });
      this.searchInput.blur();
    });
  }

  handleInputChange = (value) => {
    this.setState({
      inputValue: value,
    });
  }
  handleSelectFilter = (value, option) => {
    const optionValue = option.props['data-label'];
    return optionValue === searchEngine ||
      optionValue.indexOf(value.toLowerCase()) > -1;
  }

  handleLangChange = () => {
    const { pathname } = this.props.location;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }

    window.location.href = currentProtocol + currentHref.replace(
      window.location.pathname,
      utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
    );
  }
  handleVersionChange = (url) => {
    const currentUrl = window.location.href;
    const currentPathname = window.location.pathname;
    window.location.href = currentUrl.replace(window.location.origin, url)
      .replace(currentPathname, utils.getLocalizedPathname(currentPathname));
  }
  render() {
    const { inputValue } = this.state;
    const {
      picked, isFirstScreen, themeConfig,
    } = this.props;
    const { components } = picked;

    const { locale } = this.context.intl;
    const isZhCN = true;
    const excludedSuffix = isZhCN ? 'en-US.md' : 'zh-CN.md';
    const options = components
      .filter(({ meta }) => !meta.filename.endsWith(excludedSuffix))
      .map(({ meta }) => {
        const pathSnippet = meta.filename.split('/')[1];
        const url = `/components/${pathSnippet}`;
        const { subtitle } = meta;
        return (
          <Option value={url} key={url} data-label={`${(meta.title || meta.english).toLowerCase()} ${meta.subtitle || meta.chinese}`}>
            <strong>{meta.title || meta.english}</strong>
            {subtitle && <span className="ant-component-decs">{meta.subtitle || meta.chinese}</span>}
          </Option>
        );
      });
    options.push(
      <Option key="searchEngine" value={searchEngine} data-label={searchEngine}>
        <FormattedMessage id="app.header.search" />
      </Option>);

    const headerClassName = classNames({
      clearfix: true,
      'home-nav-white': !isFirstScreen
    });

    const searchPlaceholder = locale === 'zh-CN' ? '搜索组件...' : 'Search Components...';
    return (
      <header id="header" className={headerClassName}>
        <Row>
          <Col xxl={4} xl={5} lg={5} md={8} sm={24} xs={24}>
            <Link to={utils.getLocalizedPathname('/', isZhCN)} id="logo">
              <span>{themeConfig.siteTitle}</span>
            </Link>
          </Col>
          <Col xxl={20} xl={19} lg={19} md={16} sm={0} xs={0}>
            <div id="search-box">
              <Icon type="search" />
              <AutoComplete
                dataSource={options}
                value={inputValue}
                dropdownClassName="component-select"
                placeholder={searchPlaceholder}
                optionLabelProp="data-label"
                filterOption={this.handleSelectFilter}
                onSelect={this.handleSearch}
                onSearch={this.handleInputChange}
                getPopupContainer={trigger => trigger.parentNode}
              >
                <Input ref={ref => this.searchInput = ref} />
              </AutoComplete>
            </div>
          </Col>
        </Row>
      </header>
    );
  }
}
