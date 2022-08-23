# use user model inheritance to build the user profile including api calls to other microservices for data. 
from fastapi import APIRouter, Response, status, Depends, HTTPException
from psycopg.errors import UniqueViolation
from datetime import datetime
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer
import os
from jose import jwt
from user_db import pool
from .users import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)
router = APIRouter()
SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"

credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


class ProfileIn(BaseModel):
    height: int
    zip : int 

class ProfileOut(BaseModel):
    id: int
    height: int
    zip: int
    userid: int
    firstname: str
    lastname: str
    username: str

class ErrorMessage(BaseModel):
    message: str

from profile_db import ProfileQueries

@router.post("api/profile/new", response_model = ProfileOut, responses={500: {"model": ErrorMessage},},)

def profile_post(
    profile: ProfileIn, 
    response: Response, 
    bearer_token: str = Depends(oauth2_scheme),
):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    username = payload.get("sub"),
    user = payload.get("user")
    with pool.connection() as conn:
        with conn.cursor() as cur:
            try:
                cur.execute(
                    """
                    INSERT INTO profile (height, zip, userid)
                    VALUES (%s, %s, %s)
                    RETURNING id, height, zip, userid
                    """,
                    [profile.height, profile.zip, user["id"]],
                )
            except UniqueViolation:
                response.status_code = status.HTTP_409_CONFLICT
                return {
                    "message": "duplicate profile",
                }
            row = cur.fetchone()
            record = {
                "firstname": user["firstname"],
                "lastname": user["lastname"],
                "username": username,
            }

            for i, column in enumerate(cur.description):
                record[column.name] = row[i]
            return record

@router.get(
    "api/profile/",
    response_model = ProfileOut,
    responses = {
        200: {"model": ProfileOut},
        400: {"model": ErrorMessage},
    },
)
def profile_list(
    response: Response,
    query=Depends(ProfileQueries),
    bearer_token: str = Depends(oauth2_scheme),
):
    if bearer_token is None:
        raise credentials_exception
    payload = jwt.decode(bearer_token, SECRET_KEY, algorithms=[ALGORITHM])
    user = payload.get("user")
    id = user["id"]
    row = query.get_profile(id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "profile not found"}
    return row
    

