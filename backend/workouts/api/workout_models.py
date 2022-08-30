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
    username : str
    category : int
    workout_date : date
    duration : int
    distance : float

class CardioWorkoutsIn(BaseModel):
    username : str
    category : int
    workout_date : date
    duration : int
    distance : float 

class StrengthWorkoutsOut(BaseModel):
    id : int
    username : str
    category : int
    muscle_group : int
    workout_date : date 
    sets : int
    repetitions : int
    weight : int

class StrengthWorkoutsIn(BaseModel):
    username : str
    category : int
    muscle_group : int
    workout_date : date
    sets : int
    repetitions : int
    weight : int

class CardioWorkoutDeleteOperation(BaseModel):
    result: bool

class StrengthWorkoutDeleteOperation(BaseModel):
    result: bool

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

class StrengthWorkoutPut(BaseModel):
    category : int
    muscle_group : int
    workout_date : date
    sets : int
    repetitions : int
    weight : int

class CardioWorkoutPut(BaseModel):
    category : int
    workout_date : date
    duration: int
    distance: int
