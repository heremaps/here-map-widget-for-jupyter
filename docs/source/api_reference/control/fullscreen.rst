Fullscreen Control
===================

``Fullscreen Control`` is an ``here-map-widget-for-jupyter`` class that allows you to add a control which contains a button that will put the Map in full-screen when clicked.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, FullscreenControl
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [44.20022717941052, -72.75660780639646]
    fs = FullscreenControl()
    m.add_control(fs)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
name                   string                                                          Unique id of the widget, default value is FullscreenControl
alignment              string                                                          The layout alignment which should be applied to the ``Fullscreen Control``, please check :ref:`allowed values <misc_values>`, defaults to ``TOP_LEFT``.
===================    ============================================================    ===