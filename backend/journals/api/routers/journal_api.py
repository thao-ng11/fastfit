from datetime import datetime
from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
import os
from psycopg_pool import ConnectionPool
from journal_db import JournalQueries, pool

class Journal(BaseModel):
    id: int
    uservo: int
    entry_date: datetime
    feeling: int
    grateful: str
    daily_aff: str
    note: str
    

class JournalIn(BaseModel):
    uservo: int
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

@router.post(
    "/api/journal", 
    response_model=JournalOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def new_journal(
    journal: JournalIn,
    query=Depends(JournalQueries),
)