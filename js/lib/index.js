/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/

// Export widget models and views, and the npm package version number.

//__webpack_public_path__ = document.querySelector('body').getAttribute('data-base-url') + 'nbextensions/@here/map-widget-for-jupyter/';

module.exports = require('./jupyter-map.js');
module.exports['version'] = require('../package.json').version;
