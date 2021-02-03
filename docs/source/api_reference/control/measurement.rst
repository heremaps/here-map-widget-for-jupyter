Measurement Control
===================

``Measurement Control`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a distance measurement control on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, MeasurementControl, Icon, Marker
    import os

    m = Map(api_key=os.environ["LS_API_KEY"])
    m.center = [44.20022717941052, -72.75660780639646]
    start_markup = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    start_markup += '<circle cx="10" cy="10" r="7" fill="transparent" stroke="green" stroke-width="4"/>'
    start_markup += "</svg>"

    stopover_markup = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    stopover_markup += '<circle cx="10" cy="10" r="7" fill="transparent" stroke="yellow" stroke-width="4"/>'
    stopover_markup += "</svg>"

    end_markup = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    end_markup += '<circle cx="10" cy="10" r="7" fill="transparent" stroke="red" stroke-width="4"/>'
    end_markup += "</svg>"

    split_markup = '<svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg">'
    split_markup += '<circle cx="10" cy="10" r="7" fill="transparent" stroke="orange" stroke-width="4"/>'
    split_markup += "</svg>"

    start_icon = Icon(bitmap=start_markup, height=20, width=20, anchor={"x": 10, "y": 10})
    stopover_icon = Icon(
        bitmap=stopover_markup, height=20, width=20, anchor={"x": 10, "y": 10}
    )
    end_icon = Icon(bitmap=end_markup, height=20, width=20, anchor={"x": 10, "y": 10})
    split_icon = Icon(bitmap=split_markup, height=20, width=20, anchor={"x": 10, "y": 10})

    mc = MeasurementControl(
        start_icon=start_icon,
        stopover_icon=stopover_icon,
        end_icon=end_icon,
        split_icon=split_icon,
    )

    m.add_control(mc)
    m

Attributes
----------

===================    ============================================================    ===
Attribute              Type                                                            Doc
===================    ============================================================    ===
name                   string                                                          Unique id of the widget, default value is MeasurementControl
alignment              string                                                          The layout alignment which should be applied to the ``Measurement Control``, please check :ref:`allowed values <misc_values>`, defaults to ``RIGHT_BOTTOM``
start_icon             object of Icon                                                  The icon to use for the first measurement point
stopover_icon          object of Icon                                                  The icon to use for the intermediate measurement points
end_icon               object of Icon                                                  The icon to use for the last measurement point
split_icon             object of Icon                                                  The icon to use to indicate the position under the pointer, over the line where a new point will be created once user clicks
===================    ============================================================    ===