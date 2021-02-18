# Copyright (C) 2019-2021 HERE Europe B.V.
# SPDX-License-Identifier: MIT

"""Project setup file."""

import os
import json
from distutils import log
from setuptools import setup, find_packages

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    get_version,
)

here = os.path.dirname(os.path.abspath(__file__))
# node_root = os.path.join(here, 'js')
# is_repo = os.path.exists(os.path.join(here, '.git'))
#
# npm_path = os.pathsep.join([
#     os.path.join(node_root, 'node_modules', '.bin'),
#     os.environ.get('PATH', os.defpath),
# ])


log.set_verbosity(log.DEBUG)
log.info("setup.py entered")
log.info("$PATH=%s" % os.environ["PATH"])


# def js_prerelease(command, strict=False):
#     """decorator for building minified js/css prior to another command"""
#
#     class DecoratedCommand(command):
#         def run(self):
#             jsdeps = self.distribution.get_command_obj('jsdeps')
#             if not is_repo and all(os.path.exists(t) for t in jsdeps.targets):
#                 # sdist, nothing to do
#                 command.run(self)
#                 return
#
#             try:
#                 self.distribution.run_command('jsdeps')
#             except Exception as e:
#                 missing = [t for t in jsdeps.targets if not os.path.exists(t)]
#                 if strict or missing:
#                     log.warn('rebuilding js and css failed')
#                     if missing:
#                         log.error('missing files: %s' % missing)
#                     raise e
#                 else:
#                     log.warn('rebuilding js and css failed (not a problem)')
#                     log.warn(str(e))
#             command.run(self)
#             update_package_data(self.distribution)
#
#     return DecoratedCommand
#
#
# def update_package_data(distribution):
#     """update package_data to catch changes during setup"""
#     build_py = distribution.get_command_obj('build_py')
#     # distribution.package_data = find_package_data()
#     # re-init build_py options which load package_data
#     build_py.finalize_options()


# class NPM(Command):
#     description = 'install package.json dependencies using npm'
#
#     user_options = []
#
#     node_modules = os.path.join(node_root, 'node_modules')
#
#     targets = [
#         os.path.join(here, 'here_map_widget', 'static', 'extension.js'),
#         os.path.join(here, 'here_map_widget', 'static', 'index.js')
#     ]
#
#     def initialize_options(self):
#         pass
#
#     def finalize_options(self):
#         pass
#
#     def get_npm_name(self):
#         npmName = 'npm';
#         if platform.system() == 'Windows':
#             npmName = 'npm.cmd';
#
#         return npmName;
#
#     def has_npm(self):
#         npmName = self.get_npm_name();
#         try:
#             check_call([npmName, '--version'])
#             return True
#         except:
#             return False
#
#     def should_run_npm_install(self):
#         package_json = os.path.join(node_root, 'package.json')
#         node_modules_exists = os.path.exists(self.node_modules)
#         return self.has_npm()
#
#     def run(self):
#         has_npm = self.has_npm()
#         if not has_npm:
#             log.error(
#                 "`npm` unavailable.  If you're running this command using sudo, make sure `npm` is available to sudo")
#
#         env = os.environ.copy()
#         env['PATH'] = npm_path
#
#         if self.should_run_npm_install():
#             log.info("Installing build dependencies with npm.  This may take a while...")
#             npmName = self.get_npm_name();
#             check_call([npmName, 'install'], cwd=node_root, stdout=sys.stdout, stderr=sys.stderr)
#             check_call(['npm', 'pack'], cwd=node_root, stdout=sys.stdout, stderr=sys.stderr)
#             os.utime(self.node_modules, None)
#
#         for t in self.targets:
#             if not os.path.exists(t):
#                 msg = 'Missing file: %s' % t
#                 if not has_npm:
#                     msg += '\nnpm is required to build a development version of a widget extension'
#                 raise ValueError(msg)
#
#         # update package data in case this created new files
#         update_package_data(self.distribution)


# version_ns = {}
# with open(os.path.join(here, 'here_map_widget', '_version.py')) as f:
#     exec(f.read(), {}, version_ns)

name = "here_map_widget"

version = get_version(os.path.join(name, "_version.py"))

js_dir = os.path.join(here, "js")

# Representative files that should exist after a successful build
jstargets = [
    os.path.join(js_dir, "dist", "index.js"),
]

data_files_spec = [
    ("share/jupyter/nbextensions/map-widget-for-jupyter", "here_map_widget/nbextension", "*.*"),
    (
        "share/jupyter/labextensions/@here/map-widget-for-jupyter",
        "here_map_widget/labextension",
        "**",
    ),
    ("etc/jupyter/nbconfig/notebook.d", ".", "map-widget-for-jupyter.json"),
]

cmdclass = create_cmdclass("jsdeps", data_files_spec=data_files_spec)
cmdclass["jsdeps"] = combine_commands(
    install_npm(js_dir, build_cmd="build"), ensure_targets(jstargets),
)

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

# with open(os.path.join(node_root, 'package.json')) as fj:
#     package_json = json.load(fj)
#
# tgz = '%s-%s.tgz' % ('here-map-widget-for-jupyter', package_json['version'])

setup_args = {
    "version": version,
    "include_package_data": True,
    "install_requires": install_requires,
    "dependency_links": dependency_links,
    "packages": find_packages(),
    "zip_safe": False,
    "cmdclass": cmdclass,
    "project_urls": {"Source": "ssh://git@github.com:heremaps/here-map-widget-for-jupyter.git"},
    "long_description": long_description,
    "long_description_content_type": "text/markdown",
    "extras_require": {"dev": dev_reqs},
}

setup(**setup_args)
