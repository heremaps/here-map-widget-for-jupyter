Overlay Object
==============

``Overlay`` is an ``here-map-widget-for-jupyter`` class that allows you to visual a rectangular area on a Map in the form of a bitmap.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, Overlay, Rectangle, Bbox, FullscreenControl
    from ipywidgets import Image
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [53.1, 13.1]
    m.zoom = 3
    bbox = Bbox(
        top=70.72849153520343,
        left=-24.085683364175395,
        bottom=29.569664922291,
        right=44.216452317817016,
    )

    overlay = Overlay(
        boundingBox=bbox,
        bitmap="https://heremaps.github.io/"
        + "maps-api-for-javascript-examples/image-overlay/data/0.png",
        volatility=True,
    )
    m.add_object(overlay)
    m.add_control(FullscreenControl())
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
content                string             Optional arbitrary data to be stored with the map overlay
boundingBox            Bbox object        A rectangular area of the overlay defined in terms of the geographical coordinates of its top-left and bottom-right corners
bitmap                 string             An image URL, an SVG image (markup), a bitmap image or a canvas
min                    float              The minimum zoom level at which the object is visible, the default is -Infinity
max                    float              The maximum zoom level at which the object is visible, the default is Infinity
opacity                float              The opacity of the object in range from 0 (transparent) to 1 (opaque), the default is 1
visibility             boolean            Indicates whether the map object is visible, the default is True
volatility             boolean            Indicates whether the map object is volatile, the default is False
===================    =================  ===

Methods
-------

==========    ===============     ===
Method        Arguments           Doc
==========    ===============     ===
set_bitmap    string              Set bitmap for Overlay
==========    ===============     ===
