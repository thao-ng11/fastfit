from pydantic import BaseModel
from typing import List, Union
from datetime import date

class MuscleGroupOut(BaseModel):
    id : int
    muscle : str

class WorkoutCategoryOut(BaseModel):
    id : int
    category : str

class MuscleGroupIn(BaseModel):
    muscle : str

class WorkoutCategoryIn(BaseModel):
    category : str


class CardioWorkoutsOut(BaseModel):
    id : int
    uservo : int
    category : int
    workout_date : date
    duration : int
    distance : float

class CardioWorkoutsIn(BaseModel):
    uservo : int
    category : int
    workout_date : date
    duration : int
    distance : float 

class StrengthWorkoutsOut(BaseModel):
    id : int
    uservo : int
    category : int
    muscle_group : int
    workout_date : date 
    sets : int
    repitions : int
    weight : int

class StrengthWorkoutsIn(BaseModel):
    uservo : int
    category : int
    muscle_group : int
    workout_date : date
    sets : int
    repitions : int
    weight : int

class MuscleGroupList(BaseModel):
    __root__ : List[MuscleGroupOut]

class WorkoutCategoryList(BaseModel):
    __root__ : List[WorkoutCategoryOut]

class CardioWorkoutList(BaseModel):
    __root__ : List[CardioWorkoutsOut]

class StrengthWorkoutList(BaseModel):
    __root__ : List[StrengthWorkoutsOut]

class ErrorMessage(BaseModel):
    message: str

class Message(BaseModel):
    message: str
