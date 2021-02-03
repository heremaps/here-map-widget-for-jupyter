WKT
====

A ``WKT`` is a subclass of ``Geometry`` class which will be used to visualise WKT data on the Map.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import WKT, Marker
    from here_map_widget import Map

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [19.0760, 72.8777]
    m.zoom = 9
    wkt = WKT(data="POINT (72.8777 19.0760)")
    mumbai_marker = Marker(object=wkt)
    m.add_object(mumbai_marker)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
data                   string                                                          A WKT string.
===================    ============================================================    ===