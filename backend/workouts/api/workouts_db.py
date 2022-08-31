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
                        "username": row[1],
                        "category": row[2],
                        "workout_date": row[3],
                        "duration": row[4],
                        "distance": row[5],
                    }
                    new_list.append(dictionary)
                return new_list
                
    def insert_cardio_workout(self, username, category, workout_date, duration, distance):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO cardio_workout (username, category, workout_date, duration, distance)
                        VALUES (%s,%s,%s,%s,%s)
                        RETURNING id, username, category, workout_date, duration, distance
                        """,
                        [username, category, workout_date, duration, distance],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    def delete_cardio_workout(self,id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM cardio_workout
                    WHERE id = %s
                    """,
                    [id],
                )
    def update_cardio_workout(self, category, workout_date, duration, distance, id,):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE cardio_workout
                    SET category = %s, workout_date = %s, duration = %s, distance = %s
                    WHERE id = %s
                    RETURNING id, username, category, workout_date, duration, distance
                    """,
                    [category, workout_date, duration, distance, id],
                )
                conn.commit()
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

class StrengthWorkoutQueries:
    def get_strength_workout_query(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM strength_workout;
                    """
                )

                new_list = []
                for row in cur.fetchall():
                    dictionary = {
                        "id": row[0],
                        "username": row[1],
                        "category": row[2],
                        "muscle_group":row[3],
                        "workout_date": row[4],
                        "sets" : row[5],
                        "repetitions": row[6],
                        "weight": row[7],
                    }
                    new_list.append(dictionary)
                return new_list

    def insert_strength_workout(self, username, category, muscle_group, workout_date, sets, repetitions, weight):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO strength_workout (username, category, muscle_group, workout_date, sets, repetitions, weight)
                        VALUES (%s,%s,%s,%s,%s,%s,%s)
                        RETURNING id, username, category, muscle_group, workout_date, sets, repetitions, weight
                        """,
                        [username, category, muscle_group, workout_date, sets, repetitions, weight ],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    def delete_strength_workout(self,id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM strength_workout
                    WHERE id = %s
                    """,
                    [id],
                )
    def update_strength_workout(self,  category, muscle_group, workout_date, sets, repetitions, weight, id,):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    UPDATE strength_workout
                    SET category = %s, muscle_group = %s, workout_date = %s, sets = %s, repetitions = %s, weight= %s
                    WHERE id = %s
                    RETURNING id, username, category, muscle_group, workout_date, sets, repetitions, weight
                    """,
                    [category, muscle_group, workout_date, sets, repetitions, weight, id],
                )
                conn.commit()
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

