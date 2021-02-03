# HERE Map Widget for Jupyter

Use [HERE Maps API for JavaScript](https://developer.here.com/develop/javascript-api) in your [Jupyter Notebook](https://jupyter.org/).

## Usage

**Selecting a basemap:**

![Select base map](images/basemaps.gif)

**Loading a GeoJSON data on a map:**

![Use GeoJSON on map](images/geojson.gif)

**Making use of HERE Maps API for JavaScript primitives such as Marker to draw a SVG icon on the map:**

![Add marker to map](images/marker.gif)

**Using the search control to search GeoJSON layer data:**

![Add search control to map](images/search-control.gif)

**Displaying [GeoPandas](https://geopandas.org/) data on map:**

![Add Geopandas data to map](images/geo-pandas.gif)

**Displaying [XYZ Hub](https://github.com/heremaps/xyz-hub) or [HERE Data Hub](https://developer.here.com/products/data-hub) space data on a map:**

![Add XYZ data to map](images/xyz.gif)

**Use [ipywidgets](https://ipywidgets.readthedocs.io/) controls to build an interactive GUI:**

![Add ipywidgets controls](images/widget-control.gif)

## Prerequisites

Before you can install this package, or use the example notebooks to make sure your system meets the following prerequisities:

- A Python installation, 3.6+ recommended, with the `pip` command available to install dependencies
- A Node.js installation, 10.13.0+ recommended,  with the `npm` command available to install dependencies
- A HERE developer account, free and available under [HERE Developer Portal](https://developer.here.com)
- An [API key](https://developer.here.com/documentation/identity-access-management/dev_guide/topics/dev-apikey.html) from the [HERE Developer Portal](https://developer.here.com)

## Installation

In order to be able to use the HERE Maps API for JavaScript with `npm` the HERE public repository must be added to your `npm` configuration:

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/
    
Install HERE Map Widget for Jupyter Notebook using the commands below:

    $ pip install here-map-widget-for-jupyter
    $ jupyter nbextension install --py --sys-prefix here_map_widget
    $ jupyter nbextension enable here_map_widget --py --sys-prefix

Install HERE Map Widget for JupyterLab (version 2 or older):

    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager @here/map-widget-for-jupyter


For a development installation (requires npm to be pre-installed) run:

    $ git clone https://github.com/heremaps/here-map-widget-for-jupyter.git
    $ cd here-map-widget-for-jupyter
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --sys-prefix here_map_widget
    $ jupyter nbextension enable --py --sys-prefix here_map_widget
    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager js

If you are actively developing your extension, we recommend you build JupyterLab with the command below:

    $ jupyter lab --watch

It does take a minute or so to get started, but then hot-reload your JavaScript extension changes.
For every change, save your JavaScript and then watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open.

## Documentation

A collection of example notebooks is provided in the [/examples](./examples) directory.

## License

Copyright (C) 2019-2021 HERE Europe B.V.

Unless otherwise noted in `LICENSE` files for specific directories, the [LICENSE](LICENSE) in the root applies to all content in this repository.
