from flask import render_template
from application import app
import os

# Render jinja templates

# @app.route("/")
# def index():
#    return render_template("index.html")

# Serve react files

def bundle_last_updated():
    return str(os.path.getmtime('./react-ui/build/bundle.js'))

@app.route('/', defaults={'path': ''})
@app.route('/<string:path>')
@app.route('/<path:path>')
def catch_all(path):
    return render_template('react-index.html', last_updated=bundle_last_updated())