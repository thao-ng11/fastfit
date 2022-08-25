import os
from psycopg_pool import ConnectionPool

conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)

class UserVOQueries: 
    def get_uservo(self):
        pass
