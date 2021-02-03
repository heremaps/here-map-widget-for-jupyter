/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class DomMarkerModel extends object.ObjectModel {
  defaults() {
    return {
      _view_name: 'DomMarkerView',
      _model_name: 'DomMarkerModel',

      lat: 0,
      lng: 0,
      alt: 0.0,
      icon: null,
    };
  }
}

DomMarkerModel.serializers = _.extend({
  icon: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class DomMarkerView extends object.ObjectView {
  create_obj() {
    return this.create_child_view(this.model.get('icon')).then((view) => {
      this.obj = new H.map.DomMarker({
        lat: this.model.get('lat'),
        lng: this.model.get('lng'),
        alt: this.model.get('alt')
      }, {
        icon: view.obj
      });
    });

  }

  mapjs_events() {
    //
  }

  model_events() {
    //
  }

}