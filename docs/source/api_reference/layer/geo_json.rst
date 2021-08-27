GeoJSON
=======

``GeoJSON`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a `GeoJSON Data
<https://geojson.org/>`_ on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, GeoJSON
    import os

    # Add GeoJSON from URL
    m = Map(api_key=os.environ["LS_API_KEY"])
    url = (
        "https://gist.githubusercontent.com/peaksnail/"
        + "5d4f07ca00ed7c653663d7874e0ab8e7/raw/"
        + "64c2a975482efd9c42e54f6f6869f091055053cd/countries.geo.json"
    )
    geojson = GeoJSON(
        url=url,
        disable_legacy_mode=True,
        style={"fillColor": "rgba(245, 176, 65, 0.5)", "strokeColor": "black"},
        show_bubble=True,
    )
    m.add_layer(geojson)
    m


Attributes
----------

===================    ===============  ===
Attribute              Type             Doc
===================    ===============  ===
data                   dict             GeoJSON Data to be plotted
url                    string           GeoJSON Data URL to be plotted
disable_legacy_mode    boolean          Disable legacy mode for parsing GeoJSON data. Default value is True
style                  dict             The style to use for rendering GeoJSON data. Example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10, 'lineCap': 'square', lineJoin: 'bevel'}
hover_style            dict             The style to use for rendering data when hovered over. Example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10}
evt_type               string           Event type to be used to apply hover_style, please check :ref:`allowed values <misc_values>`, default value is ``tap``.
show_bubble            boolean          To determine whether to show info bubble for space data or not
style_callback         Callable object  A callback function which is called for each feature to generate style for the feature
point_style            dict             The style to use for rendering Points in GeoJSON if not provided default Markers will be used. Example: {"strokeColor": 'white', "lineWidth": 1, "fillColor": "#1b468d", "fillOpacity": 0.7, "radius": 5}, radius should be between 2 to 8.
===================    ===============  ===

Methods
-------

=========    ===============     ===
Method       Arguments           Doc
=========    ===============     ===
on_click     Callable object     Adds a callback on click event
on_hover     Callable object     Adds a callback on hover event
=========    ===============     ===
