from fastapi.testclient import TestClient

from main import app
from recipes_db import MealQueries


client = TestClient(app)

# class EmptyMealQueries:
#     def get_meal(self, id):
#         return None

# def test_get_meal_returns_404():
#     # ARRANGE
#     # Use our fake database
#     app.dependency_overrides[MealQueries] = EmptyMealQueries

#     # ACT
#     # Make the request
#     response = client.get("api/meals/1")

#     # ASSERT
#     # Assert that we got a 404
#     assert response.status_code == 404

#     # CLEAN UP
#     # Clear out the dependencies
#     app.dependency_overrides = {}


# class NormalMealQueries:
#     def get_meal(self, id):
#         return [
#             {
#             "id": id,
#             "username": "testuser",
#             "recipe_api_id": "string",
#             "date": "2022-08-30",
#             "type": 1
#             }
#         ]

# def test_get_meal_returns_200():
#     # ARRANGE
#     app.dependency_overrides[MealQueries] = NormalMealQueries

#     # ACT
#     response = client.get("api/meals/1")
#     d = response.json()

#     # ASSERT
#     # assert response.status_code == 200
#     assert d["id"] == 1
#     assert d["username"] == "testuser"
#     assert d["recipes_api_id"] == "string"
#     assert d["date"] == "2022-08-30"
#     assert d["type"] == 1

#     # CLEAN UP
#     app.dependency_overrides = {}

def test_meal_in_exists():
    from recipes_models import MealIn

# def test_meal_out_exists():
#     from 

class NormalMealQueries:
    def get_meals(self):
        return [
            {
                "id": 1,
                "username": "testuser",
                "recipe_api_id": "recipe_string1",
                "date": "2022-09-14",
                "type": "Breakfast"
            },
            {
                "id": 2,
                "username": "testuser",
                "recipe_api_id": "recipe_string2",
                "date": "2022-09-14",
                "type": "Lunch"
            }
        ]

class EmptyMealQueries:
    def get_meals(self):
        return None

def test_get_meals_returns_200():
    # ARRANGE
    app.dependency_overrides[MealQueries] = NormalMealQueries

    # ACT
    response = client.get("/api/meals")
    d = response.json()

    # ASSERT
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    app.dependency_overrides = {}

def test_get_meals_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[MealQueries] = EmptyMealQueries

    # ACT
    response = client.get("/api/meals")
    
    # ASSERT
    assert response.status_code == 404

    # CLEAN UP
    app.dependency_overrides = {}
