from pydantic import BaseModel
from typing import List

class UservoIn(BaseModel):
    usernamevo: str

class UservoOut(BaseModel):
    usernamevo: str

class UservoList(BaseModel):
    __root__ : List[UservoOut]

class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str
