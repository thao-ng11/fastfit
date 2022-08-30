import os
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation
import psycopg

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class DuplicateRecord(RuntimeError):
    pass


class MealTypeQueries:
    def get_meal_types(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM meal_type;
                    """
                )

                ds = []
                for row in cur.fetchall():
                    d = {
                        "id": row[0],
                        "name": row[1],
                    }
                    ds.append(d)
                return ds

    def create_meal_type(self, name):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO meal_type (name)
                        VALUES (%s)
                        RETURNING id, name
                        """,
                        [name],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record

    # def update_meal_type(self, name, id):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             try:
    #                 cur.execute(
    #                     """
    #                     UPDATE meal_type
    #                     SET name = %s
    #                     WHERE id = %s
    #                     RETURNING id, name
    #                     """,
    #                     [name, id],
    #                 )
    #                 return cur.fetchone()
    #             except UniqueViolation:
    #                 raise DuplicateRecord()

    def delete_meal_type(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM meal_type
                    WHERE id = %s
                    """,
                    [id],
                )
                


class MealQueries:
    def get_meals(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT *
                    FROM meal;
                    """
                )

                ds = []
                for row in cur.fetchall():
                    d = {
                        "id": row[0],
                        "uservo": row[1],
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
                    FROM meal
                    WHERE id = %s
                    """,
                    [id],
                )
                row = cur.fetchone()
                if row is None:
                    return {"message": "Meal not found"}
                record = {
                    "id": row[0],
                    "uservo": row[1],
                    "recipe_api_id": row[2],
                    "date": row[3],
                    "type": row[4]
                }
                return record

    def create_meal(self, uservo, recipe_api_id, date, type):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO meal (uservo, recipe_api_id, date, type)
                    VALUES (%s, %s, %s, %s)
                    RETURNING id, uservo, recipe_api_id, date, type
                    """,
                    [uservo, recipe_api_id, date, type],
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
                RETURNING id, uservo, recipe_api_id, date, type
                """,
                [date, type, id],
                )
            conn.commit()
            row = cur.fetchone()
            record = {}
            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record