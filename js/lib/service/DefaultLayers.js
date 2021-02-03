/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const service = require('./Service.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class DefaultLayersModel extends service.ServiceModel {
  defaults() {
    return {
      _view_name: 'DefaultLayersView',
      _model_name: 'DefaultLayersModel',

      layer_name: 'vector.normal.map',
      tile_size: 512,
      ppi: undefined,

    };
  }
}



export class DefaultLayersView extends service.ServiceView {
  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.parent;

  }
  create_obj() {
    var ppi = this.model.get('ppi') === null ? undefined : this.model.get('ppi');
    var platform = new H.service.Platform({
      apikey: this.map_view.model.get('api_key')
    });
    var defaultLayers = platform.createDefaultLayers({
      tileSize: this.model.get('tile_size'),
      ppi: ppi
    });
    this.obj = _.get(defaultLayers, this.model.get('layer_name'));
  }

  model_events() {}

  mapjs_events() {
    //
  }

}