/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const element = require('./Element.js');
const widgets = require('@jupyter-widgets/base');

export class InfoBubbleModel extends element.ElementModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'InfoBubbleView',
      _model_name: 'InfoBubbleModel',

      position: null,
      content: '',
    };
  }
}

InfoBubbleModel.serializers = _.extend({
  position: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class InfoBubbleView extends element.ElementView {
  create_obj() {
    return this.create_child_view(this.model.get('position')).then((view) => {
      this.obj = new H.ui.InfoBubble(view.obj, {
        content: this.model.get('content')
      });
    });
  }

  model_events() {
    //
  }
}