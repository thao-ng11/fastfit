# Fix this import and query name, if you need to
from user_db import AccountsQueries, DuplicateAccount
from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    Cookie,
    APIRouter,
    Request,
)
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt, jws, JWSError
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional
import os

SECRET_KEY = os.environ["SECRET_KEY"]
ALGORITHM = "HS256"
COOKIE_NAME = "fastapi_access_token"


router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token", auto_error=False)


class HttpError(BaseModel):
    detail: str


class TokenData(BaseModel):
    username: str


class AccessToken(BaseModel):
    token: str


class User(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    password: str
    username: str

class UserSignUp(BaseModel):
    username: str
    password: str
    email: str | None = None
    firstname: str | None = None
    lastname: str | None = None


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(repo: AccountsQueries, username: str, password: str):
    user = repo.get_user(username)
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


def create_access_token(data: dict):
   to_encode = data.copy()
   encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
   return encoded_jwt


async def get_current_user(
    bearer_token: Optional[str] = Depends(oauth2_scheme),
    cookie_token: Optional[str] | None = (
        Cookie(default=None, alias=COOKIE_NAME)
    ),
    repo: AccountsQueries = Depends(),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid authentication credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token = bearer_token
    if not token and cookie_token:
        token = cookie_token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
    except (JWTError, AttributeError):
        raise credentials_exception
    user = repo.get_user(username)
    if user is None:
        raise credentials_exception
    return user


@router.post("/token")
async def login_for_access_token(
    response: Response,
    request: Request,
    form_data: OAuth2PasswordRequestForm = Depends(),
    repo: AccountsQueries = Depends(),
):
    user = authenticate_user(repo, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user[1]},
    )
    token = {"access_token": access_token, "token_type": "bearer"}
    headers = request.headers
    samesite = "none"
    secure = True
    if "origin" in headers and "localhost" in headers["origin"]:
        samesite = "lax"
        secure = False
        response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,
        samesite=samesite,
        secure=secure,
    )
    return token


@router.get("/token", response_model=AccessToken)
async def get_token(request: Request):
    if COOKIE_NAME in request.cookies:
        return {"token": request.cookies[COOKIE_NAME]}

###########################################################################
#begin user functions

@router.post("/api/users")
async def signup(
    user: UserSignUp, response: Response, repo: AccountsQueries = Depends()
):
    hashed_password = pwd_context.hash(user.password)
    try:
        repo.create_user(
            user.username,
            user.firstname,
            user.lastname,
            user.email,
            user.hashed_password,
        )
        return user
    except DuplicateAccount:
        response.status_code = status.HTTP_409_CONFLICT
        return { "detail": "this account already exists"}

@router.get("users/active",
    response_model = User,
    responses = {
        200: { "model": User },
        400: { "model": HttpError},
        401: { "model": HttpError}
    },
)

async def read_users_active(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/token/validate")
async def validate_token(access_token: AccessToken, response: Response):
    try:
        return jws.verify(access_token.token, SECRET_KEY, algorithms=ALGORITHM)
    except:
        response_status_code = status.HTTP_422_UNPROCESSABLE_ENTITY
        return {"detail": "token not valid"}

@router.delete("/token")
async def logout(request: Request, response: Response):
    samesite = "none"
    secure = True
    if ("origin" in request.headers and "localhost" in request.headers["origin"]):
        samesite = "lax"
        secure = False
    response.delete_cookie(
        key=COOKIE_NAME, 
        httponly = True, 
        samesite = samesite, 
        secure = secure
        )

