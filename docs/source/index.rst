HERE Map Widget for Jupyter
===========================
An interactive widget that enables users to use HERE Maps API for JavaScript in Jupyter Notebook.
``HERE Map Widget for Jupyter`` builds the connection between the analytic capabilities of the `Jupyter ecosystem <https://jupyter.org/>`_ and the superior map visualization
and location services capabilities of `HERE Maps API for JavaScript <https://developer.here.com/develop/javascript-api>`_.

``HERE Map Widget for Jupyter`` is utilizing the extension system of Jupyter widgets to enhance its core functionality
with a widget to create interactive maps.

HERE Maps API for JavaScript offers Web Developers a JavaScript library with a rich set of functionalities and capabilities to build location-aware applications. Among other functionality, it supports 2D and 3D visualization, various data formats, an event system, and a seamless integration with
`HERE Location Services <https://www.here.com/platform/location-based-services>`_ and `HERE Data Hub <https://developer.here.com/products/data-hub>`_.

Important features of ``HERE Map Widget for Jupyter``:

- Interactive HERE Map in Jupyter Notebooks
- Tilt rotate / 3D Map appearance
- Integration with HERE Location Services
- Integration with HERE Data Hub
- HERE Vector Tiles
- HERE Raster Tiles

For full list of functionalities please see below sections.


.. toctree::
   :caption: Getting Started
   :maxdepth: 1

   prerequisites
   installation

.. toctree::
   :caption: Map
   :maxdepth: 1

   api_reference/map

.. toctree::
   :caption: Basemaps
   :maxdepth: 1

   api_reference/basemap/japan
   api_reference/basemap/raster
   api_reference/basemap/vector
   api_reference/basemap/map_tile

.. toctree::
   :caption: Layers
   :maxdepth: 1

   api_reference/layer/geo_json
   api_reference/layer/geodata
   api_reference/layer/xyz
   api_reference/layer/choropleth
   api_reference/layer/kml
   api_reference/layer/heatmap
   api_reference/layer/markercluster
   api_reference/layer/tile_layer


.. toctree::
   :caption: Objects
   :maxdepth: 1

   api_reference/object/circle
   api_reference/object/domicon
   api_reference/object/dommarker
   api_reference/object/group
   api_reference/object/icon
   api_reference/object/marker
   api_reference/object/overlay
   api_reference/object/polygon
   api_reference/object/polyline
   api_reference/object/rectangle

.. toctree::
   :caption: Geometries
   :maxdepth: 1

   api_reference/geometry/point
   api_reference/geometry/linestring
   api_reference/geometry/multilinestring
   api_reference/geometry/geopolygon
   api_reference/geometry/geomultipolygon
   api_reference/geometry/bbox
   api_reference/geometry/wkt


.. toctree::
   :caption: Elements
   :maxdepth: 1

   api_reference/element/infobubble
   api_reference/element/style


.. toctree::
   :caption: Controls
   :maxdepth: 1

   api_reference/control/fullscreen
   api_reference/control/mapsettings
   api_reference/control/measurement
   api_reference/control/scalebar
   api_reference/control/searchcontrol
   api_reference/control/splitmap
   api_reference/control/zoom
   api_reference/control/zoomrectangle
   api_reference/control/widgetcontrol


.. toctree::
   :caption: Config
   :maxdepth: 1

   api_reference/config/default_layers_config
   api_reference/config/service_names
   api_reference/config/service_urls
   api_reference/config/misc_values


.. toctree::
   :caption: Reference Guide
   :maxdepth: 1

   changelog


.. toctree::
   :caption: Contribution
   :maxdepth: 1

   contribution
