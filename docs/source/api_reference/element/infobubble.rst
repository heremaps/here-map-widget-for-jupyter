Info Bubble Element
===================

``Info Bubble`` is an ``here-map-widget-for-jupyter`` class that allows to make a information bubble and bound it to a geographic position on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, Marker, Point
    from here_map_widget import InfoBubble
    import os

    m = Map(api_key=os.environ["LS_API_KEY"], zoom=8)
    m.center = [19.0760, 72.8777]
    m.zoom = 8

    info = InfoBubble(
        position=Point(lat=18.9389, lng=72.8258),
        content='<div><a href="https://mumbaicricket.com"'
        + 'target="_blank">Mumbai Cricket Association</a> </div>'
        + "<div >Wankhede Stadium<br>Capacity: 33,108</div>",
    )

    mumbai_marker = Marker(
        lat=18.9389, lng=72.8258, info=info, evt_type="tap", show_bubble=True
    )

    m.add_object(mumbai_marker)
    m

Attributes
----------

===================    ===============  ===
Attribute              Type             Doc
===================    ===============  ===
content                string           The content to be added to the info bubble
position               object of Point  The geographic location to which this info bubble corresponds
===================    ===============  ===
