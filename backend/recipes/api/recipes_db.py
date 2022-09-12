import os
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation
import psycopg

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class DuplicateRecord(RuntimeError):
    pass


# class MealTypeQueries:
#     def get_meal_types(self):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     SELECT *
#                     FROM meal_type;
#                     """
#                 )

#                 ds = []
#                 for row in cur.fetchall():
#                     d = {
#                         "id": row[0],
#                         "name": row[1],
#                     }
#                     ds.append(d)
#                 return ds

#     def create_meal_type(self, name):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 try:
#                     cur.execute(
#                         """
#                         INSERT INTO meal_type (name)
#                         VALUES (%s)
#                         RETURNING id, name
#                         """,
#                         [name],
#                     )
#                 except psycopg.errors.UniqueViolation:
#                     return None
#                 row = cur.fetchone()
#                 record = {}
#                 for i, column in enumerate(cur.description):
#                     record[column.name] = row[i]
#                 return record

#     def delete_meal_type(self, id):
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 cur.execute(
#                     """
#                     DELETE FROM meal_type
#                     WHERE id = %s
#                     """,
#                     [id],
#                 )
                

class MealQueries:
    def get_meals(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM meal m
                    ORDER BY m.username, m.date;
                    """
                )

                ds = []
                for row in cur.fetchall():
                    # print(row)
                    d = {
                        "id": row[0],
                        "username": row[1],
                        "recipe_api_id": row[2],
                        "date": row[3],
                        "type": row[4]
                    }
                    ds.append(d)
                return ds
    
    def get_meal(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM meal m
                    WHERE m.id = %s
                    """,
                    [id],
                )
                row = cur.fetchone()
                if row is None:
                    return
                record = {
                    "id": row[0],
                    "username": row[1],
                    "recipe_api_id": row[2],
                    "date": row[3],
                    "type": row[4]
                }
                return record

    def create_meal(self, username, recipe_api_id, date, type):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO meal (username, recipe_api_id, date, type)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, username, recipe_api_id, date, type
                    """,
                    [username, recipe_api_id, date, type],
                )
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    def delete_meal(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM meal
                    WHERE id = %s
                    """,
                    [id],
                )
    
    def update_meal(self, date, type, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                """
                UPDATE meal
                SET date = %s, type = %s
                WHERE id = %s
                RETURNING id, username, recipe_api_id, date, type
                """,
                [date, type, id],
                )
                conn.commit()
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    def get_user_meals(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM meal m
                    WHERE username = %s
                    ORDER BY m.date
                    """,
                    [username]
                )
                ds = []
                for row in cur.fetchall():
                    # print(row)
                    # if row[1] == username:
                    d = {
                        "id": row[0],
                        "username": row[1],
                        "recipe_api_id": row[2],
                        "date": row[3],
                        "type": row[4]
                    }
                    ds.append(d)
                return ds