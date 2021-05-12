Map Settings Control
====================

``Map Settings Control`` is an ``here-map-widget-for-jupyter`` class that allows you to add a control that allows the user to select the base map types as well as add additional layers on top.

Example
-------

.. jupyter-execute::

    from here_map_widget import GeoJSON, Map, MapSettingsControl
    from here_map_widget import TileLayer, XYZ
    import os

    center = [51.1657, 10.4515]

    m = Map(api_key=os.environ["LS_API_KEY"], center=center)

    xyz_token = os.environ["XYZ_TOKEN"]
    provider = XYZ(space_id="m2pcsiNi", token=xyz_token)
    space = TileLayer(provider=provider)

    geojson = GeoJSON(
        url="https://gist.githubusercontent.com/peaksnail/"
        + "5d4f07ca00ed7c653663d7874e0ab8e7/raw/"
        + "64c2a975482efd9c42e54f6f6869f091055053cd/countries.geo.json",
        disable_legacy_mode=True,
        style={"color": "black", "opacity": 0.1},
    )


    setttings = MapSettingsControl(
        layers=[
            {"label": "space", "layer": space},
            {"label": "countries", "layer": geojson},
        ],
        basemaps=["raster.satellite.map", "raster.terrain.map"],
    )

    m.add_control(setttings)

    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
alignment              string                                                          The layout alignment which should be applied to the ``Map Settings Control``, please check :ref:`allowed values <misc_values>`, defaults to ``TOP_RIGHT``.
basemaps               List of strings                                                 The list of base layers to be shown in the map settings control, selecting an entry changes map base layer
layers                 List of Layers                                                  The list of layers to be shown in the map settings control after the baseLayers list
===================    ============================================================    ===

Methods
-------

=============  ===============     ===
Method         Arguments           Doc
=============  ===============     ===
add_layers     List                Add layers to control
remove_layers  List                Remove layers from control
=============  ===============     ===