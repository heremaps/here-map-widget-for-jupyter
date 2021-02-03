/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const _ = require('lodash');


export class ZoomRectangleModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ZoomRectangleView',
      _model_name: 'ZoomRectangleModel',

      name: "ZoomRectangle",
      alignment: "BOTTOM_RIGHT",
    };
  }
}

export class ZoomRectangleView extends control.ControlView {
  create_obj() {
    var options = {
      alignment: _.get(H.ui.LayoutAlignment, this.model.get('alignment'))
    };

    this.obj = new H.ui.ZoomRectangle(options);
  }

  model_events() {
    //
  }
}