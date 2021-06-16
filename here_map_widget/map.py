# Copyright (C) 2019-2021 HERE Europe B.V.
# SPDX-License-Identifier: MIT

"""
This is the main script which contains all the python side model.
"""

import copy
import json

from branca.colormap import ColorMap, linear
from ipywidgets import (
    Box,
    CallbackDispatcher,
    DOMWidget,
    Widget,
    interactive,
    widget_serialization,
)
from traitlets import (
    Any,
    Bool,
    CFloat,
    Dict,
    Float,
    Instance,
    Int,
    List,
    TraitError,
    Tuple,
    Unicode,
    Union,
    default,
    link,
    observe,
    validate,
)

from ._version import EXTENSION_VERSION
from .configs import DefaultLayerNames

def_loc = [20.5937, 78.9629]


class InteractMixin(object):
    """Abstract InteractMixin class."""

    def interact(self, **kwargs):
        c = []
        for name, abbrev in kwargs.items():
            default = getattr(self, name)
            widget = interactive.widget_from_abbrev(abbrev, default)
            if not widget.description:
                widget.description = name
            widget.link = link((widget, "value"), (self, name))
            c.append(widget)
        cont = Box(children=c)
        return cont


class Element(Widget):
    """Abstract Element class.

    Base class for all UI element.
    """

    _view_name = Unicode("ElementView").tag(sync=True)
    _model_name = Unicode("ElementModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class Style(Element):
    """Style class

    Style configuration class.

    Attributes
    ----------
    config: string
        Either a URL to load the style from,
        YAML formatted string or an object describing the rendering style.
    base_url: string, default None
        The base URL to use for resolving relative URLs in the style like textures, fonts.
    """

    _view_name = Unicode("StyleView").tag(sync=True)
    _model_name = Unicode("StyleModel").tag(sync=True)

    config = Unicode("").tag(sync=True)
    base_url = Unicode(default_value=None, allow_none=True).tag(sync=True)


class Service(Widget):
    """Service class.

    Base class for all service types.
    """

    _view_name = Unicode("ServiceView").tag(sync=True)
    _model_name = Unicode("ServiceModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class Platform(Service):
    """Platform Class.

    Platform is a central class from which all other service stubs are created.
    It contains the shared configs to be passed to the individual service stubs.

    Attributes
    ----------
    api_key: string
        API Key used for authentication.
    services_config: dict
        config of various services which are instantiated using :class:`Platform` object.
    """

    _view_name = Unicode("PlatformView").tag(sync=True)
    _model_name = Unicode("PlatformModel").tag(sync=True)

    api_key = Unicode("").tag(sync=True)
    services_config = Dict(default_value=None, allow_none=True).tag(sync=True)


class Provider(Widget):
    """Provider class

    Base class for all provider types.
    """

    _view_name = Unicode("ProviderView").tag(sync=True)
    _model_name = Unicode("ProviderModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class XYZ(Provider):
    """XYZ Provider class

    Provider for fetching data from XYZ Hub or HERE Data Hub APIs.

    Attributes
    ----------
    token: string
        XYZ token to access XYZ space data.
    space_id: string
        Space id from which to access the data.
    evt_type: string
        Event on which to show info bubble for space data.
    show_bubble: boolean
        To determine whether to show info bubble for space data or not.
    style: object
        To provide style to for the XYZ space data.
    """

    _view_name = Unicode("XYZView").tag(sync=True)
    _model_name = Unicode("XYZModel").tag(sync=True)

    token = Unicode("").tag(sync=True)
    space_id = Unicode("").tag(sync=True)
    evt_type = Unicode("tap").tag(sync=True)
    show_bubble = Bool(False).tag(sync=True)

    style = Instance(Style, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    platform = Instance(Platform, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )

    _click_callbacks = Instance(CallbackDispatcher, ())
    _hover_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(XYZ, self).__init__(**kwargs)
        self.on_msg(self._handle_m_msg)

    def _handle_m_msg(self, _, content, buffers):
        if content.get("event", "") == "tap":
            self._click_callbacks(**content)
        if content.get("event", "") == "pointermove":
            self._hover_callbacks(**content)

    def on_click(self, callback, remove=False):
        """
        The click callback takes an unpacked set of keyword arguments.
        """
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_hover(self, callback, remove=False):
        """
        The hover callback takes an unpacked set of keyword arguments.
        """
        self._hover_callbacks.register_callback(callback, remove=remove)


class HeatMap(Provider):
    """HeatMap Provider class

    Provides tiles to visualize value-based or density-based heat maps.

    Attributes
    ----------
    colors: dict
        An dict object defining the color stops.
    interpolate: boolean
        A value indicating whether interpolation is to be used
        to display smooth color transitions in the heat map.
    opacity: float
        The opacity which is used for the rendering of
        the heatmap in range [0..1].
    assume_values: boolean
        A Boolean value indicating whether to paint assumed
        values in regions where no data is available.
    data: list
        Data list which is used to generate heat map.
    hardReload: boolean
        A value indicating whether to invalidate in
        hard mode (True) or in soft mode (False) while adding data.
    """

    _view_name = Unicode("HeatMapView").tag(sync=True)
    _model_name = Unicode("HeatMapModel").tag(sync=True)

    colors = Dict().tag(sync=True)
    interpolate = Bool(False).tag(sync=True)
    opacity = Float(1.0).tag(sync=True)
    assume_values = Bool(True).tag(sync=True)
    data = List().tag(sync=True)
    hardReload = Bool(False).tag(sync=True)
    clear_flag = Int(1).tag(sync=True)

    def add_data(self, data):
        """Add data on Heat Map.

        Parameters
        ----------
        data: list
             Data list which is used to generate heat map.
        """
        self.data = data

    def clear(self):
        """Clear Heat Map."""
        self.clear_flag = 1 if self.clear_flag == 0 else 0


class IML(Provider):
    """IML Provider class.

    Provider for fetching data from Interactive Map Layer.

    Attributes
    ----------
    catalog_hrn: string
        Catalog HRN.
    layer_id: string
        Id of interactive map layer.
    """

    _view_name = Unicode("IMLView").tag(sync=True)
    _model_name = Unicode("IMLModel").tag(sync=True)

    catalog_hrn = Unicode().tag(sync=True)
    layer_id = Unicode().tag(sync=True)


class Layer(Widget):
    """Layer class

    Base class for all layer types.
    """

    _view_name = Unicode("LayerView").tag(sync=True)
    _model_name = Unicode("LayerModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    name = Unicode("").tag(sync=True)


class TileLayer(Layer):
    """Tile layer class

    Represents data shown on the map as a set of tiles.

    Attributes
    ----------
    provider: object
        Data source for the TileLayer.
    style: dict
        The style to use for rendering data provided by the provider.
    """

    _view_name = Unicode("TileLayerView").tag(sync=True)
    _model_name = Unicode("TileLayerModel").tag(sync=True)

    provider = Instance(Provider).tag(sync=True, **widget_serialization)
    style = Dict().tag(sync=True)


class GeoJSON(Layer):
    """GeoJSON layer class

    Represents GeoJSON data shown on the map.

    Attributes
    ----------
    data: dict
        GeoJSON Data to be plotted.
    url: string
        GeoJSON Data URL to be plotted.
    disable_legacy_mode: boolean, default True
        Disable legacy mode for parsing GeoJSON data.
    style: dict
        The style to use for rendering GeoJSON data.
    hover_style: dict
        The style to use for rendering data when hovered over.
    evt_type: string, default tap
        Event type to be used to apply hover_style.
    show_bubble: boolean, default True
        To determine whether to show info bubble for GeoJSON data or not.
    style_callback: function
        A callback function which is called for each feature,
        to generate style for the feature.
    """

    _view_name = Unicode("GeoJSONLayerView").tag(sync=True)
    _model_name = Unicode("GeoJSONLayerModel").tag(sync=True)

    data = Dict().tag(sync=True)
    url = Unicode("").tag(sync=True)
    disable_legacy_mode = Bool(True).tag(sync=True)
    style = Dict().tag(sync=True)
    hover_style = Dict().tag(sync=True)
    point_style = Dict().tag(sync=True)
    evt_type = Unicode("tap").tag(sync=True)
    show_bubble = Bool(False).tag(sync=True)
    style_callback = Any()

    _click_callbacks = Instance(CallbackDispatcher, ())
    _hover_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super(GeoJSON, self).__init__(**kwargs)
        self.on_msg(self._handle_m_msg)

    def _handle_m_msg(self, _, content, buffers):
        if content.get("event", "") == "tap":
            self._click_callbacks(**content)
        if content.get("event", "") == "pointermove":
            self._hover_callbacks(**content)

    def on_click(self, callback, remove=False):
        """
        The click callback takes an unpacked set of keyword arguments.
        """
        self._click_callbacks.register_callback(callback, remove=remove)

    def on_hover(self, callback, remove=False):
        """
        The hover callback takes an unpacked set of keyword arguments.
        """
        self._hover_callbacks.register_callback(callback, remove=remove)

    @validate("style_callback")
    def _validate_style_callback(self, proposal):
        if not callable(proposal.value):
            raise TraitError("style_callback should be callable (functor/function/lambda)")
        return proposal.value

    @observe("data", "style", "style_callback")
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        if "type" not in self.data:
            # We can't apply a style we don't know what the data look like
            return self.data

        datatype = self.data["type"]

        style_callback = None
        if self.style_callback:
            style_callback = self.style_callback
        elif self.style:
            style_callback = lambda feature: self.style
        else:
            # No style to apply
            return self.data

        if datatype == "Feature":
            self._apply_style(self.data, style_callback)
        elif datatype == "FeatureCollection":
            for feature in self.data["features"]:
                self._apply_style(feature, style_callback)

        return self.data

    def _apply_style(self, feature, style_callback):
        if "properties" not in feature:
            feature["properties"] = {}
        properties = feature["properties"]
        if "style" in properties:
            properties["style"].update(style_callback(feature))
        else:
            properties["style"] = style_callback(feature)


class KML(Layer):
    """KML layer class

    Represents KML data shown on the map.

    Attributes
    ----------
    url: string
        KML Data URL to be plotted.
    """

    _view_name = Unicode("KmlLayerView").tag(sync=True)
    _model_name = Unicode("KmlLayerModel").tag(sync=True)

    url = Unicode("").tag(sync=True)


class ObjectLayer(Layer):
    """ObjectLayer class.

    Layer which renders map objects.

    Attributes
    ----------
    tile_size: Int, default 256
        The size of the tiles rendered by this layer for polylines and polygons.
    tile_cache_size: Int, default 256
        The number of fully rendered spatial tiles that are cached for immediate reuse
    data_cache_size: Int, default 512
        The number of tiles to cache which have render data only.
    pixel_ratio: Int
        The pixel ratio to use for over-sampling on high-resolution displays,
        the default is window.devicePixelRatio.
    """

    _view_name = Unicode("ObjectLayerView").tag(sync=True)
    _model_name = Unicode("ObjectLayerModel").tag(sync=True)

    provider = Instance(Provider).tag(sync=True, **widget_serialization)

    tile_size = Int(256).tag(sync=True)
    tile_cache_size = Int(256).tag(sync=True)
    data_cache_size = Int(512).tag(sync=True)
    pixel_ratio = Int(0).tag(sync=True)


class GeoData(GeoJSON):
    """GeoData class.

    Layer created from a GeoPandas dataframe.

    Attributes
    ----------
    geo_dataframe: geopandas.GeoDataFrame instance, default None
        The GeoPandas dataframe to use.
    """

    geo_dataframe = Instance("geopandas.GeoDataFrame")

    def __init__(self, **kwargs):
        super(GeoData, self).__init__(**kwargs)
        self.data = self._get_data()

    @observe("geo_dataframe", "style", "style_callback")
    def _update_data(self, change):
        self.data = self._get_data()

    def _get_data(self):
        return json.loads(self.geo_dataframe.to_json())

    @property
    def __geo_interface__(self):
        return self.geo_dataframe.__geo_interface__


class Choropleth(GeoJSON):
    """Choropleth class.

    Layer showing a Choropleth effect on a GeoJSON structure.

    Attributes
    ----------
    geo_data: dict, default None
        The GeoJSON structure on which to apply the Choropleth effect.
    choro_data: dict, default None
        Data used for building the Choropleth effect.
    value_min: float, default None
        Minimum data value for the color mapping.
    value_max: float, default None
        Maximum data value for the color mapping.
    colormap: branca.colormap.ColorMap instance, default None
        The colormap used for the effect.
    key_on: string, default "id"
        The feature key to use for the colormap effect.
    """

    geo_data = Dict()
    choro_data = Dict()
    value_min = CFloat(None, allow_none=True)
    value_max = CFloat(None, allow_none=True)
    colormap = Instance(ColorMap)
    key_on = Unicode("id")

    @observe(
        "style", "style_callback", "value_min", "value_max", "geo_data", "choro_data", "colormap",
    )
    def _update_data(self, change):
        self.data = self._get_data()

    @default("colormap")
    def _default_colormap(self):
        return linear.OrRd_06

    @default("style_callback")
    def _default_style_callback(self):
        def compute_style(feature, colormap, choro_data):
            return dict(
                fillColor=colormap.rgb_hex_str(choro_data), strokeColor="black", weight=0.9,
            )

        return compute_style

    def _get_data(self):
        if not self.geo_data:
            return {}

        if self.value_min is None:
            self.value_min = min(self.choro_data.items(), key=lambda x: x[1])[1]
        if self.value_max is None:
            self.value_max = max(self.choro_data.items(), key=lambda x: x[1])[1]

        colormap = self.colormap.scale(self.value_min, self.value_max)
        data = copy.deepcopy(self.geo_data)

        for feature in data["features"]:
            feature["properties"]["style"] = self.style_callback(
                feature, colormap, self.choro_data[feature[self.key_on]]
            )

        return data

    def __init__(self, **kwargs):
        super(Choropleth, self).__init__(**kwargs)
        self.data = self._get_data()


class Object(Widget):
    """Object class

    Base class for all object types.
    """

    _view_name = Unicode("ObjectView").tag(sync=True)
    _model_name = Unicode("ObjectModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class Geometry(Widget):
    """Geometry class

    Base class for all geometry types.
    """

    _view_name = Unicode("GeometryView").tag(sync=True)
    _model_name = Unicode("GeometryModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class WKT(Geometry):
    """WKT Geometry class

    Class that represents WKT data for a geometry.

    Attributes
    ----------
    data: string
        WKT data to be plotted on map.
    """

    _view_name = Unicode("WKTLayerView").tag(sync=True)
    _model_name = Unicode("WKTLayerModel").tag(sync=True)

    data = Unicode().tag(sync=True)


class LineString(Geometry):
    """LineString Geometry class

    LineString is a geometry of connected line segments in geographic space.

    Attributes
    ----------
    points: List[Point]
        Points from which LineString is generated.
    """

    _view_name = Unicode("LineStringView").tag(sync=True)
    _model_name = Unicode("LineStringModel").tag(sync=True)

    points = List().tag(sync=True)

    @validate("points")
    def _validate_points(self, proposal):
        if len(proposal) % 3 != 0:
            raise Exception(
                "Values for points is incorrect, each point in the LineString should have a lat, "
                "long and altitude"
            )
        return proposal.value

    def push_point(self, lat, lng, alt=0):
        """Pushes the lat, lng, alt values as a H.geo.Point
        to the end of this LineString.

        Parameters
        ----------
        lat: float
             Latitude for the point to be added.
        lng: float
             Longitude for the point to be added.
        alt: float, default 0
             Altitude for the point to be added.
        """
        self.points = self.points + [lat, lng, alt]


class MultiLineString(Geometry):
    """MultiLineString Geometry class

    MultiLineString is a collection of line strings.

    Attributes
    ----------
    lines: List[LineString]
        LineStrings from which MultiLineString is generated.
    """

    _view_name = Unicode("MultiLineStringView").tag(sync=True)
    _model_name = Unicode("MultiLineStringModel").tag(sync=True)

    lines = List().tag(trait=Instance(LineString), sync=True, **widget_serialization)

    _lines_ids = List()

    @validate("lines")
    def _validate_lines(self, proposal):
        """Validate lines list.

        Makes sure only one instance of any given lines can exist in the
        lines list.
        """
        self._lines_ids = [o.model_id for o in proposal.value]
        if len(set(self._lines_ids)) != len(self._lines_ids):
            raise Exception("duplicate lines detected, only use each lines once")
        return proposal.value

    def push_line(self, line):
        """Pushes the line to the end of this MultiLineString.

        Parameters
        ----------
        line: LineString
             LineString to be added to the MultiLineString.
        """
        if line.model_id in self._lines_ids:
            raise Exception("line already on map: %r" % line)
        self.lines = tuple([o for o in self.lines] + [line])

    def add_lines(self, line_list: list):
        """Pushes the list of lines to the end of this MultiLineString.

        Parameters
        ----------
        line_list: List[LineString]
             List of LineString to be added to the MultiLineString.
        """
        cur_objs = list(self.lines)
        for line in line_list:
            if line.model_id in self._lines_ids:
                raise Exception("line already on map: %r" % line)
            cur_objs.append(line)
        self.lines = tuple(cur_objs)

    def remove_line(self, line):
        """Removed the line from MultiLineString.

        Parameters
        ----------
        line: LineString
             LineString to be removed from the MultiLineString.
        """
        if line.model_id not in self._lines_ids:
            raise Exception("line not on map: %r" % line)
        self.lines = tuple([o for o in self.lines if o.model_id != line.model_id])

    # def push_line(self, line):
    #     self.lines = self.lines + [line]


class Point(Geometry):
    """Point Geometry class

    Point represents a geographical point.

    Attributes
    ----------
    lat: float
         Latitude for the point.
    lng: float
         Longitude for the point.
    alt: float, default 0
         Altitude for the point.
    """

    _view_name = Unicode("PointView").tag(sync=True)
    _model_name = Unicode("PointModel").tag(sync=True)

    lat = Float().tag(sync=True)
    lng = Float().tag(sync=True)
    alt = Float(0.0).tag(sync=True)


class DataPoint(Geometry):
    """DataPoint class

    This class represents the input data structure for data points to be clustered.

    Attributes
    ----------
    lat: float
         Latitude for the point.
    lng: float
         Longitude for the point.
    weight: int, default 1
         The weight of the data point as a positive number.
    data: str, default ''.
       Data, which will be associated with the given DataPoint.
    """

    _view_name = Unicode("DataPointView").tag(sync=True)
    _model_name = Unicode("DataPointModel").tag(sync=True)

    lat = Float().tag(sync=True)
    lng = Float().tag(sync=True)
    weight = Int(1).tag(sync=True)
    data = Unicode("").tag(sync=True)


class Bbox(Geometry):
    """Bbox Geometry class

    Bounding Box represents a rectangular geographic area
    defined by the geographic coordinates.

    Attributes
    ----------
    top: float
         A value indicating the northern-most latitude.
    left: float
         A value indicating the left-most longitude.
    bottom: float
         A value indicating the southern-most latitude.
    right: float
         A value indicating the right-most latitude.
    """

    _view_name = Unicode("RectView").tag(sync=True)
    _model_name = Unicode("RectModel").tag(sync=True)

    top = Float().tag(sync=True)
    left = Float().tag(sync=True)
    bottom = Float().tag(sync=True)
    right = Float().tag(sync=True)


class GeoPolygon(Geometry):
    """GeoPolygon Geometry class

    GeoPolygon represents a plane figure that is defined by an exterior
    ring (finite chain of straight line segments) and zero or more
    interior rings which are rendered by using the Even–odd rule.

    Attributes
    ----------
    linestring: object
         The exterior ring of the polygon.
    holes: list
         The interior rings of the polygon.
    """

    _view_name = Unicode("PolygonGeoView").tag(sync=True)
    _model_name = Unicode("PolygonGeoModel").tag(sync=True)

    linestring = Instance(LineString).tag(sync=True, **widget_serialization)
    holes = List().tag(trait=Instance(LineString), sync=True, **widget_serialization)

    _holes_ids = List()

    @validate("holes")
    def _validate_holes(self, proposal):
        """Validate holes list.

        Makes sure only one instance of any given holes can exist in the
        holes list.
        """
        self._holes_ids = [o.model_id for o in proposal.value]
        if len(set(self._holes_ids)) != len(self._holes_ids):
            raise Exception("duplicate holes detected, only use each holes once")
        return proposal.value

    def push_hole(self, hole):
        """Add hole on GeoPolygon.

        Parameters
        ----------
        hole: LineString
             The interior ring to add.
        """
        if hole.model_id in self._holes_ids:
            raise Exception("hole already on map: %r" % hole)
        self.holes = tuple([o for o in self.holes] + [hole])

    def add_holes(self, hole_list: list):
        """Add holes on GeoPolygon.

        Parameters
        ----------
        hole_list: List[LineString]
             The interior rings to be added.
        """
        cur_objs = list(self.holes)
        for hole in hole_list:
            if hole.model_id in self._holes_ids:
                raise Exception("hole already on map: %r" % hole)
            cur_objs.append(hole)
        self.holes = tuple(cur_objs)

    def remove_hole(self, hole):
        """Remove hole from the GeoPolygon.

        Parameters
        ----------
        hole: LineString
             The interior ring to be removed.
        """
        if hole.model_id not in self._holes_ids:
            raise Exception("hole not on map: %r" % hole)
        self.holes = tuple([o for o in self.holes if o.model_id != hole.model_id])

    def set_exterior(self, line):
        """To set the exterior ring of the GeoPolygon.

        Parameters
        ----------
        line: LineString
             The exterior ring to set.
        """
        if isinstance(line, LineString):
            self.linestring = line
        else:
            raise Exception("exterior ring must be a LineString")


class GeoMultiPolygon(Geometry):
    """GeoMultiPolygon Geometry class

    GeoMultiPolygon represents a collection of polygons.

    Attributes
    ----------
    polygons: List[GeoPolygon]
         The list of GeoPolygon which are initially represented by the GeoMultiPolygon.
    """

    _view_name = Unicode("MultiPolygonGeoView").tag(sync=True)
    _model_name = Unicode("MultiPolygonGeoModel").tag(sync=True)

    polygons = List().tag(trait=Instance(GeoPolygon), sync=True, **widget_serialization)

    _polygons_ids = List()

    @validate("polygons")
    def _validate_polygons(self, proposal):
        """Validate polygons list.

        Makes sure only one instance of any given polygons can exist in the
        polygons list.
        """
        self._polygons_ids = [o.model_id for o in proposal.value]
        if len(set(self._polygons_ids)) != len(self._polygons_ids):
            raise Exception("duplicate v detected, only use each polygons once")
        return proposal.value

    def push_polygon(self, polygon):
        """Add GeoPolygon on GeoMultiPolygon.

        Parameters
        ----------
        polygon: GeoPolygon
             GeoPolygon to be added to the end of GeoMultiPolygon.
        """
        if polygon.model_id in self._polygons_ids:
            raise Exception("polygon already on map: %r" % polygon)
        self.polygons = tuple([o for o in self.polygons] + [polygon])

    def add_polygons(self, polygon_list: list):
        """Add GeoPolygons on GeoMultiPolygon.

        Parameters
        ----------
        polygon_list: List[GeoPolygon]
             Add GeoPolygons in the GeoMultiPolygon.
        """
        cur_objs = list(self.polygons)
        for polygon in polygon_list:
            if polygon.model_id in self._polygons_ids:
                raise Exception("polygon already on map: %r" % polygon)
            cur_objs.append(polygon)
        self.polygons = tuple(cur_objs)

    def remove_polygon(self, polygon):
        """Remove the GeoPolygon from GeoMultiPolygon.

        Parameters
        ----------
        polygon: GeoPolygon
             GeoPolygon to be removed from the GeoMultiPolygon.
        """
        if polygon.model_id not in self._polygons_ids:
            raise Exception("polygon not on map: %r" % polygon)
        self.polygons = tuple([o for o in self.polygons if o.model_id != polygon.model_id])


class Polyline(Object):
    """Polyline Object class

    Polyline is a visual representation of connected line segments on a map.

    Attributes
    ----------
    object: object
         The geometry that defines the line segments of the polyline.
    style: dict
         The style to be used when tracing the polyline.
    draggable: boolean
         To make polyline draggable.
    """

    _view_name = Unicode("PolylineView").tag(sync=True)
    _model_name = Unicode("PolylineModel").tag(sync=True)

    # object = Union((Instance(LineString), Instance(AwesomeIcon))
    object = Union((Instance(MultiLineString), Instance(LineString), Instance(WKT))).tag(
        sync=True, **widget_serialization
    )
    style = Dict().tag(sync=True)
    draggable = Bool(False).tag(sync=True)


class Polygon(Object):
    """Polygon Object class

    Polygon is a visual representation of a surface on a map.

    Attributes
    ----------
    object: object
         The geometry that defines the surface of the polygon.
    style: dict
         The style to be used when tracing the spatial object.
    draggable: boolean
         To make polygon draggable.
    extrusion: float
         The extrusion height for the polygon in meters, default is 0.
    elevation: float
         The elevation height of the polygon in meters, default is 0.
    """

    _view_name = Unicode("PolygonView").tag(sync=True)
    _model_name = Unicode("PolygonModel").tag(sync=True)

    object = Union(
        (Instance(LineString), Instance(WKT), Instance(GeoPolygon), Instance(GeoMultiPolygon),)
    ).tag(sync=True, **widget_serialization)
    style = Dict().tag(sync=True)
    draggable = Bool(False).tag(sync=True)
    extrusion = Float(0).tag(sync=True)
    elevation = Float(0).tag(sync=True)


class Circle(Object, InteractMixin):
    """Circle Object class

    Circle is a visual representation of a circular shaped surface on a map.

    Attributes
    ----------
    center: object
         The geographical coordinates of the center of the circle
    radius: float
         The radius of the circle in meters
    style: dict
         The style to be used when tracing the polyline (circle)
    draggable: boolean
         To make circle draggable.
    extrusion: float
         The extrusion height for the circle in meters, default is 0.
    elevation: float
         The elevation height of the circle in meters, default is 0.
    """

    _view_name = Unicode("CircleView").tag(sync=True)
    _model_name = Unicode("CircleModel").tag(sync=True)

    center = Instance(Point).tag(sync=True, **widget_serialization)
    radius = Float(100).tag(sync=True)
    style = Dict().tag(sync=True)
    draggable = Bool(False).tag(sync=True)
    extrusion = Float(0).tag(sync=True)
    elevation = Float(0).tag(sync=True)


class Rectangle(Object):
    """Rectangle Object class

    Rectangle is a visual representation of a rectangular shaped surface on a map.

    Attributes
    ----------
    bbox: object
         The geographical bounding box for the rectangle.
    style: dict
         The style to be used when tracing the spatial object.
    draggable: boolean
         To make rectangle draggable.
    extrusion: float
         The extrusion height for the rectangle in meters, default is 0.
    elevation: float
         The elevation height of the rectangle in meters, default is 0.
    """

    _view_name = Unicode("RectangleView").tag(sync=True)
    _model_name = Unicode("RectangleModel").tag(sync=True)

    bbox = Instance(Bbox).tag(sync=True, **widget_serialization)
    style = Dict().tag(sync=True)
    draggable = Bool(False).tag(sync=True)
    extrusion = Float(0).tag(sync=True)
    elevation = Float(0).tag(sync=True)


class Icon(Object):
    """Icon Object class

    Icon is a visual representation of the Marker.

    Attributes
    ----------
    bitmap: string
         An image URL, an SVG (string), an bitmap image or a canvas.
    height: float
         Height of the icon.
    width: float
         Width of the icon.
    anchor: dict
         The anchor point in pixels, the default is bottom-center.
    """

    _view_name = Unicode("IconView").tag(sync=True)
    _model_name = Unicode("IconModel").tag(sync=True)

    bitmap = Unicode().tag(sync=True)
    height = Float(256).tag(sync=True)
    width = Float(256).tag(sync=True)
    anchor = Dict(default_value=None, allow_none=True).tag(sync=True)


class DomIcon(Object):
    """DomIcon Object class

    DomIcon is a visual representation of a DomMarker.

     Attributes
    ----------
    element: string
         The element or markup to use for this icon.
    """

    _view_name = Unicode("DomIconView").tag(sync=True)
    _model_name = Unicode("DomIconModel").tag(sync=True)

    element = Unicode().tag(sync=True)


class InfoBubble(Element):
    """InfoBubble class

    Information bubble bound to a geographic position on the map.

    Attributes
    ----------
    content: string
        The content to be added to the info bubble.
    position: object
        The geographic location to which this info bubble corresponds.
    """

    _view_name = Unicode("InfoBubbleView").tag(sync=True)
    _model_name = Unicode("InfoBubbleModel").tag(sync=True)

    content = Unicode().tag(sync=True)
    position = Instance(Point).tag(sync=True, **widget_serialization)


class Marker(Object, InteractMixin):
    """Marker Object class

    Marker is a visual representation of a location on a map
    in the form of a static bitmap icon.

    Attributes
    ----------
    lat: float
        Latitude for the marker to be added.
    lng: float
        Longitude for the marker to be added.
    alt: float, default 0
        Altitude for the marker to be added.
    data: string
        Optional arbitrary data to be stored with the given map object.
    draggable: boolean
        To make Marker draggable.
    evt_type: string, deafult pointerenter
        Event type on which info bubble is showed.
    show_bubble: boolean
        To determine whether to show info bubble for marker or not.
    object: object
        A WKT object to set position of Marker.
    icon: object
        A Icon object which is set for the Marker.
    info: object
        A InfoBubble object which is set for the Marker.
    """

    _view_name = Unicode("MarkerView").tag(sync=True)
    _model_name = Unicode("MarkerModel").tag(sync=True)

    lat = Float().tag(sync=True)
    lng = Float().tag(sync=True)
    alt = Float(0.0).tag(sync=True)
    data = Unicode("").tag(sync=True)
    draggable = Bool(False).tag(sync=True)
    evt_type = Unicode("pointerenter").tag(sync=True)
    show_bubble = Bool(False).tag(sync=True)

    object = Instance(WKT, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    icon = Instance(Icon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    info = Instance(InfoBubble, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )


class DomMarker(Object):
    """DomMarker Object class

    DomMarker is a visual representation of a location on a map
    in the form of a fully styleable and scripteable DOM element.

    Attributes
    ----------
    lat: float
        Latitude for the marker to be added.
    lng: float
        Longitude for the marker to be added.
    alt: float, default 0
        Altitude for the marker to be added.
    icon: object
        DomIcon object to be added as marker.
    """

    _view_name = Unicode("DomMarkerView").tag(sync=True)
    _model_name = Unicode("DomMarkerModel").tag(sync=True)

    lat = Float().tag(sync=True)
    lng = Float().tag(sync=True)
    alt = Float(0.0).tag(sync=True)

    icon = Instance(DomIcon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )


class Group(Object):
    """Group Object class

    Group is a container for other map objects.

    Attributes
    ----------
    volatility: boolean, default False
        Indicates whether the map object is volatile,
        the default is false.
    objects: List
        A list of map objects to add initially to this group.
    """

    _view_name = Unicode("GroupView").tag(sync=True)
    _model_name = Unicode("GroupModel").tag(sync=True)

    volatility = Bool(False).tag(sync=True)
    objects = Tuple().tag(trait=Instance(Object), sync=True, **widget_serialization)

    _object_ids = List()

    @validate("objects")
    def _validate_objects(self, proposal):
        """Validate objects list.

        Makes sure only one instance of any given object can exist in the
        objects list.
        """
        self._object_ids = [o.model_id for o in proposal.value]
        if len(set(self._object_ids)) != len(self._object_ids):
            raise Exception("duplicate object detected, only use each object once")
        return proposal.value

    def add_object(self, object):
        """Add object to group.

        Parameters
        ----------
        object: object
             Object to be added to the group.
        """
        if object.model_id in self._object_ids:
            raise Exception("object already on map: %r" % object)
        self.objects = tuple([o for o in self.objects] + [object])

    def add_objects(self, objects: list):
        """Add objects to group.

        Parameters
        ----------
        objects: List[object]
             Objects to be added to the group.
        """
        cur_objs = list(self.objects)
        for object in objects:
            if object.model_id in self._object_ids:
                raise Exception("object already on map: %r" % object)
            cur_objs.append(object)
        self.objects = tuple(cur_objs)

    def remove_object(self, object):
        """Remove object from group.

        Parameters
        ----------
        object: object
             Object to be removed from the group.
        """
        if object.model_id not in self._object_ids:
            raise Exception("object not on map: %r" % object)
        self.objects = tuple([o for o in self.objects if o.model_id != object.model_id])

    def remove_objects(self, objects: list):
        """Remove objects from group.

        Parameters
        ----------
        objects: List[object]
             Objects to be removed from the group.
        """
        cur_objs = list(self.objects)
        for object in objects:
            if object.model_id not in self._object_ids:
                raise Exception("object not on map: %r" % object)
            cur_objs.remove(object)
        self.objects = tuple(cur_objs)


class Overlay(Object):
    """Overlay Object class

    Overlay is a visual representation of a rectangular
    area on a map in the form of a bitmap.

    Attributes
    ----------
    content: string
        Optional arbitrary data to be stored with the map overlay.
    boundingBox: object
        A rectangular area of the overlay defined in terms of the geographical
        coordinates of its top-left and bottom-right corners.
    bitmap: string
        An image URL, an SVG image (markup), a bitmap image or a canvas.
    min: float
        The minimum zoom level at which the object is visible,
        the default is -Infinity
    max: float
        The maximum zoom level at which the object is visible,
        the default is Infinity
    opacity: float
        The opacity of the object in range from 0 (transparent)
        to 1 (opaque), the default is 1.
    visibility: Boolean
        Indicates whether the map object is visible, the default is True.
    volatility: Boolean
        Indicates whether the map object is volatile, the default is False.
    """

    _view_name = Unicode("OverlayView").tag(sync=True)
    _model_name = Unicode("OverlayModel").tag(sync=True)

    content = Unicode().tag(sync=True)
    boundingBox = Instance(Bbox).tag(sync=True, **widget_serialization)
    bitmap = Unicode().tag(sync=True)
    min = Float(float("inf")).tag(sync=True)
    max = Float(float("inf")).tag(sync=True)
    opacity = Float(1).tag(sync=True)
    visibility = Bool(True).tag(sync=True)
    volatility = Bool(False).tag(sync=True)

    def set_bitmap(self, bitmap):
        """Set bitmap for Overlay.

        Parameters
        ----------
        bitmap: string
             An image URL, an SVG image (markup), a bitmap image or a canvas.
        """
        self.bitmap = bitmap


class Control(Widget):
    """Abstract Control class.

    Base class for all Control element.
    """

    _view_name = Unicode("ControlView").tag(sync=True)
    _model_name = Unicode("ControlModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)


class ZoomControl(Control):
    """ZoomControl Control class

    ZoomControl represents the UI control that allows the
    user to change the map zoom level.

    Attributes
    ----------
    zoomSpeed: float, deafult 4
        The zoom speed in levels per second, defaults to 4.
    fractionalZoom: boolean, default True
        A flag indicating whether fractional zoom levels
        are allowed (True, default) or not (False).
    alignment: string, default RIGHT_MIDDLE.
        The layout alignment which should be applied to the given UI control,
        defaults to RIGHT_MIDDLE
    slider: boolean, default False
        A flag indicating whether to show the slider (True) or not (False, default)
    sliderSnaps: boolean, default False
        A flag indicating whether the slider should snap to
        integer values or not, defaults to False.
    """

    _view_name = Unicode("ZoomControlView").tag(sync=True)
    _model_name = Unicode("ZoomControlModel").tag(sync=True)

    zoomSpeed = Float(4).tag(sync=True)
    fractionalZoom = Bool(True).tag(sync=True)
    alignment = Unicode("RIGHT_MIDDLE").tag(sync=True)
    slider = Bool(False).tag(sync=True)
    sliderSnaps = Bool(False).tag(sync=True)


class ZoomRectangle(Control):
    """ZoomRectangle Control class

    ZoomRectangle represents a zoom rectangle control element
    that allows zooming to the selected area on the screen.

    Attributes
    ----------
    alignment: string, default BOTTOM_RIGHT
        The layout alignment which should be applied to the given UI control,
        defaults to BOTTOM_RIGHT.
    """

    _view_name = Unicode("ZoomRectangleView").tag(sync=True)
    _model_name = Unicode("ZoomRectangleModel").tag(sync=True)

    alignment = Unicode("BOTTOM_RIGHT").tag(sync=True)


class ScaleBar(Control):
    """ScaleBar Control class

    ScaleBar represents a UI element that shows the zoom scale.

    Attributes
    ----------
    alignment: string, default RIGHT_BOTTOM
        The layout alignment which should be applied to the given UI control,
        defaults to RIGHT_BOTTOM.
    """

    _view_name = Unicode("ScaleBarView").tag(sync=True)
    _model_name = Unicode("ScaleBarModel").tag(sync=True)

    alignment = Unicode("RIGHT_BOTTOM").tag(sync=True)


class MapSettingsControl(Control):
    """MapSettingsControl class

    MapSettingsControl represents a menu control allowing the user to select
    the base map types as well as add additional layers on top.

    Attributes
    ----------
    alignment: string, default RIGHT_TOP
        The layout alignment which should be applied to the ``MapSettingsControl``,
        defaults to RIGHT_TOP.
    basemaps: List[string]
        The list of base layers to be shown in the map settings control.
        Selecting an entry changes map base layer.
    layers: List[Layer]
        The list of layers to be shown in the map settings control after the baseLayers list.
    """

    _view_name = Unicode("MapSettingsControlView").tag(sync=True)
    _model_name = Unicode("MapSettingsControlModel").tag(sync=True)

    alignment = Unicode("RIGHT_TOP").tag(sync=True)
    basemaps = List(trait=Unicode()).tag(sync=True)
    layers = List(Dict()).tag(trait=Instance(Layer), sync=True, **widget_serialization)

    _layer_ids = List()

    @validate("layers")
    def _validate_layers(self, proposal):
        """Validate layers list.

        Makes sure only one instance of any given layer can exist in the
        layers list.
        """
        self._layer_ids = [lr["layer"].model_id for lr in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise Exception("duplicate layer detected, only use each layer once")
        return proposal.value

    def add_layers(self, layers):
        """Add layers to map."""
        for layer in layers:
            if layer["layer"].model_id in self._layer_ids:
                raise Exception("layer already on map: %r" % layer)
        self.layers = tuple([lr for lr in self.layers] + layers)

    def remove_layers(self, layers):
        """Remove layers from map."""
        for layer in layers:
            if layer["layer"].model_id not in self._layer_ids:
                raise Exception("layer not on map: %r" % layer)

        remove_layer_ids = set([lr["layer"].model_id for lr in layers])
        self.layers = tuple(
            [lyr for lyr in self.layers if lyr["layer"].model_id not in remove_layer_ids]
        )

    def __iadd__(self, item):
        if isinstance(item, list):
            self.add_layers(item)
        return self

    def __isub__(self, item):
        if isinstance(item, list):
            self.remove_layers(item)
        return self

    def __add__(self, item):
        if isinstance(item, list):
            self.add_layers(item)
        return self


class WidgetControl(Control):
    """WidgetControl class

    WidgetControl represents a control of ipywidgets.

    Attributes
    ----------
    name: string
        Unique id of the widget.
    alignment: string, default RIGHT_BOTTOM
        The layout alignment which should be applied to the given UI control,
        defaults to RIGHT_BOTTOM.
    widget: object
        ipywidget object to be added on the map.
    transparent_bg: bool
        If set to ``True`` widget will be added as transparent on Map.
    """

    _view_name = Unicode("WidgetControlView").tag(sync=True)
    _model_name = Unicode("WidgetControlModel").tag(sync=True)

    name = Unicode("WidgetControl").tag(sync=True)
    alignment = Unicode("RIGHT_BOTTOM").tag(sync=True)
    widget = Instance(DOMWidget).tag(sync=True, **widget_serialization)
    transparent_bg = Bool(False).tag(sync=True)


class FullscreenControl(Control):
    """FullscreenControl class

    A control which contains a button that will put the Map in
    full-screen when clicked.

    Attributes
    ----------
    name: string
        Unique id of the widget.
    alignment: string, default TOP_LEFT
        The layout alignment which should be applied to the given UI control,
        defaults to TOP_LEFT.
    """

    _view_name = Unicode("FullscreenControlView").tag(sync=True)
    _model_name = Unicode("FullscreenControlModel").tag(sync=True)

    name = Unicode("FullscreenControl").tag(sync=True)
    alignment = Unicode("TOP_LEFT").tag(sync=True)


class SearchControl(Control):
    """SearchControl class

    A control which allows to search address and data on map.

    Attributes
    ----------
    name: string
        Unique id of the widget.
    alignment: string, default TOP_LEFT
        The layout alignment which should be applied to the given UI control,
        defaults to TOP_LEFT.
    zoom: float, default 4
        Zoom level to be set for search result.
    property_name: string, default name
        Property name to be used for search in the layer provided.
    lang: string
        Select the language to be used for result rendering from a list
        of BCP47 compliant Language Codes.
    limit: int, default 10
        Maximum number of results to be returned.
    marker: object,
        Marker which is set for search result.
    layer: object,
        Layer to be searched using the control.
    """

    _view_name = Unicode("SearchControlView").tag(sync=True)
    _model_name = Unicode("SearchControlModel").tag(sync=True)

    name = Unicode("SearchControl").tag(sync=True)
    alignment = Unicode("TOP_LEFT").tag(sync=True)
    zoom = Float(4).tag(sync=True)
    property_name = Unicode("name").tag(sync=True)
    lang = Unicode(default_value="en-US").tag(sync=True)
    limit = Int(default_value=10).tag(sync=True)

    marker = Instance(Marker, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    layer = Instance(GeoJSON, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )

    _feature_found_callbacks = Instance(CallbackDispatcher, ())

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.on_msg(self._handle_m_msg)

    def _handle_m_msg(self, _, content, buffers):
        if content.get("event", "") == "found":
            self._feature_found_callbacks(**content)

    def on_feature_found(self, callback, remove=False):
        """Add a found feature event listener for searching in GeoJSON layer.

        Parameters
        ----------
        callback : callable
            Callback function that will be called on found event when searching in GeoJSON layer.
        remove: boolean
            Whether to remove this callback or not. Defaults to False.
        """
        self._feature_found_callbacks.register_callback(callback, remove=remove)


class MeasurementControl(Control):
    """MeasurementControl class

    MeasurementControl represents a distance measurement control.

    Attributes
    ----------
    name: string
        Unique id of the widget.
    alignment: string, default BOTTOM_LEFT
        The layout alignment which should be applied to the given UI control,
        defaults to BOTTOM_LEFT.
    start_icon: object
        The icon to use for the first measurement point.
    stopover_icon: object
        The icon to use for the intermediate measurement points.
    end_icon: object,
        The icon to use for the last measurement point.
    split_icon: object,
        The icon to use to indicate the position under the pointer
        over the line where a new point will be created once user clicks.
    """

    _view_name = Unicode("DistanceMeasurementView").tag(sync=True)
    _model_name = Unicode("DistanceMeasurementModel").tag(sync=True)

    name = Unicode("MeasurementControl").tag(sync=True)
    alignment = Unicode("RIGHT_BOTTOM").tag(sync=True)

    start_icon = Instance(Icon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    stopover_icon = Instance(Icon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    end_icon = Instance(Icon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    split_icon = Instance(Icon, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )


class SplitMapControl(Control):
    """SplitMapControl class

    A control which allows comparing layers by splitting the map in two.

    Attributes
    ----------
    name: string
        Unique id of the widget.
    left_layer: object
        Layer to be added on left side of the control.
    right_layer: object
        Layer to be added on right side of the control.
    """

    _view_name = Unicode("SplitMapControlView").tag(sync=True)
    _model_name = Unicode("SplitMapControlModel").tag(sync=True)

    name = Unicode("SplitMapControl").tag(sync=True)
    left_layer = Instance(Layer, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    right_layer = Instance(Layer, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )


class LayersControl(Control):
    """LayersControl class.

    A control which allows hiding/showing different layers on the Map.
    """

    _view_name = Unicode("LayersControlView").tag(sync=True)
    _model_name = Unicode("LayersControlModel").tag(sync=True)

    name = Unicode("LayersControl").tag(sync=True)
    alignment = Unicode("RIGHT_TOP").tag(sync=True)


class DefaultLayers(Service):
    """DefaultLayers Class.

    This class will be used to add default layers provided by HERE maps API for javascript
    as basemap.

    Attributes
    ----------
    layer_name: string
        Name of the layer to be created. All valid layer names are maintained as config
        in :class:`DefaultLayerNames`.
    tile_size: int
        Tile size to be queried from the HERE Map Tile API (the default value is 512).
    ppi: int
        optional ``ppi`` parameter to use when querying tiles.
    """

    _view_name = Unicode("DefaultLayersView").tag(sync=True)
    _model_name = Unicode("DefaultLayersModel").tag(sync=True)

    layer_name = Unicode(DefaultLayerNames.vector.normal.map).tag(sync=True)
    tile_size = Int(512).tag(sync=True)
    ppi = Int(default_value=None, allow_none=True).tag(sync=True)


class MapTile(Provider):
    """MapTile class.

    Provider for continuous fetching of specified map tiles.

    Attributes
    ----------
    tile_type: string
        An identifier of the tile type.
    scheme: string
        An identifier of the tile scheme.
    tile_size: int
        A value indicating the tile size.
    format: int
        An identifier of the tile image format.
    additional_params: dict
        Additional parameters to be sent to the HERE map tile API.
    path: string
        The path of the map tile service, the default is ``maptile/2.1``.
    headers: dict
        A map of HTTP headers to be sent with each request made by the service.
    type: string
        The type of the map tile service with which to communicate,
        for example 'base' (default), 'aerial', etc.
    version: string
        The map version hash to use for retrieving tiles,
        the default is the newest and it is automatically updated.
    shards: list
        List of names of shards.
    """

    _view_name = Unicode("MapTileView").tag(sync=True)
    _model_name = Unicode("MapTileModel").tag(sync=True)

    tile_type = Unicode().tag(sync=True)
    scheme = Unicode().tag(sync=True)
    tile_size = Int().tag(sync=True)
    format = Unicode().tag(sync=True)
    additional_params = Dict(default_value=None, allow_none=True).tag(sync=True)
    path = Unicode().tag(sync=True)
    headers = Dict().tag(sync=True)
    type = Unicode("base").tag(sync=True)
    version = Unicode(default_value=None, allow_none=True).tag(sync=True)
    shards = List(default_value=None, allow_none=True).tag(sync=True)
    platform = Instance(Platform).tag(sync=True, **widget_serialization)


class OMV(Provider):
    """OMV Provider class

    Provider for continuous fetching of HERE Optimized Map Visualization (OMV) tiles.

    Attributes
    ----------
    path: string
        path of the service.
    platform: object
        The platfrom object to get OMV service for rendering the OMV data.
    style: object
        The style to use for rendering data provided by the provider.
    """

    _view_name = Unicode("OMVView").tag(sync=True)
    _model_name = Unicode("OMVModel").tag(sync=True)

    path = Unicode("/v2/vectortiles/core/mc").tag(sync=True)
    platform = Instance(Platform).tag(sync=True, **widget_serialization)
    style = Instance(Style).tag(sync=True, **widget_serialization)


class MarkerCluster(Provider):
    """MarkerCluster Provider class.

    Provider for clustering representaion of Markers.

    Attributes
    ----------
    data_points: List
        A list of objects of :class:`DataPoint`.
    eps: Int, default 32
        The epsilon parameter for cluster calculations. It must not exceed 256 and must take values
        that are a power of 2.
    min_weight: Int, default 2
        The minimum point weight sum to form a cluster.
    min_zoom: Int, default 0
        The minimum supported zoom level.
    max_zoom: Int, default 22
        The maximum supported zoom level.
    """

    _view_name = Unicode("MarkerClusterView").tag(sync=True)
    _model_name = Unicode("MarkerClusterModel").tag(sync=True)

    data_points = List(trait=Dict()).tag(sync=True)
    eps = Int(default_value=32).tag(sync=True)
    min_weight = Int(default_value=2).tag(sync=True)
    min_zoom = Int(default_value=0).tag(sync=True)
    max_zoom = Int(default_value=22).tag(sync=True)
    show_bubble = Bool(False).tag(sync=True)
    evt_type = Unicode("tap").tag(sync=True)


class ImageTileProvider(Provider):
    """ImageTileProvider class.
    
    Provider for loading data from XYZ tile setvers and WMTS sources.
    
    Attributes
    ----------
    url: string
        A string representing provider's URL.
    min_zoom: Int, default 0
        The minimum supported zoom level.
    max_zoom: Int, default 22
        The maximum supported zoom level.
    opacity: float default 1.0
        The opacity to use for the rendering of the provided tiles in range [0..1] where 0.0 means full 
        transparent and 1.0 means full opaque.
    tile_size: Int, default 256
        The size of a tile as edge length in pixels. 
        It must be 2^n where n is in the range [0 ... 30].
    headers: Dict
        A dictionaary of headers to be sent with each request made by the provider.
    attribution: string
        Tiles service attribution.
    """

    _view_name = Unicode("ImageTileProviderView").tag(sync=True)
    _model_name = Unicode("ImageTileProviderModel").tag(sync=True)

    url = Unicode().tag(sync=True)
    min_zoom = Int(default_value=0).tag(sync=True)
    max_zoom = Int(default_value=22).tag(sync=True)
    opacity = Float(default_value=1.0).tag(sync=True)
    tile_size = Int(default_value=256).tag(sync=True)
    headers = Dict(default_value={}).tag(sync=True)
    attribution = Unicode().tag(sync=True)


class Map(DOMWidget, InteractMixin):
    """Map class.

    The main map object upon which other elements are added.

    Attributes
    ----------
    api_key: string
        API Key used for authentication.
    center: list, default [20.5937, 78.9629]
        The current center of the map.
    zoom: float, default 3
        The current zoom value of the map.
    heading: float, default 180
        The current heading value of the map.
    incline: float, default 0
        The current incline value of the map.
    tilt: float, default 0
        The current tilt value of the map.
    basemap: string, default vector.normal.map
        The current basemap of the map.
    layers: list of Layer instances
        The list of layers that are currently on the map.
    objects: list of Object instances
        The list of objects that are currently on the map.
    controls: list of Control instances
        The list of controls that are currently on the map.
    bubbles: list of InfoBubble instances
        The list of bubbles that are currently on the map.
    style: object
        Style to apply for basemap.
    """

    _view_name = Unicode("MapView").tag(sync=True)
    _model_name = Unicode("MapModel").tag(sync=True)
    _view_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)
    _model_module = Unicode("@here/map-widget-for-jupyter").tag(sync=True)

    api_key = Unicode("").tag(sync=True)
    center = List(def_loc).tag(sync=True, o=True)
    zoom = Float(3).tag(sync=True, o=True)
    heading = Float(180).tag(sync=True, o=True)
    incline = Float(0).tag(sync=True, o=True)
    tilt = Float(0).tag(sync=True, o=True)
    bounds = Tuple().tag(sync=True, o=True)

    layers = Tuple().tag(trait=Instance(Layer), sync=True, **widget_serialization)
    objects = Tuple().tag(trait=Instance(Object), sync=True, **widget_serialization)
    controls = Tuple().tag(trait=Instance(Control), sync=True, **widget_serialization)
    bubbles = Tuple().tag(trait=Instance(InfoBubble), sync=True, **widget_serialization)
    style = Instance(Style, default_value=None, allow_none=True).tag(
        sync=True, **widget_serialization
    )
    basemap = Union(
        (
            Instance(DefaultLayers, default_value=None, allow_none=True),
            Instance(TileLayer, default_value=None, allow_none=True),
            Instance(MapTile, default_value=None, allow_none=True),
        )
    ).tag(sync=True, **widget_serialization)

    _view_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)
    _model_module_version = Unicode(EXTENSION_VERSION).tag(sync=True)

    _layer_ids = List()

    @validate("layers")
    def _validate_layers(self, proposal):
        """Validate layers list.

        Makes sure only one instance of any given layer can exist in the
        layers list.
        """
        self._layer_ids = [l.model_id for l in proposal.value]
        if len(set(self._layer_ids)) != len(self._layer_ids):
            raise Exception("duplicate layer detected, only use each layer once")
        return proposal.value

    def add_layer(self, layer):
        """Add layer from map."""
        if layer.model_id in self._layer_ids:
            raise Exception("layer already on map: %r" % layer)
        self.layers = tuple([l for l in self.layers] + [layer])

    def add_layers(self, layers):
        """Add layers to map."""
        for layer in layers:
            if layer.model_id in self._layer_ids:
                raise Exception("layer already on map: %r" % layer)
        self.layers = tuple([lr for lr in self.layers] + layers)

    def remove_layer(self, layer):
        """Remove layer from map."""
        if layer.model_id not in self._layer_ids:
            raise Exception("layer not on map: %r" % layer)
        self.layers = tuple([l for l in self.layers if l.model_id != layer.model_id])

    def remove_layers(self, layers):
        """Remove layers from map."""
        for layer in layers:
            if layer.model_id not in self._layer_ids:
                raise Exception("layer not on map: %r" % layer)

        remove_layer_ids = set([lr.model_id for lr in layers])
        self.layers = tuple([lyr for lyr in self.layers if lyr.model_id not in remove_layer_ids])

    _object_ids = List()

    @validate("objects")
    def _validate_objects(self, proposal):
        """Validate objects list.

        Makes sure only one instance of any given object can exist in the
        objects list.
        """
        self._object_ids = [o.model_id for o in proposal.value]
        if len(set(self._object_ids)) != len(self._object_ids):
            raise Exception("duplicate object detected, only use each object once")
        return proposal.value

    def add_object(self, object):
        """Add object to map."""
        if object.model_id in self._object_ids:
            raise Exception("object already on map: %r" % object)
        self.objects = tuple([o for o in self.objects] + [object])

    def add_objects(self, objects: list):
        """Add objects to map."""
        cur_objs = list(self.objects)
        for object in objects:
            if object.model_id in self._object_ids:
                raise Exception("object already on map: %r" % object)
            cur_objs.append(object)
        self.objects = tuple(cur_objs)

    def remove_object(self, object):
        """Remove object from map."""
        if object.model_id not in self._object_ids:
            raise Exception("object not on map: %r" % object)
        self.objects = tuple([o for o in self.objects if o.model_id != object.model_id])

    _control_ids = List()

    @validate("controls")
    def _validate_controls(self, proposal):
        """Validate controls list.

        Makes sure only one instance of any given control can exist in the
        controls list.
        """
        self._control_ids = [o.model_id for o in proposal.value]
        if len(set(self._control_ids)) != len(self._control_ids):
            raise Exception("duplicate control detected, only use each control once")
        return proposal.value

    def add_control(self, control):
        """Add control to map."""
        if control.model_id in self._control_ids:
            raise Exception("control already on map: %r" % control)
        self.controls = tuple([o for o in self.controls] + [control])

    def remove_control(self, control):
        """Remove control from map."""
        if control.model_id not in self._control_ids:
            raise Exception("control not on map: %r" % control)
        self.controls = tuple([o for o in self.controls if o.model_id != control.model_id])

    _bubble_ids = List()

    @validate("bubbles")
    def _validate_bubbles(self, proposal):
        """Validate bubbles list.

        Makes sure only one instance of any given bubble can exist in the
        bubbles list.
        """
        self._bubble_ids = [b.model_id for b in proposal.value]
        if len(set(self._bubble_ids)) != len(self._bubble_ids):
            raise Exception("duplicate bubble detected, only use each bubble once")
        return proposal.value

    def add_bubble(self, bubble):
        """
        Add InfoBubble on map
        """
        if bubble.model_id in self._bubble_ids:
            raise Exception("bubble already on map: %r" % bubble)
        self.bubbles = tuple([b for b in self.bubbles] + [bubble])

    def remove_bubble(self, bubble):
        """
        Remove InfoBubble from map.
        """
        if bubble.model_id not in self._bubble_ids:
            raise Exception("control not on map: %r" % bubble)
        self.bubbles = tuple([b for b in self.bubbles if b.model_id != bubble.model_id])

    def __iadd__(self, item):
        if isinstance(item, Layer):
            self.add_layer(item)
        elif isinstance(item, Control):
            self.add_control(item)
        elif isinstance(item, Object):
            self.add_object(item)
        elif isinstance(item, InfoBubble):
            self.add_bubble(item)
        return self

    def __isub__(self, item):
        if isinstance(item, Layer):
            self.remove_layer(item)
        elif isinstance(item, Control):
            self.remove_control(item)
        elif isinstance(item, Object):
            self.remove_object(item)
        elif isinstance(item, InfoBubble):
            self.remove_bubble(item)
        return self

    def __add__(self, item):
        if isinstance(item, Layer):
            self.add_layer(item)
        elif isinstance(item, Control):
            self.add_control(item)
        elif isinstance(item, Object):
            self.add_object(item)
        elif isinstance(item, InfoBubble):
            self.add_bubble(item)
        return self
