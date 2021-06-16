/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'

export class ControlModel extends widgets.WidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ControlView',
      _model_name: 'ControlModel',
      _view_module: '@here/map-widget-for-jupyter',
      _model_module: '@here/map-widget-for-jupyter',
    };
  }
}

ControlModel.serializers = _.extend(widgets.WidgetModel.serializers);

export class ControlView extends widgets.WidgetView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;

  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.model_events();
    });
  }
}