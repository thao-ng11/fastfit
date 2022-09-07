\connect accounts


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200), 
    lastname VARCHAR(200)
);

\connect recipes

-- CREATE TABLE meal_type (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100) NOT NULL UNIQUE
-- );

CREATE TABLE meal (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    recipe_api_id VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    type VARCHAR(25) NOT NULL
);

\connect workouts

CREATE TABLE cardio_workout (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    workout_date TIMESTAMPTZ NOT NULL,
    duration INT NOT NULL,
    distance FLOAT
);

CREATE TABLE strength_workout (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    muscle_group VARCHAR(100) NOT NULL,
    workout_date TIMESTAMPTZ NOT NULL,
    sets INT NOT NULL,
    repetitions INT NOT NULL,
    weight INT
);

\connect journals


CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    entry_date TIMESTAMPTZ NOT NULL,
    grateful TEXT NOT NULL,
    daily_aff TEXT NOT NULL,
    note TEXT NOT NULL,
    feeling INT NOT NULL
);

\connect health

CREATE TABLE health_data (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    current_weight INT NOT NULL,
    current_bmi FLOAT NOT NULL,
    entry_date TIMESTAMPTZ NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    goal_weight INT,
    goal_bmi FLOAT,
    height INT NOT NULL
);

