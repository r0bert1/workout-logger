from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, static_folder='../react-ui/build', static_url_path='/')
bcrypt = Bcrypt(app)

if os.environ.get("HEROKU"):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get("DATABASE_URL")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///workouts.db"

db = SQLAlchemy(app)

from application import views

from application.workouts import models
from application.workouts.models import Exercise 
from application.workouts import views

from application.auth import models
from application.auth import views

from application.auth.models import User
from os import urandom
app.config["SECRET_KEY"] = urandom(32)

from flask_login import LoginManager
login_manager = LoginManager()
login_manager.init_app(app)

login_manager.login_view = "auth_login"
login_manager.login_message = "Please login to use this functionality."

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

def seed_exercises():
    if Exercise.query.count() == 0:
        e = Exercise()
        e.name = 'bench press'
        db.session().add(e)

        e = Exercise()
        e.name = 'squat'
        db.session().add(e)

        e = Exercise()
        e.name = 'deadlift'
        db.session().add(e)

        e = Exercise()
        e.name = 'pull-up'
        db.session().add(e)

        e = Exercise()
        e.name = 'overhead press'
        db.session().add(e)

        db.session().commit()

try: 
    db.create_all()
    seed_exercises()
except:
    pass