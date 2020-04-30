```
CREATE TABLE workout (
        id INTEGER NOT NULL,
        name VARCHAR(80) NOT NULL,
        account_id INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(account_id) REFERENCES account (id)
);
```

```
CREATE TABLE log (
        id INTEGER NOT NULL,
        datetime DATETIME,
        account_id INTEGER NOT NULL,
        workout_id INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(account_id) REFERENCES account (id),
        FOREIGN KEY(workout_id) REFERENCES workout (id)
);
```

```
CREATE TABLE account (
        id INTEGER NOT NULL,
        username VARCHAR(144) NOT NULL,
        password VARCHAR(144) NOT NULL,
        PRIMARY KEY (id),
        UNIQUE (username)
);
```

```
CREATE TABLE exercise (
        id INTEGER NOT NULL,
        name VARCHAR(80) NOT NULL,
        PRIMARY KEY (id)
);
```

```
CREATE TABLE sets (
        id INTEGER NOT NULL,
        repetitions INTEGER NOT NULL,
        weight INTEGER NOT NULL,
        exercise_id INTEGER NOT NULL,
        log_id INTEGER NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY(exercise_id) REFERENCES exercise (id),
        FOREIGN KEY(log_id) REFERENCES log (id)
);
```
