from fastapi.testclient import TestClient
from main import app
from health_db import HealthDataQueries


class EmptyHealthQueries:
    def get_all_health_data(self):
        print("can you see me?")
        return None


class NormalHealthQueries:
    def get_all_health_data(self):
        return [
            {
                "id": 1,
                "username": "testuser1",
                "entry_date": "2022-08-30T20:36:40.523093+00:00",
            },
            {
                "id": 2,
                "username": "testuser2",
                "entry_date": "2022-08-31T20:35:10.523093+00:00",
            },
        ]

client = TestClient(app)


def test_get_all_health_data_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[HealthDataQueries] = EmptyHealthQueries

    # ACT
    # Make the request
    response = client.get("/api/health/")

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 404


    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}


def test_get_all_health_data_returns_200():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[HealthDataQueries] = NormalHealthQueries

    # ACT
    # Make the request
    response = client.get("/api/health/")
    d = response.json()

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}