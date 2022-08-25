# Progress Report

### 8/24

Tried to build the poller to get user data from the accounts microservice. When trying to create a test user in the accounts fastapi swagger site, the user post wasn't working, so the team added an sql file to insert a test user in the accounts user table. Nate and I discovered that most of the tables from the table create schema file weren't actually creating when reviewing pgadmin. We had to make several changes to the docker compose file and added data types to all the tables where we had references too that we previously didn't put. The tables finally created! The team then got all the docker containers for the pollers to pull the uservo into our microservices!

### 8/23

The team worked together to design all the db tables in the data_model.md file. We expanded on each of our microservices to confirm the data we need to store in the db and are ready to design the db sql files tomorrow.

### 8/22

Today I explored the Edamam API I'm using to determine what kind of information is available and how the data can be filtered. I used a test django project to practice pulling the data and created the anti-corruption layers. I excalidrawed my recipes front end design and determined the models/database tables needed.
