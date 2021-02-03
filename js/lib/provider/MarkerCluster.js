/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const provider = require('./Provider.js');
const _ = require('lodash');
const widgets = require('@jupyter-widgets/base');

export class MarkerClusterModel extends provider.ProviderModel {
  defaults() {
    return {
      _view_name: 'MarkerClusterView',
      _model_name: 'MarkerClusterModel',

      data_points: [],
      eps: 32,
      min_weight: 2,
      min_zoom: 0,
      max_zoom: 22,
      show_bubble: false,
      evt_type: 'tap',
    };
  }
}


export class MarkerClusterView extends provider.ProviderView {
  create_obj() {
    var eps = this.model.get('eps');
    var minWeight = this.model.get('min_weight');
    var clusteringOptions = {
      minWeight: minWeight,
      eps: eps
    };
    var minZoom = this.model.get('min_zoom');
    var maxZoom = this.model.get('max_zoom');
    var data_points = this.model.get('data_points');
    var dataPoints = [];
    data_points.forEach((point, index) => {
      var options = {};
      if (point.weight) {
        options['weight'] = point.weight;
      }
      if (point.data) {
        options['data'] = point.data
      }
      dataPoints.push(new H.clustering.DataPoint(point.lat, point.lng, options.weight, options.data));
    });
    this.obj = new H.clustering.Provider(dataPoints, {
      clusteringOptions: clusteringOptions,
      min: minZoom,
      max: maxZoom
    });
  }

  model_events() {}

  mapjs_events() {
    var evt_type = this.model.get('evt_type');
    var ui = this.map_view.ui;
    this.bubble = null;
    var self = this;

    if (this.model.get('show_bubble')) {
      this.obj.addEventListener(evt_type, function(evt) {
        var position = evt.target.getGeometry(),
          data = evt.target.getData().a.data;
        if (!self.bubble) {
          self.bubble = new H.ui.InfoBubble(position, {
            content: data
          });
          ui.addBubble(self.bubble);

        } else {
          self.bubble.setContent(data);
          self.bubble.setPosition(position);
          self.bubble.open();
        }
        self.map_view.obj.setCenter(position, true);
      });
    }
  }

}