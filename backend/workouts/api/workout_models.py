from pydantic import BaseModel
from typing import List, Union
from datetime import date

# class MuscleGroupOut(BaseModel):
#     id : int
#     muscle : str

# class WorkoutCategoryOut(BaseModel):
#     id : int
#     category : str

# class MuscleGroupIn(BaseModel):
#     muscle : str

# class WorkoutCategoryIn(BaseModel):
#     category : str

class CardioWorkoutsOut(BaseModel):
    id : int
    username : str
    category : str
    workout_date : date
    workout : str
    duration : int
    distance : float

class CardioWorkoutsIn(BaseModel):
    username : str
    category : str
    workout_date : date
    workout : str
    duration : int
    distance : float 

class StrengthWorkoutsOut(BaseModel):
    id : int
    username : str
    category : str
    muscle_group : str
    workout : str
    workout_date : date 
    sets : int
    repetitions : int
    weight : int

class StrengthWorkoutsIn(BaseModel):
    username : str
    category :str
    muscle_group :str
    workout : str
    workout_date : date
    sets : int
    repetitions : int
    weight : int

class CardioWorkoutDeleteOperation(BaseModel):
    result: bool

class StrengthWorkoutDeleteOperation(BaseModel):
    result: bool

# class MuscleGroupList(BaseModel):
#     __root__ : List[MuscleGroupOut]

# class WorkoutCategoryList(BaseModel):
#     __root__ : List[WorkoutCategoryOut]

class CardioWorkoutList(BaseModel):
    __root__ : List[CardioWorkoutsOut]

class StrengthWorkoutList(BaseModel):
    __root__ : List[StrengthWorkoutsOut]

class ErrorMessage(BaseModel):
    message: str

class Message(BaseModel):
    message: str

class StrengthWorkoutPut(BaseModel):
    category : str
    muscle_group : str
    workout_date : date
    workout : str
    sets : int
    repetitions : int
    weight : int

class CardioWorkoutPut(BaseModel):
    category : str
    workout_date : date
    workout : str
    duration: int
    distance: int
