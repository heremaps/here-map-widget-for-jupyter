/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const service = require('./Service.js');
const widgets = require('@jupyter-widgets/base');

export class PlatformModel extends service.ServiceModel {
  defaults() {
    return {
      _view_name: 'PlatformView',
      _model_name: 'PlatformModel',

      api_key: null,
      services_config: null,
    };
  }
}


export class PlatformView extends service.ServiceView {
  create_obj() {
    var services_config = this.model.get('services_config');
    const config = {};
    const getoptions = {
      apikey: this.model.get('api_key')
    };
    if (services_config) {
      Object.keys(services_config).forEach(function(key) {
        config[key] = {
          baseUrl: new H.service.Url(services_config[key]['scheme'],
            services_config[key]['host'],
            services_config[key]['path'],
            getoptions
          )
        };
      });
    }
    this.obj = new H.service.Platform({
      apikey: this.model.get('api_key'),
      servicesConfig: config
    });
  }

  model_events() {}

  mapjs_events() {}

}