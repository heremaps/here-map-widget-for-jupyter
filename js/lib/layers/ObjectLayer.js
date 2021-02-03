/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const layer = require('./Layer.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class ObjectLayerModel extends layer.LayerModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ObjectLayerView',
      _model_name: 'ObjectLayerModel',

      provider: null,
      tile_size: 256,
      tile_cache_size: 32,
      data_cache_size: 512,
      pixel_ratio: 0
    };
  }
}

ObjectLayerModel.serializers = _.extend({
  provider: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class ObjectLayerView extends layer.LayerView {
  create_obj() {
    return this.create_child_view(this.model.get('provider'), {
      map_view: this.map_view
    }).then((view) => {
      this.provider = view.obj;
      var tileSize = this.model.get('tile_size');
      var tileCacheSize = this.model.get('tile_cache_size');
      var dataCacheSize = this.model.get('data_cache_size');
      var pixel_ratio = this.model.get('pixel_ratio');
      var pixelRatio = pixel_ratio === 0 ? window.devicePixelRatio : pixel_ratio;
      var options = {
        tileSize: tileSize,
        tileCacheSize: tileCacheSize,
        dataCacheSize: dataCacheSize,
        pixelRatio: pixelRatio
      };
      this.obj = new H.map.layer.ObjectLayer(this.provider, options);
    });

  }

  model_events() {}
  mapjs_events() {}
}