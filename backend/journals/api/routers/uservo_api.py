from pydantic import BaseModel
from typing import List

class UserVOIn(BaseModel):
    usernamevo: str

class UserVOOut(BaseModel):
    usernamevo: str

class UserVOList(BaseModel):
    __root__: List[UserVOOut]

class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str
