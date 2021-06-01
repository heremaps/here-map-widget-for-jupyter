/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class LayersControlModel extends control.ControlModel {
  defaults() {
    return {
//      ...super.defaults(),
      _view_name: 'LayersControlView',
      _model_name: 'LayersControlModel',

      name: "LayersControl",
      alignment: "RIGHT_TOP",
    };
  }
}

export class LayersControlView extends control.ControlView {

  initialize(parameters) {
    super.initialize(parameters);
    this.map_view = this.options.map_view;
  }

  toggle_obj() {
    let controlName = this.model.get('name');
    const cntrl = this.map_view.ui.getControl(controlName);
    this.map_view.ui.removeControl(controlName);
    return Promise.resolve(this.create_obj()).then(() => {
      this.map_view.ui.addControl(this.model.get('name'), this.obj);
    });

  }

  model_events() {
    this.listenTo(this.map_view.model, 'change:layers', () => {
      this.toggle_obj();
    });
  }

  create_obj() {
    return Promise.all(this.map_view.layer_views.views)
      .then(views => {
        var overlays = views.reduce(function(ov, view) {
          ov[view.model.get('name')] = view.obj;
          return ov;
        }, {});
        let layers = [];
        for (let key in overlays) {
          let entry = new H.ui.MapSettingsControl();
          entry.label = key;
          entry.layer = overlays[key];
          layers.push(entry);
        }
        let options = {
          alignment: _.get(H.ui.LayoutAlignment, this.model.get('alignment')),
          layers: layers
        }
        this.obj = new H.ui.MapSettingsControl(options);
      });
  }
}