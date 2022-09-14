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
                "username": "drew",
                "current_weight": 0,
                "height": 68,
                "current_bmi": 0,
                "entry_date": "2022-09-02T22:31:04.462088+00:00"
            },
            {
                "id": 2,
                "username": "drew",
                "current_weight": 0,
                "height": 0,
                "current_bmi": 0,
                "entry_date": "2022-09-02T22:19:17.281669+00:00"
            },
        ]


client = TestClient(app)


def test_get_all_health_data_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[HealthDataQueries] = EmptyHealthQueries

    # ACT
    # Make the request
    response = client.get("/api/health_data/")

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
    response = client.get("/api/health_data/")
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
