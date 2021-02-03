/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class RectangleModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'RectangleView',
      _model_name: 'RectangleModel',

      bbox: null,
      style: {},
      draggable: false,
      extrusion: 0.0,
      elevation: 0.0,
    };
  }
}

RectangleModel.serializers = _.extend({
  bbox: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class RectangleView extends object.ObjectView {
  create_obj() {
    return this.create_child_view(this.model.get('bbox')).then((view) => {
      this.obj = new H.map.Rect(view.obj, {
        style: this.model.get('style'),
        extrusion: this.model.get('extrusion'),
        elevation: this.model.get('elevation')
      });
      this.obj.draggable = this.model.get('draggable');
    });

  }
  mapjs_events() {
    var map = this.map_view.obj;
    this.obj.addEventListener('dragstart', function(evnt) {
      var pointer = evnt.currentPointer,
        object = evnt.target;

      // store the starting geo position
      object.setData({
        startCoord: map.screenToGeo(pointer.viewportX, pointer.viewportY)
      });
      evnt.stopPropagation();
    });

    this.obj.addEventListener('drag', function(evnt) {
      var pointer = evnt.currentPointer,
        object = evnt.target,
        startCoord = object.getData()['startCoord'],
        newCoord = map.screenToGeo(pointer.viewportX, pointer.viewportY);

      // create new Rect with updated coordinates
      if (!newCoord.equals(startCoord)) {
        var currentGeoRect = object.getGeometry().getBoundingBox(),
          newTop = currentGeoRect.getTop() + newCoord.lat - startCoord.lat,
          newLeft = currentGeoRect.getLeft() + newCoord.lng - startCoord.lng,
          newBottom = currentGeoRect.getBottom() + newCoord.lat - startCoord.lat,
          newRight = currentGeoRect.getRight() + newCoord.lng - startCoord.lng,
          newGeoRect = new H.geo.Rect(newTop, newLeft, newBottom, newRight);

        // prevent dragging to latitude over 90 or -90 degrees to prevent loosing altitude values
        if (newTop >= 90 || newBottom <= -90) {
          return;
        }
        object.setBoundingBox(newGeoRect);
        object.setData({
          startCoord: newCoord
        });
      }
      evnt.stopPropagation();
    });

  }
  model_events() {
    //
  }
}