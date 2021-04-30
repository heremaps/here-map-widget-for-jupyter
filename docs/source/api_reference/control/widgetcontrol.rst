Widget Control
==============

``Widget Control`` is an ``here-map-widget-for-jupyter`` class that allows integration of various `ipywidgets <https://ipywidgets.readthedocs.io/en/7.6.3/examples/Widget%20List.html>`_ with ``here-map-widget-for-jupyter``.

Example
-------

.. jupyter-execute::

    from here_map_widget import WidgetControl, Map
    from ipywidgets import FloatSlider, ColorPicker, jslink
    import os

    m = Map(api_key=os.environ['LS_API_KEY'])

    zoom_slider = FloatSlider(description='Tilt level:', min=0, max=90, value=0)
    jslink((zoom_slider, 'value'), (m, 'tilt'))
    widget_control1 = WidgetControl(widget=zoom_slider, alignment="TOP_RIGHT", name="FloatSlider")

    m.add_control(widget_control1)
    m


Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
name                   string                                                          Unique id of the widget, default value is SplitMapControl
alignment              string                                                          The layout alignment which should be applied to the ``Widget Control``, please check :ref:`allowed values <misc_values>`, defaults to ``RIGHT_BOTTOM``
widget                 object of ipywidget                                             The ipywidget to be added
transparent_bg         boolean                                                         If set to ``True``, widget will be added with transparent background. Default False.
===================    ============================================================    ===