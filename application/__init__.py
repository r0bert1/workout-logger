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

try: 
    db.create_all()
except:
    pass