# todo: get and post to postgres db functions
# file to create queries to db for users and profiles
import os
from psycopg_pool import ConnectionPool
from psycopg.errors import UniqueViolation

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)

class DuplicateAccount(RuntimeError):
    pass

class AccountsQueries:
    def get_user(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id
                    , u.username
                    , u.email
                    , u.firstname
                    , u.lastname
                    , password
                    FROM users u
                    """
                )
                for user in cur.fetchall():
                    if user[1] == username:
                        user_dict = {
                            "id": user[0],
                            "username": user[1],
                            "email": user[2],
                            "firstname": user[3],
                            "lastname": user[4],
                            "password": user[5]
                        }
                        return user_dict
    
    def create_user(
        self,
        username: str,
        firstname: str,
        lastname: str,
        hashed_password: str,
        email: str = None,
    ):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    cur.execute(
                        """
                        INSERT INTO users (username, password, email, firstname, lastname)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING username, password, email, firstname, lastname
                        """,
                        [
                            username,
                            firstname,
                            lastname,
                            hashed_password,
                            email,
                        ],
                    )
                except UniqueViolation:
                    raise DuplicateAccount()

                row = cur.fetchone()
                record = {}
                for i, column in enumerate(cur.description):
                    record[column.name] = row[i]
                return record
    
    def get_all_usernames(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id
                    , u.username
                    , u.email
                    , u.firstname
                    , u.lastname
                    , password
                    FROM users u
                    """
                )
                usernames_list = []
                for user in cur.fetchall():
                    if user is None:
                        return {"mesage": "there are no users"}                  
                    usernames_list.append(user[1])
                    return usernames_list
