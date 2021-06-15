/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/

var plugin = require('./index');
var base = require('@jupyter-widgets/base');

module.exports = {
  id: '@here/map-widget-for-jupyter',
  requires: [base.IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: '@here/map-widget-for-jupyter',
          version: plugin.version,
          exports: plugin
      });
  },
  autoStart: true
};

