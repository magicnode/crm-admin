'use strict'

// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

let apiUrl = 'http://127.0.0.1:3000'
if (process.env.NODE_ENV === 'production') {
  apiUrl = 'http://192.168.0.201:8890'
}

const ApiStore = {
  characters: {
    all: apiUrl + '/characters?permissions=1',
    CPermission: function (id) {
      return apiUrl + '/characters/' + id + '/permission'
    },
    noauthpermission: function (id) {
      return apiUrl + '/characters/' + id + '/noauthpermission'
    }
  },
  permission: {
    all: apiUrl + '/permission'
  }
}

module.exports = {
  ApiStore,
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.DEV_PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',
    proxyTable: {
      '/MODApis': {
        target: 'http://dev.markitondemand.com',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
