# Copyright (C) 2019-2021 HERE Europe B.V.
# SPDX-License-Identifier: MIT

"""Project setup file."""

import os

from jupyter_packaging import (
    combine_commands,
    create_cmdclass,
    ensure_targets,
    get_version,
    install_npm,
    skip_if_exists,
)
from setuptools import find_packages, setup

here = os.path.dirname(os.path.abspath(__file__))

name = "here_map_widget"

version = get_version(os.path.join(name, "_version.py"))

js_dir = os.path.join(here, "js")

# Representative files that should exist after a successful build
jstargets = [
    os.path.join("here_map_widget/nbextension", "index.js"),
    os.path.join("here_map_widget/labextension", "package.json"),
]

data_files_spec = [
    (
        "share/jupyter/nbextensions/@here/map-widget-for-jupyter",
        "here_map_widget/nbextension",
        "*.*",
    ),
    (
        "share/jupyter/labextensions/@here/map-widget-for-jupyter",
        "here_map_widget/labextension",
        "**",
    ),
    ("etc/jupyter/nbconfig/notebook.d", ".", "map-widget-for-jupyter.json"),
]

cmdclass = create_cmdclass("jsdeps", data_files_spec=data_files_spec)
js_command = combine_commands(
    install_npm(js_dir, npm=["yarn"], build_cmd="build:extensions"),
    ensure_targets(jstargets),
)

is_repo = os.path.exists(os.path.join(here, ".git"))
if is_repo:
    cmdclass["jsdeps"] = js_command
else:
    cmdclass["jsdeps"] = skip_if_exists(jstargets, js_command)

# Get the core dependencies and installs
with open(os.path.join(here, "requirements.txt"), encoding="utf-8") as f:
    all_reqs = f.read().split("\n")

with open(os.path.join(here, "README.md"), encoding="utf-8") as f:
    long_description = f.read()

# get extra dependencies
with open(os.path.join(here, "requirements_dev.txt"), encoding="utf-8") as f:
    dev_reqs = f.read().strip().split("\n")

install_requires = [x.strip() for x in all_reqs if "git+" not in x]
dependency_links = [x.strip().replace("git+", "") for x in all_reqs if x.startswith("git+")]


setup_args = {
    "version": version,
    "include_package_data": True,
    "install_requires": install_requires,
    "dependency_links": dependency_links,
    "packages": find_packages(),
    "zip_safe": False,
    "cmdclass": cmdclass,
    "long_description": long_description,
    "long_description_content_type": "text/markdown",
    "extras_require": {"dev": dev_reqs},
}

setup(**setup_args)
