Split Map Control
=================

``Split Map Control`` is an ``here-map-widget-for-jupyter`` class that allows comparing layers by splitting the map in two.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, SplitMapControl, GeoJSON
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    left_geojson = GeoJSON(
        url="https://gist.githubusercontent.com/peaksnail/"
        + "5d4f07ca00ed7c653663d7874e0ab8e7/raw/64c2a975482efd9c42e54f6f6869f091055053cd/"
        + "countries.geo.json",
        disable_legacy_mode=True,
        style={"fillColor": "#ff0000", "color": "black", "opacity": 0.1},
    )
    right_geojson = GeoJSON(
        url="https://gist.githubusercontent.com/peaksnail/"
        + "5d4f07ca00ed7c653663d7874e0ab8e7/raw/64c2a975482efd9c42e54f6f6869f091055053cd/"
        + "countries.geo.json",
        disable_legacy_mode=True,
        style={"fillColor": "#00ff00", "color": "black", "opacity": 0.1},
    )

    sp = SplitMapControl(left_layer=left_geojson, right_layer=right_geojson)
    m.add_control(sp)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
name                   string                                                          Unique id of the widget, default value is SplitMapControl
left_layer             object of layer                                                 Layer to be added on left side of the control
right_layer            object of layer                                                 Layer to be added on right side of the control
===================    ============================================================    ===

.. warning::
    ``Split Map Control`` is standalone control and can not be used with any other control.