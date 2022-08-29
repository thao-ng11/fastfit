from http.client import responses
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
    CardioWorkoutList,
    StrengthWorkoutList,
    StrengthWorkoutsIn,
    StrengthWorkoutsOut,
    ErrorMessage,
    Message,
)
from workouts_db import (
    MuscleGroupQueries,
    WorkoutCategoryQueries,
    CardioWorkoutQueries,
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

@router.post(
    "/api/workout_category",
    response_model=WorkoutCategoryOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def workout_category_post(
    workout_category: WorkoutCategoryIn,
    query=Depends(WorkoutCategoryQueries),
):
    row = query.insert_workout_category(
        workout_category.category,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message":"Could not create duplicate workout category post"}
    return row

@router.get(
    "/api/workout_category",
    response_model=WorkoutCategoryList,
    responses={
        404:{"model": ErrorMessage},
    }
)
def workout_category_list(
    query=Depends(WorkoutCategoryQueries)
):
    rows = query.get_workout_category_query()
    return rows

@router.post(
    "/api/cardio_workout",
    response_model=CardioWorkoutsOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def cardio_workout_post(
    cardio_workout: CardioWorkoutsIn,
    query=Depends(CardioWorkoutQueries,)
):
    row = query.insert_cardio_workout(
        cardio_workout.uservo, 
        cardio_workout.category, 
        cardio_workout.muscle_group, 
        cardio_workout.workout_date,
        cardio_workout.duration, 
        cardio_workout.distance,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message":"Could not create duplicate workout category post"}
    return row

@router.get(
    "/api/cardio_workout",
    response_model=CardioWorkoutList,
    responses={
        404:{"model": ErrorMessage},
    }
)
def cardio_workout_list(
    query=Depends(CardioWorkoutQueries)
):
    rows = query.get_cardio_workout_query()
    return rows