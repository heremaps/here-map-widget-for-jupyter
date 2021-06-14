GeoData Layer
==============

``GeoData`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a `GeoDataFrame
<http://geopandas.org/data_structures.html>`_ on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, GeoData
    import geopandas
    import json
    import os

    countries = geopandas.read_file(geopandas.datasets.get_path("naturalearth_lowres"))

    m = Map(api_key=os.environ["LS_API_KEY"], center=[52.3, 8.0], zoom=3)

    geo_data = GeoData(
        geo_dataframe=countries,
        style={
            "fillColor": "#3366cc",
        },
        hover_style={"fillColor": "red"},
        show_bubble=True,
    )
    m.add_layer(geo_data)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
geo_data               GeoDataFrame       The GeoPandas dataframe to use
style                  dict               The style to use for rendering GeoJSON data
disable_legacy_mode    boolean            Disable legacy mode for parsing GeoJSON data default ``True``.
style                  dict               The style to use for rendering GeoJSON data, please check possible values for styles `here <https://developer.here.com/documentation/maps/3.1.19.2/dev_guide/topics/geo-shapes.html#styling-geo-shapes>`_
hover_style            dict               The style to use for rendering data when hovered over
evt_type               string             Event type to be used to apply hover_style, please check :ref:`allowed values <misc_values>`, default value is ``tap``.
show_bubble            boolean            To determine whether to show info bubble for space data or not
style_callback         Callable object    A callback function which is called for each feature to generate style for the feature
point_style            dict               The style to use for rendering Points in GeoJSON if not provided default Markers will be used.  please check possible values for styles `here <https://developer.here.com/documentation/maps/3.1.19.2/dev_guide/topics/geo-shapes.html#styling-geo-shapes>`_
===================    =================  ===
