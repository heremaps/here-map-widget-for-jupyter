Polyline Object
===============

``Polyline`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a LineString, MultiLineString and WKT as Line on the Map.
Style of object is a dictionary, to get more information on all possible keys of style dictionary, example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10, 'lineCap': 'square', lineJoin: 'bevel'}.

Example
-------

.. jupyter-execute::

    from here_map_widget import LineString, Polyline
    from here_map_widget import Map
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [51.1657, 10.4515]
    style = {"lineWidth": 15}
    l = [53.3477, -6.2597, 0, 51.5008, -0.1224, 0, 48.8567, 2.3508, 0, 52.5166, 13.3833, 0]
    ls = LineString(points=l)
    pl = Polyline(object=ls, style=style)
    m.add_object(pl)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
object                 object of LineString or WKT or MultiLineString                  The geometry that defines the line segments of the polyline
style                  dict                                                            The style to be used when tracing the polyline
draggable              boolean                                                         To make a draggable polyline
===================    ============================================================    ===