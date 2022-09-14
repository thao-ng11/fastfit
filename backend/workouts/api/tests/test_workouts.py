from fastapi.testclient import TestClient
from main import app
from workouts_db import  StrengthWorkoutQueries

class EmptyStrengthWorkoutQueries:
    def get_strength_workout_query(self, id):
        print("can you see this?")
        return None

class NormalStrengthQueries:
    def get_strength_workout_query(self):
        return [
           {
                "id": 15,
                "username": "test1",
                "category": "strength",
                "muscle_group": "Hamstrings",
                "workout": "Barbell Deadlift",
                "workout_date": "2022-09-13",
                "sets": 4,
                "repetitions": 4,
                "weight": 315
            },
            {
                "id": 16,
                "username": "test1",
                "category": "strength",
                "muscle_group": "Chest",
                "workout": "Pushups",
                "workout_date": "2022-09-13",
                "sets": 3,
                "repetitions": 10,
                "weight": 150
            },
        ]

client = TestClient(app)

def test_get_all_strength_workout_data_returns_405():
    # ARRANGE
    # Use  our fake database
    app.dependency_overrides[StrengthWorkoutQueries] = EmptyStrengthWorkoutQueries

    # ACT
    # Make the request
    response = client.get("/api/strength_workout/10000")

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 405

    # CLEAN UP
    # Clear out  the dependencies
    app.dependency_overrides = {}

def test_get_all_strength_workout_data_returns_200():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[StrengthWorkoutQueries] = NormalStrengthQueries

    # ACT
    # Make the request
    response = client.get("/api/strength_workout")
    d = response.json()
    print(d)

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}
