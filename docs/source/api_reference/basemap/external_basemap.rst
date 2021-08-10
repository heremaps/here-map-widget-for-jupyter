External Basemaps
=================
``here-map-widget-for-jupyter`` also supports basemaps from external tile providers.
We use tile providers defined in `xyzservices <https://github.com/geopandas/xyzservices>`_
:attr:`here_map_widget.basemaps` is mapped to :class:`xyzservices.providers`


Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map, basemaps

    m = Map(
        api_key=os.environ["LS_API_KEY"],
        center=[52.51477270923461, 13.39846691425174],
        zoom=4,
        basemap=basemaps.OpenStreetMap.Mapnik,
    )
    m



Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
basemap                object                                                          The basemap is object of :class:`xyzservices.lib.TileProvider`, defined under :attr:`here_map_widget.basemaps`.
===================    ============================================================    ===