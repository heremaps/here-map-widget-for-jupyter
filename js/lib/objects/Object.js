/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'
const _ = require('lodash');

export class ObjectModel extends widgets.WidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ObjectView',
      _model_name: 'ObjectModel',
      _view_module: '@here/map-widget-for-jupyter',
      _model_module: '@here/map-widget-for-jupyter',
      extrusion: 0,
      elevation: 0,
    };
  }
}

ObjectModel.serializers = _.extend(widgets.WidgetModel.serializers);

export class ObjectView extends widgets.WidgetView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  render() {
    return Promise.resolve(this.create_obj()).then(() => {
      this.model_events();
      this.mapjs_events();
    });
  }
}