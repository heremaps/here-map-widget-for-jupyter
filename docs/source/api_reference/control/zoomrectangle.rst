Zoom Rectangle Control
======================

``Zoom Rectangle Control`` is an ``here-map-widget-for-jupyter`` class that represents a zoom rectangle control element that allows zooming to the selected area on the screen.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, ZoomRectangle
    import os

    m = Map(api_key=os.environ['LS_API_KEY'])
    zr = ZoomRectangle(alignment='BOTTOM_RIGHT')
    m.add_control(zr)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
alignment              string                                                          The layout alignment which should be applied to the ``Zoom Rectangle Control``, please check :ref:`allowed values <misc_values>`, defaults to ``BOTTOM_RIGHT``
===================    ============================================================    ===