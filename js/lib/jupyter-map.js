/*
  Copyright (C) 2019-2021 HERE Europe B.V.
  SPDX-License-Identifier: MIT
*/

var map = require('./Map.js');

var layer = require('./layers/Layer.js');
var tilelayer = require('./layers/TileLayer.js')
var geojson = require('./layers/GeoJSON.js');
var kml = require('./layers/Kml.js');
var objectlayer = require('./layers/ObjectLayer.js');

var object = require('./objects/Object.js');
var marker = require('./objects/Marker.js');
var polyline = require('./objects/Polyline.js');
var polygon = require('./objects/Polygon.js');
var icon = require('./objects/Icon.js');
var circle = require('./objects/Circle.js');
var rectangle = require('./objects/Rectangle.js');
var group = require('./objects/Group.js');
var overlay = require('./objects/Overlay.js');
var domicon = require('./objects/DomIcon.js');
var dommarker = require('./objects/DomMarker.js');

var geometry =  require('./geometrys/Geometry.js');
var linestring =  require('./geometrys/LineString.js');
var multilinestring =  require('./geometrys/MultiLineString.js');
var wkt = require('./geometrys/WKT.js');
var point = require('./geometrys/Point.js');
var rect =  require('./geometrys/Rect.js');
var polygongeo = require('./geometrys/Polygon.js');
var multipolygongeo = require('./geometrys/MultiPolygon.js');


var provider = require('./provider/Provider.js');
var xyz = require('./provider/XYZ.js');
var heatmap = require('./provider/HeatMap.js');
var omv = require('./provider/OMV.js');
var maptile =  require('./provider/MapTile.js');
var cluster = require('./provider/MarkerCluster.js');
var iml = require('./provider/IML.js');
var imagetile = require('./provider/ImageTile.js');

var control = require('./control/Control.js');
var zoomcontrol = require('./control/ZoomControl.js');
var mapsettingscontrol = require('./control/MapSettingsControl.js');
var zoomrectangle = require('./control/ZoomRectangle.js');
var scalebar = require('./control/ScaleBar.js');
var widgetcontrol = require('./control/WidgetControl.js');
var fullscreencontrol = require('./control/FullscreenControl.js');
var distnacemeasurement = require('./control/DistanceMeasurementControl.js');
var searchcontrol = require('./control/SearchControl.js');
var splitcontrol = require('./control/SplitMapControl.js');
var layersconstrol = require('./control/LayersControl.js');

var element = require('./element/Element.js');
var infobubble = require('./element/InfoBubble.js');
var style = require('./element/Style.js');

var service = require('./service/Service.js');
var platform = require('./service/Platform.js');
var defaultlayers = require('./service/DefaultLayers.js');

require('./static/map-view.css');
require('@here/maps-api-for-javascript/bin/mapsjs-ui.css');
require('./static/fullscreen.css');
require('./static/searchcontrol.css');
require('./static/layout.css');
require('./static/range.css');

module.exports = {
    // views
    MapView : map.MapView,
    LayerView : layer.LayerView,
    TileLayerView : tilelayer.TileLayerView,
    ObjectView : object.ObjectView,
    MarkerView : marker.MarkerView,
    GeometryView : geometry.GeometryView,
    LineStringView : linestring.LineStringView,
    PolylineView : polyline.PolylineView,
    MultiLineStringView : multilinestring.MultiLineStringView,
    GeoJSONLayerView : geojson.GeoJSONLayerView,
    PolygonView : polygon.PolygonView,
    WKTLayerView : wkt.WKTLayerView,
    ProviderView : provider.ProviderView,
    XYZView : xyz.XYZView,
    HeatMapView : heatmap.HeatMapView,
    IconView: icon.IconView,
    PointView : point.PointView,
    CircleView: circle.CircleView,
    RectView: rect.RectView,
    RectangleView: rectangle.RectangleView,
    ControlView : control.ControlView,
    ZoomControlView : zoomcontrol.ZoomControlView,
    MapSettingsControlView: mapsettingscontrol.MapSettingsControlView,
    ZoomRectangleView : zoomrectangle.ZoomRectangleView,
    ScaleBarView : scalebar.ScaleBarView,
    ElementView : element.ElementView,
    InfoBubbleView : infobubble.InfoBubbleView,
    WidgetControlView : widgetcontrol.WidgetControlView,
    GroupView: group.GroupView,
    FullscreenControlView : fullscreencontrol.FullscreenControlView,
    PolygonGeoView:polygongeo.PolygonGeoView,
    MultiPolygonGeoView: multipolygongeo.MultiPolygonGeoView,
    StyleView: style.StyleView,
    OverlayView : overlay.OverlayView,
    DistanceMeasurementView: distnacemeasurement.DistanceMeasurementView,
    KmlLayerView: kml.KmlLayerView,
    SearchControlView: searchcontrol.SearchControlView,
    SplitMapControlView : splitcontrol.SplitMapControlView,
    DomIconView : domicon.DomIconView,
    DomMarkerView : dommarker.DomMarkerView,
    OMVView : omv.OMVView,
    ServiceView : service.ServiceView,
    PlatformView : platform.PlatformView,
    DefaultLayersView: defaultlayers.DefaultLayersView,
    MapTileView: maptile.MapTileView,
    MarkerClusterView: cluster.MarkerClusterView,
    ObjectLayerView: objectlayer.ObjectLayerView,
    IMLView : iml.IMLView,
    ImageTileProviderView: imagetile.ImageTileProviderView,
    LayersControlView: layersconstrol.LayersControlView,

    // models
    MapModel : map.MapModel,
    LayerModel : layer.LayerModel,
    TileLayerModel : tilelayer.TileLayerModel,
    ObjectModel : object.ObjectModel,
    MarkerModel : marker.MarkerModel,
    GeometryModel : geometry.GeometryModel,
    LineStringModel : linestring.LineStringModel,
    PolylineModel : polyline.PolylineModel,
    MultiLineStringModel : multilinestring.MultiLineStringModel,
    GeoJSONLayerModel : geojson.GeoJSONLayerModel,
    PolygonModel : polygon.PolygonModel,
    WKTLayerModel : wkt.WKTLayerModel,
    ProviderModel : provider.ProviderModel,
    XYZModel : xyz.XYZModel,
    HeatMapModel : heatmap.HeatMapModel,
    IconModel: icon.IconModel,
    PointModel : point.PointModel,
    CircleModel: circle.CircleModel,
    RectModel: rect.RectModel,
    RectangleModel: rectangle.RectangleModel,
    ControlModel : control.ControlModel,
    ZoomControlModel : zoomcontrol.ZoomControlModel,
    MapSettingsControlModel: mapsettingscontrol.MapSettingsControlModel,
    ZoomRectangleModel : zoomrectangle.ZoomRectangleModel,
    ScaleBarModel : scalebar.ScaleBarModel,
    ElementModel : element.ElementModel,
    InfoBubbleModel: infobubble.InfoBubbleModel,
    WidgetControlModel : widgetcontrol.WidgetControlModel,
    GroupModel: group.GroupModel,
    FullscreenControlModel : fullscreencontrol.FullscreenControlModel,
    PolygonGeoModel:polygongeo.PolygonGeoModel,
    MultiPolygonGeoModel: multipolygongeo.MultiPolygonGeoModel,
    StyleModel: style.StyleModel,
    OverlayModel : overlay.OverlayModel,
    DistanceMeasurementModel: distnacemeasurement.DistanceMeasurementModel,
    KmlLayerModel: kml.KmlLayerModel,
    SearchControlModel: searchcontrol.SearchControlModel,
    SplitMapControlModel : splitcontrol.SplitMapControlModel,
    DomIconModel : domicon.DomIconModel,
    DomMarkerModel : dommarker.DomMarkerModel,
    OMVModel : omv.OMVModel,
    ServiceModel : service.ServiceModel,
    PlatformModel : platform.PlatformModel,
    DefaultLayersModel: defaultlayers.DefaultLayersModel,
    MapTileModel: maptile.MapTileModel,
    MarkerClusterModel: cluster.MarkerClusterModel,
    ObjectLayerModel: objectlayer.ObjectLayerModel,
    IMLModel : iml.IMLModel,
    ImageTileProviderModel: imagetile.ImageTileProviderModel,
    LayersControlModel: layersconstrol.LayersControlModel
};