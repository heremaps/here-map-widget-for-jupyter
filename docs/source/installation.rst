.. highlight:: sh

Installation
============

Install HERE Map Widget for Jupyter with conda from the Anaconda `conda-forge channel <https://anaconda.org/conda-forge/here-map-widget-for-jupyter>`_ using the below command::

    $ conda install -c conda-forge here-map-widget-for-jupyter

Install HERE Map Widget for Jupyter from `PyPI <https://pypi.org/project/here-map-widget-for-jupyter/>`_ using the below command::

    $ pip install here-map-widget-for-jupyter

Below extra commands are required only if you are using classic Jupyter Notebook (version 5.3 or older)::

    $ jupyter nbextension install --py --sys-prefix here_map_widget
    $ jupyter nbextension enable here_map_widget --py --sys-prefix

Below extra commands are required only if you are using JupyterLab (version 2 or older)::

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/
    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager @here/map-widget-for-jupyter


Installation from source repository on GitHub
---------------------------------------------

For a development installation (requires yarn, you can install it with ``conda install -c conda-forge yarn``)::

    $ git clone https://github.com/heremaps/here-map-widget-for-jupyter.git
    $ cd here-map-widget-for-jupyter
    $ pip install -e .

If you are using the classic Jupyter Notebook you need to install the nbextension::

    $ jupyter nbextension install --py --sys-prefix here_map_widget
    $ jupyter nbextension enable here_map_widget --py --sys-prefix


Note for developers:

- the ``-e`` pip option allows one to modify the Python code in-place. Restart the kernel in order to see the changes.
- the ``--symlink`` argument on Linux or OS X allows one to modify the JavaScript code in-place. This feature is not available with Windows.

For developing with JupyterLab::

    $ jupyter labextension develop --overwrite here_map_widget
