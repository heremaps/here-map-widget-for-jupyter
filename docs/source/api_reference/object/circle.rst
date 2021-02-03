Circle Object
=============

``Circle`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a circle on the Map.
Style of object is a dictionary, to get more information on all possible keys of style dictionary, please check this `link <https://developer.here.com/documentation/maps/3.1.20.0/dev_guide/topics/geo-shapes.html>`_.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map
    from here_map_widget import Point, Circle, FullscreenControl
    import os

    center = [19.152761, 72.87869]

    m = Map(api_key=os.environ["LS_API_KEY"], center=center, zoom=10)

    style = {"strokeColor": "#829", "lineWidth": 4}

    point = Point(lat=19.152761, lng=72.87869)
    circle = Circle(center=point, radius=10000, style=style, draggable=True)
    m.add_object(circle)
    m.add_control(FullscreenControl())
    m

Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
center                 Point object       The geographical coordinates of the center of the circle
radius                 float              The radius of the circle in meters
style                  dict               The style to be used when tracing the polyline (circle)
draggable              boolean            To make circle draggable
extrusion              float              The extrusion height for the circle in meters, default is 0
elevation              float              The elevation height of the circle in meters, default is 0
===================    =================  ===
