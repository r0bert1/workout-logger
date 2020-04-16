from flask import render_template, request, redirect, url_for, jsonify
from flask_login import login_user, logout_user

from application import app, db, bcrypt
from application.auth.models import User
from application.auth.forms import LoginForm, RegisterForm

from sqlalchemy.exc import IntegrityError

@app.route("/api/login", methods = ["POST"])
def login():
    username = request.get_json()['username']
    password = request.get_json()['password']

    user = User.query.filter_by(username=username).first()

    if not bcrypt.check_password_hash(user.password, password):
        return 'Wrong password'
    
    return jsonify({ 'id': user.id, 'username': user.username })

@app.route("/api/register", methods = ["POST"])
def register():
    username = request.get_json()['username']
    password = request.get_json()['password']

    password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    user = User(username, password_hash)

    db.session().add(user)
    db.session().commit()

    return ''

@app.route("/auth/login", methods = ["GET", "POST"])
def auth_login():
    if request.method == "GET":
        return render_template("auth/loginform.html", form = LoginForm())

    form = LoginForm(request.form)

    user = User.query.filter_by(username=form.username.data, password=form.password.data).first()
    if not user:
        return render_template("auth/loginform.html", form = form,
                               error = "No such username or password")


    login_user(user)
    return redirect(url_for("index"))

@app.route("/auth/logout")
def auth_logout():
    logout_user()
    return redirect(url_for("index"))

@app.route("/auth/register", methods = ["GET", "POST"])
def auth_register():
    if request.method == "GET":
        return render_template("auth/registerform.html", form = RegisterForm())
    
    form = RegisterForm(request.form)

    if not form.validate():
        return render_template("auth/registerform.html", form = form)

    user = User(form.username.data, form.password.data)
    
    try:
        db.session().add(user)
        db.session().commit()
    except IntegrityError:
        return render_template("auth/registerform.html", form = form,
                                error = "Username " + user.username + " already exists")
        

    return redirect(url_for("auth_login"))

