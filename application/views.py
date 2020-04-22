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

# @app.route('/', defaults={'path': ''})
@app.route('/', defaults={'path1': '', 'path2': ''})
@app.route('/<string:path1>', defaults={'path2': ''})
@app.route('/<string:path1>/<string:path2>')
def catch_all(path1, path2):
    print(path2)
    print(path1)
    path_dir = os.path.abspath('./react-ui/build')

    if path1 != '' and path2 == '' and os.path.exists(os.path.join(path_dir, path1)):
        return send_from_directory(os.path.join(path_dir), path1)

    if path1 != '' and path2 != '' and os.path.exists(os.path.join(path_dir, path2)): 
        return send_from_directory(os.path.join(path_dir), path2)

    return render_template('react-index.html', last_updated=bundle_last_updated())