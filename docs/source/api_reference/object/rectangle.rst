Rectangle Object
================

``Rectangle`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a Bounding Box as Rectangle on the Map.
Style of object is a dictionary, to get more information on all possible keys of style dictionary, please check this `link <https://developer.here.com/documentation/maps/3.1.20.0/dev_guide/topics/geo-shapes.html>`_.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map
    from here_map_widget import Bbox, Rectangle
    import os

    center = [46.017618898512374, 23.91982511231513]

    m = Map(api_key=os.environ["LS_API_KEY"], center=center, zoom=3)

    style = {"strokeColor": "#829", "lineWidth": 4}

    bbox = Bbox(top=53.1, left=13.1, bottom=43.1, right=40.1)
    rectangle = Rectangle(bbox=bbox, style=style, draggable=True)
    m.add_object(rectangle)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
bbox                   object of Bbox                                                  The geographical bounding box for the rectangle
style                  dict                                                            The style to be used when tracing the spatial object
draggable              boolean                                                         To make a draggable rectangle
extrusion              float                                                           The extrusion height for the rectangle in meters, default is 0
elevation              float                                                           The elevation height of the rectangle in meters, default is 0
===================    ============================================================    ===