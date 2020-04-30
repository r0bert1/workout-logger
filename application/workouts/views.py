from application import app, db
from flask import request, jsonify
from application.workouts.models import Workout, Log, Sets, Exercise

@app.route('/api/exercises')
def get_exercises():
    exercises_list = Exercise.query.all()
    exercises = []

    for exercise in exercises_list:
        exercises.append({'id': exercise.id, 'name': exercise.name})

    return jsonify(exercises)

@app.route("/api/workouts/<user_id>", methods=["GET", "POST"])
def workouts(user_id):
    if request.method == "GET":
        workouts_list = Workout.query.filter(Workout.account_id == user_id)
        workouts = []

        for workout in workouts_list:
            workouts.append({'id': workout.id, 'name': workout.name})

        return jsonify(workouts)

    name = request.get_json()['name']
    exercises = request.get_json()['exercises']

    workout = Workout(name)
    workout.account_id = user_id

    db.session().add(workout)
    db.session().flush()

    log = Log()
    log.account_id = user_id
    log.workout_id = workout.id

    db.session().add(log)
    db.session().flush()

    for e in exercises:
        exercise_id = Exercise.query.filter(Exercise.name == e['name']).first().id

        for s in e['sets']:
            new_set = Sets()
            new_set.exercise_id = exercise_id
            new_set.log_id = log.id
            new_set.repetitions = s['repetitions']
            new_set.weight = s['weight']

            db.session.add(new_set)

    db.session().commit()
  
    return 'Success'

@app.route("/api/logs/<user_id>/", methods=["GET"])
def all_logs(user_id):
    logs_list = Log.query.filter(Log.account_id == user_id)
    logs = []

    for log in logs_list:
        workout = Workout.query.filter(Workout.id == log.workout_id).first()
        logs.append({'id': log.id, 'datetime': log.datetime, 'name': workout.name})

    return jsonify(logs)

@app.route("/api/logs/<user_id>/<workout_id>", methods=["POST"])
def create_log(user_id, workout_id):
    exercises = request.get_json()['exercises']

    log = Log()
    log.account_id = user_id
    log.workout_id = workout_id

    db.session().add(log)
    db.session().flush()

    for e in exercises:
        exercise_id = Exercise.query.filter(Exercise.name == e['name']).first().id
        for s in e['sets']:
            new_set = Sets()
            new_set.exercise_id = exercise_id
            new_set.log_id = log.id
            new_set.repetitions = s['repetitions']
            new_set.weight = s['weight']

            db.session.add(new_set)

    db.session().commit()

    return 'Success'

@app.route("/api/logs/<user_id>/<workout_id>", methods=["GET"])
def most_recent_log(user_id, workout_id):
    log = Log.query.filter_by(account_id = user_id, workout_id = workout_id).order_by(Log.datetime.desc()).first()
    result = db.session.execute("SELECT exercise.name, sets.repetitions, sets.weight FROM sets INNER JOIN exercise ON sets.exercise_id=exercise.id WHERE sets.log_id=:param", {"param": log.id})
    exercises = []
    for s in result:
        if not any(d['name'] == s.name for d in exercises):
            exercises.append({'name': s.name, 'sets': [{'repetitions': s.repetitions, 'weight': s.weight}]})
        else:
            for e in exercises:
                if e['name'] == s.name:
                    e['sets'].append({'repetitions': s.repetitions, 'weight': s.weight})

    workout = Workout.query.filter_by(id = workout_id).first()

    return jsonify({'id': log.id, 'name': workout.name, 'datetime': log.datetime, 'exercises': exercises})