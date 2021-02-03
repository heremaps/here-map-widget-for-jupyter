/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');


export class LineStringModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'LineStringView',
      _model_name: 'LineStringModel',

      points: [],
    };
  }
}

export class LineStringView extends geometry.GeometryView {
  create_obj() {
    this.obj = new H.geo.LineString(this.model.get('points'));
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:points',
      function() {
        var len = this.model.get('points').length;
        var array = this.model.get('points');
        this.obj.pushPoint({
          lat: array[array.length - 3],
          lng: array[array.length - 2],
          alt: array[array.length - 1]
        });
      },
      this
    );
  }
}