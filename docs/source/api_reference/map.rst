Map
=======

``Map`` is a ``here-map-widget-for-jupyter`` class that allows making a Map view and all other elements are added on this base object.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, Style
    import os

    style = Style(
        config="https://heremaps.github.io/maps-api-for-javascript-examples/"
        + "change-style-at-load/data/dark.yaml",
        base_url="https://js.api.here.com/v3/3.1/styles/omv/",
    )


    m = Map(
        api_key=os.environ["LS_API_KEY"],
        style=style,
        center=[52.51477270923461, 13.39846691425174],
        zoom=13,
    )

    m

Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
api_key                string             API Key used for authentication
center                 list               The current center of the map
zoom                   float              The current zoom value of the map
heading                float              The current heading value of the map
incline                float              The current incline value of the map
tilt                   float              The current tilt value of the map
basemap                string             The current basemap of the map, default value is vector.normal.map
layers                 list of objects    The list of layers that are currently on the map
objects                list of objects    The list of objects that are currently on the map
controls               list of objects    The list of controls that are currently on the map
bubbles                list of objects    The list of bubbles that are currently on the map
style                  Style object       Style to apply for basemap
===================    =================  ===

Methods
-------

==============    ==================  ===
Method            Arguments           Doc
==============    ==================  ===
add_layer         Layer object        Adds a Layer on the Map
remove_layer      Layer object        Removes a Layer from the Map
add_object        Object instance     Adds a Object on the Map
add_objects       Object instances    Adds a list of Objects on the Map
remove_object     Object instance     Removes a Object from the Map
add_control       Control object      Adds a Control on the Map
remove_control    Control object      Removes a Control from the Map
add_bubble        InfoBubble object   Adds a InfoBubble on the Map
remove_bubble     InfoBubble object   Removes a InfoBubble from the Map
==============    ==================  ===