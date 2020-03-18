from application import app, db
from flask import render_template, request, redirect, url_for
from application.workouts.models import Workout

@app.route("/workouts", methods=["GET"])
def workouts_index():
    return render_template("workouts/list.html", workouts = Workout.query.all())

@app.route("/workouts/start/")
def workouts_start():
    return render_template("workouts/start.html", workouts = Workout.query.all())

@app.route("/workouts/<workout_id>/", methods=["GET"])
def workouts_form(workout_id):
    return render_template("workouts/workout.html", workout = Workout.query.get(workout_id))

@app.route("/workouts/<workout_id>/", methods=["POST"])
def workouts_update(workout_id):
    workout = Workout.query.get(workout_id)
    workout.name = request.form.get("name")
    db.session().commit()

    return redirect(url_for("workouts_index"))


@app.route("/workouts", methods=["POST"])
def workouts_create():
    workout = Workout(request.form.get("name"))

    db.session().add(workout)
    db.session().commit()
  
    return redirect(url_for("workouts_index"))