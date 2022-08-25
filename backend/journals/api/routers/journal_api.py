from datetime import datetime
from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
import os
from psycopg_pool import ConnectionPool


conninfo = os.environ["DATABASE_URL"]
pool = ConnectionPool(conninfo=conninfo)

class Journal(BaseModel):
    id: int
    uservo: int
    entry_date: datetime
    feeling: int
    grateful: str
    daily_aff: str
    note: str
    

class JournalIn(BaseModel):
    feeling: int
    grateful: str
    daily_aff: str
    note: str


class JournalOut(BaseModel):
    entry_date: datetime
    feeling: int
    grateful: str
    daily_aff: str
    note: str
    

class JournalList(BaseModel):
    __root__: List[Journal]


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str
