Installation
============

In order to be able to use the HERE Maps API for JavaScript with `npm` the HERE public repository must be added to your `npm` configuration:

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/

Install HERE Map Widget for Jupyter Notebook using the commands below:

    $ pip install here-map-widget-for-jupyter

    $ jupyter nbextension install --py --sys-prefix here_map_widget

    $ jupyter nbextension enable here_map_widget --py --sys-prefix

Install HERE Map Widget for JupyterLab:

    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager @here/map-widget-for-jupyter

    $ jupyter lab build --dev-build=False --minimize=False

Installation Example
---------------------

.. code-block:: shell-session

    $ npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/

    $ pip install here-map-widget-for-jupyter
    Collecting ipywidgets
      Using cached ipywidgets-7.5.1-py2.py3-none-any.whl (121 kB)
    Collecting branca
      Using cached branca-0.4.1-py3-none-any.whl (24 kB)
    Collecting ipykernel>=4.5.1
      Using cached ipykernel-5.3.4-py3-none-any.whl (120 kB)
    Collecting widgetsnbextension~=3.5.0
      Using cached widgetsnbextension-3.5.1-py2.py3-none-any.whl (2.2 MB)
    Collecting traitlets>=4.3.1
      Using cached traitlets-5.0.4-py3-none-any.whl (98 kB)
    Collecting ipython>=4.0.0; python_version >= "3.3"
      Using cached ipython-7.18.1-py3-none-any.whl (786 kB)
    Collecting nbformat>=4.2.0
      Using cached nbformat-5.0.7-py3-none-any.whl (170 kB)
    Collecting jinja2
      Using cached Jinja2-2.11.2-py2.py3-none-any.whl (125 kB)
    Processing /Users/omestry/Library/Caches/pip/wheels/93/84/2f/409c7b2bb3afc3aa727f7ee8787975e0793f74d1165f4d0104/tornado-6.0.4-cp37-cp37m-macosx_10_9_x86_64.whl
    Collecting appnope; platform_system == "Darwin"
      Using cached appnope-0.1.0-py2.py3-none-any.whl (4.0 kB)
    Collecting jupyter-client
      Using cached jupyter_client-6.1.7-py3-none-any.whl (108 kB)
    Collecting notebook>=4.4.1
      Using cached notebook-6.1.4-py3-none-any.whl (9.5 MB)
    Collecting ipython-genutils
      Using cached ipython_genutils-0.2.0-py2.py3-none-any.whl (26 kB)
    Collecting prompt-toolkit!=3.0.0,!=3.0.1,<3.1.0,>=2.0.0
      Using cached prompt_toolkit-3.0.7-py3-none-any.whl (355 kB)
    Collecting pexpect>4.3; sys_platform != "win32"
      Using cached pexpect-4.8.0-py2.py3-none-any.whl (59 kB)
    Collecting decorator
      Using cached decorator-4.4.2-py2.py3-none-any.whl (9.2 kB)
    Collecting backcall
      Using cached backcall-0.2.0-py2.py3-none-any.whl (11 kB)
    Collecting pygments
      Using cached Pygments-2.7.1-py3-none-any.whl (944 kB)
    Requirement already satisfied: setuptools>=18.5 in /Users/omestry/opt/miniconda3/envs/test_123/lib/python3.7/site-packages (from ipython>=4.0.0; python_version >= "3.3"->ipywidgets->here-map-widget-for-jupyter==0.1.0a0) (50.3.0.post20201006)
    Collecting jedi>=0.10
      Using cached jedi-0.17.2-py2.py3-none-any.whl (1.4 MB)
    Collecting pickleshare
      Using cached pickleshare-0.7.5-py2.py3-none-any.whl (6.9 kB)
    Collecting jupyter-core
      Using cached jupyter_core-4.6.3-py2.py3-none-any.whl (83 kB)
    Collecting jsonschema!=2.5.0,>=2.4
      Using cached jsonschema-3.2.0-py2.py3-none-any.whl (56 kB)
    Collecting MarkupSafe>=0.23
      Using cached MarkupSafe-1.1.1-cp37-cp37m-macosx_10_6_intel.whl (18 kB)
    Collecting pyzmq>=13
      Using cached pyzmq-19.0.2-cp37-cp37m-macosx_10_9_x86_64.whl (801 kB)
    Collecting python-dateutil>=2.1
      Using cached python_dateutil-2.8.1-py2.py3-none-any.whl (227 kB)
    Collecting nbconvert
      Using cached nbconvert-6.0.7-py3-none-any.whl (552 kB)
    Collecting prometheus-client
      Using cached prometheus_client-0.8.0-py2.py3-none-any.whl (53 kB)
    Collecting argon2-cffi
      Using cached argon2_cffi-20.1.0-cp37-abi3-macosx_10_6_intel.whl (65 kB)
    Collecting terminado>=0.8.3
      Using cached terminado-0.9.1-py3-none-any.whl (13 kB)
    Collecting Send2Trash
      Using cached Send2Trash-1.5.0-py3-none-any.whl (12 kB)
    Collecting wcwidth
      Using cached wcwidth-0.2.5-py2.py3-none-any.whl (30 kB)
    Collecting ptyprocess>=0.5
      Using cached ptyprocess-0.6.0-py2.py3-none-any.whl (39 kB)
    Collecting parso<0.8.0,>=0.7.0
      Using cached parso-0.7.1-py2.py3-none-any.whl (109 kB)
    Collecting importlib-metadata; python_version < "3.8"
      Using cached importlib_metadata-2.0.0-py2.py3-none-any.whl (31 kB)
    Processing /Users/omestry/Library/Caches/pip/wheels/a5/52/bf/71258a1d7b3c8cbe1ee53f9314c6f65f20385481eaee573cc5/pyrsistent-0.17.3-cp37-cp37m-macosx_10_9_x86_64.whl
    Collecting six>=1.11.0
      Using cached six-1.15.0-py2.py3-none-any.whl (10 kB)
    Collecting attrs>=17.4.0
      Using cached attrs-20.2.0-py2.py3-none-any.whl (48 kB)
    Collecting entrypoints>=0.2.2
      Using cached entrypoints-0.3-py2.py3-none-any.whl (11 kB)
    Processing /Users/omestry/Library/Caches/pip/wheels/39/01/56/f1b08a6275acc59e846fa4c1e1b65dbc1919f20157d9e66c20/pandocfilters-1.4.2-cp37-none-any.whl
    Collecting nbclient<0.6.0,>=0.5.0
      Using cached nbclient-0.5.0-py3-none-any.whl (65 kB)
    Collecting mistune<2,>=0.8.1
      Using cached mistune-0.8.4-py2.py3-none-any.whl (16 kB)
    Collecting testpath
      Using cached testpath-0.4.4-py2.py3-none-any.whl (163 kB)
    Collecting jupyterlab-pygments
      Using cached jupyterlab_pygments-0.1.2-py2.py3-none-any.whl (4.6 kB)
    Collecting defusedxml
      Using cached defusedxml-0.6.0-py2.py3-none-any.whl (23 kB)
    Collecting bleach
      Using cached bleach-3.2.1-py2.py3-none-any.whl (145 kB)
    Collecting cffi>=1.0.0
      Using cached cffi-1.14.3-2-cp37-cp37m-macosx_10_9_x86_64.whl (176 kB)
    Collecting zipp>=0.5
      Using cached zipp-3.3.0-py3-none-any.whl (5.3 kB)
    Collecting async-generator
      Using cached async_generator-1.10-py3-none-any.whl (18 kB)
    Collecting nest-asyncio
      Using cached nest_asyncio-1.4.1-py3-none-any.whl (5.2 kB)
    Collecting packaging
      Using cached packaging-20.4-py2.py3-none-any.whl (37 kB)
    Collecting webencodings
      Using cached webencodings-0.5.1-py2.py3-none-any.whl (11 kB)
    Collecting pycparser
      Using cached pycparser-2.20-py2.py3-none-any.whl (112 kB)
    Collecting pyparsing>=2.0.2
      Using cached pyparsing-2.4.7-py2.py3-none-any.whl (67 kB)
    Installing collected packages: wcwidth, prompt-toolkit, ptyprocess, pexpect, ipython-genutils, traitlets, decorator, backcall, appnope, pygments, parso, jedi, pickleshare, ipython, tornado, jupyter-core, pyzmq, six, python-dateutil, jupyter-client, ipykernel, zipp, importlib-metadata, pyrsistent, attrs, jsonschema, nbformat, entrypoints, pandocfilters, async-generator, nest-asyncio, nbclient, mistune, MarkupSafe, jinja2, testpath, jupyterlab-pygments, defusedxml, pyparsing, packaging, webencodings, bleach, nbconvert, prometheus-client, pycparser, cffi, argon2-cffi, terminado, Send2Trash, notebook, widgetsnbextension, ipywidgets, branca, here-map-widget-for-jupyter
    Successfully installed MarkupSafe-1.1.1 Send2Trash-1.5.0 appnope-0.1.0 argon2-cffi-20.1.0 async-generator-1.10 attrs-20.2.0 backcall-0.2.0 bleach-3.2.1 branca-0.4.1 cffi-1.14.3 decorator-4.4.2 defusedxml-0.6.0 entrypoints-0.3 here-map-widget-for-jupyter-0.1.0a0 importlib-metadata-2.0.0 ipykernel-5.3.4 ipython-7.18.1 ipython-genutils-0.2.0 ipywidgets-7.5.1 jedi-0.17.2 jinja2-2.11.2 jsonschema-3.2.0 jupyter-client-6.1.7 jupyter-core-4.6.3 jupyterlab-pygments-0.1.2 mistune-0.8.4 nbclient-0.5.0 nbconvert-6.0.7 nbformat-5.0.7 nest-asyncio-1.4.1 notebook-6.1.4 packaging-20.4 pandocfilters-1.4.2 parso-0.7.1 pexpect-4.8.0 pickleshare-0.7.5 prometheus-client-0.8.0 prompt-toolkit-3.0.7 ptyprocess-0.6.0 pycparser-2.20 pygments-2.7.1 pyparsing-2.4.7 pyrsistent-0.17.3 python-dateutil-2.8.1 pyzmq-19.0.2 six-1.15.0 terminado-0.9.1 testpath-0.4.4 tornado-6.0.4 traitlets-5.0.4 wcwidth-0.2.5 webencodings-0.5.1 widgetsnbextension-3.5.1 zipp-3.3.0

    $ jupyter nbextension enable --py --sys-prefix here-map-widget-for-jupyter
    Enabling notebook extension here-map-widget-for-jupyter/extension...
          - Validating: OK

    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager @here/maps-api-for-javascript-widget-for-jupyter-noteboo
    Building jupyterlab assets (build:prod:minimize)

    $ npm config delete @here:registry https://repo.platform.here.com/artifactory/api/npm/here-node/