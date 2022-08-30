import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class JournalQueries:
    def get_all_journals(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT j.id
                    , j.username
                    , j.entry_date
                    , j.grateful
                    , j.daily_aff
                    , j.note
                    , j.feeling
                    FROM journal j
                    GROUP BY j.id
                    ORDER BY j.entry_date
                    """
                )

                jlist = []
                for row in cur.fetchall():
                    jdict = {
                        "id": row[0],
                        "username": row[1],
                        "entry_date": row[2],
                        "grateful": row[3],
                        "daily_aff": row[4],
                        "note": row[5],
                        "feeling": row[6],
                    }
                    jlist.append(jdict)

                return jlist

    def insert_journal(self, username, entry_date, grateful, daily_aff, note, feeling):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO journal (username, entry_date, grateful, daily_aff, note, feeling)
                        VALUES (%s, CURRENT_TIMESTAMP, %s, %s, %s, %s)
                        RETURNING id, username, entry_date, grateful, daily_aff, note, feeling
                        """,
                        [username, grateful, daily_aff, note, feeling],
                    )
                except UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record


    def get_journal(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT j.id
                    , j.username
                    , j.entry_date
                    , j.grateful
                    , j.daily_aff
                    , j.note
                    , j.feeling
                    FROM journal j
                    WHERE id = %s
                    """,
                    [id],
                )

                row = cur.fetchone()
                if row is None:
                    return {"message": "Journal is not found"}
                record = {
                        "id": row[0],
                        "username": row[1],
                        "entry_date": row[2],
                        "grateful": row[3],
                        "daily_aff": row[4],
                        "note": row[5],
                        "feeling": row[6],
                    }
                return record


    def delete_journal(self, id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM journal
                    WHERE id = %s
                    """,
                    [id],
                )