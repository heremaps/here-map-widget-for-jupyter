/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class MarkerModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'MarkerView',
      _model_name: 'MarkerModel',

      lat: 0,
      lng: 0,
      alt: 0.0,
      evt_type: 'pointerenter',
      data: '',
      info: null,
      show_bubble: false,
      object: null,
      icon: null,
      draggable: false,
    };
  }
}

MarkerModel.serializers = _.extend({
  object: {
    deserialize: widgets.unpack_models
  },
  icon: {
    deserialize: widgets.unpack_models
  },
  info: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class MarkerView extends object.ObjectView {
  create_obj() {
    this.dirty = false;
    const object = this.model.get('object');
    const icon = this.model.get('icon');
    const data = this.model.get('data');
    const draggable = this.model.get('draggable');
    const object_promise = object !== null ? this.create_child_view(object) : Promise.resolve(null);
    const icon_promise = icon !== null ? this.create_child_view(icon) : Promise.resolve(null);

    return Promise.all([object_promise, icon_promise]).then(result => {
      const object_view = result[0];
      const icon_view = result[1];
      const obj = object_view !== null ? object_view.obj : null;
      const ic = icon_view !== null ? icon_view.obj : null;

      if (obj) {
        if (ic) {
          this.obj = new H.map.Marker(obj, {
            icon: ic,
            data: data
          });
          this.obj.draggable = draggable;
        } else {
          this.obj = new H.map.Marker(obj, {
            data: data
          });
          this.obj.draggable = draggable;
        }
      } else {
        var coords = {
          lat: this.model.get('lat'),
          lng: this.model.get('lng'),
          alt: this.model.get('alt')
        };
        if (ic) {
          this.obj = new H.map.Marker(coords, {
            icon: icon_view.obj,
            data: data
          });
          this.obj.draggable = draggable;
        } else {
          this.obj = new H.map.Marker(coords, {
            data: data
          });
          this.obj.draggable = draggable;
        }
      }
    });

  }

  mapjs_events() {
    var ui = this.map_view.ui;
    var map = this.map_view.obj;
    var handle = this;
    var behavior = this.map_view.behavior;
    const info = this.model.get('info');
    const data = this.model.get('data');
    var evt_type = this.model.get('evt_type');
    if (this.model.get('show_bubble')) {
      if (data) {
        this.obj.addEventListener(evt_type, function(evt) {
          var bubble = new H.ui.InfoBubble(evt.target.getGeometry(), {
            content: evt.target.getData()
          });
          ui.addBubble(bubble);
        }, false);
      } else if (info) {
        this.obj.addEventListener(evt_type, function(evt) {
          return handle.create_child_view(info).then((view) => {
            ui.addBubble(view.obj);
          });
        }, false);

      }
    }
    this.obj.addEventListener('dragstart', function(evnt) {
      var target = evnt.target,
        pointer = evnt.currentPointer;
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();

    }, false);

    this.obj.addEventListener('dragend', function(evnt) {
      var target = evnt.target,
        pointer = evnt.currentPointer;
      behavior.enable();
    }, false);

    this.obj.addEventListener('drag', function(evnt) {
      var target = evnt.target,
        pointer = evnt.currentPointer;
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
      var position = map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y)
      handle.model.set('lat', position['lat']);
      handle.model.set('lng', position['lng']);
      handle.model.save_changes();
    }, false);
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:lat',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.setGeometry({
            lat: this.model.get('lat'),
            lng: this.model.get('lng')
          });
          this.dirty = false;
        }
      },
      this
    );

    this.listenTo(
      this.model,
      'change:lng',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.setGeometry({
            lat: this.model.get('lat'),
            lng: this.model.get('lng')
          });
          this.dirty = false;
        }
      },
      this
    );
  }
}