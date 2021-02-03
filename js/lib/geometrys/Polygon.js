/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');
const _ = require('lodash');
const widgets = require('@jupyter-widgets/base');


export class PolygonGeoModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'PolygonGeoView',
      _model_name: 'PolygonGeoModel',

      linestring: null,
      holes: [],
    };
  }
}

PolygonGeoModel.serializers = _.extend({
  linestring: {
    deserialize: widgets.unpack_models
  },
  holes: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class PolygonGeoView extends geometry.GeometryView {
  remove_layer_view(child_view) {
    this.obj.removeInterior(child_view.obj);
    child_view.remove();
  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {

      this.viewArr.push(view.obj);
      if (this.obj != null) {
        this.obj.pushInterior(view.obj);
      }
      return view;
    });
  }
  create_obj() {
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );
    this.viewArr = [];
    return this.layer_views.update(this.model.get('holes')).then(() => {
      return this.create_child_view(this.model.get('linestring')).then((view) => {
        this.obj = new H.geo.Polygon(view.obj, this.viewArr);
      });
    });
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:holes',
      function() {
        return this.layer_views.update(this.model.get('holes'));
      },
      this
    );

    this.listenTo(
      this.model,
      'change:linestring',
      function() {
        return this.create_child_view(this.model.get('linestring')).then((view) => {
          this.obj.setExterior(view.obj);
        });
      },
      this
    );

  }
}