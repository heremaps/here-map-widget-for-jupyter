Service Urls
=============
Config for service urls is maintained in respective classes of services :class:`OMVUrl`, :class:`MapTileUrl`
and :class:`XYZUrl`.

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


XYZ Url Example
---------------
If  `XYZ Hub <https://github.com/heremaps/xyz-hub>`_ or `HERE Data Hub <https://developer.here.com/products/data-hub>`_
is hosted on your local machine.

.. jupyter-execute::

    from here_map_widget import TileLayer, XYZ
    from here_map_widget import Map, Platform, ServiceNames, XYZUrl
    import os

    m = Map(api_key=os.environ["LS_API_KEY"], center=[36.59, -98.70], zoom=2)

    services_config = {
        ServiceNames.xyz: {
            XYZUrl.scheme: "http",
            XYZUrl.host: "localhost:8080",
            XYZUrl.path: "/hub/spaces",
        }
    }

    platform = Platform(api_key=os.environ["LS_API_KEY"], services_config=services_config)
    provider = XYZ(space_id="YOUR-SPACE-ID", platform=platform)
    space_layer = TileLayer(provider=provider)
    m.add_layer(space_layer)
    m

XYZ Url Attributes
------------------

================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
XYZUrl.scheme                                       string         scheme
XYZUrl.host                                         string         host
XYZUrl.path                                         string         path
================================================    ============   ================================================