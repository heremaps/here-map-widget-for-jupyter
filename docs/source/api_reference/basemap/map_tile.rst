Map Tile Basemap
================

``MapTile Basemap`` is the type of basemap of ``here-map-widget-for-jupyter`` which shows basemap using `Map Tile API <https://developer.here.com/documentation/map-tile/dev_guide/topics/introduction.html>`_.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, Platform, MapTile, TileLayer
    from here_map_widget import ServiceNames, MapTileUrl
    import os

    services_config = {
        ServiceNames.maptile: {
            MapTileUrl.scheme: "https",
            MapTileUrl.host: "maps.ls.hereapi.com",
            MapTileUrl.path: "maptile/2.1",
        }
    }

    platform = Platform(api_key=os.environ["LS_API_KEY"], services_config=services_config)

    maptile = MapTile(
        tile_type="maptile",
        scheme="hybrid.day",
        tile_size=256,
        format="jpg",
        platform=platform,
        type="aerial",
    )

    maptile_layer = TileLayer(provider=maptile, style={"max": 22})

    m = Map(
        api_key=os.environ["LS_API_KEY"],
        center=[35.68026, 139.76744],
        zoom=17,
        basemap=maptile_layer,
    )
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
basemap                object                                                          The basemap is object of :class:`TileLayer`.
===================    ============================================================    ===