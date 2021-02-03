GeoMultiPolygon
===============

``GeoMultiPolygon`` is a subclass of Geometry class that allows you to create a ``Polygon`` object which then can be visualised on the Map.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map, GeoPolygon, LineString, Polygon, GeoMultiPolygon

    m = Map(api_key=os.environ["LS_API_KEY"], center=[51.1657, 10.4515])

    l1 = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]

    ls1 = LineString(points=l1)

    gpg1 = GeoPolygon(linestring=ls1)

    style = {"strokeColor": "#829", "lineWidth": 4}

    l2 = [55, 19, 99, 52, 2, 100, 52, 16, 100, 55, 19, 99]
    ls2 = LineString(points=l2)

    gpg2 = GeoPolygon(linestring=ls2)

    gmp = GeoMultiPolygon(polygons=[gpg1])

    pg = Polygon(object=gmp, style=style, draggable=False)

    m.add_object(pg)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
polygons               A list of GeoPolygon objects.                                   A list of GeoPolygon objects.
===================    ============================================================    ===

Methods
-------

===============     ==========================     ===
Method              Arguments                      Doc
===============     ==========================     ===
push_polygon        GeoPolygon object              Add polygon in the GeoMultiPolygon
add_polygons        list of GeoPolygon objects     Add polygons in the GeoMultiPolygon
remove_polygon      GeoPolygon object              Remove polygon from the GeoMultiPolygon
===============     ==========================     ===