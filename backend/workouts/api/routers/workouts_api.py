from http.client import FOUND, responses
from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
import os
from jose import  jwt, JWTError
from typing import Optional
# from jose import jwt

from workout_models import (
    # MuscleGroupOut,
    # MuscleGroupIn,
    # MuscleGroupList,
    # WorkoutCategoryIn,
    # WorkoutCategoryOut,
    # WorkoutCategoryList,
    CardioWorkoutsIn,
    CardioWorkoutsOut,
    CardioWorkoutList,
    StrengthWorkoutList,
    StrengthWorkoutsIn,
    StrengthWorkoutsOut,
    CardioWorkoutDeleteOperation,
    StrengthWorkoutDeleteOperation,
    ErrorMessage,
    Message,
    StrengthWorkoutPut,
    CardioWorkoutPut,
)
from workouts_db import (
    # MuscleGroupQueries,
    # WorkoutCategoryQueries,
    CardioWorkoutQueries,
    StrengthWorkoutQueries,
    pool,
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

# @router.post(
#     "/api/muscle_group",
#     response_model=MuscleGroupOut,
#     responses={
#         500: {"model": ErrorMessage},
#     },
# )
# def muscle_group_post(
#     muscle_group: MuscleGroupIn,
#     query=Depends(MuscleGroupQueries),
# ):
#     row = query.insert_muscle_group(
#         muscle_group.muscle,
#     )
#     if row is None:
#         Response.status_code = status.HTTP_409_CONFLICT
#         return {"message":"Could not create duplicate muscle group post"}
#     return row

# @router.get(
#     "/api/muscle_group",
#     response_model= MuscleGroupList,
#     responses={
#         404:{"model":ErrorMessage},
#     }
# )
# def muscle_group_list(
#     query=Depends(MuscleGroupQueries)
# ):
#     rows = query.get_muscle_group_query()
#     return  rows

# @router.post(
#     "/api/workout_category",
#     response_model=WorkoutCategoryOut,
#     responses={
#         500: {"model": ErrorMessage},
#     },
# )
# def workout_category_post(
#     workout_category: WorkoutCategoryIn,
#     query=Depends(WorkoutCategoryQueries),
# ):
#     row = query.insert_workout_category(
#         workout_category.category,
#     )
#     if row is None:
#         Response.status_code = status.HTTP_409_CONFLICT
#         return {"message":"Could not create duplicate workout category post"}
#     return row

# @router.get(
#     "/api/workout_category",
#     response_model=WorkoutCategoryList,
#     responses={
#         404:{"model": ErrorMessage},
#     }
# )
# def workout_category_list(
#     query=Depends(WorkoutCategoryQueries)
# ):
#     rows = query.get_workout_category_query()
#     return rows

@router.post(
    "/api/cardio_workout",
    response_model=CardioWorkoutsOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def cardio_workout_post(
    cardio_workout: CardioWorkoutsIn,
    user_info = Depends(get_current_user),
    query=Depends(CardioWorkoutQueries,)
):
    username = user_info['username']
    row = query.insert_cardio_workout(
        username, 
        cardio_workout.category, 
        cardio_workout.workout_date,
        cardio_workout.duration, 
        cardio_workout.distance,
        cardio_workout.workout,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message":"Could not create duplicate workout category post"}
    return row

@router.get(
    "/api/cardio_workout",
    response_model=CardioWorkoutList | ErrorMessage,
    responses={
        404:{"model": ErrorMessage},
        200:{"model": CardioWorkoutList}
    }
)
def cardio_workout_list(
    response: Response,
    query=Depends(CardioWorkoutQueries)
):
    rows = query.get_cardio_workout_query()
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {'Message':'Not Found'}
    else:
        return rows

@router.delete(
    "/api/cardio_workout/{cardio_workout_id}",
    response_model=CardioWorkoutDeleteOperation,
)
def delete_cardio_workout(
    cardio_workout_id: int,
    query=Depends(CardioWorkoutQueries)
):
    try:
        query.delete_cardio_workout(cardio_workout_id)
        return {"result": True}
    except:
        return {"result": False}

@router.put(
    "/api/cardio_workout/{cardio_workout_id}",
    response_model=CardioWorkoutsOut,
    responses={
        404: {"model": ErrorMessage},
    }
)
def update_cardio_workout(
    cardio_workout_id: int,
    cardio_workout: CardioWorkoutPut,
    query=Depends(CardioWorkoutQueries),
):
    row = query.update_cardio_workout(
        cardio_workout.category,
        cardio_workout.workout_date,
        cardio_workout.duration,
        cardio_workout.distance,
        cardio_workout_id,
        cardio_workout.workout,
    )
    return row

@router.post(
    "/api/strength_workout",
    response_model=StrengthWorkoutsOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def strength_workout_post(
    strength_workout: StrengthWorkoutsIn,
    user_info = Depends(get_current_user),
    query=Depends(StrengthWorkoutQueries,)
):
    username= user_info['username']
    row = query.insert_strength_workout(
        username, 
        strength_workout.category, 
        strength_workout.muscle_group,
        strength_workout.workout_date,
        strength_workout.sets,
        strength_workout.repetitions,
        strength_workout.weight,
        strength_workout.workout,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message":"Could not create duplicate strength workout post"}
    return row

@router.get(
    "/api/strength_workout",
    response_model=StrengthWorkoutList | ErrorMessage,
    responses={
        405:{"model": ErrorMessage},
        200:{"model": StrengthWorkoutList}
    }
)
def strength_workout_list(
    response: Response,
    query=Depends(StrengthWorkoutQueries)
):
    rows = query.get_strength_workout_query()
    print(rows)
    if rows is None:
        response.status_code = status.HTTP_405_NOT_FOUND
        print(response.status_code)
        return {'Message':'Not Found'}
    else:
        return rows

@router.delete(
    "/api/strength_workout/{strength_workout_id}",
    response_model=StrengthWorkoutDeleteOperation,
)
def delete_strength_workout(
    strength_workout_id: int,
    query=Depends(StrengthWorkoutQueries)
):
    try:
        query.delete_strength_workout(strength_workout_id)
        return {"result": True}
    except:
        return {"result": False}

@router.put(
    "/api/strength_workout/{strength_workout_id}",
    response_model=StrengthWorkoutsOut,
    responses={
        404: {"model": ErrorMessage},
    }
)
def update_strength_workout(
    strength_workout_id: int,
    strength_workout: StrengthWorkoutPut,
    query=Depends(StrengthWorkoutQueries),
):
    row = query.update_strength_workout(
        strength_workout.category,
        strength_workout.muscle_group,
        strength_workout.workout_date,
        strength_workout.sets,
        strength_workout.repetitions,
        strength_workout.weight,
        strength_workout_id,
        strength_workout.workout,
    )
    return row

@router.get(
    "/api/strength_workout/user",
    response_model=StrengthWorkoutList | Message,
    responses={
        200: {"model":StrengthWorkoutsOut},
        404: {"model": ErrorMessage},
    }
)
def get_strength_workout_users(
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(StrengthWorkoutQueries)
):
    username= user_info['username']
    rows = query.get_strength_workout_user(username)
    return rows

@router.get(
    "/api/cardio_workout/user",
    response_model=CardioWorkoutList | Message,
    responses={
        200: {"model":CardioWorkoutsOut},
        404: {"model": ErrorMessage},
    }
)
def get_cardio_workout_users(
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(CardioWorkoutQueries)
):
    username= user_info['username']
    rows = query.get_cardio_workout_user(username)
    return rows
# @router.get(
#     "/api/workouts",
#     response_model=CardioWorkoutList|StrengthWorkoutList,
#     responses={
#         404:{"model": ErrorMessage},
#     }
# )
# def workout_list(
#     query=Depends(CardioWorkoutQueries),
#     query2=Depends(StrengthWorkoutQueries)
# ):
#     row = query.get_cardio_workout_query()
#     row2 = query2.get_strength_workout_query()
#     row.append(row2)
#     return row