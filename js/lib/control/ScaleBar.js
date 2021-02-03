/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const _ = require('lodash');


export class ScaleBarModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'ScaleBarView',
      _model_name: 'ScaleBarModel',

      name: "ScaleBar",
      alignment: "RIGHT_BOTTOM",
    };
  }
}

export class ScaleBarView extends control.ControlView {
  create_obj() {
    var options = {
      alignment: _.get(H.ui.LayoutAlignment, this.model.get('alignment'))
    };

    this.obj = new H.ui.ScaleBar(options);
  }

  model_events() {
    //
  }
}