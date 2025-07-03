# Contributing to HERE Map Widget for Jupyter

Thank you for taking the time to contribute.

The following is a set of guidelines for contributing to this package.
These are mostly guidelines, not rules. Use your best judgement and feel free to propose
changes to this document in a pull request.

## Coding Guidelines

### 1. Lint your code contributions as per [pep8 guidelines](https://www.python.org/dev/peps/pep-0008/).

To help you out, we have scripts in `pyproject.toml` which supports the commands below:

Autoformat code using black:

```bash
hatch run lint:reformat
```

Check for linting errors:

```bash
hatch run lint:check
```

Make sure [hatch](https://hatch.pypa.io/1.13/) CLI is installed via an installer, pip, or conda beforehand.

### 2. Sort the imports in each python file as per [pep8 guidelines](https://www.python.org/dev/peps/pep-0008/#imports)

Please execute the isort utility to have the imports sorted auto-magically.

## Notebooks

Example notebooks are provided in [/examples](./examples).

## Edit documentation

Source of documentaion is available in [/docs](./docs).

Following commands build documentation

```bash
cd docs
make html
```

## Rebuild

The following command allows you to delete final and intermediate artifacts from the project directory.

```bash
hatch run clean-all
```

It's possible to try dry-run before executing removal.

```bash
hatch run clean-all-dry
```

## Signing each Commit

When you file a pull request, we ask that you sign off the
[Developer Certificate of Origin](https://developercertificate.org/) (DCO) in each commit.
Any Pull Request with commits that are not signed off will be rejected by the
[DCO check](https://probot.github.io/apps/dco/).

A DCO is a lightweight way to confirm that a contributor wrote or otherwise has the right
to submit code or documentation to a project. Simply add `Signed-off-by` as shown in the example below
to indicate that you agree with the DCO.

The git flag `-s` can be used to sign a commit:

```bash
git commit -s -m 'README.md: Fix minor spelling mistake'
```

The result is a signed commit message:

```
README.md: Fix minor spelling mistake

Signed-off-by: John Doe <john.doe@example.com>
```