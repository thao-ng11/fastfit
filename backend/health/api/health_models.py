from pydantic import BaseModel
from typing import List
from datetime import datetime

class HealthDataIn(BaseModel):
  username: str
  current_weight: int
  current_bmi: float
  entry_date: datetime


class HealthDataOut(BaseModel):
  id: int
  username: str
  current_weight: int
  current_bmi: float
  entry_date: datetime

class HealthDataList(BaseModel):
  __root__: List[HealthDataOut]

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

class GoalsList(BaseModel):
  __root__: List[GoalsOut]

class ErrorMessage(BaseModel):
  message: str

class Message(BaseModel):
  message: str
