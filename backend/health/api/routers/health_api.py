from datetime import datetime
from pydantic import BaseModel
from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
import os
from psycopg_pool import ConnectionPool
from health_db import HealthDataQueries, GoalsQueries, pool
from health_models import (
  HealthDataIn,
  HealthDataOut,
  HealthDataList,
  GoalsIn,
  GoalsOut,
  GoalsList,
  ErrorMessage,
  Message,
)

router= APIRouter()


@router.post(
    "/api/health_data",
    response_model=HealthDataOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def health_data_post(
  health_data: HealthDataIn,
  query=Depends(HealthDataQueries),
):
  row = query.insert_health_data(
    health_data.username,
    health_data.current_weight,
    health_data.current_bmi
  )
  return row


@router.get(
  "/api/health_data",
  response_model=HealthDataList,
  responses={
    404: {"model": ErrorMessage},
  }
)
def health_data_list(
  query=Depends(HealthDataQueries),
):
  rows = query.get_all_health_data()
  return rows


@router.post(
    "/api/goals",
    response_model=GoalsOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def goals_post(
  goal: GoalsIn,
  query=Depends(GoalsQueries),
):
  row = query.insert_goal(
    goal.username,
    goal.goal_weight,
    goal.goal_bmi,
    goal.height,
  )
  return row

@router.get(
  "/api/goals",
  response_model=GoalsList,
  responses={
    404: {"model": ErrorMessage},
  }
)
def goals_list(
  query=Depends(GoalsQueries),
):
  rows = query.get_goals()
  return rows


@router.get(
  "/api/goals/{username}",
  response_model=GoalsOut,
  responses={
    200: {"model": GoalsOut},
    404: {"model": ErrorMessage},
  }
)
def get_goal(
  username: str,
  response: Response,
  query=Depends(GoalsQueries)
):
  row = query.get_goal(username)
  if row is None:
      response.status_code = status.HTTP_404_NOT_FOUND
      return {"message": "Goal not found"}
  return row