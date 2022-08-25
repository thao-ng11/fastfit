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
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

class JournalIn(BaseModel):
    uservo: int
    grateful: str
    daily_aff: str
    note: str
    feeling: int


class JournalOut(BaseModel):
    entry_date: datetime
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

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
def journal_post(
    journal: JournalIn,
    query=Depends(JournalQueries),
):
    row = query.insert_journal(
        journal.grateful, journal.daily_aff, journal.note, journal.feeling,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Could not create duplicate meal type post"}
    return row


@router.get(
    "/api/journals",
    response_model=JournalList,
    responses={
        404: {"model": ErrorMessage},
    }
)
def journal_list(
    query=Depends(JournalQueries),
):
    rows = query.get_journals_list()
    return rows