/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');
const _ = require('lodash');
const widgets = require('@jupyter-widgets/base');

export class MultiLineStringModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'MultiLineStringView',
      _model_name: 'MultiLineStringModel',

      lines: [],
    };
  }
}

MultiLineStringModel.serializers = _.extend({
  lines: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class MultiLineStringView extends geometry.GeometryView {
  remove_layer_view(child_view) {
    this.obj.remove(child_view.obj);
    child_view.remove();
  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {

      this.obj.push(view.obj);
      return view;
    });
  }
  create_obj() {
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );

    this.create_child_view(this.model.get('lines')[0]).then((view) => {
      this.obj = new H.geo.MultiLineString([view.obj]);
    });
    return this.layer_views.update(this.model.get('lines'));
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:lines',
      function() {
        return this.layer_views.update(this.model.get('lines'));
      },
      this
    );
  }
}