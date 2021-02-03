Style Element
==============

``Style`` is an ``here-map-widget-for-jupyter`` class that allows to configure style for various elements of the Map.

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

===================    ===============  ===
Attribute              Type             Doc
===================    ===============  ===
config                 string           Either a URL to load the style from, YAML formatted string or an object describing the rendering style
base_url               string           The base URL to use for resolving relative URLs in the style like textures, fonts
===================    ===============  ===
