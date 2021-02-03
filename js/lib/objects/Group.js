/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const object = require('./Object.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');

export class GroupModel extends object.ObjectModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'GroupView',
      _model_name: 'GroupModel',

      volatility: false,
      objects: [],
    };
  }
}

GroupModel.serializers = _.extend({
  objects: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class GroupView extends object.ObjectView {
  remove_object_view(child_view) {
    if (this.hasOwnProperty('obj')) {
      this.obj.removeObject(child_view.obj);
      child_view.remove();
    }
  }

  add_object_model(child_model) {
    console.log("Object GROUP " + child_model + " " + child_model.state_change);
    return this.create_child_view(child_model, {
      map_view: this.map_view
    }).then(view => {
      if (this.hasOwnProperty('obj')) {
        this.obj.addObject(view.obj);
      } else {
        this.objArr.push(view.obj);
      }
      // Trigger the displayed event of the child view.
      this.displayed.then(() => {
        view.trigger('displayed', this);
      });

      return view;
    });
  }

  create_obj() {
    this.objArr = [];
    this.object_views = new widgets.ViewList(
      this.add_object_model,
      this.remove_object_view,
      this
    );

    return this.object_views.update(this.model.get('objects')).then(() => {
      var options = {
        volatility: this.model.get('volatility'),
        objects: this.objArr
      };
      this.obj = new H.map.Group(options);

    });

  }
  mapjs_events() {
    //

  }
  model_events() {
    this.listenTo(
      this.model,
      'change:objects',
      function() {
        this.object_views.update(this.model.get('objects'));
      },
      this
    );
  }
}