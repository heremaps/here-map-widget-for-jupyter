Service Urls
=============
Config for service urls is maintained in respective classes of services :class:`OMVUrl` and :class:`MapTileUrl`.

OMV Url Example
---------------

.. jupyter-execute::

    from here_map_widget import Platform
    from here_map_widget import ServiceNames, OMVUrl
    import os

    services_config = {
        ServiceNames.omv: {
            OMVUrl.scheme: "https",
            OMVUrl.host: "vector.hereapi.com",
            OMVUrl.path: "/v2/vectortiles/core/mc",
        }
    }

    platform = Platform(api_key=os.environ["LS_API_KEY"], services_config=services_config)

OMV Url Attributes
------------------
================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
OMVUrl.scheme                                       string         scheme
OMVUrl.host                                         string         host
OMVUrl.path                                         string         path
================================================    ============   ================================================


MapTile Url Example
-------------------

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

MapTile Url Attributes
----------------------

================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
MapTileUrl.scheme                                   string         scheme
MapTileUrl.host                                     string         host
MapTileUrl.path                                     string         path
================================================    ============   ================================================