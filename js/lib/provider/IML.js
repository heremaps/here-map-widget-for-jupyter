/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const provider = require('./Provider.js');
const widgets = require('@jupyter-widgets/base');

export class IMLModel extends provider.ProviderModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'IMLView',
      _model_name: 'IMLModel',

      catalog_hrn: '',
      layer_id: '',
    };
  }
}


export class IMLView extends provider.ProviderView {
  create_obj() {
    const catalogHrn = this.model.get('catalog_hrn');
    const layerId = this.model.get('layer_id');
    const platform = new H.service.Platform({apikey: this.map_view.model.get('api_key')});

    const service = platform.getIMLService();
    this.obj = new H.service.iml.Provider(service, catalogHrn, layerId);
  }

  model_events() {}

  mapjs_events() {}

}