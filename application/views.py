from flask import render_template
from application import app


#@app.route("/")
#def index():
#    return render_template("index.html")

@app.route("/")
def index():
    return app.send_static_file('index.html')
