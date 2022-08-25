from pydantic import BaseModel
from typing import List
from datetime import date


class MealTypeIn(BaseModel): 
    name: str


class MealTypeOut(BaseModel): 
    id: int
    name: str


class MealIn(BaseModel):
    uservo: int
    recipe_api_id: str
    date: date
    type: str


class MealOut(BaseModel):
    id: int
    uservo: int
    recipe_api_id: str
    date: date
    type: str


class MealTypeList(BaseModel):
    __root__: List[MealTypeOut]


class MealList(BaseModel):
    __root__: List[MealOut]


class ErrorMessage(BaseModel):
    message: str


class Message(BaseModel):
    message: str
