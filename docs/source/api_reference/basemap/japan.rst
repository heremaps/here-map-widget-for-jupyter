Japan Basemap
==============

``Japan Basemap`` is the type of basemap of ``here-map-widget-for-jupyter`` which shows basemap data for Japan.
For more information on basemap with Japan data please check this `link <https://developer.here.com/documentation/maps/3.1.20.0/dev_guide/topics/get-started-japan.html>`_.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map, OMV, Platform, Style, TileLayer
    from here_map_widget import ServiceNames, OMVUrl

    services_config = {
        ServiceNames.omv: {
            OMVUrl.scheme: "https",
            OMVUrl.host: "vector.hereapi.com",
            OMVUrl.path: "/v2/vectortiles/core/mc",
        }
    }

    platform = Platform(api_key=os.environ["LS_API_KEY"], services_config=services_config)

    style = Style(
        config="https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/normal.day.yaml",
        base_url="https://js.api.here.com/v3/3.1/styles/omv/oslo/japan/",
    )

    omv_provider = OMV(path="v2/vectortiles/core/mc", platform=platform, style=style)

    omv_layer = TileLayer(provider=omv_provider, style={"max": 22})

    center = [35.68026, 139.76744]
    m = Map(api_key=os.environ["LS_API_KEY"], center=center, zoom=8, basemap=omv_layer)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
basemap                object                                                          The basemap is object of :class:`TileLayer`.
===================    ============================================================    ===