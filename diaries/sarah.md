# Progress Report

### 9/11

I worked on the styling for the userMeals.js page. I set up the authorization for the recipe search pages so messages to login show and the buttons to add a recipe to a meal stop showing if a token isn't returned. I discovered that the get and delete by id routers weren't giving the proper return messages if the function isn't successful, so I corrected those. I added buttons and functions to allow users to delete each meal and added auth to the delete router in fastapi. I ended up converting my userMeals.js class component into a function and that would allow me to call the setMeals hook in the mealResult.js function component and filter the meals state list to refresh the list of meals and not include the id that was deleted. It took so much trial and error today to get it all working. I also used the useNavigate hook to redirect the user to the login page if the token was not pulled. The only way I was able to get it to work was by hitting the accounts token route to fetch the token; otherwise, it kept redirecting before the state could fully be loaded with the token.

### 9/9

Worked on styling the recipeSearch.js and recipeResult.js components using Tailwind and aligning with the color scheme for the site. I got the post request to work for each recipe row and added temporary popups to show if the meal was successfully saved or not using the timeout hook.

### 9/8

I worked more on the recipesSearch.js file. I was able to hit the Edamam API based on a set of parameters and show the first 20 recipes from the results on the page. Next I need to create a modal for another window to pop up to enter the date if someone wants to add a recipe to their meals. I'll have to update the post with the authorization function to post router to get the token and get the username for the post request.

### 9/7

Started on the recipeSearch.js page that will hit the Edamam API and retrieve a list of recipes based on the meal type and food query. I decided to change my database schema and no longer use a meal_type table to store the "Breakfast", "Lunch", "Dinner", etc types and just hardcode that in the option list on the front end.

### 9/6

Got the user auth working for the UserMeals.js page! I had to update the url path to no longer pass through the username as a variable and instead passed the token in the header. I updated the router file to include the get_user_info function and pulled the username from the token. It surprisingly came together fairly easily with only a couple issues.

### 9/1

Worked on the userMeals.js file to pull the meals for a given user and loop through the meals to hit the edamam api for each recipe_id to get the name of the recipe and a picture to display on the user meals page. Next I'll be ready to work on the authentication to show the meals based on the logged in user.

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
