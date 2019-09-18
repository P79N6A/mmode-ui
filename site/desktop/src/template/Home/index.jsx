import React from 'react';
import 'react-github-button/assets/style.css';
import { injectIntl } from 'react-intl';
import * as utils from '../../../../utils';

function getStyle() {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      width: 100%;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
  `;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const isZhCN = utils.isZhCN(pathname);
    this.state = {
      isZhCN,
    };
  }

  render() {
    return (
      <div className="main-wrapper">
        <style dangerouslySetInnerHTML={{ __html: getStyle() }} />
      </div>
    );
  }
}

export default injectIntl(Home);
