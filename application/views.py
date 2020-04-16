from flask import render_template, send_from_directory
from application import app
import os

# Render jinja templates

# @app.route("/")
# def index():
#    return render_template("index.html")

def bundle_last_updated():
    return str(os.path.getmtime('./react-ui/build/bundle.js'))

# Serve react files

@app.route('/', defaults={'path': ''})
@app.route('/<string:path>')
@app.route('/<path:path>')
def catch_all(path):
    path_dir = os.path.abspath('./react-ui/build')
    if path != "" and os.path.exists(os.path.join(path_dir, path)):
        return send_from_directory(os.path.join(path_dir), path)

    return render_template('react-index.html', last_updated=bundle_last_updated())