/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const geometry = require('./Geometry.js');


export class PointModel extends geometry.GeometryModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'PointView',
      _model_name: 'PointModel',

      lat: 0,
      lng: 0,
      alt: 0.0,
    };
  }
}

export class PointView extends geometry.GeometryView {
  create_obj() {
    var lat = this.model.get('lat');
    var lng = this.model.get('lng');
    var alt = this.model.get('alt');
    this.obj = new H.geo.Point(lat, lng, alt);
  }

  model_events() {
    //
  }
}