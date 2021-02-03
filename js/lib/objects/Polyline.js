/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class PolylineModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'PolylineView',
      _model_name: 'PolylineModel',

      object: null,
      style: {},
      draggable: false,
    };
  }
}

PolylineModel.serializers = _.extend({
  // ...widgets.DOMWidgetModel.serializers,
  object: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class PolylineView extends object.ObjectView {
  create_obj() {
    return this.create_child_view(this.model.get('object')).then((view) => {
      this.obj = new H.map.Polyline(view.obj, {
        style: this.model.get('style')
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
        newCoord = map.screenToGeo(pointer.viewportX, pointer.viewportY),
        outOfMapView = false;

      if (!newCoord.equals(startCoord)) {
        var currentLineString = object.getGeometry(),
          newLineString = new H.geo.LineString();

        // create new LineString with updated coordinates
        currentLineString.eachLatLngAlt(function(lat, lng, alt) {
          var diffLat = (lat - startCoord.lat),
            diffLng = (lng - startCoord.lng),
            newLat = newCoord.lat + diffLat,
            newLng = newCoord.lng + diffLng;

          // prevent dragging to latitude over 90 or -90 degrees
          if (newLat >= 90 || newLat <= -90) {
            outOfMapView = true;
            return;
          }

          newLineString.pushLatLngAlt(newLat, newLng, 0);
        });

        if (!outOfMapView) {
          object.setGeometry(newLineString);
          object.setData({
            startCoord: newCoord
          });
        }
      }
      evnt.stopPropagation();
    });

  }
  model_events() {
    //
  }
}