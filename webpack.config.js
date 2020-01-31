/*
 * Copyright 2020 Wladimir
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const DotEnv = require('dotenv-webpack');

const devEnv = 'development';
const prodEnv = 'production';

// ENVIRONMENT SPECIFIC PLUGINS
const productionPlugins = [
  /**
   * useful to make an single executable on production
   */
  new webpack.BannerPlugin({
    banner: '#!/usr/bin/env node',
    raw: true,
  }),
];

const developmentPlugins = [];

module.exports = (env) => ({
  entry: {
    server: './src/index.ts',
    /**
     * The Parse Cloud functions
     */
    cloud: './src/parseServer/cloud/main.ts',
  },
  /**
   * defaults to production environment
   */
  mode: env || prodEnv,
  output: {
    filename: '[name].js',
  },
  target: 'node',
  node: {
    /**
     * To prevent webpack to replace '__dirname' with '/'.
     * Parse cloud functions may need this.
     */
    __dirname: false,
    __filename: false,
  },
  resolve: {
    /**
     * the .mjs extension is needed due to graphql errors
     * (https://github.com/graphql/graphql-js/issues/1272).
     *
     * As suggested here
     * https://github.com/graphql/graphql-js/issues/1272#issuecomment-377384574
     * the .mjs extension must be on the list of extensions and must be before
     * .js extension in the list.
     */
    extensions: ['.mjs', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' },
      // exclude: /node_modules/ },
      {
        test: /\.([tj])sx?$/,
        use: {loader: 'ts-loader'},
        exclude: /node_modules/,
      }, {
        test: /\.json$/,
        use: {loader: 'json-loader'},
        exclude: /node_modules/,
      }, // newline - add source-map support
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'source-map-loader',
      }, {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  }, // newline - add source-map support
  plugins: [
    ...(env === prodEnv ? productionPlugins : []),
    ...(env === devEnv ? developmentPlugins : []),
    /**
     * This is needed if nodeExternals() is not on externals.
     *
     * See https://github.com/webpack/webpack/issues/195
     * and https://github.com/webpack/webpack/issues/196
     */
    // new webpack.ContextReplacementPlugin(/node_modules\/pg/, /^$/),
    new DotEnv(),
  ],
  devtool: (env === devEnv) ? 'source-map' : undefined,
  externals: [
    /**
     * Prevent node_modules dependencies to be bundled.
     * https://www.npmjs.com/package/webpack-node-externals
     */
    nodeExternals(),
  ],
});