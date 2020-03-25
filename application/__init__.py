from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///workouts.db"
app.config["SQLALCHEMY_ECHO"] = True
db = SQLAlchemy(app)

from application import views

from application.workouts import models
from application.workouts import views

from application.auth import models
from application.auth import views

db.create_all()