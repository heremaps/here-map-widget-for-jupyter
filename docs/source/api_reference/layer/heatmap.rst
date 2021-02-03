HeatMap Layer
=============

``Heat Map`` is an ``here-map-widget-for-jupyter`` class that allows you to generate a Heat Map for your data.

Example
-------

.. jupyter-execute::

    from random import uniform
    from here_map_widget import TileLayer, HeatMap
    from here_map_widget import Map
    import os

    data = [[uniform(-80, 80), uniform(-180, 180), uniform(0, 1000)] for i in range(1000)]

    heat_map_data = []
    for row in data:
        heat_map_data.append({"lat": row[0], "lng": row[1], "value": row[2]})

    m = Map(api_key=os.environ["LS_API_KEY"])
    provider = HeatMap(interpolate=True, opacity=0.6, assume_values=True)
    provider.add_data(heat_map_data)
    heatmap = TileLayer(provider=provider)
    m.add_layer(heatmap)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
colors                 dict               An dict object defining the color stops for example `{'0.0': 'blue', '0.5': 'yellow', '1': 'red'}`
interpolate            boolean            A value indicating whether interpolation is to be used to display smooth color transitions in the heat map
opacity                float              The opacity which is used for the rendering of the heatmap in range [0..1]
assume_values          boolean            A Boolean value indicating whether to paint assumed values in regions where no data is available
data                   list               Data list which is used to generate heat map
hardReload             boolean            A value indicating whether to invalidate in hard mode (True) or in soft mode (False) while adding data
===================    =================  ===

Methods
-------

=========    ===============     ===
Method       Arguments           Doc
=========    ===============     ===
add_data     data                Data list which is used to generate heat map
clear                            Clear Heat Map
=========    ===============     ===
