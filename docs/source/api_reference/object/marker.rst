Marker Object
=============

``Marker`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize an icon on the Map. A "normal" marker that uses a static image as an icon. Large numbers of markers of this types can be added to the map very quickly and efficiently.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, Marker, WKT, Icon
    import os

    m = Map(api_key=os.environ["LS_API_KEY"], zoom=12)
    m.center = [19.1663, 72.8526]
    svg_markup = (
        '<svg width="24" height="24" '
        + 'xmlns="http://www.w3.org/2000/svg">'
        + '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" '
        + 'height="22" /><text x="12" y="18" font-size="15pt" '
        + 'font-family="Arial" font-weight="bold" text-anchor="middle" '
        + 'fill="white">M</text></svg>'
    )

    svg_icon = Icon(bitmap=svg_markup, height=30, width=30)

    mumbai_marker = Marker(lat=19.1663, lng=72.8526, icon=svg_icon)
    m.add_object(mumbai_marker)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
lat                    float              Latitude for the marker to be added
lng                    float              The element or markup to use for this icon
alt                    float              Altitude for the marker to be added, default value is 0
data                   string             Optional arbitrary data to be stored with the given map object
draggable              boolean            To make Marker draggable
evt_type               string             Event type on which info bubble is showed, please check :ref:`allowed values <misc_values>`, default value is `tap`
show_bubble            boolean            To determine whether to show info bubble for marker or not
object                 WKT object         A WKT object to set position of Marker
info                   InfoBubble object  A InfoBubble object which is set for the Marker
icon                   Icon object        A Icon object which is set for the Marker
===================    =================  ===
