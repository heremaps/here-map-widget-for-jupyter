/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const _ = require('lodash');


export class ZoomControlModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ZoomControlView',
      _model_name: 'ZoomControlModel',

      name: "ZoomControl",
      zoomSpeed: 4,
      fractionalZoom: true,
      alignment: "LEFT_TOP",
      slider: false,
      sliderSnaps: false,
    };
  }
}

export class ZoomControlView extends control.ControlView {
  create_obj() {
    var options = {
      zoomSpeed: this.model.get('zoomSpeed'),
      fractionalZoom: this.model.get('fractionalZoom'),
      alignment: _.get(H.ui.LayoutAlignment, this.model.get('alignment')),
      slider: this.model.get('slider'),
      sliderSnaps: this.model.get('sliderSnaps')
    };

    this.obj = new H.ui.ZoomControl(options);
  }

  model_events() {
    //
  }
}