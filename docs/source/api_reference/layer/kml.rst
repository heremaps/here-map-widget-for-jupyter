KML Layer
==========

``KML`` is an ``here-map-widget-for-jupyter`` class that allows you to visualize `KML Data
<https://www.ogc.org/standards/kml>`_ on the Map.

Example
-------

.. jupyter-execute::

    from here_map_widget import Map, KML
    import os

    m = Map(
        api_key=os.environ["LS_API_KEY"], center=[44.20022717941052, -72.75660780639646]
    )
    url = (
        "https://heremaps.github.io/maps-api-for-javascript-examples/"
        + "display-kml-on-map/data/us-states.kml"
    )
    kml = KML(url=url)
    m.add_layer(kml)
    m


Attributes
----------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
url                    string             KML Data URL to be plotted
===================    =================  ===
