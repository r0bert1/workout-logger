from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='../react-ui/build', static_url_path='/')
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///workouts.db"
db = SQLAlchemy(app)

from application import views

from application.workouts import models
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

db.create_all()