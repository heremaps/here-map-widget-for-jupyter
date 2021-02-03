/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const layer = require('./Layer.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class KmlLayerModel extends layer.LayerModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'KmlLayerView',
      _model_name: 'KmlLayerModel',

      url: '',

    };
  }
}


export class KmlLayerView extends layer.LayerView {
  create_obj() {
    var reader = new H.data.kml.Reader(this.model.get('url'));
    this.obj = reader.getLayer();
    reader.parse();

  }

  model_events() {
    //
  }
  mapjs_events() {
    //
  }
}