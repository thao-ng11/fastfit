from pydantic import BaseModel
from typing import List
from datetime import date


class MealTypeIn(BaseModel): 
    name: str


class MealTypeOut(BaseModel): 
    id: int
    name: str


class MealIn(BaseModel):
    username: str
    recipe_api_id: str
    date: date
    type: int


class MealOut(BaseModel):
    id: int
    username: str
    recipe_api_id: str
    date: date
    type: int


class MealPut(BaseModel):
    date: date
    type: int


class MealTypeList(BaseModel):
    __root__: List[MealTypeOut]


class MealList(BaseModel):
    __root__: List[MealOut]


class DeleteOperation(BaseModel):
    result: bool


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str
