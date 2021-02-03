/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');


export class RectModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'RectView',
      _model_name: 'RectModel',

      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    };
  }
}

export class RectView extends geometry.GeometryView {
  create_obj() {
    var top = this.model.get('top');
    var left = this.model.get('left');
    var bottom = this.model.get('bottom');
    var right = this.model.get('right');
    this.obj = new H.geo.Rect(top, left, bottom, right);
  }

  model_events() {
    //
  }
}