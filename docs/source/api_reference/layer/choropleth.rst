Choropleth Layer
================

``Choropleth`` is an ``here-map-widget-for-jupyter`` class that allows you to generate a Choropleth Map for your data.

Example
-------

.. jupyter-execute::

    import here_map_widget
    import json
    import pandas as pd
    import os
    import requests
    from branca.colormap import linear


    def load_data(url, filename, file_type):
        r = requests.get(url)
        with open(filename, "w") as f:
            f.write(r.content.decode("utf-8"))
        with open(filename, "r") as f:
            return file_type(f)


    geo_json_data = load_data(
        "https://raw.githubusercontent.com/"
        + "jupyter-widgets/ipyleaflet/master/examples/us-states.json",
        "us-states.json",
        json.load,
    )

    unemployment = load_data(
        "https://raw.githubusercontent.com/"
        + "jupyter-widgets/ipyleaflet/master/examples/US_Unemployment_Oct2012.csv",
        "US_Unemployment_Oct2012.csv",
        pd.read_csv,
    )

    unemployment = dict(
        zip(unemployment["State"].tolist(), unemployment["Unemployment"].tolist())
    )

    layer = here_map_widget.Choropleth(
        geo_data=geo_json_data,
        choro_data=unemployment,
        colormap=linear.YlOrRd_04,
    )

    m = here_map_widget.Map(api_key=os.environ["LS_API_KEY"], center=[43, -100], zoom=4)
    m.add_layer(layer)
    m


Attributes
----------

===================    ========================  ===
Attribute              Type                      Doc
===================    ========================  ===
geo_data               dict                      The GeoJSON structure on which to apply the Choropleth effect
choro_data             dict                      Data used for building the Choropleth effect
value_min              float                     Minimum data value for the color mapping
value_max              float                     Maximum data value for the color mapping
colormap               branca.colormap.ColorMap  The colormap used for the effect
key_on                 string                    The feature key to use for the colormap effect, default value is ``id``.
style                  dict                      The style to use for rendering GeoJSON data. Example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10, 'lineCap': 'square', lineJoin: 'bevel'}
hover_style            dict                      The style to use for rendering data when hovered over. Example: {'fillColor': 'rgba(245, 176, 65, 0.5)', 'strokeColor': 'black', 'lineWidth': 10}
disable_legacy_mode    boolean                   Disable legacy mode for parsing GeoJSON data default True
evt_type               string                    Event type to be used to apply hover_style, please check :ref:`allowed values <misc_values>`, default value is ``tap``.
show_bubble            boolean                   To determine whether to show info bubble for space data or not
style_callback         Callable object           A callback function which is called for each feature to generate style for the feature
point_style            dict                      The style to use for rendering Points in GeoJSON if not provided default Markers will be used. Example: {"strokeColor": 'white', "lineWidth": 1, "fillColor": "#1b468d", "fillOpacity": 0.7, "radius": 5}, radius should be between 2 to 8.
===================    ========================  ===
