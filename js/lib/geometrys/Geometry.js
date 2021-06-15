/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'

export class GeometryModel extends widgets.WidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'GeometryView',
      _model_name: 'GeometryModel',
      _view_module: '@here/map-widget-for-jupyter',
      _model_module: '@here/map-widget-for-jupyter',
    };
  }
}

GeometryModel.serializers = _.extend(widgets.WidgetModel.serializers);

export class GeometryView extends widgets.WidgetView {
  initialize(parameters) {
    super.initialize(parameters);
  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.model_events();
    });
  }
}