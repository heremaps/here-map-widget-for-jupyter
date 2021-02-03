.. _default_layers_names_config:

Default Layers Names
====================
:class:`DefaultLayers` is a pre-configured set of HERE layers for convenient use as basemap.
:class:`DefaulLayerNames` is config of various ``layer_name`` s  which is used to instantiate :class:`DefaultLayers`.

Vector Layer names example
--------------------------

.. jupyter-execute::

    from here_map_widget import DefaultLayerNames

    DefaultLayerNames.vector.normal.map


Vector Layer Names
--------------------

================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
DefaultLayerNames.vector.normal.map                 string         vector.normal.map
DefaultLayerNames.vector.normal.truck               string         vector.normal.truck
DefaultLayerNames.vector.normal.traffic             string         vector.normal.traffic
DefaultLayerNames.vector.normal.trafficincidents    string         vector.normal.trafficincidents
================================================    ============   ================================================


Raster Layer names example
--------------------------

.. jupyter-execute::

    from here_map_widget import DefaultLayerNames

    DefaultLayerNames.raster.normal.map


Raster Layer Names
--------------------

================================================    ============   ================================================
Object                                              Type           Value
================================================    ============   ================================================
DefaultLayerNames.raster.normal.map                 string         raster.normal.map
DefaultLayerNames.raster.normal.mapnight            string         raster.normal.mapnight
DefaultLayerNames.raster.normal.xbase               string         raster.normal.xbase
DefaultLayerNames.raster.normal.xbasenight          string         raster.normal.xbasenight
DefaultLayerNames.raster.normal.base                string         raster.normal.base
DefaultLayerNames.raster.normal.basenight           string         raster.normal.basenight
DefaultLayerNames.raster.normal.trafficincidents    string         raster.normal.trafficincidents
DefaultLayerNames.raster.normal.transit             string         raster.normal.transit
DefaultLayerNames.raster.normal.labels              string         raster.normal.labels
DefaultLayerNames.raster.satellite.map              string         raster.satellite.map
DefaultLayerNames.raster.satellite.xbase            string         raster.satellite.xbase
DefaultLayerNames.raster.satellite.base             string         raster.satellite.base
DefaultLayerNames.raster.terrain.map                string         raster.terrain.map
DefaultLayerNames.raster.terrain.xbase              string         raster.terrain.xbase
DefaultLayerNames.raster.terrain.base               string         raster.terrain.base
DefaultLayerNames.raster.terrain.labels             string         raster.terrain.labels
================================================    ============   ================================================