## User stories

As a user, I want to create an account.

```
INSERT INTO account VALUES (<username>, <password hash>);
```

As a user, I want to add sets to the exercises of my routine.

```
INSERT INTO sets VALUES (<number of reps>, <used weight>, <exercise id>, <log id>);
```

As a user, I want to save the routine when I finish my workout.

```
INSERT INTO workout VALUES (<workout name>, <account id>);
```

As a user, I want to view my past workouts to track my progress.

```
SELECT * FROM log
WHERE account_id = <some id>;
```

As a user, I want to have a choice of using a previously created routine as a base for a new routine. I can then update it as needed and save the updated version when I finish my workout.

```
SELECT exercise.name, sets.repetitions, sets.weight FROM sets
INNER JOIN exercise ON sets.exercise_id=exercise.id WHERE sets.log_id = <some id>;
```

The rest of the user stories are implemented on the ui-level and hence have no associated sql queries:

As a user, I want to remove sets from the exercises of my routine.

As a user, I want to modify sets of the exercises of my routine.

As a user, I want to create a new routine when I start my workout.

As a user, I want to add exercises to my routine.

As a user, I want to remove exercises from my routine.
