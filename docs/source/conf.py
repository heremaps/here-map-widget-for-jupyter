import sphinx_rtd_theme

extensions = [
    "jupyter_sphinx",
]

templates_path = ["_templates"]


def setup(app):
    app.add_css_file("main_stylesheet.css")


master_doc = "index"
source_suffix = ".rst"

# General information about the project.
project = "HERE Map Widget for Jupyter"
copyright = "Copyright (C) 2019-2024 HERE Europe B.V."
author = "HERE Europe B.V."

exclude_patterns = []
highlight_language = "python"
pygments_style = "sphinx"

# Output file base name for HTML help builder.
html_theme = "sphinx_rtd_theme"
html_theme_path = [sphinx_rtd_theme.get_html_theme_path()]
htmlhelp_basename = "here-map-widget-for-jupyter-doc"
html_static_path = ["_static"]

# PDf Output
# pdf_documents = [('index', u'rst2pdf', u'Sample rst2pdf doc', u'Your Name'),]
