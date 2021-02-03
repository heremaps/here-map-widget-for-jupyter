Raster Basemaps
===============

``Raster Basemaps`` are pre-configured set of HERE layers for convenient use as basemap supported by ``here-map-widget-for-jupyter``.
Detailed information about raster basemaps supported by ``HERE Maps API for JavaScript`` can be found `here <https://developer.here.com/documentation/maps/3.1.20.0/dev_guide/topics/raster.html>`_.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, DefaultLayers, DefaultLayerNames, Platform
    import os

    default_layer = DefaultLayers(layer_name=DefaultLayerNames.raster.satellite.map)

    m = Map(
        api_key=os.environ["LS_API_KEY"], basemap=default_layer, center=[44.2002, -72.7566]
    )
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
basemap                object                                                          Object of :class:`DefaultLayers`. for various types of ``layer_name`` supported by ``DefaultLayers``, please check :ref:`config <default_layers_names_config>`.
===================    ============================================================    ===
