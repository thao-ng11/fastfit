## FastFIT

A fitness app to drive your fitness goals!

Team members:

* Ryan - Accounts, Dashboard
* Sarah - Recipes
* Thao - Journal
* Nate - Workouts
* Drew - Health

## Intended Market

The demographic we intend to serve are those who would like an
application to help them track general fitness and health using the following tools:

* plan and track workouts
* plan and track meals
* document and track weight
* track mood and document journals
* calculate BMI

## Functionality

* Visitors must create an account and login to access the site features
* Users can see a dashboard of personalized information:
  * Workout widget displays lists of user workouts
  * Health widget shows chart with all user tracked weights by date
  * Meal widget displays next meal based on current day and time of day
  * Jounral widget has carousel of journaling benefits
  * Random inspirational quote
  * Local weather if user's browser allows access to location

* Health Data
  * Document weight
  * Chart displays all user weights and updates with latest documented weights

* Meal Plan
  * Search recipes by meal type and keyword and schedule meals
  * Display all user's meals ordered by date

* Workout
  * Display user's workouts filtered by date
  * Search workouts by muscle group and workout type to schedule workouts

* Journal
  * Record current mood and document journal entry
  * Display total entries, current streak, and all journal entries ordered by date

* Login/Auth
  * User based authentication on all microservices
  * Sign-up page, redirects to login page

## Unit Tests

Run each microservices unit tests in the docker container listed below using the command python -m pytest.

* Accounts: /backend/accounts/api/tests/test_users.py
* Health: /backend/health/api/tests/test_health.py
* Journal: /backend/journals/api/tests/test_journals.py
* Recipes: /backend/recipes/api/tests/test_recipes.py
* Workout: /backend/workouts/api/tests/test_workouts.py

## Project Initialization

To experience this application on your local machine, follow the steps below:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Create .env file and add API keys (request via Slack)
3. Run docker volume create postgres-data
4. Run docker volume create pg-admin
5. Run docker compose build or DOCKER_DEFAULT_PLATFORM=linux/amd64 docker-compose build for Apple M1
6. Run docker compose up

## Stretch Goals

* Deployment to Heroku
* Pagination for list of journal entries and recipes
* Filter journal entries by mood or keyword
* Filter meals by meal type, date, recipe name
* Detail page for meals with recipe ingredients
* Detail page for specific workout
* Delete and update functions for user data
* Track and display BMI for user
