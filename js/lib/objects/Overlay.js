/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class OverlayModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'OverlayView',
      _model_name: 'OverlayModel',

      boundingBox: null,
      bitmap: '',
      min: Infinity,
      max: Infinity,
      opacity: 1,
      visibility: true,
      volatility: false,
    };
  }
}

OverlayModel.serializers = _.extend({
  boundingBox: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class OverlayView extends object.ObjectView {
  create_obj() {
    return this.create_child_view(this.model.get('boundingBox'), {
      map_view: this.map_view,
    }).then((view) => {
      this.obj = new H.map.Overlay(
        view.obj,
        this.model.get('bitmap'), {
          min: this.model.get('min'),
          max: this.model.get('max'),
          opacity: this.model.get('opacity'),
          visibility: this.model.get('visibility'),
          volatility: this.model.get('volatility'),
        }
      );
    });

  }

  mapjs_events() {

  }

  model_events() {
    this.listenTo(
      this.model,
      'change:bitmap',
      function() {
        this.obj.setBitmap(this.model.get('bitmap'));
      },
      this
    );
  }
}