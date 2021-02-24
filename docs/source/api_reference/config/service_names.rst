Service Names
=============
Config for service names is maintained in :class:`ServiceNames`.

Service Names Example
---------------------

.. jupyter-execute::

    from here_map_widget import Map, Platform, MapTile
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

Service Names
-------------

================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
ServiceNames.omv                                    string         omv
ServiceNames.maptile                                string         maptile
ServiceNames.xyz                                    string         xyz
================================================    ============   ================================================