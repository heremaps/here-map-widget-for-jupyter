Point
======

A ``Point`` is subclass of ``Geometry`` class which can be used in multiple objects. One of the example is to define the center of the Circle.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map
    from here_map_widget import Point, Circle
    import os

    m = Map(api_key=os.environ['LS_API_KEY'], center=[19.152761, 72.87869], zoom=10)

    style = {"strokeColor": "#829", "lineWidth": 4}

    point = Point(lat=19.152761, lng=72.87869)
    circle = Circle(center=point, radius=10000, style=style, draggable=True)
    m.add_object(circle)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
lat                    Float                                                           Latitude of the Point.
lng                    Float                                                           Longitude of the Point.
alt                    Float                                                           Altitude of the Point.
===================    ============================================================    ===