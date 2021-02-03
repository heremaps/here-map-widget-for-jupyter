DomIcon Object
==============

``DomIcon`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a marker with a custom DomIcon on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, FullscreenControl, DomMarker, DomIcon
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [41.8625, -87.6166]
    m.zoom = 15
    icon = DomIcon(
        element='<div style="user-select: none; cursor: default;"> \
    <div style="color: red; background-color: blue; border: 2px solid black;'
        + "font: 12px / 12px arial; padding-top: 2px; padding-left: 4px; width: 20px;"
        + 'height: 20px; margin-top: -10px; margin-left: -10px;">C</div> \
    </div>'
    )
    marker = DomMarker(lat=41.8625, lng=-87.6166, icon=icon)
    m.add_object(marker)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
element                string             The element or markup to use for this icon
===================    =================  ===
