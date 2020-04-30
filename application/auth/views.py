from flask import request, jsonify

from application import app, db, bcrypt
from application.auth.models import User

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
