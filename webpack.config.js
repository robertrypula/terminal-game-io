const webpack = require('webpack');
const path = require('path');
const WrapperPlugin = require('wrapper-webpack-plugin');
const { readFileSync } = require('fs');
const packageJson = require('./package.json');
const packageName = packageJson.name;
const libraryName = getLibraryName(packageName);
const versionFileContent = readFileSync(path.resolve(__dirname) + '/src/version.ts', 'utf8');
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
      extensions: ['.ts','.js']
    },
    target: 'node',
    output: {
      filename: '[name].js',
      library: libraryName,
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist')
    },
    // externals: {
    //   readline: 'readline'
    // },
    plugins: [
      new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(env.DEVELOPMENT === true),
        PRODUCTION: JSON.stringify(env.PRODUCTION === true)
      }),
      new WrapperPlugin({
        header: '/*\n' + licence + '*/\n\n'
      })
    ]
  };
}

function fillDev(config) {
  config.mode = 'development';
  config.entry = {
    [`${packageName}-v${version}`]: './src/index.ts',
    [`demo`]: './src/demo.ts'
  };
}

function fillProd(config) {
  config.mode = 'development';        // TODO check why production mode is not working
  config.entry = {
    [`${packageName}-v${version}.min`]: './src/index.ts'
  };
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
