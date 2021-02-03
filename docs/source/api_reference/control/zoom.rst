Zoom Control
============

``Zoom Control`` is an ``here-map-widget-for-jupyter`` class that represents the UI control that allows the user to change the map zoom level.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, ZoomControl, GeoJSON
    import os

    m = Map(api_key=os.environ['LS_API_KEY'])
    zc = ZoomControl(alignment='BOTTOM_RIGHT', slider=True)
    m.add_control(zc)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
zoomSpeed              float                                                           The zoom speed in levels per second, defaults to 4
fractionalZoom         boolean                                                         A flag indicating whether fractional zoom levels are allowed (True, default) or not (False).
alignment              string                                                          The layout alignment which should be applied to the ``Zoom Control``, please check :ref:`allowed values <misc_values>`,  defaults to ``RIGHT_MIDDLE``
slider                 boolean                                                         A flag indicating whether to show the slider (True) or not (False, default)
sliderSnaps            boolean                                                         A flag indicating whether the slider should snap to integer values or not, defaults to False
===================    ============================================================    ===