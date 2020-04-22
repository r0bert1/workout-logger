from application import db

class Workout(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)

    account_id = db.Column(db.Integer, db.ForeignKey('account.id'),
                            nullable=False)

    logs = db.relationship("Log", backref="workout", lazy=True)

    def __init__(self, name):
        self.name = name

class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    datetime = db.Column(db.DateTime, default=db.func.current_timestamp())
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'),
                            nullable=False)
    workout_id = db.Column(db.Integer, db.ForeignKey('workout.id'),
                            nullable=False)

    sets = db.relationship('Sets', backref='log', lazy=True)

class Exercise(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    sets = db.relationship('Sets', backref='exercise', lazy=True)

class Sets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    repetitions = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Integer, nullable=False)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercise.id'),
                            nullable=False)
    log_id = db.Column(db.Integer, db.ForeignKey('log.id'),
                            nullable=False)