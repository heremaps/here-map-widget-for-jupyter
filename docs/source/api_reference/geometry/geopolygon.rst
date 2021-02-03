GeoPolygon
===========

``GeoPolygon`` is a subclass of Geometry class that allows you to create a ``Polygon`` object which then can be visualised on the Map.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map, GeoPolygon, LineString, Polygon

    l = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]

    ls = LineString(points=l)

    gpg = GeoPolygon(linestring=ls)

    style = {"strokeColor": "#829", "lineWidth": 4}

    obj = Polygon(object=gpg, style=style, draggable=False)

    m = Map(api_key=os.environ["LS_API_KEY"], center=[51.1657, 10.4515])

    m.add_object(obj)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
linestring             LineString object.                                              The LineString Geometry.
holes                  A list of LineString objects.                                   A list of LineStrings.
===================    ============================================================    ===


Methods
-------

============      ===========================    ===
Method            Arguments                      Doc
============      ===========================    ===
push_hole         LineString object              Add hole on GeoPolygon.
add_holes         list of LineString objects     Add holes on GeoPolygon
remove_hole       LineString object              Remove hole from the GeoPolygon
============      ===========================    ===