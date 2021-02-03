MarkerCluster Layer
===================

Sometimes, you may need to display a large set of data on the map, for example several thousand points.
There are two potential problems you may encounter: one is a possible performance degradation when all the points (markers) are visible
at lower zoom levels, the other is the fact that the markers located in close geographic proximity to one another
may visibly overlap and even hide one another at lower zoom levels.
A solution to both these problems is offered by ``MarkerCluster Layer``.



Example
-------

.. jupyter-execute::

    import os
    from here_map_widget import Map, MarkerCluster, ZoomControl, ObjectLayer


    m = Map(api_key=os.environ["LS_API_KEY"], center=[51.01, 0.01], zoom=7)

    data = """
    <!DOCTYPE html>
    <html>
    <body>
    <h1>Marker</h1>
    <p>{}</p>
    </body>
    </html>
    """
    p1 = dict(lat=51.01, lng=0.01, data=data.format("First Marker"))
    p2 = dict(lat=50.04, lng=1.01, data=data.format("Second Marker"))
    p3 = dict(lat=51.45, lng=1.01, data=data.format("Third Marker"))
    p4 = dict(lat=51.01, lng=2.01, data=data.format("Fourth Marker"))

    provider = MarkerCluster(data_points=[p1, p2, p3, p4], show_bubble=True)
    layer = ObjectLayer(provider=provider)
    m.add_layer(layer)
    zc = ZoomControl(alignment="LEFT_TOP")
    m.add_control(zc)
    m


Attributes of MarkerCluster
---------------------------

===================    =================  ===
Attribute              Type               Doc
===================    =================  ===
data_points            List               A list of dictionaries, each dictionary will have keys: ``lat`` for latitude of the point, ``lng`` for longitude of the point, ``data`` for data associated with point which should be HTML string, ``weight`` for weight of the point as a positive number, the default is 1.
eps                    Int                The epsilon parameter for cluster calculations. It must not exceed 256 and must take values that are a power of 2. Default is 32.
min_weight             Int                The minimum point weight sum to form a cluster, the default is 2.
min_zoom               Int                The minimum supported zoom level, the default is 0.
max_zoom               Int                The maximum supported zoom level, the default is 22.
show_bubble            Boolean            If ``True`` then shows data associated with point as ``InfoBubble``, default is ``False``.
evt_type               string             The type of event to be used to show ``InfoBubble``. please check :ref:`allowed values <misc_values>`. Default value is ``tap``.
===================    =================  ===
