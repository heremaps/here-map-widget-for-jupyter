/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/
const control = require('./Control.js');
const widgets = require('@jupyter-widgets/base');
const _ = require('lodash');
const PMessaging = require('@phosphor/messaging');
const PWidgets = require('@phosphor/widgets');
var centroid = require("@turf/centroid");
var helpers = require("@turf/helpers");

class SearchControl extends H.ui.Control {
  constructor(map_view, searchOpts) {
    super();
    this.map_view = map_view;
    this.options = {
      position: 'topleft',
      textPlaceholder: 'Search...',
      textCancel: 'Cancel', //title in cancel button
      collapsed: true, //collapse search control at startup
      marker: null,
      layer: null,
      propertyName: 'name',
      hideMarkerOnCollapse: false, //remove circle and marker on search control collapsed
      autoCollapseTime: 1200, //delay for autoclosing alert and collapse after blur
      minLength: 1, //minimal text length for autocomplete
      delayType: 400, //delay while typing for show tooltip
      tooltipLimit: -1, //limit max results to show in tooltip. -1 for no limit, 0 for no results
      buildTip: null, //function to return row tip html node(or html string), receive text tooltip in first param
      tipAutoSubmit: true, //auto map panTo when click on tooltip
      autoType: true, //complete input with first suggested result and select this filled-in text.
      zoom: 4, //default zoom level for move to location
      autoCollapse: false, //collapse search control after submit(on button or on tips if enabled tipAutoSubmit)
      textErr: 'Location not found', //error message
      initial: true, //search elements only by initial text
      casesensitive: false, //search elements in case sensitive text,
      lang: 'en-US',
      limit: 10,
    };
    this.options.marker = searchOpts.marker;
    this.options.lang = searchOpts.lang;
    this.options.limit = searchOpts.limit;

    if (searchOpts.hasOwnProperty("zoom")) {
      this.options.zoom = searchOpts.zoom;
    }

    if (searchOpts.hasOwnProperty("layer")) {
      this.options.layer = searchOpts.layer;
    }
    if (searchOpts.hasOwnProperty("property_name")) {
      this.options.propertyName = searchOpts.property_name;
    }
    this._curReq = null;
  }

  renderInternal(el, doc) {
    this.map = el;
    this.doc = doc;

    this.container = doc.createElement('div');
    this.container.className = 'mapjs-control-search';

    el.appendChild(this.container);
    super.renderInternal(el, doc);
    this._inputMinSize = this.options.textPlaceholder ? this.options.textPlaceholder.length : 10;
    this._input = this._createInput(this.options.textPlaceholder, 'search-input');
    this._tooltip = this._createTooltip('search-tooltip');
    this._cancel = this._createCancel(this.options.textCancel, 'search-cancel');
    this._button = this._createButton(this.options.textPlaceholder, 'search-button');
    this._alert = this._createAlert('search-alert');

    if (this.options.collapsed === false)
      this.expand(this.options.collapsed);

    this._markerSearch = this.options.marker;
    this._layer = this.options.layer;

    if (this._layer)
      this.setLayer(this._layer);
  }

  bind(scope, fn) {
    return function() {
      fn.apply(scope, arguments);
    };
  }

  ////start DOM creations
  _createAlert(className) {
    var alert = this.doc.createElement('div');
    alert.className = className;
    alert.style.display = 'none';
    this.container.appendChild(alert);

    alert.addEventListener('click', this.bind(this, this.hideAlert), false);
    return alert;
  }

  _createInput(text, className) {
    var self = this;
    var label = this.doc.createElement('label');
    var input = this.doc.createElement('input');
    label.className = className;
    input.className = className;
    input.type = 'text';
    input.size = this._inputMinSize;
    input.value = '';
    input.autocomplete = 'off';
    input.autocorrect = 'off';
    input.autocapitalize = 'off';
    input.placeholder = text;
    input.style.display = 'none';
    input.role = 'search';
    input.id = input.role + input.type + input.size;

    label.htmlFor = input.id;
    label.style.display = 'none';
    label.value = text;
    this.container.appendChild(label);
    this.container.appendChild(input);

    input.addEventListener('keyup', this.bind(this, this._handleKeypress), false);
    input.addEventListener('paste', function(e) {
      setTimeout(function(e) {
        self._handleKeypress(e);
      }, 10, e);
    }, false);
    input.addEventListener('blur', this.bind(this, this.collapseDelayed), false);
    input.addEventListener('focus', this.bind(this, this.collapseDelayedStop), false);
    return input;
  }

  _createTooltip(className) {
    var self = this;
    var tool = this.doc.createElement('ul');
    tool.className = className;
    tool.style.display = 'none';
    this.container.appendChild(tool);

    tool.addEventListener('blur', this.bind(this, this.collapseDelayed), false);
    tool.addEventListener('mousewheel', this.bind(this, this.collapseDelayedStop), false);
    tool.addEventListener('mouseover', this.bind(this, this.collapseDelayedStop), false);
    return tool;
  }

  _createCancel(title, className) {
    var cancel = this.doc.createElement('a');
    cancel.className = className;
    cancel.href = '#';
    cancel.title = title;
    cancel.style.display = 'none';
    cancel.innerHTML = "<span>&otimes;</span>"; //imageless(see css)
    this.container.appendChild(cancel);

    cancel.addEventListener('click', this.bind(this, this.cancel), false);
    return cancel;
  }

  _createButton(title, className) {
    var button = this.doc.createElement('a');
    button.className = className;
    button.href = '#';
    button.title = title;
    this.container.appendChild(button);
    button.addEventListener('click', this.bind(this, this._handleSubmit), false);
    button.addEventListener('focus', this.bind(this, this.collapseDelayedStop), false);
    button.addEventListener('blur', this.bind(this, this.collapseDelayed), false);
    return button;
  }

  setLayer(layer) { //set search layer at runtime
    this._layer = layer;
    this.map_view.obj.addLayer(this._layer.obj);
    return this;
  }

  _handleSubmit() { //button and tooltip click and enter submit
    this._hideAutoType();

    this.hideAlert();
    this._hideTooltip();

    if (this._input.style.display == 'none') //on first click show _input only
      this.expand();
    else {
      if (this._input.value === '') //hide _input only
        this.collapse();
      else {
        var loc = this._getLocation(this._input.value);

        if (loc === false)
          this.showAlert();
        else {
          this.showLocation(loc, this._input.value);
          if (loc.hasOwnProperty("feature")) {
            this._foundFeature = loc.feature;
          }
          this.dispatchEvent('search:locationfound');
        }
      }
    }
  }

  showAlert(text) {
    var self = this;
    text = text || this.options.textErr;
    this._alert.style.display = 'block';
    this._alert.innerHTML = text;
    clearTimeout(this.timerAlert);

    this.timerAlert = setTimeout(function() {
      self.hideAlert();
    }, this.options.autoCollapseTime);
    return this;
  }

  _getLocation(key) { //extract latlng from _recordsCache
    if (this._recordsCache.hasOwnProperty(key))
      return this._recordsCache[key]; //then after use .loc attribute
    else
      return false;
  }

  _defaultMoveToLocation(latlng, title, map) {
    this.map_view.obj.setCenter(latlng)
    this.map_view.obj.setZoom(this.options.zoom);
  }

  showLocation(latlng, title) { //set location on map from _recordsCache
    if (this._markerSearch) {
      this._markerSearch.setGeometry(latlng);
      this.map_view.obj.addObject(this._markerSearch);
    }

    this._defaultMoveToLocation(latlng, title, self._map);
    //FIXME autoCollapse option hide self._markerSearch before visualized!!
    if (this.options.autoCollapse)
      self.collapse();
    return this;
  }

  hideAlert() {
    this._alert.style.display = 'none';
    return this;
  }

  _hideAutoType() { // deselect text:
    var sel;
    if ((sel = this._input.selection) && sel.empty) {
      sel.empty();
    } else if (this._input.createTextRange) {
      sel = this._input.createTextRange();
      sel.collapse(true);
      var end = this._input.value.length;
      sel.moveStart('character', end);
      sel.moveEnd('character', end);
      sel.select();
    } else {
      if (this._input.getSelection) {
        this._input.getSelection().removeAllRanges();
      }
      this._input.selectionStart = this._input.selectionEnd;
    }
  }

  expand(toggle) {
    toggle = typeof toggle === 'boolean' ? toggle : true;
    this._input.style.display = 'block';
    this.container.classList.add('search-exp');
    if (toggle !== false) {
      this._input.focus();
      this.map_view.on('dragstart click', this.collapse, this);
    }
    return this;
  }

  collapse() {
    this._hideTooltip();
    this.cancel();
    this._alert.style.display = 'none';
    this._input.blur();
    if (this.options.collapsed) {
      this._input.style.display = 'none';
      this._cancel.style.display = 'none';
      this.container.classList.remove('search-exp');
      if (this.options.hideMarkerOnCollapse) {
        this.map_view.removeLayer(this._markerSearch);
      }
      this.map_view.off('dragstart click', this.collapse, this);
    }
    return this;
  }

  collapseDelayed() { //collapse after delay, used on_input blur
    var self = this;
    if (!this.options.autoCollapse) return this;
    clearTimeout(this.timerCollapse);
    this.timerCollapse = setTimeout(function() {
      self.collapse();
    }, this.options.autoCollapseTime);
    return this;
  }

  collapseDelayedStop() {
    clearTimeout(this.timerCollapse);
    return this;
  }

  _hideTooltip() {
    this._tooltip.style.display = 'none';
    this._tooltip.innerHTML = '';
    return 0;
  }

  cancel() {
    this._input.value = '';
    this._handleKeypress({
      keyCode: 8
    }); //simulate backspace keypress
    this._input.size = this._inputMinSize;
    this._input.focus();
    this._cancel.style.display = 'none';
    this._hideTooltip();
    return this;
  }

  _get_loction(feature) {
    if (feature.geometry.type == 'MultiPolygon') {
      var geom = helpers.multiPolygon(feature.geometry.coordinates);
      var point = centroid.default(geom);
      var loc = point.geometry.coordinates;
    } else if (feature.geometry.type == 'Polygon') {
      var geom = helpers.polygon(feature.geometry.coordinates);
      var point = centroid.default(geom);
      var loc = point.geometry.coordinates;
    } else if (feature.geometry.type == 'Point') {
      var loc = feature.geometry.coordinates
    } else if (feature.geometry.type == 'LineString') {
      var geom = helpers.lineString(feature.geometry.coordinates);
      var point = centroid.default(geom);
      var loc = point.geometry.coordinates;
    }
    return loc
  }

  _searchInLayer(layer, retRecords, propName) {
    var self = this;
    if (layer.parsedData.type == 'FeatureCollection') {
      var features = layer.parsedData['features']
      features.forEach(function(item, index) {
        var loc = self._get_loction(item);
        retRecords[item['properties'][propName]] = {
          lat: loc[1],
          lng: loc[0],
          feature: item,
        };
      });
    } else if (layer.parsedData.type == 'Feature') {
      var loc = this._get_loction(layer.parsedData)
      retRecords[layer.parsedData.properties[propName]] = {
        lat: loc[1],
        lng: loc[0]
      };
    }
  }

  _recordsFromLayer(layer) { //return table: key,value from layer
    var self = this,
      retRecords = {},
      propName = this.options.propertyName;

    self._searchInLayer(layer, retRecords, propName);
    return retRecords;
  }

  _defaultFilterData(text, records) {
    var I, icase, regSearch, frecords = {};

    text = text.replace(/[.*+?^${}()|[\]\\]/g, ''); //sanitize remove all special characters
    if (text === '')
      return [];

    I = this.options.initial ? '^' : ''; //search only initial text
    icase = !this.options.casesensitive ? 'i' : undefined;

    regSearch = new RegExp(I + text, icase);

    //TODO use .filter or .map
    for (var key in records) {
      if (regSearch.test(key))
        frecords[key] = records[key];
    }
    return frecords;
  }

  _fillRecordsCache() {
    var self = this,
      inputText = this._input.value,
      records;

    if (this._curReq && this._curReq.abort)
      this._curReq.abort();
    //abort previous requests

    this.container.classList.add('search-load');

    if (this.options.layer) {
      this._recordsCache = this._recordsFromLayer(this._layer);
      records = this._defaultFilterData(this._input.value, this._recordsCache);

      this.showTooltip(records);

      this.container.classList.remove('search-load');

    } else {
      var platform = new H.service.Platform({
        apikey: this.map_view.model.get('api_key')
      });
      const service = platform.getSearchService();
      var geocodingParameters = {
        q: inputText,
        limit: this.options.limit,
        lang: this.options.lang,
      };
      this._curReq = service.geocode(geocodingParameters, function(data) {
        self._recordsCache = self._formatData.call(self, data);
        self.showTooltip(self._recordsCache);
        self.container.classList.remove('search-load');
      }, console.error);
    }
  }

  _formatData(json) {
    var jsonret = {};
    if (json.items.length > 0) {
      json.items.forEach(function(item, index) {
        var latlng = item['position'];
        var loc = item['address']['label'];
        jsonret[loc] = new H.geo.Point(latlng['lat'], latlng['lng']);
      });
    }
    return jsonret;
  }

  showTooltip(records) {
    this._countertips = 0;
    this._tooltip.innerHTML = '';
    this._tooltip.currentSelection = -1; //inizialized for _handleArrowSelect()

    if (this.options.tooltipLimit) {
      for (var key in records) //fill tooltip
      {
        if (this._countertips === this.options.tooltipLimit)
          break;

        this._countertips++;

        this._tooltip.appendChild(this._createTip(key, records[key]));
      }
    }

    if (this._countertips > 0) {
      this._tooltip.style.display = 'block';

      if (this._autoTypeTmp)
        this._autoType();

      this._autoTypeTmp = this.options.autoType; //reset default value
    } else
      this._hideTooltip();

    this._tooltip.scrollTop = 0;
    return this._countertips;
  }

  _autoType() {
    //TODO implements autype without selection(useful for mobile device)
    var start = this._input.value.length,
      firstRecord = this._tooltip.firstChild ? this._tooltip.firstChild._text : '',
      end = firstRecord.length;

    if (firstRecord.indexOf(this._input.value) === 0) { // If prefix match
      this._input.value = firstRecord;
      this._handleAutoresize();

      if (this._input.createTextRange) {
        var selRange = this._input.createTextRange();
        selRange.collapse(true);
        selRange.moveStart('character', start);
        selRange.moveEnd('character', end);
        selRange.select();
      } else if (this._input.setSelectionRange) {
        this._input.setSelectionRange(start, end);
      } else if (this._input.selectionStart) {
        this._input.selectionStart = start;
        this._input.selectionEnd = end;
      }
    }
  }

  _createTip(text, val) { //val is object in recordCache, usually is Latlng
    var tip;
    var self = this;
    tip = this.doc.createElement('div');
    tip.className = 'search-tip';
    tip.innerHTML = text;

    this.container.classList.add('search-tip');
    tip._text = text; //value replaced in this._input and used by _autoType

    if (this.options.tipAutoSubmit)
      tip.addEventListener('click', function(e) {
        self._input.value = text;
        self._handleAutoresize();
        self._input.focus();
        self._hideTooltip();
        self._handleSubmit();
      }, false);
    return tip;
  }

  _handleKeypress(e) { //run _input keyup event
    var self = this;
    switch (e.keyCode) {
      case 27: //Esc
        this.collapse();
        break;
      case 13: //Enter
        if (this._countertips == 1 || (this.options.firstTipSubmit && this._countertips > 0)) {
          if (this._tooltip.currentSelection == -1) {
            this._handleArrowSelect(1);
          }
        }
        this._handleSubmit(); //do search
        break;
      case 38: //Up
        this._handleArrowSelect(-1);
        break;
      case 40: //Down
        this._handleArrowSelect(1);
        break;
      case 8: //Backspace
      case 45: //Insert
      case 46: //Delete
        this._autoTypeTmp = false; //disable temporarily autoType
        break;
      case 37: //Left
      case 39: //Right
      case 16: //Shift
      case 17: //Ctrl
      case 35: //End
      case 36: //Home
        break;
      default: //All keys
        if (this._input.value.length)
          this._cancel.style.display = 'block';
        else
          this._cancel.style.display = 'none';

        if (this._input.value.length >= this.options.minLength) {
          clearTimeout(this.timerKeypress); //cancel last search request while type in
          this.timerKeypress = setTimeout(function() { //delay before request, for limit jsonp/ajax request

            self._fillRecordsCache();

          }, this.options.delayType);
        } else
          this._hideTooltip();
    }

    this._handleAutoresize();
  }

  _handleArrowSelect(velocity) {
    var searchTips = this._tooltip.hasChildNodes() ? this._tooltip.childNodes : [];

    for (i = 0; i < searchTips.length; i++)
      this.container.classList.remove(searchTips[i], 'search-exp');
    //			L.DomUtil.removeClass(searchTips[i], 'search-tip-select');

    if ((velocity == 1) && (this._tooltip.currentSelection >= (searchTips.length - 1))) { // If at end of list.
      this.container.classList.add(searchTips[this._tooltip.currentSelection], 'search-tip-select');
      //			L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');
    } else if ((velocity == -1) && (this._tooltip.currentSelection <= 0)) { // Going back up to the search box.
      this._tooltip.currentSelection = -1;
    } else if (this._tooltip.style.display != 'none') {
      this._tooltip.currentSelection += velocity;

      //			L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');
      this.container.classList.add(searchTips[this._tooltip.currentSelection], 'search-tip-select');

      this._input.value = searchTips[this._tooltip.currentSelection]._text;

      // scroll:
      var tipOffsetTop = searchTips[this._tooltip.currentSelection].offsetTop;

      if (tipOffsetTop + searchTips[this._tooltip.currentSelection].clientHeight >= this._tooltip.scrollTop + this._tooltip.clientHeight) {
        this._tooltip.scrollTop = tipOffsetTop - this._tooltip.clientHeight + searchTips[this._tooltip.currentSelection].clientHeight;
      } else if (tipOffsetTop <= this._tooltip.scrollTop) {
        this._tooltip.scrollTop = tipOffsetTop;
      }
    }
  }

  _handleAutoresize() {
    var maxWidth;

    if (this._input.style.maxWidth !== this.map_view.map_container.offsetWidth) {
      maxWidth = this.map_view.map_container.clientWidth;

      // other side margin + padding + width border + width search-button + width search-cancel
      maxWidth -= 10 + 20 + 1 + 30 + 22;

      this._input.style.maxWidth = maxWidth.toString() + 'px';
    }

    if (this.options.autoResize && (this.container.offsetWidth + 20 < this.map_view.map_container.offsetWidth)) {
      this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
    }
  }


}

export class SearchControlModel extends control.ControlModel {
  defaults() {
    return {
      //      ...super.defaults(),
      _view_name: 'SearchControlView',
      _model_name: 'SearchControlModel',

      name: "SearchControl",
      alignment: "TOP_LEFT",
      zoom: 4,
      lang: 'en-US',
      limit: 10,
      marker: null,
      layer: null,
    }
  }
}

SearchControlModel.serializers = _.extend({
  marker: {
    deserialize: widgets.unpack_models
  },
  layer: {
    deserialize: widgets.unpack_models
  },
}, widgets.DOMWidgetModel.serializers);

export class SearchControlView extends control.ControlView {

  create_obj() {
    console.log("Creating SearchControl");
    const marker = this.model.get('marker');
    const zoom = this.model.get('zoom');
    const layer = this.model.get('layer');
    const property_name = this.model.get('property_name');
    const lang = this.model.get('lang');
    const limit = this.model.get('limit');

    const marker_promise = marker !== null ? this.create_child_view(marker, {
      map_view: this.map_view
    }) : Promise.resolve(null);
    const layer_promise = layer !== null ? this.create_child_view(layer, {
      map_view: this.map_view
    }) : Promise.resolve(null);
    return Promise.all([marker_promise, layer_promise]).then(result => {
      const marker_view = result[0];
      const layer_view = result[1];
      var mrkr = marker_view !== null ? marker_view.obj : null;
      var lyr = layer_view !== null ? layer_view : null;
      var opts = {
        marker: mrkr,
        'zoom': zoom,
        'lang': lang,
        'limit': limit,
        'property_name': property_name,
        'layer': lyr,
      };
      this.obj = new SearchControl(this.map_view, opts);
      this.obj.setAlignment(_.get(H.ui.LayoutAlignment, this.model.get('alignment')));
    });
  }

  model_events() {
    if (this.model.get('layer') !== null) {
      this.obj.addEventListener("search:locationfound", (evnt) => {
        this.send({
          event: 'found',
          feature: evnt.target._foundFeature,
        });
      });
    }
  }
}