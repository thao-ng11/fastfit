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
                        "entry_date": row[1],
                        "grateful": row[2],
                        "daily_aff": row[3],
                        "note": row[4],
                        "feeling": row[5],
                    }
                    jlist.append(jdict)

                return jlist

    def insert_journal(self, entry_date, grateful, daily_aff, note, feeling):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO journal (entry_date, grateful, daily_aff, note, feeling)
                        VALUES (CURRENT_TIMESTAMP, %s, %s, %s, %s)
                        RETURNING id, entry_date, grateful, daily_aff, note, feeling
                        """,
                        [grateful, daily_aff, note, feeling],
                    )
                except UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record


    # def get_one_journal(self, journal_id):
    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 """
    #                 SELECT j.id, j.entry_date, j.grateful, j.daily_aff,
    #                     j.note,j.feeling
    #                 FROM journal j
    #                 GROUP BY j.entry_date
    #             """,
    #                 [journal_id],
    #             )

    #             row = cur.fetchone()
    #             if row is None:
    #                 return {"message": "Mentorship not found"}
    #             record = {
    #                     "id": row[0],
    #                     "entry_date": row[1],
    #                     "grateful": row[2],
    #                     "daily_aff": row[3],
    #                     "note": row[4],
    #                     "feeling": row[5],
    #                 }
    #             return record