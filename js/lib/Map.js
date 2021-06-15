/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
import H from '@here/maps-api-for-javascript/bin/mapsjs.bundle'

const DEFAULT_LOCATION = [20.5937, 78.9629];

export class MapModel extends widgets.DOMWidgetModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'MapView',
      _model_name: 'MapModel',
      _model_module: '@here/map-widget-for-jupyter',
      _view_module: '@here/map-widget-for-jupyter',

      api_key: "",
      center: DEFAULT_LOCATION,
      zoom: 3.0,
      heading: 180,
      incline: 0,
      tilt: 0,
      bubbles: [],
      layers: [],
      objects: [],
      controls: [],
      basemap: null,
      style: null,
      bounds: [],
    };
  }
}

MapModel.serializers = _.extend({
  // ...widgets.DOMWidgetModel.serializers,
  layers: {
    deserialize: widgets.unpack_models
  },
  objects: {
    deserialize: widgets.unpack_models
  },
  controls: {
    deserialize: widgets.unpack_models
  },
  bubbles: {
    deserialize: widgets.unpack_models
  },
  style: {
    deserialize: widgets.unpack_models
  },
  basemap: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class MapView extends widgets.DOMWidgetView {
  remove_layer_view(child_view) {
    this.obj.removeLayer(child_view.obj);
    child_view.remove();
  }

  add_layer_model(child_model) {
    console.log("MANN " + child_model + " " + child_model.state_change);
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      if (view.obj) {
        this.obj.addLayer(view.obj);
        // Trigger the displayed event of the child view.
        this.displayed.then(() => {
          view.trigger('displayed', this);
        });
      } else {
        console.log("MAP CHILD VIEW IS INCORRECT");
      }
      return view;
    });
  }

  remove_object_view(child_view) {
    this.obj.removeObject(child_view.obj);
    child_view.remove();
  }

  add_object_model(child_model) {
    console.log("Object MANN " + child_model + " " + child_model.state_change);
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      this.obj.addObject(view.obj);
      // Trigger the displayed event of the child view.
      this.displayed.then(() => {
        view.trigger('displayed', this);
      });

      return view;
    });
  }

  remove_control_view(child_view) {
    if (child_view.model.get('name') === 'SplitMapControl') {
      this.el.removeChild(child_view.main_map_container);
      this.map_container.style.width = "100%";
      this.map_container.style.height = "100%";
    } else {
      this.ui.removeControl(child_view.model.get('name'));
    }
    child_view.remove();
  }

  add_control_model(child_model) {
    console.log("MANN " + child_model + " " + child_model.state_change);
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      if (view.obj) {
        console.log("ADDED Control");
        this.ui.addControl(view.model.get('name'), view.obj);
        // Trigger the displayed event of the child view.
        this.displayed.then(() => {
          view.trigger('displayed', this);
        });
      } else {
        console.log("MAP CHILD VIEW IS INCORRECT");
      }
      return view;
    });
  }

  remove_bubble_view(child_view) {
    this.ui.removeBubble(child_view.obj);
    child_view.remove();
  }

  add_bubble_model(child_model) {
    console.log("bubble " + child_model + " " + child_model.state_change);
    return this.create_child_view(child_model, {
      map_view: this
    }).then(view => {
      if (view.obj) {
        console.log("ADDED Bubble");
        this.ui.addBubble(view.obj);
        this.displayed.then(() => {
          view.trigger('displayed', this);
        });
      } else {
        console.log("BUBBLE CHILD VIEW IS INCORRECT");
      }
      return view;
    });
  }

  render() {
    super.render();
    this.el.classList.add('jupyter-widgets');
    this.el.classList.add('mapjs-widgets');
    this.map_container = document.createElement('div');
    this.map_container.style.width = "100%";
    this.map_container.style.height = "100%";
    this.map_container.style.background = "grey";
    this.el.appendChild(this.map_container);
    this.layer_views = new widgets.ViewList(
      this.add_layer_model,
      this.remove_layer_view,
      this
    );

    this.object_views = new widgets.ViewList(
      this.add_object_model,
      this.remove_object_view,
      this
    );

    this.control_views = new widgets.ViewList(
      this.add_control_model,
      this.remove_control_view,
      this
    );

    this.bubble_views = new widgets.ViewList(
      this.add_bubble_model,
      this.remove_bubble_view,
      this
    );
    console.log('HERE');
    //    if (this.get_options().interpolation == 'nearest') {
    //      this.map_container.classList.add('crisp-image');
    //    }
    this.displayed.then(this.render_mapjs.bind(this));
  }

  render_mapjs() {
    this.create_obj().then(() => {
      this.layer_views.update(this.model.get('layers'));
      this.object_views.update(this.model.get('objects'));
      this.control_views.update(this.model.get('controls'));
      this.bubble_views.update(this.model.get('bubbles'));
      this.mapjs_events();
      this.model_events();
      return this;
    });
  }

  create_map() {
    //Step 2: initialize a map
    var pixelRatio = window.devicePixelRatio || 1;
    var map = new H.Map(this.map_container,
      this.basemap, {
        center: {
          lat: this.model.get('center')[0],
          lng: this.model.get('center')[1]
        },
        zoom: this.model.get('zoom'),
        pixelRatio: pixelRatio
      });
    // add tilt, incline, heading, bounds
    let inpBounds = this.model.get('bounds');
    let ViewModelOptions = {
      heading: this.model.get('heading'),
      tilt: this.model.get('tilt'),
      incline: this.model.get('incline')
    };
    if (typeof inpBounds !== 'undefined' && inpBounds.length == 4) {
      let bounds = new H.geo.Rect(inpBounds[1], inpBounds[3], inpBounds[0], inpBounds[2]);
      ViewModelOptions['bounds'] = bounds;
    }
    map.getViewModel().setLookAtData(ViewModelOptions);
    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());

    //Step 3: make the map interactive
    // MapEvents enables the event system, Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    this.behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
    this.obj = map;
    // Add style at load time
    if (this.model.get('style')) {
      this.create_child_view(this.model.get('style')).then((view) => {
        var provider = this.obj.getBaseLayer().getProvider();
        provider.setStyle(view.obj);
      });
    }
    this.ui = new H.ui.UI(map);
    console.log("END OF CREATING OBJECT");

  }

  create_obj() {
    return this.layoutPromise.then(views => {
      const inpBasemap = this.model.get('basemap');
      const inpBasemap_promise = inpBasemap !== null ? this.create_child_view(inpBasemap, {
        map_view: this.map_view
      }) : Promise.resolve(null);

      return Promise.all([inpBasemap_promise]).then(result => {
        this.el.global = this.el;
        console.log('SECOND HERE ' + H.service + " " + this.map_container + " " + this.model.get('api_key'));
        var pixelRatio = window.devicePixelRatio || 1;
        const inpBasemap_view = result[0];
        var Basemap = inpBasemap_view !== null ? inpBasemap_view.obj : null;
        if (Basemap === null) {
          var platform = new H.service.Platform({
            apikey: this.model.get('api_key')
          });
          var defaultLayers = platform.createDefaultLayers({
            tileSize: pixelRatio === 1 ? 256 : 512,
            ppi: pixelRatio === 1 ? undefined : 320
          });
          this.basemap = defaultLayers.vector.normal.map;
          this.create_map();
        } else {
          this.basemap = Basemap;
          this.create_map();
        }
      });
    });

  }

  mapjs_events() {
    this.obj.addEventListener('mapviewchangeend', (evnt) => {
      console.log('HEREE EVENT CHANGE CENTER ');
      var c = evnt.target.getCenter();
      this.model.set('center', [c.lat, c.lng]);
      this.model.set('zoom', evnt.target.getZoom());
      this.model.set('heading', evnt.target.getViewModel().getLookAtData().heading);
      this.model.set('tilt', evnt.target.getViewModel().getLookAtData().tilt);
      this.model.set('incline', evnt.target.getViewModel().getLookAtData().incline);
      this.model.save_changes();
    });
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
    this.listenTo(
      this.model,
      'change:layers',
      function() {
        this.layer_views.update(this.model.get('layers'));
      },
      this
    );
    this.listenTo(
      this.model,
      'change:controls',
      function() {
        this.control_views.update(this.model.get('controls'));
      },
      this
    );
    this.listenTo(
      this.model,
      'change:center',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.setCenter({
            lat: this.model.get('center')[0],
            lng: this.model.get('center')[1]
          });
          this.dirty = false;
        }
        //        this.model.update_bounds().then(() => {
        //          this.touch();
        //        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:zoom',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.setZoom(this.model.get('zoom'));
          this.dirty = false;
        }
        //        this.model.update_bounds().then(() => {
        //          this.touch();
        //        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:heading',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.getViewModel().setLookAtData({
            heading: this.model.get('heading')
          });
          this.dirty = false;
        }
        //        this.model.update_bounds().then(() => {
        //          this.touch();
        //        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:tilt',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.getViewModel().setLookAtData({
            tilt: this.model.get('tilt')
          });
          this.dirty = false;
        }
        //        this.model.update_bounds().then(() => {
        //          this.touch();
        //        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:incline',
      function() {
        if (!this.dirty) {
          this.dirty = true;
          this.obj.getViewModel().setLookAtData({
            incline: this.model.get('incline')
          });
          this.dirty = false;
        }
        //        this.model.update_bounds().then(() => {
        //          this.touch();
        //        });
      },
      this
    );

    this.listenTo(
      this.model,
      'change:bubbles',
      function() {
        this.bubble_views.update(this.model.get('bubbles'));
      },
      this
    );

    this.listenTo(
      this.model,
      'change:style',
      function() {
        this.create_child_view(this.model.get('style')).then((view) => {
          var provider = this.obj.getBaseLayer().getProvider();
          provider.setStyle(view.obj);
        });
      },
      this
    );

    this.listenTo(
      this.model,
      'change:basemap',
      function() {
        this.create_child_view(this.model.get('basemap')).then((view) => {
          this.obj.setBaseLayer(view.obj)
        });
      },
      this
    );
    this.listenTo(
      this.model,
      'change:bounds',
      function() {
        let cbounds = this.model.get('bounds');
        if (typeof cbounds !== 'undefined' && cbounds.length == 4) {
          let bounds = new H.geo.Rect(cbounds[1], cbounds[3], cbounds[0], cbounds[2]);
          this.obj.getViewModel().setLookAtData({bounds: bounds});
        }
      },
      this
    );
  }

  processPhosphorMessage(msg) {
    super.processPhosphorMessage(msg);
    switch (msg.type) {
      case 'resize':
        console.log('Phosphor resize');
        if (this.obj) {
          this.obj.getViewPort().resize();
        }
        break;
      case 'after-show':
        console.log('Phosphor after-show');
        this.obj.getViewPort().resize();
        break;
    }
  }

}