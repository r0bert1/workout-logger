from flask import render_template
from application import app
import os

# Render jinja templates

# @app.route("/")
# def index():
#    return render_template("index.html")

def bundle_last_updated():
    return str(os.path.getmtime('./react-ui/build/bundle.js'))

# Serve react files

@app.route("/")
def react_index():
    return render_template('react-index.html', last_updated=bundle_last_updated())
