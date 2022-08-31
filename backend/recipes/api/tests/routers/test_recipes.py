from fastapi.testclient import TestClient

from main import app
from recipes_db import MealQueries, MealTypeQueries


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

class NormalMealTypeQueries:
    def get_meal_types(self):
        return [
            {
                "id": 1,
                "name": "Breakfast"
            },
            {
                "id": 2,
                "name": "Lunch"
            }
        ]

class EmptyMealTypeQueries:
    def get_meal_types(self):
        return None

def test_get_meal_types_returns_200():
    # ARRANGE
    app.dependency_overrides[MealTypeQueries] = NormalMealTypeQueries

    # ACT
    response = client.get("/api/meal_types")
    d = response.json()

    # ASSERT
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    app.dependency_overrides = {}

def test_get_meal_types_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[MealTypeQueries] = EmptyMealTypeQueries

    # ACT
    response = client.get("/api/meal_types")
    
    # ASSERT
    assert response.status_code == 404

    # CLEAN UP
<<<<<<< HEAD
    app.dependency_overrides = {}
=======
    app.dependency_overrides = {}
>>>>>>> recipes
