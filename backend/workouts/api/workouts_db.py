import os
from psycopg_pool import ConnectionPool
import psycopg

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class MuscleGroupQueries:
    def get_muscle_group_query(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM muscle_group; 
                    """
                )

                new_list = []
                for row in cur.fetchall():
                    dictionary = {
                        "id": row[0],
                        "muscle": row[1]
                    }
                    new_list.append(dictionary)
                return new_list

    def insert_muscle_group(self, muscle):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO muscle_group (muscle)
                        VALUES (%s)
                        RETURNING id, muscle
                        """,
                        [muscle],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

class WorkoutCategoryQueries:
    def get_workout_category_query(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM workout_categories;
                    """
                )

                new_list = []
                for row in cur.fetchall():
                    dictionary = {
                        "id": row[0],
                        "category": row[1]
                    }
                    new_list.append(dictionary)
                return new_list

    def insert_workout_category(self, category):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO workout_categories (category)
                        VALUES (%s)
                        RETURNING id, category
                        """,
                        [category],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

class CardioWorkoutQueries:
    def get_cardio_workout_query(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM cardio_workout;
                    """
                )

                new_list = []
                for row in cur.fetchall():
                    dictionary = {
                        "id": row[0],
                        "uservo": row[1],
                        "category": row[2],
                        "workout_date": row[3],
                        "duration": row[4],
                        "distance": row[5],
                    }
                    new_list.append(dictionary)
                return new_list
    def insert_cardio_workout(self, uservo, category, workout_date, duration, distance):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO cardio_workout (uservo, category, workout_date, duration, distance)
                        VALUES (%s,%s,%s,%s,%s)
                        RETURNING id, uservo, category, workout_date, duration, distance
                        """,
                        [uservo, category, workout_date, duration, distance],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
