# Progress Report

### 8/31

Finished fully implementing Tailwind in the project to be able to format the main page in react. Wrote 3 unit tests for the recipes back end. Also fixed the routers so that the error messages show instead of just 500 Internal Server Error messages when duplicate entries or when items aren't found.
Started the react front end to show the list of all the meal plans for a specific user.

### 8/30

Team met with a SEIR to learn how to install and implement Tailwind to use in our project in place of Bootstrap for the CSS on the front end. I worked on the meal put request and the meal get by username request and both are getting the 'cursor is closed' error, so I'm going to leave those for stretch goals and start on the front end tomorrow.

### 8/29

Reviewed JWT authentication process with team and determined that we will no longer use a poller to poll in the user data into the uservo table. We will instead look for the JWT and decode it to get the username and save that, so we have to update the database schema to remove those uservo tables. Added delete and put methods to my meal tables. The put method is giving a strange error that the 'cursor is closed' even though the put request is successful. Going to leave it along for now and see if there are issues on the front end as well.

### 8/25

Created post and get methods for all of my data tables. Tried to get the put method to work for the meal type, but was unsuccessful. Going to continue it next week.

### 8/24

Tried to build the poller to get user data from the accounts microservice. When trying to create a test user in the accounts fastapi swagger site, the user post wasn't working, so the team added an sql file to insert a test user in the accounts user table. Nate and I discovered that most of the tables from the table create schema file weren't actually creating when reviewing pgadmin. We had to make several changes to the docker compose file and added data types to all the tables where we had references too that we previously didn't put. The tables finally created! The team then got all the docker containers for the pollers to pull the uservo into our microservices!

### 8/23

The team worked together to design all the db tables in the data_model.md file. We expanded on each of our microservices to confirm the data we need to store in the db and are ready to design the db sql files tomorrow.

### 8/22

Today I explored the Edamam API I'm using to determine what kind of information is available and how the data can be filtered. I used a test django project to practice pulling the data and created the anti-corruption layers. I excalidrawed my recipes front end design and determined the models/database tables needed.
