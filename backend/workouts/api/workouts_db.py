import os
from psycopg_pool import ConnectionPool

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

# class WorkoutCategoryQueries:
#     def get_workout_category_query(self):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT *
#                     FROM workout_categories;
#                     """
#                 )

#                 new_dict = []
#                 for row in cur.fetchall():
#                     dictionary = {
#                         "id": row[0],
#                         "category": row[1]
#                     }
#                     new_dict.append(dictionary)
#                 return new_dict