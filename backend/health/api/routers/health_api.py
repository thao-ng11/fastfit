from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os
from jose import jwt, JWTError
from psycopg_pool import ConnectionPool
from health_db import HealthDataQueries, GoalsQueries, pool
from health_models import (
    HealthDataIn,
    HealthDataPostOut,
    HealthDataGetOut,
    HealthDataList,
    GoalsIn,
    GoalsOut,
    GoalsList,
    ErrorMessage,
    Message,
    GoalsPut,
    DeleteOperation,
)

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)


async def get_current_user(
    token: Optional[str] = Depends(oauth2_scheme),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except (JWTError, AttributeError):
        raise credentials_exception

router = APIRouter()


@router.post(
    "/api/health_data",
    response_model=HealthDataPostOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def health_data_post(
    health_data: HealthDataIn,
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(HealthDataQueries),
):
    username = user_info['username']
    row = query.insert_health_data(
        username,
        health_data.current_weight,
        health_data.current_bmi
    )
    print(row)
    return row


@router.get(
    "/api/health_data",
    response_model=HealthDataList | ErrorMessage,
    responses={
        404: {"model": ErrorMessage},
    }
)
def health_data_list(
    response: Response,
    query=Depends(HealthDataQueries),
):
    rows = query.get_all_health_data()
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    else:
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


@router.put(
    "/api/goals/{id}",
    response_model=GoalsOut | Message,
    responses={
        500: {"model": ErrorMessage},
    },
)
def goals_put(
    id: int,
    goal: GoalsPut,
    query=Depends(GoalsQueries),
):
    row = query.update_goal(
        goal.goal_weight,
        goal.goal_bmi,
        goal.height,
        id
    )
    return row


@router.get(
    "/api/health_data/user",
    response_model=HealthDataList | ErrorMessage,
    responses={
        200: {"model": GoalsOut},
        404: {"model": ErrorMessage},
    },
)
def get_user_weight(
    response: Response,
    user_info=Depends(get_current_user),    
    query=Depends(HealthDataQueries),
):
    username = user_info['username']
    rows = query.get_user_weight(username)
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    else:
        return rows


@router.get(
    "/api/health_data/{id}",
    response_model=HealthDataGetOut | ErrorMessage,
    responses={
        200: {"model": HealthDataGetOut},
        404: {"model": ErrorMessage},
    }
)
def get_one_health_data(
    id: int,
    response: Response,
    query=Depends(HealthDataQueries)
):
    row = query.get_one_health_data(id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    else:
        return row


@router.delete(
    "/api/health_data/{id}",
    response_model=DeleteOperation | ErrorMessage,
    responses={
        200: {"model": DeleteOperation},
        404: {"model": ErrorMessage},
    },
)
def delete_health_data(
    id: int,
    response: Response,
    query=Depends(HealthDataQueries),
):
    row = query.get_one_health_data(id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "not found"}
    query.delete_health_data(id)
    return {"result": True}
