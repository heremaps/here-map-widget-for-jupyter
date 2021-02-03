/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const provider = require('./Provider.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class MapTileModel extends provider.ProviderModel {
  defaults() {
    return {
      _view_name: 'MapTileView',
      _model_name: 'MapTileModel',

      tile_type: '',
      scheme: '',
      tile_size: 0,
      format: '',
      additional_params: null,
      path: 'maptile/2.1',
      headers: {},
      type: 'base',
      version: null,
      shards: null,

      platform: null,

    };
  }
}


MapTileModel.serializers = _.extend({
  platform: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);



export class MapTileView extends provider.ProviderView {
  create_obj() {
    const pltform = this.model.get('platform');
    const pltform_promise = pltform !== null ? this.create_child_view(pltform) : Promise.resolve(null);

    return Promise.all([pltform_promise]).then(result => {
      const pltform_view = result[0];
      const platform = pltform_view !== null ? pltform_view.obj : null;

      var mapTilerOptions = {type: this.model.get('type')};
      if (this.model.get('version')) {
        mapTilerOptions['version'] = this.model.get('version');
      }
      if (this.model.get('shards')) {
        mapTilerOptions['shards'] = this.model.get('shards');
      }
      if (this.model.get('headers')) {
        mapTilerOptions['headers'] = this.model.get('headers');
      }
      var mapTiler = platform.getMapTileService(mapTilerOptions);

      var TileType = this.model.get('tile_type');
      var scheme = this.model.get('scheme');
      var TileSize = this.model.get('tile_size');
      var format = this.model.get('format');
      var options = {}
      if (this.model.get('additional_params')) {
        options['additionalParameters'] = this.model.get('additional_params');
      }
      this.obj = mapTiler.createTileProvider(TileType, scheme, TileSize, format, options);
    });
  }

  model_events() {}

  mapjs_events() {}

}