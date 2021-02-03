BBOX
=====

A ``bbox`` is a subclass of ``Geometry`` class which is  used to create a ``Rectangle`` object which can then be visualised on the Map.

Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map
    from here_map_widget import Bbox, Rectangle


    m = Map(
        api_key=os.environ["LS_API_KEY"],
        center=[46.017618898512374, 23.91982511231513],
        zoom=3,
    )

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
top                    Float                                                           A value indicating the northern-most latitude.
left                   Float                                                           A value indicating the left-most longitude.
bottom                 Float                                                           A value indicating the southern-most latitude.
right                  Float                                                           A value indicating the right-most latitude.
===================    ============================================================    ===