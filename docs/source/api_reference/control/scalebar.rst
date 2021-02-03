Scale Bar Control
=================

``Scale Bar Control`` is an ``here-map-widget-for-jupyter`` class that represents a UI element that shows the zoom scale.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, ScaleBar
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    sb = ScaleBar()
    m.add_control(sb)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
alignment              string                                                          The layout alignment which should be applied to the ``Scale Bar Control``, please check :ref:`allowed values <misc_values>`, defaults to ``RIGHT_BOTTOM``
===================    ============================================================    ===