from datetime import datetime
from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
import os
from psycopg_pool import ConnectionPool
from journal_db import JournalQueries, pool

router= APIRouter()

class Journal(BaseModel):
    id: int
    uservo: int
    entry_date: datetime
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

class JournalIn(BaseModel):
    grateful: str
    daily_aff: str
    note: str
    feeling: int


class JournalOut(BaseModel):
    entry_date: date
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

class JournalList(BaseModel):
    __root__: List[JournalOut]


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
        return {"message": "Could not create duplicate journal post"}
    return row


@router.get(
    "/api/journal",
    response_model=JournalList,
    responses={
        404: {"model": ErrorMessage},
    }
)
def journal_list(
    query=Depends(JournalQueries),
):
    rows = query.get_all_journals()
    return rows


@router.get(
    "api/journal/{journal_id}",
    response_model = JournalOut | Message,
    response = {
        200: {"model": JournalOut},
        404: {"model": ErrorMessage},
    },
)
def get_journal(
    mentorship_id: int,
    response: Response,
    query=Depends(JournalQueries),
):
    row = query.get_one_journal(journal_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Mentorship not found"}
    return row