ImageTile Layer
===============
To load tiles from XYZ tile servers like `OpenStreetMap <https://wiki.openstreetmap.org/wiki/Tile_servers>`_ tile servers or WMTS tile servers, ``ImageTileProvider`` is used as a source of data
for TileLayer.

XYZ Tile server Example
-----------------------

.. jupyter-execute::

    import os
    from here_map_widget import Map, ImageTileProvider, TileLayer

    m = Map(api_key=os.environ["LS_API_KEY"], center=[39.40, -104.08], zoom=3)

    url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
    attribution = (
        'Map data (c) <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
    )
    provider = ImageTileProvider(url=url, attribution=attribution)
    layer = TileLayer(provider=provider)
    m.add_layer(layer)
    m


WMTS Example
------------

.. jupyter-execute::

    import os
    from here_map_widget import Map, ImageTileProvider, TileLayer


    m = Map(api_key=os.environ["LS_API_KEY"], center=[39.40, -104.08], zoom=3.66)

    url = "https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/?layer=0&style=default&tilematrixset=EPSG%3A4326&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={x}&TileRow={y}"
    provider = ImageTileProvider(url=url)
    layer = TileLayer(provider=provider)
    m.add_layer(layer)
    m



Attributes
----------

.. csv-table::
    :header: "Attribute", "Type", "Doc"
    :widths: 30, 30, 30

        "url", "String", "URL of the Tile server."
        "min_zoom", "Int", "Optional, The minimum supported zoom level, the default is 0"
        "max_zoom", "Int", "Optional, The maximum supported zoom level, the default is 22"
        "opacity",  "Float", "Optional, The opacity to use for the rendering of the provided tiles in range [0..1] where 0.0 means full transparent and 1.0 means full opaque."
        "tile_size", "Int", "Optional, The size of a tile as edge length in pixels. It must be 2^n where n is in the range [0 ... 30]."
        "headers", "Dict", "Optional,A dictionaary of headers to be sent with each request made by the provider."
        "attribution", "String", "Optional, Tiles service attribution."

