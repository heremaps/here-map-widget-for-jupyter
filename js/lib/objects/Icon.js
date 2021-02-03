/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class IconModel extends object.ObjectModel {
  defaults() {
    return {
      _view_name: 'IconView',
      _model_name: 'IconModel',

      bitmap: '',
      height: 256,
      width: 256,
      anchor: null,
    };
  }
}


export class IconView extends object.ObjectView {
  create_obj() {
    var options = {
      size: {
        h: this.model.get('height'),
        w: this.model.get('width')
      }
    };
    if (this.model.get('anchor')) {
      options['anchor'] = this.model.get('anchor');
    }
    this.obj = new H.map.Icon(this.model.get('bitmap'), options);
  }

  mapjs_events() {
    //
  }

  model_events() {
    //
  }

}