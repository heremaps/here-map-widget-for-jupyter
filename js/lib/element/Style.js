/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const element = require('./Element.js');
const widgets = require('@jupyter-widgets/base');

export class StyleModel extends element.ElementModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'StyleView',
      _model_name: 'StyleModel',

      config: '',
      base_url: '',
    };
  }
}


export class StyleView extends element.ElementView {
  create_obj() {
    const config = this.model.get('config');
    const base_url = this.model.get('base_url');
    this.obj = new H.map.render.webgl.Style(config, base_url);

  }

  model_events() {
    //
  }
}