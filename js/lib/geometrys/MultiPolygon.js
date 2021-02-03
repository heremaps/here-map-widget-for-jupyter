/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');
const _ = require('lodash');
const widgets = require('@jupyter-widgets/base');


export class MultiPolygonGeoModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'MultiPolygonGeoView',
      _model_name: 'MultiPolygonGeoModel',

      polygons: [],
    };
  }
}

MultiPolygonGeoModel.serializers = _.extend({
  polygons: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class MultiPolygonGeoView extends geometry.GeometryView {
  remove_polygon_view(child_view) {
    this.obj.remove(child_view.obj);
    child_view.remove();
  }

  add_polygon_model(child_model) {
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      this.obj.push(view.obj);
      return view;
    });
  }

  create_obj() {
    this.polygon_views = new widgets.ViewList(
      this.add_polygon_model,
      this.remove_polygon_view,
      this
    );

    this.create_child_view(this.model.get('polygons')[0]).then((view) => {
      this.obj = new H.geo.MultiPolygon([view.obj]);
    });
    return this.polygon_views.update(this.model.get('polygons'));
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:polygons',
      function() {
        return this.polygon_views.update(this.model.get('polygons'));
      },
      this
    );
  }
}