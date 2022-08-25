import os
from psycopg_pool import ConnectionPool, UniqueViolation


conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class JournalQueries:
    def get_journals_list(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT j.id, j.entry_date, j.grateful, j.daily_aff,
                        j.note,j.feeling
                    FROM journal j
                    GROUP BY j.entry_date
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

                return jdict

    def insert_journal(self, grateful, daily_aff, note, feeling):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO journal (grateful, daily_aff, note, feeling)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id, grateful, daily_aff, note, feeling
                        """,
                        [grateful, daily_aff, note, feeling],
                    )
                except psycopg.errors.UniqueViolation:
                    return None
                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record


    # def get_journal(self, journal_id):
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