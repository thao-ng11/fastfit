from pydantic import BaseModel
from typing import List
from datetime import datetime

class HealthDataIn(BaseModel):
  username: str
  current_weight: int
  current_bmi: float
  entry_date: datetime


class HealthDataPostOut(BaseModel):
  id: int
  username: str
  current_weight: int
  current_bmi: float
  entry_date: datetime

class HealthDataGetOut(BaseModel):
  id: int
  username: str
  current_weight: int
  height: int
  current_bmi: float
  entry_date: datetime

class HealthDataList(BaseModel):
  __root__: List[HealthDataGetOut]

class GoalsIn(BaseModel):
  username: str
  goal_weight: int
  goal_bmi: float
  height: int

class GoalsOut(BaseModel):
  id: int
  username: str
  goal_weight: int
  goal_bmi: float
  height: int

class GoalsPut(BaseModel):
  goal_weight: int
  goal_bmi: float
  height: int

class GoalsList(BaseModel):
  __root__: List[GoalsOut]

class DeleteOperation(BaseModel):
  result: bool

class ErrorMessage(BaseModel):
  message: str

class Message(BaseModel):
  message: str
