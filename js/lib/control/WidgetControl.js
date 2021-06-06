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
  constructor(opts) {
    super();
    this.transparentBg = opts.transparentBg;
  }

  renderInternal(el, doc) {
    this.em = el;
    if ( !this.transparentBg ) {
      this.div = doc.createElement('div');
      this.div.className = 'H_ctl H_el H_grp';
    }
    super.renderInternal(el, doc);
  }

  setContent(ele) {
    if ( this.transparentBg ) {
      this.em.appendChild(ele);
    } else {
      this.div.appendChild(ele);
      this.em.appendChild(this.div);
    }
  }

  updateLayout(options) {
    if (!this.div) {
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
      _view_name: 'WidgetControlView',
      _model_name: 'WidgetControlModel',

      name: "WidgetControl",
      alignment: "RIGHT_BOTTOM",
      widget: null,
      transparent_bg: false,
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
        // Trigger the displayed event of the child view.
        this.displayed.then(() => {
          this.widget_view.trigger('displayed', this);
          this.widget_view.displayed.then(() => {
            PMessaging.MessageLoop.sendMessage(
              view.pWidget,
              PWidgets.Widget.Msg.BeforeAttach
            );
            this.obj.setContent(view.el);
            PMessaging.MessageLoop.sendMessage(
              view.pWidget,
              PWidgets.Widget.Msg.AfterAttach
            );
          });
        });
      });
    }
  }

  create_obj() {
    let options = {transparentBg: this.model.get('transparent_bg')};
    this.obj = new WidgetControl(options);
    this.obj.setAlignment(_.get(H.ui.LayoutAlignment, this.model.get('alignment')));
    this.set_widget(this.model.get('widget'));
  }

  model_events() {
    //
  }
}