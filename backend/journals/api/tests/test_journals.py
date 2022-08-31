from fastapi.testclient import TestClient
from main import app
from journal_db import JournalQueries




class EmptyJournalQueries:
    def get_all_journals(self):
        print("can you see me?")
        return None


class NormalJournalQueries:
    def get_all_journals(self):
        return [
            {
                "id": 1,
                "username": "testuser1",
                "entry_date": "2022-08-30T20:36:40.523093+00:00",
                "grateful": "Allisha",
                "daily_aff": "work smarter",
                "note": "be like Allisha",
                "feeling": 5,
            },
            {
                "id": 2,
                "username": "testuser2",
                "entry_date": "2022-08-31T20:35:10.523093+00:00",
                "grateful": "Sarah",
                "daily_aff": "patience is the virtue",
                "note": "be like Sarah",
                "feeling": 4,
            },
        ]

client = TestClient(app)


def test_get_all_journals_returns_404():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[JournalQueries] = EmptyJournalQueries

    # ACT
    # Make the request
    response = client.get("/api/journals/")

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 404


    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}


def test_get_all_journals_returns_200():
    # ARRANGE
    # Use our fake database
    app.dependency_overrides[JournalQueries] = NormalJournalQueries

    # ACT
    # Make the request
    response = client.get("/api/journals/")
    d = response.json()

    # ASSERT
    # Assert that we got a 404
    assert response.status_code == 200
    assert d[0]
    assert d[1]

    # CLEAN UP
    # Clear out the dependencies
    app.dependency_overrides = {}