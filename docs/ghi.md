# Graphical Human Interface

## Dashboard

This is the main page that people will see when they
log in to the Web site.

![Image](wireframes/FastFIT.png)

- Landing page is polling the data from the other microservices and displaying on different widgets. Additionally, we have the two widgets for Weather and Inspirational Quotes. As they click the widget it will lead them to the main page of each microservice. In addition, user can access the links through the Nav Bar.

## Journal

This is the journal microservice.

![Image](wireframes/FastFIT_Journal.png)

- The main page: User can indicate their mood based on the mood meter. The page also displays the total entries from the user as well as the current streak from the user.

- The journal form: The data from the mood board is carried over to the form. User will fill out and submit the form for the entry being generated.

- The journal list: This page will show the list of all entries. There is button on the page to access pop up modal that display the detaild journal.

## Recipes

This is the recipe microservice.

![Image](wireframes/FastFIT_Recipes.png)

- User meals: the dashboard will have a navlink to the My Meals page which shows a list of all meals users' have saved ordered by date.

- Search meals: users can search for recipes based on a meal type (Breakfast, Lunch, or Dinner) and a food query. In the row results, a date can be added and the recipe saved to their meals.


## Workouts

This is the Workouts Microservice

![Image](wireframes/FastFIT_Workouts.png)

- Workout plan: This is where you can see the workouts filtered by day. If you have nothing  in your workout plan, you can direct yourself to add a workout.

- Add a workout: This is where you can add a number of workouts. Here you can select a muscle group as well as the type of workout, then you can add it to your workout plan.


## Health Data

This is the Health Data Microservice

![Image](wireframes/FastFIT_Health_Data.png)

- Weight Tracker: This page keeps track of your weight maintenance. Each input is take the weight and automatically adds the date to current date/time. Each input adds on to the list.

- Stretch goal: Add the BMI graph as well to auto load given a user's height. Heigh data model is already included in our MVP, just need to add it. 
