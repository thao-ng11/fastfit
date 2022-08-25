# Aug 17, 2022

The group decided on the FastFIT, fitness app. We put together a excalidraw with the main page having a bunch of widgets that would lead to each section including meal plan/nutrition, workout, account, health database and journal. We also comb through the internet for free 3rd party API that can be used for our project:
https://developer.edamam.com/calorie_counting
https://api-ninjas.com/api/exercises
https://zenquotes.io/

# Aug 18, 2022

We received the feedback from Dalonte regarding our project. At the moment we will leave schedule to the stretch goal. We divide up a plan for microservices. We decided that each of us should fully develop our own microservice from backend to frontend utilizing both Django and FastAPI
Nate - Workout
Sarah - Nutrition
Ryan - Users/Authentication, Calculator
Thao - Journal/Meditation
Drew - Health Data

# Aug 19, 2022

I worked on my excalidraw for what journals would look like and what kind of features I would like on the journal portions. Seems like I will need 4 data table to create the feeling emojis and how the data will flow from one page to another

# Aug 22, 2022

We work on the data-model.md files. I spoke wtih the SEIRs and got a recommendation to switch up some of the function to be handled by the front end for better user experience. Since the data won't need to be send back to the backend

# Aug 23, 2022

Ryan decided on his own that we need to do the user authentication before we can build anything else. Which the instructor has been saying can be implemented at any point. This caused us to be delayed and sat around 2-3 hours because it was done on the main branch.

# Aug 24, 2022

We finally have our own microservices. Working together to sort out the docker-compose.yml, setting up all dockers, setting up database with SQL as well as creating a test user in order to start working with pg-admin. We work on poller for each microservice

# Aug 25, 2022
