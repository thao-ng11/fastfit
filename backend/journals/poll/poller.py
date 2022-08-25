import time
import json
import requests
import sys
import os
from psycopg_pool import ConnectionPool

ACCOUNTS_API = os.environ["ACCOUNTS_API"]
conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)

def poll():
    while True:
        print("Journals poller polling for user data")
        try:
            # Write your polling logic, here
            pass
        except Exception as e:
            import traceback

            print(e, file=sys.stderr)
            traceback.print_exc()
        time.sleep(30)


if __name__ == "__main__":
    poll()