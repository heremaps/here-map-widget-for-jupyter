Polygon Object
==============

``Polygon`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize LineString, WKT, GeoPolygon and GeoMultiPolygon as Polygon on the Map.
Style of object is a dictionary, to get more information on all possible keys of style dictionary example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10, 'lineCap': 'square', lineJoin: 'bevel'}.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, GeoPolygon, LineString, Polygon
    import os

    center = [51.1657, 10.4515]

    l = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]

    ls = LineString(points=l)

    gpg = GeoPolygon(linestring=ls)

    style = {"strokeColor": "#829", "lineWidth": 4}

    obj = Polygon(object=gpg, style=style, draggable=False)

    m = Map(api_key=os.environ["LS_API_KEY"], center=center)

    m.add_object(obj)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
object                 object of LineString or WKT or GeoPolygon or GeoMultiPolygon    The geometry that defines the surface of the polygon
style                  dict                                                            The style to be used when tracing the spatial object
draggable              boolean                                                         To make a draggable polygon
extrusion              float                                                           The extrusion height for the polygon in meters, default is 0
elevation              float                                                           The elevation height of the polygon in meters, default is 0
===================    ============================================================    ===