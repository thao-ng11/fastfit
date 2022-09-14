import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)


class HealthDataQueries:
  def get_all_health_data(self):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          SELECT h.id
          , h.username
          , h.current_weight
          , h.current_bmi
          , h.entry_date
          FROM health_data h
          ORDER BY h.entry_date
          """
        )

        hlist = []
        for row in cur.fetchall():
          hdict = {
            "id": row[0],
            "username": row[1],
            "current_weight": row[2],
            "current_bmi": row[3],
            "entry_date": row[4],
          }
          hlist.append(hdict)
        return hlist

  def insert_health_data(self, username, current_weight, current_bmi):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        try:
          cur.execute(
            """
            INSERT INTO health_data (username, current_weight, current_bmi, entry_date)
            VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
            RETURNING id, username, current_weight, current_bmi, entry_date
            """,
            [username, current_weight, current_bmi],
          )
        except UniqueViolation:
          return None
        row = cur.fetchone()
        print(row)
        record = {}
        for i, column in enumerate(cur.description):
            print(column)
            record[column.name] = row[i]
        return record

  def get_user_weight(self, username):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          SELECT h.id
          , h.username
          , h.current_weight
          , h.current_bmi
          , h.entry_date
          FROM health_data h
          WHERE h.username = %s
          ORDER BY h.entry_date
          """,
          [username]
        )

        hlist = []
        for row in cur.fetchall():
          hdict = {
            "id": row[0],
            "username": row[1],
            "current_weight": row[2],
            "current_bmi": row[3],
            "entry_date": row[4],
          }
          hlist.append(hdict)
        return hlist

  def get_one_health_data(self, id):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          SELECT h.id
          , h.username
          , h.current_weight
          , g.height
          , h.current_bmi
          , h.entry_date
          FROM health_data h
          INNER JOIN goals g
            ON (h.username = g.username)
          WHERE h.id = %s
          """,
          [id]
        )
        row = cur.fetchone()
        if row is None:
          return
        record = {
            "id": row[0],
            "username": row[1],
            "current_weight": row[2],
            "height": row[3],
            "current_bmi": row[4],
            "entry_date": row[5],
        }
        return record

  def delete_health_data(self, id):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          DELETE FROM health_data
          WHERE id = %s
          """,
          [id]
        )


class GoalsQueries:
  def get_goals(self):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          SELECT g.id
          , g.username
          , g.goal_weight
          , g.goal_bmi
          , g.height
          FROM goals g
          """
        )
        glist=[]
        for row in cur.fetchall():
          gdict={
          "id": row[0],
          "username": row[1],
          "goal_weight": row[2],
          "goal_bmi": row[3],
          "height": row[4],
          }
          glist.append(gdict)
        return glist

  def insert_goal(self, username, goal_weight, goal_bmi, height):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        try:
          cur.execute(
            """
            INSERT INTO goals (username, goal_weight, goal_bmi, height)
            VALUES (%s, %s, %s, %s)
            RETURNING id, username, goal_weight, goal_bmi, height
            """,
            [username, goal_weight, goal_bmi, height]
          )
        except UniqueViolation:
          return None
        row=cur.fetchone()
        record={}
        for i, column in enumerate(cur.description):
            record[column.name]=row[i]
        return record

  def get_goal(self, username: str):
    with pool.connection() as conn:
      with conn.cursor() as cur:
        cur.execute(
          """
          SELECT *
          FROM goals
          WHERE username = %s
          """,
          [username],
        )
        row=cur.fetchone()
        if row is None:
          return {"message": "goal not found"}
        goal={
          "id": row[0],
          "username": row[1],
          "goal_weight": row[2],
          "goal_bmi": row[3],
          "height": row[4],
          }
        return goal

  def update_goal(self, goal_weight, goal_bmi, height, id):
      with pool.connection() as conn:
          with conn.cursor() as cur:
              cur.execute(
              """
              UPDATE goals
              SET goal_weight = %s, goal_bmi = %s, height = %s
              WHERE id = %s
              RETURNING id, username, goal_weight, goal_bmi, height
              """,
              [goal_weight, goal_bmi, height, id],
              )
              conn.commit()
              row=cur.fetchone()
              record={}
              print(row)
              for i, column in enumerate(cur.description):
                  record[column.name]=row[i]
              return record
