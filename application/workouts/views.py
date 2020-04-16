from application import app, db
from flask import render_template, request, redirect, url_for, jsonify
from application.workouts.models import Workout, Log
from application.workouts.forms import WorkoutForm
from flask_login import current_user

@app.route("/api/workouts", methods=["GET", "POST"])
def workouts():
    if request.method == "GET":
        workouts_list = Workout.query.all()
        workouts = []

        for workout in workouts_list:
            workouts.append({'id': workout.id, 'name': workout.name})

        return jsonify(workouts)

    name = request.get_json()['name']
    user_id = request.get_json()['userId']

    workout = Workout(name)
    workout.account_id = user_id

    db.session().add(workout)
    db.session().flush()

    log = Log()
    log.account_id = user_id
    log.workout_id = workout.id

    db.session().add(log)
    db.session().commit()
  
    return 'Success'

@app.route("/api/logs/<user_id>/", methods=["GET"])
def logs(user_id):
    logs_list = Log.query.filter(Log.account_id == user_id)
    logs = []

    for log in logs_list:
        workout = Workout.query.filter(Workout.id == log.workout_id).first()
        logs.append({'id': log.id, 'datetime': log.datetime, 'name': workout.name})

    return jsonify(logs)

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
    
    log = Log()
    log.account_id = current_user.id
    log.workout_id = workout_id

    workout.name = request.form.get("name")
    db.session().add(log)
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
    db.session().flush()

    log = Log()
    log.account_id = current_user.id
    log.workout_id = workout.id

    db.session().add(log)
    db.session().commit()
  
    return redirect(url_for("workouts_index"))