# Release Instructions

To release a new version of HERE Map Widget for Jupyter to PyPI follow the steps below:

1. Set release version and remove 'dev' in `here_map_widget/_version.py`.
2. Create a commit e.g. run `git add the _version.py` and `git commit`, do not do a git push.
3. Run `python setup.py sdist upload`
4. Run `python setup.py bdist_wheel upload`
5. Run `git tag -a X.X.X -m 'comment'`
6. Increment the minor version number and add 'dev' in `here_map_widget/_version.py`
7. Create a commit e.g. run `git add` and `git commit`
8. Push all commits via `git push`
9. Push all tag via `git push --tags`

## Publishing to npmjs.com

To release a new version of @here/map-widget-for-jupyter to npmjs.com

1. Update `js/package.json` with new npm package version
2. Clean the `dist` and `node_modules` directories by running the below:

```
git clean -fdx
npm install
npm publish
```