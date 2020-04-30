## Heroku

<https://workout-logs.herokuapp.com/> (username: hello, password: world)

## Description

This app allows the user to create workout logs, where the number of repetitions and used weights for each exercise can
be specified. The user can then view their past workouts to easily keep track of their progress.

## Usage

### Running locally

Install project dependencies:

```
npm install
```

and

```
pip install -r requirements.txt
```

Then, to start the server:

```
python run.py
```

and to start the react client, run

```
npm start
```

in a separate terminal.

### Deploying to Heroku

Deploying to Heroku requires adding the nodejs buildpack:

```
heroku buildpacks:add --index 1 heroku/nodejs
```

## Documentation

[Datebase diagram](https://github.com/r0bert1/workout-logger/blob/master/docs/db-diagram.png)

[User stories](https://github.com/r0bert1/workout-logger/blob/master/docs/user-stories.md)
