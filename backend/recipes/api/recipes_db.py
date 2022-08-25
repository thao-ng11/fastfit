import os
from psycopg_pool import ConnectionPool

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


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

    def insert_meal_type(self, name):
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