const getWebpackConfig = require('mui-tools/lib/getWebpackConfig');
const getBabelConfig = require('mui-tools/lib/getBabelCommonConfig');

const webpackConfig = getWebpackConfig(false);
const babelConfig = getBabelConfig(false);

babelConfig.plugins.push([
  require.resolve('babel-plugin-import'),
  [
    { 
      libraryName: 'weaver-mobile', 
      libraryDirectory: 'es',
      style: true 
    }
  ],
]);

webpackConfig.forEach(config => {
  config.externals = {
    ...webpackConfig.externals,
    "classnames": "classNames",
    "react": "React",
    "react-dom": "ReactDOM",
    // "weaver-mobile": 'weaver-mobile',
    "lodash": "lodash",
    "prop-types": "PropTypes"
  }
});

module.exports = webpackConfig;