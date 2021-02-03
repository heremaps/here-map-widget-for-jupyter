MultiLineString
===============

``MultiLineString`` is subclass of ``Geometry`` class which then can be used to create a ``Polyline`` which will be visualised on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map
    from here_map_widget import LineString, MultiLineString, Polyline
    import os

    m = Map(api_key=os.environ['LS_API_KEY'], center=[51.1657, 10.4515])
    style = { 'lineWidth': 15 }
    l = [53.3477, -6.2597, 0, 51.5008, -0.1224, 0, 48.8567, 2.3508, 0, 52.5166, 13.3833, 0]
    l_1 = [-53.3477, 6.2597, 0, -51.5008, 0.1224, 0, 48.8567, 2.3508, 0, 52.5166, 13.3833, 0]
    ls = LineString(points=l)
    ls_1 = LineString(points=l_1)
    ml = MultiLineString(lines=[ls])
    pl = Polyline(object=ml, style=style)
    m.add_object(pl)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
lines                  A list of LineString objects.                                   A list of LineString objects.
===================    ============================================================    ===


===========    ==========================   ===
Method         Arguments                    Doc
===========    ==========================   ===
push_line      LineString object            Pushes Linestring end of MultiLineString.
add_lines      list of LineString objects   Pushes multiple Linestrings end of MultiLineString.
remove_line    LineString object            Removes LineString from MultiLineString.
===========    ==========================   ===