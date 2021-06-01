/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const provider = require('./Provider.js');


export class ImageTileProviderModel extends provider.ProviderModel {
  defaults() {
    return {
      _view_name: 'ImageTileProviderView',
      _model_name: 'ImageTileProviderModel',

      url: '',
      min_zoom: 0,
      max_zoom: 22,
      opacity: 1.0,
      tile_size: 256,
      headers: {},
      attribution: '',

    };
  }
}


export class ImageTileProviderView extends provider.ProviderView {
  create_obj() {
    const url = this.model.get('url');
    const min = this.model.get('min_zoom');
    const max = this.model.get('max_zoom');
    const opacity = this.model.get('opacity');
    const tileSize = this.model.get('tile_size');
    const headers = this.model.get('headers');
    this.obj = new H.map.provider.ImageTileProvider({
        min: min,
        max: max,
        opacity: opacity,
        tileSize: tileSize,
        headers: headers,
        getURL: function (x, y, z) {
          return url.replace('{z}', z).replace('{x}', x).replace('{y}', y);
        }
        
    });
    const attribution = this.model.get('attribution');
    if ( attribution ) {
      this.obj.getCopyrights = function (bounds, level) {
        return [{
          label: attribution,
          alt: ''
        }];
      };
    }

  }

  model_events() {
    this.listenTo(
        this.model,
        'change:opacity',
        function() {
          this.obj.setOpacity(this.model.get('opacity'));
        },
        this
      );
  }

  mapjs_events() {}

}