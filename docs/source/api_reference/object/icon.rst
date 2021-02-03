Icon Object
===========

``Icon`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize a marker with a custom Icon on the Map.

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
bitmap                 string             An image URL, an SVG (string), an bitmap image or a canvas
height                 float              Height of the icon
width                  float              Width of the icon
anchor                 dict               The anchor point in pixels, the default is bottom-center
===================    =================  ===
