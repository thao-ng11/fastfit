from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from psycopg.errors import ForeignKeyViolation
import os
# from jose import jwt

from recipes_models import (
    MealTypeIn,
    MealTypeOut,
    MealTypeList,
    ErrorMessage,
    Message,
)
from recipes_db import (
    MealTypeQueries,
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
    row = query.insert_meal_type(
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