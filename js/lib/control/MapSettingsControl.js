/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');


export class MapSettingsControlModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'MapSettingsControlView',
      _model_name: 'MapSettingsControlModel',

      name: "mapsettings",
      basemaps: [],
      layers: [],
      alignment: "TOP_RIGHT",
    };
  }
}

MapSettingsControlModel.serializers = _.extend({
  layers: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class MapSettingsControlView extends control.ControlView {

  remove_layer_view(child_view) {
    child_view.remove();
  }

  create_obj() {
    var basemaps = this.model.get('basemaps');
    var platform = new H.service.Platform({
      apikey: this.map_view.model.get('api_key')
    });
    var pixelRatio = window.devicePixelRatio || 1;
    var defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });
    var layers_map = {
      vector: {
        normal: {
          map: defaultLayers.vector.normal.map,
          truck: defaultLayers.vector.normal.truck,
          traffic: defaultLayers.vector.normal.traffic,
          trafficincidents: defaultLayers.vector.normal.trafficincidents,
        }
      },
      raster: {
        normal: {
          map: defaultLayers.raster.normal.map,
          mapnight: defaultLayers.raster.normal.mapnight,
          xbase: defaultLayers.raster.normal.xbase,
          xbasenight: defaultLayers.raster.normal.xbasenight,
          base: defaultLayers.raster.normal.base,
          basenight: defaultLayers.raster.normal.basenight,
          trafficincidents: defaultLayers.raster.normal.trafficincidents,
          transit: defaultLayers.raster.normal.transit,
          labels: defaultLayers.raster.normal.labels,
        },
        satellite: {
          map: defaultLayers.raster.satellite.map,
          xbase: defaultLayers.raster.satellite.xbase,
          base: defaultLayers.raster.satellite.base,
          labels: defaultLayers.raster.satellite.labels,
        },
        terrain: {
          map: defaultLayers.raster.terrain.map,
          xbase: defaultLayers.raster.terrain.xbase,
          base: defaultLayers.raster.terrain.base,
          labels: defaultLayers.raster.terrain.labels,
        }
      }
    };
    this.BaseLayers = [];
    basemaps.forEach((bname, index) => {
      var map_arr = bname.split('.');
      var map_type = layers_map[map_arr[0]][map_arr[1]][map_arr[2]];
      var bentry = new H.ui.MapSettingsControl();
      bentry.label = bname;
      bentry.layer = map_type;
      this.BaseLayers.push(bentry);
    });
    this.viewNames = [];
    this.viewArr = [];
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );

    return this.layer_views.update(this.model.get('layers')).then(() => {
      var LayersArr = [];
      this.viewNames.forEach((lname, index) => {
        var lobj = this.viewArr[index];
        var entry = new H.ui.MapSettingsControl();
        entry.label = lname;
        entry.layer = lobj;
        LayersArr.push(entry);
      });
      var options = {
        alignment: _.get(H.ui.LayoutAlignment, this.model.get('alignment')),
        baseLayers: this.BaseLayers,
        layers: LayersArr
      };
      this.obj = new H.ui.MapSettingsControl(options);
    });

  }

  add_layer_model(child_model) {
    return this.create_child_view(child_model['layer'], {
      map_view: this.map_view
    }).then(view => {
      this.viewNames.push(child_model['label']);
      this.viewArr.push(view.obj);
      return view;
    });
  }

  toggle_obj() {
    const controlName = this.model.get('name');
    this.map_view.ui.removeControl(controlName);
    delete this.obj;
    return Promise.resolve(this.create_obj()).then(() => {
      this.map_view.ui.addControl(this.model.get('name'), this.obj);
    });
  }

  model_events() {
    this.listenTo(
      this.model,
      'change:layers',
      function() {
        this.toggle_obj();
      },
      this
    );
    this.listenTo(
      this.model,
      'change:basemaps',
      function() {
        this.toggle_obj();
      },
      this
    );
  }
}