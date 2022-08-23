\connect accounts

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL, 
    email VARCHAR(200) NOT NULL UNIQUE, 
    firstname VARCHAR(200), 
    lastname VARCHAR(200)

);