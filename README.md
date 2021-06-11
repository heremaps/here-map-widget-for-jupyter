# HERE Map Widget for Jupyter

![Tests](https://github.com/heremaps/here-map-widget-for-jupyter/workflows/Tests/badge.svg)
[![PyPI - Status](https://img.shields.io/pypi/status/here-map-widget-for-jupyter)](https://pypi.org/project/here-map-widget-for-jupyter/)
[![PyPI - Python Version](https://img.shields.io/pypi/v/here-map-widget-for-jupyter.svg?logo=pypi)](https://pypi.org/project/here-map-widget-for-jupyter/)
[![PyPI - Python Version](https://img.shields.io/pypi/pyversions/here-map-widget-for-jupyter)](https://pypi.org/project/here-map-widget-for-jupyter/)
[![PyPI - License](https://img.shields.io/pypi/l/here-map-widget-for-jupyter)](https://pypi.org/project/here-map-widget-for-jupyter/)
[![Downloads](https://pepy.tech/badge/here-map-widget-for-jupyter)](https://pepy.tech/project/here-map-widget-for-jupyter)
[![Conda (channel only)](https://img.shields.io/conda/vn/conda-forge/here-map-widget-for-jupyter?logo=conda-forge)](https://anaconda.org/conda-forge/here-map-widget-for-jupyter)
[![Conda Downloads](https://img.shields.io/conda/dn/conda-forge/here-map-widget-for-jupyter)](https://anaconda.org/conda-forge/here-map-widget-for-jupyter)
[![Anaconda-Server Badge](https://anaconda.org/conda-forge/here-map-widget-for-jupyter/badges/latest_release_date.svg)](https://anaconda.org/conda-forge/here-map-widget-for-jupyter)
[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/heremaps/here-map-widget-for-jupyter/master?urlpath=lab/tree/examples)

Use [HERE Maps API for JavaScript](https://developer.here.com/develop/javascript-api) in your [Jupyter Notebook](https://jupyter.org/).

## Usage

### Selecting a basemap:

![Select base map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/basemaps.gif)

### Loading a GeoJSON data on a map:

![Use GeoJSON on map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/geojson.gif)

### Making use of HERE Maps API for JavaScript primitives such as Marker to draw a SVG icon on the map:

![Add marker to map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/marker.gif)

### Using the search control to search GeoJSON layer data:

![Add search control to map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/search-control.gif)

### Displaying [GeoPandas](https://geopandas.org/) data on map:

![Add Geopandas data to map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/geo-pandas.gif)

### Displaying [XYZ Hub](https://github.com/heremaps/xyz-hub) or [HERE Data Hub](https://developer.here.com/products/data-hub) space data on a map:

![Add XYZ data to map](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/xyz.gif)

### Use [ipywidgets](https://ipywidgets.readthedocs.io/) controls to build an interactive GUI:

![Add ipywidgets controls](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/images/widget-control.gif)

## Prerequisites

Before you can install this package, or use the example notebooks to make sure your system meets the following prerequisities:

- A Python installation, 3.6+ recommended, with the `pip` command available to install dependencies
- A HERE developer account, free and available under [HERE Developer Portal](https://developer.here.com)
- An [API key](https://developer.here.com/documentation/identity-access-management/dev_guide/topics/dev-apikey.html) from the [HERE Developer Portal](https://developer.here.com)

## Installation

Install HERE Map Widget for Jupyter with conda from the Anaconda [conda-forge channel](https://anaconda.org/conda-forge/here-map-widget-for-jupyter) using the below command:

    $ conda install -c conda-forge here-map-widget-for-jupyter

Install HERE Map Widget for Jupyter from [PyPI](https://pypi.org/project/here-map-widget-for-jupyter/) using the below command:

    $ pip install here-map-widget-for-jupyter

Below extra commands are required only if you are using classic Jupyter Notebook (version 5.3 or older):

    $ jupyter nbextension install --py --sys-prefix here_map_widget

    $ jupyter nbextension enable here_map_widget --py --sys-prefix

Below extra commands are required only if you are using JupyterLab (version 2 or older):

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/

    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager @here/map-widget-for-jupyter


### Installation from source repository on GitHub

For a development installation (requires yarn, you can install it with `conda install -c conda-forge yarn`):

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/
    $ git clone https://github.com/heremaps/here-map-widget-for-jupyter.git
    $ cd here-map-widget-for-jupyter
    $ pip install -e .

If you are using the classic Jupyter Notebook you need to install the nbextension:

    $ jupyter nbextension install --py --sys-prefix here_map_widget

    $ jupyter nbextension enable here_map_widget --py --sys-prefix


Note for developers:

- the ``-e`` pip option allows one to modify the Python code in-place. Restart the kernel in order to see the changes.
- the ``--symlink`` argument on Linux or OS X allows one to modify the JavaScript code in-place. This feature is not available with Windows.

For developing with JupyterLab:

    $ jupyter labextension develop --overwrite here_map_widget


## Documentation

Documentation is available [here](https://here-map-widget-for-jupyter.readthedocs.io/en/latest/)

## License

Copyright (C) 2019-2021 HERE Europe B.V.

Unless otherwise noted in `LICENSE` files for specific directories, the [LICENSE](https://github.com/heremaps/here-map-widget-for-jupyter/raw/master/LICENSE) in the root applies to all content in this repository.
