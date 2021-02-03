Search Control
===============

``Search Control`` is an ``here-map-widget-for-jupyter`` class that allows you to search address and data on the Map.

Example
-------
Search using HERE Geocoding Service.

.. jupyter-execute::

    from here_map_widget import Map, SearchControl, Marker
    import os

    center = [19.0760, 72.8777]
    m = Map(api_key=os.environ['LS_API_KEY'], center=center)

    marker = Marker(lat=center[0], lng=center[1])
    sc = SearchControl(marker=marker, zoom=5)

    m.add_control(sc)

    m


GeoJSON Example
---------------
User can also search features in GeoJSON layer.

.. jupyter-execute::

    from here_map_widget import Map, SearchControl, Marker, GeoJSON
    import os

    center = [19.0760, 72.8777]
    M = Map(api_key=os.environ["LS_API_KEY"], center=center)


    geojson = GeoJSON(
        url="https://gist.githubusercontent.com/peaksnail/"
        + "5d4f07ca00ed7c653663d7874e0ab8e7/raw/64c2a975482efd9c42e54f6f6869f091055053cd/"
        + "countries.geo.json",
        disable_legacy_mode=True,
        style={"color": "black", "opacity": 0.1},
    )

    marker = Marker(lat=center[0], lng=center[1])

    sc = SearchControl(marker=marker, zoom=5, layer=geojson, property_name="name")

    M.add_control(sc)

    M

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
name                   string                                                          Unique id of the widget, default value is SearchControl
alignment              string                                                          The layout alignment which should be applied to the ``Search Control``, please check :ref:`allowed values <misc_values>`, defaults to ``TOP_LEFT``
zoom                   float                                                           Zoom level to be set for search result, default value is 4
property_name          string                                                          Property name to be used for search in the layer provided, default value is `name`
lang                   string                                                          Select the language to be used for result rendering from a list of BCP47 compliant Language Codes.
limit                  int                                                             Maximum number of results to be returned, default 10.
marker                 object of Marker                                                Marker which is set for search result
layer                  object of Layer                                                 Layer to be searched using the control
===================    ============================================================    ===

Methods
-------

================     ==========================     ===
Method               Arguments                      Doc
================     ==========================     ===
on_feature_found     Callable object                Adds a callback on found event for searching in GeoJSON layer.
================     ==========================     ===