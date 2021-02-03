/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class CircleModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'CircleView',
      _model_name: 'CircleModel',

      center: null,
      radius: 100,
      style: {},
      draggable: false,
      extrusion: 0.0,
      elevation: 0.0,
    };
  }
}

CircleModel.serializers = _.extend({
  center: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class CircleView extends object.ObjectView {
  create_obj() {
    return this.create_child_view(this.model.get('center')).then((view) => {
      var radius = this.model.get('radius');
      this.obj = new H.map.Circle(view.obj, radius, {
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
        object = evnt.target,
        screenPositon = map.geoToScreen(object.getCenter()),
        offset = new H.math.Point(pointer.viewportX - screenPositon.x, pointer.viewportY - screenPositon.y);
      // store difference between starting mouse position and circle's center
      object.setData({
        offset: offset
      });
      evnt.stopPropagation();
    });

    this.obj.addEventListener('drag', function(evnt) {
      var pointer = evnt.currentPointer,
        object = evnt.target,
        offset = object.getData()['offset'];
      object.setCenter(map.screenToGeo(pointer.viewportX - offset.x, pointer.viewportY - offset.y));
      evnt.stopPropagation();
    });

  }

  model_events() {
    this.listenTo(
      this.model,
      'change:radius',
      function() {
        this.obj.setRadius(this.model.get('radius'));
      },
      this
    );

    this.listenTo(
      this.model,
      'change:center',
      function() {
        this.create_child_view(this.model.get('center')).then((view) => {
        this.obj.setCenter(view.obj);
        });
      },
      this
    );
  }
}