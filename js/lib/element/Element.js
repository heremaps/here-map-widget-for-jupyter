/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'

export class ElementModel extends widgets.WidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ElementView',
      _model_name: 'ElementModel',
      _view_module: '@here/map-widget-for-jupyter',
      _model_module: '@here/map-widget-for-jupyter',
    };
  }
}

ElementModel.serializers = _.extend(widgets.WidgetModel.serializers);

export class ElementView extends widgets.WidgetView {
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