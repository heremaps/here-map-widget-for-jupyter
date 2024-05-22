# Release Instructions
This document describes the release process of here-map-widget-for-jupyter, and is mostly intended for package maintainers.

## Preparation

The following are mandatory pre-release steps to bring the repository into a proper shape:

- Update versions in [pyproject.toml](pyproject.toml)
- Update versions in [here_map_widget/_version.py](here_map_widget/_version.py) as desired.
- Update [js/package.json](js/package.json) with new npm package version.  
- Make sure all tests listed in `CONTRIBUTING.md` pass successfully.
- Make sure badges appear as expected in the [README.md on GitHub](https://github.com/heremaps/here-map-widget-for-jupyter/blob/master/README.md).

## Release on PyPI

- Create a new release in the GitHub UI by clicking on [Draft a new release](https://github.com/heremaps/here-map-widget-for-jupyter/releases/new) button, then update the tag version and release description.
- Click on the `Publish release` button to release the [package on PyPI](https://pypi.org/project/here-map-widget-for-jupyter/).
- Once released verify that `pip install here-map-widget-for-jupyter` does indeed install the latest release.

  
## Release on Anaconda's conda-forge channel

- Go to the [here-map-widget-for-jupyter-feedstock](https://github.com/conda-forge/here-map-widget-for-jupyter-feedstock) repository.
- Create a new release branch and update `version`, `url`, `sha256` hash of the released tar and dependencies in [meta.yml](https://github.com/conda-forge/here-map-widget-for-jupyter-feedstock/blob/master/recipe/meta.yaml)
- Verify `requirements` in [meta.yml](https://github.com/conda-forge/here-map-widget-for-jupyter-feedstock/blob/master/recipe/meta.yaml)
- Raise a PR for this release branch and merge the changes in master.
- It can take hours for a new release to [appear on Anaconda.org](https://anaconda.org/conda-forge/here-map-widget-for-jupyter).
- Once available verify that `conda install -c conda-forge here-map-widget-for-jupyter` does indeed install the latest release.
