const path = require('path');

export default {
  entry: 'src/index.js',
  extraBabelPlugins: [
    'dva-hmr',
    ['import', {libraryName: 'antd', style: true}],
  ],
  define: {
    __DEV__: false,
  },
  env: {
    development: {
      publicPath: '/',
      disableCSSSourceMap: true,
      devtool: 'eval',
      ignoreMomentLocale: true,
    },
  },
  alias: {
    Components: path.resolve(__dirname, 'src/components/'),
    components: path.resolve(__dirname, 'src/components/'),
    Utils: path.resolve(__dirname, 'src/utils/'),
    Assets: path.resolve(__dirname, 'src/assets/'),
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/',
  hash: true,
};
