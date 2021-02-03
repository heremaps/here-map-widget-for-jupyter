/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');


export class WKTLayerModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'WKTLayerView',
      _model_name: 'WKTLayerModel',

      data: '',
    };
  }
}

export class WKTLayerView extends geometry.GeometryView {
  create_obj() {
    this.obj = new H.util.wkt.toGeometry(this.model.get('data'));
  }

  model_events() {
    //
  }
}