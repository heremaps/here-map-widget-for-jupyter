Contributing to HERE Map Widget for Jupyter
===========================================

Thank you for taking the time to contribute.

The following is a set of guidelines for contributing to this package.
These are mostly guidelines, not rules. Use your best judgement and feel free to propose
changes to this document in a pull request.

Coding Guidelines
-------------------

1. Lint your code contributions as per `pep8 guidelines <https://www.python.org/dev/peps/pep-0008/>`_. To help you out, we have included a `Makefile` in the root directory which supports the commands below:

   Autoformat code using black:

   .. code-block:: bash

       make black

   Check for linting errors:

   .. code-block:: bash

       make lint


2. Sort the imports in each python file as per `pep8 guidelines for import
   <https://www.python.org/dev/peps/pep-0008/#imports>`_
   Please execute the isort utility to have the imports sorted auto-magically.

Notebooks
-------------------

Example notebooks are provided in `/examples
<./examples>`_.

Signing each Commit
---------------------

When you file a pull request, we ask that you sign off the
`Developer Certificate of Origin
<https://developercertificate.org/>`_ (DCO) in each commit.
Any Pull Request with commits that are not signed off will be rejected by the
`DCO check
<https://probot.github.io/apps/dco/>`_.

A DCO is a lightweight way to confirm that a contributor wrote or otherwise has the right
to submit code or documentation to a project. Simply add `Signed-off-by` as shown in the example below
to indicate that you agree with the DCO.

The git flag `-s` can be used to sign a commit:

.. code-block:: bash

    git commit -s -m 'README.md: Fix minor spelling mistake'


The result is a signed commit message:

`README.md: Fix minor spelling mistake`

`Signed-off-by: John Doe <john.doe@example.com>`

Development
-------------

For a development installation (requires npm),

    $ git clone https://github.com/heremaps/here-map-widget-for-jupyter.git

    $ cd here-map-widget-for-jupyter

    $ pip install -e .

    $ jupyter nbextension install --py --symlink --sys-prefix here_map_widget

    $ jupyter nbextension enable --py --sys-prefix here_map_widget

    $ jupyter labextension install @jupyter-widgets/jupyterlab-manager js

When actively developing your extension, build Jupyter Lab with the command:

    $ jupyter lab --watch

This takes a minute or so to get started, but then allows you to hot-reload your JavaScript extension.
To see a change, save your javascript, watch the terminal for an update.

Note on first `jupyter lab --watch`, you may need to touch a file to get Jupyter Lab to open.