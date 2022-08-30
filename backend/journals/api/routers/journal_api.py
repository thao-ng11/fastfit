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
    username: str
    entry_date: datetime
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

class JournalIn(BaseModel):
    username: str
    entry_date: datetime
    grateful: str
    daily_aff: str
    note: str
    feeling: int


class JournalOut(BaseModel):
    id: int
    username: str
    entry_date: datetime
    grateful: str
    daily_aff: str
    note: str
    feeling: int
    

class JournalList(BaseModel):
    __root__: List[JournalOut]


class DeleteOperation(BaseModel):
    result: bool



class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str

@router.post(
    "/api/journals", 
    response_model=JournalOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def journal_post(
    journal: JournalIn,
    query=Depends(JournalQueries),
):
    row = query.insert_journal(journal.username, journal.entry_date,
        journal.grateful, journal.daily_aff, journal.note, journal.feeling,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Could not create duplicate journal post"}
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
    rows = query.get_all_journals()
    return rows


@router.get(
    "/api/journals/{journal_id}",
    response_model = JournalOut,
    responses = {
        200: {"model": JournalOut},
        404: {"model": ErrorMessage},
    },
)
def get_journal(
    journal_id: int,
    response: Response,
    query=Depends(JournalQueries),
):
    row = query.get_journal(journal_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Journal not found"}
    return row


@router.delete(
    "/api/journals/{journal_id}",
    response_model=DeleteOperation,
)
def delete_journal(
    journal_id: int,
    query=Depends(JournalQueries)
):
    try:
        query.delete_journal(journal_id)
        return {"result": True}
    except:
        return {"result": False}


# @router.get(
#     "/api/journals/user={username}",
#     response_model = JournalOut,
#     responses = {
#         200: {"model": JournalOut},
#         404: {"model": ErrorMessage},
#     },
# )
# def get_user_journals(
#     username: str,
#     query=Depends(JournalQueries)
# ):
#     row = query.get_user_journals(username)
#     if row is None:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"message": "Journal not found"}
#     return row
