from user_db import pool


class ProfileQueries:
    def get_profile(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    select p.username
                    , p.height
                    , p.zip
                    , users.id
                    , users.firstname
                    , users.lastname
                    , users.username
                    from user_profile p
                    INNER JOIN users ON (users.id = p.username)
                    WHERE users.id = %s;
                    """,
                    [id],
                )
                row = cur.fetchone()
                table = {
                    "id": row[0],
                    "height": row[1],
                    "zip": row[2],
                    "userid": row[3],
                    "firstname": row[4],
                    "lastname": row[5],
                    "username": row[6],
                }
                return table
