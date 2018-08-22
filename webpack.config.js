const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const { readFileSync } = require('fs');
const packageJson = require('./package.json');
const packageName = packageJson.name;
const libraryName = getLibraryName(packageName);
const versionFileContent = readFileSync(path.resolve(__dirname) + '/src/lib/version.ts', 'utf8');
const version = getVersion(versionFileContent);
const licence = readFileSync(path.resolve(__dirname) + '/LICENCE');

function getLibraryName(packageName) {
  return packageName
    .toLowerCase()
    .split('-')
    .map(chunk => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join('');
}

function getVersion(versionFileContent) {
  const patternStart = '= \'';

  return versionFileContent.substring(
    versionFileContent.indexOf(patternStart) + patternStart.length,
    versionFileContent.indexOf('\';')
  );
}

function getConfig(env) {
  return {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    target: 'web',
    output: {
      filename: '[name].js',
      library: libraryName,
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      globalObject: 'this'
    },
    externals: {
      process: 'process',
      readline: 'readline'
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'demo-browser.html',
        hash: true,
        minify: false,
        template: './src/templates/demo-browser.html',
        excludeAssets: [/^dev.*.js/]
      }),
      new HtmlWebpackExcludeAssetsPlugin(),       // https://stackoverflow.com/a/50830422
      new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(env.DEVELOPMENT === true),
        PRODUCTION: JSON.stringify(env.PRODUCTION === true)
      }),
      new WrapperPlugin({    // TODO: on production build it's not working, all comments are removed
        header: '/*\n' + licence + '*/\n\n'
      })
    ]
  };
}

function fillDev(config) {
  config.mode = 'development';
  config.entry = {
    [`${packageName}-v${version}`]: './src/main.ts',
    [`dev`]: './src/dev.ts'
  };

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/',
    compress: true,
    port: 8000,
    hot: false,
    openPage: 'dist/demo-browser.html',
    overlay: {
      warnings: true,
      errors: true
    }
  };
}

function fillProd(config) {
  config.mode = 'production';
  config.entry = {
    [`${packageName}-v${version}`]: './src/main.ts'
  };

  config.devtool = 'source-map';

  config.plugins.push(
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname) + '/src/templates/demo-node.js',
          to: path.resolve(__dirname) + '/dist/demo-node.js',
          toType: 'file'
        }
      ]
    )
  );
}

module.exports = (env) => {
  const config = getConfig(env);

  if (env.DEVELOPMENT === true) {
    fillDev(config);
  } else if (env.PRODUCTION === true) {
    fillProd(config);
  } else {
    throw 'Please set the environment!';
  }

  return config;
};
