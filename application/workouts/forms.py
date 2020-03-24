from flask_wtf import FlaskForm
from wtforms import StringField, validators

class WorkoutForm(FlaskForm):
    name = StringField("Workout name:", [validators.Length(min=1)])
 
    class Meta:
        csrf = False