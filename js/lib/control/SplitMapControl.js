/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
const PMessaging = require('@phosphor/messaging');
const PWidgets = require('@phosphor/widgets');
const Map = require('../Map');
class SplitMapControl extends H.ui.Control {
  constructor(map_view, leftLayer, rightLayer, left_map, right_map, left_container, right_container) {
    super();

    this.setLeftLayers(leftLayer)
    this.setRightLayers(rightLayer)
    this.map_view = map_view;
    this.left_map_obj = left_map;
    this.right_map_obj = right_map;
    this.left_container = left_container;
    this.right_container = right_container;

    this.options = {
      thumbSize: 42,
      padding: 0
    }
  }

  renderInternal(el, doc) {

    this._container = doc.createElement('div')
    this._container.className = 'leaflet-sbs';
    var container = this._container;
    container.style.width = '100%';
    container.style.top = '50%';
    //    container.style.position = "absolute";

    this._divider = doc.createElement('div');
    this._divider.className = 'leaflet-sbs-divider';

    this._range = doc.createElement('input');
    this._range.className = 'leaflet-sbs-range';
    var range = this._range;

    this._container.appendChild(this._divider);
    this._container.appendChild(this._range);

    this.map_view.appendChild(this._container);
    super.renderInternal(el, doc);

    range.type = 'range'
    range.min = 0
    range.max = 1
    range.step = 'any'
    range.value = 0.5
    range.style.paddingLeft = range.style.paddingRight = this.options.padding + 'px'

    this.range_input = range;
    this._addEvents()
    this._updateLayers()
  }

  setLeftLayers(leftLayer) {
    this._leftLayer = leftLayer
    //    this._updateLayers()
    return this
  }

  setRightLayers(rightLayer) {
    this._rightLayer = rightLayer
    //    this._updateLayers()
    return this
  }

  asArray(arg) {
    return (arg === 'undefined') ? [] : Array.isArray(arg) ? arg : [arg]
  }

  getPosition() {
    var rangeValue = this._range.value
    var offset = (0.5 - rangeValue) * (2 * this.options.padding + this.options.thumbSize)
    return this.map_view.clientWidth * rangeValue + offset
  }

  _addEvents() {
    var range = this._range
    var map = this._map
    //    if (!map || !range) return
    this.range_input.addEventListener('input', this.bind(this, this._updateLayers), false);
    this.range_input.addEventListener('change', this.bind(this, this._updateLayers), false);
    window.addEventListener("resize", this.bind(this, this._updateLayers), false);
    //    this._map.addEventListener('mapviewchange', this.bind(this, this._updateLayers), false);

  }

  getRangeEvent(rangeInput) {
    return 'oninput' in rangeInput ? 'input' : 'change'
  }

  bind(scope, fn) {
    return function() {
      fn.apply(scope, arguments);
    };
  }

  _updateLayers() {
    this._updateClip()
  }

  _updateClip() {
    var nw = {
      'x': 0,
      'y': 0
    }
    var se = {
      'x': this.map_view.clientWidth,
      'y': this.map_view.clientHeight
    };
    var clipX = nw.x + this.getPosition()
    var dividerX = this.getPosition()

    this._divider.style.left = dividerX + 'px'
    var clipLeft = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)'
    var clipRight = 'rect(' + [nw.y, se.x, se.y, clipX].join('px,') + 'px)'
    if (this._leftLayer) {
      this.left_container.style.clip = clipLeft
    }
    if (this._rightLayer) {
      this.right_container.style.clip = clipRight
    }
  }
}

export class SplitMapControlModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'SplitMapControlView',
      _model_name: 'SplitMapControlModel',

      name: "SplitMapControl",
      left_layer: null,
      right_layer: null,
    }
  }
}

SplitMapControlModel.serializers = _.extend({
  left_layer: {
    deserialize: widgets.unpack_models
  },
  right_layer: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class SplitMapControlView extends control.ControlView {

  create_obj() {
    this.main_map_container = document.createElement('div');
    this.main_map_container.style.width = "100%";
    this.main_map_container.style.height = "100%";
    this.main_map_container.style.position = "relative";
    this.main_map_container.id = 'main_map_container';
    this.map_view.el.appendChild(this.main_map_container);

    return this.create_child_view(this.model.get('left_layer'), {
      map_view: this.map_view,
      instance: this,
    }).then(view => {
      return this.create_child_view(this.model.get('right_layer'), {
        map_view: view.map_view,
        instance: view.options.instance,
        left_layer: view,
      }).then(view => {
        this.instance = view.options.instance;

        this.instance.map_view.map_container.style.width = "0%";
        this.instance.map_view.map_container.style.height = "0%";


        // Left Layer start
        this.instance.left_map_container = document.createElement('div');
        this.instance.left_map_container.style.width = "100%";
        this.instance.left_map_container.style.height = "100%";
        this.instance.left_map_container.id = 'left_map_container';
        this.instance.left_map_container.style.position = 'absolute';
        this.instance.main_map_container.appendChild(this.instance.left_map_container);

        var platform = new H.service.Platform({
          apikey: this.instance.map_view.model.get('api_key')
        });
        var defaultLayers = platform.createDefaultLayers();

        this.instance.left_map = new H.Map(this.instance.left_map_container,
          defaultLayers.vector.normal.map, {
            center: {
              lat: this.instance.map_view.model.get('center')[0],
              lng: this.instance.map_view.model.get('center')[1]
            },
            zoom: this.instance.map_view.model.get('zoom'),
            pixelRatio: window.devicePixelRatio || 1
          }
        );
        this.instance.left_behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.instance.left_map));
        this.instance.left_map.addLayer(view.options.left_layer.obj);
        // Left Layer end


        // Right Layer start
        this.instance.right_map_container = document.createElement('div');
        this.instance.right_map_container.style.width = "100%";
        this.instance.right_map_container.style.height = "100%";
        this.instance.right_map_container.id = 'right_map_container';
        this.instance.right_map_container.style.position = 'absolute';
        this.instance.main_map_container.appendChild(this.instance.right_map_container);

        var platform = new H.service.Platform({
          apikey: this.instance.map_view.model.get('api_key')
        });
        var defaultLayers = platform.createDefaultLayers();

        this.instance.right_map = new H.Map(this.instance.right_map_container,
          defaultLayers.vector.normal.map, {
            center: {
              lat: this.instance.map_view.model.get('center')[0],
              lng: this.instance.map_view.model.get('center')[1]
            },
            zoom: this.instance.map_view.model.get('zoom'),
            pixelRatio: window.devicePixelRatio || 1
          }
        );
        this.instance.right_behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.instance.right_map));
        this.instance.right_map.addLayer(view.obj);
        // Right Layer end

        var left_map = this.instance.left_map;
        var right_map = this.instance.right_map;
        window.addEventListener("resize", () => {
          left_map.getViewPort().resize();
          right_map.getViewPort().resize();
        });

        let viewModel1 = this.instance.left_map.getViewModel(),
          viewModel2 = this.instance.right_map.getViewModel();
        this.instance.left_map.addEventListener('mapviewchange', function(ev) {
          if (!viewModel2.dirty) {
            viewModel1.dirty = true;
            viewModel2.setLookAtData(viewModel1.getLookAtData());
          } else {
            viewModel2.dirty = false;
          }
        });

        this.instance.right_map.addEventListener('mapviewchange', function(ev) {
          if (!viewModel1.dirty) {
            viewModel2.dirty = true;
            viewModel1.setLookAtData(viewModel2.getLookAtData());
          } else {
            viewModel1.dirty = false;
          }
        });

        this.obj = new SplitMapControl(this.main_map_container, view.options.left_layer, view, this.instance.left_map,
          this.instance.right_map, this.instance.left_map_container, this.instance.right_map_container);

        return view;
      });
      return view;
    });
  }

  model_events() {}
}