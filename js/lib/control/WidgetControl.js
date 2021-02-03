/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
const PMessaging = require('@phosphor/messaging');
const PWidgets = require('@phosphor/widgets');

class WidgetControl extends H.ui.Control {
  constructor(sub_widget) {
    super();
    this._sub_widget = sub_widget;
  }

  renderInternal(el, doc) {
    this.div = doc.createElement('div');
    this.div.className = 'H_ctl H_el H_grp';
    this.div.appendChild(this._sub_widget);
    el.appendChild(this.div);
    super.renderInternal(el, doc);
  }

  updateLayout(options) {
    if (!this._container) {
      return;
    }
    Object.keys(options).forEach(option => {
      this._container.style[option] = options[option] + 'px';
    });
  }
}

export class WidgetControlModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'WidgetControlView',
      _model_name: 'WidgetControlModel',

      name: "WidgetControl",
      alignment: "RIGHT_BOTTOM",
      widget: null,
    }
  }
}

WidgetControlModel.serializers = _.extend({
  widget: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class WidgetControlView extends control.ControlView {
  set_widget(widget_model) {
    if (this.widget_view) {
      this.widget_view.remove();
      this.widget_view = undefined;
    }
    if (widget_model) {
      return this.create_child_view(widget_model).then(view => {
        this.widget_view = view;
        this.obj = new WidgetControl(view.el);
        this.obj.setAlignment(_.get(H.ui.LayoutAlignment, this.model.get('alignment')));
      });
    }
  }

  create_obj() {
    return this.set_widget(this.model.get('widget'));
  }

  model_events() {
    //
  }
}