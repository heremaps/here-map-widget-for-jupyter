XYZ Space Layer
================

``XYZ`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a `XYZ Space
<https://www.here.xyz/api/>`_ on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import TileLayer, XYZ
    from here_map_widget import Map
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.zoom = 9
    m.center = [44.20022717941052, -72.75660780639646]

    style_flagged = {
        "layers.xyz.points.Places": {
            "filter": {"properties.GPSFLG": "Flagged for coordinate check"},
            "draw": {
                "points": {
                    "color": "blue",
                    "text": {
                        "priority": 0,
                        "font": {
                            "size": "12px",
                            "fill": "red",
                            "stroke": {"color": "white", "width": "0.5px"},
                        },
                    },
                }
            },
        }
    }

    xyz_token = os.environ["XYZ_TOKEN"]
    provider = XYZ(space_id="m2pcsiNi", token=xyz_token, show_bubble=True)
    space = TileLayer(provider=provider, style=style_flagged)
    m.add_layer(space)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
token                  string             XYZ token to access XYZ space data
space_id               string             Space id from which to access the data
evt_type               string             Event on which to show info bubble for space data, please check :ref:`allowed values <misc_values>`, default value is ``tap``.
show_bubble            boolean            To determine whether to show info bubble for space data or not
style                  dict/Style object  To provide style to for the XYZ space data
platform               Platform           Optional required only for custom Data Hub endpoints.
===================    =================  ===

Methods
-------

=========    ===============     ===
Method       Arguments           Doc
=========    ===============     ===
on_click     Callable object     Adds a callback on click event
on_hover     Callable object     Adds a callback on hover event
=========    ===============     ===
