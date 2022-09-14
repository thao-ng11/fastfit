from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional
from fastapi import APIRouter, Response, status, Depends, HTTPException
import os
from psycopg_pool import ConnectionPool
from journal_db import JournalQueries, pool
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError



SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)

async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except (JWTError, AttributeError):
        raise credentials_exception


router = APIRouter()

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
    "/api/journals/", 
    response_model=JournalOut,
    responses={
        500: {"model": ErrorMessage},
    },
)

def journal_post(
    journal: JournalIn,
    user_info=Depends(get_current_user),
    query=Depends(JournalQueries),
):
    username = user_info['username']
    row = query.insert_journal(username, journal.entry_date,
        journal.grateful, journal.daily_aff, journal.note, journal.feeling,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Could not create duplicate journal post"}
    return row


@router.get(
    "/api/journals/",
    response_model=JournalList | Message,
    responses={
        404: {"model": ErrorMessage},
        200: {"model": JournalList}
    }
)
def journal_list(
    response: Response,
    query=Depends(JournalQueries)
):
    rows = query.get_all_journals()
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    else:
        return rows
    
@router.get(
    "/api/journals/user/",
    response_model = JournalList,
    responses = {
        200: {"model": JournalOut},
        404: {"model": ErrorMessage},
    },
)
def get_user_journals(
    # username: str,
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(JournalQueries)
):
    username=user_info["username"]
    print("username", username)
    row = query.get_user_journals(username)
    return row

@router.get(
    "/api/journals/{journal_id}/",
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
    "/api/journals/{journal_id}/",
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



