from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from psycopg.errors import ForeignKeyViolation
from typing import Optional
import os
from jose import jwt, JWTError

from recipes_models import (
    # MealTypeIn,
    # MealTypeOut,
    # MealTypeList,
    MealIn,
    MealOut,
    # MealPostOut,
    MealPut,
    MealList,
    DeleteOperation,
    ErrorMessage,
    Message,
)
from recipes_db import (
    # MealTypeQueries,
    MealQueries,
    DuplicateRecord,
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
#     "/api/meal_types",
#     response_model=MealTypeOut | Message,
#     responses={
#         500: {"model": ErrorMessage},
#     },
# )
# def meal_type_post(
#     meal_type: MealTypeIn,
#     query=Depends(MealTypeQueries),
# ):
#     row = query.create_meal_type(
#         meal_type.name,
#     )
#     if row is None:
#         Response.status_code = status.HTTP_409_CONFLICT
#         return {"message": "That meal type already exists"}
#     return row

# @router.get(
#     "/api/meal_types",
#     response_model=MealTypeList | Message,
#     responses={
#         200: {"model": MealTypeOut},
#         404: {"model": ErrorMessage},
#     }
# )
# def meal_type_list(
#     response: Response,
#     query=Depends(MealTypeQueries),
# ):
#     rows = query.get_meal_types()
#     print(rows)
#     if rows is None:
#         response.status_code = status.HTTP_404_NOT_FOUND
#         return {"message": "You don't have any meal types"}
#     return rows

# @router.delete(
#     "/api/meal_types/{meal_type_id}",
#     response_model=DeleteOperation | Message,
# )
# def delete_meal_type(
#     meal_type_id: int,
#     query=Depends(MealTypeQueries)
# ):
#     # try:
#     query.delete_meal_type(meal_type_id)
#     return {"result": True}
#     # except:
#     #     return {"result": False}

@router.get(
    "/api/meals",
    response_model=MealList | Message,
    responses={
        404: {"model": ErrorMessage},
    }
)
def meal_list(
    response: Response,
    query=Depends(MealQueries),
):
    rows = query.get_meals()
    if rows is None:
        response.status_code = status.HTTP_404_NOT_FOUND
        # print(response.status_code)
        return {"message": "You don't have any meals"}
    return rows

@router.get(
    "/api/meals/user",
    response_model=MealList | Message,
    responses={
        200: {"model": MealOut},
        404: {"model": ErrorMessage},
    }
)
def get_meals_users(
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(MealQueries)
):
    username = user_info['username']
    rows = query.get_user_meals(username)
    return rows

@router.get(
    "/api/meals/{meal_id}",
    response_model=MealOut | Message,
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
    response_model=MealOut | Message,
    responses={
        500: {"model": ErrorMessage},
    },
)

def meal_post(
    meal: MealIn,
    user_info=Depends(get_current_user),
    query=Depends(MealQueries),
):
    username = user_info['username']
    row = query.create_meal(
        username,
        meal.recipe_api_id,
        meal.date,
        meal.type
    )
    return row

@router.delete(
    "/api/meals/{meal_id}",
    response_model=DeleteOperation | Message,
)
def delete_meal(
    meal_id: int,
    response: Response,
    user_info=Depends(get_current_user),
    query=Depends(MealQueries)
):
    meal = query.get_meal(meal_id)
    if meal is None: 
        return {"result": False}
    query.delete_meal(meal_id)
    return {"result": True}

@router.put(
    "/api/meals/{meal_id}",
    response_model=MealOut | Message,
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
