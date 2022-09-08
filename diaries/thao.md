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

I set up the docker file, routers, journal_db and journal_api. We created a testuser in the database and was able to tested out the poller for the journal. I decided to combine the model and the router into the same journal_api. Made the class JournalIn, JournalOut, Journal and JournalList, still need to set up the get and post method as well as under JournalQuerries.

# Aug 29, 2022

Was able to research and change the datetime data type into timestamptz in the database. Wote up the get all journals and post journal method. Took a bit of time to go through and test the router on FastAPI Swagger. After Ryan talked about the authentication process and instead of polling we should use the JWOT which he includeds all information of user to decode and link the user to our microservices. It took some explanations from Allisha and Dalonte to clarify the pros and cons of using polling vs. authentication via JWOT. Though the way Ryan did was hijacking JWOT and it's not industry standard but we decided to go with it and will fix our database as well as remove the poller and uservo in schema and microservices tomorrow.

# Aug 30, 2022

As a team, we worked on cleaning up the database and purge all the pollers, fixing up the docker-compose file. We also got a lecture from our SEIR, Cooper, about tailwindcss. I was able to finish the backend portion of journal including the get and delete requests for individual journal. I was also helping with the health_data microservice. We run into a blocker as a team to try doing a request for all the entries for a specific user. It's a 422 Error Unprocessable Entity. Seems like they want an integer even though we specify a string. At the moment we decided to put a pause on that and will start working on the frontend.

# Aug 31, 2022

With help from Allisha, we were able to fix the error "Cursor is closed" by reallign the list and for loop for the dictionary in the JournalQuerries. We also fixed the router {username} by moving it before the {journal_id}. Sarah and I also finished the unit tests for the routers. The main blocker from that is the 404 test rather than the 200 test. After trying to add in some if statement for a message it was able to pass it correctly rather than passing the empty list in for comparison. As a group we decided on a color palette. I ran into some major issue with Docker that even after the SEIRs try to help it didn't resolve. I suspect that it was some cache with the node_module. I found some commands on stackoverflow the next morrning to try out:
docker-compose down -v
docker-compose build --no-cache
docker-compose up --build

# Sept 1, 2022

Working on the backend: writing all journal_db and journal \_api to test all the get, post and delete route. Using FastAPI swagger to set up and to ensure the correct flow of data as well as all routes are working. The main blocker is the detail journal and get request for all journals by the user. Started to set up for the frontend REACT.

# Sept 2, 2022

Finishing up the backend and writing the unit test to test out the router. The main blocker with the unit test is actually the 404 error. Had to go back to journal_api to add Message to the response_model. I'm planning to add the authentication piece after finishing the MVP frontend for journal

# Sept 6, 2022

Starting to work on the front end. Reading through the Font Awesome and trying to implement the emoji into the JournalMain displacing. The JournalEmoji.js is set up to ensure when the activeEmoji is chosen it will be green vs. inactive will be gray. Also was able to set it up in the local state to carry the information over to the form

# Sept 7, 2022

Continue working on the front end. Changed the journalEmoji to include the actual emoji as well as the label that associate with it. This way we can access the emoji in both pages. Displacing it in the main page, then have it carry over in the form before getting submitted and list in the journalListt. In addition, I made the journalModal displacing the details of the journal. To simplify the journalList and make sure the emoji, the details and the modal will displaced the correct instance in the list, I made a journalListComponent to call upon the instances. The modal is also getting set to be hidden then displaced once the "View Detail" button is clicked.
