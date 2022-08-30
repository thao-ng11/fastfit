from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from psycopg.errors import ForeignKeyViolation
from typing import Union
import os
# from jose import jwt

from recipes_models import (
    MealTypeIn,
    MealTypeOut,
    MealTypeList,
    MealIn,
    MealOut,
    MealPut,
    MealList,
    DeleteOperation,
    ErrorMessage,
    Message,
)
from recipes_db import (
    MealTypeQueries,
    MealQueries,
    DuplicateRecord,
)

router = APIRouter()

@router.post(
    "/api/meal_types",
    response_model=MealTypeOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def meal_type_post(
    meal_type: MealTypeIn,
    query=Depends(MealTypeQueries),
):
    row = query.create_meal_type(
        meal_type.name,
    )
    if row is None:
        Response.status_code = status.HTTP_409_CONFLICT
        return {"message": "Could not create duplicate meal type post"}
    return row

@router.get(
    "/api/meal_types",
    response_model=MealTypeList,
    responses={
        404: {"model": ErrorMessage},
    }
)
def meal_type_list(
    query=Depends(MealTypeQueries),
):
    rows = query.get_meal_types()
    return rows

# @router.put(
#     "/api/meal_type/{id}",
#     response_model=Union[MealTypeOut, ErrorMessage],
#     responses={
#         200: {"model": MealTypeOut},
#         404: {"model": ErrorMessage},
#         409: {"model": ErrorMessage},
#     },
# )
# def update_meal_type(
#     id: int,
#     meal_type: MealTypeIn,
#     response: Response,
#     query=Depends(MealTypeQueries),
# ):
#     try:
#         row = query.update_meal_type(meal_type.name, meal_type.id)
#         if row is None:
#             response.status_code = status.HTTP_404_NOT_FOUND
#             return {"message": "Meal type not found"}
#         return row
#     except DuplicateRecord:
#         response.status_code = status.HTTP_409_CONFLICT
#         return {"message": f"Duplicate meal type: {meal_type.name}"}

@router.delete(
    "/api/meal_types/{meal_type_id}",
    response_model=DeleteOperation,
)
def delete_meal_type(
    meal_type_id: int,
    query=Depends(MealTypeQueries)
):
    try:
        query.delete_meal_type(meal_type_id)
        return {"result": True}
    except:
        return {"result": False}

@router.get(
    "/api/meals",
    response_model=MealList,
    responses={
        404: {"model": ErrorMessage},
    }
)
def meal_list(
    query=Depends(MealQueries),
):
    rows = query.get_meals()
    return rows


@router.get(
    "/api/meals/{meal_id}",
    response_model=MealOut,
    responses={
        200: {"model": MealOut},
        404: {"model": ErrorMessage},
    }
)
def get_meal(
    meal_id: int,
    response: Response,
    query=Depends(MealQueries)
):
    row = query.get_meal(meal_id)
    if row is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        return {"message": "Meal not found"}
    return row

@router.post(
    "/api/meals",
    response_model=MealOut,
    responses={
        500: {"model": ErrorMessage},
    },
)
def meal_post(
    meal: MealIn,
    query=Depends(MealQueries),
):
    row = query.create_meal(
        meal.uservo,
        meal.recipe_api_id,
        meal.date,
        meal.type
    )
    return row

@router.delete(
    "/api/meals/{meal_id}",
    response_model=DeleteOperation,
)
def delete_meal(
    meal_id: int,
    query=Depends(MealQueries)
):
    try:
        query.delete_meal(meal_id)
        return {"result": True}
    except:
        return {"result": False}


@router.put(
    "/api/meals/{meal_id}",
    response_model=MealOut,
    responses={
        404: {"model": ErrorMessage},
    }
)
def update_meal(
    meal_id: int,
    meal: MealPut,
    query=Depends(MealQueries),
):
    row = query.update_meal(
        meal.date,
        meal.type,
        meal_id
    )
    return row