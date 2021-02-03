Group Object
============

``Group`` is an ``here-map-widget-for-jupyter`` class that is a container for other map objects.

Example
-------

.. jupyter-execute::

    from here_map_widget import LineString, Polyline, Marker, Group
    from here_map_widget import Map, Bbox, Rectangle, Point, Circle, LineString, Polygon
    import os

    m = Map(api_key=os.environ["LS_API_KEY"], center=[51.1657, 10.4515])

    # Polyline
    plstyle = {"lineWidth": 15}
    l = [53.3477, -6.2597, 0, 51.5008, -0.1224, 0, 48.8567, 2.3508, 0, 52.5166, 13.3833, 0]
    ls = LineString(points=l)
    pl = Polyline(object=ls, style=plstyle, draggable=True)


    # Rectangle
    rstyle = {"strokeColor": "#829", "lineWidth": 4}
    bbox = Bbox(top=53.1, left=13.1, bottom=43.1, right=40.1)
    rectangle = Rectangle(bbox=bbox, style=rstyle, draggable=True)


    # Circle
    point = Point(lat=51.1657, lng=10.4515)
    cstyle = {"strokeColor": "#829", "lineWidth": 4}
    circle = Circle(center=point, radius=1000000, style=cstyle, draggable=True)


    # Polygon
    pgstyle = {"strokeColor": "#829", "lineWidth": 4}

    l = [52, 13, 100, 48, 2, 100, 48, 16, 100, 52, 13, 100]

    ls = LineString(points=l)

    pg = Polygon(object=ls, style=pgstyle, draggable=True)


    marker = Marker(lat=51.1657, lng=10.4515, evt_type="tap", draggable=True)

    # Group
    group = Group(volatility=True)

    group.add_objects([pl, rectangle, circle, pg, marker])

    m.add_object(group)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
volatility             boolean            Indicates whether the map object is volatile, the default is false
===================    =================  ===


Methods
-------

==============   ================     ===
Method           Arguments            Doc
==============   ================     ===
add_object       Object               Add object to the group
add_objects      List of Objects      Add objects to the group
remove_object    Object               Remove object from the group
remove_objects   List of Objects      Remove objects from the group
==============   ================     ===