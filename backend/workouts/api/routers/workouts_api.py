from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from psycopg.errors import ForeignKeyViolation
import os
# from jose import jwt

from workout_models import (
    MuscleGroupOut,
    MuscleGroupIn,
    MuscleGroupList,
    WorkoutCategoryIn,
    WorkoutCategoryOut,
    WorkoutCategoryList,
    CardioWorkoutsIn,
    CardioWorkoutsOut,
    CardioWrokoutList,
    StrengthWorkoutList,
    StrengthWorkoutsIn,
    StrengthWorkoutsOut,
    ErrorMessage,
    Message,
)
from workouts_db import (
    MuscleGroupQueries,
    # WorkoutCategoryQueries,
    pool,
)

router = APIRouter()

@router.post(
    "/api/muscle_group",
    response_model=MuscleGroupOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def muscle_group_post(
    muscle_group: MuscleGroupIn,
    query=Depends(MuscleGroupQueries),
):
    row = query.insert_muscle_group(
        muscle_group.muscle,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message":"Could not create duplicate muscle group post"}
    return row

@router.get(
    "/api/muscle_group",
    response_model= MuscleGroupList,
    responses={
        404:{"model":ErrorMessage},
    }
)
def muscle_group_list(
    query=Depends(MuscleGroupQueries)
):
    rows = query.get_muscle_group_query()
    return  rows
