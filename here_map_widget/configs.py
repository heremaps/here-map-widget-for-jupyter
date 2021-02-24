# Copyright (C) 2019-2021 HERE Europe B.V.
# SPDX-License-Identifier: MIT

"""
This module defines all the constants, which will be used as configuration parameters
for HERE Location Services or basemaps.
"""

from argparse import Namespace


class DefaultLayerNames:
    """This class defines pre-configured set of HERE layers for convenient use with the map."""

    vector = Namespace(
        normal=Namespace(
            map="vector.normal.map",
            truck="vector.normal.truck",
            traffic="vector.normal.traffic",
            trafficincidents="vector.normal.trafficincidents",
        )
    )

    raster = Namespace(
        normal=Namespace(
            map="raster.normal.map",
            mapnight="raster.normal.mapnight",
            xbase="raster.normal.xbase",
            xbasenight="raster.normal.xbasenight",
            base="raster.normal.base",
            basenight="raster.normal.basenight",
            trafficincidents="raster.normal.trafficincidents",
            transit="raster.normal.transit",
            labels="raster.normal.labels",
        ),
        satellite=Namespace(
            map="raster.satellite.map",
            xbase="raster.satellite.xbase",
            base="raster.satellite.base",
            labels="raster.satellite.labels",
        ),
        terrain=Namespace(
            map="raster.terrain.map",
            xbase="raster.terrain.xbase",
            base="raster.terrain.base",
            labels="raster.terrain.labels",
        ),
    )


class ServiceNames:
    """This class implements configurations for Here Location Services."""

    routing = "routing"
    omv = "omv"
    geocoding = "geocoding"
    maptile = "maptile"
    traffic = "traffic"
    xyz = "xyz"


class URL:
    """This is base class for all urls of the services."""

    scheme = "scheme"
    host = "host"
    path = "path"


class OMVUrl(URL):
    """This class implements configurations OMV service url."""

    pass


class MapTileUrl(URL):
    """This class implements configurations for MapTile service url."""

    pass


class XYZUrl(URL):
    """This class implements configurations for XYZ service url."""

    pass
