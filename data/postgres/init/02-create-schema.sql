\connect accounts

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200), 
    lastname VARCHAR(200)
);

CREATE TABLE user_profile (
    id SERIAL PRIMARY KEY,
    username INT REFERENCES users(id),
    height INT NOT NULL,
    zip INT NOT NULL
);

\connect recipes

CREATE TABLE uservo (
    id SERIAL PRIMARY KEY,
    usernamevo VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE meal_type (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE meal (
    id SERIAL PRIMARY KEY,
    uservo INT REFERENCES uservo(id),
    recipe_api_id VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    type INT REFERENCES meal_type(id) NOT NULL
);

\connect workouts

CREATE TABLE uservo (
    id SERIAL PRIMARY KEY,
    usernamevo VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE workout_categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE muscle_group (
    id SERIAL PRIMARY KEY,
    muscle VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE cardio_workout (
    id SERIAL PRIMARY KEY,
    uservo INT REFERENCES uservo(id) ON DELETE CASCADE,
    category INT REFERENCES workout_categories(id),
    muscle_group INT REFERENCES muscle_group(id),
    workout_date TIMESTAMPTZ NOT NULL,
    duration INT NOT NULL,
    distance FLOAT
);

CREATE TABLE strength_workout (
    id SERIAL PRIMARY KEY,
    uservo INT REFERENCES uservo(id) ON DELETE CASCADE,
    category INT REFERENCES workout_categories(id),
    muscle_group INT REFERENCES muscle_group(id),
    workout_date TIMESTAMPTZ NOT NULL,
    sets INT NOT NULL,
    repetitions INT NOT NULL,
    weight INT
);

\connect journals

CREATE TABLE uservo (
    id SERIAL PRIMARY KEY,
    usernamevo VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE journal (
    id SERIAL PRIMARY KEY,
    uservo INT REFERENCES uservo(id) ON DELETE CASCADE,
    entry_date TIMESTAMPTZ, NOT NULL
    grateful TEXT NOT NULL,
    daily_aff TEXT NOT NULL,
    note TEXT NOT NULL,
    feeling INT NOT NULL
);

\connect health

CREATE TABLE uservo (
    id SERIAL PRIMARY KEY,
    usernamevo VARCHAR(100) NOT NULL UNIQUE,
    heightvo INT NOT NULL
);

CREATE TABLE health_data (
    uservo_id INT REFERENCES uservo(id),
    current_weight INT NOT NULL,
    current_bmi FLOAT NOT NULL,
    entry_date timestamp DEFAULT current_timestamp
);

CREATE TABLE goals (
    uservo_id INT REFERENCES uservo(id),
    goal_weight INT,
    goal_bmi FLOAT
);

