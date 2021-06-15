/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/

var path = require('path');
var version = require('./package.json').version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']},
    {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    esModule: false,
                }
            }
        ],
    }
]

var resolve = {
    fallback: {
        "crypto": require.resolve("crypto-browserify"),
        "buffer": require.resolve("buffer/"),
        "stream": require.resolve("stream-browserify")
    }
};


module.exports = [
    {// Notebook extension
     //
     // This bundle only contains the part of the JavaScript that is run on
     // load of the notebook. This section generally only performs
     // some configuration for requirejs, and provides the legacy
     // "load_ipython_extension" function which is required for any notebook
     // extension.
     //
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'here_map_widget', 'nbextension'),
            libraryTarget: 'amd',
            publicPath: ''
        },
        resolve: resolve,
        node: {
               global: false
        }
//        node: {
//              process: false,
//              global: false,
//              Buffer: false, // ADD THIS
//              fs: 'empty',
//        }
    },
    {// Bundle for the notebook containing the custom widget views and models
     //
     // This bundle contains the implementation for the custom widget views and
     // custom widget.
     // It must be an amd module
     //
        entry: './lib/notebook.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'here_map_widget', 'nbextension'),
            libraryTarget: 'amd',
            publicPath: ''
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base'],
        resolve: resolve,
        node: {
               global: false
        }
//        node: {
//              process: false,
//              global: false,
//              Buffer: false, // ADD THIS
//              fs: 'empty',
//        }
    },
    {// Embeddable here_map_widget bundle
     //
     // This bundle is generally almost identical to the notebook bundle
     // containing the custom widget views and models.
     //
     // The only difference is in the configuration of the webpack public path
     // for the static assets.
     //
     // It will be automatically distributed by unpkg to work with the static
     // widget embedder.
     //
     // The target bundle is always `dist/index.js`, which is the path required
     // by the custom widget embedder.
     //
        entry: './lib/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/@here/map-widget-for-jupyter@' + version + '/dist/'
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        externals: ['@jupyter-widgets/base'],
        resolve: resolve,
        node: {
               global: false
        }
    }
];
