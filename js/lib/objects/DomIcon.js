/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class DomIconModel extends object.ObjectModel {
  defaults() {
    return {
      _view_name: 'DomIconView',
      _model_name: 'DomIconModel',

      element: '',
    };
  }
}


export class DomIconView extends object.ObjectView {
  create_obj() {
    this.obj = new H.map.DomIcon(this.model.get('element'));
  }

  mapjs_events() {
    //
  }

  model_events() {
    //
  }

}