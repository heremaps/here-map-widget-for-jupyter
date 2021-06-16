/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'

export class LayerModel extends widgets.WidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'LayerView',
      _model_name: 'LayerModel',
      _view_module: '@here/map-widget-for-jupyter',
      _model_module: '@here/map-widget-for-jupyter',

      name: ''
    };
  }
}

LayerModel.serializers = _.extend(widgets.WidgetModel.serializers);

export class LayerView extends widgets.WidgetView {
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