from application import app, db
from flask import render_template, request
from application.workouts.models import Workout

@app.route("/workouts/new/")
def workouts_form():
    return render_template("workouts/new.html")

@app.route("/workouts/", methods=["POST"])
def workouts_create():
    print(request.form.get("name"))

    workout = Workout(request.form.get("name"))

    db.session().add(workout)
    db.session().commit()
  
    return "hello world!"