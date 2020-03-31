from application import app, db
from flask import render_template, request, redirect, url_for, jsonify
from application.workouts.models import Workout
from application.workouts.forms import WorkoutForm
from flask_login import current_user

@app.route("/api/workouts", methods=["GET"])
def workouts():
    workouts_list = Workout.query.all()
    workouts = []

    for workout in workouts_list:
        workouts.append({'id': workout.id, 'name': workout.name})

    return jsonify(workouts)

@app.route("/workouts", methods=["GET"])
def workouts_index():
    return render_template("workouts/list.html", workouts = Workout.query.all())

@app.route("/workouts/start/")
def workouts_start():
    return render_template("workouts/start.html", workouts = Workout.query.all())

@app.route("/workouts/new/")
def workouts_new_form():
    return render_template("workouts/new_workout.html", form = WorkoutForm())

@app.route("/workouts/<workout_id>/", methods=["GET"])
def workouts_update_form(workout_id):
    workout = Workout.query.get(workout_id)
    return render_template("workouts/update_workout.html", workout = workout, form = WorkoutForm(name=workout.name))

@app.route("/workouts/<workout_id>/", methods=["POST"])
def workouts_update(workout_id):
    form = WorkoutForm(request.form)

    workout = Workout.query.get(workout_id)

    if not form.validate():
        return render_template("workouts/update_workout.html", workout = workout, form = form)
    
    workout.name = request.form.get("name")
    db.session().commit()

    return redirect(url_for("workouts_index"))

@app.route("/workouts", methods=["POST"])
def workouts_create():
    form = WorkoutForm(request.form)

    workout = Workout(form.name.data)
    workout.account_id = current_user.id

    if not form.validate():
        return render_template("workouts/new_workout.html", workout = workout, form = form)

    db.session().add(workout)
    db.session().commit()
  
    return redirect(url_for("workouts_index"))