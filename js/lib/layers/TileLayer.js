/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const layer = require('./Layer.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class TileLayerModel extends layer.LayerModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'TileLayerView',
      _model_name: 'TileLayerModel',

      provider: null,
      style: {},
    };
  }
}

TileLayerModel.serializers = _.extend({
  provider: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class TileLayerView extends layer.LayerView {
  create_obj() {
    return this.create_child_view(this.model.get('provider'), {
      map_view: this.map_view
    }).then((view) => {
      this.provider = view.obj;
      this.obj = new H.map.layer.TileLayer(this.provider, this.model.get('style'));
      });

  }

  model_events() {
    this.listenTo(
      this.model,
      'change:style',
      function() {
        var style = this.provider.getStyle();
        for (var key in this.model.get('style')) {
          style.setProperty(key, this.model.get('style')[key]);
        }

        // make the objects within the provider interactive
        style.setInteractive(['xyz'], true);
      },
      this
    );
  }
  mapjs_events() {
    //
  }
}