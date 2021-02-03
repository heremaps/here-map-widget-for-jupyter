LineString
==========

``LineString`` is subclass of ``Geometry`` class which then can be used to create a ``Polyline`` which will be visualised on the Map.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import LineString, Polyline
    from here_map_widget import Map

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
points                 A list of Point objects.                                        A list of Point objects to construct Linestring.
===================    ============================================================    ===


Methods
-------

==========    ===============     ===
Method        Arguments           Doc
==========    ===============     ===
push_point    lat,lng,alt         Pushes Point with given lat,lng,alt at the end of LineString.
==========    ===============     ===