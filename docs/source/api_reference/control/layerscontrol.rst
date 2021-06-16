Layers Control
=================

``LayersControl`` is an ``here-map-widget-for-jupyter`` class which is useful to show/hide layers on map.

Example
-------

.. jupyter-execute::

    from here_map_widget import GeoJSON, Map, LayersControl
    import os

    m = Map(api_key=os.environ['LS_API_KEY'], center=[43.052, -62.49])

    countries = GeoJSON(
    url="https://gist.githubusercontent.com/peaksnail/5d4f07ca00ed7c653663d7874e0ab8e7/raw/64c2a975482efd9c42e54f6f6869f091055053cd/countries.geo.json",
    disable_legacy_mode=True,
    style={"color": "black", "opacity": 0.1},
    name="world countries",
    )

    us_states = GeoJSON(
        url="https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json",
        disable_legacy_mode=True,
        style={"color": "black", "opacity": 0.1},
        name="US states",
    )
    m.add_layers([countries, us_states])
    lc = LayersControl(alignment="RIGHT_TOP")
    m.add_control(lc)
    m



Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
alignment              string                                                          The layout alignment which should be applied to the ``LayersControl``, please check :ref:`allowed values <misc_values>`, defaults to ``RIGHT_TOP``
===================    ============================================================    ===